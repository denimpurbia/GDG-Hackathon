require('dotenv').config();
const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Access your API key from the .env file
const gemini_api_key = process.env.API_KEY;

if (!gemini_api_key) {
  console.error('API key is not defined. Please check your .env file.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(gemini_api_key);

async function generateAIResponse(prompt) {
  const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

// Define the POST route for AI responses
router.post('/ai', async (req, res) => {
  console.log('🤖 Jarvis API called - Request body:', req.body);
  
  // Accept both 'prompt' and 'message' as input for flexibility
  const prompt = req.body.prompt || req.body.message;

  if (!prompt) {
    console.warn('⚠️ Jarvis API: No prompt provided');
    return res.status(400).json({ 
      error: 'Prompt is required',
      response: 'Please provide a question or message.',
      suggestions: ["Book Hotel", "Find Attractions", "Search Food", "Safety Help"]
    });
  }

  console.log('🤖 Jarvis API: Generating response for prompt:', prompt);

  try {
    const aiText = await generateAIResponse(prompt);
    console.log('✅ Jarvis API: Successfully generated response');

    // Context-aware suggestions based on prompt
    const suggestions = ["Book Hotel", "Find Attractions", "Search Food", "Safety Help"];
    const bookingOptions = [];

    res.status(200).json({
      response: aiText,
      suggestions: suggestions,
      bookingOptions: bookingOptions
    });

  } catch (error) {
    console.error('❌ Jarvis API Error:', error);
    console.error('Error details:', error.message, error.stack);
    res.status(500).json({ 
      error: 'Failed to generate AI response',
      response: error.message || 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.',
      suggestions: ["Try again", "Book Hotel", "Find Attractions"]
    });
  }
});

// Test endpoint to verify route is working
router.get('/ai/test', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Jarvis AI route is working!',
    geminiKeySet: !!process.env.API_KEY
  });
});

module.exports = router;