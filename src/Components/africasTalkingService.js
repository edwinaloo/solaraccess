// src/services/africasTalkingService.js

import axios from 'axios';

const AFRICAS_TALKING_USERNAME = 'niceone';
const AFRICAS_TALKING_API_KEY = 'atsk_d21495ba02265507760c6c01a98edcfc3a68eb1422f874031ae2701d6fe6125da1d919df';

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
