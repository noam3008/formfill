import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image002 from "../images/image002.jpg"; // Import the image
import "../css/MyForm.css";
import { useEffect } from "react";

const AcceptanceForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to the top of the page on mount
    }, []);

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

      <img src={image002} alt="Study Banner" className="full-width-image" />
      <div className="acceptance-form-content">
        <h2>נעים מאוד</h2>
        <p>
          אנו במרכז קולטון לחקר מחלות אוטואימוניות באוניברסיטת ת"א עורכים/ות מחקר
          בנושא השפעת נתוני רקע סביבתיים משפיעים על מחלות אוטואימוניות. במטרה לקדם ידע,
          הבנה, מחקר מניעה וטיפול במחלות אוטואימוניות.
        </p>
        <p>
          מחקר נערך במסגרת מחקר רב שנתי באוניברסיטת תל אביב ע"י: פרופ' אורי נבו וד"ר
          גלי לרמן. אנו מזמינים אותך להשתתף במחקר שלנו על ידי מתן מענה על שאלונים
          מקוונים שאורכו כשעה. בנוסף, בעתיד המשתתפים יקבלו שאלונים נוספים ויתבקשו
          לשלוח העתק של תוצאות מעבדה עדכניות.
        </p>
        <p>
          כמו כן, בעתיד ייתכן ונציע לכם לתת דגימות דם/רוק/צואה. אין מחובתכם להסכים
          לתת דגימות אלו בעתיד, ואין קשר בין הסכמתכם למלא את השאלון לבין ההסכמה
          לספק דגימה.
        </p>
        <p>
          לפני התחלת המענה על השאלון, נבקשך להצהיר/ה בזאת כי ניתן לך מידע באשר
          למחקר ולמטרותיו וכי מילוי השאלון נעשה מרצונך החופשי, שהנך משתתפ/ת במחקר
          מתוך הסכמה מלאה. ידוע לך כי אינך חייב/ת להשתתף במחקר וכי בכל שלב את/ה
          יכול/ה להפסיק לענות על השאלון. כמו כן אינך מחוייב/ת לענות על כל השאלות
          בשאלון.
        </p>
        <p>
          מובטחת לך סודיות באשר לזהותך האישית ולא יעשה כל שימוש בפרטים שמלאת מלבד
          לצורך מחקר זה.
        </p>
        <p>בכל בעיה שקשורה למחקר תוכל/י לפנות אלינו להתייעצות נוספת:</p>
        <p>
          <a href="mailto:coltontauaic@tauex.tau.ac.il">
            coltontauaic@tauex.tau.ac.il
          </a>
        </p>

        {/* Checkbox Group */}
        <div className="checkbox-group">
          <label htmlFor="acceptance-checkbox" className="form-label">
            <input
              type="checkbox"
              id="acceptance-checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              aria-label="אני מסכים/ה להשתתף במחקר בהתאם לתנאים המפורטים מעלה"
            />
            אני מסכים/ה להשתתף במחקר בהתאם לתנאים המפורטים מעלה.
          </label>
        </div>

        {/* Submit Button */}
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
