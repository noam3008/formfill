import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MyForm.css';
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';

const PersonalForm = () => {
  const location = useLocation();
  const { preferredLanguage, idNumber } = location.state || {};
  const [questions, setQuestions] = useState([]); // Store questions from DB
  const [formData, setFormData] = useState({
    idNumber: location.state?.idNumber,
    preferredLanguage: location.state?.preferredLanguage || "",
    maritalStatus: '',
    numberOfChildren: '',
    changeTime: '',
    height: '',
    weight: '',
    weightChange: '',
    currentOccupation: '',
    yearsInOccupation: '',
    employmentType: '',
    dailyActivity: '',
    education: '',
    countryOfBirth: '',
    motherCountryOfBirth: '',
    motherOrigin: '',
    fatherCountryOfBirth: '',
    fatherOrigin: '',
    numberOfSiblings: '',
    siblingAges: '',
    familyOrder: '',
    motherAgeAtBirth: '',
    preferredLanguage: preferredLanguage,
    fatherAgeAtBirth: '',
    householdMembers: '',
    petOwner: '',
    petAge: '',
    experiencedLoss: '',
    ageAtLoss: '',
    welfareTreatment: ''
  });

  // Define options for "לשון זכר"
  const maleDailyActivityOptions = [
    { value: "יושב", label: "יושב" },
    { value: "עומד", label: "עומד" },
    { value: "נוהג", label: "נוהג" },
    { value: "עבודה פיזית קלה", label: "עבודה פיזית קלה" },
    { value: "עבודה פיזית מאומצת", label: "עבודה פיזית מאומצת" },
  ];

  // Define options for "לשון נקבה"
  const femaleDailyActivityOptions = [
    { value: "יושבת", label: "יושבת" },
    { value: "עומדת", label: "עומדת" },
    { value: "נוהגת", label: "נוהגת" },
    { value: "עבודה פיזית קלה", label: "עבודה פיזית קלה" },
    { value: "עבודה פיזית מאומצת", label: "עבודה פיזית מאומצת" },
  ];

  // Select the appropriate options based on the preferred language
  const dailyActivityOptions = preferredLanguage === 'לשון זכר' ? maleDailyActivityOptions : femaleDailyActivityOptions;


  const maleValues = [
    { value: 'רווק', label: 'רווק' },
    { value: 'נשוי', label: 'נשוי' },
    { value: 'נשוי בשנית', label: 'נשוי בשנית' },
    { value: 'גרוש', label: 'גרוש' },
    { value: 'אלמן', label: 'אלמן' },
    { value: 'פרוד', label: 'פרוד' }
  ];

  const femaleValues = [
    { value: 'רווקה', label: 'רווקה' },
    { value: 'נשואה', label: 'נשואה' },
    { value: 'נשואה בשנית', label: 'נשואה בשנית' },
    { value: 'גרושה', label: 'גרושה' },
    { value: 'אלמנה', label: 'אלמנה' },
    { value: 'פרודה', label: 'פרודה' }
  ];

  const maleEmploymentOptions = [
    { value: "עובד מהבית", label: "עובד מהבית" },
    { value: "עובד היברידי", label: "עובד היברידי" },
    { value: "משרה מלאה במקום העבודה", label: "משרה מלאה במקום העבודה" },
    { value: "משמרות", label: "משמרות" },
    { value: "לא עובד", label: "לא עובד" },
    { value: "בעל קצבת נכות", label: "בעל קצבת נכות" },
  ];

  // Define options for "לשון נקבה"
  const femaleEmploymentOptions = [
    { value: "עובדת מהבית", label: "עובדת מהבית" },
    { value: "עובדת היברידית", label: "עובדת היברידית" },
    { value: "משרה מלאה במקום העבודה", label: "משרה מלאה במקום העבודה" },
    { value: "משמרות", label: "משמרות" },
    { value: "לא עובדת", label: "לא עובדת" },
    { value: "בעלת קצבת נכות", label: "בעלת קצבת נכות" },
  ];

  const valuesToUse = preferredLanguage === 'לשון זכר' ? maleValues : femaleValues;
  const employmentOptions = preferredLanguage === 'לשון זכר' ? maleEmploymentOptions : femaleEmploymentOptions;


  // useEffect(() => {
  //   window.scrollTo(0, 0); // Scrolls to the top of the page when the component mounts
  // }, []); // Empty dependency array to ensure it runs only once when the component mounts
////wqeeeeeeeeqwewqewqeqweqew
  useEffect(() => {
    axios.get("http://localhost:3002/test_questions_personal")
      .then((response) => {
        setQuestions(response.data); // Set questions in state
        const initialFormData = {};
        response.data.forEach(q => {
          initialFormData[q.field_name] = ""; // Initialize form data for each field
        });

        // Only set formData if it's not set yet, or add missing fields
        setFormData(prevData => ({
          ...prevData,   // Keep any previous formData values
          ...initialFormData // Add or override the new form fields
        }));
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });

    window.scrollTo(0, 0);

    // Set idNumber from location.state if not already in formData
    if (location.state?.idNumber && !formData.idNumber) {
      setFormData(prevData => ({
        ...prevData,
        idNumber: location.state.idNumber
      }));
    }
    if (location.state?.preferredLanguage && !formData.preferredLanguage) {
      setFormData(prevData => ({
        ...prevData,
        preferredLanguage: location.state.preferredLanguage
      }));
    }
  }, [location.state?.idNumber]); // Only rerun if location.state.idNumber changes


  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      console.log("Updated formData:", newData); // Debugging
      return newData;
    });
  };

  const handleSiblingAgeChange = (index, value) => {
    const updatedAges = [...formData.siblingAges];
    updatedAges[index] = value;
    setFormData({ ...formData, siblingAges: updatedAges });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("FormData before sending:", formData);

    try {
      if (formData.numberOfChildren < 0) {
        alert("מספר ילדים חייב להיות מספר חיובי או 0");
        return;
      }

      const response = await fetch("http://localhost:3002/submit_personal_info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorResponse = await response.text();
        console.error("Server response:", errorResponse);
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response data:", result);
      localStorage.setItem('userData', JSON.stringify(result));

      navigate("/diagnose", {
        state: { preferredLanguage: formData.preferredLanguage, idNumber: formData.idNumber }
      });

    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  const siblingInputs = Array.from({ length: Number(formData.numberOfSiblings) || 0 }, (_, index) => (
    <div className="form-group" key={index}>
      <label htmlFor={`siblingAge-${index}`}>גיל אח/אחות {index + 1}</label>
      <input
        type="number"
        min="0"
        id={`siblingAge-${index}`}
        className="form-control"
        value={formData.siblingAges[index] || ''}
        onChange={(e) => handleSiblingAgeChange(index, e.target.value)}
      />
    </div>
  ));

  return (

    <div className="form-container">
      <h2 className="mb-4 text-center">שאלון מידע אישי</h2>
      <form onSubmit={handlesubmit}>
        <div className="form-group radio-preferred">
          <label htmlFor="maritalStatus" className="form-label">
            {questions.find(q => q.field_name === "maritalStatus")?.question_text || "שאלה לא זמינה"}

          </label>

          {valuesToUse.map((item, index) => (
            <div className="form-check" key={index}>
              <input
                type="radio"
                id={item.value}
                name="maritalStatus"
                value={item.value}
                onChange={handleChange}
                checked={formData.maritalStatus === item.value}
                onClick={() => handleChange({ target: { name: "maritalStatus", value: formData.maritalStatus === item.value ? "" : item.value } })}
              />
              <label htmlFor={item.value}>{item.label}</label>
            </div>
          ))}
        </div>

        {formData.preferredLanguage === 'לשון זכר' && (
          <div className="form-group">
            <label className="form-label">
              {questions.find(q => q.field_name === "numberOfChildren")?.question_text || "שאלה לא זמינה"}

            </label>
            <input
              type="number"
              className="form-control"
              name="numberOfChildren"
              value={formData.numberOfChildren}
              onChange={handleChange}

              min="0" // Ensures only positive numbers are allowed
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="height">
            {questions.find(q => q.field_name === "height")?.question_text || "שאלה לא זמינה"}

          </label>
          <input type="number" name="height" id="height" min="0" className="form-control" value={formData.height} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="weight">
            {questions.find(q => q.field_name === "weight")?.question_text || "שאלה לא זמינה"}</label>
          <input type="number" name="weight" id="weight" min="0" className="form-control" value={formData.weight} onChange={handleChange} />
        </div>

        <div className="form-group radio-preferred">
          <label htmlFor="weightChange" className="form-label">
            {questions.find(q => q.field_name === "weightChange")?.question_text || "שאלה לא זמינה"}
          </label>
          <div className="form-check">
            <input
              type="radio"
              name="weightChange"
              value="כן"
              checked={formData.weightChange === "כן"}
              onClick={() => handleChange({ target: { name: "weightChange", value: formData.weightChange === "כן" ? "" : "כן" } })}
              onChange={() => { }}
            /> כן
          </div>
          <div className="form-check">
            <input
              type="radio"
              name="weightChange"
              value="לא"
              checked={formData.weightChange === "לא"}
              onClick={() => handleChange({ target: { name: "weightChange", value: formData.weightChange === "לא" ? "" : "לא" } })}
              onChange={() => { }}
            /> לא
          </div>
        </div>



        {formData.weightChange === 'כן' && (
          <div>
            {/* Year Input Only */}
            <div className="form-group radio-preferred">
              <label htmlFor="changeTime" className="form-label">
                {questions.find(q => q.field_name === "changeTime")?.question_text || "שאלה לא זמינה"}
              </label>
              <div className="d-flex justify-content-end">
                <input
                  type="number"
                  id="year"
                  min="1900"
                  name="changeTime"
                  className="form-control"
                  placeholder="שנה"
                  value={formData.changeTime || ""}
                  onChange={(e) => handleChange({ target: { name: "changeTime", value: e.target.value } })}
                  style={{ width: "120px" }}
                />
              </div>
            </div>
          </div>
        )}



        <div>



          <div className="form-group">
            <label htmlFor="diseaseImpact" className="form-label">
              {questions.find(q => q.field_name === "diseaseImpact")?.question_text || "שאלה לא זמינה"}

            </label>
            <select
              id="diseaseImpact"
              name="diseaseImpact"
              className="form-control"
              value={formData.diseaseImpact}
              onChange={handleChange}
            >
              <option value="" disabled>בחר</option>
              <option value="לטובה">לטובה</option>
              <option value="לרעה">לרעה</option>
              <option value="לא השפיע">לא השפיע</option>
            </select>
          </div>
        </div>



        <div className="form-group">
          <label htmlFor="currentOccupation">

            {questions.find(q => q.field_name === "currentOccupation")?.question_text || "שאלה לא זמינה"}
          </label>
          <select name="currentOccupation" id="currentOccupation" className="form-control" value={formData.currentOccupation} onChange={handleChange} >
            <option value="" disabled>
              {preferredLanguage === "לשון זכר"
                ? " בחר עיסוק"
                : " בחרי עיסוק"}
            </option>
            <option value="תלמיד">
              {preferredLanguage === "לשון זכר"
                ? "תלמיד"
                : " תלמידה"}
            </option>
            <option value="סטודנט.ית">
              {preferredLanguage === "לשון זכר"
                ? "סטודנט"
                : " סטודנטית"}

            </option>
            <option value="מחשוב">מחשוב</option>
            <option value="כח אדם">כח אדם</option>
            <option value="בנקאות">בנקאות</option>
            <option value="תעשייה">תעשייה</option>
            <option value="הוראה">הוראה</option>
            <option value="כוחות בטחון">כוחות בטחון</option>
            <option value="רפואה">רפואה</option>
            <option value="טיפול">טיפול</option>
            <option value="מחקר">מחקר</option>
            <option value="עריכת דין">עריכת דין</option>
            <option value="הנדסה">הנדסה</option>
            <option value="ראיית חשבון">ראיית חשבון</option>
            <option value="פרסום">פרסום</option>
            <option value="ניהול">ניהול</option>
            <option value="קבלנות">קבלנות</option>
            <option value="הדרכה">הדרכה</option>
            <option value="פנסיה">פנסיה</option>
            <option value="אחר">אחר</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="yearsInOccupation">
            {questions.find(q => q.field_name === "yearsInOccupation")?.question_text || "שאלה לא זמינה"}
          </label>
          <input type="number" min="0" name="yearsInOccupation" id="yearsInOccupation" className="form-control" value={formData.yearsInOccupation} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="employmentType">
          {preferredLanguage === 'לשון זכר' 
                ? questions.find(q => q.field_name === "employmentTypeMan")?.question_text || "שאלה לא זמינה"
                : questions.find(q => q.field_name === "employmentTypeWoman")?.question_text || "שאלה לא זמינה"}

            

          </label>
          <select
            name="employmentType"
            id="employmentType"
            className="form-control"
            value={formData.employmentType}
            onChange={handleChange}
          >
            <option value="" disabled>
              {preferredLanguage === "לשון זכר" ? "בחר אופי העסקה" : "בחרי אופי העסקה"}
            </option>
            {employmentOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Only show this if employmentType is NOT "לא עובד" or "לא עובדת" */}
        {formData.employmentType !== "לא עובד" && formData.employmentType !== "לא עובדת" && (
          <div className="form-group">
            <label htmlFor="dailyActivity">
              {questions.find(q => q.field_name === "dailyActivity")?.question_text || "שאלה לא זמינה"}
            </label>
            <select
              name="dailyActivity"
              id="dailyActivity"
              className="form-control"
              value={formData.dailyActivity}
              onChange={handleChange}
            >
              <option value="" disabled>
                {preferredLanguage === "לשון זכר" ? "בחר פעילות" : "בחרי פעילות"}
              </option>
              {dailyActivityOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}


        <div className="form-group">
          <label htmlFor="education">
            {questions.find(q => q.field_name === "education")?.question_text || "שאלה לא זמינה"}
          </label>
          <select name="education" id="education" className="form-control" value={formData.education} onChange={handleChange} >
            <option value="" disabled>
              {preferredLanguage === "לשון זכר"
                ? "בחר השכלה"
                : "בחרי השכלה"}

            </option>
            <option value="יסודי">יסודי</option>
            <option value="תיכונית">תיכונית</option>
            <option value="הנדסאי">הנדסאי</option>
            <option value="תואר ראשון">תואר ראשון</option>
            <option value="תואר שני">תואר שני</option>
            <option value="דוקטורט">דוקטורט</option>
            <option value="פוסטדוקטורט">פוסטדוקטורט</option>

          </select>
        </div>

        <div className="form-group">
          <label htmlFor="educationYears">
            {questions.find(q => q.field_name === "educationYears")?.question_text || "שאלה לא זמינה"}
          </label>
          <select name="educationYears" id="educationYears" className="form-control" value={formData.educationYears} onChange={handleChange} >
            <option value="">בחר שנות לימוד</option>
            <option value="6-8">יסודית-6-8</option>
            <option value="8-12">תיכונית 8-12</option>
            <option value="12-15">על תיכונית 12-15</option>
            <option value="15+">אקדמאית >15</option>
          </select>
        </div>


        

        <div className="form-group">
          <label htmlFor="countryOfBirth">
            {questions.find(q => q.field_name === "countryOfBirth")?.question_text || "שאלה לא זמינה"}
          </label>
          <input type="text" name="countryOfBirth" id="countryOfBirth" className="form-control" value={formData.countryOfBirth} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="motherCountryOfBirth">
            {questions.find(q => q.field_name === "motherCountryOfBirth")?.question_text || "שאלה לא זמינה"}
          </label>
          <input type="text" name="motherCountryOfBirth" id="motherCountryOfBirth" className="form-control" value={formData.motherCountryOfBirth} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="motherOrigin">
            {questions.find(q => q.field_name === "motherOrigin")?.question_text || "שאלה לא זמינה"}
          </label>
          <input type="text" name="motherOrigin" id="motherOrigin" className="form-control" value={formData.motherOrigin} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="fatherCountryOfBirth">
            {questions.find(q => q.field_name === "fatherCountryOfBirth")?.question_text || "שאלה לא זמינה"}
          </label>
          <input type="text" name="fatherCountryOfBirth" id="fatherCountryOfBirth" className="form-control" value={formData.fatherCountryOfBirth} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="fatherOrigin">
            {questions.find(q => q.field_name === "fatherOrigin")?.question_text || "שאלה לא זמינה"}
          </label>
          <input type="text" name="fatherOrigin" id="fatherOrigin" className="form-control" value={formData.fatherOrigin} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="numberOfSiblings">
            {questions.find(q => q.field_name === "numberOfSiblings")?.question_text || "שאלה לא זמינה"}
          </label>
          <input
            type="number"
            name="numberOfSiblings"
            id="numberOfSiblings"
            className="form-control"
            value={formData.numberOfSiblings}
            onChange={handleChange}
            min="0"
            max ="12"
          />
        </div>

        {siblingInputs}

        <div className="form-group">
          <label htmlFor="familyOrder">
            {questions.find(q => q.field_name === "familyOrder")?.question_text || "שאלה לא זמינה"}
          </label>
          <input type="number" name="familyOrder" min="0" id="familyOrder" className="form-control" value={formData.familyOrder} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="motherAgeAtBirth">
            {questions.find(q => q.field_name === "motherAgeAtBirth")?.question_text || "שאלה לא זמינה"}
          </label>
          <input type="number" name="motherAgeAtBirth" id="motherAgeAtBirth" min="0" className="form-control" value={formData.motherAgeAtBirth} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="fatherAgeAtBirth">
            {questions.find(q => q.field_name === "fatherAgeAtBirth")?.question_text || "שאלה לא זמינה"}
          </label>
          <input type="number" name="fatherAgeAtBirth" id="fatherAgeAtBirth" min="0" className="form-control" value={formData.fatherAgeAtBirth} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="householdMembers">
            {questions.find(q => q.field_name === "householdMembers")?.question_text || "שאלה לא זמינה"}
          </label>
          <input type="number" name="householdMembers" id="householdMembers" className="form-control" min="0" value={formData.householdMembers} onChange={handleChange} />
        </div>

        <div className="form-group radio-preferred">
          <label htmlFor="petOwner" className="form-label" >
            {questions.find(q => q.field_name === "petOwner")?.question_text || "שאלה לא זמינה"}
          </label>
          <div className="form-check">
            <input type="radio" name="petOwner" value="כן" onChange={handleChange}
              onClick={() => handleChange({ target: { name: "petOwner", value: formData.petOwner === "כן" ? "" : "כן" } })}
              checked={formData.petOwner === "כן"}

            /> כן
          </div>
          <div className="form-check">
            <input type="radio" name="petOwner" value="לא" onChange={handleChange}
              onClick={() => handleChange({ target: { name: "petOwner", value: formData.petOwner === "לא" ? "" : "לא" } })}
              checked={formData.petOwner === "לא"}
            /> לא
          </div>
        </div>


        {formData.petOwner === 'כן' && (
          <div className="form-group">
            <label htmlFor="petAge">
              {questions.find(q => q.field_name === "petAge")?.question_text || "שאלה לא זמינה"}
            </label>
            <input type="number" name="petAge" min="0" id="petAge" className="form-control" value={formData.petAge} onChange={handleChange} />
          </div>
        )}

        <div className="form-group radio-preferred">
          <label htmlFor="experiencedLoss" className="form-label" >
            {questions.find(q => q.field_name === "experiencedLoss")?.question_text || "שאלה לא זמינה"}
          </label>
          <div className="form-check">
            <input type="radio" name="experiencedLoss" value="כן" onChange={handleChange}
                    onClick={() => handleChange({ target: { name: "experiencedLoss", value: formData.experiencedLoss === "כן" ? "" : "כן" } })}
                    checked={formData.experiencedLoss === "כן"}
                                       /> כן
          </div>
          <div className="form-check">
            <input type="radio" name="experiencedLoss" value="לא" onChange={handleChange}
                          onClick={() => handleChange({ target: { name: "experiencedLoss", value: formData.experiencedLoss === "לא" ? "" : "לא" } })}
                          checked={formData.experiencedLoss === "לא"}
                           /> לא
          </div>
        </div>

        {formData.experiencedLoss === 'כן' && (
          <div className="form-group">
            <label htmlFor="whoseLost">

              {questions.find(q => q.field_name === "whoseLost")?.question_text || "שאלה לא זמינה"}
            </label>
            <input type="text" name="whoseLost" id="whoseLost" className="form-control" value={formData.whoseLost} onChange={handleChange} />
          </div>
        )}

        {formData.experiencedLoss === 'כן' && (
          <div className="form-group">
            <label htmlFor="ageAtLoss">

              {questions.find(q => q.field_name === "ageAtLoss")?.question_text || "שאלה לא זמינה"}
            </label>
            <input type="number" name="ageAtLoss" min="0" id="ageAtLoss" className="form-control" value={formData.ageAtLoss} onChange={handleChange} />
          </div>
        )}

        <div className="form-group radio-preferred">
          <label htmlFor="welfareTreatment" className="form-label" >
            {questions.find(q => q.field_name === "welfareTreatment")?.question_text || "שאלה לא זמינה"}
          </label>
          <div className="form-check">
            <input type="radio" name="welfareTreatment" value="כן" onChange={handleChange} 
                                      onClick={() => handleChange({ target: { name: "welfareTreatment", value: formData.welfareTreatment === "כן" ? "" : "כן" } })}
                                      checked={formData.welfareTreatment === "כן"}
            /> כן
          </div>
          <div className="form-check">
            <input type="radio" name="welfareTreatment" value="לא" onChange={handleChange} 
                        onClick={() => handleChange({ target: { name: "welfareTreatment", value: formData.welfareTreatment === "לא" ? "" : "לא" } })}
                        checked={formData.welfareTreatment === "לא"}
            /> לא
          </div>
        </div>


        <h3>
          {preferredLanguage === "לשון זכר" ? " שלח שאלון מס 2 מתוך 15" : " שלחי שאלון מס 2 מתוך 15"}

        </h3>
        <button type="submit" className="btn btn-primary">
          {preferredLanguage === "לשון זכר" ? "שלח" : "שלחי"}
        </button>
      </form>
    </div>
  );
};

export default PersonalForm;
