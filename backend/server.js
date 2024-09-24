const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Mock data
let currentUsage = 50;
let purchasedCredits = 0;

app.get('/api/usage', (req, res) => {
  res.json({ usage: currentUsage });
});

app.post('/api/purchase-credits', (req, res) => {
  const { amount } = req.body;
  purchasedCredits += amount;
  res.json({ credits: purchasedCredits });
});

app.post('/api/chatbot', (req, res) => {
  const { message } = req.body;
  let response = 'Sorry, I did not understand that.';
  if (message.toLowerCase().includes('bill')) {
    response = 'Your current bill is $20.';
  } else if (message.toLowerCase().includes('top-up')) {
    response = 'You can top up your credits by visiting our website.';
  }
  res.json({ response });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
