import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MyForm.css';
import {useNavigate} from "react-router-dom";
import { useEffect } from 'react';

const PersonalForm = () => {
  const [formData, setFormData] = useState({
    maritalStatus: '',
    numberOfChildren: '',
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
    fatherAgeAtBirth: '',
    householdMembers: '',
    petOwner: '',
    petAge: '',
    experiencedLoss: '',
    ageAtLoss: '',
    welfareTreatment: ''
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    if (formData.numberOfChildren < 0) {
      alert("מספר ילדים חייב להיות מספר חיובי או 0"); // Hebrew: "The age must be a positive number."
      return; // Prevents updating the state with an invalid value
  }
    navigate("/medicalformfirst");
    
    // You can add an API call here
    
  };

  const siblingInputs = Array.from({ length: Number(formData.numberOfSiblings) || 0 }, (_, index) => (
    <div className="form-group" key={index}>
      <label htmlFor={`siblingAge-${index}`}>גיל אח/אחות {index + 1}</label>
      <input
        type="number"
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
      <form onSubmit={handleSubmit}>
        <div className="form-group  radio-preferred">
          <label htmlFor="maritalStatus"  className="form-label">מצב אישי</label>
          <div className="form-check">
              <input type="radio" name="maritalStatus" value="רווק" onChange={handleChange}  /> רווק
          </div>
          <div className="form-check">
              <input type="radio" name="maritalStatus" value="נשוי" onChange={handleChange}  /> נשוי
          </div>
          <div className="form-check">
              <input type="radio" name="maritalStatus" value="נשוי בשנית" onChange={handleChange}  /> נשוי בשנית
          </div>
          <div className="form-check">
              <input type="radio" name="maritalStatus" value="גרוש" onChange={handleChange}  /> גרוש
          </div>
          <div className="form-check">
              <input type="radio" name="maritalStatus" value="אלמן" onChange={handleChange}  /> אלמן
          </div>
          <div className="form-check">
              <input type="radio" name="maritalStatus" value="פרוד" onChange={handleChange}  /> פרוד
          </div>
        </div>

        {/*{formData.maritalStatus === 'נשוי' && (*/}
        {/*  <div className="form-group">*/}
        {/*    <label htmlFor="numberOfChildren">רק לגברים: מספר ילדים</label>*/}
        {/*    <input type="number" name="numberOfChildren" id="numberOfChildren" className="form-control" value={formData.numberOfChildren} onChange={handleChange} />*/}
        {/*  </div>*/}
        {/*)}*/}

          
                {/* Age */}
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

        <div className="form-group">
          <label htmlFor="height">גובה (בס"מ)</label>
          <input type="number" name="height" id="height" min="0" className="form-control" value={formData.height} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="weight">משקל (בק"ג)</label>
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

        <div className="form-group">
          <label htmlFor="currentOccupation">עיסוק נוכחי</label>
          <select name="currentOccupation" id="currentOccupation" className="form-control" value={formData.currentOccupation} onChange={handleChange} >
            <option value="" disabled>בחר עיסוק</option>
            <option value="תלמיד.ה">תלמיד.ה</option>
            <option value="סטודנט.ית">סטודנט.ית</option>
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
          <input type="number" name="yearsInOccupation" id="yearsInOccupation" className="form-control" value={formData.yearsInOccupation} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="employmentType">?כיצד אתה מגדיר את אופי העסקתך</label>
          <select name="employmentType" id="employmentType" className="form-control" value={formData.employmentType} onChange={handleChange} >
            <option value="" disaled>בחר אופי העסקה</option>
            <option value="עובד מהבית">עובד מהבית</option>
            <option value="עובד היברידי">עובד היברידי</option>
            <option value="משרה מלאה במקום העבודה">משרה מלאה במקום העבודה</option>
            <option value="משמרות">משמרות</option>
            <option value="לא עובד">לא עובד</option>
            <option value="בעל קצבת נכות">בעל קצבת נכות</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dailyActivity">ביום עבודה ממוצע את.ה בעיקר:</label>
          <select name="dailyActivity" id="dailyActivity" className="form-control" value={formData.dailyActivity} onChange={handleChange} >
            <option value="" disabled>בחר פעילות</option>
            <option value="יושב.ת">יושב.ת</option>
            <option value="עומד.ת">עומד.ת</option>
            <option value="נוהג.ת">נוהג.ת</option>
            <option value="עבודה פיזית קלה">עבודה פיזית קלה</option>
            <option value="עבודה פיזית מאומצת">עבודה פיזית מאומצת</option>
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
          <input type="number" name="familyOrder" id="familyOrder" className="form-control" value={formData.familyOrder} onChange={handleChange} />
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
            <label htmlFor="petAge">אם כן, מאיזה גיל יש לך חיית מחמד?</label>
            <input type="number" name="petAge" id="petAge" className="form-control" value={formData.petAge} onChange={handleChange} />
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
            <label htmlFor="ageAtLoss">אם כן, באיזה גיל היית בזמן המאורע?</label>
            <input type="number" name="ageAtLoss" id="ageAtLoss" className="form-control" value={formData.ageAtLoss} onChange={handleChange} />
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
