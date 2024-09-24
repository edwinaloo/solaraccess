import React, { useState } from 'react';
import axios from 'axios';

const EnergyManagement = () => {
  const [usage, setUsage] = useState('');
  const [credits, setCredits] = useState('');

  const checkUsage = async () => {
    const response = await axios.get('/api/usage');
    setUsage(response.data.usage);
  };

  const purchaseCredits = async () => {
    const response = await axios.post('/api/purchase-credits', { amount: 10 });
    setCredits(response.data.credits);
  };

  return (
    <div>
      <h1>Energy Management</h1>
      <button onClick={checkUsage}>Check Usage</button>
      <p>Current Usage: {usage}</p>
      <button onClick={purchaseCredits}>Purchase Credits</button>
      <p>Credits Purchased: {credits}</p>
    </div>
  );
};

export default EnergyManagement;
