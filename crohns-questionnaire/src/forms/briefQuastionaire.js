import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/traumaStyle.css";

const BriefQuestionnaire = () => {
  const location = useLocation();
  const { preferredLanguage } = location.state || {}; // Extract preferred language from state

  const questionForm = [
    {
      id: "impact",
      labelMan: "עד כמה יש למחלתך השפעה על חייך?",
      labelWoman: "עד כמה יש למחלתך השפעה על חייך?",
      start: "משפיעה מאוד על חיי",
      end: "לא משפיעה בכלל"
    },
    {
      id: "duration",
      labelMan: "כמה זמן לדעתך תימשך מחלתך?",
      labelWoman: "כמה זמן לדעתך תימשך מחלתך?",
      start: "לתמיד",
      end: "זמן קצר מאוד"
    },
    {
      id: "control",
      labelMan: "באיזו מידה אתה מרגיש שיש לך שליטה על מחלתך?",
      labelWoman: "באיזו מידה את מרגישה שיש לך שליטה על מחלתך?",
      start: "שליטה רבה מאוד",
      end: "אין שליטה בכלל"
    },
    {
      id: "treatment",
      labelMan: "עד כמה אתה חושב שהטיפול שלך (תרופות וכד') יכול לעזור למצב המחלה שלך?",
      labelWoman: "עד כמה את חושבת שהטיפול שלך (תרופות וכד') יכול לעזור למצב המחלה שלך?",
      start: "יעזור מאוד",
      end: "לא יעזור בכלל"
    },
    {
      id: "symptoms",
      labelMan: "באיזו מידה אתה חש סימפטומים הנגרמים על-ידי המחלה שלך?",
      labelWoman: "באיזו מידה את חשה סימפטומים הנגרמים על-ידי המחלה שלך?",
      start: "סימפטומים רבים וחמורים",
      end: "אין סימפטומים בכלל"
    },
    {
      id: "worry",
      labelMan: "באיזו מידה אתה מודאג ממחלתך?",
      labelWoman: "באיזו מידה את מודאגת ממחלתך?",
      start: "מודאג/ת מאוד",
      end: "בכלל לא מודאג/ת"
    },
    {
      id: "understanding",
      labelMan: "באיזו מידה אתה מרגיש שאתה מבין את המחלה שלך?",
      labelWoman: "באיזו מידה את מרגישה שאת מבינה את המחלה שלך?",
      start: "מבינ/ה בצורה ברורה ביותר",
      end: "לא מבינ/ה בכלל"
    },
    {
      id: "emotional",
      labelMan: "באיזו מידה מחלתך משפיעה עליך מבחינה רגשית? (לדוגמה, עד כמה היא גורמת לך לכעוס, לפחד, להיות מדוכא או מצוברח?)",
      labelWoman: "באיזו מידה מחלתך משפיעה עליך מבחינה רגשית? (לדוגמה, עד כמה היא גורמת לך לכעוס, לפחד, להיות מדוכאת או מצוברחת?)",
      start: "השפעות רגשיות חזקות מאוד",
      end: "אין כל השפעות רגשיות"
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on mount
  }, []);

  const navigate = useNavigate();

  const [answers, setAnswers] = useState(
    new Array(questionForm.length).fill(0)
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
    navigate("/satisfactionquestionnaire", { state: { preferredLanguage } });
  };

  // Slider labels
  const labels = [
    "",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  return (
    <form onSubmit={handlesubmit}>
      <h3 className="text-center">שאלון תפיסת מחלה קצר</h3>
      {questionForm.map((question, index) => {
        // Choose the appropriate label based on preferredLanguage
        const label = preferredLanguage === "לשון זכר" ? question.labelMan : question.labelWoman;

        return (
          <div className="form-group-trauma mt-3 radio-preferred" key={index}>
            <label className="form-label">{`${index + 1}. ${label}`}</label>
            <div className="slider-container">
              <input
                type="range"
                min="1"
                max="10"
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
              {[...Array(10).keys()].map((i) => (
                <span key={i} className="slider-label">
                  {i === 0 ? question.start : i === 9 ? question.end : labels[i]}
                </span>
              ))}

              </div>
            </div>
          </div>
        );
      })}
      {/* New Div with Instructions */}
      <div className="form-group radio-preferred">
        <label className="form-label">
        {preferredLanguage === "לשון זכר" ? "נא דרג לפי סדר את שלושת הגורמים החשובים ביותר שאתה מאמין שגרמו למחלה שלך" : "נא דרגי לפי סדר את שלושת הגורמים החשובים ביותר שאת מאמינה שגרמו למחלה שלך"}
          
        </label>
        <div className="ranking-inputs">
          <input type="text" placeholder="" />
          <input type="text" placeholder="" />
          <input type="text" placeholder="" />
        </div>
      </div>

      <h4>
        {preferredLanguage === "לשון זכר" ? "שלח שאלון מספר 12 מתוך 15" : "שלחי שאלון מספר 13 מתוך 15"}
      </h4>
      <button type="submit" className="btn btn-primary">
        {preferredLanguage === "לשון זכר" ? "שלח" : "שלחי"}
      </button>
    </form>
  );
};

export default BriefQuestionnaire;
