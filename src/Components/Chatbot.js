import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    const res = await axios.post('/api/chatbot', { message });
    setResponse(res.data.response);
  };

  return (
    <div>
      <h1>Customer Support Chatbot</h1>
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
