// routes/analyze.js
const express = require('express');
const router = express.Router();
const { Configuration, OpenAI  } = require("openai"); 
const readlineSync = require("readline-sync"); 
require("dotenv").config(); 

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

async function analyzeCode(code, language) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Update the model ID as required
            messages: [{ role: "user", content: `Analyze this ${language} code: ${code}` }],
        });
        return response.choices[0].message;
    } catch (error) {
        console.error("Error in analyzeCode:", error);
        throw error;
    }
}

async function detectErrors(code, language) {
    try {
        const { code, language } = req.body;
        console.log(req.body);
        const GPTOutput =  await openai.chat.completions.create({ 
            model: "gpt-3.5-turbo", 
            messages: [{ role: "user", content: `Analyze this ${language} code: ${code}` }], 
        }); 
        const output_text = GPTOutput.data.choices[0].message.content; 

        res.json({ output_text});
        console.log("output: ",GPTOutput);
    } catch (error) {
        console.error('Error analyzing code:', error);

        res.status(500).json({ message: error.message });
    }
}

async function provideSuggestions(code, language) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `Analyze this ${language} code: ${code}` }],
        });
        return response.choices[0].message;
    } catch (error) {
        console.error("Error in provideSuggestions:", error);
        throw error;
    }
}

module.exports = {
    analyzeCode,
    detectErrors,
    provideSuggestions
};
