import React from 'react';
import EnergyManagement from './Components/EnergyManagement';
import Chatbot from './Components/Chatbot';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <EnergyManagement />
      <Chatbot />
    </div>
  );
};

export default App;
