"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = void 0;
/*
 * DISCLAIMER: To use JGPT, you need to have a valid API key provided by OpenAI.
 * Please note that usage of the OpenAI API is not free, and you will be charged
 * according to their pricing model. Ensure you have read and understood OpenAI's
 * pricing details and usage limits before proceeding.
 */
const readline_1 = __importDefault(require("readline"));
const openai_1 = __importDefault(require("openai"));
require('dotenv').config();
const promptHeader = ``;
const systemPrompt = `Your job is to respond in JSON the following way. Do not add \\n\n:
{
    "messageToUser": your response here, //This is the place for conversation.
    "returnData":  {...}, //This is the place for data.
    "returnCommand": "", //This command will be executed in a sandboxed environment and the result will be returned to the user, you have atonomy to do whatever you want with this command, you're in javascript
}`;
console.log(systemPrompt);
//Above the return command will not do any execution, just an experiment
class Conversation {
    constructor(jgpt) {
        this.jgpt = jgpt;
        this.userInput = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    continueConversation(context) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.userInput.question("You: ", (input) => __awaiter(this, void 0, void 0, function* () {
                    if (input.toLowerCase() === 'exit') {
                        this.userInput.close();
                        console.log('Exiting conversation.');
                        resolve();
                        return;
                    }
                    const result = yield this.jgpt.talk(`, ${input}, (here is additional context: ${context})`);
                    console.log(`Bot: ${result.response}`);
                    resolve(this.continueConversation(''));
                }));
            });
        });
    }
    start(context = ``) {
        this.continueConversation(context);
    }
}
exports.Conversation = Conversation;
class JGPT {
    constructor(apiKey) {
        if (!apiKey) {
            throw new Error('OPENAI_API_KEY is not defined in the environment variables');
        }
        this.openai = new openai_1.default({
            apiKey: apiKey
        });
    }
    prompt(prompt, max_tokens = 500) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.openai.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    max_tokens: max_tokens,
                    messages: [
                        { role: 'system', content: `${systemPrompt}` },
                        { role: 'user', content: `${promptHeader} ${prompt}` }
                    ],
                });
                try {
                    if (response.choices[0].message.content !== null) {
                        return JSON.parse(response.choices[0].message.content);
                    }
                    else {
                        // Handle the null value as needed
                    }
                }
                catch (_a) {
                    console.log("failed to parse as JSON");
                    return response.choices[0].message.content;
                }
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    //Custom tools
    command(command, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const prompt = `Command: ${command} Context: ${JSON.stringify(context)}: `;
            return yield this.prompt(prompt);
        });
    }
    talk(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(prompt);
        });
    }
    startConversation() {
        const conversation = new Conversation(this);
        conversation.start();
    }
}
exports.default = JGPT;
module.exports = JGPT;
