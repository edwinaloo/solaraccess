import React from 'react';
import EnergyManagement from './Components/EnergyManagement';
import Chatbot from './Components/Chatbot';
import './App.css'; // Add this for custom styling

const App = () => {
  return (
    <div className="app-container">
      <EnergyManagement />
      <Chatbot />
    </div>
  );
};

export default App;
