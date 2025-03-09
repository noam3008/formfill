import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../css/traumaStyle.css";

const LeisureActivityQuestionnaire = () => {
  const location = useLocation();
  const { preferredLanguage } = location.state || {}; // Extract preferred language from state
  const navigate = useNavigate();

  // State initialization for questions
  const [formData, setFormData] = useState({
    sufficientExercise: "", // Yes/No question
    strenuous: "", // Intense exercise frequency
    moderate: "", // Moderate exercise frequency
    light: "", // Light exercise frequency
    sweatingFrequency: "", // How often the user exercises enough to sweat
  });

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on mount
  }, []);

  // Handle input change for all questions
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handlesubmit = (e) => {
    e.preventDefault();
    alert("תשובותיך נשמרו בהצלחה.");
    navigate("/mspssquastionaire", { state: { preferredLanguage } });
  };

  return (
    <form onSubmit={handlesubmit}>
      <h3 className="text-center">שאלון הרגלי פעילות גופנית בשעות הפנאי</h3>

      {/* Question 1: Do you think you exercise enough? */}
      <div className="form-group radio-preferred">
        <label className="form-label">
          {preferredLanguage === "לשון זכר"
            ? "האם לדעתך, אתה מבצע מספיק פעילות גופנית?"
            : "האם לדעתך, את מבצעת מספיק פעילות גופנית?"}
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

      <h3 className="form-label radio-preferred">
      {preferredLanguage === "לשון זכר"
            ? "במהלך 7 ימים (שבוע), כמה פעמים בממוצע אתה מבצע את הפעילויות הבאות למשך 15 דקות לפחות?"
            : "במהלך 7 ימים (שבוע), כמה פעמים בממוצע את מבצעת את הפעילויות הבאות למשך 15 דקות לפחות?"}
      </h3>

      <div className="form-group radio-preferred">
        <label className="form-label">
          פעילות עצימה (הלב פועם במהירות) - ריצה, כדורגל, כדורסל, ג'ודו, החלקה, שחייה נמרצת, רכיבה נמרצת על אופניים
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
          פעילות מתונה (לא מתישה) - הליכה מהירה, טניס, רכיבה איטית על אופניים, כדורעף, שחייה קלה, ריקוד וכו'
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
          פעילות קלה (מאמץ מינימלי) - יוגה, פילאטיס, רכיבה על סוסים, כדורת (באולינג), הליכה איטית
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
            ? "במהלך שבוע ממוצע, באיזו תדירות אתה עוסק בפעילות גופנית מספיק זמן על מנת להזיע (פעימות לב מהירות)?"
            : "במהלך שבוע ממוצע, באיזו תדירות את עוסקת בפעילות גופנית מספיק זמן על מנת להזיע (פעימות לב מהירות)?"}
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
