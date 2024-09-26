// src/services/africasTalkingService.js

import axios from 'axios';

const AFRICAS_TALKING_USERNAME = 'Sandbox';
const AFRICAS_TALKING_API_KEY = 'atsk_d21495ba02265507760c6c01a98edcfc3a68eb1422f874031ae2701d6fe6125da1d919df';

// Use the correct base URL for Africa's Talking
const africasTalkingApi = axios.create({
  baseURL: 'https://api.africastalking.com/version1/messaging', // Use the correct API endpoint
  headers: {
    'apiKey': AFRICAS_TALKING_API_KEY,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export const sendSms = async (to, message) => {
  try {
    const response = await africasTalkingApi.post('', { // Adjusted to post to the correct endpoint
      username: AFRICAS_TALKING_USERNAME,
      to,
      message,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};
