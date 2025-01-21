import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import '../css/MyForm.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import WomanForm from "./WomanForm";


function App() {
     const [formData, setFormData] = useState({
    preferredLanguage: '',
    firstName: '',
    lastName: '',
    idNumber: '',
    email: '',
    phone: '',
    address: '',
    healthFund: '',
    age: '',
    gender: '',
    sex: ''
  });

    const navigate = useNavigate();

    //const [gender, setGender] = useState('');
    // const [showAdditionalForm, setShowAdditionalForm] = useState(false);
    //
    const handleGenderChange = (event) => {
        console.log("gender changed")
        //setGender(event.target.value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted formData: ", formData);
        //
        // fetch('http://localhost:3002/insert_user', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body:JSON.stringify(formData)
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         alert("Form submitted successfully!");
        //     })
        //     .catch((error) => {
        //         alert("Error submitting form!");
        //         console.error('Error:', error);
        //     });

        if (formData.preferredLanguage === 'לשון נקבה') {
            navigate("/woman");
        // Perform any specific action if the form is submitted with לשון נקבה
        console.log('Form submitted with לשון נקבה');
        // fetch('http://localhost:3000/woman', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData),  // Send form data in JSON format
        // })
        //     .then((response) => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.json();
        //     })
        //     .then((data) => {
        //         alert("Form submitted successfully!");
        //          navigate("/woman");
        //
        //     })
        //     .catch((error) => {
        //         alert("Error submitting form!");
        //         console.error('Error:', error);
        //     });
        // Example: You can redirect, display a message, or send specific data to the backend
        // alert('Form submitted with לשון נקבה');
        // You could also redirect or add any other logic here
    } else {
        navigate("/personalform")
    }



        // console.log(gender)
        // if (gender === "אישה") {
        //     setShowAdditionalForm(true);
        // } else {
        //     // Handle other cases or submit the form data
        //     console.log('Form submitted with gend
        //     er:', gender);
        // }

    //     if (showAdditionalForm) {
    //         console.log("נכנס לתנאי")
    //         console.log(gender)
    //          try {
    //             console.log("נכנס FETCH")
    //              fetch('http://localhost:3002/personalform', {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 }
    //             })
    //              console.log("FINISH FETCH")
    //             setShowAdditionalForm(true);
    //         } catch (error) {
    //             console.error('Error making API call:', error);
    //         }
    // }
    };

    return (
        <div className="container mt-5">
            <h2 className="form-title">Personal Information Form</h2>
            <form onSubmit={handleSubmit} className="form-container">

            <div className="form-group radio-preferred">
                <label className="form-label">מה הניסוח הפניה המועדף עליך?</label><br />
                <div className="form-check">
                    <input type="radio" name="preferredLanguage" value="לשון נקבה" onChange={handleChange} required /> לשון נקבה
                </div>
                <div className="form-check">
                    <input type="radio" name="preferredLanguage" value="לשון זכר" onChange={handleChange} /> לשון זכר
                </div>
            </div>


                {/* First Name */}
                <div className="form-group">
                    <label className="form-label">שם פרטי</label>
                    <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Last Name */}
                <div className="form-group">
                    <label className="form-label">שם משפחה</label>
                    <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* ID Number */}
                <div className="form-group">
                    <label className="form-label">ת.ז</label>
                    <input
                        type="text"
                        className="form-control"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Email Address */}
                <div className="form-group">
                    <label className="form-label">כתובת מייל</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Phone */}
                <div className="form-group">
                    <label className="form-label">טלפון</label>
                    <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Address */}
                <div className="form-group">
                    <label className="form-label">כתובת מגורים</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Health Fund */}
                <div className="form-group">
                    <label className="form-label">קופ"ח</label>
                    <select
                        className="form-control"
                        name="healthFund"
                        value={formData.healthFund}
                        onChange={handleChange}
                        required
                    >
                        <option class = "check" value="">Select</option>
                        <option value="מכבי">מכבי</option>
                        <option value="כללית">כללית</option>
                        <option value="מאוחדת">מאוחדת</option>
                        <option value="לאומית">לאומית</option>
                    </select>
                </div>

                {/* Age */}
                <div className="form-group">
                    <label className="form-label">גיל</label>
                    <input
                        type="number"
                        className="form-control"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Gender */}
                <div className="form-group radio-preferred">
                    <label className="form-label">מגדר</label><br />
                    <div className="form-check">
                        <input type="radio" name="gender" value="זכר" onChange={handleChange} required /> גבר
                    </div>
                    <div className="form-check">
                        <input type="radio" name="gender" value="אישה" onChange={handleChange} required /> אישה
                    </div>
                </div>

                {/* Sex */}
                <div className="form-group radio-preferred">
                    <label className="form-label">מין</label><br />
                    <div className="form-check">
                        <input type="radio" name="sex" value="זכר" onChange={handleChange} required /> זכר
                    </div>
                    <div className="form-check">
                        <input type="radio" name="sex" value="נקבה" onChange={handleChange} /> נקבה
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}


export default App;




