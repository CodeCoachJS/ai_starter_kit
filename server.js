require('dotenv').config();
const OpenAI = require('openai');
const fs = require('fs');
const readline = require('readline');

const openai = new OpenAI({ apiKey: process.env.API_KEY });

const FT_JOB_ID = 'ftjob-D4CPx9e4Hwtlqroyt264Mi6O';

const FT_MODEL_ID = 'ft:gpt-3.5-turbo-0613:personal::7zuPTNEA';

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
			return;
		}
	}
	console.log('File is a valid JSONL file');
}

const main = async () => {
	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: 'user',
				content:
					'should i include previous work experience on my resume not related to tech?',
			},
		],
		model: FT_MODEL_ID,
	});
	console.log(completion.choices[0]);
};

main();
