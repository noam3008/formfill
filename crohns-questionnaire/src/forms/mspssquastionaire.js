import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/traumaStyle.css";

const MSPSSQuestionnaire = () => {
  const questions = [
    "יש אדם קרוב לי הנמצא בקרבתי כאשר אני נזקק/ת",
    "יש אדם קרוב שאני יכול/ה לשתף בצער ובשמחה.",
    "משפחתי מנסה באמת לעזור לי.",
    "אני מקבל/ת ממשפחתי את העזרה והתמיכה הרגשית שאני זקוק/ה לה.",
    "יש אדם קרוב אלי המהווה לגבי מקור עידוד ממש.",
    "חברי מנסים באמת לעזור לי.",
    "אני יכול/ה לסמוך על חברי/ חברותי כאשר מתעוררות בעיות.",
    "אני יכול/ה לשוחח על בעיותיי עם משפחתי.",
    "יש לי חברים/ות שאותם אני יכול/ה לשתף בשמחתי ובצערי.",
    "יש אדם קרוב לי שרגשותיי חשובים לו.",
    "משפחתי מוכנה לעזור לי לקבל החלטות.",
    "אני יכול/ה לדבר על בעיותי עם חברי.",
  ];

  const navigate = useNavigate();

  // Default value for all sliders is 4 (neutral)
  const [answers, setAnswers] = useState(questions.map(() => 4));

  const handleChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = parseInt(value, 10);
    setAnswers(updatedAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("תשובות שהוזנו:", answers);
    alert("תשובותיך נשמרו בהצלחה.");
    navigate("/ChildhoodQuastionaire");
  };

  const labels = [
    "לא מתאים כלל",
    "מתאים במידה מועטה מאוד",
    "מתאים במידה מועטה",
    "מתאים במידה בינונית",
    "מתאים במידה רבה",
    "מתאים במידה רבה מאוד",
    "מתאים לחלוטין",
  ];

  return (
    <form onSubmit={handleSubmit}>
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
