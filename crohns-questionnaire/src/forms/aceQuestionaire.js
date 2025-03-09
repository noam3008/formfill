import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../css/traumaStyle.css";

const ACEQuestionnaire = () => {
  const location = useLocation();
  const { preferredLanguage } = location.state || {}; // Extract preferred language from state

  // Male Questions
  const questionsMale = [
   
        "האם לעיתים קרובות, אחד ההורים או איש מבוגר אחר שגר אתכם קילל אותך, העליב אותך, דיכא או השפיל אותך? או התנהג בדרך שגרמה לך לפחד שאתה עלול להיפגע פיזית?",
        "האם לעיתים קרובות, אחד ההורים או איש מבוגר אחר שגר אתכם דחף, אחז בחוזקה, סטר או זרק עליך משהו? או אי פעם הכה אותך בחוזקה עד כדי כך שהיו סימנים או שהיית חבול?",
        "האם אדם מבוגר או אדם המבוגר ממך ב5 שנים לפחות אי פעם נגע או ליטף אותך או שאת נגעת בגוף של האדם הזה באופן מיני? או האדם ניסה או הצליח לעשות סקס אוראלי, אנאלי או וגינלי?",
        "האם הרגשת לעיתים קרובות שאף אחד מבני המשפחה אינו אוהב אותך או לא חושב שאתה חשוב או מיוחד? או אנשים במשפחה שלך לא דאגו אחד לשני, היו קרובים אחד לשני או תמכו אחד בשני?",
        "האם הרגשת לעיתים קרובות שאין לך מספיק אוכל, שלבשת בגדים מלוכלכים ושלא היה לך אף אחד שהגן עליך? או ההורים שלך היו שיכורים או מסטולים מידי מכדי לדאוג לך או לקחת אותך לרופא אם היית זקוק לכך?",
        "האם ההורים שלך אי פעם נפרדו או התגרשו?",
        "האם אמך או אמך החורגת לעיתים קרובות- נדחפה, הוחזקה בחוזקה, סטרו לה או שמשהו נזרק עליה? או לפעמים או לעיתים קרובות נבעטה, ננשכה, קבלה אגרוף או הוכתה באמצעות משהו קשיח (קשה) או אי פעם הוכתה למשך כמה דקות רצופות או אוימה בעזרת אקדח או סכין?",
        "האם גרת עם אדם כלשהו שסבל מבעיית שתייה, היה אלכוהוליסט או השתמש בסמים?",
        "האם מישהו מבני הבית היה מדוכא או במצוקה נפשית או ניסה להתאבד?",
        "האם מישהו מבני הבית היה בכלא?"
      
  ];

  const questionsFemale = [
    "האם לעיתים קרובות, אחד ההורים או איש מבוגר אחר שגר אתכם קילל אותך, העליב אותך, דיכא או השפיל אותך? או התנהג בדרך שגרמה לך לפחד שאת עלולה להיפגע פיזית?",
    "האם לעיתים קרובות, אחד ההורים או איש מבוגר אחר שגר אתכם דחף, אחז בחוזקה, סטר או זרק עליך משהו? או אי פעם הכה אותך בחוזקה עד כדי כך שהיו סימנים או שהיית חבולה?",
    "האם אדם מבוגר או אדם המבוגר ממך ב5 שנים לפחות אי פעם נגע או ליטף אותך או שאת נגעת בגוף של האדם הזה באופן מיני? או האדם ניסה או הצליח לעשות סקס אוראלי, אנאלי או וגינלי?",
    "האם הרגשת לעיתים קרובות שאף אחד מבני המשפחה אינו אוהב אותך או לא חושב שאת חשובה או מיוחדת? או אנשים במשפחה שלך לא דאגו אחד לשני, היו קרובים אחד לשני או תמכו אחד בשני?",
    "האם הרגשת לעיתים קרובות שאין לך מספיק אוכל, שלבשת בגדים מלוכלכים ושלא היה לך אף אחד שהגן עליך? או ההורים שלך היו שיכורים או מסטולים מידי מכדי לדאוג לך או לקחת אותך לרופא אם היית זקוקה לכך?",
    "האם ההורים שלך אי פעם נפרדו או התגרשו?",
    "האם אמך או אמך החורגת לעיתים קרובות- נדחפה, הוחזקה בחוזקה, סטרו לה או שמשהו נזרק עליה? או לפעמים או לעיתים קרובות נבעטה, ננשכה, קבלה אגרוף או הוכתה באמצעות משהו קשיח (קשה) או אי פעם הוכתה למשך כמה דקות רצופות או אוימה בעזרת אקדח או סכין?",
    "האם גרת עם אדם כלשהו שסבל מבעיית שתייה, היה אלכוהוליסט או השתמש בסמים?",
    "האם מישהו מבני הבית היה מדוכא או במצוקה נפשית או ניסה להתאבד?",
    "האם מישהו מבני הבית היה בכלא?"
];


  // Use the preferredLanguage to select the correct questions
  const questions =
    preferredLanguage === "לשון זכר" ? questionsMale : questionsFemale;

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page on mount
  }, []);

  const navigate = useNavigate();

  // Default answers are neutral (0 or 1)
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
   // Handle radio button change
    // Handle radio button change
  // Handle radio button change
  const handleChange = (index, value) => {
    const updatedAnswers = [...answers];

    // If the same option is selected again, reset the answer (deselect)
    updatedAnswers[index] = updatedAnswers[index] === value ? null : value;

    setAnswers(updatedAnswers);
  };
  // Handle form submission
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Here you can handle form submission, like sending data to an API
    navigate("/briefquestionnaire", { state: { preferredLanguage: formData.preferredLanguage } });
    
  };

  return (
    <form onSubmit={handlesubmit}>
      <h3 className="text-center">ACE - שאלון חוויות ילדות</h3>

      {/* Iterate through the questions */}
      {questions.map((question, index) => (
        <div className="form-group radio-preferred" key={index}>
          <label className="form-label">{`${index + 1}. ${question}`}</label>
          <div className="form-check">
            <input
              type="radio"
              name={`question-${index}`}
              value="כן"
              checked={answers[index] === "כן"} // Check if the answer is "כן"
              onChange={(e) => handleChange(index, "כן")}
            />
            כן
          </div>
          <div className="form-check">
            <input
              type="radio"
              name={`question-${index}`}
              value="לא"
              checked={answers[index] === "לא"} // Check if the answer is "לא"
              onChange={(e) => handleChange(index, "לא")}
            />
            לא
          </div>
        </div>
      ))}
                     <h4>
            {preferredLanguage === "לשון זכר" ? " שלח שאלון מספר 11 מתוך 15" : " שלחי שאלון מספר 12 מתוך 15"}

          </h4>
          <button type="submit" className="btn btn-primary">
            {preferredLanguage === "לשון זכר" ? "שלח" : "שלחי"}
          </button>
    </form>
  );
};

export default ACEQuestionnaire;
