import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyForm from './forms/MyForm';
import SuccessPage from './sucessPage';
import WomanForm from "./forms/WomanForm";
import PersonalForm from "./forms/personalForm";
import GiladGame from "./forms/GiladGame";
import MedicalFormFirst from "./forms/MedicalFormFirst";
import Healthlifestyleform from "./forms/healthlifestyleform";
import ChildhoodQuastionaire from "./forms/ChildhoodQuastionaire";
import AcceptenceForm from "./forms/acceptenceForm";
import PTSDQuestionnaire from './forms/PTSDQuestionnaire';
import DepressionAssessment from './forms/depressionAssessment';
import MSPSSQuestionnaire from './forms/mspssquastionaire';
import ACEQuestionnaire from './forms/aceQuestionaire';
import HealthStatusQuestionnaire from './forms/healthStatusQuestionnaire';
import LeisureActivityQuestionnaire from './forms/leisureactivityquestionnaire';
import SubmitForm from './forms/sumbitForm';
import BriefQuastionaire from './forms/briefQuastionaire';
import Satisfactionquestionnaire from './forms/satisfactionquestionnaire';
import EndPage from './forms/endPage';

function App() {
  useEffect(() => {
    console.log("App loaded, trying to clear cookie");
  
    fetch('http://54.242.154.185:3002/clear-cookie', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => console.log(data.message || 'Cookie cleared'))
      .catch(err => console.error('Error clearing cookie:', err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AcceptenceForm />} />
        <Route path="/start" element={<MyForm />} />
        <Route path="/woman" element={<WomanForm/>}/>
        <Route path="/success" element={<SuccessPage />}/>
        <Route path="/personalform" element={<PersonalForm />} />
        <Route path="/medicalformfirst" element={<MedicalFormFirst/>}/>
        <Route path="/healthlifestyleform" element={<Healthlifestyleform/>}/>
        <Route path="/childhoodquastionaire" element={<ChildhoodQuastionaire/>}/>
        <Route path="/ptsdquestionnaire" element={<PTSDQuestionnaire/>}/>
        <Route path="/depressionassessment" element={<DepressionAssessment/>}/>
        <Route path="/mspssquastionaire" element={<MSPSSQuestionnaire />}/>
        <Route path="/acequastionaire" element={<ACEQuestionnaire/>}/>
        <Route path='/healthstatusquestionnaire' element={<HealthStatusQuestionnaire/>}/>
        <Route path='/leisureactivityquestionnaire' element={<LeisureActivityQuestionnaire/>}/>
        <Route path='/test_insert' element={<SubmitForm/>}/>
        <Route path='/briefquestionnaire' element={<BriefQuastionaire/>}/>
        <Route path='/satisfactionquestionnaire' element={<Satisfactionquestionnaire/>}/>
        <Route path='/endPage' element={<EndPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
