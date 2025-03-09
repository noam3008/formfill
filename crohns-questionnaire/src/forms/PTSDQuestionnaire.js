import React, { useState } from "react";
import "../css/traumaStyle.css"
import {useNavigate,useLocation} from "react-router-dom";
import { useEffect } from 'react';

const PTSDQuestionnaire = () => {
    const location = useLocation();
    const { preferredLanguage, workIssuesMentalFrequency } = location.state || {};

  const questions = [
    "זיכרונות טורדניים ולא רצויים של החוויה הטראומטית?",
    "חלומות טורדניים של החוויה הטראומטית?",
    "הרגשה כאילו החוויה הטראומטית מתרחשת שוב?",
    "מצוקה כשמשהו מזכיר את החוויה הטראומטית?",
    "תגובות גופניות חזקות כשמשהו מזכיר את החוויה הטראומטית?",
    "המנעות ממחשבות, רגשות או תחושות שמזכירים את החוויה הטראומטית?",
    "המנעות מגורמים חיצוניים שמזכירים את החוויה הטראומטית?",
    "קושי לזכור חלקים חשובים מתוך החוויה הטראומטית?",
    "אמונות שליליות על עצמך, אחרים או העולם?",
    "האשמה עצמית או האשמת אחרים על מה שקרה באירוע?",
    "רגשות שליליים חזקים כמו פחד, כעס או בושה?",
    "אובדן עניין בפעילויות שנהגת ליהנות מהן?",
    "תחושת ריחוק או ניתוק מאנשים אחרים?",
    "קושי לחוש רגשות חיוביים או תחושת קהות רגשית?",
    "תחושה שהעתיד שלך ייקטע?",
    "התנהגות כעסנית או תוקפנית?",
    "לקיחת סיכונים מיותרים או פגיעה עצמית?",
    "תחושת דריכות-יתר או ערנות מוגברת?",
    "נטייה להיבהל בקלות או תחושת קופצנות?",
    "קשיים בריכוז?",
    "קשיי שינה או להישאר ישן/ה?",
  ];

const navigate = useNavigate();
 useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page when the component mounts
  }, []); // Empty dependency array to ensure it runs only once when the component mounts


  const [answers, setAnswers] = useState(
    questions.map(() => 0) // Default value is 3 (neutral) for all questions
  );

  const handleChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = parseInt(value, 10);
    setAnswers(updatedAnswers);
  
  };
  

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log("תשובות שהוזנו:", answers);
    alert("תשובותיך נשמרו בהצלחה.");

    if(workIssuesMentalFrequency!=null){
      navigate("/depressionassessment", { state: { preferredLanguage } });
    }
    else{
      navigate("/healthlifestyleform", { state: { preferredLanguage } });
    }
  };


  return (
    <form onSubmit={handlesubmit}>

      <h3 className="h3-trauma">אנא ענה על השאלות הבאות כחלק משאלון טראומה</h3>

      {questions.map((question, index) => (
        <div className="form-group-trauma radio-preferred" key={index}>
          <label className="form-label">{`${index + 1}. ${question}`}</label>
          <div className="slider-container">
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            className="slider"
            id={`question-${index}`}
            name={`question-${index}`}
            value={answers[index]} // Correctly binding the value
            onChange={(e) => handleChange(index, e.target.value)}
            onClick={(e) => {
              if (answers[index] === 0) {
                handleChange(index, 1); // Set to 1 when clicked if currently at 0
              }
            }}
        />
            <div className="slider-labels">
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
