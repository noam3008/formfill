import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MyForm.css';
import { useNavigate } from 'react-router-dom';

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

            {/* Treatment Information */}
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

            <div >
              <label htmlFor="treatmentChanges" className="form-label">שינויים בטיפול/במינון (Changes in
                Treatment)</label>
              <input
                  type="text"
                  className="form-control"
                  id="treatmentChanges"
                  name="treatmentChanges"
                  value={formData.treatmentChanges}
                  onChange={handleChange}
              />
            </div>

            <div >
              <label htmlFor="treatmentAdherence" className="form-label">התמדת הטיפול (Treatment Adherence)</label>
              <select
                  className="form-select"
                  id="treatmentAdherence"
                  name="treatmentAdherence"
                  value={formData.treatmentAdherence}
                  onChange={handleChange}
              >
                <option value="100">100% מתמיד</option>
                <option value="80">80% מתמיד</option>
                <option value="50">50% מתמיד</option>
                <option value="notAdherent">לא מתמיד</option>
              </select>
            </div>

            {/* Medical Background */}
            <div >
              <label htmlFor="backgroundDiseases" className="form-label">מחלות רקע (Background Diseases)</label>
              <input
                  type="text"
                  className="form-control"
                  id="backgroundDiseases"
                  name="backgroundDiseases"
                  value={formData.backgroundDiseases}
                  onChange={handleChange}
              />
            </div>

            <div >
              <label htmlFor="allergies" className="form-label">אלרגיות (Allergies)</label>
              <input
                  type="text"
                  className="form-control"
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
              />
            </div>

            <div >
              <label htmlFor="foodSensitivity" className="form-label">רגישות למזון (Food Sensitivity)</label>
              <input
                  type="text"
                  className="form-control"
                  id="foodSensitivity"
                  name="foodSensitivity"
                  value={formData.foodSensitivity}
                  onChange={handleChange}
              />
            </div>

            <div >
              <label htmlFor="chronicDiseases" className="form-label">מחלות כרוניות (Chronic Diseases)</label>
              <input
                  type="text"
                  className="form-control"
                  id="chronicDiseases"
                  name="chronicDiseases"
                  value={formData.chronicDiseases}
                  onChange={handleChange}
              />
            </div>

            {/* Health History */}
            <div >
              <label htmlFor="hospitalization" className="form-label">אשפוזים (Hospitalization)</label>
              <input
                  type="text"
                  className="form-control"
                  id="hospitalization"
                  name="hospitalization"
                  value={formData.hospitalization}
                  onChange={handleChange}
              />
            </div>

            <div >
              <label htmlFor="surgeries" className="form-label">ניתוחים (Surgeries)</label>
              <input
                  type="text"
                  className="form-control"
                  id="surgeries"
                  name="surgeries"
                  value={formData.surgeries}
                  onChange={handleChange}
              />
            </div>

            <div >
              <label htmlFor="complementaryMedicine" className="form-label">רפואה משלימה (Complementary
                Medicine)</label>
              <input
                  type="text"
                  className="form-control"
                  id="complementaryMedicine"
                  name="complementaryMedicine"
                  value={formData.complementaryMedicine}
                  onChange={handleChange}
              />
            </div>

            <div >
              <label htmlFor="treatmentHelp" className="form-label">טיפולים שעוזרים (Treatments That Help)</label>
              <input
                  type="text"
                  className="form-control"
                  id="treatmentHelp"
                  name="treatmentHelp"
                  value={formData.treatmentHelp}
                  onChange={handleChange}
              />
            </div>

            <div >
              <label htmlFor="aggravatesCondition" className="form-label">דברים שמחמירים (Aggravates Condition)</label>
              <input
                  type="text"
                  className="form-control"
                  id="aggravatesCondition"
                  name="aggravatesCondition"
                  value={formData.aggravatesCondition}
                  onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="improvesCondition" className="form-label">דברים שמשפרים (Improves Condition)</label>
              <input
                  type="text"
                  className="form-control"
                  id="improvesCondition"
                  name="improvesCondition"
                  value={formData.improvesCondition}
                  onChange={handleChange}
              />
            </div>

            {/* Disease Onset */}
            <div >
              <label htmlFor="diseaseOnsetEvent" className="form-label">אירוע בזמן הופעת המחלה (Event at Disease
                Onset)</label>
              <input
                  type="text"
                  className="form-control"
                  id="diseaseOnsetEvent"
                  name="diseaseOnsetEvent"
                  value={formData.diseaseOnsetEvent}
                  onChange={handleChange}
              />
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
