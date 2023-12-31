/*
 * DISCLAIMER: To use JGPT, you need to have a valid API key provided by OpenAI.
 * Please note that usage of the OpenAI API is not free, and you will be charged
 * according to their pricing model. Ensure you have read and understood OpenAI's
 * pricing details and usage limits before proceeding.
 */
import readline, { Interface } from 'readline';
import OpenAI from 'openai';

import dotenv from 'dotenv';
dotenv.config();
const promptHeader = ``;
const systemPrompt = `You are a travel assistant. `
console.log(systemPrompt);

//Above the return command will not do any execution, just an experiment
class Conversation {
    constructor(jgpt) {
        this.jgpt = jgpt;
        this.userInput = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    async continueConversation(context) {
        return new Promise((resolve) => {
            this.userInput.question("You: ", async (input) => {
                if (input.toLowerCase() === 'exit') {
                    this.userInput.close();
                    console.log('Exiting conversation.');
                    resolve();
                    return;
                }
                const result = await this.jgpt.talk(`, ${input}, (here is additional context: ${context})`);
                console.log(`Bot: ${result.response}`);
                resolve(this.continueConversation(''));
            });
        });
    }

    start(context = ``) {
        this.continueConversation(context);
    }
}

class JGPT {

    constructor(apiKey) {
        if (!apiKey) {
            throw new Error('OPENAI_API_KEY is not defined in the environment variables');
        }
        this.openai = new OpenAI({
            apiKey: apiKey
        });
    }

    async prompt(prompt, max_tokens = 500) {
        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                max_tokens: max_tokens,
                messages: [
                    { role: 'system', content: `${systemPrompt}` },
                    { role: 'user', content: `${promptHeader} ${prompt}` }
                ],
            });
            try {
                if (response.choices[0].message.content !== null) {
                    return response.choices[0].message.content;
                } else {
                    // Handle the null value as needed
                }
            } catch {
                console.log("failed to parse as JSON");
                return response.choices[0].message.content;
            }
        } catch (err) {
            console.error(err);
        }
    }

    //Custom tools
    async command(command, context) {
        const prompt = `Command: ${command} Context: ${JSON.stringify(context)}: `;
        return await this.prompt(prompt);
    }
    async talk(prompt) {
        return await this.prompt(prompt);
    }
    startConversation() {
        const conversation = new Conversation(this);
        conversation.start();
    }
}
export default JGPT;