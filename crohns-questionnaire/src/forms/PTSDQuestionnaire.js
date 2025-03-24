import React, { useState, useEffect } from "react";
import "../css/traumaStyle.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const PTSDQuestionnaire = () => {
  const location = useLocation();
  const { preferredLanguage, workIssuesMentalFrequency, idNumber } = location.state || {};
  
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    idNumber: idNumber,
    preferredLanguage: preferredLanguage || "",
  });

  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const numberToWordMap = {
    1: "לא נבחרה תשובה",  
    2: "כלל לא",
    3: "במידה מועטה",  // Missing before
    4: "במידה בינונית",
    5: "במידה רבה",
    6: "באופן קיצוני",
}; 

  useEffect(() => {
    console.log("Received location.state:", location.state);
    axios
      .get("http://54.242.154.185:3002/test_questions_trauma")
      .then((response) => {
        setQuestions(response.data);
        const initialFormData = {};
        response.data.forEach((q) => {
          initialFormData[q.field_name] = ""; // Initialize answers with empty values
        });
        setFormData((prevData) => ({
          ...prevData,
          ...initialFormData, // Add or override the form fields
        }));
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });

    window.scrollTo(0, 0); // Scrolls to the top of the page when the component mounts
  }, []); // Empty dependency array to ensure it runs only once when the component mounts

  const handleChange = (field, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Answers submitted:", answers);
  
    // Convert numeric answers to words
    const convertedAnswers = {};
    Object.keys(answers).forEach((key) => {
      convertedAnswers[key] = numberToWordMap[answers[key]] || "לא נבחרה תשובה"; // Default if not selected
    });
  
    console.log("Converted Answers:", convertedAnswers);
  
    // Prepare data to send in the request
    const formSubmissionData = {
      idNumber: formData.idNumber,
      preferredLanguage: formData.preferredLanguage,
      answers: convertedAnswers, // Send transformed answers
    };
  
    // Send data to backend
    axios
      .post("http://54.242.154.185:3002/insert_trauma_questionnaire", formSubmissionData)
      .then((response) => {
        console.log(response.data);
        alert("תשובותיך נשמרו בהצלחה.");
        if (workIssuesMentalFrequency != null) {
          navigate("/depressionassessment", { state: { preferredLanguage: formData.preferredLanguage,idNumber: formData.idNumber  } });
        } else {
          navigate("/healthlifestyleform", { state: { preferredLanguage: formData.preferredLanguage,idNumber: formData.idNumber  } });
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="h3-trauma">
        {preferredLanguage === "לשון זכר"
          ? "כחלק משאלון טראומה עבור כל אחד מהמשפטים הבאים ציין את מידת ההזדהות שלך עם המשפט"
          : "כחלק משאלון טראומה עבור כל אחד מהמשפטים הבאים צייני את מידת ההזדהות שלך עם המשפט"}
      </h3>

      {questions.map((question, index) => (
        <div className="form-group-trauma radio-preferred" key={index}>
          <label className="form-label">{`${index + 1}. ${question.question_text}`}</label>
          <div className="slider-container">
            <input
              type="range"
              min="1"
              max="6"
              step="1"
              className="slider"
              id={`question-${index}`}
              name={`question-${index}`}
              value={answers[question.field_name] || 0} // Binding value from answers state
              onChange={(e) => handleChange(question.field_name, e.target.value)}
              onClick={(e) => {
                if (answers[question.field_name] === 0) {
                  handleChange(question.field_name, 1); // Set to 1 when clicked if currently at 0
                }
              }}
            />
            <div className="slider-labels">
            <span>לא נבחרה תשובה</span>
              <span>כלל לא</span>
              <span>במידה מועטה</span>
              <span>במידה בינונית</span>
              <span>במידה רבה</span>
              <span>באופן קיצוני</span>
            </div>
          </div>
        </div>
      ))}
      <h4>
        {preferredLanguage === "לשון זכר" ? " שלח שאלון מס 4 מתוך 15" : " שלחי שאלון מס 5 מתוך 15"}
      </h4>
      <button type="submit" className="btn btn-primary">
        {preferredLanguage === "לשון זכר" ? "שלח" : "שלחי"}
      </button>
    </form>
  );
};

export default PTSDQuestionnaire;
