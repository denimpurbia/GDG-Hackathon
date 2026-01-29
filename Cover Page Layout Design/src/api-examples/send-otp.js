// Example API endpoint for sending OTP via SMS
// This is a Node.js/Express example that you can implement on your backend

// 1. TWILIO IMPLEMENTATION
const twilio = require('twilio');

// Twilio credentials (replace with your actual credentials)
const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const client = twilio(accountSid, authToken);

async function sendOTPViaTwilio(req, res) {
  try {
    const { to, otp, message } = req.body;
    
    const smsMessage = await client.messages.create({
      body: message || `Your Rajasthan Travel verification code is: ${otp}. Valid for 5 minutes.`,
      from: 'YOUR_TWILIO_PHONE_NUMBER', // Your Twilio phone number
      to: to
    });

    res.json({
      success: true,
      sid: smsMessage.sid,
      message: 'OTP sent successfully'
    });
  } catch (error) {
    console.error('Twilio SMS Error:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

// 2. MSG91 IMPLEMENTATION (Popular in India)
const axios = require('axios');

async function sendOTPViaMSG91(req, res) {
  try {
    const { to, otp } = req.body;
    
    const response = await axios.post('https://control.msg91.com/api/v5/otp', {
      template_id: 'YOUR_TEMPLATE_ID', // Your MSG91 template ID
      mobile: to.replace('+91', ''), // Remove country code for MSG91
      otp: otp
    }, {
      headers: {
        'authkey': 'YOUR_MSG91_AUTH_KEY',
        'Content-Type': 'application/json'
      }
    });

    res.json({
      success: true,
      requestId: response.data.request_id,
      message: 'OTP sent successfully'
    });
  } catch (error) {
    console.error('MSG91 SMS Error:', error);
    res.status(400).json({
      success: false,
      error: error.response?.data?.message || error.message
    });
  }
}

// 3. FAST2SMS IMPLEMENTATION (Indian SMS service)
async function sendOTPViaFast2SMS(req, res) {
  try {
    const { to, otp } = req.body;
    
    const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
      route: 'otp',
      variables_values: otp,
      flash: 0,
      numbers: to.replace('+91', '') // Remove country code
    }, {
      headers: {
        'authorization': 'YOUR_FAST2SMS_API_KEY',
        'Content-Type': 'application/json'
      }
    });

    res.json({
      success: response.data.return,
      requestId: response.data.request_id,
      message: 'OTP sent successfully'
    });
  } catch (error) {
    console.error('Fast2SMS Error:', error);
    res.status(400).json({
      success: false,
      error: error.response?.data?.message || error.message
    });
  }
}

// Express.js route setup
const express = require('express');
const app = express();

app.use(express.json());

// Choose your SMS provider
app.post('/api/send-otp', sendOTPViaTwilio); // or sendOTPViaMSG91 or sendOTPViaFast2SMS

module.exports = { sendOTPViaTwilio, sendOTPViaMSG91, sendOTPViaFast2SMS };