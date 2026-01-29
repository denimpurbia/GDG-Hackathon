require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function listModels() {
  try {
    const models = await genAI.listModels();
    console.log(models);
  } catch (err) {
    console.error(err);
  }
}

listModels();