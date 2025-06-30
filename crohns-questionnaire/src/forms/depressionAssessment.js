import React, { useState, useEffect } from "react";
import "../css/traumaStyle.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const DepressionAssessment = () => {
  const location = useLocation();
  const { preferredLanguage, idNumber } = location.state || {};
  const [formData, setFormData] = useState({
      idNumber: idNumber,
      preferredLanguage: preferredLanguage || "",
    });
  

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const navigate = useNavigate();

  // Mapping numeric values to their respective words
  const numberToWordMap = {
    1: "כלל לא",
    2: "מספר ימים",
    3: "ביותר ממחצית מן הימים",
    4: "כמעט כל יום",
  };

  useEffect(() => {
    console.log("Received location.state:", location.state);
    axios
      .get("http://54.242.154.185:3002/test_questions_depression")
      .then((response) => {
        const allQuestions = response.data;

        // Filter questions based on the preferred language (male or female form)
        const selectedQuestions =
          preferredLanguage === "לשון זכר"
            ? allQuestions.slice(0, 9) // Questions 1-9 for male
            : allQuestions.slice(9, 18); // Questions 10-18 for female

        setQuestions(selectedQuestions);

        // Initialize answers for the selected questions
        const initialAnswers = selectedQuestions.map(() => 0); // Default answer is 0 for all questions
        setAnswers(initialAnswers);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });

    window.scrollTo(0, 0); // Scroll to the top when component mounts
  }, [preferredLanguage]);

  const handleChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = parseInt(value, 10); // Set the selected value for the question
    setAnswers(updatedAnswers);
  };


    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Answers submitted:", answers);
    
      // Convert numeric answers to words
      const convertedAnswers = {};
      Object.keys(answers).forEach((key) => {
        convertedAnswers[key] = numberToWordMap[answers[key]] || "לא נבחרה תשובה"; // Default if not selected
      });
    
      console.log("Converted Answers:", convertedAnswers);
    
      // Prepare data to send in the request
      const formSubmissionData = {
        idNumber: formData.idNumber,
        preferredLanguage: formData.preferredLanguage,
        answers: convertedAnswers, // Send transformed answers
      };
    
      // Send data to backend
      axios
        .post("http://54.242.154.185:3002/insert_depression_answers", formSubmissionData)
        .then((response) => {
          console.log(response.data);
          alert("תשובותיך נשמרו בהצלחה.");
        navigate("/healthlifestyleform", { state: { preferredLanguage: formData.preferredLanguage,idNumber: formData.idNumber  } });
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-center">
        {preferredLanguage === "לשון זכר"
          ? "? במהלך השבועיים האחרונים, באיזו תדירות היית מוטרד מכל אחת מן הבעיות הבאות"
          : "? במהלך השבועיים האחרונים, באיזו תדירות היית מוטרדת מכל אחת מן הבעיות הבאות"}
      </h3>
      {questions.map((question, index) => (
        <div className="form-group-trauma mt-3 radio-preferred" key={index}>
          <label className="form-label">{`${index + 1}. ${question.question_text}`}</label>
          <div className="slider-container">
            <input
              type="range"
              min="1"
              max="4"
              step="1"
              className="slider"
              id={`question-${index}`}
              name={`question-${index}`}
              value={answers[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onClick={() => {
                if (answers[index] === 0) {
                  handleChange(index, 1); // Set to 1 if it's 0 when clicked
                }
              }}
            />
            <div className="slider-labels">
              <span>כלל לא</span>
              <span>מספר ימים</span>
              <span>ביותר ממחצית מן הימים</span>
              <span>כמעט כל יום</span>
            </div>
          </div>
        </div>
      ))}
      <h4>
        {preferredLanguage === "לשון זכר" ? "שלח שאלון מספר 5 מתוך 15" : "שלחי שאלון מספר 6 מתוך 15"}
      </h4>
      <button type="submit" className="btn btn-primary">
        {preferredLanguage === "לשון זכר" ? "שלח" : "שלחי"}
      </button>
    </form>
  );
};

export default DepressionAssessment;
