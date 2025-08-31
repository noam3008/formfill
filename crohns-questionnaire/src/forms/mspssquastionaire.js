import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../css/traumaStyle.css";
import axios from "axios";

const MSPSSQuestionnaire = () => {
  const location = useLocation();
 const { preferredLanguage, idNumber } = location.state || {};
 const [questions, setQuestions] = useState([]); 

  // State initialization for questions
  const [formData, setFormData] = useState({
    idNumber: idNumber,
    preferredLanguage: preferredLanguage || "",
  });

  // Questions in masculine form

  const questionsMale = [
    questions.find(q => q.field_name === "question_1_social_support_man")?.question_text || "שאלה לא זמינה",
    questions.find(q => q.field_name === "question_2_social_support_man")?.question_text || "שאלה לא זמינה",
    questions.find(q => q.field_name === "question_3_social_support_man")?.question_text || "שאלה לא זמינה",
    questions.find(q => q.field_name === "question_4_social_support_man")?.question_text || "שאלה לא זמינה",
    questions.find(q => q.field_name === "question_5_social_support_man")?.question_text || "שאלה לא זמינה",
    questions.find(q => q.field_name === "question_6_social_support_man")?.question_text || "שאלה לא זמינה",
    questions.find(q => q.field_name === "question_7_social_support_man")?.question_text || "שאלה לא זמינה",
    questions.find(q => q.field_name === "question_8_social_support_man")?.question_text || "שאלה לא זמינה",
    questions.find(q => q.field_name === "question_9_social_support_man")?.question_text || "שאלה לא זמינה",
    questions.find(q => q.field_name === "question_10_social_support_man")?.question_text || "שאלה לא זמינה",
    questions.find(q => q.field_name === "social_support_question_11_man")?.question_text || "שאלה לא זמינה",
    questions.find(q => q.field_name === "social_support_question_11_man")?.question_text || "שאלה לא זמינה",
  ];

  // Questions in feminine form
  const questionsFemale = [
      questions.find(q => q.field_name === "question_1_social_support_woman")?.question_text || "שאלה לא זמינה",
      questions.find(q => q.field_name === "question_2_social_support_woman")?.question_text || "שאלה לא זמינה",
      questions.find(q => q.field_name === "question_3_social_support_woman")?.question_text || "שאלה לא זמינה",
      questions.find(q => q.field_name === "question_4_social_support_woman")?.question_text || "שאלה לא זמינה",
      questions.find(q => q.field_name === "question_5_social_support_woman")?.question_text || "שאלה לא זמינה",
      questions.find(q => q.field_name === "question_6_social_support_woman")?.question_text || "שאלה לא זמינה",
      questions.find(q => q.field_name === "question_7_social_support_woman")?.question_text || "שאלה לא זמינה",
      questions.find(q => q.field_name === "question_8_social_support_woman")?.question_text || "שאלה לא זמינה",
      questions.find(q => q.field_name === "question_9_social_support_woman")?.question_text || "שאלה לא זמינה",
      questions.find(q => q.field_name === "question_10_social_support_woman")?.question_text || "שאלה לא זמינה",
      questions.find(q => q.field_name === "social_support_question_11_man")?.question_text || "שאלה לא זמינה",
      questions.find(q => q.field_name === "social_support_question_12_woman")?.question_text || "שאלה לא זמינה",
    
  ];

  useEffect(() => {
    axios.get("http://localhost:3002/test_questions_mspssquationaire")
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


  const navigate = useNavigate();

  // Default answers are neutral (4)
  const [answers, setAnswers] = useState(
    new Array(questionsMale.length).fill(0)
  );

  // Handle slider changes
  const handleChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = parseInt(value, 10);
    setAnswers(updatedAnswers);
  };
  


  const handlesubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
    navigate("/healthstatusquestionnaire", { state: { preferredLanguage: formData.preferredLanguage,idNumber: formData.idNumber  } });
  };


  // Slider labels
  const labels = [
    "לא מתאים כלל",
    "מתאים במידה מועטה מאוד",
    "מתאים במידה מועטה",
    "מתאים במידה בינונית",
    "מתאים במידה רבה",
    "מתאים במידה רבה מאוד",
    "מתאים לחלוטין",
  ];

  // Choose questions based on preferredLanguage
  const dbquestions =
    preferredLanguage === "לשון זכר" ? questionsMale : questionsFemale;

  return (
    <form onSubmit={handlesubmit}>
      <h3 className="text-center">שאלון תמיכה חברתית ומשפחתית</h3>
      {dbquestions.map((question, index) => (
        <div className="form-group-trauma mt-3 radio-preferred" key={index}>
          <label className="form-label">{`${index + 1}. ${question}`}</label>
          <div className="slider-container">
            <input
              type="range"
              min="1"
              max="7"
              step="1"
              className="slider"
              id={`question-${index}`}
              name={`question-${index}`}
              value={answers[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onClick={(e) => {
                if (answers[index] === 0) {
                  handleChange(index, 1); // Set to 1 when clicked if currently at 0
                }
              }}
              
            />
            <div className="slider-labels">
              {labels.map((label, i) => (
                <span key={i} className="slider-label">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
      <h4>
            {preferredLanguage === "לשון זכר" ? " שלח שאלון מספר 8 מתוך 15" : " שלחי שאלון מספר 9 מתוך 15"}

          </h4>
          <button type="submit" className="btn btn-primary">
            {preferredLanguage === "לשון זכר" ? "שלח" : "שלחי"}
          </button>
    </form>
  );
};

export default MSPSSQuestionnaire;
