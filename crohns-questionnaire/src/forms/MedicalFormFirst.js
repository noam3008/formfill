import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MyForm.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const MedicalForm = () => {
 
  // State management for the form
  const [formData, setFormData] = useState({
    diagnosis: '',
    workIssuesMentalFrequency : '',
    crohnAge: '',
    diagnosisAge: '',
    treatmentType: '',
    treatmentDuration: '',
    treatmentChanges: '',
    treatmentAdherence: '',
    backgroundDiseases: '',
    allergies: '',
    foodSensitivity: '',
    chronicDiseases: '',
    hospitalization: '',
    surgeries: '',
    complementaryMedicine: '',
    treatmentHelp: '',
    aggravatesCondition: '',
    improvesCondition: '',
    diseaseOnsetEvent: '',
    headacheFrequency: '',
    abdominalPainFrequency: '',
    backPainFrequency: '',
    jointPainFrequency: '',
    chronicPain: '',
    mouthUlcers: '',
    socialImpact: '',
    selfConfidence: '',
    jobImpact: '',
    mentalHealthImpact: '',
    psychologicalTreatment: '',
    emotionalTreatmentImpact: '',
    bloodType: '',
    regularMedications: '',
    overCounterMedications: '',
    physicalHealthImpact: '',
    mentalHealthImpactWork: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Initialize formData with default or empty values when component mounts
    setFormData({
      diagnosis: '',
      crohnAge: '',
      diagnosisAge: '',
      isTreat:'',
      treatmentType: '',
      treatmentDuration: '',
      treatmentChanges: '',
      workIssuesMentalFrequency : '',
      treatmentAdherence: '',
      backgroundDiseases: '',
      allergies: '',
      foodSensitivity: '',
      chronicDiseases: '',
      hospitalization: '',
      surgeries: '',
      complementaryMedicine: '',
      treatmentHelp: '',
      aggravatesCondition: '',
      improvesCondition: '',
      diseaseOnsetEvent: '',
      headacheFrequency: '',
      abdominalPainFrequency: '',
      backPainFrequency: '',
      jointPainFrequency: '',
      chronicPain: '',
      mouthUlcers: '',
      socialImpact: '',
      selfConfidence: '',
      jobImpact: '',
      mentalHealthImpact: '',
      psychologicalTreatment: '',
      emotionalTreatmentImpact: '',
      bloodType: '',
      regularMedications: '',
      overCounterMedications: '',
      physicalHealthImpact: '',
      mentalHealthImpactWork: '',
    });
    window.scrollTo(0,0)
  }, []);

  // Handler to update state on form change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle the file upload logic here (e.g., save to state or upload to the server)
      console.log("Selected file:", file.name);
    }
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const workIssuesMentalFrequency = formData.workIssuesMentalFrequency;
    console.log(formData);
    if (formData.diseaseTrigger === 'טראומה') {
      navigate('/ptsdquestionnaire'); // Redirect to trauma page if "טראומה" is selected
    }
    else if (workIssuesMentalFrequency >= 10 && workIssuesMentalFrequency <= 30) {
      navigate('/depressionassessment');
    }
    else{

        navigate("/healthlifestyleform")
    }
    // Here you'd handle sending the formData to the backend (e.g., with axios)
  };


  return (
      <div className="form-container">
        <h2 className="mb-4">Medical Form</h2>
        <form  onSubmit={handleSubmit}>
          <div className="row">

            {/* Diagnosis Information */}
            <div >
              <label htmlFor="diagnosis" className="form-label">אבחנה (Diagnosis)</label>
              <input
                  type="text"
                  className="form-control"
                  id="diagnosis"
                  name="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleChange}
              />
            </div>

            <div >
              <label htmlFor="crohnAge" className="form-label">גיל פריצת הקרוהן (Crohn's Age Onset)</label>
              <input
                  type="number"
                  className="form-control"
                  id="crohnAge"
                  name="crohnAge"
                  value={formData.crohnAge}
                  onChange={handleChange}
              />
            </div>

            <div >
              <label htmlFor="diagnosisAge" className="form-label">גיל אבחון הקרוהן (Age of Diagnosis)</label>
              <input
                  type="number"
                  className="form-control"
                  id="diagnosisAge"
                  name="diagnosisAge"
                  value={formData.diagnosisAge}
                  onChange={handleChange}
              />
            </div>
            
<div className="mt-4"></div>

            {/* Treatment Information */}
            <div className="form-group radio-preferred">
              <label htmlFor="isTreat" className="form-label" >האם כרגע אתה מקבל טיפול כנגד המחלה?</label>
              <div className="form-check">
                  <input type="radio" name="isTreat" value="כן" onChange={handleChange}  /> כן
              </div>
              <div className="form-check">
                  <input type="radio" name="isTreat" value="לא" onChange={handleChange}  /> לא
              </div>
            </div>


        {formData.isTreat === 'כן' && (
                      <div >
                      <label htmlFor="treatmentType" className="form-label">סוג הטיפול הנוכחי (Current Treatment Type)</label>
                      <input
                          type="text"
                          className="form-control"
                          id="treatmentType"
                          name="treatmentType"
                          value={formData.treatmentType}
                          onChange={handleChange}
                      />
                    </div>
        )}
 {formData.isTreat === 'כן' && (
            <div>
              <label htmlFor="treatmentDuration" className="form-label">משך הטיפול (Treatment Duration)</label>
              <input
                  type="text"
                  className="form-control"
                  id="treatmentDuration"
                  name="treatmentDuration"
                  value={formData.treatmentDuration}
                  onChange={handleChange}
              />
            </div>
             )}

          <div className="mt-4"></div>  
          
          {formData.isTreat === 'כן' && (
  
            <div className="form-group radio-preferred">
                      <label htmlFor="treatmentChanges" className="form-label" >האם היו שינויים בטיפול/ במינון ?</label>
                      <div className="form-check">
                          <input type="radio" name="treatmentChanges" value="כן" onChange={handleChange}  /> כן
                      </div>
                      <div className="form-check">
                          <input type="radio" name="treatmentChanges" value="לא" onChange={handleChange}  /> לא
                      </div>
              </div>

            )}

            {formData.treatmentChanges === 'כן' && (
            <div>
              <label htmlFor="treatmentDateAndReason" className="form-label">מתי היה השינוי בטיפול או המינון ומדוע? </label>
              <input
                  type="text"
                  className="form-control"
                  id="treatmentDateAndReason"
                  name="treatmentDateAndReason"
                  value={formData.treatmentDateAndReason}
                  onChange={handleChange}
              />
            </div>
             )} 



         {formData.isTreat === 'כן' && (
            <div className="treatmentAdherence">
                    <label className="form-label">
                   האם אתה מתמיד בטיפול?</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="4"
                            step="1"
                            className="slider"
                            id="treatmentAdherence"
                            name="treatmentAdherence"
                            onChange={handleChange}
                        />
                        <div className="slider-labels">
                            <span>לא מתמיד</span>
                            <span>50% מתמיד</span>
                            <span>80% מתמיד</span>
                            <span>100% מתמיד</span>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Medical Background */}


            <div className="winterlleness">
                    <label className="form-label">
                    כמה פעמים בממוצע בשנה את.ה חולה במחלות "חורף" כגון שפעת, דלקת בגרון וכדומה ?</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            id="winterlleness"
                            name="winterlleness"
                            onChange={handleChange}
                        />
                        <div className="slider-labels">
                            <span>1 - בכלל לא</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5 - בתדירות גבוהה</span>
                        </div>
                    </div>
                </div>

                <div className="doctorduechron">
                    <label className="form-label">
                    כמה פעמים בשנה אתה מבקר רופא בעקבות הקרוהן
                    </label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            id="doctorduechron"
                            name="doctorduechron"
                            onChange={handleChange}
                        />
                        <div className="slider-labels">
                            <span>1 - בכלל לא</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5 - בתדירות גבוהה</span>
                        </div>
                    </div>
                </div>

        <div className="form-group radio-preferred">
          <label htmlFor="allergies" className="form-label" >האם אתה סובל מאלרגיה מאובחנת?</label>
          <div className="form-check">
              <input type="radio" name="allergies" value="כן" onChange={handleChange}  /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="allergies" value="לא" onChange={handleChange}  /> לא
          </div>
        </div>


        {formData.allergies === 'כן' && (
          <div className="form-group">
            <label htmlFor="allergiesAge">אם כן, מאיזה גיל האלרגיה מאובחנת?</label>
            <input type="number" name="allergiesAge" id="allergiesAge" className="form-control" value={formData.allergiesAge} onChange={handleChange} />
          </div>
        )}

<div className="form-group radio-preferred">
          <label htmlFor="foodSensitivity" className="form-label" >האם את/ה סובל מרגישות לסוגי מזון?</label>
          <div className="form-check">
              <input type="radio" name="foodSensitivity" value="כן" onChange={handleChange}  /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="foodSensitivity" value="לא" onChange={handleChange}  /> לא
          </div>
        </div>


        {formData.foodSensitivity === 'כן' && (
          <div className="form-group">
            <label htmlFor="foodSensetivityAge">אם כן, מאיזה גיל הרגישות?</label>
            <input type="number" name="foodSensetivityAge" id="foodSensetivityAge" className="form-control" value={formData.foodSensetivityAge} onChange={handleChange} />
          </div>
        )}

        <div className="form-group radio-preferred">
          <label htmlFor="chronicDiseases" className="form-label" >האם יש לך מחלות כרוניות נוספות?</label>
          <div className="form-check">
              <input type="radio" name="chronicDiseases" value="כן" onChange={handleChange}  /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="chronicDiseases" value="לא" onChange={handleChange}  /> לא
          </div>
        </div>


        {formData.chronicDiseases === 'כן' && (
          <div className="form-group">
            <label htmlFor="chronicDiseasesAge">אם כן, מאיזה גיל החלו התסמינים?</label>
            <input type="number" name="chronicDiseasesAge" id="chronicDiseasesAge" min = "0" className="form-control" value={formData.chronicDiseasesAge} onChange={handleChange} />
          </div>
        )}

        {formData.chronicDiseases === 'כן' && (
          <div className="form-group">
            <label htmlFor="chronicDiseasesDiagnose">אם כן, מאיזה גיל אובחנו התסמינים?</label>
            <input type="number" name="chronicDiseasesDiagnose" id="chronicDiseasesDiagnose" min = "0" className="form-control" value={formData.chronicDiseasesAge} onChange={handleChange} />
          </div>
        )}

        <div className="form-group radio-preferred">
          <label htmlFor="hospitalization" className="form-label" >האם  עברת אישפוזים בעשור האחרון?</label>
          <div className="form-check">
              <input type="radio" name="hospitalization" value="כן" onChange={handleChange}  /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="hospitalization" value="לא" onChange={handleChange}  /> לא
          </div>
        </div>

        {formData.hospitalization === "כן" && (
        <div className="form-group mt-3">
          <label htmlFor="hospitalizationDetails" className="form-label">
            אנא פרט/י את האישפוזים:
          </label>
          <textarea
            id="hospitalizationDetails"
            name="hospitalizationDetails"
            value={formData.hospitalizationDetails}
            onChange={handleChange}
            className="form-control"
            placeholder="פרט/י את האישפוזים כאן"
          />
        </div>
      )}


<div className="form-group radio-preferred">
          <label htmlFor="surgeries" className="form-label" >האם  עברת ניתוח כלשהו?</label>
          <div className="form-check">
              <input type="radio" name="surgeries" value="כן" onChange={handleChange}  /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="surgeries" value="לא" onChange={handleChange}  /> לא
          </div>
        </div>

        {formData.surgeries === "כן" && (
        <div className="form-group mt-3">
          <label htmlFor="surgeriesDetails" className="form-label">
            אנא פרט/י את הניתוחים:
          </label>
          <textarea
            id="surgeriesDetails"
            name="surgeriesDetails"
            value={formData.hospitalizationDetails}
            onChange={handleChange}
            className="form-control"
            placeholder="פרט בבקשה איזה ניתוחים ובאיזה גילאים"
          />
        </div>
      )}

        <div className="form-group radio-preferred">
          <label htmlFor="complementaryMedicine" className="form-label" >האם אתה מטופל כרגע או טופלת בעבר ברפואה משלימה??</label>
          <div className="form-check">
            <input type="radio" name="complementaryMedicine" value="כן" onChange={handleChange}  /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="complementaryMedicine" value="לא" onChange={handleChange}  /> לא
          </div>
        </div>

        {formData.complementaryMedicine === "כן" && (
        <div className="form-group mt-3">
          <label htmlFor="complementaryMedicineReason" className="form-label">
          מה הסיבה לפניה לטיפול משלים?
          </label>
          <textarea
            id="complementaryMedicineReason"
            name="complementaryMedicineReason"
            value={formData.complementaryMedicineReason}
            onChange={handleChange}
            className="form-control"
            placeholder="מה הסיבה לפניה לטיפול משלים"
          />
        </div>
      )}


        {formData.complementaryMedicine === "כן" && (
        <div className="form-group mt-3">
          <label htmlFor="complementaryMedicineWayOfTreatment" className="form-label">
          מה בוצע בטיפול?
          </label>
          <textarea
            id="complementaryMedicineWayOfTreatment"
            name="complementaryMedicineWayOfTreatment"
            value={formData.complementaryMedicineWayOfTreatment}
            onChange={handleChange}
            className="form-control"
            placeholder="מה בוצע בטיפול ?"
          />
        </div>
      )}

      
        {formData.complementaryMedicine === "כן" && (
        <div className="form-group mt-3">
          <label htmlFor="complementaryMedicineWayOfDuration" className="form-label">
          לאורך כמה זמן טופלת?
          </label>
          <textarea
            id="complementaryMedicineWayOfDuration"
            name="complementaryMedicineWayOfDuration"
            value={formData.complementaryMedicineWayOfDuration}
            onChange={handleChange}
            className="form-control"
            placeholder="לאורך כמה זמן טופלת ?"
          />
        </div>
      )}

        {formData.complementaryMedicine === "כן" && (
        <div className="form-group mt-3">
          <label htmlFor="complementaryMedicineWayOfBetter" className="form-label">
          האם הייתה הטבה ?
          </label>
          <textarea
            id="complementaryMedicineWayOfBetter"
            name="complementaryMedicineWayOfBetter"
            value={formData.complementaryMedicineWayOfBetter}
            onChange={handleChange}
            className="form-control"
            placeholder="האם הייתה הטבה?"
          />
        </div>
      )}


            <div className="form-group mt-3">
          <label htmlFor="treatmentHelp" className="form-label">
          לתחושתך, מה גורם להטבה במצבך?
          </label>
          <textarea
            id="treatmentHelp"
            name="treatmentHelp"
            value={formData.treatmentHelp}
            onChange={handleChange}
            className="form-control"
            placeholder=""
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="aggravatesCondition" className="form-label">
          לתחושתך, מה גורם להחמרה במצבך?
          </label>
          <textarea
            id="aggravatesCondition"
            name="aggravatesCondition"
            value={formData.aggravatesCondition}
            onChange={handleChange}
            className="form-control"
            placeholder=""
          />
        </div>

        

        <div className="form-group radio-preferred">
          <label htmlFor="diseaseTrigger" className="form-label" >האם התפרצות המחלה התרחשה בסמיכות להתפרצות מחלה אחרת/ בסמיכות לארוע משנה חיים/תאונה/ טראומה ?</label>
          <div className="form-check">
              <input type="radio" name="diseaseTrigger" value="התפרצות מחלה אחרת" onChange={handleChange}  /> התפרצות מחלה אחרת
          </div>
          <div className="form-check">
              <input type="radio" name="diseaseTrigger" value="סמיכות לארוע משנה חיים" onChange={handleChange}  /> סמיכות לארוע משנה חיים
          </div>
          <div className="form-check">
              <input type="radio" name="diseaseTrigger" value="תאונה" onChange={handleChange}  /> תאונה
          </div>
          <div className="form-check">
              <input type="radio" name="diseaseTrigger" value="טראומה" onChange={handleChange}  /> טראומה
          </div>
        </div>

      {formData.diseaseTrigger && (
        <div className="form-group mt-3">
          <label htmlFor="triggerDetails" className="form-label">
              פרט/י פרטים נוספים על המקרה:
          </label>
          <textarea
            id="triggerDetails"
            name="triggerDetails"
            value={formData.triggerDetails}
            onChange={handleChange}
            className="form-control"
            placeholder=""
          />
        </div>
      )}

            <div className="form-group mt-3">
                <label htmlFor="bestTakeCareByClient" className="form-label">
                מה הטיפול שעזר/ עוזר לך ביותר - פרט.י
                </label>
                <textarea
                  id="bestTakeCareByClient"
                  name="bestTakeCareByClient"
                  value={formData.triggerDetailsByClientReason}
                  onChange={handleChange}
                  className="form-control"
                  placeholder=""
                />
            </div>


            <div className="form-group radio-preferred">
          <label htmlFor="cronNegative" className="form-label" >האם יש משהו שהמחלת קרוהן מונעת ממך לעשות? ?</label>
          <div className="form-check">
              <input type="radio" name="cronNegative" value="כן" onChange={handleChange}  /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="cronNegative" value="לא" onChange={handleChange}  /> לא
          </div>
        </div>

        {formData.cronNegative === "כן" && (
        <div className="form-group mt-3">
          <label htmlFor="complementaryMedicineReason" className="form-label">
          אנא פרט בבקשה
          </label>
          <textarea
            id="complementaryMedicineReason"
            name="complementaryMedicineReason"
            value={formData.complementaryMedicineReason}
            onChange={handleChange}
            className="form-control"
            placeholder=""
          />
        </div>
      )}

        <div className="form-group radio-preferred">
          <label htmlFor="familyDoctorVisit" className="form-label" >האם אתה מבקר באופן קבוע אצל רופא משפחה ?</label>
          <div className="form-check">
        <input
          type="radio"
          id="visitYes"
          name="familyDoctorVisit"
          value="כן"
          onChange={handleChange}
          checked={formData.familyDoctorVisit === "כן"}
        />
        <label htmlFor="visitYes">כן</label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          id="visitNo"
          name="familyDoctorVisit"
          value="לא"
          onChange={handleChange}
          checked={formData.familyDoctorVisit === "לא"}
        />
        <label htmlFor="visitNo">לא</label>
      </div>

      <div className="form-check">
     
        <input
          type="radio"
          id="visitOnce"
          name="familyDoctorVisit"
          value="once"
          onChange={handleChange}
          checked={formData.familyDoctorVisit === "once"}
        />
         
         <label htmlFor="visitOnce">  (מלא מספר חודשים) מבקר את הרופא בתדירות נמוכה </label>
        {formData.familyDoctorVisit === "once" && (
          <input
          min = "0"
            type="number"
            className="form-control mt-2"
            name="visitFrequency"
            placeholder="מספר חודשים"
            value={formData.visitFrequency}
            onChange={handleChange}
            style={{ width: "120px", display: "inline-block", marginLeft: "10px" }}
          />
        )}
      </div>
      </div>


      <div className="form-group radio-preferred">
          <label htmlFor="dentistDoctorVisit" className="form-label" >האם אתה מבקר באופן קבוע אצל רופא שיניים ?</label>
          <div className="form-check">
        <input
          type="radio"
          id="visitYes"
          name="dentistDoctorVisit"
          value="כן"
          onChange={handleChange}
          checked={formData.dentistDoctorVisit === "כן"}
        />
        <label htmlFor="visitYes">כן</label>
      </div>

     <div className="form-check">
        <input
          type="radio"
          id="visitNo"
          name="pointsDoctorVisit"
          value="לא"
          onChange={handleChange}
          checked={formData.pointsDoctorVisit === "לא"}
        />
        <label htmlFor="visitNo">לא</label>
      </div>

      <div className="form-check">
     
        <input
          type="radio"
          id="visitOnce"
          name="dentistDoctorVisit"
          value="once"
          onChange={handleChange}
          checked={formData.dentistDoctorVisit === "once"}
        />
         
         <label htmlFor="visitOnce">  (מלא מספר חודשים) מבקר את הרופא בתדירות נמוכה </label>
        {formData.dentistDoctorVisit === "once" && (
          <input
          min = "0"
            type="number"
            className="form-control mt-2"
            name="visitFrequency"
            placeholder="מספר חודשים"
            value={formData.visitFrequencyDentist}
            onChange={handleChange}
            style={{ width: "120px", display: "inline-block", marginLeft: "10px" }}
          />
        )}
      </div>
      </div>

      <div className="form-group radio-preferred">
          <label htmlFor="dentistDoctorVisit" className="form-label" >האם אתה מבצע באופן קבוע אבחון נקודות חן ?</label>
          <div className="form-check">
        <input
          type="radio"
          id="visitYes"
          name="pointsDoctorVisit"
          value="כן"
          onChange={handleChange}
          checked={formData.pointsDoctorVisit === "כן"}
        />
        <label htmlFor="visitYes">כן</label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          id="visitNo"
          name="pointsDoctorVisit"
          value="לא"
          onChange={handleChange}
          checked={formData.pointsDoctorVisit === "לא"}
        />
        <label htmlFor="visitNo">לא</label>
      </div>

      <div className="form-check">
     
        <input
          type="radio"
          id="visitOnce"
          name="pointsDoctorVisit"
          value="once"
          onChange={handleChange}
          checked={formData.pointsDoctorVisit === "once"}
        />
         
         <label htmlFor="visitOnce">  (מלא מספר חודשים) מבקר את הרופא בתדירות נמוכה </label>
        {formData.dentistDoctorVisit === "once" && (
          <input
          min = "0"
            type="number"
            className="form-control mt-2"
            name="visitFrequency"
            placeholder="מספר חודשים"
            value={formData.visitFrequencyDentist}
            onChange={handleChange}
            style={{ width: "120px", display: "inline-block", marginLeft: "10px" }}
          />
        )}
      </div>
      </div>
      
      <div className="form-group radio-preferred">
      <label htmlFor="vaccinationStatus" className="form-label">
         מלא מצב פנקס חיסונים
        </label>
        <select
          id="vaccinationStatus"
          name="vaccinationStatus"
          value={formData.diseaseTrigger}
          onChange={handleChange}
          className="form-select"
        >
        <option value="" disabled>בחר מצב פנקס חיסונים</option> 
        <option value="full">מלא</option>
        <option value="comprehensive">מלא פרט לקורונה ו/או שפעת</option>
        <option value="partial">חלקי</option>
        <option value="not-vaccinated">לא מחוסן</option>
        </select>
        </div>

        <div className="form-group radio-preferred">
          <label htmlFor="takeMedicen" className="form-label" >האם את.ה לוקח תרופות באופן קבוע </label>
          <div className="form-check">
              <input type="radio" name="takeMedicen" value="כן" onChange={handleChange}  /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="takeMedicen" value="לא" onChange={handleChange}  /> לא
          </div>
        </div>

        {formData.takeMedicen === "כן" && (
        <div className="form-group mt-3">
          <label htmlFor="takeMedicenWhich" className="form-label">
          אנא פרט בבקשה
          </label>
          <textarea
            id="takeMedicenWhich"
            name="takeMedicenWhich"
            value={formData.takeMedicenWhich}
            onChange={handleChange}
            className="form-control"
            placeholder=""
          />
        </div>
      )}

      <div className="form-group radio-preferred">
          <label htmlFor="takeFood" className="form-label" >האם את.ה לוקח תוסף תזונה באופן קבוע </label>
          <div className="form-check">
              <input type="radio" name="takeFood" value="כן" onChange={handleChange}  /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="takeFood" value="לא" onChange={handleChange}  /> לא
          </div>
        </div>

        {formData.takeFood === "כן" && (
        <div className="form-group mt-3">
          <label htmlFor="takeFoodWhich" className="form-label">
          אנא פרט בבקשה
          </label>
          <textarea
            id="takeFoodWhich"
            name="takeFoodWhich"
            value={formData.takeMedicenWhich}
            onChange={handleChange}
            className="form-control"
            placeholder=""
          />
        </div>
      )}
      </div>

      

      
      <div className="form-group radio-preferred">
          <label htmlFor="otherDeases" className="form-label" >האם אתה נמצא במעקב רפואי אחר מחלה אחרת פרט לקרוהן/ קוליטיס?</label>
          <div className="form-check">
              <input type="radio" name="otherDeases" value="כן" onChange={handleChange}  /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="otherDeases" value="לא" onChange={handleChange}  /> לא
          </div>
        </div>

        {formData.otherDeases === "כן" && (
        <div className="form-group mt-3">
          <label htmlFor="otherDeasesWhich" className="form-label">
          אנא פרט בבקשה
          </label>
          <textarea
            id="otherDeasesWhich"
            name="otherDeasesWhich"
            value={formData.takeMedicenWhich}
            onChange={handleChange}
            className="form-control"
            placeholder=""
          />
        </div>
      )}

      <div className="medicationWithoutDoctorAmount">
          <label className="form-label">
          באיזו תדירות נוטל תרופות ללא מרשם
          </label>
          <div className="slider-container">
              <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  className="slider"
                  id="medicationWithoutDoctorAmount"
                  name="medicationWithoutDoctorAmount"
                  onChange={handleChange}
              />
              <div className="slider-labels">
                  <span>1 - בכלל לא</span>
                  <span>פעם בחודש</span>
                  <span>פעם בשבוע</span>
                  <span>פעם ביומיים</span>
                  <span>פעם ביום</span>
              </div>
          </div>
      </div>

      <div className="form-group  radio-preferred">
          <label htmlFor="bloodType"  className="form-label">סוג דם</label>
          <div className="form-check">
              <input type="radio" name="bloodType" value="A" onChange={handleChange}  /> A
          </div>
          <div className="form-check">
              <input type="radio" name="bloodType" value="B" onChange={handleChange}  /> B
          </div>
          <div className="form-check">
              <input type="radio" name="bloodType" value="AB" onChange={handleChange}  /> AB
          </div>
          <div className="form-check">
              <input type="radio" name="bloodType" value="O" onChange={handleChange}  /> O
          </div>
          <div className="form-check">
              <input type="radio" name="bloodType" value="לא יודע" onChange={handleChange}  /> לא יודע
          </div>
        </div>
      <div >


      <div className="headacheFrequency">
          <label className="form-label">
          תדירות כאבי ראש
          </label>
          <div className="slider-container">
              <input
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  className="slider"
                  id="headacheFrequency"
                  name="headacheFrequency"
                  onChange={handleChange}
              />
              <div className="slider-labels">
                  <span>לעתים נדירות</span>
                  <span>לפעמים</span>
                  <span>לעתים תכופות</span>
                  <span>כל יום</span>
              </div>
          </div>
      </div>

      <div className="abdominalPainFrequency">
          <label className="form-label">
          תדירות כאבי בטן
          </label>
          <div className="slider-container">
              <input
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  className="slider"
                  id="abdominalPainFrequency"
                  name="abdominalPainFrequency"
                  onChange={handleChange}
              />
              <div className="slider-labels">
                  <span>לעתים נדירות</span>
                  <span>לפעמים</span>
                  <span>לעתים תכופות</span>
                  <span>כל יום</span>
              </div>
          </div>
      </div>
      <div className="backPainFrequency">
          <label className="form-label">
          תדירות כאבי גב
          </label>
          <div className="slider-container">
              <input
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  className="slider"
                  id="backPainFrequency"
                  name="backPainFrequency"
                  onChange={handleChange}
              />
              <div className="slider-labels">
                  <span>לעתים נדירות</span>
                  <span>לפעמים</span>
                  <span>לעתים תכופות</span>
                  <span>כל יום</span>
              </div>
          </div>
      </div>

      <div className="jointsPainFrequency">
          <label className="form-label">
          תדירות כאבי מפרקים
          </label>
          <div className="slider-container">
              <input
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  className="slider"
                  id="jointsPainFrequency"
                  name="jointsPainFrequency"
                  onChange={handleChange}
              />
              <div className="slider-labels">
                  <span>לעתים נדירות</span>
                  <span>לפעמים</span>
                  <span>לעתים תכופות</span>
                  <span>כל יום</span>
              </div>
          </div>
      </div>

      <div className="form-group radio-preferred">
          <label htmlFor="cronicDeseas" className="form-label" >האם אתה סובל מכאב כרוני כלשהו?</label>
          <div className="form-check">
              <input type="radio" name="cronicDeseas" value="כן" onChange={handleChange}  /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="cronicDeseas" value="לא" onChange={handleChange}  /> לא
          </div>
        </div>

        {formData.cronicDeseas === "כן" && (
        <div className="form-group mt-3">
          <label htmlFor="cronicDeasesDetails" className="form-label">
          אנא פרט בבקשה
          </label>
          <textarea
            id="cronicDeasesDetails"
            name="cronicDeasesDetails"
            value={formData.takeMedicenWhich}
            onChange={handleChange}
            className="form-control"
            placeholder=""
          />
        </div>
      )}

<div className="isMouthAftha">
          <label className="form-label">
          האם אתה סובל מכיבים בפה (אפטות)
          </label>
          <div className="slider-container">
              <input
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  className="slider"
                  id="isMouthAftha"
                  name="isMouthAftha"
                  onChange={handleChange}
              />
              <div className="slider-labels">
                  <span>אף פעם</span>
                  <span>לעתים נדירות</span>
                  <span>לפעמים</span>
                  <span>לעתים תכופות</span>
              </div>
          </div>
      </div>


      <div className="form-group radio-preferred">
          <label htmlFor="wormsSuffer" className="form-label" >האם סבלת אי פעם מתולעי מעיים ?</label>
          <div className="form-check">
        <input
          type="radio"
          id="visitYes"
          name="wormsSuffer"
          value="כן"
          onChange={handleChange}
          checked={formData.wormsSuffer === "כן"}
        />
        <label htmlFor="visitYes">כן</label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          id="visitNo"
          name="wormsSuffer"
          value="לא"
          onChange={handleChange}
          checked={formData.wormsSuffer === "לא"}
        />
        <label htmlFor="visitNo">לא</label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          id="visitNotKnoen"
          name="wormsSuffer"
          value=" לא יודע"
          onChange={handleChange}
          checked={formData.wormsSuffer === " לא יודע"}
        />
        <label htmlFor="visitNo">לא יודע</label>
      </div>
      </div>

      <div className="form-group radio-preferred">
          <label htmlFor="otherInsectsSuffer" className="form-label" >האם סבלת אי פעם מטפילים אחרים ?</label>
          <div className="form-check">
        <input
          type="radio"
          id="visitYes"
          name="otherInsectsSuffer"
          value="כן"
          onChange={handleChange}
          checked={formData.otherInsectsSuffer === "כן"}
        />
        <label htmlFor="visitYes">כן</label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          id="visitNo"
          name="otherInsectsSuffer"
          value="לא"
          onChange={handleChange}
          checked={formData.otherInsectsSuffer === "לא"}
        />
        <label htmlFor="visitNo">לא</label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          id="visitNotKnoen"
          name="otherInsectsSuffer"
          value=" לא יודע"
          onChange={handleChange}
          checked={formData.otherInsectsSuffer === " לא יודע"}
        />
        <label htmlFor="visitNo">לא יודע</label>
      </div>
      </div>

      <div className="selfConfidence">
          <label className="form-label">
          האם המחלה השפיעה על הבטחון העצמי שלך?
          </label>
          <div className="slider-container">
              <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  className="slider"
                  id="selfConfidence"
                  name="selfConfidence"
                  onChange={handleChange}
              />
              <div className="slider-labels">
                  <span>השתנה לרעה</span>
                  <span>השתנה מעט לרעה</span>
                  <span>לא השתנה</span>
                  <span>השתנה מעט לטובה</span>
                  <span>השתנה לטובה</span>
              </div>
          </div>
      </div>

      
      <div className="socialLife">
          <label className="form-label">
          האם המחלה השפיעה על חיי החברה שלך?
          </label>
          <div className="slider-container">
              <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  className="slider"
                  id="socialLife"
                  name="socialLife"
                  onChange={handleChange}
              />
              <div className="slider-labels">
                  <span>השתנה לרעה</span>
                  <span>השתנה מעט לרעה</span>
                  <span>לא השתנה</span>
                  <span>השתנה מעט לטובה</span>
                  <span>השתנה לטובה</span>
              </div>
          </div>
      </div>

      
      <div className="mood">
          <label className="form-label">
          האם המחלה השפיעה על מצב הרוח שלך?
          </label>
          <div className="slider-container">
              <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  className="slider"
                  id="mood"
                  name="mood"
                  onChange={handleChange}
              />
              <div className="slider-labels">
                  <span>השתנה לרעה</span>
                  <span>השתנה מעט לרעה</span>
                  <span>לא השתנה</span>
                  <span>השתנה מעט לטובה</span>
                  <span>השתנה לטובה</span>
              </div>
          </div>
      </div>

      
      <div className="workAfterIll">
          <label className="form-label">
          האם המחלה השפיעה על התעסוקה שלך?
          </label>
          <div className="slider-container">
              <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  className="slider"
                  id="workAfterIll"
                  name="workAfterIll"
                  onChange={handleChange}
              />
              <div className="slider-labels">
                  <span>השתנה לרעה</span>
                  <span>השתנה מעט לרעה</span>
                  <span>לא השתנה</span>
                  <span>השתנה מעט לטובה</span>
                  <span>השתנה לטובה</span>
              </div>
          </div>
      </div>

      
      <div className="relationship">
          <label className="form-label">
          האם המחלה השפיעה על הזוגיות שלך?
          </label>
          <div className="slider-container">
              <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  className="slider"
                  id="relationship"
                  name="relationship"
                  onChange={handleChange}
              />
              <div className="slider-labels">
                  <span>השתנה לרעה</span>
                  <span>השתנה מעט לרעה</span>
                  <span>לא השתנה</span>
                  <span>השתנה מעט לטובה</span>
                  <span>השתנה לטובה</span>
              </div>
          </div>
      </div>

      
      <div className="parentsAttidude">
          <label className="form-label">
          האם המחלה השפיעה על היחס שלך להורים?
          </label>
          <div className="slider-container">
              <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  className="slider"
                  id="parentsAttidude"
                  name="parentsAttidude"
                  onChange={handleChange}
              />
              <div className="slider-labels">
                  <span>השתנה לרעה</span>
                  <span>השתנה מעט לרעה</span>
                  <span>לא השתנה</span>
                  <span>השתנה מעט לטובה</span>
                  <span>השתנה לטובה</span>
              </div>
          </div>
      </div>

      
      <div className="outsideActivity">
          <label className="form-label">
          האם המחלה השפיעה על הפעילות הגופנית שלך?
          </label>
          <div className="slider-container">
              <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  className="slider"
                  id="outsideActivity"
                  name="outsideActivity"
                  onChange={handleChange}
              />
              <div className="slider-labels">
                  <span>השתנה לרעה</span>
                  <span>השתנה מעט לרעה</span>
                  <span>לא השתנה</span>
                  <span>השתנה מעט לטובה</span>
                  <span>השתנה לטובה</span>
              </div>
          </div>
      </div>

      
      <div className="selfEsteem">
          <label className="form-label">
          האם המחלה השפיעה על הערכה העצמית שלך?
          </label>
          <div className="slider-container">
              <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  className="slider"
                  id="selfEsteem"
                  name="selfEsteem"
                  onChange={handleChange}
              />
              <div className="slider-labels">
                  <span>השתנה לרעה</span>
                  <span>השתנה מעט לרעה</span>
                  <span>לא השתנה</span>
                  <span>השתנה מעט לטובה</span>
                  <span>השתנה לטובה</span>
              </div>
          </div>
      </div>

      <div className="form-group">
      <label htmlFor="workIssuesFrequency" className="form-label">
        בחודש האחרון באיזו תדירות היו לך בעיות לבצע עבודתך (/לימודים) בעקבות בריאותך הפיזית (0-30 יום)
      </label>
      <input
        type="number"
        className="form-control"
        id="workIssuesFrequency"
        name="workIssuesFrequency"
        min="0"
        max="30"
        value={formData.workIssuesFrequency}
        onChange={handleChange}
      />
    </div>

      <div className="form-group">
        <label htmlFor="workIssuesMentalFrequency" className="form-label">
          בחודש האחרון באיזו תדירות היו לך בעיות לבצע עבודתך (/לימודים) בעקבות בריאותך הנפשית (0-30 יום)
        </label>
        <input
          type="number"
          className="form-control"
          id="workIssuesMentalFrequency"
          name="workIssuesMentalFrequency"
          min="0"
          max="30"
          value={formData.workIssuesMentalFrequency}
          onChange={(e) => {
            const value = Math.max(0, Math.min(30, Number(e.target.value))); // Ensure value is between 0-30
            handleChange({ target: { name: e.target.name, value } });
          }}
        />
      </div>



            {/* Treatment Information */}
            <div className="form-group radio-preferred">
              <label htmlFor="isPshycologicalTreatment" className="form-label" >האם עברת בעבר או בהווה טיפול פסיכולוגי? </label>
              <div className="form-check">
                  <input type="radio" name="isPshycologicalTreatment" value="כן" onChange={handleChange}  /> כן
              </div>
              <div className="form-check">
                  <input type="radio" name="isPshycologicalTreatment" value="לא" onChange={handleChange}  /> לא
              </div>
            </div>


        {formData.isPshycologicalTreatment === 'כן' && (
                      <div >
                      <label htmlFor="treatmentAge" className="form-label">באיזה גיל</label>
                      <input
                          type="number"
                          min="0"
                          className="form-control"
                          id="treatmentAge"
                          name="treatmentAge"
                          value={formData.treatmentAge}
                          onChange={handleChange}
                      />
                    </div>
        )}
 {formData.isPshycologicalTreatment === 'כן' && (
            <div>
              <label htmlFor="treatmentReason" className="form-label">מה הייתה הסיבה לפניה לטיפול</label>
              <input
                  type="text"
                  className="form-control"
                  id="treatmentReason"
                  name="treatmentReason"
                  value={formData.treatmentReason}
                  onChange={handleChange}
              />
            </div>
             )}

{formData.isPshycologicalTreatment === 'כן' && (
            <div>
              <label htmlFor="treatmentConnection" className="form-label">אם ראיתי קשר בין מצב המחלה לבין הטיפול הרגשי?</label>
              <input
                  type="text"
                  className="form-control"
                  id="treatmentConnection"
                  name="treatmentConnection"
                  value={formData.treatmentConnection}
                  onChange={handleChange}
              />
            </div>
             )}

{formData.isPshycologicalTreatment === 'כן' && (
            <div>
              <label htmlFor="treatmentHelpMental" className="form-label">האם הטיפול סייע למצב הנפשי?</label>
              <input
                  type="text"
                  className="form-control"
                  id="treatmentHelpMental"
                  name="treatmentHelpMental"
                  value={formData.treatmentHelpMental}
                  onChange={handleChange}
              />
            </div>
             )}

{formData.isPshycologicalTreatment === 'כן' && (
            <div>
              <label htmlFor="treatmentHelpIll" className="form-label">האם היה שינוי במצב המחלה בעקבות הטיפול?</label>
              <input
                  type="text"
                  className="form-control"
                  id="treatmentHelpIll"
                  name="treatmentHelpIll"
                  value={formData.treatmentHelpIll}
                  onChange={handleChange}
              />
            </div>
             )}

                <div className="form-group">
                    <label className="form-label">מתן צואה ברמיסיה - מספר פעמים ביום </label>
                    <input
                        type="number"
                        className="form-control"
                        name="rimisia"
                        value={formData.rimisia}
                        onChange={handleChange}
                        
                        min="0" // Ensures only positive numbers are allowed
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">מתן צואה בזמן התקף - מספר פעמים ביום </label>
                    <input
                        type="number"
                        className="form-control"
                        name="poopDuringSuffer"
                        value={formData.poopDuringSuffer}
                        onChange={handleChange}
                        
                        min="0" // Ensures only positive numbers are allowed
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">מתן שתן - מספר פעמים ביום בממוצע </label>
                    <input
                        type="number"
                        className="form-control"
                        name="averagePiss"
                        value={formData.averagePiss}
                        onChange={handleChange}
                        
                        min="0" // Ensures only positive numbers are allowed
                    />
                </div>


                <div>
              <label htmlFor="extraDetails" className="form-label">משהו נוסף שתרצה שנדע?</label>
              <input
                  type="text"
                  className="form-control"
                  id="extraDetails"
                  name="extraDetails"
                  value={formData.extraDetails}
                  onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="bloodTestAttachment" className="form-label">
                אנא צרף בדיקת דם כללית מהשנה האחרונה - הבדיקות הנדרשות: ספירת דם, כימיה בדם
              </label>
              <input
                type="file"
                className="form-control"
                id="bloodTestAttachment"
                name="bloodTestAttachment"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.png,.doc,.docx"
              />
              <small className="form-text text-muted">
              PDF, JPG, PNG, DOC, או DOCX ניתן להעלות קבצים בפורמטים  .
              </small>
            </div>
                  

    </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
  );
};

export default MedicalForm;
