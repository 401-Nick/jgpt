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


    //
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
        }            
    }

//Custom tools
async command(object, command) {
    const prompt = `Context: Here is my data: ${JSON.stringify(object)}: Command: ${command}`;
    return await this.prompt(prompt);
}
async talk(prompt){
    return await this.prompt(prompt);
}


// String methods
async includes(string, searchString, position) {
    return await this.prompt(`set: {javascriptOutput: ('${string}'.includes('${searchString}', '${position}')})`); 
}
async indexOf(string, searchValue, fromIndex='') {
    return await this.prompt(`set {javascriptOutput: '${string}'.indexOf('${searchValue}', '${fromIndex}')}`);
}
async lastIndexOf(string, searchValue, fromIndex) {
    return await this.prompt(`${string} Find last index of "${searchValue}" from index ${fromIndex} set {javascriptOutput: '${string}'.lastIndexOf('${searchValue}', '${fromIndex}')} // Example Output: 9` );
}

async match(string, regexp) {
    return await this.prompt(`${string} Match string with regex "${regexp}" set {javascriptOutput: '${string}'.match('${regexp}')} // Example Output: ['matched']`);
}

async replace(string, searchValue, replaceValue) {
    return await this.prompt(`${string} Replace "${searchValue}" with "${replaceValue}" set {javascriptOutput: '${string}'.replace('${searchValue}', '${replaceValue}')} // Example Output: 'newString'`);
}

async slice(string, beginIndex, endIndex) {
    return await this.prompt(`${string} Slice string from ${beginIndex} to ${endIndex} set {javascriptOutput: '${string}'.slice('${beginIndex}', '${endIndex}')} // Example Output: 'substring'`);
}

async split(string, separator, limit) {
    console.log(`{javascriptOutput: '${string}'.split('${separator}', ${limit})}`)
    return await this.prompt(`Return the following response {response: "split method returned!, javascriptOutput: '${string}'.split('${separator}', ${limit})}`);
}

async substr(string, start, length) {
    return await this.prompt(`${string} Get substring starting at ${start} with length ${length} set {javascriptOutput: '${string}'.substr('${start}', '${length}')} // Example Output: 'substring'`);
}

async toUpperCase(string) {
    return await this.prompt(`${string} Convert the following text to uppercase set {javascriptOutput: '${string}'.toUpperCase()} // Example Output: 'UPPERCASE'`);
}

async toLowerCase(string) {
    return await this.prompt(`${string} Convert string to lowercase set {javascriptOutput: '${string}'.toLowerCase()} // Example Output: 'lowercase'`);
}

async trim(string) {
    return await this.prompt(`${string} Trim whitespace from string set {javascriptOutput: '${string}'.trim()} // Example Output: 'trimmedString'`);
}


// Array methods
async concat(array, ...values) {
    return await this.prompt(`Using this array: ${array} concatenate the following values ${values} set as an array {javascriptOutput: ${array}.concat(${values})}`);
}

async every(array, callback) {
    return await this.prompt(`Using this array: ${array} Check every element with callback ${callback} set as an array {javascriptOutput: ${array}.every(${callback})}`);
}

async filter(array, callback) {
    return await this.prompt(`Using this array: ${array} Filter array with callback ${callback} set as an array {javascriptOutput: ${array}.filter(${callback})}`);
}

async find(array, callback) {
    return await this.prompt(`Using this array: ${array} Find element in array with callback ${callback} set as an array {javascriptOutput: ${array}.find(${callback})}`);
}

async findIndex(array, callback) {
    return await this.prompt(`Using this array: ${array} Find index in array with callback ${callback} set as an array {javascriptOutput: ${array}.findIndex(${callback})}`);
}

async forEach(array, callback) {
    return await this.prompt(`Using this array: ${array} For each element in array, apply callback ${callback} set as an array {javascriptOutput: ${array}.forEach(${callback})}`);
}

async indexOf(array, searchElement, fromIndex) {
    return await this.prompt(`Using this array: ${array} Find index of "${searchElement}" from index ${fromIndex} set as an array {javascriptOutput: ${array}.indexOf('${searchElement}', '${fromIndex}')}`);
}

async join(array, separator) {
    return await this.prompt(`Using this array: ${array} Join array with separator "${separator}" set as an array {javascriptOutput: ${array}.join('${separator}')}`);
}

async lastIndexOf(array, searchElement, fromIndex) {
    return await this.prompt(`Using this array: ${array} Find last index of "${searchElement}" from index ${fromIndex} set as an array {javascriptOutput: ${array}.lastIndexOf('${searchElement}', '${fromIndex}')}`);
}

async map(array, callback) {
    return await this.prompt(`Using this array: ${array} Map array with callback ${callback} set as an array {javascriptOutput: ${array}.map(${callback})}`);
}

async pop(array) {
    return await this.prompt(`Using this array: ${array} Pop last element from array set as an array {javascriptOutput: ${array}.pop()}`);
}

async push(array, ...elements) {
    return await this.prompt(`Using this array: ${array} Push elements ${elements} to array set as an array {javascriptOutput: ${array}.push(${elements})}`);
}

async reduce(array, callback, initialValue) {
    return await this.prompt(`Using this array: ${array} Reduce array with callback ${callback} and initial value ${initialValue} set as an array {javascriptOutput: ${array}.reduce(${callback}, ${initialValue})}`);
}

async reverse(array) {
    return await this.prompt(`Using this array: ${array} Reverse array set as an array {javascriptOutput: ${array}.reverse()}`);
}

async shift(array) {
    return await this.prompt(`Using this array: ${array} Shift first element from array set as an array {javascriptOutput: ${array}.shift()}`);
}

async slice(array, beginIndex, endIndex) {
    return await this.prompt(`Using this array: ${array} Slice array from ${beginIndex} to ${endIndex} set as an array {javascriptOutput: ${array}.slice('${beginIndex}', '${endIndex}')}`);
}

async some(array, callback) {
    return await this.prompt(`Using this array: ${array} Check if some elements in array satisfy callback ${callback} set as an array {javascriptOutput: ${array}.some(${callback})}`);
}

async sort(array, compareFunction) {
    return await this.prompt(`Using this array: ${array} Sort array with compare function ${compareFunction} set as an array {javascriptOutput: ${array}.sort(${compareFunction})}`);
}

async splice(array, start, deleteCount, ...items) {
    return await this.prompt(`Using this array: ${array} Splice array starting at ${start}, deleting ${deleteCount}, inserting ${items} set as an array {javascriptOutput: ${array}.splice('${start}', '${deleteCount}', ${items})}`);
}

async unshift(array, ...elements) {
    return await this.prompt(`Using this array: ${array} Unshift elements ${elements} to array set as an array {javascriptOutput: ${array}.unshift(${elements})}`);
}



//Number Methods
async toExponential(number, fractionDigits) {
    return await this.prompt(`${number} Convert to exponential form with ${fractionDigits} fraction digits`);
}

async toFixed(number, digits) {
    return await this.prompt(`${number} Fix to ${digits} decimal places`);
}

async toLocaleString(number, locales, options) {
    return await this.prompt(`${number} Convert to locale string with locales ${locales} and options ${JSON.stringify(options)}`);
}

async toPrecision(number, precision) {
    return await this.prompt(`${number} Convert to precision ${precision}`);
}



//Date Methods
async getDate(date) {
    return await this.prompt(`What would this be in JavaScript: getDate(${date})? !!ONLY SHOW THE OUTPUT as json!!`);
}

async getDay(date) {
    return await this.prompt(`What would this be in JavaScript: getDay(${date})? !!ONLY SHOW THE OUTPUT as json!!`);
}

async getFullYear(date) {
    return await this.prompt(`What would this be in JavaScript: getFullYear(${date})? !!ONLY SHOW THE OUTPUT as json!!`);
}

async getHours(date) {
    return await this.prompt(`What would this be in JavaScript: getHours(${date})? !!ONLY SHOW THE OUTPUT as json!!`);
}

async getMilliseconds(date) {
    return await this.prompt(`What would this be in JavaScript: getMilliseconds(${date})? !!ONLY SHOW THE OUTPUT!!`);
}

async getMinutes(date) {
    return await this.prompt(`What would this be in JavaScript: getMinutes(${date})? !!ONLY SHOW THE OUTPUT!!`);
}

async getMonth(date) {
    return await this.prompt(`What would this be in JavaScript: getMonth(${date})? !!ONLY SHOW THE OUTPUT!!`);
}

async getSeconds(date) {
    return await this.prompt(`What would this be in JavaScript: getSeconds(${date})? !!ONLY SHOW THE OUTPUT!!`);
}

async getTime(date) {
    return await this.prompt(`What would this be in JavaScript: getTime(${date})? !!ONLY SHOW THE OUTPUT!!`);
}


// // Setting Methods
// async setDate(date, dayValue) {
//     return await this.prompt(`${date} Set the date to ${dayValue}`);
// }

// async setFullYear(date, yearValue) {
//     return await this.prompt(`${date} Set the full year to ${yearValue}`);
// }

// async setHours(date, hoursValue) {
//     return await this.prompt(`${date} Set the hours to ${hoursValue}`);
// }

// async setMilliseconds(date, millisecondsValue) {
//     return await this.prompt(`${date} Set the milliseconds to ${millisecondsValue}`);
// }

// async setMinutes(date, minutesValue) {
//     return await this.prompt(`${date} Set the minutes to ${minutesValue}`);
// }

// async setMonth(date, monthValue) {
//     return await this.prompt(`${date} Set the month to ${monthValue}`);
// }

// async setSeconds(date, secondsValue) {
//     return await this.prompt(`${date} Set the seconds to ${secondsValue}`);
// }

// async setTime(date, millisecondsValue) {
//     return await this.prompt(`${date} Set the time to ${millisecondsValue} since January 1, 1970`);
// }


    startConversation() {
        const conversation = new Conversation(this);
        conversation.start();
    }
}
module.exports = JGPT;
