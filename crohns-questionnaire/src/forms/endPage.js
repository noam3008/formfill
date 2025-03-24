import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image002 from "../images/image002.jpg"; // Import the image
import "../css/MyForm.css";

const EndPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on mount
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isChecked) {
      alert("Please agree to the terms before submitting.");
      return;
    }

    alert("Thank you for agreeing to participate in the study.");
    navigate("/start"); // Navigate to /start after submission
  };

  return (
    <div className="acceptance-form-container">
      {/* Logo inside the content width */}
      <div className="acceptance-form-content">
        <div className="logo-container">
          <img src={image002} alt="Study Banner" />
        </div>

        <p dir="rtl">
        תודה רבה על זמנך היקר והשתתפותך בשאלון, ותרומתך למחקר.
        בהמשך יתכן ונפנה אליך המייל עם שאלונים נוספים               
נשמח לעדכן אותך על התקדמות המחקר בהמשך.         

</p>
<p dir="rtl">
לשאלות מוזמנים לפנות לכתובת מייל הבאה :
</p>
<p dir="rtl">
  <a href="mailto:coltontauaic@tauex.tau.ac.il">
     coltonsurvey@tauex.tau.ac.il
  </a>.
</p>
      </div>
    </div>
  );
};

export default EndPage;

