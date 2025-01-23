import React, { useState } from "react";
import "../css/traumaStyle.css"
import { useNavigate } from 'react-router-dom';

const DepressionAssessment = () => {
    const questions = [
        "עניין או הנאה מועטים מעשיית דברים",
        "תחושת דכדוך, דיכאון, או חוסר תקווה",
        "קשיים בהירדמות או בשינה רציפה, או עודף שינה",
        "תחושה של עייפות או אנרגיה מועטה",
        "תיאבון מועט או אכילת יתר",
        "מרגיש רע לגבי עצמך - מרגיש שאתה כישלון או שאכזבת את עצמך או את משפחתך",
        "קושי להתרכז בדברים, כמו קריאה בעיתון או צפייה בטלוויזיה",
        "היית מדבר או נע באיטיות עד כי שאחרים הבחינו בכך? או להיפך - היית חסר שקט ומנוחה כך שהיית צריך להסתובב יותר מהרגיל",
        "מחשבות שהיה עדיף לו היית מת או מחשבות על פגיעה בעצמך בדרך כלשהי",
      ];
    


const navigate = useNavigate();

  const [answers, setAnswers] = useState(
    questions.map(() => 3) // Default value is 3 (neutral) for all questions
  );

  const handleChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = parseInt(value, 10);
    setAnswers(updatedAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("תשובות שהוזנו:", answers);
    alert("תשובותיך נשמרו בהצלחה.");
    navigate("/healthlifestyleform")
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-center">  ? במהלך השבועיים האחרונים, באיזו תדירות היית מוטרד מכל אחת מן הבעיות הבאות </h3>
      {questions.map((question, index) => (
        <div className="form-group-trauma mt-3" key={index}>
          <label className="form-label">{`${index + 1}. ${question}`}</label>
          <div className="slider-container">
            <input
              type="range"
              min="1"
              max="4"
              step="1"
              className="slider"
              id={`question-${index}`}
              name={`question-${index}`}
              value={answers[index]}
              onChange={(e) => handleChange(index, e.target.value)}
            />
            <div className="slider-labels">
              <span>כלל לא</span>
              <span>מספר ימים</span>
              <span>ביותר ממחצית מן הימים</span>
              <span>כמעט כל יום</span>
            </div>
          </div>
        </div>
      ))}
      <button type="submit" className="btn btn-primary mt-4">
        שלח שאלון
      </button>
    </form>
  );
};

export default DepressionAssessment