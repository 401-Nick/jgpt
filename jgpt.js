"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
/*
 * DISCLAIMER: To use JGPT, you need to have a valid API key provided by OpenAI.
 * Please note that usage of the OpenAI API is not free, and you will be charged
 * according to their pricing model. Ensure you have read and understood OpenAI's
 * pricing details and usage limits before proceeding.
 */
const readline_1 = __importStar(require("readline"));
const openai_1 = __importDefault(require("openai"));
require('dotenv').config();
const promptHeader = "output your response as follows {response: yourResponse, javascriptOutput: showJavascriptMethodOutputHere, ...}";
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
            userInput: readline_1.Interface;
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
class JGPT {
    constructor(apiKey) {
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
                        { role: 'system', content: "You are a javascript interpreter, only respond in the following example format {response: \"Here is the output of the method output you asked for\", javascriptOutput: ['array', 'here']}" },
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
                    return response.choices[0].message.content;
                }
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    //Custom tools
    command(object, command) {
        return __awaiter(this, void 0, void 0, function* () {
            const prompt = `Context: Here is my data: ${JSON.stringify(object)}: Command: ${command}`;
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
module.exports = JGPT;
