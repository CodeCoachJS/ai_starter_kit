const express = require('express');
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.API_KEY });

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/chat', async (req, res) => {
	try {
		const userQuery = req.body.message; // Get user message from request body
		const completion = await openai.chat.completions.create({
			messages: [
				{
					role: 'user',
					content: userQuery,
				},
			],
			model: process.env.FT_MODEL_ID, // Use your fine-tuned model ID
		});

		res.send(completion.choices[0]); // Send the response back to the client
	} catch (error) {
		console.error(error);
		res.status(500).send('Error processing your request');
	}
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
