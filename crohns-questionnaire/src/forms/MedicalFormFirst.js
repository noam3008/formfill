import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MyForm.css';
import { useNavigate ,useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const MedicalForm = () => {
   const location = useLocation();
   const [selectedOption, setSelectedOption] = useState(""); // Stores Yes/No selection
   const [questions, setQuestions] = useState([]); // Store questions from DB
  const [frequency, setFrequency] = useState("");
  const { diagnosis = [], preferredLanguage = "", idNumber = "" } = location.state || {};
  // State management for the form
  const [formData, setFormData] = useState({
    diagnosis: diagnosis, // ✅ Use value passed from previous page
    preferredLanguage,
    idNumber,
    workIssuesMentalFrequency : '',
    artitisNegative :'',
    artitiesAge:'',
    isPshycologicalTreatment :'',
    medicationWithoutDoctorAmount :0,
    foodSensetivityAge :'',
    selfEsteem : 0,
    parentsAttidude :0,
    relationship : 0,
    workAfterIll :0,
    mood :0,
    socialLife :0,
    isMouthAftha : 0,
    diagnosisArtitisAge:'',
    complementaryMedicineReason :"",
    chronicDiseases: "", // Yes/No selection
    chronicCount: 0, // Number of chronic diseases
    diseases: [] ,// Array to store disease details dynamicall
    crohnAge: '',
    diagnosisAge: '',
    treatmentType: '',
    treatmentDuration: '',
    treatmentChanges: '',
    treatmentAdherence: 0,
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
    headacheFrequency: 0,
    abdominalPainFrequency: 0,
    backPainFrequency: 0,
    jointsPainFrequency: 0,
    chronicPain: '',
    mouthUlcers: '',
    socialImpact: 0,
    selfConfidence: 0,
    jobImpact: 0,
    mentalHealthImpact: 0,
    psychologicalTreatment: 0,
    doctorduechron :0,
    emotionalTreatmentImpact: 0,
    bloodType: '',
    regularMedications: '',
    winterlleness :0,
    overCounterMedications: '',
    outsideActivity : 0,
    physicalHealthImpact: '',
    mentalHealthImpactWork: '',  // Initial value 0
    familyDoctorVisit: "",
    dentistDoctorVisit: "",
    pointsDoctorVisit: "",
    visitFrequencyFamilyDoctor: "",
    visitFrequencyDentist: "",
});

  const navigate = useNavigate();

  const handleDiseaseChange = (index, field, value) => {
    const updatedDiseases = [...formData.diseases];
    updatedDiseases[index][field] = value;
    setFormData({ ...formData, diseases: updatedDiseases });
  };

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
    setFrequency(""); // Reset dropdown when switching options
  };

  const handleDropdownChange = (e) => {
    setFrequency(e.target.value);
  };

  useEffect(() => {
    axios.get("http://54.242.154.185:3002/test_questions_medical")
      .then((response) => {
        setQuestions(response.data);
        const initialFormData = {};
        response.data.forEach(q => {
          initialFormData[q.field_name] = "";
        });
  
        setFormData(prevData => ({
          ...initialFormData,
          ...prevData,
          idNumber: location.state?.idNumber || prevData.idNumber || "",
          preferredLanguage: location.state?.preferredLanguage || prevData.preferredLanguage || "",
          diagnosis: location.state?.diagnosis || prevData.diagnosis || []
        }));
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  
    window.scrollTo(0, 0);
  }, [location.state]);
  


const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prevState) => {
    let updatedData = { ...prevState, [name]: value };

    if (name === "chronicDiseases") {
      // If "No" is selected, reset chronic disease-related fields
      if (value === "לא") {
        updatedData = {
          ...updatedData,
          chronicCount: 0,
          diseases: []
        };
      }
    } else if (name === "chronicCount") {
      // Dynamically update chronic disease count
      const count = parseInt(value, 10) || 0;
      updatedData = {
        ...updatedData,
        chronicCount: count,
        diseases: Array.from({ length: count }, (_, index) => ({
          id: index + 1,
          name: "",
          symptomsAge: "",
          diagnosisAge: ""
        }))
      };
    }

    return updatedData;
  });
};

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle the file upload logic here (e.g., save to state or upload to the server)
      console.log("Selected file:", file.name);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const workIssuesMentalFrequency = formData.workIssuesMentalFrequency;
    console.log("FormData before sending:", formData);


    try {
      if (formData.numberOfChildren < 0) {
        alert("מספר ילדים חייב להיות מספר חיובי או 0");
        return;
      }

      const response = await fetch("http://54.242.154.185:3002/insert_crohn_survey", {
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

      if (formData.diseaseTrigger === 'טראומה'&&workIssuesMentalFrequency >1) {
        navigate("/ptsdquestionnaire", { state: { preferredLanguage: formData.preferredLanguage ,workIssuesMentalFrequency:formData.workIssuesMentalFrequency,idNumber: formData.idNumber, diagnosis: formData.diagnosis } });
      }
  
      else if (formData.diseaseTrigger === 'טראומה') {
        navigate("/ptsdquestionnaire", { state: { preferredLanguage: formData.preferredLanguage,idNumber: formData.idNumber , diagnosis: formData.diagnosis } });
        
      }
      else if (workIssuesMentalFrequency >= 1) {
        navigate("/depressionassessment", { state: { preferredLanguage: formData.preferredLanguage,idNumber: formData.idNumber , diagnosis: formData.diagnosis } });
  
      }
      else{
        navigate("/healthlifestyleform", { state: { preferredLanguage: formData.preferredLanguage,idNumber: formData.idNumber , diagnosis: formData.diagnosis } });
  
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  // // Submit handler
  // const handlesubmit = (e) => {
  //   e.preventDefault();
  //   const workIssuesMentalFrequency = formData.workIssuesMentalFrequency;
  //   console.log(formData);
  //   if (formData.diseaseTrigger === 'טראומה'&&workIssuesMentalFrequency >1) {
  //     navigate("/ptsdquestionnaire", { state: { preferredLanguage: formData.preferredLanguage ,workIssuesMentalFrequency:formData.workIssuesMentalFrequency} });
  //   }

  //   else if (formData.diseaseTrigger === 'טראומה') {
  //     navigate("/ptsdquestionnaire", { state: { preferredLanguage: formData.preferredLanguage } });
      
  //   }
  //   else if (workIssuesMentalFrequency >= 1) {
  //     navigate("/depressionassessment", { state: { preferredLanguage: formData.preferredLanguage } });

  //   }
  //   else{

  //     navigate("/healthlifestyleform", { state: { preferredLanguage: formData.preferredLanguage } });

  //   }
  //   // Here you'd handle sending the formData to the backend (e.g., with axios)
  // };


  return (
      <div className="form-container">
        <h2 className="mb-4">Medical Form</h2>
        <form  onSubmit={handlesubmit}>
          <div className="row">
            {/* Diagnosis Information */}
        {formData.diagnosis.includes("קרוהן/קוליטיס") && (
            <div >
              <label htmlFor="crohnAge" className="form-label">
                
              {questions.find(q => q.field_name === "crohnAge")?.question_text || "שאלה לא זמינה"}
                </label>
              <input
                  type="number"
                  className="form-control"
                  id="crohnAge"
                  name="crohnAge"
                  min="0"
                  value={formData.crohnAge}
                  onChange={handleChange}
              />
            </div>
            )}

        {formData.diagnosis.includes("קרוהן/קוליטיס") && (
            <div >
              <label htmlFor="diagnosisAge" className="form-label">
              {questions.find(q => q.field_name === "diagnosisAge")?.question_text || "שאלה לא זמינה"}
               </label>
              <input
                  type="number"
                  className="form-control"
                  id="diagnosisAge"
                  name="diagnosisAge"
                  min="0"
                  value={formData.diagnosisAge}
                  onChange={handleChange}
              />
            </div>
            )}

            {(formData.diagnosis.includes("פסוריאטיק ארטריטס") || formData.diagnosis.includes("ראומטיק ארטריטיס")) && (
            <div >
              <label htmlFor="artitiesAge" className="form-label">
                
              {questions.find(q => q.field_name === "artitiesAge")?.question_text || "שאלה לא זמינה"}
                </label>
              <input
                  type="number"
                  className="form-control"
                  id="artitiesAge"
                  name="artitiesAge"
                  min="0"
                  value={formData.artitiesAge}
                  onChange={handleChange}
              />
            </div>
            )}

          {(formData.diagnosis.includes("פסוריאטיק ארטריטס") || formData.diagnosis.includes("ראומטיק ארטריטיס")) && (
            <div >
              <label htmlFor="diagnosisArtitisAge" className="form-label">
              {questions.find(q => q.field_name === "diagnosisArtitisAge")?.question_text || "שאלה לא זמינה"}
               </label>
              <input
                  type="number"
                  className="form-control"
                  id="diagnosisArtitisAge"
                  name="diagnosisArtitisAge"
                  min="0"
                  value={formData.diagnosisArtitisAge}
                  onChange={handleChange}
              />
            </div>
            )}

{(formData.diagnosis.includes("פסוריאזיס")) && (
            <div >
              <label htmlFor="psoriasisAge" className="form-label">
                
              {questions.find(q => q.field_name === "psoriasisAge")?.question_text || "שאלה לא זמינה"}
                </label>
              <input
                  type="number"
                  className="form-control"
                  id="psoriasisAge"
                  name="psoriasisAge"
                  min="0"
                  value={formData.psoriasisAge}
                  onChange={handleChange}
              />
            </div>
            )}

          {(formData.diagnosis.includes("פסוריאזיס")) && (
            <div >
              <label htmlFor="diagnosisPsoriasisAge" className="form-label">
              {questions.find(q => q.field_name === "diagnosisPsoriasisAge")?.question_text || "שאלה לא זמינה"}
               </label>
              <input
                  type="number"
                  className="form-control"
                  id="diagnosisPsoriasisAge"
                  name="diagnosisPsoriasisAge"
                  min="0"
                  value={formData.diagnosisPsoriasisAge}
                  onChange={handleChange}
              />
            </div>
            )}

            <h3></h3>
            {(formData.diagnosis.includes("פסוריאטיק ארטריטס") || formData.diagnosis.includes("ראומטיק ארטריטיס") || formData.diagnosis.includes("פסוריאזיס")) && (
            <div className="form-group radio-preferred">
                      <label htmlFor="biopsieIdent" className="form-label" >
                      {questions.find(q => q.field_name === "biopsieIdent")?.question_text || "שאלה לא זמינה"}
                       </label>
                      <div className="form-check">
                          <input type="radio" name="biopsieIdent" value="כן" onChange={handleChange} 
                                 onClick={() => handleChange({ target: { name: "biopsieIdent", value: formData.biopsieIdent === "כן" ? "" : "כן" } })}
                                 checked={formData.biopsieIdent === "כן"}
                          /> כן
                      </div>
                      <div className="form-check">
                          <input type="radio" name="biopsieIdent" value="לא" onChange={handleChange} 
                                 onClick={() => handleChange({ target: { name: "biopsieIdent", value: formData.biopsieIdent === "לא" ? "" : "לא" } })}
                                 checked={formData.biopsieIdent === "לא"}
                          /> לא
                      </div>
                      <div className="form-check">
                          <input type="radio" name="biopsieIdent" value="לא יודע" onChange={handleChange} 
                                 onClick={() => handleChange({ target: { name: "biopsieIdent", value: formData.biopsieIdent === "לא יודע" ? "" : "לא יודע" } })}
                                 checked={formData.biopsieIdent === "לא יודע"}
                          /> לא יודע
                      </div>
              </div>
            )}

          <div className="mt-4"></div>

            {/* Treatment Information */}
            <div className="form-group radio-preferred">
            <label htmlFor="isTreat" className="form-label">
              {preferredLanguage === 'לשון זכר' 
                ? questions.find(q => q.field_name === "isTreat_men")?.question_text || "שאלה לא זמינה"
                : questions.find(q => q.field_name === "isTreat_women")?.question_text || "שאלה לא זמינה"}
            </label>
              <div className="form-check">
                  <input type="radio" name="isTreat" value="כן" onChange={handleChange}  
                        onClick={() => handleChange({ target: { name: "isTreat", value: formData.isTreat === "כן" ? "" : "כן" } })}
                        checked={formData.isTreat === "כן"}
                  /> כן
              </div>
              <div className="form-check">
                  <input type="radio" name="isTreat" value="לא" onChange={handleChange} 
                        onClick={() => handleChange({ target: { name: "isTreat", value: formData.isTreat === "לא" ? "" : "לא" } })}
                        checked={formData.isTreat === "לא"}
                  /> לא
              </div>
            </div>


        {formData.isTreat === 'כן' && (
                      <div >
                      <label htmlFor="treatmentType" className="form-label">
                        
                        {questions.find(q => q.field_name === "treatmentType")?.question_text || "שאלה לא זמינה"}
                        </label>
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
              <label htmlFor="treatmentDuration" className="form-label">
              {questions.find(q => q.field_name === "treatmentDuration")?.question_text || "שאלה לא זמינה"}
                
                </label>
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
                      <label htmlFor="treatmentChanges" className="form-label" >
                      {questions.find(q => q.field_name === "treatmentDateAndReason")?.question_text || "שאלה לא זמינה"}
                       </label>
                      <div className="form-check">
                          <input type="radio" name="treatmentChanges" value="כן" onChange={handleChange} 
                                 onClick={() => handleChange({ target: { name: "treatmentChanges", value: formData.treatmentChanges === "כן" ? "" : "כן" } })}
                                 checked={formData.treatmentChanges === "כן"}
                          /> כן
                      </div>
                      <div className="form-check">
                          <input type="radio" name="treatmentChanges" value="לא" onChange={handleChange} 
                                 onClick={() => handleChange({ target: { name: "treatmentChanges", value: formData.treatmentChanges === "לא" ? "" : "לא" } })}
                                 checked={formData.treatmentChanges === "לא"}
                          /> לא
                      </div>
              </div>

            )}

            {formData.treatmentChanges === 'כן' && (
            <div>
              <label htmlFor="treatmentDateAndReason" className="form-label">
              {questions.find(q => q.field_name === "treatmentDate")?.question_text || "שאלה לא זמינה"}
                </label>
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

          {formData.treatmentChanges === 'כן' && (
            <div>
              <label htmlFor="treatmentChangeReason" className="form-label">
              {questions.find(q => q.field_name === "treatmentReason")?.question_text || "שאלה לא זמינה"}
              </label>
              <input
                  type="text"
                  className="form-control"
                  id="treatmentChangeReason"
                  name="treatmentChangeReason"
                  value={formData.treatmentChangeReason}
                  onChange={handleChange}
              />
            </div>
             )} 

             
             

             

{formData.isTreat === 'כן' && (
  <div className="treatmentAdherence">
    <label className="form-label">
      {questions.find(q => q.field_name === "treatmentAdherence")?.question_text || "שאלה לא זמינה"}
    </label>
    <div className="slider-container">
      <input
        type="range"
        min="1"  // Set min to 0 to allow selecting the leftmost option
        max="5"
        step="1"
        className="slider"
        id="treatmentAdherence"
        name="treatmentAdherence"
        value={formData.treatmentAdherence || 0}  // Ensure formData.treatmentAdherence is initialized correctly
        onChange={handleChange}
        onClick={(e) => {
          if (formData.treatmentAdherence === 0) {
            handleChange(e);  // Ensure the first click registers
          }
        }}
      />
      <div className="slider-labels">
        {/* Display 'לא נבחרה תשובה' if the value is 0 */}
        <span>נא לבחור אחת מהתשובות</span>
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

                    {preferredLanguage === 'לשון זכר' 
                ? questions.find(q => q.field_name === "winterIllness_men")?.question_text || "שאלה לא זמינה"
                : questions.find(q => q.field_name === "winterIllness_woman")?.question_text || "שאלה לא זמינה"}
                  </label>
                  <div className="slider-container">
        <input
            type="range"
            min="1"
            max="3"
            step= "1"
            className="slider"
            id="winterlleness"
            name="winterlleness"
            value={formData.winterlleness || 0}  // Initial value is 0
            onChange={handleChange}
            onClick={(e) => {
                if (formData.winterlleness === 0) {
                    handleChange(e);  // Ensure the first click registers
                }
            }}
        />
                        <div className="slider-labels">
                            <span>0 - בכלל לא</span>
                            <span >פעם עד פעמיים </span>
                            <span> שלוש ומעלה </span>

                        </div>
          </div>
          </div>


          {formData.diagnosis.includes("קרוהן/קוליטיס") && (

                <div className="doctorduechron">
                    <label className="form-label">
                    {preferredLanguage === 'לשון זכר' 
                ? questions.find(q => q.field_name === "doctorDueChron_men")?.question_text || "שאלה לא זמינה"
                : questions.find(q => q.field_name === "doctorDueChron_women")?.question_text || "שאלה לא זמינה"}
                    
                    </label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="4"
                            step="1"
                            className="slider"
                            onInput={handleChange}
                            id="doctorduechron"
                            name="doctorduechron"
                            value={formData.doctorduechron }
                            onClick={(e) => {
                              if (formData.doctorduechron === 0) {
                                  handleChange(e); // Ensure the first click registers
                              }
                          }}
                            onChange={handleChange}
                        />
                        <div className="slider-labels">

                            <span>0 - בכלל לא</span>
                            <span>1-2</span>
                            <span>3-4</span>
                            <span>יותר מחמש פעמים</span>
                        </div>
                    </div>
                </div>
          )}

        {(formData.diagnosis.includes("פסוריאטיק ארטריטס") || formData.diagnosis.includes("ראומטיק ארטריטיס")) && (

          <div className="doctorDueArtisis">
              <label className="form-label">
              {preferredLanguage === 'לשון זכר' 
          ? questions.find(q => q.field_name === "doctorDueArtisis_men")?.question_text || "שאלה לא זמינה"
          : questions.find(q => q.field_name === "doctorDueArtisis_women")?.question_text || "שאלה לא זמינה"}
              
              </label>
              <div className="slider-container">
                  <input
                      type="range"
                      min="1"
                      max="4"
                      step="1"
                      className="slider"
                      onInput={handleChange}
                      id="doctorDueArtisis"
                      name="doctorDueArtisis"
                      value={formData.doctorDueArtisis }
                      onClick={(e) => {
                        if (formData.doctorDueArtisis === 0) {
                            handleChange(e); // Ensure the first click registers
                        }
                    }}
                      onChange={handleChange}
                  />
                  <div className="slider-labels">

                      <span>0 - בכלל לא</span>
                      <span>1-2</span>
                      <span>3-4</span>
                      <span>יותר מחמש פעמים</span>
                  </div>
              </div>
          </div>
          )}

{(formData.diagnosis.includes("פסוריאזיס")) && (

<div className="doctorDuePsoriazis">
    <label className="form-label">
    {preferredLanguage === 'לשון זכר' 
? questions.find(q => q.field_name === "doctorDuePsoriazis_men")?.question_text || "שאלה לא זמינה"
: questions.find(q => q.field_name === "doctorDuePsoriazis_men")?.question_text || "שאלה לא זמינה"}
    
    </label>
    <div className="slider-container">
        <input
            type="range"
            min="1"
            max="4"
            step="1"
            className="slider"
            onInput={handleChange}
            id="doctorDuePsoriazis"
            name="doctorDuePsoriazis"
            value={formData.doctorDuePsoriazis }
            onClick={(e) => {
              if (formData.doctorDuePsoriazis === 0) {
                  handleChange(e); // Ensure the first click registers
              }
          }}
            onChange={handleChange}
        />
        <div className="slider-labels">

            <span>0 - בכלל לא</span>
            <span>1-2</span>
            <span>3-4</span>
            <span>יותר מחמש פעמים</span>
        </div>
    </div>
</div>
)}



        <div className="form-group radio-preferred">
          <label htmlFor="allergies" className="form-label" >
          {preferredLanguage === 'לשון זכר' 
                ? questions.find(q => q.field_name === "allergies_men")?.question_text || "שאלה לא זמינה"
                : questions.find(q => q.field_name === "allergies_women")?.question_text || "שאלה לא זמינה"}
          </label>
          <div className="form-check">
              <input type="radio" name="allergies" value="כן" onChange={handleChange} 
                  onClick={() => handleChange({ target: { name: "allergies", value: formData.allergies === "כן" ? "" : "כן" } })}
                  checked={formData.allergies === "כן"}
                   /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="allergies" value="לא" onChange={handleChange} 
                  onClick={() => handleChange({ target: { name: "allergies", value: formData.allergies === "לא" ? "" : "לא" } })}
                  checked={formData.allergies === "לא"}
                   /> לא
          </div>
        </div>


        {formData.allergies === 'כן' && (
          <div className="form-group">
            <label htmlFor="allergiesAge">
              
              {questions.find(q => q.field_name === "allergiesAge")?.question_text || "שאלה לא זמינה"}
              </label>
            <input min = "0" type="number" name="allergiesAge" id="allergiesAge" className="form-control" value={formData.allergiesAge} onChange={handleChange} />
          </div>
        )}

        {formData.allergies === 'כן' && (
          <div className="form-group">
            <label htmlFor="allergiesForWhat">
            {preferredLanguage === 'לשון זכר' 
                ? questions.find(q => q.field_name === "allergiesForWhat_man")?.question_text || "שאלה לא זמינה"
                : questions.find(q => q.field_name === "allergiesForWhat_woman")?.question_text || "שאלה לא זמינה"}
              </label>
            <input type="text" name="allergiesForWhat" id="allergiesForWhat" className="form-control" value={formData.allergiesForWhat} onChange={handleChange} />
          </div>
        )}

<div className="form-group radio-preferred">
          <label htmlFor="foodSensitivity" className="form-label" >
          {preferredLanguage === 'לשון זכר' 
                ? questions.find(q => q.field_name === "foodSensitivity_men")?.question_text || "שאלה לא זמינה"
                : questions.find(q => q.field_name === "foodSensitivity_women")?.question_text || "שאלה לא זמינה"}
            </label>
          <div className="form-check">
              <input type="radio" name="foodSensitivity" value="כן" onChange={handleChange} 
               onClick={() => handleChange({ target: { name: "foodSensitivity", value: formData.foodSensitivity === "כן" ? "" : "כן" } })}
               checked={formData.foodSensitivity === "כן"}
              /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="foodSensitivity" value="לא" onChange={handleChange}  
               onClick={() => handleChange({ target: { name: "foodSensitivity", value: formData.foodSensitivity === "לא" ? "" : "לא" } })}
               checked={formData.foodSensitivity === "לא"}
              /> לא
          </div>
        </div>


        {formData.foodSensitivity === 'כן' && (
          <div className="form-group">
            <label htmlFor="foodSensetivityAge"> 
            {preferredLanguage === 'לשון זכר' 
                ? questions.find(q => q.field_name === "foodSensetivityAge_men")?.question_text || "שאלה לא זמינה"
                : questions.find(q => q.field_name === "foodSensetivityAge_woman")?.question_text || "שאלה לא זמינה"}
              </label>
            <input min = "0" type="number" name="foodSensetivityAge" id="foodSensetivityAge" className="form-control" value={formData.foodSensetivityAge} onChange={handleChange} />
          </div>
        )}

<div className="form-group radio-preferred">
        <label className="form-label">
        {questions.find(q => q.field_name === "chronicDiseases")?.question_text || "שאלה לא זמינה"}
          
          </label>
        <div className="form-check">
          <input
            type="radio"
            name="chronicDiseases"
            value="כן"
            onChange={handleChange}
            checked={formData.chronicDiseases === "כן"}
            onClick={() => handleChange({ target: { name: "chronicDiseases", value: formData.chronicDiseases === "כן" ? "" : "כן" } })}

          />{" "}
          כן
        </div>
        <div className="form-check">
          <input
            type="radio"
            name="chronicDiseases"
            value="לא"
            onChange={handleChange}
            checked={formData.chronicDiseases === "לא"}
            onClick={() => handleChange({ target: { name: "chronicDiseases", value: formData.chronicDiseases === "לא" ? "" : "לא" } })}


          />{" "}
          לא
        </div>
      </div>
        

              {/* Number of Chronic Diseases Input */}
              {formData.chronicDiseases === "כן" && (
  <div className="form-group">
    <label>
      {questions.find(q => q.field_name === "chronicCount")?.question_text || "שאלה לא זמינה"}
    </label>
    <input
      type="number"
      name="chronicCount"
      min="0"
      max="6"
      className="form-control"
      value={formData.chronicCount || ""}
      onWheel={(e) => e.target.blur()}
      onChange={(e) => {
        const value = parseInt(e.target.value, 10);
        
        // Check if the input is greater than 6
        if (value > 6) {
          alert("המספר המקסימלי הוא 6");
          // Ensure the value doesn't exceed 6
          e.target.value = 6;
          handleChange(e);  // Update formData with the correct value (6)
        } else {
          handleChange(e);  // Update formData normally if it's within the valid range
        }
      }}
    />
  </div>
)}


 {/* Dynamic Fields for Chronic Diseases */}
 {formData.chronicDiseases === "כן" &&
        formData.diseases.length > 0 &&
        formData.diseases.map((disease, index) => (
          <div key={index} className="form-group disease-group">
            <h4>מחלה {index + 1}</h4>
            <label>
            {questions.find(q => q.field_name === "disease_name")?.question_text || "שאלה לא זמינה"}
             </label>
            <input
              type="text"
              className="form-control"
              value={disease.name}
              onChange={(e) => handleDiseaseChange(index, "name", e.target.value)}
            />

            <label>
            {questions.find(q => q.field_name === "symptomsAge")?.question_text || "שאלה לא זמינה"}
             </label>
            <input
              type="number"
              min="0"
              className="form-control"
              value={disease.symptomsAge}
              onChange={(e) => handleDiseaseChange(index, "symptomsAge", e.target.value)}
            />

            <label>
            {questions.find(q => q.field_name === "diagnosisAgeChronic")?.question_text || "שאלה לא זמינה"}
             </label>
            <input
              type="number"
              min="0"
              className="form-control"
              value={disease.diagnosisAge}
              onChange={(e) => handleDiseaseChange(index, "diagnosisAge", e.target.value)}
            />
          </div>
        ))}



        <div className="form-group radio-preferred">
          <label htmlFor="hospitalization" className="form-label" >
          {questions.find(q => q.field_name === "hospitalization")?.question_text || "שאלה לא זמינה"}
           </label>
          <div className="form-check">
              <input type="radio" name="hospitalization" value="כן" onChange={handleChange}
                             onClick={() => handleChange({ target: { name: "hospitalization", value: formData.hospitalization === "כן" ? "" : "כן" } })}
                             checked={formData.hospitalization === "כן"}
              /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="hospitalization" value="לא" onChange={handleChange}  
                             onClick={() => handleChange({ target: { name: "hospitalization", value: formData.hospitalization === "לא" ? "" : "לא" } })}
                             checked={formData.hospitalization === "לא"}
              /> לא
          </div>
        </div>

        {formData.hospitalization === "כן" && (
        <div className="form-group mt-3">
          <label htmlFor="hospitalizationDetails" className="form-label">
          {preferredLanguage === 'לשון זכר' 
                ? questions.find(q => q.field_name === "hospitalizationDetails_man")?.question_text || "שאלה לא זמינה"
                : questions.find(q => q.field_name === "hospitalizationDetails_woman")?.question_text || "שאלה לא זמינה"}
            
          </label>
          <textarea
            id="hospitalizationDetails"
            name="hospitalizationDetails"
            value={formData.hospitalizationDetails}
            onChange={handleChange}
            className="form-control"
            placeholder=""
          />
        </div>
      )}


<div className="form-group radio-preferred">
          <label htmlFor="surgeries" className="form-label" >
          {questions.find(q => q.field_name === "surgeries")?.question_text || "שאלה לא זמינה"}
           </label>
          <div className="form-check">
              <input type="radio" name="surgeries" value="כן" onChange={handleChange} 
              
              onClick={() => handleChange({ target: { name: "surgeries", value: formData.surgeries === "כן" ? "" : "כן" } })}
              checked={formData.surgeries === "כן"}
              /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="surgeries" value="לא" onChange={handleChange} 
                                      onClick={() => handleChange({ target: { name: "surgeries", value: formData.surgeries === "לא" ? "" : "לא" } })}
                                      checked={formData.surgeries === "לא"}
              /> לא
          </div>
        </div>

        {formData.surgeries === "כן" && (
          <div className="form-group mt-3">
            <label htmlFor="surgeriesList" className="form-label">
              {questions.find(q => q.field_name === "surgeriesList")?.question_text || "שאלה לא זמינה"}
            </label>
            <textarea
              id="surgeriesList"
              name="surgeriesList"
              value={formData.surgeriesList || ""}
              onChange={handleChange}
              className="form-control"
              placeholder=
              {formData.preferredLanguage === "לשון זכר"
                ?  "פרט בבקשה את הניתוחים שעברת"
                :  "פרטי בבקשה את הניתוחים שעברת"}
             
            />

            <label htmlFor="surgeriesAges" className="form-label mt-3">
            {questions.find(q => q.field_name === "surgeriesAges")?.question_text || "שאלה לא זמינה"}

            </label>
            <textarea
              id="surgeriesAges"
              name="surgeriesAges"
              value={formData.surgeriesAges || ""}
              onChange={handleChange}
              className="form-control"
              placeholder=
              {formData.preferredLanguage === "לשון זכר"
                ? "פרט בבקשה את הגילאים שבהם עברת את הניתוחים"
                : "פרטי בבקשה את הגילאים שבהם עברת את הניתוחים"}
            />
          </div>
        )}

        <div className="form-group radio-preferred">
          <label htmlFor="complementaryMedicine" className="form-label" >

          {questions.find(q => q.field_name === "complementaryMedicine")?.question_text || "שאלה לא זמינה"}
            </label>
          <div className="form-check">
            <input type="radio" name="complementaryMedicine" value="כן" onChange={handleChange}  
                onClick={() => handleChange({ target: { name: "complementaryMedicine", value: formData.complementaryMedicine === "כן" ? "" : "כן" } })}
                checked={formData.complementaryMedicine === "כן"}
            
            /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="complementaryMedicine" value="לא" onChange={handleChange} 
                  onClick={() => handleChange({ target: { name: "complementaryMedicine", value: formData.complementaryMedicine === "לא" ? "" : "לא" } })}
                  checked={formData.complementaryMedicine === "לא"}
              /> לא
          </div>
        </div>

        {formData.complementaryMedicine === "כן" && (
        <div className="form-group mt-3">
          <label htmlFor="complementaryMedicineReason" className="form-label">
          {questions.find(q => q.field_name === "complementaryMedicineReason")?.question_text || "שאלה לא זמינה"}
          </label>
          <textarea
            id="complementaryMedicineReason"
            name="complementaryMedicineReason"
            value={formData.complementaryMedicineReason}
            onChange={handleChange}
            className="form-control"
           
          />
        </div>
      )}


        {formData.complementaryMedicine === "כן" && (
        <div className="form-group mt-3">
          <label htmlFor="complementaryMedicineWayOfTreatment" className="form-label">
            {questions.find(q => q.field_name === "complementaryMedicineWayOfTreatment")?.question_text || "שאלה לא זמינה"}

          </label>
          <textarea
            id="complementaryMedicineWayOfTreatment"
            name="complementaryMedicineWayOfTreatment"
            value={formData.complementaryMedicineWayOfTreatment}
            onChange={handleChange}
            className="form-control"
            
          />
        </div>
      )}

      
        {formData.complementaryMedicine === "כן" && (
        <div className="form-group mt-3">
          <label htmlFor="complementaryMedicineWayOfDuration" className="form-label">
          {questions.find(q => q.field_name === "complementaryMedicineWayOfDuration")?.question_text || "שאלה לא זמינה"}
          </label>
          <textarea
            id="complementaryMedicineWayOfDuration"
            name="complementaryMedicineWayOfDuration"
            value={formData.complementaryMedicineWayOfDuration}
            onChange={handleChange}
            className="form-control"
            
          />
        </div>
      )}

        {formData.complementaryMedicine === "כן" && (
        <div className="form-group mt-3">
          <label htmlFor="complementaryMedicineWayOfBetter" className="form-label">
          {questions.find(q => q.field_name === "complementaryMedicineWayOfBetter")?.question_text || "שאלה לא זמינה"}

          </label>
          <textarea
            id="complementaryMedicineWayOfBetter"
            name="complementaryMedicineWayOfBetter"
            value={formData.complementaryMedicineWayOfBetter}
            onChange={handleChange}
            className="form-control"
            
          />
        </div>
      )}


            <div className="form-group mt-3">
          <label htmlFor="treatmentHelp" className="form-label">
          {questions.find(q => q.field_name === "treatmentHelp")?.question_text || "שאלה לא זמינה"}

          </label>
          <textarea
            id="treatmentHelp"
            name="treatmentHelp"
            value={formData.treatmentHelp}
            onChange={handleChange}
            className="form-control"
            
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="aggravatesCondition" className="form-label">
          {questions.find(q => q.field_name === "aggravatesCondition")?.question_text || "שאלה לא זמינה"}

          </label>
          <textarea
            id="aggravatesCondition"
            name="aggravatesCondition"
            value={formData.aggravatesCondition}
            onChange={handleChange}
            className="form-control"
            
          />
        </div>


        

        <div className="form-group radio-preferred">
          <label htmlFor="diseaseTrigger" className="form-label" >
            
          {questions.find(q => q.field_name === "diseaseTrigger")?.question_text || "שאלה לא זמינה"}</label>
          <div className="form-check">
              <input type="radio" name="diseaseTrigger" value="התפרצות מחלה אחרת" onChange={handleChange} 
                onClick={() => handleChange({ target: { name: "diseaseTrigger", value: formData.diseaseTrigger === "התפרצות מחלה אחרת" ? "" : "התפרצות מחלה אחרת" } })}
                checked={formData.diseaseTrigger === "התפרצות מחלה אחרת"}
              /> כן, התפרצות מחלה אחרת
          </div>
          <div className="form-check">
              <input type="radio" name="diseaseTrigger" value="סמיכות לארוע משנה חיים" onChange={handleChange} 
                              onClick={() => handleChange({ target: { name: "diseaseTrigger", value: formData.diseaseTrigger === "סמיכות לארוע משנה חיים" ? "" : "סמיכות לארוע משנה חיים" } })}
                              checked={formData.diseaseTrigger === "סמיכות לארוע משנה חיים"}
              /> כן, סמיכות לארוע משנה חיים
          </div>
          <div className="form-check">
              <input type="radio" name="diseaseTrigger" value="תאונה" onChange={handleChange}  
                              onClick={() => handleChange({ target: { name: "diseaseTrigger", value: formData.diseaseTrigger === "תאונה" ? "" :"תאונה" } })}
                              checked={formData.diseaseTrigger === "תאונה"}
              /> כן, תאונה
          </div>
          <div className="form-check">
              <input type="radio" name="diseaseTrigger" value="טראומה" onChange={handleChange} 
                                                        onClick={() => handleChange({ target: { name: "diseaseTrigger", value: formData.diseaseTrigger === "טראומה" ? "" :"טראומה" } })}
                                                        checked={formData.diseaseTrigger === "טראומה"}
              /> כן ,טראומה
          </div>
          <div className="form-check">
              <input type="radio" name="diseaseTrigger" value="לא" onChange={handleChange} 
                           onClick={() => handleChange({ target: { name: "diseaseTrigger", value: formData.diseaseTrigger === "לא" ? "" :"לא" } })}
                           checked={formData.diseaseTrigger === "לא"}
              /> לא
          </div>
        </div>

      {formData.diseaseTrigger && (
        <div className="form-group mt-3">
          <label htmlFor="triggerDetails" className="form-label">
          {questions.find(q => q.field_name === "triggerDetails")?.question_text || "שאלה לא זמינה"}
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
                {questions.find(q => q.field_name === "bestTakeCareByClient")?.question_text || "שאלה לא זמינה"}
              
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

            {formData.diagnosis.includes("פסוריאזיס") && (

              <div className="form-group radio-preferred">
              <label htmlFor="coverman" className="form-label" >

              {questions.find(q => q.field_name === "coverman")?.question_text || "שאלה לא זמינה"} </label>
              <div className="form-check">
                <input type="radio" name="coverman" value="כן" onChange={handleChange}
                                          onClick={() => handleChange({ target: { name: "coverman", value: formData.coverman === "כן" ? "" :"כן" } })}
                                          checked={formData.coverman === "כן"}
                /> כן
              </div>
              <div className="form-check">
                <input type="radio" name="coverman" value="לא" onChange={handleChange} 
                                          onClick={() => handleChange({ target: { name: "coverman", value: formData.coverman === "לא" ? "" :"לא" } })}
                                          checked={formData.coverman === "לא"}
                /> לא
              </div>
              </div>
              )}

        {formData.diagnosis.includes("קרוהן/קוליטיס") && (

            <div className="form-group radio-preferred">
          <label htmlFor="cronNegative" className="form-label" >

          {questions.find(q => q.field_name === "cronNegative")?.question_text || "שאלה לא זמינה"} </label>
          <div className="form-check">
              <input type="radio" name="cronNegative" value="כן" onChange={handleChange}
                                         onClick={() => handleChange({ target: { name: "cronNegative", value: formData.cronNegative === "כן" ? "" :"כן" } })}
                                         checked={formData.cronNegative === "כן"}
              /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="cronNegative" value="לא" onChange={handleChange} 
                                         onClick={() => handleChange({ target: { name: "cronNegative", value: formData.cronNegative === "לא" ? "" :"לא" } })}
                                         checked={formData.cronNegative === "לא"}
              /> לא
          </div>
        </div>
        )}

        {(formData.diagnosis.includes("פסוריאטיק ארטריטס") || formData.diagnosis.includes("ראומטיק ארטריטיס")) && (

        <div className="form-group radio-preferred">
        <label htmlFor="artitisNegative" className="form-label" >

        {questions.find(q => q.field_name === "artitisNegative")?.question_text || "שאלה לא זמינה"} </label>
        <div className="form-check">
          <input type="radio" name="artitisNegative" value="כן" onChange={handleChange}
                                    onClick={() => handleChange({ target: { name: "artitisNegative", value: formData.artitisNegative === "כן" ? "" :"כן" } })}
                                    checked={formData.artitisNegative === "כן"}
          /> כן
        </div>
        <div className="form-check">
          <input type="radio" name="artitisNegative" value="לא" onChange={handleChange} 
                                    onClick={() => handleChange({ target: { name: "artitisNegative", value: formData.artitisNegative === "לא" ? "" :"לא" } })}
                                    checked={formData.artitisNegative === "לא"}
          /> לא
        </div>
        </div>
        )}


        {(formData.cronNegative === "כן" || formData.artitisNegative=="כן")&& (
        <div className="form-group mt-3">
          <label htmlFor="cronNegativeReason" className="form-label">
          {preferredLanguage === 'לשון זכר' 
                ? ' אנא פרט בבקשה' 
                : ' אנא פרטי בבקשה'}
         
          </label>
          <textarea
            id="cronNegativeReason"
            name="cronNegativeReason"
            value={formData.cronNegativeReason}
            onChange={handleChange}
            className="form-control"
            placeholder=""
          />
        </div>
      )}

<div className="form-group radio-preferred">
  <label htmlFor="familyDoctorVisit" className="form-label">
  {preferredLanguage === 'לשון זכר' 
                ? questions.find(q => q.field_name === "doctorDueChron_men")?.question_text || "שאלה לא זמינה"
                : questions.find(q => q.field_name === "doctorDueChron_women")?.question_text || "שאלה לא זמינה"}

  </label>

  {(formData.diagnosis.includes("פסוריאטיק ארטריטס") || formData.diagnosis.includes("ראומטיק ארטריטיס") || formData.diagnosis.includes("פסוריאזיס")) && (

  <div className="form-group radio-preferred">
          <label htmlFor="steroidiesTakeCare" className="form-label" >
            
          {questions.find(q => q.field_name === "steroidiesTakeCare")?.question_text || "שאלה לא זמינה"}
      </label>
          <div className="form-check">
        <input
          type="radio"
          id="visitYes"
          name="steroidiesTakeCare"
          value="כן"
          onChange={handleChange}
          checked={formData.steroidiesTakeCare === "כן"}
          onClick={() => handleChange({ target: { name: "steroidiesTakeCare", value: formData.steroidiesTakeCare === "כן" ? "" :"כן" } })}

        />
        <label htmlFor="visitYes">כן</label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          id="visitNo"
          name="steroidiesTakeCare"
          value="לא"
          onChange={handleChange}
          checked={formData.steroidiesTakeCare === "לא"}
          onClick={() => handleChange({ target: { name: "steroidiesTakeCare", value: formData.steroidiesTakeCare === "לא" ? "" :"לא" } })}

        />
        <label htmlFor="visitNo">לא</label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          id="visitNotKnoen"
          name="steroidiesTakeCare"
          value="לא יודע"
          onChange={handleChange}
          checked={formData.steroidiesTakeCare === "לא יודע"}
          onClick={() => handleChange({ target: { name: "steroidiesTakeCare", value: formData.steroidiesTakeCare === "לא יודע" ? "" :"לא יודע" } })}

        />
        <label htmlFor="visitNo">
        {preferredLanguage === 'לשון זכר' 
                ? '  לא יודע' 
                : '  לא יודעת'}
            
          
         </label>
      </div>
      </div>
  )}

{(formData.diagnosis.includes("פסוריאטיק ארטריטס") || formData.diagnosis.includes("ראומטיק ארטריטיס")|| formData.diagnosis.includes("פסוריאזיס")) && (

<div className="form-group radio-preferred">
        <label htmlFor="fotoTherapyTakeCare" className="form-label" >
          
        {questions.find(q => q.field_name === "fotoTherapyTakeCare")?.question_text || "שאלה לא זמינה"}
    </label>
        <div className="form-check">
      <input
        type="radio"
        id="visitYes"
        name="fotoTherapyTakeCare"
        value="כן"
        onChange={handleChange}
        checked={formData.fotoTherapyTakeCare === "כן"}
        onClick={() => handleChange({ target: { name: "fotoTherapyTakeCare", value: formData.fotoTherapyTakeCare === "כן" ? "" :"כן" } })}

      />
      <label htmlFor="visitYes">כן</label>
    </div>

    <div className="form-check">
      <input
        type="radio"
        id="visitNo"
        name="fotoTherapyTakeCare"
        value="לא"
        onChange={handleChange}
        checked={formData.fotoTherapyTakeCare === "לא"}
        onClick={() => handleChange({ target: { name: "fotoTherapyTakeCare", value: formData.fotoTherapyTakeCare === "לא" ? "" :"לא" } })}

      />
      <label htmlFor="visitNo">לא</label>
    </div>

    <div className="form-check">
      <input
        type="radio"
        id="visitNotKnoen"
        name="fotoTherapyTakeCare"
        value="לא יודע"
        onChange={handleChange}
        checked={formData.fotoTherapyTakeCare === "לא יודע"}
        onClick={() => handleChange({ target: { name: "fotoTherapyTakeCare", value: formData.fotoTherapyTakeCare === "לא יודע" ? "" :"לא יודע" } })}

      />
      <label htmlFor="visitNo">
      {preferredLanguage === 'לשון זכר' 
              ? '  לא יודע' 
              : '  לא יודעת'}
          
        
       </label>
    </div>
    </div>
)}



  <div className="form-check">
    <input
      type="radio"
      id="visitYes"
      name="familyDoctorVisit"
      value="כן"
      onChange={handleChange}
      checked={formData.familyDoctorVisit === "כן"}
      onClick={() => handleChange({ target: { name: "familyDoctorVisit", value: formData.familyDoctorVisit === "כן" ? "" :"כן" } })}
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
      onClick={() => handleChange({ target: { name: "familyDoctorVisit", value: formData.familyDoctorVisit === "לא" ? "" :"לא" } })}
    />
    <label htmlFor="visitNo">לא</label>
  </div>

  {formData.familyDoctorVisit === "כן" && (
    <div className="form-check" style={{ direction: "rtl", textAlign: "right" }}>
      <label htmlFor="visitFrequencyFamilyDoctor">
        {preferredLanguage === "לשון זכר" ? " אני פוגש את הרופא כל" : " אני פוגשת את הרופא כל"}
      </label>

      <select
        id="visitFrequencyFamilyDoctor"
        name="visitFrequencyFamilyDoctor"
        value={formData.visitFrequencyFamilyDoctor}
        onChange={handleChange} // Make sure this is the correct function
      >
        <option value="">בחר</option>
        <option value="3_months">כל 3 חודשים</option>
        <option value="6_months">כל 6 חודשים</option>
        <option value="1_year">כל שנה</option>
      </select>
    </div>
  )}
</div>



      <div className="form-group radio-preferred">
          <label htmlFor="dentistDoctorVisit" className="form-label" >
          {preferredLanguage === 'לשון זכר' 
                ? questions.find(q => q.field_name === "dentistDueChron_man")?.question_text || "שאלה לא זמינה"
                : questions.find(q => q.field_name === "dentistDueChron_women")?.question_text || "שאלה לא זמינה"}

           </label>
          <div className="form-check">
        <input
          type="radio"
          id="visitYes"
          name="dentistDoctorVisit"
          value="כן"
          onChange={handleChange}
          checked={formData.dentistDoctorVisit === "כן"}
          onClick={() => handleChange({ target: { name: "dentistDoctorVisit", value: formData.dentistDoctorVisit === "כן" ? "" :"כן" } })}
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
          onClick={() => handleChange({ target: { name: "dentistDoctorVisit", value: formData.dentistDoctorVisit === "לא" ? "" :"לא" } })}

        />
        <label htmlFor="visitNo">לא</label>
      </div>

  {/* ✅ Dropdown appears only if "Yes" is selected */}
  {formData.dentistDoctorVisit === "כן" && (
        <div className="form-check " style={{ direction: "rtl", textAlign: "right" }}>
          <label htmlFor="visitFrequencyDentist">
            {preferredLanguage === "לשון זכר"
              ? " אני פוגש את הרופא כל"
              : " אני פוגשת את הרופא כל"}
          </label>

          <select
            id="visitFrequencyDentist"
            name="visitFrequencyDentist"
            value={formData.visitFrequencyDentist}
            onChange={handleChange}
          >
            <option value="">בחר</option>
            <option value="3_months">כל 3 חודשים</option>
            <option value="6_months">כל 6 חודשים</option>
            <option value="1_year">כל שנה</option>
          </select>
        </div>
      )}
      
      </div>

      

      <div className="form-group radio-preferred">
          <label htmlFor="PointsDoctorVisit" className="form-label" >
          {preferredLanguage === 'לשון זכר' 
                ? questions.find(q => q.field_name === "PointsDoctorVisit_man")?.question_text || "שאלה לא זמינה"
                : questions.find(q => q.field_name === "PointsDoctorVisit_woman")?.question_text || "שאלה לא זמינה"}
            
           </label>
          <div className="form-check">
        <input
          type="radio"
          id="visitYes"
          name="pointsDoctorVisit"
          value="כן"
          onChange={handleChange}
          checked={formData.pointsDoctorVisit === "כן"}
          onClick={() => handleChange({ target: { name: "pointsDoctorVisit", value: formData.pointsDoctorVisit === "כן" ? "" :"כן" } })}

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
          onClick={() => handleChange({ target: { name: "pointsDoctorVisit", value: formData.pointsDoctorVisit === "לא" ? "" :"לא" } })}

        />
        <label htmlFor="visitNo">לא</label>
      </div>
      </div>
      
      <div className="form-group radio-preferred">
  <label htmlFor="vaccinationStatus" className="form-label">
  {questions.find(q => q.field_name === "vaccinationStatus")?.question_text || "שאלה לא זמינה"}

  </label>
  <select
    id="vaccinationStatus"
    name="vaccinationStatus"
    value={formData.vaccinationStatus || ""}
    onChange={handleChange}
    className="form-select"
    style={{ direction: "rtl", textAlign: "right" }}
  >
    <option value="" disabled hidden={formData.vaccinationStatus !== ""}>
      {preferredLanguage === 'לשון זכר' 
        ? 'בחר מצב פנקס חיסונים' 
        : 'בחרי מצב פנקס חיסונים'}
    </option>
    <option value="full">
      {preferredLanguage === 'לשון זכר' ? 'מלא' : 'מלא'}
    </option>
    <option value="comprehensive">
      {preferredLanguage === 'לשון זכר' 
        ? 'מלא פרט לקורונה ו/או שפעת' 
        : 'מלא פרט לקורונה ו/או שפעת'}
    </option>
    <option value="partial">
      {preferredLanguage === 'לשון זכר' ? 'חלקי' : 'חלקית'}
    </option>
    <option value="not-vaccinated">
      {preferredLanguage === 'לשון זכר' ? 'לא מחוסן' : 'לא מחוסנת'}
    </option>
    <option value="not-vaccinated">
     לא ידוע
    </option>
  </select>
</div>

        <div className="form-group radio-preferred">
          <label htmlFor="takeMedicen" className="form-label" >
          {preferredLanguage === 'לשון זכר' 
                ? questions.find(q => q.field_name === "takeMedicen_men")?.question_text || "שאלה לא זמינה"
                : questions.find(q => q.field_name === "takeMedicen_woman")?.question_text || "שאלה לא זמינה"}
            
           </label>
          <div className="form-check">
              <input type="radio" name="takeMedicen" value="כן" onChange={handleChange} 
                        checked={formData.takeMedicen === "כן"}
                        onClick={() => handleChange({ target: { name: "takeMedicen", value: formData.takeMedicen === "כן" ? "" :"כן" } })}
              /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="takeMedicen" value="לא" onChange={handleChange}  
                        checked={formData.takeMedicen === "לא"}
                        onClick={() => handleChange({ target: { name: "takeMedicen", value: formData.takeMedicen === "לא" ? "" :"לא" } })}
              /> לא
          </div>
        </div>

        {formData.takeMedicen === "כן" && (
        <div className="form-group mt-3">
          <label htmlFor="takeMedicenWhich" className="form-label">
         

          {preferredLanguage === 'לשון זכר' 
                ? '   אנא פרט בבקשה' 
                : '    אנא פרטי בבקשה'}
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
          <label htmlFor="takeFood" className="form-label" >
          {preferredLanguage === 'לשון זכר' 
                ? questions.find(q => q.field_name === "takeFood_man")?.question_text || "שאלה לא זמינה"
                : questions.find(q => q.field_name === "takeFood_woman")?.question_text || "שאלה לא זמינה"}

           </label>
          <div className="form-check">
              <input type="radio" name="takeFood" value="כן" onChange={handleChange} 
              
              checked={formData.takeFood === "כן"}
              onClick={() => handleChange({ target: { name: "takeFood", value: formData.takeFood === "כן" ? "" :"כן" } })}
              /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="takeFood" value="לא" onChange={handleChange} 
                checked={formData.takeFood === "לא"}
                onClick={() => handleChange({ target: { name: "takeFood", value: formData.takeFood === "לא" ? "" :"לא" } })}
              /> לא
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
            value={formData.takeFoodWhich}
            onChange={handleChange}
            className="form-control"
            placeholder=""
          />
        </div>
      )}
      </div>

      

      
      <div className="form-group radio-preferred">
          <label htmlFor="otherDeases" className="form-label" >
          {preferredLanguage === 'לשון זכר' 
                ? questions.find(q => q.field_name === "otherDeases_man")?.question_text || "שאלה לא זמינה"
                : questions.find(q => q.field_name === "otherDeases_woman")?.question_text || "שאלה לא זמינה"}
            
            </label>
          <div className="form-check">
              <input type="radio" name="otherDeases" value="כן" onChange={handleChange}
              
              checked={formData.otherDeases === "כן"}
              onClick={() => handleChange({ target: { name: "otherDeases", value: formData.otherDeases === "כן" ? "" :"כן" } })}
 
              /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="otherDeases" value="לא" onChange={handleChange} 
                        checked={formData.otherDeases === "לא"}
                        onClick={() => handleChange({ target: { name: "otherDeases", value: formData.otherDeases === "לא" ? "" :"לא" } })}
           
              /> לא
          </div>
        </div>

        {formData.otherDeases === "כן" && (
        <div className="form-group mt-3">
          <label htmlFor="otherDeasesWhich" className="form-label">
          {preferredLanguage === 'לשון זכר' 
                ? ' אנא פרט בבקשה' 
                : '  אנא פרטי בבקשה'}
         
          </label>
          <textarea
            id="otherDeasesWhich"
            name="otherDeasesWhich"
            value={formData.otherDeasesWhich}
            onChange={handleChange}
            className="form-control"
            placeholder=""
          />
        </div>
      )}

      <div className="medicationWithoutDoctorAmount">
          <label className="form-label">

          {preferredLanguage === 'לשון זכר' 
                ? questions.find(q => q.field_name === "medicationWithoutDoctorAmount_man")?.question_text || "שאלה לא זמינה"
                : questions.find(q => q.field_name === "medicationWithoutDoctorAmount_woman")?.question_text || "שאלה לא זמינה"}

         
          </label>
          <div className="slider-container">
              <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  className="slider"
                  value={formData.medicationWithoutDoctorAmount }
                  onClick={(e) => {
                    if (formData.medicationWithoutDoctorAmount === 0) {
                        handleChange(e); // Ensure the first click registers
                    }
                }}
                  id="medicationWithoutDoctorAmount"
                  name="medicationWithoutDoctorAmount"
                  onChange={handleChange}
              />
              <div className="slider-labels">
                  <span> בכלל לא</span>
                  <span>פעם ביום/יומיים</span>
                  <span>פעם בשבוע</span>
                  <span>פעם בחודש</span>
                  <span>כל שלושה עד שישה חודשים</span>
                  
                  
                  
              </div>
          </div>
      </div>

      <div className="form-group  radio-preferred">
          <label htmlFor="bloodType"  className="form-label">
          {questions.find(q => q.field_name === "bloodType")?.question_text || "שאלה לא זמינה"}
          </label>
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
              <input type="radio" name="bloodType" value="לא יודע" onChange={handleChange}  /> 
              {preferredLanguage === 'לשון זכר' 
                ? ' לא יודע' 
                : ' לא יודעת'}
              
          </div>
        </div>
      <div >

        <h3 > 

        {preferredLanguage === 'לשון זכר' 
                ? questions.find(q => q.field_name === "hurt_frequent_man")?.question_text || "שאלה לא זמינה"
                : questions.find(q => q.field_name === "hurt_frequent_woman")?.question_text || "שאלה לא זמינה"}
           </h3>


        <div className="headacheFrequency">
          
    <label className="form-label">תדירות כאבי ראש</label>
    <div className="slider-container">
    <input
    type="range"
    min="1"
    max="5"
    step="1"
    className="slider"
    value={formData.headacheFrequency}  // Always set value from state
    id="headacheFrequency"
    name="headacheFrequency"
    onChange={handleChange}  // Handle value change
    onClick={(e) => {
      if (formData.headacheFrequency === 0) {
          handleChange(e); // Ensure the first click registers
      }
  }}
/>

        <div className="slider-labels">
            <span>אף פעם</span>
            <span>לעתים נדירות</span>
            <span>לפעמים</span>
            <span>לעתים תכופות</span>
            <span>כל יום</span>
        </div>
    </div>
</div>

<div className="abdominalPainFrequency">
    <label className="form-label">תדירות כאבי בטן</label>
    <div className="slider-container">
        <input
            type="range"
            min="1"
            max="5"
            step="1"
            className="slider"
            value={formData.abdominalPainFrequency }  // Fallback to 0, meaning no value selected
            id="abdominalPainFrequency"
            name="abdominalPainFrequency"
            tabIndex="0" 
            onInput={handleChange} 
            onChange={handleChange}
            onClick={(e) => {
              if (formData.abdominalPainFrequency === 0) {
                  handleChange(e); // Ensure the first click registers
              }
          }}
        />
        <div className="slider-labels">
            <span>אף פעם</span>
            <span>לעתים נדירות</span>
            <span>לפעמים</span>
            <span>לעתים תכופות</span>
            <span>כל יום</span>
        </div>
    </div>
</div>

<div className="backPainFrequency">
    <label className="form-label">תדירות כאבי גב</label>
    <div className="slider-container">
        <input
            type="range"
            min="1"
            max="5"
            step="1"
            className="slider"
            value={formData.backPainFrequency}  // Fallback to 0, meaning no value selected
            id="backPainFrequency"
            name="backPainFrequency"
            tabIndex="0" 
            onInput={handleChange} 
            onChange={handleChange}
            onClick={(e) => {
              if (formData.backPainFrequency === 0) {
                  handleChange(e); // Ensure the first click registers
              }
          }}
        />
        <div className="slider-labels">
            <span>אף פעם</span>
            <span>לעתים נדירות</span>
            <span>לפעמים</span>
            <span>לעתים תכופות</span>
            <span>כל יום</span>
        </div>
    </div>
</div>

<div className="jointsPainFrequency">
    <label className="form-label">תדירות כאבי מפרקים</label>
    <div className="slider-container">
        <input
            type="range"
            min="1"
            max="5"
            step="1"
            className="slider"
            value={formData.jointsPainFrequency }  // Fallback to 0, meaning no value selected
            id="jointsPainFrequency"
            name="jointsPainFrequency"
            tabIndex="0" 
            onInput={handleChange} 
            onChange={handleChange}
            onClick={(e) => {
              if (formData.jointsPainFrequency === 0) {
                  handleChange(e); // Ensure the first click registers
              }
          }}
        />
        <div className="slider-labels">
            <span>אף פעם</span>
            <span>לעתים נדירות</span>
            <span>לפעמים</span>
            <span>לעתים תכופות</span>
            <span>כל יום</span>
        </div>
    </div>
</div>


      <div className="form-group radio-preferred">
          <label htmlFor="cronicDeseas" className="form-label" >
            
          {preferredLanguage === 'לשון זכר' 
                ? questions.find(q => q.field_name === "cronicDeseas_man")?.question_text || "שאלה לא זמינה"
                : questions.find(q => q.field_name === "cronicDeseas_woman")?.question_text || "שאלה לא זמינה"}
            
            </label>
          <div className="form-check">
              <input type="radio" name="cronicDeseas" value="כן" onChange={handleChange} 
                      checked={formData.cronicDeseas === "כן"}
                      onClick={() => handleChange({ target: { name: "cronicDeseas", value: formData.cronicDeseas === "כן" ? "" :"כן" } })}

              /> כן
          </div>
          <div className="form-check">
              <input type="radio" name="cronicDeseas" value="לא" onChange={handleChange}  
                      checked={formData.cronicDeseas === "לא"}
                      onClick={() => handleChange({ target: { name: "cronicDeseas", value: formData.cronicDeseas === "לא" ? "" :"לא" } })}

              /> לא
          </div>
        </div>

        {formData.cronicDeseas === "כן" && (
        <div className="form-group mt-3">
          <label htmlFor="cronicDeasesDetails" className="form-label">
                        
          {preferredLanguage === 'לשון זכר' 
                ? 'אנא פרט בבקשה' 
                : ' אנא פרטי בבקשה'}
          
          </label>
          <textarea
            id="cronicDeasesDetails"
            name="cronicDeasesDetails"
            value={formData.cronicDeasesDetails}
            onChange={handleChange}
            className="form-control"
            placeholder=""
          />
        </div>
      )}

<div className="isMouthAftha">
          <label className="form-label">
          {preferredLanguage === 'לשון זכר' 
                ? questions.find(q => q.field_name === "isMouthAftha_man")?.question_text || "שאלה לא זמינה"
                : questions.find(q => q.field_name === "isMouthAftha_woman")?.question_text || "שאלה לא זמינה"}
          </label>
          <div className="slider-container">
              <input
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  className="slider"
                  value={formData.isMouthAftha }
                  id="isMouthAftha"
                  name="isMouthAftha"
                  onChange={handleChange}
                  onClick={(e) => {
                    if (formData.isMouthAftha === 0) {
                        handleChange(e); // Ensure the first click registers
                    }
                }}
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
          <label htmlFor="wormsSuffer" className="form-label" >
            
          {questions.find(q => q.field_name === "wormsSuffer")?.question_text || "שאלה לא זמינה"}
      </label>
          <div className="form-check">
        <input
          type="radio"
          id="visitYes"
          name="wormsSuffer"
          value="כן"
          onChange={handleChange}
          checked={formData.wormsSuffer === "כן"}
          onClick={() => handleChange({ target: { name: "wormsSuffer", value: formData.wormsSuffer === "כן" ? "" :"כן" } })}

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
          onClick={() => handleChange({ target: { name: "wormsSuffer", value: formData.wormsSuffer === "לא" ? "" :"לא" } })}

        />
        <label htmlFor="visitNo">לא</label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          id="visitNotKnoen"
          name="wormsSuffer"
          value="לא יודע"
          onChange={handleChange}
          checked={formData.wormsSuffer === "לא יודע"}
          onClick={() => handleChange({ target: { name: "wormsSuffer", value: formData.wormsSuffer === "לא יודע" ? "" :"לא יודע" } })}

        />
        <label htmlFor="visitNo">
        {preferredLanguage === 'לשון זכר' 
                ? '  לא יודע' 
                : '  לא יודעת'}
            
          
         </label>
      </div>
      </div>

      <div className="form-group radio-preferred">
          <label htmlFor="otherInsectsSuffer" className="form-label" >
            
          {questions.find(q => q.field_name === "otherInsectsSuffer")?.question_text || "שאלה לא זמינה"}</label>
          <div className="form-check">
        <input
          type="radio"
          id="visitYes"
          name="otherInsectsSuffer"
          value="כן"
          onChange={handleChange}
          checked={formData.otherInsectsSuffer === "כן"}
          onClick={() => handleChange({ target: { name: "otherInsectsSuffer", value: formData.otherInsectsSuffer === "כן" ? "" :"כן" } })}

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
          onClick={() => handleChange({ target: { name: "otherInsectsSuffer", value: formData.otherInsectsSuffer === "לא" ? "" :"לא" } })}

        />
        <label htmlFor="visitNo">לא</label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          id="visitNotKnoen"
          name="otherInsectsSuffer"
          value="לא יודע"
          onChange={handleChange}
          checked={formData.otherInsectsSuffer === "לא יודע"}
          onClick={() => handleChange({ target: { name: "otherInsectsSuffer", value: formData.otherInsectsSuffer === "לא יודע" ? "" :"לא יודע" } })}

        />
        <label htmlFor="visitNo">        
          {preferredLanguage === 'לשון זכר' 
                ? 'לא יודע' 
                : 'לא יודעת'}
                </label>
      </div>
      </div>
      {formData.diagnosis.includes("קרוהן/קוליטיס") && (
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
                )}
{formData.diagnosis.includes("קרוהן/קוליטיס") && (
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
                )}

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
                  value={formData.selfConfidence}
                  onClick={(e) => {
                    if (formData.selfConfidence === 0) {
                        handleChange(e); // Ensure the first click registers
                    }
                }}

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
                  value={formData.socialLife }
                  onClick={(e) => {
                    if (formData.socialLife === 0) {
                        handleChange(e); // Ensure the first click registers
                    }
                }}
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
                  value={formData.mood }
                  onClick={(e) => {
                    if (formData.mood === 0) {
                        handleChange(e); // Ensure the first click registers
                    }
                }}
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
                  value={formData.workAfterIll }
                  onClick={(e) => {
                    if (formData.workAfterIll === 0) {
                        handleChange(e); // Ensure the first click registers
                    }
                }}
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
                  value={formData.relationship }
                  onClick={(e) => {
                    if (formData.relationship === 0) {
                        handleChange(e); // Ensure the first click registers
                    }
                }}
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
                  value={formData.parentsAttidude }
                  onClick={(e) => {
                    if (formData.parentsAttidude === 0) {
                        handleChange(e); // Ensure the first click registers
                    }
                }}
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
                  value={formData.outsideActivity }
                  onClick={(e) => {
                    if (formData.outsideActivity === 0) {
                        handleChange(e); // Ensure the first click registers
                    }
                }}
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
          האם המחלה השפיעה על ההערכה העצמית שלך?
          </label>
          <div className="slider-container">
              <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  className="slider"
                  id="selfEsteem"
                  value={formData.selfEsteem }
                  onClick={(e) => {
                    if (formData.selfEsteem === 0) {
                        handleChange(e); // Ensure the first click registers
                    }
                }}
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
      בחודש האחרון, מה מס' הפעמים שבריאותך הפיזית הקשתה עליך לבצע את עבודתך?
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
          בחודש האחרון מה מספר הפעמים בהם היה לך בעיות לבצע עבודתך בעקבות בריאותך הנפשית 
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
              <label htmlFor="isPshycologicalTreatment" className="form-label" >האם עברת בעבר או בהווה טיפול פסיכולוגי/רגשי? </label>
              <div className="form-check">
                  <input type="radio" name="isPshycologicalTreatment" value="כן" onChange={handleChange} 
                     checked={formData.isPshycologicalTreatment === "כן"}
                     onClick={() => handleChange({ target: { name: "isPshycologicalTreatment", value: formData.isPshycologicalTreatment === "כן" ? "" :"כן" } })}
           
                  /> כן
              </div>
              <div className="form-check">
                  <input type="radio" name="isPshycologicalTreatment" value="לא" onChange={handleChange}  
                     checked={formData.isPshycologicalTreatment === "לא"}
                     onClick={() => handleChange({ target: { name: "isPshycologicalTreatment", value: formData.isPshycologicalTreatment === "לא" ? "" :"לא" } })}
           
                  /> לא
              </div>
            </div>


        {formData.isPshycologicalTreatment === 'כן' && (
                      <div >
                      <label htmlFor="treatmentAge" className="form-label">באיזה גיל עברת טיפול פסיכולוגי/רגשי</label>
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
              <label htmlFor="treatmentReason" className="form-label">מה הייתה הסיבה לפניה לטיפול פסיכולוגי/רגשי</label>
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
              <label htmlFor="treatmentConnection" className="form-label">האם ראית קשר בין מצב המחלה לבין הטיפול הרגשי?</label>
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




                <div>
              <label htmlFor="extraDetails" className="form-label">משהו נוסף שמומלץ שנדע?</label>
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
              {preferredLanguage === 'לשון זכר' 
                ? '  אנא צרף בדיקת דם כללית מהשנה האחרונה - הבדיקות הנדרשות: ספירת דם, כימיה בדם' 
                : '   אנא צרפי בדיקת דם כללית מהשנה האחרונה - הבדיקות הנדרשות: ספירת דם, כימיה בדם'}
                
               
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

    <h3>
            {preferredLanguage === "לשון זכר" ? " שלח שאלון מס 3 מתוך 15" : " שלחי שאלון מס 4 מתוך 15"}

          </h3>
          <button type="submit" className="btn btn-primary">
            {preferredLanguage === "לשון זכר" ? "שלח" : "שלחי"}
          </button>

        </form>
      </div>
  );
};

export default MedicalForm;
