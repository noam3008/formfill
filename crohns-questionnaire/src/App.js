import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyForm from './forms/MyForm';
import SuccessPage from './sucessPage';
import WomanForm from "./forms/WomanForm";
import PersonalForm from "./forms/personalForm";
import GiladGame from "./forms/GiladGame";
import MedicalFormFirst from "./forms/MedicalFormFirst";
import Healthlifestyleform from "./forms/healthlifestyleform";
import ChildhoodQuastionaire from "./forms/ChildhoodQuastionaire";

// Create this component

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<MyForm />} />
          <Route path="/woman" element={<WomanForm/>}/>
          <Route path="/success" element={<SuccessPage />}/>
          <Route path="/personalform" element={<PersonalForm />} />
          <Route path="/medicalformfirst" element={<MedicalFormFirst/>}/>
          <Route path="/healthlifestyleform" element={<Healthlifestyleform/>}/>
          <Route path="/childhoodquastionaire" element={<ChildhoodQuastionaire/>}/>
      </Routes>
    </Router>
  );
}

export default App;