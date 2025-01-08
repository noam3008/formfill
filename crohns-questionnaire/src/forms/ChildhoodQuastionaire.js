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


  return (
      <div className="container mt-5">
            <h2>שאלון לידה וילדות מוקדמת</h2>
            <form onSubmit={handleSubmit}>

                {/* Pregnancy and Birth Section */}
                <div className="mb-3">
                    <label className="form-label">האם אתה יודע אם ההריון שלך כעובר, היה בסיכון?</label>
                    <select name="pregnancyRisk" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        <option value="כן">כן</option>
                        <option value="לא">לא</option>
                        <option value="לא יודע">לא יודע</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">האם נולדת בלידה רגילה או קיסרית?</label>
                    <select name="birthType" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        <option value="רגילה (וגינלית)">רגילה (וגינלית)</option>
                        <option value="מכשירנית">מכשירנית</option>
                        <option value="קיסרית">קיסרית</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">האם נולדת פג, או סמוך לשבוע 40?</label>
                    <select name="preterm" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        <option value="כן">כן</option>
                        <option value="לא">לא</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">האם ינקת כתינוק או שניזונת מתחליפי חלב?</label>
                    <select name="feedingMethod" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        <option value="הנקה">הנקה</option>
                        <option value="תחליפי חלב">תחליפי חלב</option>
                        <option value="לא יודע">לא יודע</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">האם אתה יליד הארץ? אם לא, באיזה גיל עלית ומהיכן?</label>
                    <input type="text" name="isNative" className="form-control" value={formData.isNative} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">היכן גרת בילדותך (עד גיל 12)?</label>
                    <select name="childhoodResidence" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        <option value="בעיר">בעיר</option>
                        <option value="מושב">מושב</option>
                        <option value="כפר">כפר</option>
                        <option value="בקיבוץ">בקיבוץ</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">האם עברת אישפוז בילדות? אם כן מדוע ובאיזה גיל?</label>
                    <input type="text" name="hospitalization" className="form-control" value={formData.hospitalization} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">האם היו לך בבית חיות מחמד? אם כן, אילו חיות? באילו גילאים?</label>
                    <input type="text" name="pets" className="form-control" value={formData.pets} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">באיזו תדירות נעשה שימוש ב: דיו לחתכים, חתרופות להורדת חום קל, תרופות להקלה על כאבים</label>
                    <select name="medicineUsageFrequency" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        <option value="1">1 - בכלל לא</option>
                        <option value="5">5 - בתדירות גבוהה</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">האם חלית במחלות ילדות כלשהן? אם כן באיזו?</label>
                    <input type="text" name="childhoodIllnesses" className="form-control" value={formData.childhoodIllnesses} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">באיזו מידה היתה הקפדה בביתך בילדותך על: ניקיון והגיינה בביתך</label>
                    <select name="hygieneAwareness" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        {[...Array(5)].map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">זהירות מפני מזון מלוכלך או מזוהם בחוץ</label>
                    <select name="foodSafetyAwareness" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        {[...Array(5)].map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">זהירות מפני חשיפה מוגזמת לשמש</label>
                    <select name="sunExposureAwareness" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        {[...Array(5)].map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>

                <h5>איזה היגד יתאר את סוג החינוך בבית ילדותך</h5>

                <div className="mb-3">
                    <label className="form-label">הורי היו נוקשים</label>
                    <select name="strictness" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        {[...Array(5)].map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">החינוך בבית נוהל ע"י ההורים כצוות</label>
                    <select name="parentingStyle" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        {[...Array(5)].map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">הורי היו מאד מעורבים בהתנהלות הילדים</label>
                    <select name="involvement" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        {[...Array(5)].map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">החינוך בבית כלל צעקות</label>
                    <select name="shouting" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        {[...Array(5)].map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">החינוך בבית כלל שתיקות</label>
                    <select name="silence" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        {[...Array(5)].map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">החינוך בבית כלל עונשים</label>
                    <select name="punishment" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        {[...Array(5)].map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">החינוך בבית חם</label>
                    <select name="warmth" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        {[...Array(5)].map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">הורי דאגו לכל מחסור פיזי</label>
                    <select name="physicalNeeds" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        {[...Array(5)].map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">הורי דאגו לכל מחסור רגשי</label>
                    <select name="emotionalNeeds" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        {[...Array(5)].map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">הורי היו מתירניים</label>
                    <select name="permissiveness" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        {[...Array(5)].map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">הורי הרבו במגע עם הילדים</label>
                    <select name="touch" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        {[...Array(5)].map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">החינוך בבית היה מעורב ופעיל</label>
                    <select name="activeParenting" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        {[...Array(5)].map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">החינוך כלל ענישה פיזית</label>
                    <select name="physicalPunishment" className="form-select" onChange={handleChange}>
                        <option value="">בחר</option>
                        {[...Array(5)].map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>

                {/* Childhood Description Section */}
                <h5>איזה משפט מתאר באופן מדוייק יותר את ילדותך:</h5>

                <div className="mb-3">
                    <label className="form-label">בילדותי ביליתי הרבה במשחקים בבית</label>
                    <input type="radio" name="childhoodDescription" value="בילדותי ביליתי הרבה במשחקים בבית" onChange={handleChange} /> כן
                </div>

                <div className="mb-3">
                    <label className="form-label">בילדותי ביליתי הרבה בקריאת בבית</label>
                    <input type="radio" name="childhoodDescription" value="בילדותי ביליתי הרבה בקריאת בבית" onChange={handleChange} /> כן
                </div>

                <div className="mb-3">
                    <label className="form-label">בילדותי צפית שעות רבות בטלויזיה</label>
                    <input type="radio" name="childhoodDescription" value="בילדותי צפית שעות רבות בטלויזיה" onChange={handleChange} /> כן
                </div>

                <div className="mb-3">
                    <label className="form-label">בילדותי את רב הזמן הפנוי ביליתי במשחק בחוץ</label>
                    <input type="radio" name="childhoodDescription" value="בילדותי את רב הזמן הפנוי ביליתי במשחק בחוץ" onChange={handleChange} /> כן
                </div>

                {/* Additional Comments Section */}
                <div className="mb-3">
                    <label className="form-label">משהו נוסף שתרצה שנדע?</label>
                    <textarea name="additionalComments" className="form-control" value={formData.additionalComments} onChange={handleChange}></textarea>
                </div>

                <button type="submit" className="btn btn-primary">שלח</button>
            </form>
        </div>
    );
};


export default ChildhoodQuestionnaire;
