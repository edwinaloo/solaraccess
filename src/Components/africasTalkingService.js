// src/services/africasTalkingService.js

import axios from 'axios';

const AFRICAS_TALKING_USERNAME = 'your_username';
const AFRICAS_TALKING_API_KEY = 'your_api_key';

const africasTalkingApi = axios.create({
  baseURL: 'https://api.africastalking.com/version1',
  headers: {
    'apiKey': AFRICAS_TALKING_API_KEY,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export const sendSms = async (to, message) => {
  try {
    const response = await africasTalkingApi.post('/messaging', {
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
