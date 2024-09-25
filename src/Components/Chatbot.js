import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Add this for custom styling

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Customer Support Chatbot</h1>
      <input
        type="text"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="input"
      />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        className="input"
      />
      <button onClick={sendMessage} className="button" disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
      <p>Response: {response}</p>
    </div>
  );
};

export default Chatbot;
