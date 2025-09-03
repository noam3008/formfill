import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../css/traumaStyle.css";
import axios from 'axios';

const LeisureActivityQuestionnaire = () => {
  const location = useLocation();
 const { preferredLanguage, idNumber } = location.state || {};
 const [questions, setQuestions] = useState([]); // Store questions from DB
  const navigate = useNavigate();

  // State initialization for questions
  const [formData, setFormData] = useState({
    idNumber: idNumber,
    preferredLanguage: preferredLanguage || "",
    sufficientExercise: "", // Yes/No question
    strenuous: "", // Intense exercise frequency
    moderate: "", // Moderate exercise frequency
    light: "", // Light exercise frequency
    sweatingFrequency: "", // How often the user exercises enough to sweat
  });

  useEffect(() => {
    axios.get("http://54.242.154.185:3002/test_questions_leisure_activity")
      .then((response) => {
        setQuestions(response.data); // Set questions in state
        const initialFormData = {};
        response.data.forEach(q => {
          initialFormData[q.field_name] = ""; // Initialize form data for each field
        });

        // Only set formData if it's not set yet, or add missing fields
        setFormData(prevData => ({
          ...prevData,   // Keep any previous formData values
          ...initialFormData // Add or override the new form fields
        }));
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });

    window.scrollTo(0, 0);

    // Set idNumber from location.state if not already in formData
    if (location.state?.idNumber && !formData.idNumber) {
      setFormData(prevData => ({
        ...prevData,
        idNumber: location.state.idNumber
      }));
    }
    if (location.state?.preferredLanguage && !formData.preferredLanguage) {
      setFormData(prevData => ({
        ...prevData,
        preferredLanguage: location.state.preferredLanguage
      }));
    }
  }, [location.state?.idNumber]); // Only rerun if location.state.idNumber changes


  // Handle input change for all questions
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  const handlesubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
    navigate("/mspssquastionaire", { state: { preferredLanguage: formData.preferredLanguage,idNumber: formData.idNumber  } });
  };

  return (
    <form onSubmit={handlesubmit}>
      <h3 className="text-center">שאלון הרגלי פעילות גופנית בשעות הפנאי</h3>

      {/* Question 1: Do you think you exercise enough? */}
      <div className="form-group radio-preferred">
        <label className="form-label">
        {preferredLanguage === 'לשון זכר' 
                ? questions.find(q => q.field_name === "sufficientExercise_man")?.question_text || "שאלה לא זמינה"
                : questions.find(q => q.field_name === "sufficientExercise_woman")?.question_text || "שאלה לא זמינה"}
              

        </label>
        <div className="form-check">
          <input
            type="radio"
            id="sufficientYes"
            name="sufficientExercise"
            value="כן"
            onChange={handleChange}
            checked={formData.sufficientExercise === "כן"}
            onClick={() => handleChange({ target: { name: "sufficientExercise", value: formData.sufficientExercise === "כן" ? "" : "כן" } })}
          />
          <label htmlFor="sufficientYes">כן</label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            id="sufficientNo"
            name="sufficientExercise"
            value="לא"
            onChange={handleChange}
            checked={formData.sufficientExercise === "לא"}
            onClick={() => handleChange({ target: { name: "sufficientExercise", value: formData.sufficientExercise === "לא" ? "" : "לא" } })}

          />
          <label htmlFor="sufficientNo">לא</label>
        </div>
      </div>

      {/* Question 2: How often do you engage in different types of exercise? */}
      <div className="form-group radio-preferred">
      <h3 className="form-label radio-preferred">
      {preferredLanguage === "לשון זכר"
            ? "במהלך 7 ימים (שבוע), כמה פעמים בממוצע אתה מבצע את הפעילויות הבאות למשך 15 דקות לפחות?"
            : "במהלך 7 ימים (שבוע), כמה פעמים בממוצע את מבצעת את הפעילויות הבאות למשך 15 דקות לפחות?"}
      </h3>
      </div>

      <div className="form-group radio-preferred">
        <label className="form-label">
        {questions.find(q => q.field_name === "strenuous")?.question_text || "שאלה לא זמינה"}
        </label>
        <input
          type="number"
          min="0"
          className="form-control"
          name="strenuous"
          value={formData.strenuous}
          onChange={handleChange}
          placeholder="מספר פעמים בשבוע"
        />
      </div>

      <div className="form-group radio-preferred">
        <label className="form-label">
        {questions.find(q => q.field_name === "moderate")?.question_text || "שאלה לא זמינה"}
        </label>
        <input
          type="number"
          min="0"
          className="form-control"
          name="moderate"
          value={formData.moderate}
          onChange={handleChange}
          placeholder="מספר פעמים בשבוע"
        />
      </div>

      <div className="form-group radio-preferred">
        <label className="form-label">
        {questions.find(q => q.field_name === "light")?.question_text || "שאלה לא זמינה"}
        </label>
        <input
          type="number"
          min="0"
          className="form-control"
          name="light"
          value={formData.light}
          onChange={handleChange}
          placeholder="מספר פעמים בשבוע"
        />
      </div>

      {/* Question 3: How often do you exercise enough to sweat? */}
      <div className="form-group radio-preferred">
        <label className="form-label">
          {preferredLanguage === "לשון זכר"

                    ? questions.find(q => q.field_name === "sweatingFrequency_man")?.question_text || "שאלה לא זמינה"
                    : questions.find(q => q.field_name === "sweatingFrequency_woman")?.question_text || "שאלה לא זמינה"}

        </label>
        <div className="form-check">
          <input
            type="radio"
            id="often"
            name="sweatingFrequency"
            value="לעיתים קרובות"
            onChange={handleChange}
            checked={formData.sweatingFrequency === "לעיתים קרובות"}
            onClick={() => handleChange({ target: { name: "sweatingFrequency", value: formData.sweatingFrequency === "לעיתים קרובות" ? "" : "לעיתים קרובות" } })}

  
          />
          <label htmlFor="often">לעיתים קרובות</label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            id="sometimes"
            name="sweatingFrequency"
            value="לפעמים"
            onChange={handleChange}
            checked={formData.sweatingFrequency === "לפעמים"}
            onClick={() => handleChange({ target: { name: "sweatingFrequency", value: formData.sweatingFrequency === "לפעמים" ? "" : "לפעמים" } })}

          />
          <label htmlFor="sometimes">לפעמים</label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            id="rarely"
            name="sweatingFrequency"
            value="אף פעם / לעיתים נדירות"
            onChange={handleChange}
            checked={formData.sweatingFrequency === "אף פעם / לעיתים נדירות"}
            onClick={() => handleChange({ target: { name: "sweatingFrequency", value: formData.sweatingFrequency === "אף פעם / לעיתים נדירות" ? "" : "אף פעם / לעיתים נדירות" } })}

          />
          <label htmlFor="rarely">אף פעם / לעיתים נדירות</label>
        </div>
      </div>

      <h4>
            {preferredLanguage === "לשון זכר" ? " שלח שאלון מספר 7 מתוך 15" : " שלחי שאלון מספר 8 מתוך 15"}

          </h4>
          <button type="submit" className="btn btn-primary">
            {preferredLanguage === "לשון זכר" ? "שלח" : "שלחי"}
          </button>
    </form>
  );
};

export default LeisureActivityQuestionnaire;
