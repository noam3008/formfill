import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MyForm.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const MedicalForm = () => {
 
  // State management for the form
  const [formData, setFormData] = useState({
    diagnosis: '',
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

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/healthlifestyleform")
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

        <div className="form-group">
        <label htmlFor="diseaseTrigger" className="form-label">
          האם התפרצות המחלה התרחשה בסמיכות להתפרצות מחלה אחרת/ בסמיכות לארוע משנה חיים/תאונה/ טראומה? אם כן פרט.י
        </label>
        <select
          id="diseaseTrigger"
          name="diseaseTrigger"
          value={formData.diseaseTrigger}
          onChange={handleChange}
          className="form-select"
        >
          <option value="" disabled>בחר אפשרות</option>
          <option value="מחלה אחרת">מחלה אחרת</option>
          <option value="ארוע משנה חיים">ארוע משנה חיים</option>
          <option value="תאונה">תאונה</option>
          <option value="טראומה">טראומה</option>
        </select>
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
          name="dentistDoctorVisit"
          value="לא"
          onChange={handleChange}
          checked={formData.dentistDoctorVisit === "לא"}
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
          <label htmlFor="pointsDoctorVisit" className="form-label" >האם אתה מבקר באופן קבוע אבחון נקודות חן ?</label>
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
        {formData.pointsDoctorVisit === "once" && (
          <input
          min = "0"
            type="number"
            className="form-control mt-2"
            name="visitFrequencyPoints"
            placeholder="מספר חודשים"
            value={formData.visitFrequencyPoints}
            onChange={handleChange}
            style={{ width: "120px", display: "inline-block", marginLeft: "10px" }}
          />
        )}
      </div>
      


      </div>
            {/* Pain and Symptoms */}
            <div >
              <label htmlFor="headacheFrequency" className="form-label">תדירות כאבי ראש (Headache Frequency)</label>
              <input
                  type="text"
                  className="form-control"
                  id="headacheFrequency"
                  name="headacheFrequency"
                  value={formData.headacheFrequency}
                  onChange={handleChange}
              />
            </div>

            <div >
              <label htmlFor="abdominalPainFrequency" className="form-label">תדירות כאבי בטן (Abdominal Pain
                Frequency)</label>
              <input
                  type="text"
                  className="form-control"
                  id="abdominalPainFrequency"
                  name="abdominalPainFrequency"
                  value={formData.abdominalPainFrequency}
                  onChange={handleChange}
              />
            </div>

            {/* You can continue adding more questions following the same structure */}

          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
  );
};

export default MedicalForm;
