import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/MyForm.css";
import { useEffect } from 'react';

const MyForm = () => {
  const [formData, setFormData] = useState({
    idNumber: "",
    firstName: "", // New: First Name
    lastName: "",  // New: Last Name
    email: "",      // New: Email
    phone: "",      // New: Phone
    age: "",
    healthFund: "",
    gender: "",
    sex: "",
    preferredLanguage: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page when the component mounts
  }, []); // Empty dependency array to ensure it runs only once when the component mounts
      

  const validateForm = () => {
    const newErrors = {};
    if (!formData.idNumber.match(/^\d+$/)) newErrors.idNumber = "תעודת הזהות חייבת להיות מספר";
    if (!formData.firstName) newErrors.firstName = "שם פרטי נדרש";
    if (!formData.lastName) newErrors.lastName = "שם משפחה נדרש";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "כתובת אימייל אינה חוקית";
    if (!formData.phone.match(/^\d+$/)) newErrors.phone = "מספר הטלפון חייב להיות מספרים בלבד";
    if (formData.age <= 0) newErrors.age = "הגיל חייב להיות מספר חיובי";
    if (!formData.healthFund) newErrors.healthFund = "יש לבחור קופת חולים";
    if (!formData.gender) newErrors.gender = "יש לבחור מגדר";
    if (!formData.sex) newErrors.sex = "יש לבחור מין";
    if (!formData.preferredLanguage) newErrors.preferredLanguage = "יש לבחור שפה מועדפת";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Post the form data to the backend

    // Navigate based on the preferred language
    if (formData.preferredLanguage === "לשון נקבה") {
      navigate("/woman", { state: { preferredLanguage: formData.preferredLanguage } });
    } else {
      navigate("/personalform", { state: { preferredLanguage: formData.preferredLanguage } });
    }
  };

  return (
    <div className="form-container">
      <h2>טופס הרשמה</h2>
      <form onSubmit={handlesubmit}>
        {/* ID Number */}
        <div className="form-group radio-preferred">
          <label className="form-label">תעודת זהות</label>
          <input
            type="text"
            className={`form-control ${errors.idNumber ? "is-invalid" : ""}`}
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
          />
          {errors.idNumber && <div className="invalid-feedback">{errors.idNumber}</div>}
        </div>

        {/* First Name */}
        <div className="form-group radio-preferred">
          <label className="form-label">שם פרטי</label>
          <input
            type="text"
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>

        {/* Last Name */}
        <div className="form-group radio-preferred">
          <label className="form-label">שם משפחה</label>
          <input
            type="text"
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
        </div>

        {/* Email */}
        <div className="form-group radio-preferred">
          <label className="form-label">מייל</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {/* Phone */}
        <div className="form-group radio-preferred">
          <label className="form-label">טלפון</label>
          <input
            type="text"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        {/* Age */}
        <div className="form-group radio-preferred">
          <label className="form-label">גיל</label>
          <input
            type="number"
            className={`form-control ${errors.age ? "is-invalid" : ""}`}
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <div className="invalid-feedback">{errors.age}</div>}
        </div>

        {/* Health Fund */}
        <div className="form-group radio-preferred">
          <label className="form-label">קופת חולים</label>
          <select
            className={`form-control ${errors.healthFund ? "is-invalid" : ""}`}
            name="healthFund"
            value={formData.healthFund}
            onChange={handleChange}
          >
            <option value="" disabled>בחר</option>
            <option value="כללית">כללית</option>
            <option value="מכבי">מכבי</option>
            <option value="לאומית">לאומית</option>
            <option value="מאוחדת">מאוחדת</option>
          </select>
          {errors.healthFund && <div className="invalid-feedback">{errors.healthFund}</div>}
        </div>

        {/* Gender */}
        <div className="form-group radio-preferred">
          <label className="form-label">מגדר</label>
          <div className="radio-group">
            <div className="form-check">
              <input
                type="radio"
                name="gender"
                value="גבר"
                onChange={handleChange}
              /> גבר
            </div>
            <div className="form-check">
              <input
                type="radio"
                name="gender"
                value="אישה"
                onChange={handleChange}
              /> אישה
            </div>
          </div>
          {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
        </div>

        {/* Sex */}
        <div className="form-group radio-preferred">
          <label className="form-label">מין</label>
          <div className="radio-group">
            <div className="form-check">
              <input
                type="radio"
                name="sex"
                value="זכר"
                onChange={handleChange}
              /> זכר
            </div>
            <div className="form-check">
              <input
                type="radio"
                name="sex"
                value="נקבה"
                onChange={handleChange}
              /> נקבה
            </div>
          </div>
          {errors.sex && <div className="invalid-feedback">{errors.sex}</div>}
        </div>

        {/* Preferred Language */}
        <div className="form-group radio-preferred">
          <label className="form-label">מה ניסוח הפניה המועדף עליך?</label>
          <div className="radio-group">
            <div className="form-check">
              <input
                type="radio"
                name="preferredLanguage"
                value="לשון זכר"
                onChange={handleChange}
              /> לשון זכר
            </div>
            <div className="form-check">
              <input
                type="radio"
                name="preferredLanguage"
                value="לשון נקבה"
                onChange={handleChange}
              /> לשון נקבה
            </div>
          </div>
          {errors.preferredLanguage && <div className="invalid-feedback">{errors.preferredLanguage}</div>}
        </div>

        <button type="submit" className="btn btn-primary">שלח</button>
      </form>
    </div>
  );
};

export default MyForm;
