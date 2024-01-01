require('dotenv').config();

const OpenAI = require('openai');

const fs = require('fs');

const readline = require('readline');

const openai = new OpenAI({ apiKey: process.env.API_KEY });

async function validateJSONL(file) {
	const fileStream = fs.createReadStream(file);

	const rl = readline.createInterface({
		input: fileStream,

		crlfDelay: Infinity,
	});

	let lineNumber = 0;

	for await (const line of rl) {
		lineNumber++;

		try {
			JSON.parse(line);
		} catch (e) {
			console.error(
				`Invalid JSON object at line ${lineNumber}: ${e.message}`
			);

			return false;
		}
	}

	console.log('File is a valid JSONL file');

	return true;
}

async function uploadDataset() {
	if (await validateJSONL('career_chat.jsonl')) {
		const status = await openai.files.create({
			file: fs.createReadStream('careerchat.jsonl'),

			purpose: 'fine-tune',
		});

		console.log(status);

		return status.id;
	}

	return null;
}

async function fineTuneModel(trainingFileId) {
	const fineTune = await openai.fineTuning.jobs.create({
		training_file: trainingFileId,

		model: 'gpt-3.5-turbo',
	});

	console.log(fineTune);

	// Wait for the email confirmation that the fine-tuning is complete before proceeding.
}

async function getModelCompletion(modelId) {
	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: 'user',

				content:
					'should i include previous work experience on my resume not related to tech?',
			},
		],

		model: modelId,
	});

	console.log(completion.choices[0].message.content);
}

// Uncomment the function you want to run based on the step you're at:

// uploadDataset(); // Step 1: Upload the dataset

// fineTuneModel('YOUR_FILE_ID'); // Step 2: Fine-tune the model. Replace 'YOUR_FILE_ID' with the file ID from the previous step.

// getModelCompletion('YOUR_FINE_TUNED_MODEL_ID'); // Step 3: Get a completion. Replace 'YOUR_FINE_TUNED_MODEL_ID' with the model ID from the email.
