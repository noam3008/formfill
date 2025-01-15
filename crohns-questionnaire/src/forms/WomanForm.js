import React, { useState } from 'react';
import '../css/WomanForm.css';
import { useNavigate } from 'react-router-dom';


function App() {
    const [formData, setFormData] = useState({
        menstrualLength: '',
        painDuringMenstruation: '',
        pmsSymptoms: [],
        childrenCount: '',
        usedContraceptives: '',
        contraceptiveType: '',
        contraceptiveAge: '',
        hormonalType: '',
        hormonalAge: '',
        hormonalProfile: '',
        id_number :'',
    });

    const [showContraceptiveQuestions, setShowContraceptiveQuestions] = useState(false);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Show contraceptive-related questions only if user selects "Yes"
        if (name === 'usedContraceptives' && value === 'yes') {
            setShowContraceptiveQuestions(false);
        } else if (name === 'usedContraceptives' && value === 'no') {
            setShowContraceptiveQuestions(true);
        }
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        navigate("/medicalformfirst")
        // e.preventDefault();
        // console.log("Submitted formData: ", formData);
        //
        // // Add form submission logic here
        // fetch('/submit', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData),
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         alert("Form submitted successfully!");
        //     })
        //     .catch((error) => {
        //         alert("Error submitting form!");
        //         console.error('Error:', error);
        //     });
    };

    return (
        <div className="wrapper">
        <div className="form-container">
            <h2 class="a32">Woman Form</h2>
            <form onSubmit={handleSubmit}>

                
                <label>מספר תעודת זהות</label>
                <input type="number" name="id_number" value={formData.id_number}
                       onChange={handleChange}/><br/><br/>
            

                {/* Menstrual Length */}
                <label>מה אורך וסת הממוצע?</label>
                <select name="menstrualLength" value={formData.menstrualLength} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="1-2 ימים">1-2 ימים</option>
                    <option value="3-4 ימים">3-4 ימים</option>
                    <option value="4-5 ימים">4-5 ימים</option>
                    <option value="6 ימים ומעלה">6 ימים ומעלה</option>
                </select><br/><br/>

                {/* Pain During Menstruation */}
                <div className="form-group">
                <label >האם את סובלת מכאבים בזמן מחזור?</label><br/>
                <input type="radio" name="painDuringMenstruation" value="כן" onChange={handleChange} required/> כן
                <input type="radio" name="painDuringMenstruation" value="לא" onChange={handleChange}/> לא<br/><br/>
                </div>
                {/* PMS Symptoms */}
                <label>האם את סובלת מסמפטומים של תסמונת קדם וסתית (PMS)?</label><br/>
                <select multiple name="pmsSymptoms" onChange={handleChange}>
                    <option value="דכאון">דכאון</option>
                    <option value="עצבנות">עצבנות</option>
                    <option value="חרדה">חרדה</option>
                    <option value="אקנה">אקנה</option>
                    <option value="נדודי שינה">נדודי שינה</option>
                    <option value="עייפות">עייפות</option>
                    <option value="עצירות">עצירות</option>
                    <option value="כאבי פרקים">כאבי פרקים"</option>
                    <option value="כאבי שרירים">כאבי שרירים"</option>
                    <option value="כאבי בטן">כאבי בטן"</option>
                    <option value="רגישות בשדיים">רגישות בשדיים"</option>
                    <option value="תנודות בחשק המיני">תנודות בחשק המיני</option>
                    <option value="שינויים במצב הרוח">שינויים במצב הרוח</option>
                </select><br/><br/>

                {/* Children Count */}
                <label>מספר ילדים</label>
                <input type="number" name="childrenCount" value={formData.childrenCount}
                       onChange={handleChange}/><br/><br/>

                {/* Used Contraceptives */}
                <label>האם סבלת מדכאון אחרי לידה?</label><br/>
                <input type="radio" name="sufferAfterBirth" value="yes" onChange={handleChange} required/> כן
                <input type="radio" name="sufferAfterBirth" value="no" onChange={handleChange}/> לא<br/><br/>

                {/* Used Contraceptives */}
                <label>האם את משתמשת באמצעי מניעה?</label><br/>
                <input type="radio" name="usedContraceptives" value="yes" onChange={handleChange} required/> כן
                <input type="radio" name="usedContraceptives" value="no" onChange={handleChange}/> לא<br/><br/>

                {/* Conditional Questions for Contraceptive Usage */}
                {showContraceptiveQuestions && (
                    <>
                        {/* Contraceptive Type */}
                        <label>אם כן, איזה סוג אמצעי מניעה את משתמשת?</label>
                        <select name="contraceptiveType" value={formData.contraceptiveType} onChange={handleChange}
                                required>
                            <option value="">Select</option>
                            <option value="גלולות">גלולות</option>
                            <option value="התקן הורמונלי">התקן הורמונלי</option>
                            <option value="התקן לא הורמונלי">התקן לא הורמונלי</option>
                        </select><br/><br/>

                        {/* Age for Contraceptive Type */}
                        {formData.contraceptiveType === 'גלולות' && (
                            <>
                                <label>אם גלולות, מאיזה גיל?</label>
                                <input type="number" name="contraceptiveAge" value={formData.contraceptiveAge}
                                       onChange={handleChange} required/><br/><br/>
                            </>
                        )}

                        {/* Age for Hormonal or Non-Hormonal IUD */}
                        {(formData.contraceptiveType === 'התקן הורמונלי' || formData.contraceptiveType === 'התקן לא הורמונלי') && (
                            <>
                                <label>אם התקן הורמונלי/לא הורמונלי, מאיזה גיל?</label>
                                <input type="number" name="hormonalAge" value={formData.hormonalAge}
                                       onChange={handleChange} required/><br/><br/>
                            </>
                        )}
                    </>
                )}

                <label>האם את מבקרת באופן קבוע אצל רופא נשים? כמה פעמים בשנה ? (לא כולל בזמן מעקב הריון/ פוריות)</label><br/>
                <select multiple name="checkwomandoctor" onChange={handleChange}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3-4">3-4</option>
                    <option value="5">5</option>
                    <option value="יותר מ6 פעמים">יותר מ6 פעמים</option>
                </select><br/><br/>


                {/* Hormonal Profile */}
                <label>פרופיל הורמונלי תקין?</label><br/>
                <input type="radio" name="hormonalProfile" value="כן" onChange={handleChange} required/> כן
                <input type="radio" name="hormonalProfile" value="לא" onChange={handleChange}/> לא
                <input type="radio" name="hormonalProfile" value="לא בדקתי" onChange={handleChange}/> לא בדקתי <br/><br/>


                {/* Submit Button */}
                <input type="submit" value="Submit"/><br/><br/>
            </form>
        </div>
        </div>
    );

}

export default App;