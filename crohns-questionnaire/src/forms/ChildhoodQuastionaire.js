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
        isNative: '',
        childhoodResidence: '',
        hospitalization: '',
        pets: '',
        medicineUsageFrequency: '',
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
        activeParenting: '',
        physicalPunishment: '',
        childhoodDescription: '',
        additionalComments: '',
    });

     useEffect(() => {
        // Initialize formData with default or empty values when component mounts
        setFormData({
            pregnancyRisk: '',
            birthType: '',
            preterm: '',
            feedingMethod: '',
            isNative: '',
            childhoodResidence: '',
            hospitalization: '',
            pets: '',
            medicineUsageFrequency: '',
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
            activeParenting: '',
            physicalPunishment: '',
            childhoodDescription: '',
            additionalComments: '',
        });
        window.scrollTo(0,0)
      }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Here you can handle form submission, like sending data to an API
    };


  return (
    
    <div className="form-container">
            <h2>שאלון לידה וילדות מוקדמת</h2>
            <form onSubmit={handlesubmit}>

                {/* Pregnancy and Birth Section */}
                <div>
                    <label className="form-label">
                    {preferredLanguage === "לשון זכר"
          ? " האם אתה יודע אם ההריון שלך כעובר, היה בסיכון?"
          : "  האם את יודעת אם ההריון שלך כעובר, היה בסיכון?"}
                        
                       </label>
                    <select name="pregnancyRisk" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        <option value="כן">כן</option>
                        <option value="לא">לא</option>
                        <option value="לא יודע">לא ידוע</option>
                    </select>
                </div>

                <div >
                    <label className="form-label">באיזה סוג לידה נולדת?</label>
                    <select name="birthType" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        <option value="רגילה (וגינלית)">רגילה (וגינלית)</option>
                        <option value="מכשירנית">מכשירנית</option>
                        <option value="קיסרית">קיסרית</option>
                        <option value="לא יודע">לא ידוע</option>
                    </select>
                </div>

                <div >
                    <label className="form-label">
                    {preferredLanguage === "לשון זכר"
          ? "  האם נולדת פג?"
          : "  האם נולדת פגה?"}
                       </label>
                    <select name="preterm" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        <option value="כן">כן</option>
                        <option value="לא">לא</option>
                    </select>
                </div>

                <div >
                    <label className="form-label">
                        
                    {preferredLanguage === "לשון זכר"
          ? "    האם ינקת כתינוק או שניזונת מתחליפי חלב?"
          : "    האם ינקת כתינוקת או שניזונת מתחליפי חלב?"}
                     </label>
                    <select name="feedingMethod" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        <option value="הנקה">הנקה</option>
                        <option value="תחליפי חלב">תחליפי חלב</option>
                        <option value="לא יודע">לא ידוע</option>
                    </select>
                </div>
                <br></br>

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
                            />
                            כן
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="nativeBorn"
                                value="No"
                                onChange={handleChange}
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
                    האם עברת אישפוז בילדות?
                </label>
                <div className="form-check">
                    <input
                    type="radio"
                    name="hospitalization"
                    value="כן"
                    onChange={handleChange}
                    />{" "}
                    כן
                </div>
                <div className="form-check">
                    <input
                    type="radio"
                    name="hospitalization"
                    value="לא"
                    onChange={handleChange}
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
                    האם היו לך בבית חיות מחמד?
                </label>
                <div className="form-check">
                    <input
                    type="radio"
                    name="pets"
                    value="כן"
                    onChange={handleChange}
                    />{" "}
                    כן
                </div>
                <div className="form-check">
                    <input
                    type="radio"
                    name="pets"
                    value="לא"
                    onChange={handleChange}
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

                <div className="medicine-usage-container">
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
                    />{" "}
                    כן
                </div>
                <div className="form-check">
                    <input
                    type="radio"
                    name="childhoodIllnesses"
                    value="לא"
                    onChange={handleChange}
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
                <div className="medicine-usage-container">
                    <label className="form-label">ניקיון והגיינה בבית</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            id="medicineUsageFrequency"
                            name="medicineUsageFrequency"
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

                <div className="medicine-usage-container">
                    <label className="form-label">זהירות מפני מזון מלוכלך או מזוהם בחוץ</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            id="medicineUsageFrequency"
                            name="medicineUsageFrequency"
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

                <div className="medicine-usage-container">
                    <label className="form-label">זהירות מפני חשיפה מוגזמת לשמש</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            id="medicineUsageFrequency"
                            name="medicineUsageFrequency"
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

                <h6>זה היגד יתאר את סוג החינוך בבית ילדותך</h6>

                <div className="medicine-usage-container">
                    <label className="form-label">הורי היו נוקשים</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            id="medicineUsageFrequency"
                            name="medicineUsageFrequency"
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

                <div className="medicine-usage-container">
                    <label className="form-label">החינוך בבית נוהל ע"י ההורים כצוות</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            id="medicineUsageFrequency"
                            name="medicineUsageFrequency"
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

                <div className="medicine-usage-container">
                    <label className="form-label">הורי היו מאד מעורבים בהתנהלות הילדים</label>
                                        <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            id="medicineUsageFrequency"
                            name="medicineUsageFrequency"
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

                <div className="medicine-usage-container">
                    <label className="form-label">החינוך בבית כלל צעקות</label>
                                       <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            id="medicineUsageFrequency"
                            name="medicineUsageFrequency"
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


                <div className="medicine-usage-container">
                    <label className="form-label">החינוך בבית כלל שתיקות</label>
                                        <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            id="medicineUsageFrequency"
                            name="medicineUsageFrequency"
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

                <div className="medicine-usage-container">
                    <label className="form-label">החינוך בבית כלל עונשים</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            id="medicineUsageFrequency"
                            name="medicineUsageFrequency"
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

                <div className="medicine-usage-container">
                    <label className="form-label">החינוך בבית חם</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            id="medicineUsageFrequency"
                            name="medicineUsageFrequency"
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

                <div className="medicine-usage-container">
                    <label className="form-label">הורי דאגו לכל מחסור פיזי</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            id="medicineUsageFrequency"
                            name="medicineUsageFrequency"
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

                <div className="medicine-usage-container">
                    <label className="form-label">הורי דאגו לכל מחסור רגשי</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            id="medicineUsageFrequency"
                            name="medicineUsageFrequency"
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

                <div className="medicine-usage-container">
                    <label className="form-label">הורי היו מתירניים</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            id="medicineUsageFrequency"
                            name="medicineUsageFrequency"
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

                <div className="medicine-usage-container">
                    <label className="form-label">הורי הרבו במגע עם הילדים</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            id="medicineUsageFrequency"
                            name="medicineUsageFrequency"
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

                <div className="medicine-usage-container">
                    <label className="form-label">החינוך בבית היה מעורב ופעיל</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            id="medicineUsageFrequency"
                            name="medicineUsageFrequency"
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

                <div className="medicine-usage-container">
                    <label className="form-label">החינוך כלל ענישה פיזית</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="slider"
                            id="medicineUsageFrequency"
                            name="medicineUsageFrequency"
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

                {/* Childhood Description Section */}
                <h5>איזה משפט מתאר באופן מדוייק יותר את ילדותך:</h5>

                <div>
                    <label className="form-label">בילדותי ביליתי הרבה במשחקים בבית</label>
                    <input type="radio" name="childhoodDescription" value="בילדותי ביליתי הרבה במשחקים בבית" onChange={handleChange} /> 
                </div>

                <div >
                    <label className="form-label">בילדותי ביליתי הרבה בקריאת בבית</label>
                    <input type="radio" name="childhoodDescription" value="בילדותי ביליתי הרבה בקריאת בבית" onChange={handleChange} /> 
                </div>

                <div >
                    <label className="form-label">בילדותי צפית שעות רבות בטלויזיה</label>
                    <input type="radio" name="childhoodDescription" value="בילדותי צפית שעות רבות בטלויזיה" onChange={handleChange} /> 
                </div>

                <div >
                    <label className="form-label">בילדותי את רב הזמן הפנוי ביליתי במשחק בחוץ</label>
                    <input type="radio" name="childhoodDescription" value="בילדותי את רב הזמן הפנוי ביליתי במשחק בחוץ" onChange={handleChange} /> 
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

                <button type="submit" className="btn btn-primary">שלח</button>
            </form>
        </div>
    );
};


export default ChildhoodQuestionnaire;
