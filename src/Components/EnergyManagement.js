import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Add this for custom styling

const EnergyManagement = () => {
  const [usage, setUsage] = useState('');
  const [credits, setCredits] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  // Replace this URL with your ngrok URL or deployed backend URL
  const API_URL = 'https://your-ngrok-url'; // Update this with your actual ngrok URL

  const checkUsage = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/check-usage`, { phoneNumber }); // Using the check usage endpoint
      setUsage(response.data.message); // Set the returned message from the API
    } catch (error) {
      console.error('Error checking usage', error);
      setUsage('Error retrieving usage'); // Display error message
    } finally {
      setLoading(false);
    }
  };

  const purchaseCredits = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/purchase-credits`, { phoneNumber }); // Using the purchase credits endpoint
      setCredits(response.data.status); // Set the status of the purchase
    } catch (error) {
      console.error('Error purchasing credits', error);
      setCredits('Error purchasing credits'); // Display error message
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
