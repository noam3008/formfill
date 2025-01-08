// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
// import '../css/GiladForm.css';
// import axios from 'axios';
// import WomanForm from "./WomanForm";
//
// function App() {
//     const [formData, setFormData] = useState({
//         preferredLanguage: '',
//         firstName: '',
//         lastName: '',
//         idNumber: '',
//         email: '',
//         phone: '',
//         address: '',
//         healthFund: '',
//         age: '',
//         gender: '',
//         sex: '',
//     });
//     const [gender, setGender] = useState('');
//     const [showAdditionalForm, setShowAdditionalForm] = useState(false);
//
//     const handleGenderChange = (event) => {
//         console.log("gender changed")
//         setGender(event.target.value);
//     };
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Submitted formData: ", formData);
//
//         // Add form submission logic here
//         fetch('http://localhost:3002/api/submit', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 alert("Form submitted successfully!");
//             })
//             .catch((error) => {
//                 alert("Error submitting form!");
//                 console.error('Error:', error);
//             });
//
//
//
//
//         console.log(gender)
//         if (gender === "אישה") {
//             setShowAdditionalForm(true);
//         } else {
//             // Handle other cases or submit the form data
//             console.log('Form submitted with gender:', gender);
//         }
//
//         if (showAdditionalForm) {
//             console.log("נכנס לתנאי")
//             console.log(gender)
//              try {
//                 console.log("נכנס FETCH")
//                  fetch('http://localhost:3000/personalform', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     }
//                 })
//                  console.log("FINISH FETCH")
//                 setShowAdditionalForm(true);
//             } catch (error) {
//                 console.error('Error making API call:', error);
//             }
//     }
//     };
//
//     return (
//         <div className="newDiv">
//         <h1>
//             Rainbow Monster
//         </h1>
//
//
//         </div>
//     );
// }
//
// export default App;
