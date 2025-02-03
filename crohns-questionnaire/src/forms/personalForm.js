import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MyForm.css';
import {useNavigate,useLocation} from "react-router-dom";
import { useEffect } from 'react';

const PersonalForm = () => {
  const location = useLocation();
  const { preferredLanguage } = location.state || {};
  
  const [formData, setFormData] = useState({
    maritalStatus: '',
    numberOfChildren: '',
    changeTime : '',
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
    preferredLanguage:preferredLanguage,
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


  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page when the component mounts
  }, []); // Empty dependency array to ensure it runs only once when the component mounts


  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSiblingAgeChange = (index, value) => {
    const updatedAges = [...formData.siblingAges];
    updatedAges[index] = value;
    setFormData({ ...formData, siblingAges: updatedAges });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    if (formData.numberOfChildren < 0) {
      alert("מספר ילדים חייב להיות מספר חיובי או 0"); // Hebrew: "The age must be a positive number."
      return; // Prevents updating the state with an invalid value
  }
   navigate("/medicalformfirst", { state: { preferredLanguage: formData.preferredLanguage } });
  
    
    // You can add an API call here
    
  };

  const siblingInputs = Array.from({ length: Number(formData.numberOfSiblings) || 0 }, (_, index) => (
    <div className="form-group" key={index}>
      <label htmlFor={`siblingAge-${index}`}>גיל אח/אחות {index + 1}</label>
      <input
        type="number"
        min = "0"
        id={`siblingAge-${index}`}
        className="form-control"
        value={formData.siblingAges[index] || ''}
        onChange={(e) => handleSiblingAgeChange(index, e.target.value)}
      />
    </div>
  ));

  return (
    
    <div className="form-container">
      <h2 className="mb-4 text-center">Personal Information Form</h2>
      <form onSubmit={handlesubmit}>
      <div className="form-group radio-preferred">
      <label htmlFor="maritalStatus" className="form-label">מצב אישי</label>

            {valuesToUse.map((item, index) => (
              <div className="form-check" key={index}>
                <input
                  type="radio"
                  id={item.value}
                  name="maritalStatus"
                  value={item.value}
                  onChange={handleChange}
                  checked={formData.maritalStatus === item.value}
                />
                <label htmlFor={item.value}>{item.label}</label>
              </div>
            ))}
          </div>       
               
        {formData.preferredLanguage === 'לשון זכר' && (
        <div className="form-group">
            <label className="form-label">מספר ילדים</label>
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
          <label htmlFor="height">גובה (בס"מ)</label>
          <input type="number" name="height" id="height" min="0" className="form-control" value={formData.height} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="weight">משקל (בק"ג
            )</label>
          <input type="number" name="weight" id="weight" min ="0" className="form-control" value={formData.weight} onChange={handleChange} />
        </div>

        <div className="form-group radio-preferred">
          <label htmlFor="weightChange" className="form-label" >האם היה לך שינוי של מעל 10 ק"ג במשקל במהלך חייך?</label>
          <div className="form-check">
              <input type="radio" name="weightChange" value="כן" onChange={handleChange}  /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="weightChange" value="לא" onChange={handleChange}  /> לא
          </div>
        </div>

        {/* Conditional rendering for additional fields if "Yes" is selected */}
        {formData.weightChange === 'כן' && (
                <div>
                
          {/* Month and Year input */}
          <div className="form-group">
            <label htmlFor="changeTime" className="form-label">
              מתי?
            </label>
            <div className="d-flex">
              {/* Month Dropdown */}
              <select
                id="month"
                name="changeTime"
                className="form-control"
                value={formData.changeTime.split("-")[0] || ""}
                onChange={(e) => handleChange({ target: { name: "changeTime", value: `${e.target.value}-${formData.changeTime.split("-")[1] || ""}` } })}
              >
                <option value="">בחר חודש</option>
                {["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"].map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>

              {/* Year Input */}
              <input
                type="number"
                id="year"
                min = "1900"
                name="changeTime"
                className="form-control"
                placeholder="שנה"
                value={formData.changeTime.split("-")[1] || ""}
                onChange={(e) => handleChange({ target: { name: "changeTime", value: `${formData.changeTime.split("-")[0] || ""}-${e.target.value}` } })}
                style={{ marginLeft: "10px", width: "100px" }}
              />
            </div>
            </div>
                  
                  <div className="form-group">
                    <label htmlFor="diseaseImpact" className="form-label">
                      האם השינוי השפיע על מהלך המחלה?
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
              )}


        <div className="form-group">
          <label htmlFor="currentOccupation">עיסוק נוכחי</label>
          <select name="currentOccupation" id="currentOccupation" className="form-control" value={formData.currentOccupation} onChange={handleChange} >
            <option value="" disabled>בחר עיסוק</option>
            <option value="תלמיד.ה">תלמיד</option>
            <option value="סטודנט.ית">סטודנט</option>
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
          <label htmlFor="yearsInOccupation">מספר השנים בעיסוק זה</label>
          <input type="number" min ="0" name="yearsInOccupation" id="yearsInOccupation" className="form-control" value={formData.yearsInOccupation} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="employmentType">?כיצד אתה מגדיר את אופי העסקתך</label>
          <select
        name="employmentType"
        id="employmentType"
        className="form-control"
        value={formData.employmentType}
        onChange={handleChange}
      >
        <option value="" disabled>בחר אופי העסקה</option>
        {employmentOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
        </div>

        <div className="form-group">
          <label htmlFor="dailyActivity">:ביום עבודה ממוצע המצב שגופך נמצא בו </label>
          <select
        name="dailyActivity"
        id="dailyActivity"
        className="form-control"
        value={formData.dailyActivity}
        onChange={handleChange}
      >
        <option value="" disabled>בחר פעילות</option>
        {dailyActivityOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
        </div>

        <div className="form-group">
          <label htmlFor="education">השכלה</label>
          <select name="education" id="education" className="form-control" value={formData.education} onChange={handleChange} >
            <option value="" disabled>בחר השכלה</option>
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
          <label htmlFor="educationYears">מספר שנות לימוד</label>
          <select name="educationYears" id="educationYears" className="form-control" value={formData.educationYears} onChange={handleChange} >
            <option value="">בחר שנות לימוד</option>
            <option value="6-8">יסודית-6-8</option>
            <option value="8-12">תיכונית 8-12</option>
            <option value="12-15">על תיכונית 12-15</option>
            <option value="15+">אקדמאית >15</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="countryOfBirth">ארץ לידה</label>
          <input type="text" name="countryOfBirth" id="countryOfBirth" className="form-control" value={formData.countryOfBirth} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="motherCountryOfBirth">ארץ לידת האם</label>
          <input type="text" name="motherCountryOfBirth" id="motherCountryOfBirth" className="form-control" value={formData.motherCountryOfBirth} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="motherOrigin">מוצא האם</label>
          <input type="text" name="motherOrigin" id="motherOrigin" className="form-control" value={formData.motherOrigin} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="fatherCountryOfBirth">ארץ לידת האב</label>
          <input type="text" name="fatherCountryOfBirth" id="fatherCountryOfBirth" className="form-control" value={formData.fatherCountryOfBirth} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="fatherOrigin">מוצא האב</label>
          <input type="text" name="fatherOrigin" id="fatherOrigin" className="form-control" value={formData.fatherOrigin} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="numberOfSiblings">מספר אחים/אחיות</label>
          <input
            type="number"
            name="numberOfSiblings"
            id="numberOfSiblings"
            className="form-control"
            value={formData.numberOfSiblings}
            onChange={handleChange}
            min = "0"
          />
        </div>

        {siblingInputs}

        <div className="form-group">
          <label htmlFor="familyOrder">מקומך בסדר המשפחתי</label>
          <input type="number" name="familyOrder" min = "0" id="familyOrder" className="form-control" value={formData.familyOrder} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="motherAgeAtBirth">גיל האם בלידתך</label>
          <input type="number" name="motherAgeAtBirth" id="motherAgeAtBirth" min = "0" className="form-control" value={formData.motherAgeAtBirth} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="fatherAgeAtBirth">גיל האב בלידתך</label>
          <input type="number" name="fatherAgeAtBirth" id="fatherAgeAtBirth" min = "0" className="form-control" value={formData.fatherAgeAtBirth} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="householdMembers">מספר הנפשות החיות איתך במשק הבית</label>
          <input type="number" name="householdMembers" id="householdMembers" className="form-control" min = "0" value={formData.householdMembers} onChange={handleChange} />
        </div>

        <div className="form-group radio-preferred">
          <label htmlFor="petOwner" className="form-label" >האם יש בבית חיית מחמד?</label>
          <div className="form-check">
              <input type="radio" name="petOwner" value="כן" onChange={handleChange}  /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="petOwner" value="לא" onChange={handleChange}  /> לא
          </div>
        </div>


        {formData.petOwner === 'כן' && (
          <div className="form-group">
            <label htmlFor="petAge"> ?מאיזה גיל יש לך חיית מחמד</label>
            <input type="number" name="petAge" min = "0" id="petAge" className="form-control" value={formData.petAge} onChange={handleChange} />
          </div>
        )}

        <div className="form-group radio-preferred">
          <label htmlFor="experiencedLoss" className="form-label" >האם חווית אובדן של בן משפחה קרוב?</label>
          <div className="form-check">
              <input type="radio" name="experiencedLoss" value="כן" onChange={handleChange}  /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="experiencedLoss" value="לא" onChange={handleChange}  /> לא
          </div>
        </div>

        {formData.experiencedLoss === 'כן' && (
          <div className="form-group">
            <label htmlFor="ageAtLoss"> ?באיזה גיל היית בזמן המאורע</label>
            <input type="number" name="ageAtLoss" min = "0" id="ageAtLoss" className="form-control" value={formData.ageAtLoss} onChange={handleChange} />
          </div>
        )}

        <div className="form-group radio-preferred">
          <label htmlFor="welfareTreatment" className="form-label" >האם היית מטופל במערכת הרווחה?</label>
          <div className="form-check">
              <input type="radio" name="welfareTreatment" value="כן" onChange={handleChange}  /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="welfareTreatment" value="לא" onChange={handleChange}  /> לא
          </div>
        </div>


        <button type="submit" className="btn btn-primary">שלח</button>
      </form>
    </div>
  );
};

export default PersonalForm;
