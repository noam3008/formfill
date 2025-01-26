import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/MyForm.css';

const MyForm = () => {
  const [formData, setFormData] = useState({
    idNumber: "",
    age: "",
    healthFund: "",
    gender: "",
    sex: "",
    preferredLanguage: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.idNumber.match(/^\d+$/)) newErrors.idNumber = "תעודת הזהות חייבת להיות מספר.";
    if (formData.age <= 0) newErrors.age = "הגיל חייב להיות מספר חיובי.";
    if (!formData.healthFund) newErrors.healthFund = "יש לבחור קופת חולים.";
    if (!formData.gender) newErrors.gender = "יש לבחור מגדר.";
    if (!formData.sex) newErrors.sex = "יש לבחור מין.";
    if (!formData.preferredLanguage) newErrors.preferredLanguage = "יש לבחור שפה מועדפת.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (formData.age <= 0) {
        alert("הגיל חייב להיות מספר חיובי."); // "The age must be a positive number."
        return; // Prevents updating the state with an invalid value
    }

    // Navigate to the next page with the preferred language as a parameter
    if (formData.preferredLanguage === 'לשון נקבה') {
        console.log('Navigating to Woman Form with לשון נקבה');
        navigate("/woman", { state: { preferredLanguage: formData.preferredLanguage } });
        
    } else {
        console.log('Navigating to Personal Form with לשון זכר');
        navigate("/personalform", { state: { preferredLanguage: formData.preferredLanguage } });
        
    }
  };

  return (
    <div className="form-container">
      <h2>טופס הרשמה</h2>
      <form onSubmit={handlesubmit}>

      <div className="form-group  radio-preferred">
        <label className="form-label">תעודת זהות</label>
        <input
          type="text"
          className={`form-control ${errors.idNumber ? "is-invalid" : ""}`}
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          required
          aria-label="תעודת זהות"
        />
        {errors.idNumber && <div className="invalid-feedback">{errors.idNumber}</div>}
      </div>

      <div className="form-group  radio-preferred">
        <label className="form-label">גיל</label>
        <input
          type="number"
          className={`form-control ${errors.age ? "is-invalid" : ""}`}
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          min="1"
          aria-label="גיל"
        />
        {errors.age && <div className="invalid-feedback">{errors.age}</div>}
      </div>

      <div className="form-group  radio-preferred">
        <label className="form-label">קופת חולים</label>
        <select
          className={`form-control ${errors.healthFund ? "is-invalid" : ""}`}
          name="healthFund"
          value={formData.healthFund}
          onChange={handleChange}
          required
          aria-label="קופת חולים"
        >
          <option value="" disabled>בחר</option>
          <option value="כללית">כללית</option>
          <option value="מכבי">מכבי</option>
          <option value="לאומית">לאומית</option>
          <option value="מאוחדת">מאוחדת</option>
        </select>
        {errors.healthFund && <div className="invalid-feedback">{errors.healthFund}</div>}
      </div>

      {[
        { name: "gender", label: "מגדר", options: ["זכר", "אישה"] },
        { name: "sex", label: "מין", options: ["זכר", "נקבה"] }
      ].map((field) => (
        <div className="form-group  radio-preferred" key={field.name}>
          <label className="form-label">{field.label}</label>
          <div className="radio-group">
            {field.options.map((option) => (
              <div className="form-check" key={option}>
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  onChange={handleChange}
                  required
                  aria-label={option}
                /> {option}
              </div>
            ))}
          </div>
          {errors[field.name] && <div className="invalid-feedback">{errors[field.name]}</div>}
        </div>
      ))}

<div className="form-group  radio-preferred">
        <label className="form-label">שפה מועדפת</label>
        <div className="radio-group">
          {["לשון זכר", "לשון נקבה"].map((option) => (
            <div className="form-check" key={option}>
              <input
                type="radio"
                name="preferredLanguage"
                value={option}
                onChange={handleChange}
                required
                aria-label={option}
              /> {option}
            </div>
          ))}
        </div>
        {errors.preferredLanguage && <div className="invalid-feedback">{errors.preferredLanguage}</div>}
      </div>

      <button type="submit" className="btn btn-primary" >
        שלח
      </button>
      </form>
    </div>
  );
};

export default MyForm;
