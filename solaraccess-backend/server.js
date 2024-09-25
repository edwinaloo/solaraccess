const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Insert your Africa's Talking credentials here
const AFRICASTALKING_USERNAME = 'your_username'; // Replace with your Africa's Talking username
const AFRICASTALKING_API_KEY = 'your_api_key'; // Replace with your Africa's Talking API key

// Endpoint to check usage via SMS
app.post('/check-usage', async (req, res) => {
    const { phoneNumber } = req.body; // Expect phone number from request body
    try {
        // Sending SMS to check usage
        const response = await axios.post('https://api.africastalking.com/version1/messaging', {
            username: AFRICASTALKING_USERNAME,
            to: phoneNumber,
            message: 'Check Usage' // Message content
        }, {
            headers: {
                'apiKey': AFRICASTALKING_API_KEY // Use your Africa's Talking API key
            }
        });

        // Sending back the response message
        res.json({ message: response.data.SMSMessageData.Message });
    } catch (error) {
        console.error('Error checking usage:', error);
        res.status(500).json({ error: 'Error checking usage' });
    }
});

// Endpoint to purchase credits
app.post('/purchase-credits', async (req, res) => {
    const { phoneNumber } = req.body; // Expect phone number from request body
    try {
        // Purchasing airtime credits
        const response = await axios.post('https://api.africastalking.com/version1/airtime/send', {
            username: AFRICASTALKING_USERNAME,
            recipients: [{
                phoneNumber: phoneNumber,
                amount: 'KES 10' // Specify the amount to purchase
            }]
        }, {
            headers: {
                'apiKey': AFRICASTALKING_API_KEY // Use your Africa's Talking API key
            }
        });

        // Sending back the status of credit purchase
        res.json({ status: response.data.responses[0].status });
    } catch (error) {
        console.error('Error purchasing credits:', error);
        res.status(500).json({ error: 'Error purchasing credits' });
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
