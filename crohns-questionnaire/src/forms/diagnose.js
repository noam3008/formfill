import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MyForm.css';
import { useNavigate ,useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const Diagnose = () => {
   const location = useLocation();
   const [selectedOption, setSelectedOption] = useState(""); // Stores Yes/No selection
   const [questions, setQuestions] = useState([]); // Store questions from DB
  const [frequency, setFrequency] = useState("");
  const { preferredLanguage ,idNumber} = location.state || {};
  // State management for the form
  const [formData, setFormData] = useState({
    idNumber: location.state?.idNumber,
    preferredLanguage: location.state?.preferredLanguage || "",
    diagnosis: [],  // <-- must be an array
  });

  const navigate = useNavigate();

  const handleDiseaseChange = (index, field, value) => {
    const updatedDiseases = [...formData.diseases];
    updatedDiseases[index][field] = value;
    setFormData({ ...formData, diseases: updatedDiseases });
  };

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
    setFrequency(""); // Reset dropdown when switching options
  };

  const handleDropdownChange = (e) => {
    setFrequency(e.target.value);
  };

  useEffect(() => {
    axios.get("http://54.242.154.185:3002/test_questions_medical")
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


const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prevState) => {
    let updatedData = { ...prevState, [name]: value };

    if (name === "chronicDiseases") {
      // If "No" is selected, reset chronic disease-related fields
      if (value === "לא") {
        updatedData = {
          ...updatedData,
          chronicCount: 0,
          diseases: []
        };
      }
    } else if (name === "chronicCount") {
      // Dynamically update chronic disease count
      const count = parseInt(value, 10) || 0;
      updatedData = {
        ...updatedData,
        chronicCount: count,
        diseases: Array.from({ length: count }, (_, index) => ({
          id: index + 1,
          name: "",
          symptomsAge: "",
          diagnosisAge: ""
        }))
      };
    }

    return updatedData;
  });
};



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle the file upload logic here (e.g., save to state or upload to the server)
      console.log("Selected file:", file.name);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("FormData before sending:", formData);

    try {
      if (formData.numberOfChildren < 0) {
        alert("מספר ילדים חייב להיות מספר חיובי או 0");
        return;
      }

      const response = await fetch("http://54.242.154.185:3002/submit_personal_info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorResponse = await response.text();
        console.error("Server response:", errorResponse);
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response data:", result);
      localStorage.setItem('userData', JSON.stringify(result));
      navigate("/medicalformfirst", {
        state: { preferredLanguage: formData.preferredLanguage, idNumber: formData.idNumber, diagnosis: formData.diagnosis }
      });
      
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

//אופציות: 1. קרוהן/ קוליטיס 2. פסוריאזיס. 3. ראומטיק ארטריטיס 4. פסוריאטיק ארטריטס 5. פיברומיאלגיה  				
  return (
      <div className="form-container">
        <h2 className="mb-4">Medical Form</h2>
        <form  onSubmit={handlesubmit}>
          <div className="row">

          <div className="form-group radio-preferred">
          <label htmlFor="diagnosis" className="form-label">
            {preferredLanguage === 'לשון זכר' 
              ? questions.find(q => q.field_name === "diagnosis")?.question_text || "שאלה לא זמינה"
              : questions.find(q => q.field_name === "diagnosis")?.question_text || "שאלה לא זמינה"}
          </label>

          {[
            "קרוהן/קוליטיס",
            "פסוריאזיס",
            "ראומטיק ארטריטיס",
            "פסוריאטיק ארטריטס",
            "פיברומיאלגיה"
          ].map((option) => (
            <div className="form-check" key={option}>
              <input
                type="checkbox"
                name="diagnosis"
                value={option}
                checked={formData.diagnosis.includes(option)}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData((prevState) => {
                    let updatedDiagnosis = [...prevState.diagnosis];
                    if (updatedDiagnosis.includes(value)) {
                      updatedDiagnosis = updatedDiagnosis.filter((item) => item !== value);
                    } else {
                      updatedDiagnosis.push(value);
                    }
                    return {
                      ...prevState,
                      diagnosis: updatedDiagnosis,
                    };
                  });
                }}
              />
              <label className="form-check-label">{option}</label>
            </div>
          ))}
        </div>


        </div>

    <h3>
            {preferredLanguage === "לשון זכר" ? " שלח שאלון מס 3 מתוך 15" : " שלחי שאלון מס 4 מתוך 15"}

          </h3>
          <button type="submit" className="btn btn-primary">
            {preferredLanguage === "לשון זכר" ? "שלח" : "שלחי"}
          </button>

        </form>
      </div>
  );
};

export default Diagnose;
