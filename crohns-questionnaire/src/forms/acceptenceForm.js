import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image002 from "../images/image002.jpg"; // Import the image
import "../css/MyForm.css";

const AcceptanceForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [fullName, setFullName] = useState("");
  const [date, setDate] = useState("");
  const [agree, setAgree] = useState(null); // For Yes/No agreement
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on mount
  }, []);

  const handleAgreementChange = (value) => {
    setAgree(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (agree === "no") {
      alert("You cannot continue as you have not agreed to participate.");
      return;
    }

    if (!agree) {
      alert("Please agree to the terms before submitting.");
      return;
    }

    alert("Thank you for agreeing to participate in the study.");
    navigate("/start"); // Navigate to /start after submission
  };

  return (
    <div className="acceptance-form-container" dir="rtl">
      {/* Form Content */}
      <div className="acceptance-form-content">
        {/* Logo */}
        <div className="logo-container">
          <img src={image002} alt="Study Banner" />
        </div>

        {/* Updated Text */}
        <p>
          נעים מאוד, אנו במרכז קולטון לחקר מחלות אוטואימוניות באוניברסיטת
          ת"א עורכים/ות מחקר בנושא השפעת נתוני רקע סביבתיים, המשפעים על
          מחלות אוטואימוניות.
        </p>
        <p>
          במטרה לקדם ידע, הבנה, מחקר מניעה וטיפול במחלות אוטואימוניות.
        </p>
        <p>
          המחקר נערך במסגרת מחקר רב שנתי  באוניברסיטת תל אביב ע"י : פרופ' אורי
          נבו וד"ר גלי לרמן.
        </p>
        <p>
          אנו מזמינים אותך להשתתף במחקר שלנו על ידי מתן מענה על שאלונים
          מקוון שאורכו כשעה. המילוי גוזל זמן, ויכלול שאלות על מצבי סיכון
          בעבר- ויכול לעורר מצוקה. ניתן לדלג על כל שאלה שמעוררת אי נוחות.
        </p>
        <p>
          כמו כן, בעתיד יתכן ונציע לכם לתת דגימות דם/ רוק/ צואה . אין
          מחובתכם להסכים לתת דגימות אלו בעתיד, ואין קשר בין הסכמתם למלא את
          השאלון לבין ההסכמה לספק דגימה.
        </p>
        <p>
          לפני התחלת המענה על השאלון, נבקשך להצהיר/ה בזאת כי ניתן לך מידע
          באשר למחקר ולמטרותיו וכי מילוי השאלון נעשה מרצונך החופשי, שהנך
          משתתפ/ת במחקר מתוך הסכמה מלאה,  ידוע לך כי אינך חייב/ת להשתתף
          במחקר וכי בכל שלב את/ה יכול/ה להפסיק לענות על השאלון.
        </p>
        <p>
          כמו כן אינך מחוייב/ת לענות על כל השאלות בשאלון.
        </p>
        <p>
          מובטחת לך סודיות באשר לזהותך האישית ולא יעשה כל שימוש בפרטים
          שמלאת מלבד לצורך מחקר זה.
        </p>
        <p>
          בכל בעיה שקשורה למחקר תוכל/י לפנות אלינו להתייעצות נוספת,{" "}
          <a href="mailto:coltonsurvey@tauex.tau.ac.il">
            coltonsurvey@tauex.tau.ac.il
          </a>
        </p>

        {/* Agreement Section */}
        <p>
          <strong>כן:</strong> אני מבין/ה הסכמה מדעת זו ומסכים/ה להשתתף במחקר
        </p>
        <p>
          <strong>לא:</strong> אני לא מסכים/ה או לא רוצה להשתתף בשלב זה
        </p>

        {/* Text Boxes for Full Name and Date */}
        <div className="form-group radio-preferred" >
          <label htmlFor="fullName">שם מלא:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group radio-preferred">
          <label htmlFor="date">תאריך:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Radio Buttons for Agreement (Yes/No) */}
        <div className="checkbox-group radio-preferred">
          <label>
            <input
              type="radio"
              name="agreement"
              value="yes"
              checked={agree === "yes"}
              onChange={() => handleAgreementChange("yes")}
            />
            אני מבין/ה הסכמה מדעת זו ומסכים/ה להשתתף במחקר
          </label>
          <label>
            <input
              type="radio"
              name="agreement"
              value="no"
              checked={agree === "no"}
              onChange={() => handleAgreementChange("no")}
            />
            אני לא מסכים/ה או לא רוצה להשתתף בשלב זה
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="submit-button"
          onClick={handleSubmit}
          disabled={agree === null} // Disable if no selection made
        >
          שלח/י
        </button>
      </div>
    </div>
  );
};

export default AcceptanceForm;
