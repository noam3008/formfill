import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/MyForm.css";

const MyForm = () => {
  const [formData, setFormData] = useState({});
  const [questions, setQuestions] = useState([]); // Store questions from DB
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Fetch the questions from the Flask server
  useEffect(() => {
    axios.get("http://54.242.154.185:3002/test_questions_registration")
      .then((response) => {
        setQuestions(response.data);
  
        const initialFormData = {};
        response.data.forEach(q => {
          if (q.question_type === "radio") {
            initialFormData[q.field_name] = ""; // Ensure radios start controlled
          } else if (q.question_type === "select") {
            initialFormData[q.field_name] = ""; // Select default empty
          } else {
            initialFormData[q.field_name] = ""; // Text, email, number fields
          }
        });
  
        setFormData(initialFormData);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate Israeli ID number
    if (!is_israeli_id_number(formData.idNumber)) {
        newErrors.idNumber = "תעודת הזהות אינה תקינה";
    }

    if (!formData.firstName) newErrors.firstName = "שם פרטי נדרש";
    if (!formData.lastName) newErrors.lastName = "שם משפחה נדרש";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "כתובת אימייל אינה חוקית";
    if (!formData.phone.match(/^\d+$/)) newErrors.phone = "מספר הטלפון חייב להיות מספרים בלבד";
    if (formData.age <= 0) newErrors.age = "הגיל חייב להיות מספר חיובי";
    if (!formData.healthFund) newErrors.healthFund = "יש לבחור קופת חולים";
    if (!formData.gender) newErrors.gender = "יש לבחור מגדר";
    if (!formData.sex) newErrors.sex = "יש לבחור מין";
    if (!formData.preferredLanguage) newErrors.preferredLanguage = "יש לבחור שפה מועדפת";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

// Israeli ID validation function
function is_israeli_id_number(id) {
    id = String(id).trim();
    if (id.length > 9 || isNaN(id)) return false;
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
    return (
        Array.from(id, Number).reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1);
            return counter + (step > 9 ? step - 9 : step);
        }, 0) % 10 === 0
    );
}


  const handlesubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;

    const payload = {
      id_number: formData.idNumber,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      age: formData.age,
      health_fund: formData.healthFund,
      gender: formData.gender,
      sex: formData.sex,
      preferred_language: formData.preferredLanguage
    };

    try {
      const response = await fetch("http://54.242.154.185:3002/insert_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const result = await response.json();
      localStorage.setItem('userData', JSON.stringify(result));
      console.log(result.message);  // Log success message
  
    } catch (error) {
      console.error("Error:", error.message);  // Handle errors
    }

    // Navigate to the next page based on user input
    if (formData.preferredLanguage === "לשון נקבה" && formData.gender === "גבר") {
      navigate("/personalform", { state: { preferredLanguage: formData.preferredLanguage ,idNumber:formData.idNumber} });
    } else if (formData.preferredLanguage === "לשון זכר" && formData.gender === "אישה") {
      navigate("/woman", { state: { preferredLanguage: formData.preferredLanguage ,idNumber:formData.idNumber} });
    } else {
      navigate(formData.preferredLanguage === "לשון נקבה" ? "/woman" : "/personalform", { 
        state: { preferredLanguage: formData.preferredLanguage ,idNumber:formData.idNumber}
      });
    }
  };

  return (
    <div className="form-container">
      <h2>טופס הרשמה</h2>
      <form onSubmit={handlesubmit}>
        {questions.length > 0 && questions.map((q) => (
          <div key={q.id} className="form-group radio-preferred">
            <label className="form-label">{q.question_text}</label>

            {q.question_type === "text" || q.question_type === "email" || q.question_type === "number" ? (
              <input
                type={q.question_type}
                className={`form-control ${errors[q.field_name] ? "is-invalid" : ""}`}
                name={q.field_name}
                value={formData[q.field_name] || ""}
                onChange={handleChange}
                min={q.question_type === "number" ? 0 : undefined}  // Add min="0" for number fields

              />
            ) : q.question_type === "select" ? (
              <select
                className={`form-control ${errors[q.field_name] ? "is-invalid" : ""}`}
                name={q.field_name}
                value={formData[q.field_name] || ""}
                onChange={handleChange}
              >
                <option value="" disabled>בחר</option>
                {q.options && q.options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            ) : q.question_type === "radio" ? (
              q.options && q.options.map((option, index) => (
                <div key={index} className="form-check">
                  <input
                    type="radio"
                    name={q.field_name}
                    value={option}
                    checked={formData[q.field_name] === option}
                    onChange={handleChange}
                  />
                  <label>{option}</label>
                </div>
              ))
            ) : null}

            {errors[q.field_name] && <div className="invalid-feedback">{errors[q.field_name]}</div>}
          </div>
        ))}
<h3>שלח שאלון מס 1 מתוך 15</h3>
        <button type="submit" className="btn btn-primary">שלח</button>
      </form>
    </div>
  );
};

export default MyForm;
