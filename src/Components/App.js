import React from 'react';
import './App.css';
import logo from './logo.svg';
import EnergyManagement from './EnergyManagement';
import Chatbot from './Chatbot';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
        <EnergyManagement />
        <Chatbot />
      </main>
    </div>
  );
}

export default App;
