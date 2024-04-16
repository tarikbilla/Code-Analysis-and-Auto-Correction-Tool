const express = require('express');
const router = express.Router();
const { Configuration, OpenAI } = require("openai"); 
require("dotenv").config(); 

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
}); 

router.post('/', async (req, res) => {
    try {
        const { code, language } = req.body;
        const GPTOutput = await openai.chat.completions.create({ 
            model: "gpt-3.5-turbo", 
            messages: [{ role: "user", content: `Provide a detailed analysis of this ${language} code, including syntax, methods, and identifiers: ${code}` }]
        }); 

        // console.log("GPTOutput:", JSON.stringify(GPTOutput, null, 2));

        // Correctly accessing the message content
        const output_text = GPTOutput.choices[0].message.content;

        res.json({ result: output_text });
    } catch (error) {
        console.error('Error analyzing code:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
