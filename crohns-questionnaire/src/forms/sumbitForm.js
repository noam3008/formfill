import React, { useState } from "react";
import axios from "axios";


const TestQuestions = () => {
  const [questions, setQuestions] = useState([]);  // Store questions from DB
  const [loading, setLoading] = useState(false);    // Track loading state
  const [error, setError] = useState(null);         // Track error if any

  const fetchQuestions = async () => {
    setLoading(true);  // Start loading state

    try {
      const response = await axios.get("http://localhost:3002/test_questions");  // Fetch data from Flask API
      setQuestions(response.data);   // Set questions state with response data
      setLoading(false);              // Stop loading state
    } catch (error) {
      setError("Error fetching questions.");  // Set error message if fetch fails
      setLoading(false);                  // Stop loading state
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <div>
      <h2>Test Questions</h2>
      <button onClick={fetchQuestions} className="btn btn-primary">
        Load Questions
      </button>

      {loading && <div>Loading questions...</div>}  {/* Show loading state */}
      {error && <div>{error}</div>}  {/* Show error state */}

      <ul>
        {questions.length > 0 && questions.map((question) => (
          <li key={question.id}>
            <strong>{question.question_text}</strong> ({question.question_type})
            {question.options && (
              <ul>
                {question.options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestQuestions;
