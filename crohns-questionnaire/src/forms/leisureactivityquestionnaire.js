import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../css/traumaStyle.css";

const LeisureActivityQuestionnaire = () => {
    const location = useLocation();
    const { preferredLanguage } = location.state || {}; // Extract preferred language from state
  const navigate = useNavigate();

  // State initialization for frequency of activities and score calculation
  const [formData, setFormData] = useState({
    strenuous: "", // Strenuous exercise frequency
    moderate: "",  // Moderate exercise frequency
    light: "",     // Light exercise frequency
  });

    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to the top of the page on mount
    }, []);

  // Handle input change for the exercise types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value, 10),
    });
  };

  // Calculate the total score for leisure activity
  const calculateScore = () => {
    const totalScore =
      9 * formData.strenuous + 5 * formData.moderate + 3 * formData.light;
    return totalScore;
  };

  // Handle form submission
  const handlesubmit = (e) => {
    e.preventDefault();
    alert("תשובותיך נשמרו בהצלחה.");
    navigate("/mspssquastionaire", { state: { preferredLanguage } });
  };

  return (
    <form onSubmit={handlesubmit}>
      <h3 className="text-center">שאלון פעילות גופנית בשעות פנאי</h3>

      <div className="form-group radio-preferred">
        <label className="form-label">
        {preferredLanguage === "לשון זכר"
          ? "ציין את כמות הפעמים בשבוע בה אתה עוסק בפעילות גופנית מאומצת (ריצה, כדורגל, כדורסל, וכו') למשך יותר מ-15 דקות?"

          : "צייני את כמות הפעמים בשבוע בה את עוסקת בפעילות גופנית מאומצת (ריצה, כדורגל, כדורסל, וכו') למשך יותר מ-15 דקות"
}
       
        </label>
        <input
          type="number"
          min = "0"
          className="form-control"
          name="strenuous"
          value={formData.strenuous}
          onChange={handleChange}
          placeholder="פעמים בשבוע"
        />
      </div>

      <div className="form-group radio-preferred">
        <label className="form-label">
        {preferredLanguage === "לשון זכר"
          ? "ציין את כמות הפעמים בשבוע בה אתה עוסק בפעילות גופנית מתונה (הליכה מהירה, רכיבה על אופניים, וכו') למשך יותר מ-15 דקות?"

          : "צייני את כמות הפעמים בשבוע בה את עוסקת בפעילות גופנית מתונה (הליכה מהירה, רכיבה על אופניים, וכו') למשך יותר מ-15 דקות?"
}
       
          ציין את כמות הפעמים בשבוע בה אתה עוסק בפעילות גופנית מתונה (הליכה מהירה, רכיבה על אופניים, וכו') למשך יותר מ-15 דקות?
        </label>
        <input
          type="number"
          min = "0"
          className="form-control"
          name="moderate"
          value={formData.moderate}
          onChange={handleChange}
          placeholder="פעמים בשבוע"
        />
      </div>

      <div className="form-group radio-preferred">
        <label className="form-label">
        {preferredLanguage === "לשון זכר"
          ? "ציין את כמות הפעמים בשבוע אתה עוסק בפעילות גופנית קלה (הליכה קלה, מתיחות, וכו') למשך יותר מ-15 דקות?"

          : "צייני את כמות הפעמים בשבוע בה את עוסקת בפעילות גופנית קלה (הליכה קלה, מתיחות, וכו') למשך יותר מ-15 דקות?"
}
          
        </label>
        <input
          type="number"
          min = "0"
          className="form-control"
          name="light"
          value={formData.light}
          onChange={handleChange}
          placeholder="פעמים בשבוע"
        />
      </div>

      <button type="submit" className="btn btn-primary mt-4">
        שלח שאלון
      </button>
    </form>
  );
};

export default LeisureActivityQuestionnaire;
