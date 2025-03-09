import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../css/traumaStyle.css";

const Satisfactionquestionnaire = () => {
  const location = useLocation();
  const { preferredLanguage } = location.state || {}; // Extract preferred language from state

  // Questions in masculine form
  const questionsMale = [
    "בדרך כלל חיי קרובים לאידיאל שלי",
    "תנאי החיים שלי מצוינים",
    "אני שבע רצון מחיי",
    "עד עכשיו השגתי את הדברים החשובים שאני רוצה בחיים",
    "אם הייתי יכול לחיות את חיי שוב, לא הייתי משנה כמעט שום דבר",
  ];

  // Questions in feminine form
  const questionsFemale = [
    "בדרך כלל חיי קרובים לאידיאל שלי",
    "תנאי החיים שלי מצוינים",
    "אני שבעת רצון מחיי",
    "עד עכשיו השגתי את הדברים החשובים שאני רוצה בחיים",
    "אם הייתי יכולה לחיות את חיי שוב, לא הייתי משנה כמעט שום דבר",
  ];

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on mount
  }, []);

  const navigate = useNavigate();

  // Default answers are neutral (4)
  const [answers, setAnswers] = useState(
    new Array(questionsMale.length).fill(0)
  );

  // Handle slider changes
  const handleChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = parseInt(value, 10);
    setAnswers(updatedAnswers);
  };

  // Handle form submission
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log("תשובות שהוזנו:", answers);
    alert("תשובותיך נשמרו בהצלחה.");
    navigate("/endPage", { state: { preferredLanguage } });
  };

  // Slider labels
  const labels = [
    "התנגדות מלאה",
    "התנגדות מרובה",
    "התנגדות חלקית",
    "אי הסכמה ואי התנגדות",
    "הסכמה חלקית",
    "הסכמה מרובה",
    "הסכמה מלאה",
  ];

  // Choose questions based on preferredLanguage
  const questions =
    preferredLanguage === "לשון זכר" ? questionsMale : questionsFemale;

  return (
    <form onSubmit={handlesubmit}>
      <h3 className="text-center">שאלון תמיכה חברתית ומשפחתית</h3>
      {questions.map((question, index) => (
        <div className="form-group-trauma mt-3 radio-preferred" key={index}>
          <label className="form-label">{`${index + 1}. ${question}`}</label>
          <div className="slider-container">
            <input
              type="range"
              min="1"
              max="7"
              step="1"
              className="slider"
              id={`question-${index}`}
              name={`question-${index}`}
              value={answers[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onClick={(e) => {
                if (answers[index] === 0) {
                  handleChange(index, 1); // Set to 1 when clicked if currently at 0
                }
              }}
              
            />
            <div className="slider-labels">
              {labels.map((label, i) => (
                <span key={i} className="slider-label">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
      <h4>
            {preferredLanguage === "לשון זכר" ? " שלח שאלון מספר 13 מתוך 15" : " שלחי שאלון מספר 14 מתוך 15"}

          </h4>
          <button type="submit" className="btn btn-primary">
            {preferredLanguage === "לשון זכר" ? "שלח" : "שלחי"}
          </button>
    </form>
  );
};

export default Satisfactionquestionnaire;
