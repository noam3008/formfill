import React, { useState } from "react";
import "../css/traumaStyle.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const HealthStatusQuestionnaire = () => {
  const navigate = useNavigate();
    const location = useLocation();
    const { preferredLanguage } = location.state || {}; // Extract preferred language from state
  

  // Health-related questions
  const questions = [
    "כאבי ראש חוזרים, התעלפויות, סחרחורות, התכווצויות",
    "הפרעות שמיעה, דלקות אוזניים חוזרות",
    "נזלת אלרגית, סינוסיטיס, קושי בנשימה דרך האף",
    "הפרעות ראייה, צורך במשקפיים, עיוורון לילה, דלקות עיניים חוזרות",
    "עברת טיפול בלייזר לתיקון הראייה",
    "הפרעה בלחץ דם, כאבים בחזה, אובדן הכרה, קוצר נשימה במאמץ",
    "מחלת לב, דקירות בחזה, שינויים בדופק במנוחה/מאמץ",
    "אסטמה, ציפצופים, קוצר נשימה, מחלת ריאה אחרת",
    "מחלת אנדוקריניות (בעיות הורמונלית כגון: בלוטת התריס, כולסטרול)",
    "כיב, צרבת, כאבי בטן חוזרים, צהבת, מחלת כבד",
    "דלקת מעי, דימומים במערכת העיכול, טחורים",
    "מחלת דם (כגון: אנמיה, טרומבוציטופניה)",
    "מחלות מין",
    "כאבי גב חוזרים, חבלה בגב",
    "כאבים ברגליים, הפרעה בהליכה, אירועים מתועדים ע”י רופא של נקעים חוזרים",
    "שברים בעצמות, פריקת כתף",
    "מחלות מפרקים",
    "מחלות עור",
    "מחלות כבד",
    "מחלות כליה, הפרעה במתן שתן, הרטבת לילה",
    "לבנים - בעיות באשכים, בקע מפשעתי, כאבים במפשעה",
    "לבנות - הפרעות במחזור החודשי, מחלה גניקולוגית",
    "מחלה ממארת בעבר/בהווה",
    "האם עברת ניתוחים/אשפוזים בעבר? (שלא מפורט בסעיפים הקודמים)",
    "האם הינך נשא/חולה במחלות זיהומיות כרוניות (HIV, צהבת נגיפית, מחלות אחרות)",
    "מחלות נוירולוגיות (כולל אפילפסיה)",
    "מחלות אנדוקריניות",
    "מחלות המטולוגיות (כולל אנמיה)",
    "מחלות עיניים",
    "מחלות אף, אוזן, גרון",
    "מחלות ריאה (כולל אסטמה) אנא ציין מתי היה ההתקף האחרון",
    "מחלות לב, מומי לב, יתר לחץ דם",
    "מחלות כליה ודרכי השתן",
    "מחלות דרכי העיכול והכבד",
    "מחלות פרקים, הפרעות שלד (כולל שברים בעצמות)",
    "מחלות ממאירות",
    "הפרעות נפשיות מאובחנות? אם כן מה? האם מטופל? במה?",
    "הפרעות קשב וריכוז מאובחנות? אם כן, האם מטופל תרופתית? במה?",
    "האם יש במשפחתך (דרגה ראשונה) מחלות ממאירות (סרטן)?",
    "האם יש במשפחתך מוות פתאומי מתחת לגיל 45 מסיבה שאינה ידועה או מסיבה לבבית?",
    "האם יש במשפחתך (דרגה ראשונה) מחלות ריאה כרוניות כגון שחפת?",
    "האם יש במשפחתך מחלות גנטיות (תורשתיות)?"
  ];

  // Initialize state with null (so nothing is selected by default)
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [details, setDetails] = useState(new Array(questions.length).fill(""));

  // Handle Yes/No selection
  const handleChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value === "yes" ? 1 : 0;
    setAnswers(updatedAnswers);
  };

  // Handle additional details input
  const handleDetailsChange = (index, value) => {
    const updatedDetails = [...details];
    updatedDetails[index] = value;
    setDetails(updatedDetails);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    navigate("/childhoodquastionaire", { state: { preferredLanguage } });
};



  return (
    <form onSubmit={handlesubmit}>
      <h3 className="text-center">שאלון מצב בריאותי</h3>

      {questions.map((question, index) => (
        <div className="form-group radio-preferred" key={index}>
          <label className="form-label">{`${index + 1}. ${question}`}</label>

          {/* Yes/No radio buttons - No default selection */}
          <div className="form-check">
            <input
              type="radio"
              name={`question-${index}`}
              value="yes"
              onChange={(e) => handleChange(index, e.target.value)}
              checked={answers[index] === 1}
            />
            <label>כן</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              name={`question-${index}`}
              value="no"
              onChange={(e) => handleChange(index, e.target.value)}
              checked={answers[index] === 0}
            />
            <label>לא</label>
          </div>

          {/* Show text box only if "Yes" is selected */}
          {answers[index] === 1 && (
            <div className="form-group radio-preffered">
              <label>

              {preferredLanguage === "לשון זכר"
          ? "תוכל לפרט יותר ולתת דוגמאות"
          : "תוכלי לפרט יותר ולתת דוגמאות"}
              </label>
              <input
                type="text"
                className="form-control"
                value={details[index]}
                onChange={(e) => handleDetailsChange(index, e.target.value)}
              />
            </div>
          )}
        </div>
      ))}

      <button type="submit" className="btn btn-primary mt-4">
        
      {preferredLanguage === "לשון זכר"
          ? "שלח שאלון"
          : "שלחי שאלון"}
      </button>
    </form>
  );
};

export default HealthStatusQuestionnaire;
