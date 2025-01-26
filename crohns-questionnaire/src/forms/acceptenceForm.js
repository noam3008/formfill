import React, { useState } from "react";
import "../css/MyForm.css";
import { useNavigate } from "react-router-dom";

const AcceptanceForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isChecked) {
      alert("Thank you for agreeing to participate in the study.");
      navigate("/start"); // Navigate to /start when accepted
    } else {
      alert("Please agree to the terms before submitting.");
    }
  };

  return (
    <div className="acceptance-form-container">
      <div className="acceptance-form-content">
        <h2>נעים מאוד</h2>
        <p>
          אנו במרכז קולטון לחקר מחלות אוטואימוניות באוניברסיטת ת"א עורכים/ות מחקר
          בנושא השפעת נתוני רקע סביבתיים משפיעים על מחלות אוטואימוניות. במטרה לקדם ידע,
          הבנה, מחקר מניעה וטיפול במחלות אוטואימוניות
        </p>
        <p>
          מחקר נערך במסגרת מחקר רב שנתי באוניברסיטת תל אביב ע"י: פרופ' אורי נבו וד"ר
          גלי לרמן אנו מזמינים אותך להשתתף במחקר שלנו על ידי מתן מענה על שאלונים
          מקוונים שאורכו כשעה בנוסף, בעתיד המשתתפים יקבלו שאלונים נוספים ויתבקשו
          לשלוח העתק של תוצאות מעבדה עדכניות
        </p>
        <p>
          כמו כן, בעתיד ייתכן ונציע לכם לתת דגימות דם/רוק/צואה. אין מחובתכם להסכים
          לתת דגימות אלו בעתיד, ואין קשר בין הסכמתכם למלא את השאלון לבין ההסכמה
          לספק דגימה
        </p>
        <p>
          לפני התחלת המענה על השאלון, נבקשך להצהיר/ה בזאת כי ניתן לך מידע באשר
          למחקר ולמטרותיו וכי מילוי השאלון נעשה מרצונך החופשי, שהנך משתתפ/ת במחקר
          מתוך הסכמה מלאה, ידוע לך כי אינך חייב/ת להשתתף במחקר וכי בכל שלב את/ה
          יכול/ה להפסיק לענות על השאלון. כמו כן אינך מחוייב/ת לענות על כל השאלות
          בשאלון
        </p>
        <p>
          מובטחת לך סודיות באשר לזהותך האישית ולא יעשה כל שימוש בפרטים שמלאת מלבד
          לצורך מחקר זה
        </p>
        <p>בכל בעיה שקשורה למחקר תוכל/י לפנות אלינו להתייעצות נוספת:</p>
        <p>
          <a href="mailto:coltontauaic@tauex.tau.ac.il">
            coltontauaic@tauex.tau.ac.il
          </a>
        </p>
        <p>
          <label htmlFor="agreement">
            אני מסכים/ה להשתתף במחקר בהתאם לתנאים המפורטים מעלה
          </label>
          <input
            type="checkbox"
            id="agreement"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </p>
        <button
          type="submit"
          className="submit-button"
          onClick={handleSubmit}
          disabled={!isChecked}
        >
          שלח/י
        </button>
      </div>
    </div>
  );
};

export default AcceptanceForm;
