// src/Components/App.js
import React, { useState } from 'react';
import { sendSms } from './africasTalkingService';
import LoginPage from './LoginPage';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);

  const handleSendSms = async () => {
    if (!phoneNumber || !message) {
      setResponse({ error: 'Phone number and message are required.' });
      return;
    }

    try {
      const result = await sendSms(phoneNumber, message);
      setResponse(result);
    } catch (error) {
      setResponse({ error: 'Failed to send SMS' });
    }
  };

  return (
    <div className="App">
      {/* Render LoginPage component */}
      <LoginPage />

      {/* Send SMS Section */}
      <h1>Send SMS with Africa's Talking</h1>
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendSms}>Send SMS</button>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
