import React, { useState } from 'react';
import '../css/MyForm.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';

function WomanForm() {
      const location = useLocation();
      const { preferredLanguage ,idNumber} = location.state || {};
      const [questions, setQuestions] = useState([]); // Store questions from DB
    const [formData, setFormData] = useState({
        idNumber: location.state?.idNumber,
        preferredLanguage: location.state?.preferredLanguage || "",
        menstrualLength: '',
        painDuringMenstruation: '',
        contraceptiveUsing :'',
        selectedSymptoms :'',
        pmsSymptoms: "", // Yes/No selection for PMS symptoms
        additionalSymptoms: [], // Array to track selected symptoms
        customSymptom: "", // Text input for "Other - Specify"
        isGlulotInPast :'',
        isBikurKavua:'',
        preferredLanguage : preferredLanguage,
        childrenCount: '',
        usedContraceptives: '',
        contraceptiveType: '',
        contraceptiveAge: '',
        hormonalType: '',
        hormonalAge: '',
        hormonalProfile: '',
        setLastMenstrualPeriod :'',
        setHasMenstrualCycle : '',
        hasMenstrualCycle:'',
        lastMenstrualPeriod:'',
        menstrualPain:'',
        postpartumDepression : '',
        durationSlider : 0
    });


    useEffect(() => {
        axios.get("http://54.242.154.185:3002/test_questions_woman")
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


    const pmsSymptoms = [
        "דכאון",
        "עצבנות",
        "חרדה",
        "אקנה",
        "נדודי שינה",
        "עייפות",
        "עצירות",
        "כאבי פרקים",
        "כאבי שרירים",
        "כאבי בטן",
        "רגישות בשדיים",
        "תנודות בחשק המיני",
        "שינויים במצב הרוח",
        "אחר- פרטי",
    ];

    const [hasMenstrualCycle, setHasMenstrualCycle] = useState('');
    const [lastMenstrualPeriod, setLastMenstrualPeriod] = useState('');
    const [pregnancyStatus, setPregnancyStatus] = useState('');
    const [pregnancyCount, setPregnancyCount] = useState('');
    const [isGlulotInPast, setIsGlulotInPast] = useState('');
    const [isBikurKavua, setisBikurKavua] = useState('');
    const [numberOfChildren, setNumberOfChildren] = useState('');
    const [postpartumDepression, setPostpartumDepression] = useState({
        suffered: "",
        diagnosed: "",
        treated: "",
        treatmentMethod: "",
        stillTreated: ""
    });

    const [contraceptiveMethods, setContraceptiveMethods] = useState({
        using: '',
        type: '',
        ageStarted: '',
        hormonalDevice: '',
        nonHormonalDevice: '',
        ageDeviceStarted: ''
    });

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    

    const handleLastMenstrualPeriodChange = (e) => {
        const value = e.target.value;
        setLastMenstrualPeriod(value);
        setFormData((prevData) => ({
            ...prevData,
            lastMenstrualPeriod: value
        }));
    };
    const handlePregnancyChange = (e) => {
        const value = e.target.value;
        setPregnancyStatus(value);
        setFormData((prevData) => ({
            ...prevData,
            pregnancyStatus: value
        }));
    };

    const handlePregnancyCountChange = (e) => {
        const value = e.target.value;
        setPregnancyCount(value);
        setFormData((prevData) => ({
            ...prevData,
            pregnancyCount: value
        }));
    };

    const handleChildrenCountChange = (e) => {
        const value = e.target.value;
        setNumberOfChildren(value);
        setFormData((prevData) => ({
            ...prevData,
            childrenCount: value
        }));
    };

     // Handle Text Input for "Other - Specify"
  const handleCustomSymptomChange = (e) => {
    setFormData({ ...formData, customSymptom: e.target.value });
  };

    const handleGlulotInPastChange = (e) => {
        const value = e.target.value;
        setIsGlulotInPast(value);
        setFormData((prevData) => ({
            ...prevData,
            isGlulotInPast: value
        }));

    };

    const handleBikurKavua = (e) => {
        const value = e.target.value;
    
        // Update the isBikurKavua state
        setisBikurKavua(value);
    
        // Update the formData state with the value of 'isBikurKavua'
        setFormData((prevData) => ({
            ...prevData,
            isBikurKavua: value
        }));
    };
    


    const handlePostpartumDepressionChange = (field, value) => {
        setPostpartumDepression((prevState) => {
            const updatedDepression = { ...prevState, [field]: value };
    
            // Use functional update to ensure latest state is applied
            setFormData((prevData) => ({
                ...prevData,
                postpartumDepression: updatedDepression.suffered, // Match DB column
                diagnosedDepression: updatedDepression.diagnosed,
                treatedDepression: updatedDepression.treated,
                treatmentMethod: updatedDepression.treatmentMethod,
                stillTreated: updatedDepression.stillTreated
            }));
    
            return updatedDepression;
        });
    };

    const handleContraceptiveChange = (field, value) => {
        setContraceptiveMethods((prevState) => {
          const updatedMethods = { ...prevState, [field]: value };
      
          // Now update formData with the latest contraceptive data
          setFormData((prevData) => ({
            ...prevData,
            contraceptiveUsing: updatedMethods.using,
            contraceptiveType: updatedMethods.type,
            contraceptiveAgeStarted: updatedMethods.ageStarted,
            deviceAgeStarted: updatedMethods.ageDeviceStarted
          }));
      
          return updatedMethods; // Ensure state updates correctly
        });
      };
      
    

    
    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log("FormData before sending:", formData);
      
    
        try {
          const response = await fetch("http://54.242.154.185:3002/insert_woman", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
      
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
      
          const result = await response.json();
          localStorage.setItem('userData', JSON.stringify(result));
          console.log(result.message);  // Log success message
      
        } catch (error) {
          console.error("Error:", error.message);  // Handle errors
        }
        navigate("/personalform", { state: { preferredLanguage: formData.preferredLanguage ,idNumber : formData.idNumber} });
    };


    const handleRadioChange = (value) => {
        setFormData(prevData => {
          // If the value is already selected, reset the state
          const newValue = prevData.hasMenstrualCycle === value ? "" : value;
          
          return {
            ...prevData,
            hasMenstrualCycle: newValue,
          };
        });
      };
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        let updatedSymptoms = [...formData.additionalSymptoms];
    
        if (checked) {
          updatedSymptoms.push(value);
        } else {
          updatedSymptoms = updatedSymptoms.filter((symptom) => symptom !== value);
        }
    
        setFormData({ ...formData, additionalSymptoms: updatedSymptoms });
      };
    

    return (
        <div className="form-container">
            <h2 className="mb-4 text-center">Woman information form</h2>
            <form onSubmit={handlesubmit}>
                <div className="form-group">
                    <label className="form-label">
                    {questions.find(q => q.field_name === "menstrualLength")?.question_text || "שאלה לא זמינה"}
                        </label>
                    <input
                        type="number"
                        className="form-control"
                        name="menstrualLength"
                        value={formData.menstrualLength}
                        onChange={handleChange}                  
                        min="0" // Ensures only positive numbers are allowed
                    />
                </div>
                

                <div className="averageDuration">
    <label className="form-label">
        {questions.find(q => q.field_name === "durationSlider")?.question_text || "שאלה לא זמינה"}
    </label>
    <div className="slider-container">
        <input
            type="range"
            min="1"
            max="5"
            step="1"
            className="slider"
            id="durationSlider"
            name="durationSlider"
            value={formData.durationSlider || 0}  // Initial value is 0
            onChange={handleChange}
            onClick={(e) => {
                if (formData.durationSlider === 0) {
                    handleChange(e);  // Ensure the first click registers
                }
            }}
        />
        <div className="slider-labels">
            <span>לא נבחרה תשובה</span>
            <span>1-2</span>
            <span>3-4</span>
            <span>4-5</span>
            <span>שישה ימים ומעלה</span>
        </div>
    </div>
</div>

                <div className="form-group radio-preferred">
                    <label htmlFor="menstrualPain" className="form-label">
                    {preferredLanguage === 'לשון זכר' 
                ? ""
                : {questions.find(q => q.field_name === "menstrualPain")?.question_text || "שאלה לא זמינה"}}
                    
                    </label>
                    <div className="form-check">
                        <input 
                        type="radio" 
                        name="menstrualPain" 
                        value="כן" 
                        checked={formData.menstrualPain === "כן"}
                        onClick={() => handleChange({ target: { name: "menstrualPain", value: formData.menstrualPain === "כן" ? "" : "כן" } })}
                  
                        onChange={handleChange} />
                        <label htmlFor="menstrualPain">כן</label>
                    </div>
                    <div className="form-check">
                        <input 
                        type="radio" 
                        name="menstrualPain" 
                        value="לא" 
                        checked={formData.menstrualPain === "לא"}
                        onClick={() => handleChange({ target: { name: "menstrualPain", value: formData.menstrualPain === "לא" ? "" : "לא" } })}
                  
                        onChange={handleChange} 
                        />
                        <label htmlFor="menstrualPain">לא</label>
                    </div>
                </div>

                
                <div>
      {/* Yes/No Radio Selection for PMS Symptoms */}
      <div className="form-group radio-preferred">
        <label className="form-label">
        {questions.find(q => q.field_name === "pmsSymptoms")?.question_text || "שאלה לא זמינה"}
            </label>
        <div className="form-check">
          <input
            type="radio"
            name="pmsSymptoms"
            value="כן"
            onChange={handleChange}
            checked={formData.pmsSymptoms === "כן"}
            onClick={() => handleChange({ target: { name: "pmsSymptoms", value: formData.pmsSymptoms === "כן" ? "" : "כן" } })}

          />
          <label>כן</label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            name="pmsSymptoms"
            value="לא"
            onChange={handleChange}
            checked={formData.pmsSymptoms === "לא"}
            onClick={() => handleChange({ target: { name: "pmsSymptoms", value: formData.pmsSymptoms === "לא" ? "" : "לא" } })}
          />
          <label>לא</label>
        </div>
      </div>

      {/* Display Additional Symptoms if "Yes" is Selected */}
      {formData.pmsSymptoms === "כן" && (
        <div className="form-group radio-preferred">
          <label className="form-label">
          {questions.find(q => q.field_name === "additionalSymptoms")?.question_text || "שאלה לא זמינה"}
          </label>
          {[
            "דכאון",
            "עצבנות",
            "חרדה",
            "אקנה",
            "נדודי שינה",
            "עייפות",
            "עצירות",
            "כאבי פרקים",
            "כאבי שרירים",
            "כאבי בטן",
            "רגישות בשדיים",
            "תנודות בחשק המיני",
            "שינויים במצב הרוח",
            "אחר- פרטי",
          ].map((symptom, index) => (
            <div key={index} className="form-check">
              <input
                type="checkbox"
                name="additionalSymptoms"
                value={symptom}
                onChange={handleCheckboxChange}
                checked={formData.additionalSymptoms.includes(symptom)}
              />
              <label htmlFor={symptom}>{symptom}</label>
            </div>
          ))}

          {/* Show Text Input if "Other - Specify" is Selected */}
          {formData.additionalSymptoms.includes("אחר- פרטי") && (
            <div className="form-group">
              <label className="form-label">האם תוכלי להרחיב?</label>
              <input
                type="text"
                className="form-control"
                name="customSymptom"
                value={formData.customSymptom}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
      )}
    </div>
    <div className="form-group radio-preferred">
  <label htmlFor="hasMenstrualCycle" className="form-label">
    {questions.find(q => q.field_name === "hasMenstrualCycle")?.question_text || "שאלה לא זמינה"}
  </label>
  
  <div className="form-check">
    <input
      type="radio"
      name="hasMenstrualCycle"
      value="כן"
      onChange={handleChange}
      checked={formData.hasMenstrualCycle === "כן"}
      onClick={() => handleChange({ target: { name: "hasMenstrualCycle", value: formData.hasMenstrualCycle === "כן" ? "" : "כן" } })}

    /> כן
  </div>

  <div className="form-check">
    <input
      type="radio"
      name="hasMenstrualCycle"
      value="לא"
      onChange={handleChange}
      checked={formData.hasMenstrualCycle === "לא"}
      onClick={() => handleChange({ target: { name: "hasMenstrualCycle", value: formData.hasMenstrualCycle === "לא" ? "" : "לא" } })}
    /> לא
  </div>
</div>

{formData.hasMenstrualCycle === 'לא' && (
  <div className="form-group">
    <label className="form-label">
      {questions.find(q => q.field_name === "lastMenstrualPeriod")?.question_text || "שאלה לא זמינה"}
    </label>
    <input
      type="number"
      className="form-control"
      min="0"
      value={formData.lastMenstrualPeriod || ''}
      onChange={handleLastMenstrualPeriodChange}
    />
  </div>
)}


            <div className="form-group radio-preferred">
                <label htmlFor="pregnancyStatus" className="form-label">
                {questions.find(q => q.field_name === "pregnancyStatus")?.question_text || "שאלה לא זמינה"} 

                </label>
                <div className="form-check">
                    <input
                        type="radio"
                        name="pregnancyStatus"
                        value="כן"
                        onChange={handleChange}
                        checked={formData.pregnancyStatus === "כן"}
                        onClick={() => handleChange({ target: { name: "pregnancyStatus", value: formData.pregnancyStatus === "כן" ? "" : "כן" } })}

                        
                    /> כן
                </div>
                <div className="form-check">
                    <input
                        type="radio"
                        name="pregnancyStatus"
                        value="לא"
                        onChange={handleChange}
                        checked={formData.pregnancyStatus === "לא"}
                        onClick={() => handleChange({ target: { name: "pregnancyStatus", value: formData.pregnancyStatus === "לא" ? "" : "לא" } })}

                    /> לא
                </div>
            </div>

            {formData.pregnancyStatus === 'כן' && (
                <div className="form-group">
                    <label className="form-label">
                    {questions.find(q => q.field_name === "pregnancyCount")?.question_text || "שאלה לא זמינה"}  
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        value={pregnancyCount}
                        onChange={handlePregnancyCountChange}
                        min="0" // Ensures only non-negative numbers
                    />
                </div>
            )}

            {formData.pregnancyStatus === 'כן' && (
            <div className="form-group">
                <label className="form-label">
                {questions.find(q => q.field_name === "childrenCount")?.question_text || "שאלה לא זמינה"}  
                </label>
                <input
                    type="number"
                    className="form-control"
                    value={numberOfChildren}
                    onChange={handleChildrenCountChange}
                    min="0" // Ensures only non-negative numbers
                />
            </div>
             )}


            {formData.pregnancyStatus === 'כן' && (
            <div className="form-group radio-preferred">
                <label htmlFor="postpartumDepression" className="form-label">
                {questions.find(q => q.field_name === "postpartumDepression")?.question_text || "שאלה לא זמינה"}  
                </label>
                <div className="form-check">
                    <input
                        type="radio"
                        name="postpartumDepression"
                        value="כן"
                        onChange={(e) => handlePostpartumDepressionChange('suffered', e.target.value)}
                        checked={formData.postpartumDepression === "כן"}
                        onClick={() => handleChange({ target: { name: "postpartumDepression", value: formData.postpartumDepression === "כן" ? "" : "כן" } })}
                        
                    /> כן
                </div>
                <div className="form-check">
                    <input
                        type="radio"
                        name="postpartumDepression"
                        value="לא"
                        onChange={(e) => handlePostpartumDepressionChange('suffered', e.target.value)}
                        checked={formData.postpartumDepression === "לא"}
                        onClick={() => handleChange({ target: { name: "postpartumDepression", value: formData.postpartumDepression === "לא" ? "" : "לא" } })}


                    /> לא
                </div>
            </div>
             )}

            {postpartumDepression.suffered === 'כן' && (
                <>
                    <div className="form-group radio-preferred">
                        <label htmlFor="diagnosed" className="form-label">
                        {questions.find(q => q.field_name === "diagnosedDepression")?.question_text || "שאלה לא זמינה"}  
                        </label>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="diagnosed"
                                value="כן"
                                onChange={(e) => handlePostpartumDepressionChange('diagnosed', e.target.value)}
                                checked={formData.diagnosed === "כן"}
                                onClick={() => handleChange({ target: { name: "diagnosed", value: formData.diagnosed === "כן" ? "" : "כן" } })}
                            /> כן
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="diagnosed"
                                value="לא"
                                onChange={(e) => handlePostpartumDepressionChange('diagnosed', e.target.value)}
                                checked={formData.diagnosed === "לא"}
                                onClick={() => handleChange({ target: { name: "diagnosed", value: formData.diagnosed === "לא" ? "" : "לא" } })}
                            /> לא
                        </div>
                    </div>

                    <div className="form-group radio-preferred">
                        <label htmlFor="treated" className="form-label">
                        {questions.find(q => q.field_name === "treatedDepression")?.question_text || "שאלה לא זמינה"}  
                        </label>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="treated"
                                value="כן"
                                checked={formData.treated === "כן"}
                                onClick={() => handleChange({ target: { name: "treated", value: formData.treated === "כן" ? "" : "כן" } })}
                                onChange={(e) => handlePostpartumDepressionChange('treated', e.target.value)}
                            /> כן
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="treated"
                                value="לא"
                                onChange={(e) => handlePostpartumDepressionChange('treated', e.target.value)}
                                checked={formData.treated === "לא"}
                                onClick={() => handleChange({ target: { name: "treated", value: formData.treated === "לא" ? "" : "לא" } })}
                            /> לא
                        </div>
                    </div>

                    {postpartumDepression.treated === 'כן' && (
                        <div className="form-group">
                            <label className="form-label">
                            {questions.find(q => q.field_name === "treatmentMethod")?.question_text || "שאלה לא זמינה"}  
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={postpartumDepression.treatmentMethod || ''}
                                onChange={(e) => handlePostpartumDepressionChange('treatmentMethod', e.target.value)}
                            />
                        </div>
                    )}

                    {postpartumDepression.treated === 'כן' && (
                    <div className="form-group radio-preferred">
                        <label htmlFor="stillTreated" className="form-label">
                        {questions.find(q => q.field_name === "stillTreated")?.question_text || "שאלה לא זמינה"}  
                        </label>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="stillTreated"
                                checked={formData.stillTreated === "כן"}
                                onClick={() => handleChange({ target: { name: "stillTreated", value: formData.stillTreated === "כן" ? "" : "כן" } })}
  
                                value="כן"
                                onChange={(e) => handlePostpartumDepressionChange('stillTreated', e.target.value)}
                            /> כן
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="stillTreated"
                                checked={formData.stillTreated === "לא"}
                                onClick={() => handleChange({ target: { name: "stillTreated", value: formData.stillTreated === "לא" ? "" : "לא" } })}
                                value="לא"
                                onChange={(e) => handlePostpartumDepressionChange('stillTreated', e.target.value)}
                            /> לא
                        </div>
                    </div>
                    )}
                    </>
            )}

            <div className="form-group radio-preferred">
            <label htmlFor="treated" className="form-label">
            {questions.find(q => q.field_name === "contraceptiveUsing")?.question_text || "שאלה לא זמינה"}  
            </label>
            <div className="form-check">
    <input
      type="radio"
      name="contraceptiveUsing"
      checked={formData.contraceptiveUsing === "כן"} // Ensures that the button is checked based on the state
      onClick={() => handleContraceptiveChange("using", formData.contraceptiveUsing === "כן" ? "" : "כן")}
      value="כן"
    /> כן
  </div>
                <div className="form-check">
                    <input
                        type="radio"
                        name="contraceptiveUsing"
                        checked={formData.contraceptiveUsing === "לא"}
                        onClick={() => handleChange({ target: { name: "contraceptiveUsing", value: formData.contraceptiveUsing === "לא" ? "" : "לא" } })}

                        value="לא"
                        onChange={(e) => handleContraceptiveChange('using', e.target.value)}
                    /> לא
                </div>
            </div>

            {contraceptiveMethods.using === 'כן' && (
                <div className="form-group">
                    <label className="form-label">
                    {questions.find(q => q.field_name === "contraceptiveType")?.question_text || "שאלה לא זמינה"}  
                    </label>
                    <select
                        className="form-control"
                        value={contraceptiveMethods.type}
                        onChange={(e) => handleContraceptiveChange('type', e.target.value)}
                    >
                       <option value="">בחרי סוג</option>
                        <option value="גלולות">גלולות</option>
                        <option value="התקן הורמונלי">התקן הורמונלי</option>
                        <option value="התקן לא הורמונלי">התקן לא הורמונלי</option>
                        <option value="ימים בטוחים">ימים בטוחים</option>  
                        <option value="השיטה הטבעית למודעות לפוריות">השיטה הטבעית למודעות לפוריות</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
            )}

            {contraceptiveMethods.type === 'גלולות' && (
                <div className="form-group">
                    <label className="form-label">
                    {questions.find(q => q.field_name === "contraceptiveAgeStarted")?.question_text || "שאלה לא זמינה"}  
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        value={contraceptiveMethods.ageStarted}
                        onChange={(e) => handleContraceptiveChange('ageStarted', e.target.value)}
                        min="0" // Ensures only non-negative numbers
                    />
                </div>
            )}

{contraceptiveMethods.using === 'כן' && 
  (contraceptiveMethods.type === 'התקן הורמונלי' || contraceptiveMethods.type === 'התקן לא הורמונלי') && (
                <div className="form-group">
                    <label className="form-label">
                    {questions.find(q => q.field_name === "deviceAgeStarted")?.question_text || "שאלה לא זמינה"}  
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        value={contraceptiveMethods.ageDeviceStarted}
                        onChange={(e) => handleContraceptiveChange('ageDeviceStarted', e.target.value)}
                        min="0" // Ensures only non-negative numbers
                    />
                </div>
            )}

        <div className="form-group radio-preferred">
            <label htmlFor="isGlulotInPast" className="form-label">
            {questions.find(q => q.field_name === "isGlulotInPast")?.question_text || "שאלה לא זמינה"}  
            </label>
                <div className="form-check">
                <input
                            type="radio"
                            name="isGlulotInPast"
                            value="כן"
                            onChange={handleGlulotInPastChange}
                            checked={formData.isGlulotInPast === "כן"}
                            onClick={() => handleChange({ target: { name: "isGlulotInPast", value: formData.isGlulotInPast === "כן" ? "" : "כן" } })}
                            
                        /> כן
                </div>
                <div className="form-check">
                <input
                            type="radio"
                            name="isGlulotInPast"
                            value="לא"
                            checked={formData.isGlulotInPast === "לא"}
                            onClick={() => handleChange({ target: { name: "isGlulotInPast", value: formData.isGlulotInPast === "לא" ? "" : "לא" } })}
                            onChange={handleGlulotInPastChange}
                        /> לא
                </div>
            </div>

            {formData.isGlulotInPast === 'כן' && (
                <div className="form-group">
                    <label className="form-label">
                    {questions.find(q => q.field_name === "contraceptiveAgeStarted")?.question_text || "שאלה לא זמינה"}  
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        value={contraceptiveMethods.ageStarted}
                        onChange={(e) => handleContraceptiveChange('ageStarted', e.target.value)}
                        min="0" // Ensures only non-negative numbers
                    />
                </div>
            )}

<div className="form-group radio-preferred">
            <label htmlFor="isBikurKavua" className="form-label">
            {questions.find(q => q.field_name === "isBikurKavua")?.question_text || "שאלה לא זמינה"}  
            </label>
                <div className="form-check">
                <input
                            type="radio"
                            name="isBikurKavua"
                            value="כן"
                            onChange={handleBikurKavua}
                            checked={formData.isBikurKavua === "כן"}
                            onClick={() => handleChange({ target: { name: "isBikurKavua", value: formData.isBikurKavua === "כן" ? "" : "כן" } })}
                        /> כן
                </div>
                <div className="form-check">
                <input
                            type="radio"
                            name="isBikurKavua"
                            value="לא"
                            onChange={handleBikurKavua}
                            checked={formData.isBikurKavua === "לא"}
                            onClick={() => handleChange({ target: { name: "isBikurKavua", value: formData.isBikurKavua === "לא" ? "" : "לא" } })}
                        /> לא
                </div>
            </div>

            {formData.isBikurKavua === 'כן' && (
                <div className="form-group radio-preferred">
                    <label className="form-label">
                    {questions.find(q => q.field_name === "annualVisits")?.question_text || "שאלה לא זמינה"}  
            
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        name="annualVisits"
                        value={formData.annualVisits}
                        onChange={handleChange}
                        min="0"
                    />
                </div>
            )}

<div className="form-group radio-preferred">
    <label className="form-label">
    {questions.find(q => q.field_name === "breastSurgeonVisits")?.question_text || "שאלה לא זמינה"} 
        
    </label>
    <div className="form-check">
        <input type="radio" name="breastSurgeonVisits" value="כן" onChange={handleChange}
             checked={formData.breastSurgeonVisits === "כן"}
             onClick={() => handleChange({ target: { name: "breastSurgeonVisits", value: formData.breastSurgeonVisits === "כן" ? "" : "כן" } })}

         />
        <label>כן</label>
    </div>
    <div className="form-check">
        <input type="radio" name="breastSurgeonVisits" value="לא" onChange={handleChange} 
        
        checked={formData.breastSurgeonVisits === "לא"}
        onClick={() => handleChange({ target: { name: "breastSurgeonVisits", value: formData.breastSurgeonVisits === "לא" ? "" : "לא" } })}

        />
        <label>לא</label>
    </div>
    </div>

    {formData.breastSurgeonVisits === 'כן' && (
    <div className="form-group radio-preferred">
        <label className="form-label">
        {questions.find(q => q.field_name === "breastSurgeonVisitFrequency")?.question_text || "שאלה לא זמינה"} 
           </label>
        <select
            className="form-control"
            name="breastSurgeonVisitFrequency"
            value={formData.breastSurgeonVisitFrequency}
            onChange={handleChange}
        >
            <option value="">בחרי תדירות</option>
            <option value="אחת לשנתיים">אחת לשנתיים</option>
            <option value="אחת לשנה">אחת לשנה</option>
            <option value="אחת לחצי שנה">אחת לחצי שנה</option>
            <option value="אחת לשלושה חודשים">אחת לשלושה חודשים</option>
        </select>
    </div>
)}


<div className="form-group radio-preferred">
    <label className="form-label">
    {questions.find(q => q.field_name === "familyBreastOvarianCancer")?.question_text || "שאלה לא זמינה"} 
        
    </label>
    <div className="form-check">
        <input type="radio" name="familyBreastOvarianCancer" value="כן" onChange={handleChange}
           checked={formData.familyBreastOvarianCancer === "כן"}
           onClick={() => handleChange({ target: { name: "familyBreastOvarianCancer", value: formData.familyBreastOvarianCancer === "כן" ? "" : "כן" } })}

/>
        <label>כן</label>
    </div>
    <div className="form-check">
        <input type="radio" name="familyBreastOvarianCancer" value="לא" onChange={handleChange}
           checked={formData.familyBreastOvarianCancer === "לא"}
           onClick={() => handleChange({ target: { name: "familyBreastOvarianCancer", value: formData.familyBreastOvarianCancer === "לא" ? "" : "לא" } })}
    />
        <label>לא</label>
    </div>
</div>

<div className="form-group radio-preferred">
    <label className="form-label">
    {questions.find(q => q.field_name === "hormonalProfile")?.question_text || "שאלה לא זמינה"} 
        
        </label>
    <div className="form-check">
        <input type="radio" name="hormonalProfile" value="נבדק ונמצא תקין" onChange={handleChange}
        onClick={() => handleChange({ target: { name: "hormonalProfile", value: formData.hormonalProfile === "נבדק ונמצא תקין" ? "" : "נבדק ונמצא תקין" } })}
        checked={formData.hormonalProfile === "נבדק ונמצא תקין"}


        />
        <label>נבדק ונמצא תקין</label>
    </div>
    <div className="form-check">
        <input type="radio" name="hormonalProfile" value="נבדק ונמצא כי________" onChange={handleChange}
                onClick={() => handleChange({ target: { name: "hormonalProfile", value: formData.hormonalProfile === "נבדק ונמצא כי________" ? "" : "נבדק ונמצא כי________" } })}
                checked={formData.hormonalProfile === "נבדק ונמצא כי________"}

        />
        <label>:נבדק ונמצא כי</label>
        <input 
            type="text" 
            name="hormonalProfileDetails" 
            placeholder="הכניסי פרטים נוספים" 
            className="form-control" 
            onChange={handleChange} 
            disabled={!formData.hormonalProfile || formData.hormonalProfile !== 'נבדק ונמצא כי________'} 
            
        />
    </div>
    <div className="form-check">
        <input type="radio" name="hormonalProfile" value="לא נבדק" onChange={handleChange} 
        onClick={() => handleChange({ target: { name: "hormonalProfile", value: formData.hormonalProfile === "לא נבדק" ? "" : "לא נבדק" } })}
        checked={formData.hormonalProfile === "לא נבדק"}

        />
        <label>לא נבדק</label>
    </div>
</div>

<h3>שלח שאלון מס 2 מתוך 15</h3>
<button type="submit" className="btn btn-primary">שלחי
</button>


            </form>
        </div>
    );
}

export default WomanForm;
