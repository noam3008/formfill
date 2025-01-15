import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MyForm.css';

const ChildhoodQuestionnaire = () => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Here you can handle form submission, like sending data to an API
    };
    window.scrollTo(0,0);


  return (
    
    <div className="form-container">
            <h2>שאלון לידה וילדות מוקדמת</h2>
            <form onSubmit={handleSubmit}>

                {/* Pregnancy and Birth Section */}
                <div>
                    <label className="form-label">האם אתה יודע אם ההריון שלך כעובר, היה בסיכון?</label>
                    <select name="pregnancyRisk" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        <option value="כן">כן</option>
                        <option value="לא">לא</option>
                        <option value="לא יודע">לא יודע</option>
                    </select>
                </div>

                <div >
                    <label className="form-label">האם נולדת בלידה רגילה או קיסרית?</label>
                    <select name="birthType" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        <option value="רגילה (וגינלית)">רגילה (וגינלית)</option>
                        <option value="מכשירנית">מכשירנית</option>
                        <option value="קיסרית">קיסרית</option>
                    </select>
                </div>

                <div >
                    <label className="form-label">האם נולדת פג, או סמוך לשבוע 40?</label>
                    <select name="preterm" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        <option value="כן">כן</option>
                        <option value="לא">לא</option>
                    </select>
                </div>

                <div >
                    <label className="form-label">האם ינקת כתינוק או שניזונת מתחליפי חלב?</label>
                    <select name="feedingMethod" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        <option value="הנקה">הנקה</option>
                        <option value="תחליפי חלב">תחליפי חלב</option>
                        <option value="לא יודע">לא יודע</option>
                    </select>
                </div>

                <div >
                    <label className="form-label">האם אתה יליד הארץ? אם לא, באיזה גיל עלית ומהיכן?</label>
                    <input type="text" name="isNative" className="form-control" value={formData.isNative} onChange={handleChange} />
                </div>

                <div >
                    <label className="form-label">היכן גרת בילדותך (עד גיל 12)?</label>
                    <select name="childhoodResidence" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        <option value="בעיר">בעיר</option>
                        <option value="מושב">מושב</option>
                        <option value="כפר">כפר</option>
                        <option value="בקיבוץ">בקיבוץ</option>
                    </select>
                </div>

                <div >
                    <label className="form-label">האם עברת אישפוז בילדות? אם כן מדוע ובאיזה גיל?</label>
                    <input type="text" name="hospitalization" className="form-control" value={formData.hospitalization} onChange={handleChange} />
                </div>

                <div >
                    <label className="form-label">האם היו לך בבית חיות מחמד? אם כן, אילו חיות? באילו גילאים?</label>
                    <input type="text" name="pets" className="form-control" value={formData.pets} onChange={handleChange} />
                </div>

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

                <div >
                    <label className="form-label">האם חלית במחלות ילדות כלשהן? אם כן באיזו?</label>
                    <input type="text" name="childhoodIllnesses" className="form-control" value={formData.childhoodIllnesses} onChange={handleChange} />
                </div>

                <div className="medicine-usage-container">
                    <label className="form-label">באיזו מידה היתה הקפדה בביתך בילדותך על: ניקיון והגיינה בביתך</label>
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

                <h5>איזה היגד יתאר את סוג החינוך בבית ילדותך</h5>

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
                    <input type="radio" name="childhoodDescription" value="בילדותי ביליתי הרבה במשחקים בבית" onChange={handleChange} /> כן
                </div>

                <div >
                    <label className="form-label">בילדותי ביליתי הרבה בקריאת בבית</label>
                    <input type="radio" name="childhoodDescription" value="בילדותי ביליתי הרבה בקריאת בבית" onChange={handleChange} /> כן
                </div>

                <div >
                    <label className="form-label">בילדותי צפית שעות רבות בטלויזיה</label>
                    <input type="radio" name="childhoodDescription" value="בילדותי צפית שעות רבות בטלויזיה" onChange={handleChange} /> כן
                </div>

                <div >
                    <label className="form-label">בילדותי את רב הזמן הפנוי ביליתי במשחק בחוץ</label>
                    <input type="radio" name="childhoodDescription" value="בילדותי את רב הזמן הפנוי ביליתי במשחק בחוץ" onChange={handleChange} /> כן
                </div>

                {/* Additional Comments Section */}
                <div >
                    <label className="form-label">משהו נוסף שתרצה שנדע?</label>
                    <textarea name="additionalComments" className="form-control" value={formData.additionalComments} onChange={handleChange}></textarea>
                </div>

                <button type="submit" className="btn btn-primary">שלח</button>
            </form>
        </div>
    );
};


export default ChildhoodQuestionnaire;
