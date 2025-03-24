import React, { useState } from "react";
import "../css/traumaStyle.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const HealthStatusQuestionnaire = () => {
  const navigate = useNavigate();
    const location = useLocation();
    const { preferredLanguage } = location.state || {}; // Extract preferred language from state
  
const [formData, setFormData] = useState({
  listenDiagnose: '',
  treatmentDetailsDisturb:'',
  treatmentListenInWhat:''

})
  // Health-related questions
  const questions = [
    "כאבי ראש חוזרים, התעלפויות, סחרחורות, התכווצויות",
    "הפרעות שמיעה, דלקות אוזניים חוזרות",
    "נזלת אלרגית, סינוסיטיס, קושי בנשימה דרך האף",
    "הפרעות ראייה, צורך במשקפיים, עיוורון לילה, דלקות עיניים חוזרות",
    "עברת טיפול בלייזר לתיקון הראייה",
    "הפרעה בלחץ דם, כאבים בחזה, אובדן הכרה, קוצר נשימה במאמץ",
    "מחלת לב, דקירות בחזה, שינויים בדופק במנוחה/מאמץ",
    "אסטמה, ציפצופים, קוצר נשימה, מחלת ריאה אחרת",
    "מחלות אנדוקריניות (בעיות הורמונלית כגון: בלוטת התריס, כולסטרול)",
    "כיב, צרבת, כאבי בטן חוזרים, צהבת, מחלת כבד",
    "דלקת מעי, דימומים במערכת העיכול, טחורים",
    "מחלת דם (כגון: אנמיה, טרומבוציטופניה)",
    "מחלות מין",
    "כאבי גב חוזרים, חבלה בגב",
    "כאבים ברגליים, הפרעה בהליכה, אירועים מתועדים ע”י רופא של נקעים חוזרים",
    "שברים בעצמות, פריקת כתף",
    "מחלות מפרקים",
    "מחלות עור",
    "מחלות כבד",
    "מחלה ממארת בעבר/בהווה",
    "האם עברת ניתוחים/אשפוזים בעבר? (שלא מפורט בסעיפים הקודמים)",
    "האם הינך נשא/חולה במחלות זיהומיות כרוניות (HIV, צהבת נגיפית, מחלות אחרות)",
    "מחלות נוירולוגיות (כולל אפילפסיה)",
    "מחלות אנדוקריניות",
    "מחלות המטולוגיות (כולל אנמיה)",
    "מחלות עיניים",
    "מחלות אף, אוזן, גרון",
    "מחלות ריאה (כולל אסטמה) אנא ציין מתי היה ההתקף האחרון",
    "מחלות לב, מומי לב, יתר לחץ דם",
    "מחלות כליה ודרכי השתן",
    "מחלות דרכי העיכול והכבד",
    "מחלות פרקים, הפרעות שלד (כולל שברים בעצמות)",
    "מחלות ממאירות",
    "האם היו או ישנם במשפחתך (דרגה ראשונה) מחלות ממאירות (סרטן)?",
    " האם היו מקרים של מוות פתאומי במשפחתך (דרגה ראשונה) עבור קרובים שגילם היה מתחת לגיל 45 מסיבה שאינה ידועה או מסיבה לבבית?",
    "האם יש במשפחתך (דרגה ראשונה) מחלות ריאה כרוניות כגון שחפת?",
    "האם יש במשפחתך (דרגה ראשונה)  מחלות גנטיות (תורשתיות)?"
  ];

  // Initialize state with null (so nothing is selected by default)
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [details, setDetails] = useState(new Array(questions.length).fill(""));

  // Handle Yes/No selection
  const handleChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value === "yes" ? 1 : 0;
    setAnswers(updatedAnswers);
  };
  
  const handleChangeQUestions = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
    useEffect(() => {
      window.scrollTo(0, 0); // Scrolls to the top of the page on mount
    }, []);

  // Handle additional details input
  const handleDetailsChange = (index, value) => {
    const updatedDetails = [...details];
    updatedDetails[index] = value;
    setDetails(updatedDetails);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    navigate("/childhoodquastionaire",{ state: { preferredLanguage: formData.preferredLanguage,idNumber: formData.idNumber  } });
};



  return (
    <form onSubmit={handlesubmit}>
      <h3 className="text-center">שאלון מצב בריאותי</h3>
      <h4 className="mt-4">
        
      {preferredLanguage === "לשון זכר"
          ? " האם אתה סובל מאחד התסמינים הבאים? סמן כן/לא"
          : " האם את סובלת מאחד התסמינים הבאים? סמני כן/לא"}
        
       </h4>
      {questions.map((question, index) => (
        <div className="form-group radio-preferred" key={index}>
          <label className="form-label">{`${index + 1}. ${question}`}</label>

          {/* Yes/No radio buttons - No default selection */}
          <div className="form-check">
            <input
              type="radio"
              name={`question-${index}`}
              value="yes"
              onChange={(e) => handleChange(index, e.target.value)}
              checked={answers[index] === 1}
            />
            <label>כן</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              name={`question-${index}`}
              value="no"
              onChange={(e) => handleChange(index, e.target.value)}
              checked={answers[index] === 0}
            />
            <label>לא</label>
          </div>

          {/* Show text box only if "Yes" is selected */}
          {answers[index] === 1 && (
            <div className="form-group radio-preffered">
              <label>

              {preferredLanguage === "לשון זכר"
          ? "תוכל לפרט יותר ולתת דוגמאות"
          : "תוכלי לפרט יותר ולתת דוגמאות"}
              </label>
              <input
                type="text"
                className="form-control"
                value={details[index]}
                onChange={(e) => handleDetailsChange(index, e.target.value)}
              />
            </div>
          )}
        </div>
      ))}

            {/* Conditionally Render Section based on preferredLanguage */}
            {preferredLanguage === "לשון זכר" && (
        <div className="form-group radio-preferred">
          <label className="form-label">בעיות באשכים, בקע מפשעתי, כאבים במפשעה?</label>
          {/* Yes/No radio buttons */}
          <div className="form-check">
            <input
              type="radio"
              name="boysSymptom"
              value="yes"
              onChange={(e) => handleChange("boysSymptom", e.target.value)}
              checked={answers["boysSymptom"] === 1}
            />
            <label>כן</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              name="boysSymptom"
              value="no"
              onChange={(e) => handleChange("boysSymptom", e.target.value)}
              checked={answers["boysSymptom"] === 0}
            />
            <label>לא</label>
          </div>
        </div>
      )}

            {/* Conditionally Render Section based on preferredLanguage */}
        {preferredLanguage != "לשון זכר" && (
        <div className="form-group radio-preferred">
          <label className="form-label"> הפרעות במחזור החודשי, מחלה גניקולוגית?</label>
          {/* Yes/No radio buttons */}
          <div className="form-check">
            <input
              type="radio"
              name="girlSymptom"
              value="yes"
              onChange={(e) => handleChange("girlSymptom", e.target.value)}
              checked={answers["girlSymptom"] === 1}
            />
            <label>כן</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              name="girlSymptom"
              value="no"
              onChange={(e) => handleChange("girlSymptom", e.target.value)}
              checked={answers["girlSymptom"] === 0}
            />
            <label>לא</label>
          </div>
        </div>
      )}
         {/* Treatment Information */}
         <div className="form-group radio-preferred">
         <label className="form-label"> הפרעות נפשיות מאובחנות?</label>
              <div className="form-check">
                  <input type="radio" name="mentalDiagnose" value="כן" onChange={handleChangeQUestions}  /> כן
              </div>
              <div className="form-check">
                  <input type="radio" name="mentalDiagnose" value="לא" onChange={handleChangeQUestions}  /> לא
              </div>
            </div>

        {formData.mentalDiagnose === 'כן' && (
                      <div >
                      <label htmlFor="treatmentDetails" className="form-label">
                      {preferredLanguage === "לשון זכר"
                      ? "תוכל לפרט יותר על ההפרעה הנפשית המאובחנת"
                      : "תוכל לפרט יותר על ההפרעה הנפשית המאובחנת"}
                       </label>
                      <input
                          type="text"
                          className="form-control"
                          id="treatmentDetails"
                          name="treatmentDetails"
                          value={formData.treatmentDetails}
                          onChange={handleChangeQUestions}
                      />
                    </div>
       
       )}
       {formData.mentalDiagnose === 'כן' && (
                      <div >
                      <label htmlFor="treatmentTakeCare" className="form-label">
                      {preferredLanguage === "לשון זכר"
                      ? "האם אתה מטופל על ההפרעה הנפשית המאובחנת"
                      : "האם את מטופלת על ההפרעה הנפשית המאובחנת"}
                       </label>
                      <input
                          type="text"
                          className="form-control"
                          id="treatmentTakeCare"
                          name="treatmentTakeCare"
                          value={formData.treatmentTakeCare}
                          onChange={handleChangeQUestions}
                      />
                    </div>
       
       )}
              {formData.mentalDiagnose === 'כן' && (
                      <div >
                      <label htmlFor="treatmentInWhat" className="form-label">
                      {preferredLanguage === "לשון זכר"
                      ? "במה אתה מטופל על ההפרעה הנפשית המאובחנת"
                      : "במה את מטופלת על ההפרעה הנפשית המאובחנת"}
                       </label>
                      <input
                          type="text"
                          className="form-control"
                          id="treatmentInWhat"
                          name="treatmentInWhat"
                          value={formData.treatmentInWhat}
                          onChange={handleChangeQUestions}
                      />
                    </div>
       
       )}

                {/* Treatment Information */}
                <div className="form-group radio-preferred">
         <label className="form-label"> הפרעות קשב וריכוז?</label>
              <div className="form-check">
                  <input type="radio" name="listenDiagnose" value="כן" onChange={handleChangeQUestions}  /> כן
              </div>
              <div className="form-check">
                  <input type="radio" name="listenDiagnose" value="לא" onChange={handleChangeQUestions}  /> לא
              </div>
            </div>


        {formData.listenDiagnose === 'כן' && (
                      <div >
                      <label htmlFor="treatmentDetails" className="form-label">
                      {preferredLanguage === "לשון זכר"
                      ? "האם מטופל תרופתית"
                      : "האם מטופלת תרופתית"}
                       </label>
                      <input
                          type="text"
                          className="form-control"
                          id="treatmentDetailsDisturb"
                          name="treatmentDetailsDisturb"
                          value={formData.treatmentDetailsDisturb}
                          onChange={handleChangeQUestions}
                      />
                    </div>
       
       )}
              {formData.listenDiagnose === 'כן' && (
                      <div >
                      <label htmlFor="treatmentInWhat" className="form-label">
                      {preferredLanguage === "לשון זכר"
                      ? "במה אתה מטופל על הפרעת קשב והריכוז"
                      : "במה את מטופלת על הפרעת קשב והריכוז"}
                       </label>
                      <input
                          type="text"
                          className="form-control"
                          id="treatmentListenInWhat"
                          name="treatmentListenInWhat"
                          value={formData.treatmentListenInWhat}
                          onChange={handleChangeQUestions}
                      />
                    </div>
       
       )}


<h4>
            {preferredLanguage === "לשון זכר" ? " שלח שאלון מספר 9 מתוך 15" : " שלחי שאלון מספר 10 מתוך 15"}

          </h4>
          <button type="submit" className="btn btn-primary">
            {preferredLanguage === "לשון זכר" ? "שלח" : "שלחי"}
          </button>
    </form>
  );
};

export default HealthStatusQuestionnaire;
