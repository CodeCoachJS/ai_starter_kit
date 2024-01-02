## Using OpenAI API to Build Your Own Fine Tuned Model

### Introduction

OpenAI has an API that powers ChatGPT. But what if you wanted to use your OWN model? One that you've trained on your own data to answer questions based on previous answers.

Can you imagine the possibilities? Custom chat bots? A resume assistant? A content creation generator?

Let's get started.

### Prerequisites

-   Node.js installed
-   OpenAI API key https://platform.openai.com/

### Steps to Get Started

1. **Environment Setup**:

    - Install the OpenAI Node.js package: `npm install openai`.
    - Set up your `.env` file with `API_KEY=your_openai_api_key`.

2. **Data Preparation**:

    - You can use the `example.js` file as a starting point to create your model.
    - Your data should be in JSONL format. Each line is a separate JSON object. Look at `career_chat.jsonl` as an example.
    - Use the `validateJSONL` function to ensure your data is in the correct format.

3. **Upload Dataset**:

    - Use the `uploadDataset` function to upload your JSONL file. This function will return a file ID.

4. **Fine-Tune the Model**:

    - Call `fineTuneModel` with the file ID from the previous step.
    - Wait for an email confirmation from OpenAI stating that fine-tuning is complete.

5. **Generate Completions**:
    - Use the `getModelCompletion` function with your fine-tuned model ID to generate completions.

### Video Walkthrough:

https://www.loom.com/embed/2a08588964154ff48e00dc942100c375?sid=29572858-2a5a-40c0-97d2-90391dc9db08

### Use Cases

-   Building a chatbot for specific domains like career advice.
-   Creating a content generation tool tailored to your style or needs.
-   Enhancing customer support with automated, but personalized responses.

### Using Your Own Data

-   Format your data in JSONL format.
-   Ensure each line in your dataset represents a conversation or data point.
-   Use diverse examples to cover a wide range of scenarios.

### Steps to Create Your Own Model

1. Prepare your dataset in JSONL format.
2. Validate and upload your dataset using the provided functions.
3. Fine-tune the model with your dataset.
4. Test the model with the `getModelCompletion` function.

Remember, fine-tuning allows you to tailor the OpenAI model to specific needs or domains, making your AI application more relevant and effective.
