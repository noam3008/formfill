import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MyForm.css';
import {useNavigate} from "react-router-dom";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    navigate("/medicalformfirst")
    // You can add an API call here
  };

  return (
    <div className="form-container">
      <h2 className="mb-4">Personal Information Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="maritalStatus">מצב אישי</label>
          <select name="maritalStatus" id="maritalStatus" className="form-control" value={formData.maritalStatus} onChange={handleChange} required>
            <option value="">בחר מצב אישי</option>
            <option value="רווק">רווק</option>
            <option value="נשוי">נשוי</option>
            <option value="נשוי בשנית">נשוי בשנית</option>
            <option value="גרוש">גרוש</option>
            <option value="אלמן">אלמן</option>
            <option value="פרוד">פרוד</option>
          </select>
        </div>

        {/*{formData.maritalStatus === 'נשוי' && (*/}
        {/*  <div className="form-group">*/}
        {/*    <label htmlFor="numberOfChildren">רק לגברים: מספר ילדים</label>*/}
        {/*    <input type="number" name="numberOfChildren" id="numberOfChildren" className="form-control" value={formData.numberOfChildren} onChange={handleChange} />*/}
        {/*  </div>*/}
        {/*)}*/}

          <div className="form-group">
            <label htmlFor="numberOfChildren"> מספר ילדים</label>
            <input type="number" name="numberOfChildren" id="numberOfChildren" className="form-control" value={formData.numberOfChildren} onChange={handleChange} />


          <label htmlFor="height">גובה (בס"מ)</label>
          <input type="number" name="height" id="height" className="form-control" value={formData.height} onChange={handleChange} />



          <label htmlFor="weight">משקל (בק"ג)</label>
          <input type="number" name="weight" id="weight" className="form-control" value={formData.weight} onChange={handleChange} />


          <label htmlFor="weightChange">האם היה לך שינוי משמעותי במשקל במהלך חייך?</label>
          <textarea name="weightChange" id="weightChange" className="form-control" value={formData.weightChange} onChange={handleChange}></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="currentOccupation">עיסוק נוכחי</label>
          <select name="currentOccupation" id="currentOccupation" className="form-control" value={formData.currentOccupation} onChange={handleChange} required>
            <option value="">בחר עיסוק</option>
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
          <label htmlFor="employmentType">כיצד אתה מגדיר את אופי העסקתך?</label>
          <select name="employmentType" id="employmentType" className="form-control" value={formData.employmentType} onChange={handleChange} required>
            <option value="">בחר אופי העסקה</option>
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
          <select name="dailyActivity" id="dailyActivity" className="form-control" value={formData.dailyActivity} onChange={handleChange} required>
            <option value="">בחר פעילות</option>
            <option value="יושב.ת">יושב.ת</option>
            <option value="עומד.ת">עומד.ת</option>
            <option value="נוהג.ת">נוהג.ת</option>
            <option value="עבודה פיזית קלה">עבודה פיזית קלה</option>
            <option value="עבודה פיזית מאומצת">עבודה פיזית מאומצת</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="education">השכלה</label>
          <select name="education" id="education" className="form-control" value={formData.education} onChange={handleChange} required>
            <option value="">בחר השכלה</option>
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
          <select name="educationYears" id="educationYears" className="form-control" value={formData.educationYears} onChange={handleChange} required>
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
          <label htmlFor="numberOfSiblings">מספר אחים/ אחיות</label>
          <input type="number" name="numberOfSiblings" id="numberOfSiblings" className="form-control" value={formData.numberOfSiblings} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="siblingAges">גילאי האחים/ אחיות</label>
          <input type="text" name="siblingAges" id="siblingAges" className="form-control" value={formData.siblingAges} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="familyOrder">מקומך בסדר המשפחתי</label>
          <input type="number" name="familyOrder" id="familyOrder" className="form-control" value={formData.familyOrder} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="motherAgeAtBirth">גיל האם בלידתך</label>
          <input type="number" name="motherAgeAtBirth" id="motherAgeAtBirth" className="form-control" value={formData.motherAgeAtBirth} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="fatherAgeAtBirth">גיל האב בלידתך</label>
          <input type="number" name="fatherAgeAtBirth" id="fatherAgeAtBirth" className="form-control" value={formData.fatherAgeAtBirth} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="householdMembers">מספר הנפשות החיות איתך במשק הבית</label>
          <input type="number" name="householdMembers" id="householdMembers" className="form-control" value={formData.householdMembers} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="petOwner">האם יש בבית חיית מחמד</label>
          <select name="petOwner" id="petOwner" className="form-control" value={formData.petOwner} onChange={handleChange} required>
            <option value="">בחר</option>
            <option value="כן">כן</option>
            <option value="לא">לא</option>
          </select>
        </div>

        {formData.petOwner === 'כן' && (
          <div className="form-group">
            <label htmlFor="petAge">אם כן, מאיזה גיל יש לך חיית מחמד?</label>
            <input type="number" name="petAge" id="petAge" className="form-control" value={formData.petAge} onChange={handleChange} />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="experiencedLoss">האם חווית אובדן של בן משפחה קרוב</label>
          <select name="experiencedLoss" id="experiencedLoss" className="form-control" value={formData.experiencedLoss} onChange={handleChange} required>
            <option value="">בחר</option>
            <option value="כן">כן</option>
            <option value="לא">לא</option>
          </select>
        </div>

        {formData.experiencedLoss === 'כן' && (
          <div className="form-group">
            <label htmlFor="ageAtLoss">אם כן, באיזה גיל היית בזמן המאורע?</label>
            <input type="number" name="ageAtLoss" id="ageAtLoss" className="form-control" value={formData.ageAtLoss} onChange={handleChange} />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="welfareTreatment">האם היית מטופל במערכת הרווחה?</label>
          <select name="welfareTreatment" id="welfareTreatment" className="form-control" value={formData.welfareTreatment} onChange={handleChange} required>
            <option value="">בחר</option>
            <option value="כן">כן</option>
            <option value="לא">לא</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">שלח</button>
      </form>
    </div>
  );
};

export default PersonalForm;
