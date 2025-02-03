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
import AcceptenceForm from "./forms/acceptenceForm"
import PTSDQuestionnaire from './forms/PTSDQuestionnaire';
import DepressionAssessment from './forms/depressionAssessment';
import MSPSSQuestionnaire  from './forms/mspssquastionaire';
import ACEQuestionnaire from './forms/aceQuestionaire';
import HealthStatusQuestionnaire from './forms/healthStatusQuestionnaire';
import LeisureActivityQuestionnaire from './forms/leisureactivityquestionnaire';


// Create this component

function App() {
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
          <Route path='/healthstatusquestionnaire' element = {<HealthStatusQuestionnaire/>}/>
          <Route path='/leisureactivityquestionnaire' element = {<LeisureActivityQuestionnaire/>}/>

      </Routes>
    </Router>
  );
}

export default App;