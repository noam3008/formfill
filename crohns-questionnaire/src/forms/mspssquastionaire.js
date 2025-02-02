import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../css/traumaStyle.css";

const MSPSSQuestionnaire = () => {
  const location = useLocation();
  const { preferredLanguage } = location.state || {}; // Extract preferred language from state

  // Questions in masculine form
  const questionsMale = [
    "יש אדם קרוב לי הנמצא בקרבתי כאשר אני נזקק",
    "יש אדם קרוב שאני יכול לשתף בצער ובשמחה.",
    "משפחתי מנסה באמת לעזור לי.",
    "אני מקבל ממשפחתי את העזרה והתמיכה הרגשית שאני זקוק לה.",
    "יש אדם קרוב אלי המהווה לגבי מקור עידוד ממש.",
    "חברי מנסים באמת לעזור לי.",
    "אני יכול לסמוך על חברי כאשר מתעוררות בעיות.",
    "אני יכול לשוחח על בעיותיי עם משפחתי.",
    "יש לי חברים שאותם אני יכול לשתף בשמחתי ובצערי.",
    "יש אדם קרוב לי שרגשותיי חשובים לו.",
    "משפחתי מוכנה לעזור לי לקבל החלטות.",
    "אני יכול לדבר על בעיותי עם חברי.",
  ];

  // Questions in feminine form
  const questionsFemale = [
    "יש אדם קרוב לי הנמצא בקרבתי כאשר אני נזקקת",
    "יש אדם קרוב שאני יכולה לשתף בצער ובשמחה.",
    "משפחתי מנסה באמת לעזור לי.",
    "אני מקבלת ממשפחתי את העזרה והתמיכה הרגשית שאני זקוקה לה.",
    "יש אדם קרוב אלי המהווה לגבי מקור עידוד ממש.",
    "חברותי מנסות באמת לעזור לי.",
    "אני יכולה לסמוך על חברותי כאשר מתעוררות בעיות.",
    "אני יכולה לשוחח על בעיותיי עם משפחתי.",
    "יש לי חברות שאותן אני יכולה לשתף בשמחתי ובצערי.",
    "יש אדם קרוב לי שרגשותיי חשובים לו.",
    "משפחתי מוכנה לעזור לי לקבל החלטות.",
    "אני יכולה לדבר על בעיותי עם חברותי.",
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
    navigate("/healthstatusquestionnaire", { state: { preferredLanguage } });
  };

  // Slider labels
  const labels = [
    "לא מתאים כלל",
    "מתאים במידה מועטה מאוד",
    "מתאים במידה מועטה",
    "מתאים במידה בינונית",
    "מתאים במידה רבה",
    "מתאים במידה רבה מאוד",
    "מתאים לחלוטין",
  ];

  // Choose questions based on preferredLanguage
  const questions =
    preferredLanguage === "לשון זכר" ? questionsMale : questionsFemale;

  return (
    <form onSubmit={handlesubmit}>
      <h3 className="text-center">שאלון תמיכה חברתית ומשפחתית</h3>
      {questions.map((question, index) => (
        <div className="form-group-trauma mt-3" key={index}>
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
      <button type="submit" className="btn btn-primary mt-4">
        שלח שאלון
      </button>
    </form>
  );
};

export default MSPSSQuestionnaire;
