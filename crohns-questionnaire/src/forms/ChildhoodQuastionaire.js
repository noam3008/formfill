import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MyForm.css';
import { useNavigate ,useLocation} from 'react-router-dom';
import { useEffect } from 'react';


const ChildhoodQuestionnaire = () => {
      const location = useLocation();
      const { preferredLanguage } = location.state || {};
    const [formData, setFormData] = useState({
        pregnancyRisk: '',
        birthType: '',
        preterm: '',
        feedingMethod: '',
        carfulOutsideFood : 0,
        sunExperience :0,
        teammateparents : 0,
        veryInvolveParents : 0,
        yellingParents : 0,
        tuffParents : 0,
        physicalPunishment : 0,
        cleaningExtra : 0 ,
        isNative: '',
        childhoodResidence: '',
        hospitalization: '',
        pets: '',
        childhoodIllnesses: '',
        hygieneAwareness: '',
        foodSafetyAwareness: '',
        sunExposureAwareness: '',
        strictness: '',
        parentingStyle: '',
        involvement: '',
        shouting: '',
        silence: '',
        punishment: '',
        warmth: '',
        physicalNeeds: '',
        emotionalNeeds: '',
        permissiveness: '',
        touch: '',
        envolveParents :0 ,
        silenceParent : 0,
        punishEducation : 0,
        tookCareMissingPhysical : 0,
        tookCareEverythin : 0,
        funParents : 0,
        parentsTouching : 0,
        activeParenting: '',
        physicalPunishment: 0,
        childhoodDescription: '',
        additionalComments: '',
        warmEducation : 0 ,
        medicineUsageFrequency :0
    });

     useEffect(() => {
        // Initialize formData with default or empty values when component mounts

        window.scrollTo(0,0)
      }, []);
      
      const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
          // Handle other fields
          setFormData((prevState) => ({
            
            ...prevState,
            [name]: value
            
        }));
        console.log(`Updated ${name} to ${value}`);
        
    };
    
    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
    
        setFormData((prevData) => {
            if (name === "childhoodDescription") {
                const updatedSelection = checked
                    ? [...(prevData.childhoodDescription || []), value] // Add the value
                    : prevData.childhoodDescription.filter((item) => item !== value); // Remove the value if unchecked
    
                return {
                    ...prevData,
                    [name]: updatedSelection, // Store selected options as an array
                };
            }
            return {
                ...prevData,
                [name]: value,
            };
        });
    };
    
    const handlesubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Here you can handle form submission, like sending data to an API
        navigate("/acequastionaire", { state: { preferredLanguage: formData.preferredLanguage,idNumber: formData.idNumber  } });
    };


  return (
    
    <div className="form-container">
            <h2>שאלון לידה וילדות מוקדמת</h2>
            <form onSubmit={handlesubmit}>

{/* Pregnancy and Birth Section */}
<div>
  <label className="form-label">
    {preferredLanguage === "לשון זכר"
      ? " האם ההריון שלך כעובר, היה בסיכון?"
      : " האם ההריון שלך כעובר, היה בסיכון?"}
  </label>
  <select name="pregnancyRisk" className="form-select" value={formData.pregnancyRisk || ""} onChange={handleChange}>
    <option disabled value="">
      {preferredLanguage === "לשון זכר" ? "בחר" : "בחרי"}
    </option>
    <option value="כן">כן</option>
    <option value="לא">לא</option>
    <option value="לא יודע">לא ידוע</option>
  </select>
</div>

<div>
  <label className="form-label">באיזה סוג לידה נולדת?</label>
  <select name="birthType" className="form-select" value={formData.birthType || ""} onChange={handleChange}>
    <option disabled value="">
      {preferredLanguage === "לשון זכר" ? "בחר" : "בחרי"}
    </option>
    <option value="רגילה (וגינלית)">רגילה (וגינלית)</option>
    <option value="מכשירנית">מכשירנית</option>
    <option value="קיסרית">קיסרית</option>
    <option value="לא יודע">לא ידוע</option>
  </select>
</div>

<div>
  <label className="form-label">
    {preferredLanguage === "לשון זכר" ? "האם נולדת פג?" : "האם נולדת פגה?"}
  </label>
  <select name="preterm" className="form-select" value={formData.preterm || ""} onChange={handleChange}>
    <option disabled value="">
      {preferredLanguage === "לשון זכר" ? "בחר" : "בחרי"}
    </option>
    <option value="כן">כן</option>
    <option value="לא">לא</option>
  </select>
</div>

<div>
  <label className="form-label">
    {preferredLanguage === "לשון זכר"
      ? "האם ינקת כתינוק או שניזונת מתחליפי חלב?"
      : "האם ינקת כתינוקת או שניזונת מתחליפי חלב?"}
  </label>
  <select name="feedingMethod" className="form-select" value={formData.feedingMethod || ""} onChange={handleChange}>
    <option disabled value="">
      {preferredLanguage === "לשון זכר" ? "בחר" : "בחרי"}
    </option>
    <option value="הנקה">הנקה</option>
    <option value="תחליפי חלב">תחליפי חלב</option>
    <option value="לא יודע">לא ידוע</option>
  </select>
</div>
<br />


                <div className="form-group radio radio-preferred">
                    <label className="form-label">
                        
                    {preferredLanguage === "לשון זכר"
          ? "   האם אתה יליד הארץ?"
          : "     האם את ילידת הארץ?"}
                     </label>
                    <div className="form-check-group">
                        <div className="form-check">
                            <input
                                type="radio"
                                name="nativeBorn"
                                value="Yes"
                                onChange={handleChange}
                                onClick={() => handleChange({ target: { name: "nativeBorn", value: formData.nativeBorn === "Yes" ? "" : "Yes" } })}
                                checked={formData.nativeBorn === "Yes"}
                            />
                            כן
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="nativeBorn"
                                value="No"
                                onChange={handleChange}
                                onClick={() => handleChange({ target: { name: "nativeBorn", value: formData.nativeBorn === "No" ? "" : "No" } })}
                                checked={formData.nativeBorn === "No"}
                            />
                            לא
                        </div>
                    </div>

                    {formData.nativeBorn === "No" && (
                        <div className="conditional-inputs">
                            <div className="form-group">
                                <label className="form-label">באיזה גיל עלית</label>
                                <input
                                    type="number"
                                    min = "0"
                                    name="immigrationAge"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">מהיכן</label>
                                <input
                                    type="text"
                                    name="immigrationOrigin"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    )}
                </div>


                <div >
                    <label className="form-label radio-preferred">היכן גרת בילדותך (עד גיל 12)?</label>
                    <select name="childhoodResidence" className="form-select" onChange={handleChange}>
                        <option value="" disabled>בחר</option>
                        <option value="בעיר">בעיר</option>
                        <option value="מושב">מושב</option>
                        <option value="כפר">כפר</option>
                        <option value="בקיבוץ">בקיבוץ</option>
                    </select>
                </div>
                <br></br>

                {/* Hospitalization Information */}
                <div className="form-group radio-preferred">
                <label htmlFor="hospitalization" className="form-label">
                    האם עברת אישפוז בילדות (עד גיל 18)?
                </label>
                <div className="form-check">
                    <input
                    type="radio"
                    name="hospitalization"
                    value="כן"
                    onChange={handleChange}
                    onClick={() => handleChange({ target: { name: "hospitalization", value: formData.hospitalization === "כן" ? "" : "כן" } })}
                    checked={formData.hospitalization === "כן"}
                    />{" "}
                    כן
                </div>
                <div className="form-check">
                    <input
                    type="radio"
                    name="hospitalization"
                    value="לא"
                    onChange={handleChange}
                    onClick={() => handleChange({ target: { name: "hospitalization", value: formData.hospitalization === "לא" ? "" : "לא" } })}
                    checked={formData.hospitalization === "לא"}
                    />{" "}
                    לא
                </div>
                </div>

                {/* Follow-up questions for Hospitalization */}
                {formData.hospitalization === "כן" && (
                <div>
                    <label htmlFor="hospitalizationReason" className="form-label">
                    
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="hospitalizationReason"
                    name="hospitalizationReason"
                    placeholder="מדוע?"
                    value={formData.hospitalizationReason || ""}
                    onChange={handleChange}
                    />
                    <input
                    type="number"
                    className="form-control mt-2"
                    id="hospitalizationAge"
                    name="hospitalizationAge"
                    placeholder="באיזה גיל?"
                    min = "0"
                    value={formData.hospitalizationAge || ""}
                    onChange={handleChange}
                    />
                </div>
                )}

                <br></br>

                {/* Pets Information */}
                <div className="form-group radio-preferred">
                <label htmlFor="pets" className="form-label">
                    האם  בילדותך היו לך בבית חיות מחמד?
                </label>
                <div className="form-check">
                    <input
                    type="radio"
                    name="pets"
                    value="כן"
                    onChange={handleChange}
                    onClick={() => handleChange({ target: { name: "pets", value: formData.pets === "כן" ? "" : "כן" } })}
                    checked={formData.pets === "כן"}
                    />{" "}
                    כן
                </div>
                <div className="form-check">
                    <input
                    type="radio"
                    name="pets"
                    value="לא"
                    onChange={handleChange}
                    onClick={() => handleChange({ target: { name: "pets", value: formData.pets === "לא" ? "" : "לא" } })}
                    checked={formData.pets === "לא"}
                    />{" "}
                    לא
                </div>
                </div>

                {/* Follow-up questions for Pets */}
                {formData.pets === "כן" && (
                <div>
                    <label htmlFor="petTypes" className="form-label">
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="petTypes"
                    name="petTypes"
                    placeholder="אילו חיות?"
                    value={formData.petTypes || ""}
                    onChange={handleChange}
                    />
                    <label htmlFor="petAges" className="form-label mt-2">
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="petAges"
                    name="petAges"
                    placeholder="באילו גילאים?"
                    value={formData.petAges || ""}
                    onChange={handleChange}
                    />
                </div>
                )}


                <br></br>

                <div className="form-group radio-preferred">
                    <label className="form-label">
                        באיזו תדירות נעשה שימוש בביתך ב: דיו לחתכים, תרופות להורדת חום קל, תרופות להקלה על כאבים
                    </label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            id="medicineUsageFrequency"
                            name="medicineUsageFrequency"
                            value={formData.medicineUsageFrequency } 
                            onClick={(e) => {
                                if (formData.medicineUsageFrequency === 0) {
                                    handleChange(e); // Ensure the first click registers
                                }
                            }}
                            
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

                {/* Childhood Illnesses Information */}
                <div className="form-group radio-preferred">
                <label htmlFor="childhoodIllnesses" className="form-label">
                    האם חלית במחלות ילדות כלשהן?
                </label>
                <div className="form-check">
                    <input
                    type="radio"
                    name="childhoodIllnesses"
                    value="כן"
                    onChange={handleChange}
                    onClick={() => handleChange({ target: { name: "childhoodIllnesses", value: formData.childhoodIllnesses === "כן" ? "" : "כן" } })}
                    checked={formData.childhoodIllnesses === "כן"}
                    />{" "}
                    כן
                </div>
                <div className="form-check">
                    <input
                    type="radio"
                    name="childhoodIllnesses"
                    value="לא"
                    onChange={handleChange}
                    onClick={() => handleChange({ target: { name: "childhoodIllnesses", value: formData.childhoodIllnesses === "לא" ? "" : "לא" } })}
                    checked={formData.childhoodIllnesses === "לא"}
                    />{" "}
                    לא
                </div>
                </div>

                {/* Follow-up questions for Childhood Illnesses */}
                {formData.childhoodIllnesses === "כן" && (
                <div>
                    <label htmlFor="illnessDetails" className="form-label">
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="illnessDetails"
                    name="illnessDetails"
                    placeholder="פרט את מחלות הילדות"
                    value={formData.illnessDetails || ""}
                    onChange={handleChange}
                    />
                </div>
                )}
                <br></br>
                <h6> ?דרג באיזה מידה היתה הקפדה בביתך בילדותך על הדברים הבאים </h6>
               
                <div className="form-group radio-preferred">
                    <label className="form-label">ניקיון והגיינה בבית</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            value={formData.cleaningExtra}
                            onClick={(e) => {
                                if (formData.cleaningExtra === 0) {
                                    handleChange(e); // Ensure the first click registers
                                }
                            }}
                            id="cleaningExtra"
                            name="cleaningExtra"
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
                    <label className="form-label">זהירות מפני מזון מלוכלך או מזוהם בחוץ</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            id="carfulOutsideFood"
                            value={formData.carfulOutsideFood}
                            name="carfulOutsideFood"
                            onChange={handleChange}
                            onClick={(e) => {
                                if (formData.carfulOutsideFood === 0) {
                                    handleChange(e); // Ensure the first click registers
                                }
                            }}
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

                <div className="medicine-usage-container">
                    <label className="form-label">זהירות מפני חשיפה מוגזמת לשמש</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            id="sunExperience"
                            name="sunExperience"
                            value={formData.sunExperience}
                            onChange={handleChange}
                            onClick={(e) => {
                                if (formData.sunExperience === 0) {
                                    handleChange(e); // Ensure the first click registers
                                }
                            }}
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

                <h6>
                 ציינו את ההיגדים שיתארו את סוג החינוך שלכם
                </h6>

                <div className="medicine-usage-container">
                    <label className="form-label">האם אחד מהוריך או שניהם היו נוקשים</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            id="tuffParents"
                            value={formData.tuffParents}
                            name="tuffParents"
                            onChange={handleChange}
                            onClick={(e) => {
                                if (formData.tuffParents === 0) {
                                    handleChange(e); // Ensure the first click registers
                                }
                            }}
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

                <div className="medicine-usage-container">
                    <label className="form-label">החינוך בבית נוהל ע"י ההורים כצוות</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            value={formData.teammateparents}
                            id="teammateparents"
                            name="teammateparents"
                            onChange={handleChange}
                            onClick={(e) => {
                                if (formData.teammateparents === 0) {
                                    handleChange(e); // Ensure the first click registers
                                }
                            }}
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

                <div className="medicine-usage-container">
                    <label className="form-label"> אחד מהוריך או שניהם היו מאד מעורבים בהתנהלות הילדים</label>
                                        <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            value={formData.veryInvolveParents}
                            id="veryInvolveParents"
                            name="veryInvolveParents"
                            onChange={handleChange}
                            onClick={(e) => {
                                if (formData.veryInvolveParents === 0) {
                                    handleChange(e); // Ensure the first click registers
                                }
                            }}
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

                <div className="medicine-usage-container">
                    <label className="form-label">החינוך בבית כלל צעקות</label>
                                       <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            value={formData.yellingParents}
                            id="yellingParents"
                            name="yellingParents"
                            onChange={handleChange}
                            onClick={(e) => {
                                if (formData.yellingParents === 0) {
                                    handleChange(e); // Ensure the first click registers
                                }
                            }}
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


                <div className="medicine-usage-container">
                    <label className="form-label">החינוך בבית כלל שתיקות</label>
                                        <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            value={formData.silenceParent}
                            id="silenceParent"
                            name="silenceParent"
                            onChange={handleChange}
                            onClick={(e) => {
                                if (formData.silenceParent === 0) {
                                    handleChange(e); // Ensure the first click registers
                                }
                            }}
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

                <div className="medicine-usage-container">
                    <label className="form-label">החינוך בבית כלל עונשים</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            value={formData.punishEducation}
                            id="punishEducation"
                            name="punishEducation"
                            onChange={handleChange}
                            onClick={(e) => {
                                if (formData.punishEducation === 0) {
                                    handleChange(e); // Ensure the first click registers
                                }
                            }}
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

                <div className="medicine-usage-container">
                    <label className="form-label">החינוך בבית היה חם</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            value={formData.warmEducation}
                            id="warmEducation"
                            name="warmEducation"
                            onChange={handleChange}
                            onClick={(e) => {
                                if (formData.warmEducation === 0) {
                                    handleChange(e); // Ensure the first click registers
                                }
                            }}
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

                <div className="medicine-usage-container">
                    <label className="form-label">האם אחד מהוריך או שניהם דאגו לכל מחסור פיזי</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            value={formData.tookCareMissingPhysical}
                            id="tookCareMissingPhysical"
                            name="tookCareMissingPhysical"
                            onChange={handleChange}
                            onClick={(e) => {
                                if (formData.tookCareMissingPhysical === 0) {
                                    handleChange(e); // Ensure the first click registers
                                }
                            }}
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

                <div className="medicine-usage-container">
                    <label className="form-label">האם אחד מהוריך או שניהם דאגו לכל מחסור רגשי</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            value={formData.tookCareEverythin}
                            id="tookCareEverythin"
                            name="tookCareEverythin"
                            onChange={handleChange}
                            onClick={(e) => {
                                if (formData.tookCareEverythin === 0) {
                                    handleChange(e); // Ensure the first click registers
                                }
                            }}
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

                <div className="medicine-usage-container">
                    <label className="form-label">האם אחד מהוריך או שניהם היו מתירניים</label>
                    <div className="slider-container"> 
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            value={formData.funParents}
                            id="funParents"
                            name="funParents"
                            onChange={handleChange}
                            onClick={(e) => {
                                if (formData.funParents === 0) {
                                    handleChange(e); // Ensure the first click registers
                                }
                            }}
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

                <div className="medicine-usage-container">
                    <label className="form-label">האם אחד מהוריך או שניהם הרבו במגע עם הילדים</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            value={formData.parentsTouching}
                            id="parentsTouching"
                            name="parentsTouching"
                            onChange={handleChange}
                            onClick={(e) => {
                                if (formData.parentsTouching === 0) {
                                    handleChange(e); // Ensure the first click registers
                                }
                            }}
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

                <div className="medicine-usage-container">
                    <label className="form-label">החינוך בבית היה מעורב ופעיל</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            value={formData.envolveParents}
                            id="envolveParents"
                            name="envolveParents"
                            onChange={handleChange}
                            onClick={(e) => {
                                if (formData.envolveParents === 0) {
                                    handleChange(e); // Ensure the first click registers
                                }
                            }}
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

                <div className="medicine-usage-container">
                    <label className="form-label">החינוך כלל ענישה פיזית</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            value={formData.physicalPunishment}
                            id="physicalPunishment"
                            name="physicalPunishment"
                            onChange={handleChange}
                            onClick={(e) => {
                                if (formData.physicalPunishment === 0) {
                                    handleChange(e); // Ensure the first click registers
                                }
                            }}
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

                {/* Childhood Description Section (Checkboxes) */}
                <h5>בחר במשפטים שיתארו באופן מדוייק יותר את ילדותך</h5>

                <div className="checkbox-group">
                    <label className="form-label">
                        בילדותי ביליתי הרבה במשחקים בבית
                    </label>
                    <input
                        type="checkbox"
                        name="childhoodDescription"
                        value="בילדותי ביליתי הרבה במשחקים בבית"
                        onChange={handleCheckboxChange}
                        checked={formData.childhoodDescription?.includes("בילדותי ביליתי הרבה במשחקים בבית")}
                    />
                </div>

                <div className="checkbox-group">
                    <label className="form-label">
                        בילדותי ביליתי הרבה בקריאה בבית
                    </label>
                    <input
                        type="checkbox"
                        name="childhoodDescription"
                        value="בילדותי ביליתי הרבה בקריאה בבית"
                        onChange={handleCheckboxChange}
                        checked={formData.childhoodDescription?.includes("בילדותי ביליתי הרבה בקריאה בבית")}
                    />
                </div>

                <div className="checkbox-group">
                    <label className="form-label">
                        בילדותי צפיתי שעות רבות בטלויזיה
                    </label>
                    <input
                        type="checkbox"
                        name="childhoodDescription"
                        value="בילדותי צפיתי שעות רבות בטלויזיה"
                        onChange={handleCheckboxChange}
                        checked={formData.childhoodDescription?.includes("בילדותי צפיתי שעות רבות בטלויזיה")}
                    />
                </div>

                <div className="checkbox-group">
                    <label className="form-label">
                        בילדותי את רב הזמן הפנוי ביליתי במשחק בחוץ
                    </label>
                    <input
                        type="checkbox"
                        name="childhoodDescription"
                        value="בילדותי את רב הזמן הפנוי ביליתי במשחק בחוץ"
                        onChange={handleCheckboxChange}
                        checked={formData.childhoodDescription?.includes("בילדותי את רב הזמן הפנוי ביליתי במשחק בחוץ")}
                    />
                </div>

                <div className="form-group radio-preferred">
  <label htmlFor="remissionExperience" className="form-label">
    האם אי פעם חווית הפוגה/ רמיסיה של המחלה?
  </label>

  <div className="form-check">
    <input
      type="radio"
      id="yes"
      name="remissionExperience"
      value="כן"
      onChange={handleChange}
      checked={formData.remissionExperience === "כן"}
      onClick={() => handleChange({ target: { name: "remissionExperience", value: formData.remissionExperience === "כן" ? "" : "כן" } })}
    />
    <label htmlFor="yes">כן</label>
  </div>

  <div className="form-check">
    <input
      type="radio"
      id="no"
      name="remissionExperience"
      value="לא"
      onChange={handleChange}
      checked={formData.remissionExperience === "לא"}
      onClick={() => handleChange({ target: { name: "remissionExperience", value: formData.remissionExperience === "לא" ? "" : "לא" } })}
    />
    <label htmlFor="no">לא</label>
  </div>

  {formData.remissionExperience === 'כן' && (
  <>
    <label className="form-label">
      {preferredLanguage === "לשון זכר"
        ? "האם אתה יכול להצביע על סימנים מקדימים המופיעים לפני התפרצות חוזרת של המחלה/ התקף? או סימנים שמעידים עבורך על התפרצות קרבה?"
        : "האם את יכולה להצביע על סימנים מקדימים המופיעים לפני התפרצות חוזרת של המחלה/ התקף? או סימנים שמעידים עבורך על התפרצות קרבה?"}
    </label>

    {[
      "תחושת חרדה", "שינויים בראיה", "שינויים בחוש הריח", "שינויים במצב הרוח", "חום",
      "כאבי/ מיחושי ראש", "כאבי/ מיחושי בטן", "כאבי שרירים", "קשיי שינה/ הרדמות",
      "היפראקטיביות/ פעלתנות אינטנסיבית", "בחילה", "צרבת", "עייפות", "תחושת מועקה",
      "אחר- פרט.י", "לא ידוע"
    ].map((symptom) => (
      <div className="form-check" key={symptom}>
        <input
          type="checkbox"
          id={symptom}
          name="symptoms"
          value={symptom}
          onChange={(e) => {
            const { checked, value } = e.target;
            handleChange({
              target: {
                name: "symptoms",
                value: checked
                  ? [...(formData.symptoms || []), value]
                  : (formData.symptoms || []).filter(s => s !== value),
              },
            });
          }}
          checked={formData.symptoms?.includes(symptom)}
        />
        <label htmlFor={symptom}>{symptom}</label>
      </div>
    ))}
  </>
)}

</div>
<div className="form-group smell-preference">
  <label htmlFor="smellPreference" className="form-label">
    {preferredLanguage === "לשון זכר"
      ? "ציין לגבי כל אחד מהריחות הבאים אם אתה אוהב / לא אוהב  / אדיש"
      : "צייני לגבי כל אחד מהריחות הבאים אם את אוהבת / לא אוהבת / אדישה"}
  </label>

  {[
    "דלק/ בנזין/ סולר",
    "גויאבה",
    "קלמנטינה",
    "דגים",
    "קולורבי",
    "בצל",
    "שום",
    "טיגון",
    "קפה טחון או מבושל",
    "אוכל מבושל",
    "עשן עצים /קמין",
    "סיגריות/ עשן טבק",
    "פריחה של עצים/ פרחים מסוימים",
    "עובש/ לחות",
    ".ניחוחות כביסה וחומרי ניקוי – מרככי כביסה, סבונים ודטרגנטים ריחניים",
    ".חומרי חיטוי וכימיקלים – כלור/ אקונומיקה/ אמוניה /אלכוהול לחיטוי",
    "צבע טרי ולכות – חומרים מכילי ממיסים נדיפים",
    "בשמים ומוצרי טיפוח – כולל דאודורנטים, קרמים, ספריי לשיער"
  ].map((smell) => (
    <div className="form-group radio-preferred option-spacing" key={smell}>
      <label className="smell-label">{smell}</label>
      <div className="radio-options">
        <div className="radio-option">
          <input
            type="radio"
            id={`${smell}-like`}
            name={smell}
            value="אוהב"
            onChange={handleChange}
            checked={formData[smell] === "אוהב"}
          />
          <label htmlFor={`${smell}-like`}>
            {preferredLanguage === "לשון זכר" ? "אוהב" : "אוהבת"}
          </label>
        </div>

        <div className="radio-option">
          <input
            type="radio"
            id={`${smell}-dislike`}
            name={smell}
            value="לא אוהב"
            onChange={handleChange}
            checked={formData[smell] === "לא אוהב"}
          />
          <label htmlFor={`${smell}-dislike`}>
            {preferredLanguage === "לשון זכר" ? "לא אוהב" : "לא אוהבת"}
          </label>
        </div>

        <div className="radio-option">
          <input
            type="radio"
            id={`${smell}-indifferent`}
            name={smell}
            value="אדיש"
            onChange={handleChange}
            checked={formData[smell] === "אדיש"}
          />
          <label htmlFor={`${smell}-indifferent`}>
            {preferredLanguage === "לשון זכר" ? "אדיש" : "אדישה"}
          </label>
        </div>
      </div>
    </div>
  ))}
</div>





                {/* Additional Comments Section */}
                <div >
                    <label className="form-label">
                        
                    {preferredLanguage === "לשון זכר"
          ? "  משהו נוסף שתרצה שנדע?"
          : "   משהו נוסף שתרצי שנדע?"}
                      </label>
                    <textarea name="additionalComments" className="form-control" value={formData.additionalComments} onChange={handleChange}></textarea>
                </div>

                <h4>
            {preferredLanguage === "לשון זכר" ? " שלח שאלון מספר 10 מתוך 15" : " שלחי שאלון מספר 11 מתוך 15"}

          </h4>
          <button type="submit" className="btn btn-primary">
            {preferredLanguage === "לשון זכר" ? "שלח" : "שלחי"}
          </button>

            </form>
        </div>
    );
};


export default ChildhoodQuestionnaire;
