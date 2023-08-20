/*
 * DISCLAIMER: To use JGPT, you need to have a valid API key provided by OpenAI.
 * Please note that usage of the OpenAI API is not free, and you will be charged
 * according to their pricing model. Ensure you have read and understood OpenAI's
 * pricing details and usage limits before proceeding.
 */
import readline, {Interface} from 'readline';
import OpenAI from 'openai';

require('dotenv').config();
const promptHeader = "output your response as follows {response: yourResponse, javascriptOutput: showJavascriptMethodOutputHere, ...}";




class Conversation {
    jgpt: JGPT;
    userInput: Interface;
    constructor(jgpt: JGPT) {
        this.jgpt = jgpt;
        this.userInput = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        });
    }

    async continueConversation(context: string) {
        userInput: Interface;

        return new Promise<void>((resolve) => {
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
    openai: OpenAI;
    constructor(apiKey: string, ) {
        this.openai = new OpenAI({
            apiKey: apiKey
        });
    }

    async prompt(prompt: string, max_tokens = 500) {
        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                max_tokens: max_tokens,
                messages: [
                    { role: 'system', content: "You are a javascript interpreter, only respond in the following example format {response: \"Here is the output of the method output you asked for\", javascriptOutput: ['array', 'here']}"}, 
                    { role: 'user', content: `${promptHeader} ${prompt}` }
                ],
            });
            try {
                if (response.choices[0].message.content !== null) {
                    return JSON.parse(response.choices[0].message.content);
                } else {
                    // Handle the null value as needed
                }
            } catch {
                return response.choices[0].message.content;
            }
        } catch (err) {
            console.error(err);
        }
    }

//Custom tools
async command(object: string, command:string) {
    const prompt = `Context: Here is my data: ${JSON.stringify(object)}: Command: ${command}`;
    return await this.prompt(prompt);
}
async talk(prompt: string){
    return await this.prompt(prompt);
}
    startConversation() {
        const conversation = new Conversation(this);
        conversation.start();
    }
}
module.exports = JGPT;
