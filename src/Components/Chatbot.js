import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const sendMessage = async () => {
    try {
      const res = await axios.post('https://api.africastalking.com/version1/messaging', {
        username: 'niceone', // Replace with your Africa's Talking username
        to: phoneNumber,
        message: message
      }, {
        headers: {
          'apiKey': 'atsk_0d6485c5f33a29e34c98bf4f077b59e9251a8b250ff3b6e39232c4b04d4b579271ae84bb' // Replace with your Africa's Talking API key
        }
      });
      setResponse(res.data.SMSMessageData.Message);
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  return (
    <div>
      <h1>Customer Support Chatbot</h1>
      <input
        type="text"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
      <p>Response: {response}</p>
    </div>
  );
};

export default Chatbot;
