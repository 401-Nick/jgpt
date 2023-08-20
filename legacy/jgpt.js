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
    //
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
    // String methods
    includes(string, searchString, position) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`set: {javascriptOutput: ('${string}'.includes('${searchString}', '${position}')})`);
        });
    }
    indexOf(string, searchValue, fromIndex = '') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`set {javascriptOutput: '${string}'.indexOf('${searchValue}', '${fromIndex}')}`);
        });
    }
    lastIndexOf(string, searchValue, fromIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`${string} Find last index of "${searchValue}" from index ${fromIndex} set {javascriptOutput: '${string}'.lastIndexOf('${searchValue}', '${fromIndex}')} // Example Output: 9`);
        });
    }
    match(string, regexp) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`${string} Match string with regex "${regexp}" set {javascriptOutput: '${string}'.match('${regexp}')} // Example Output: ['matched']`);
        });
    }
    replace(string, searchValue, replaceValue) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`${string} Replace "${searchValue}" with "${replaceValue}" set {javascriptOutput: '${string}'.replace('${searchValue}', '${replaceValue}')} // Example Output: 'newString'`);
        });
    }
    slice(string, beginIndex, endIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`${string} Slice string from ${beginIndex} to ${endIndex} set {javascriptOutput: '${string}'.slice('${beginIndex}', '${endIndex}')} // Example Output: 'substring'`);
        });
    }
    split(string, separator, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`{javascriptOutput: '${string}'.split('${separator}', ${limit})}`);
            return yield this.prompt(`Return the following response {response: "split method returned!, javascriptOutput: '${string}'.split('${separator}', ${limit})}`);
        });
    }
    substr(string, start, length) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`${string} Get substring starting at ${start} with length ${length} set {javascriptOutput: '${string}'.substr('${start}', '${length}')} // Example Output: 'substring'`);
        });
    }
    toUpperCase(string) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`${string} Convert the following text to uppercase set {javascriptOutput: '${string}'.toUpperCase()} // Example Output: 'UPPERCASE'`);
        });
    }
    toLowerCase(string) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`${string} Convert string to lowercase set {javascriptOutput: '${string}'.toLowerCase()} // Example Output: 'lowercase'`);
        });
    }
    trim(string) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`${string} Trim whitespace from string set {javascriptOutput: '${string}'.trim()} // Example Output: 'trimmedString'`);
        });
    }
    // Array methods
    concat(array, ...values) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`Using this array: ${array} concatenate the following values ${values} set as an array {javascriptOutput: ${array}.concat(${values})}`);
        });
    }
    every(array, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`Using this array: ${array} Check every element with callback ${callback} set as an array {javascriptOutput: ${array}.every(${callback})}`);
        });
    }
    filter(array, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`Using this array: ${array} Filter array with callback ${callback} set as an array {javascriptOutput: ${array}.filter(${callback})}`);
        });
    }
    find(array, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`Using this array: ${array} Find element in array with callback ${callback} set as an array {javascriptOutput: ${array}.find(${callback})}`);
        });
    }
    findIndex(array, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`Using this array: ${array} Find index in array with callback ${callback} set as an array {javascriptOutput: ${array}.findIndex(${callback})}`);
        });
    }
    forEach(array, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`Using this array: ${array} For each element in array, apply callback ${callback} set as an array {javascriptOutput: ${array}.forEach(${callback})}`);
        });
    }
    // async indexOf(array: string, searchElement: string, fromIndex: string) {
    //     return await this.prompt(`Using this array: ${array} Find index of "${searchElement}" from index ${fromIndex} set as an array {javascriptOutput: ${array}.indexOf('${searchElement}', '${fromIndex}')}`);
    // }
    join(array, separator) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`Using this array: ${array} Join array with separator "${separator}" set as an array {javascriptOutput: ${array}.join('${separator}')}`);
        });
    }
    // async lastIndexOf(array: string, searchElement: string, fromIndex: string) {
    //     return await this.prompt(`Using this array: ${array} Find last index of "${searchElement}" from index ${fromIndex} set as an array {javascriptOutput: ${array}.lastIndexOf('${searchElement}', '${fromIndex}')}`);
    // }
    map(array, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`Using this array: ${array} Map array with callback ${callback} set as an array {javascriptOutput: ${array}.map(${callback})}`);
        });
    }
    pop(array) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`Using this array: ${array} Pop last element from array set as an array {javascriptOutput: ${array}.pop()}`);
        });
    }
    push(array, ...elements) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`Using this array: ${array} Push elements ${elements} to array set as an array {javascriptOutput: ${array}.push(${elements})}`);
        });
    }
    reduce(array, callback, initialValue) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`Using this array: ${array} Reduce array with callback ${callback} and initial value ${initialValue} set as an array {javascriptOutput: ${array}.reduce(${callback}, ${initialValue})}`);
        });
    }
    reverse(array) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`Using this array: ${array} Reverse array set as an array {javascriptOutput: ${array}.reverse()}`);
        });
    }
    shift(array) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`Using this array: ${array} Shift first element from array set as an array {javascriptOutput: ${array}.shift()}`);
        });
    }
    // async slice(array, beginIndex, endIndex) {
    //     return await this.prompt(`Using this array: ${array} Slice array from ${beginIndex} to ${endIndex} set as an array {javascriptOutput: ${array}.slice('${beginIndex}', '${endIndex}')}`);
    // }
    some(array, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`Using this array: ${array} Check if some elements in array satisfy callback ${callback} set as an array {javascriptOutput: ${array}.some(${callback})}`);
        });
    }
    sort(array, compareFunction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`Using this array: ${array} Sort array with compare function ${compareFunction} set as an array {javascriptOutput: ${array}.sort(${compareFunction})}`);
        });
    }
    splice(array, start, deleteCount, ...items) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`Using this array: ${array} Splice array starting at ${start}, deleting ${deleteCount}, inserting ${items} set as an array {javascriptOutput: ${array}.splice('${start}', '${deleteCount}', ${items})}`);
        });
    }
    unshift(array, ...elements) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`Using this array: ${array} Unshift elements ${elements} to array set as an array {javascriptOutput: ${array}.unshift(${elements})}`);
        });
    }
    //Number Methods
    toExponential(number, fractionDigits) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`${number} Convert to exponential form with ${fractionDigits} fraction digits`);
        });
    }
    toFixed(number, digits) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`${number} Fix to ${digits} decimal places`);
        });
    }
    toLocaleString(number, locales, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`${number} Convert to locale string with locales ${locales} and options ${JSON.stringify(options)}`);
        });
    }
    toPrecision(number, precision) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`${number} Convert to precision ${precision}`);
        });
    }
    //Date Methods
    getDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`What would this be in JavaScript: getDate(${date})? !!ONLY SHOW THE OUTPUT as json!!`);
        });
    }
    getDay(date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`What would this be in JavaScript: getDay(${date})? !!ONLY SHOW THE OUTPUT as json!!`);
        });
    }
    getFullYear(date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`What would this be in JavaScript: getFullYear(${date})? !!ONLY SHOW THE OUTPUT as json!!`);
        });
    }
    getHours(date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`What would this be in JavaScript: getHours(${date})? !!ONLY SHOW THE OUTPUT as json!!`);
        });
    }
    getMilliseconds(date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`What would this be in JavaScript: getMilliseconds(${date})? !!ONLY SHOW THE OUTPUT!!`);
        });
    }
    getMinutes(date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`What would this be in JavaScript: getMinutes(${date})? !!ONLY SHOW THE OUTPUT!!`);
        });
    }
    getMonth(date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`What would this be in JavaScript: getMonth(${date})? !!ONLY SHOW THE OUTPUT!!`);
        });
    }
    getSeconds(date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`What would this be in JavaScript: getSeconds(${date})? !!ONLY SHOW THE OUTPUT!!`);
        });
    }
    getTime(date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prompt(`What would this be in JavaScript: getTime(${date})? !!ONLY SHOW THE OUTPUT!!`);
        });
    }
    startConversation() {
        const conversation = new Conversation(this);
        conversation.start();
    }
}
module.exports = JGPT;
