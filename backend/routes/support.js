// place a support call
const express = require(
'express'
)

const router = express.Router() ;

router.post('/call-support', async (req, res) => {
  const { to, message } = req.body;
  try {
    if (!process.env.TWILIO_ACCOUNT_SID) {
      return res.status(500).json({ error: 'Twilio not configured' });
    }

    // place a call that reads a message via TwiML
    const call = await twilioClient.calls.create({
      twiml: `<Response><Say>${message || 'Connecting to support'}</Say></Response>`,
      to: to,
      from: process.env.TWILIO_FROM_NUMBER
    });

    res.json({ sid: call.sid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'twilio error', details: err.message });
  }
});

// emergency SOS - send SMS & optionally call
router.post('/sos', async (req, res) => {
const { user_id, location, message } = req.body; // location could be coordinates or text
try {
const emergency = process.env.EMERGENCY_CONTACT;
if (!process.env.TWILIO_ACCOUNT_SID) return res.status(500).json({ error: 'Twilio not configured' });
const sms = await twilioClient.messages.create({
body: `SOS ALERT! ${message || ''} Location: ${location || 'Not provided'}`,
from: process.env.TWILIO_FROM_NUMBER,
to: emergency
});
// optional: place a call too
const call = await twilioClient.calls.create({
twiml: `<Response><Say>Emergency alert. A user has triggered SOS. Message: ${message || 'No message'}. Location: ${location || 'Not provided'}</Say></Response>`,
to: emergency,
from: process.env.TWILIO_FROM_NUMBER
});


// record a ticket
await pool.query('INSERT INTO support_tickets (user_id, subject, message, channel) VALUES (?, ?, ?, ?)', [user_id || null, 'SOS Alert', `Location: ${location}; message: ${message}`, 'sos']);


res.json({ smsSid: sms.sid, callSid: call.sid });
} catch (err) { console.error(err); res.status(500).json({ error: 'sos error', details: err.message }); }
});


// send email support from user
router.post('/email-support', async (req, res) => {
const { fromEmail, subject, message } = req.body;
try {
await transporter.sendMail({
from: fromEmail,
to: process.env.SMTP_USER,
subject: subject,
text: message
});
res.json({ success: true });
} catch (err) { console.error(err); res.status(500).json({ error: 'email error' }); }
});


module.exports = router;