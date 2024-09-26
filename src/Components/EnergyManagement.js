import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const EnergyManagement = () => {
  const [usage, setUsage] = useState('');
  const [credits, setCredits] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://127.0.0.1:5000'; // Update this with your actual ngrok URL

  const checkUsage = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/check-usage`, { phoneNumber });
      setUsage(response.data.message);
    } catch (error) {
      console.error('Error checking usage', error);
      setUsage('Error retrieving usage');
    } finally {
      setLoading(false);
    }
  };

  const purchaseCredits = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/purchase-credits`, { phoneNumber });
      setCredits(response.data.status);
    } catch (error) {
      console.error('Error purchasing credits', error);
      setCredits('Error purchasing credits');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Energy Management</h1>
      <input
        type="text"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="input"
      />
      <button onClick={checkUsage} className="button" disabled={loading}>
        {loading ? 'Loading...' : 'Check Usage'}
      </button>
      <p>Current Usage: {usage}</p>
      <button onClick={purchaseCredits} className="button" disabled={loading}>
        {loading ? 'Loading...' : 'Purchase Credits'}
      </button>
      <p>Credits Purchased: {credits}</p>
    </div>
  );
};

export default EnergyManagement;
