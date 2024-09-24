import React, { useState } from 'react';
import axios from 'axios';

const EnergyManagement = () => {
  const [usage, setUsage] = useState('');
  const [credits, setCredits] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const checkUsage = async () => {
    try {
      const response = await axios.post('https://api.africastalking.com/version1/messaging', {
        username: 'niceone', // Replace with your Africa's Talking username
        to: phoneNumber,
        message: 'Check Usage'
      }, {
        headers: {
          'apiKey': 'atsk_0d6485c5f33a29e34c98bf4f077b59e9251a8b250ff3b6e39232c4b04d4b579271ae84bb' // Replace with your Africa's Talking API key
        }
      });
      setUsage(response.data.SMSMessageData.Message);
    } catch (error) {
      console.error('Error checking usage', error);
    }
  };

  const purchaseCredits = async () => {
    try {
      const response = await axios.post('https://api.africastalking.com/version1/airtime/send', {
        username: 'niceone', // Replace with your Africa's Talking username
        recipients: [{
          phoneNumber: phoneNumber,
          amount: 'KES 10'
        }]
      }, {
        headers: {
          'apiKey': 'atsk_0d6485c5f33a29e34c98bf4f077b59e9251a8b250ff3b6e39232c4b04d4b579271ae84bb' // Replace with your Africa's Talking API key
        }
      });
      setCredits(response.data.responses[0].status);
    } catch (error) {
      console.error('Error purchasing credits', error);
    }
  };

  return (
    <div>
      <h1>Energy Management</h1>
      <input
        type="text"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={checkUsage}>Check Usage</button>
      <p>Current Usage: {usage}</p>
      <button onClick={purchaseCredits}>Purchase Credits</button>
      <p>Credits Purchased: {credits}</p>
    </div>
  );
};

export default EnergyManagement;
