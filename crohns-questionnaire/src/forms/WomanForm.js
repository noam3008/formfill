import React, { useState } from 'react';
import '../css/MyForm.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";

function App() {
      const location = useLocation();
      const { preferredLanguage } = location.state || {};
    const [formData, setFormData] = useState({
        menstrualLength: '',
        painDuringMenstruation: '',
        selectedSymptoms :'',
        pmsSymptoms: "", // Yes/No selection for PMS symptoms
        additionalSymptoms: [], // Array to track selected symptoms
        customSymptom: "", // Text input for "Other - Specify"
        isGlulotInPast :'',
        isBikurKavua:'',
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
        id_number :'',
        durationSlider : 0
    });

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page when the component mounts
  }, []); // Empty dependency array to ensure it runs only once when the component mounts



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
        suffered: '',
        diagnosed: '',
        treated: '',
        stillTreated: ''
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
        setFormData({ ...formData, [name]: value });
    };

    const handleLastMenstrualPeriodChange = (e) => {
        setLastMenstrualPeriod(e.target.value);
    };
    const handlePregnancyChange = (e) => {
        setPregnancyStatus(e.target.value);
    };

    const handlePregnancyCountChange = (e) => {
        setPregnancyCount(e.target.value);
    };

    const handleChildrenCountChange = (e) => {
        setNumberOfChildren(e.target.value);
    };

     // Handle Text Input for "Other - Specify"
  const handleCustomSymptomChange = (e) => {
    setFormData({ ...formData, customSymptom: e.target.value });
  };

    const handleGlulotInPastChange = (e) => {
        setIsGlulotInPast(e.target.value);
    };

    const handleBikurKavua = (e) => {
        setisBikurKavua(e.target.value);
    };


    const handlePostpartumDepressionChange = (field, value) => {
        setPostpartumDepression((prevState) => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleContraceptiveChange = (field, value) => {
        setContraceptiveMethods((prevState) => ({
            ...prevState,
            [field]: value
        }));
    };

    


    const handlesubmit = (e) => {
        e.preventDefault();
        navigate("/personalform", { state: { preferredLanguage: formData.preferredLanguage } });
        // You can add an API call here
    };

    const handleRadioChange = (e) => {
        setHasMenstrualCycle(e.target.value);
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
                    <label className="form-label">גיל הופעת וסת ראשונה </label>
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
                        מה אורך וסת הממוצע שלך בימים?
                    </label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="4"
                            step="1"
                            className="slider"
                            id="durationSlider"
                            name="durationSlider"
                            value={formData.durationSlider}
                            onChange={handleChange}
                            onClick={(e) => {
                                if (formData.durationSlider === 0) {
                                    handleChange(e); // Ensure the first click registers
                                }
                            }}
                        />
                        <div className="slider-labels">
                            <span>1-2</span>
                            <span>3-4</span>
                            <span>4-5</span>
                            <span>שישה ימים ומעלה</span>
                        </div>
                    </div>
                </div>

                <div className="form-group radio-preferred">
                    <label htmlFor="menstrualPain" className="form-label">
                        האם את סובלת מכאבים בזמן מחזור?
                    </label>
                    <div className="form-check">
                        <input type="radio" name="menstrualPain" value="כן" onChange={handleChange} />
                        <label htmlFor="menstrualPain">כן</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" name="menstrualPain" value="לא" onChange={handleChange} />
                        <label htmlFor="menstrualPain">לא</label>
                    </div>
                </div>

                
                <div>
      {/* Yes/No Radio Selection for PMS Symptoms */}
      <div className="form-group radio-preferred">
        <label className="form-label">האם את חווה תסמיני תסמונת קדם וסתית (PMS)?</label>
        <div className="form-check">
          <input
            type="radio"
            name="pmsSymptoms"
            value="כן"
            onChange={handleChange}
            checked={formData.pmsSymptoms === "כן"}
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
          />
          <label>לא</label>
        </div>
      </div>

      {/* Display Additional Symptoms if "Yes" is Selected */}
      {formData.pmsSymptoms === "כן" && (
        <div className="form-group radio-preferred">
          <label className="form-label">
            אילו תסמינים נוספים חווים בקשר לתסמונת קדם וסתית PMS?
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
                onChange={handleCustomSymptomChange}
              />
            </div>
          )}
        </div>
      )}
    </div>

            
            <div className="form-group radio-preferred">
            <label htmlFor="additionalSymptoms" className="form-label">           
                האם קיבלת מחזור בשנה האחרונה?                    
            </label>
                <div className="form-check">
                    <input
                        type="radio"
                        name="hasMenstrualCycle"
                        value="כן"
                        onChange={handleRadioChange}
                    /> כן
                </div>
                <div className="form-check">
                    <input
                        type="radio"
                        name="hasMenstrualCycle"
                        value="לא"
                        onChange={handleRadioChange}
                    /> לא
                </div>
            </div>

            {hasMenstrualCycle === 'לא' && (
                <div className="form-group">
                    <label className="form-label">
                        מתי הייתה גיל הופעת הוסת האחרונה שלך?
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        min = "0"
                        value={lastMenstrualPeriod}
                        onChange={handleLastMenstrualPeriodChange}
                    />
                </div>
            )}


            <div className="form-group radio-preferred">
                <label htmlFor="pregnancyStatus" className="form-label">
                    האם היית בהריון?
                </label>
                <div className="form-check">
                    <input
                        type="radio"
                        name="pregnancyStatus"
                        value="כן"
                        onChange={handlePregnancyChange}
                    /> כן
                </div>
                <div className="form-check">
                    <input
                        type="radio"
                        name="pregnancyStatus"
                        value="לא"
                        onChange={handlePregnancyChange}
                    /> לא
                </div>
            </div>

            {pregnancyStatus === 'כן' && (
                <div className="form-group">
                    <label className="form-label">
                        צייני את מספר ההריונות שלך:
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

            {pregnancyStatus === 'כן' && (
            <div className="form-group">
                <label className="form-label">
                    צייני את מספר הילדים שלך:
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


            {pregnancyStatus === 'כן' && (
            <div className="form-group radio-preferred">
                <label htmlFor="postpartumDepression" className="form-label">
                    האם סבלת מדכאון אחרי לידה?
                </label>
                <div className="form-check">
                    <input
                        type="radio"
                        name="postpartumDepression"
                        value="כן"
                        onChange={(e) => handlePostpartumDepressionChange('suffered', e.target.value)}
                    /> כן
                </div>
                <div className="form-check">
                    <input
                        type="radio"
                        name="postpartumDepression"
                        value="לא"
                        onChange={(e) => handlePostpartumDepressionChange('suffered', e.target.value)}
                    /> לא
                </div>
            </div>
             )}

            {postpartumDepression.suffered === 'כן' && (
                <>
                    <div className="form-group radio-preferred">
                        <label htmlFor="diagnosed" className="form-label">
                            האם אובחנת?
                        </label>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="diagnosed"
                                value="כן"
                                onChange={(e) => handlePostpartumDepressionChange('diagnosed', e.target.value)}
                            /> כן
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="diagnosed"
                                value="לא"
                                onChange={(e) => handlePostpartumDepressionChange('diagnosed', e.target.value)}
                            /> לא
                        </div>
                    </div>

                    <div className="form-group radio-preferred">
                        <label htmlFor="treated" className="form-label">
                            האם טופלת?
                        </label>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="treated"
                                value="כן"
                                onChange={(e) => handlePostpartumDepressionChange('treated', e.target.value)}
                            /> כן
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="treated"
                                value="לא"
                                onChange={(e) => handlePostpartumDepressionChange('treated', e.target.value)}
                            /> לא
                        </div>
                    </div>

                    {postpartumDepression.treated === 'כן' && (
                        <div className="form-group">
                            <label className="form-label">
                                כיצד טופלת?
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
                            האם את עדיין מטופלת?
                        </label>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="stillTreated"
                                value="כן"
                                onChange={(e) => handlePostpartumDepressionChange('stillTreated', e.target.value)}
                            /> כן
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="stillTreated"
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
                האם את משתמשת באמצעי מניעה?
            </label>
                <div className="form-check">
                    <input
                        type="radio"
                        name="contraceptiveUsing"
                        value="כן"
                        onChange={(e) => handleContraceptiveChange('using', e.target.value)}
                    /> כן
                </div>
                <div className="form-check">
                    <input
                        type="radio"
                        name="contraceptiveUsing"
                        value="לא"
                        onChange={(e) => handleContraceptiveChange('using', e.target.value)}
                    /> לא
                </div>
            </div>

            {contraceptiveMethods.using === 'כן' && (
                <div className="form-group">
                    <label className="form-label">
                        איזה סוג אמצעי מניעה את משתמשת?
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
                        <option value="התקן הורמונלי">ימים בטוחים</option>
                        <option value="התקן לא הורמונלי">השיטה הטבעית למודות לפוריות</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
            )}

            {contraceptiveMethods.type === 'גלולות' && (
                <div className="form-group">
                    <label className="form-label">
                        מאיזה גיל התחלת להשתמש בגלולות?
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

            {(contraceptiveMethods.type === 'התקן הורמונלי' || contraceptiveMethods.type === 'התקן לא הורמונלי') && (
                <div className="form-group">
                    <label className="form-label">
                        מאיזה גיל התחלת להשתמש בהתקן?
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
            האם השתמשת בעבר בגלולות למניעת הריון
            </label>
                <div className="form-check">
                <input
                            type="radio"
                            name="isGlulotInPast"
                            value="כן"
                            onChange={handleGlulotInPastChange}
                        /> כן
                </div>
                <div className="form-check">
                <input
                            type="radio"
                            name="isGlulotInPast"
                            value="לא"
                            onChange={handleGlulotInPastChange}
                        /> לא
                </div>
            </div>

            {isGlulotInPast === 'כן' && (
                <div className="form-group">
                    <label className="form-label">
                        מאיזה גיל התחלת להשתמש בגלולות?
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
            האם את מבקרת באופן קבוע אצל רופא נשים
            </label>
                <div className="form-check">
                <input
                            type="radio"
                            name="isBikurKavua"
                            value="כן"
                            onChange={handleBikurKavua}
                        /> כן
                </div>
                <div className="form-check">
                <input
                            type="radio"
                            name="isBikurKavua"
                            value="לא"
                            onChange={handleBikurKavua}
                        /> לא
                </div>
            </div>

            {isBikurKavua === 'כן' && (
                <div className="form-group radio-preferred">
                    <label className="form-label">
                    כמה פעמים בשנה לא כולל מעקב הריון/פוריות
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
    <label className="form-label">האם את מבקרת באופן קבוע אצל כירוגית שד?</label>
    <div className="form-check">
        <input type="radio" name="breastSurgeonVisits" value="כן" onChange={handleChange} />
        <label>כן</label>
    </div>
    <div className="form-check">
        <input type="radio" name="breastSurgeonVisits" value="לא" onChange={handleChange} />
        <label>לא</label>
    </div>
    </div>

    {formData.breastSurgeonVisits === 'כן' && (
    <div className="form-group radio-preferred">
        <label className="form-label">באיזו תדירות את מבקרת?</label>
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
    <label className="form-label">האם יש היסטוריה של סרטן שד/שחלות במשפחה?</label>
    <div className="form-check">
        <input type="radio" name="familyBreastOvarianCancer" value="כן" onChange={handleChange} />
        <label>כן</label>
    </div>
    <div className="form-check">
        <input type="radio" name="familyBreastOvarianCancer" value="לא" onChange={handleChange} />
        <label>לא</label>
    </div>
</div>

<div className="form-group radio-preferred">
    <label className="form-label">פרופיל הורמונלי תקין?</label>
    <div className="form-check">
        <input type="radio" name="hormonalProfile" value="נבדק ונמצא תקין" onChange={handleChange} />
        <label>נבדק ונמצא תקין</label>
    </div>
    <div className="form-check">
        <input type="radio" name="hormonalProfile" value="נבדק ונמצא כי________" onChange={handleChange} />
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
        <input type="radio" name="hormonalProfile" value="לא נבדק" onChange={handleChange} />
        <label>לא נבדק</label>
    </div>
</div>


<button type="submit" className="btn btn-primary">שלחי</button>


            </form>
        </div>
    );
}

export default App;
