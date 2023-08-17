/*
 * DISCLAIMER: To use JGPT, you need to have a valid API key provided by OpenAI.
 * Please note that usage of the OpenAI API is not free, and you will be charged
 * according to their pricing model. Ensure you have read and understood OpenAI's
 * pricing details and usage limits before proceeding.
 */

const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();
const promptHeader = "output your response as follows {response: yourResponse, javascriptOutput: showJavascriptMethodOutputHere, ...}";


const readline = require('readline');

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
            console.log(`Bot: ${result}`);
            resolve(this.continueConversation());
        });
        });
    }

    start(context = ``) {
        this.continueConversation(context);
    }
}

class JGPT {
    constructor(apiKey, orgId) {
        const configuration = new Configuration({
            apiKey: apiKey,
            organization: orgId,
        });
        this.openai = new OpenAIApi(configuration);
    }

    async prompt(prompt) {
        try {
            const response = await this.openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: `${promptHeader} ${prompt}` }],
            });
            console.log(`${promptHeader} ${prompt}`)
            return JSON.parse(response.data.choices[0].message.content);
        } catch (error) {
            console.error(error);
            throw new Error(`Error converting using GPT: ${error.message}`);
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
    return await this.prompt(`${string}  Check if "${searchString} " is included at position ${position}`);
}
async indexOf(string, searchValue, fromIndex) {
    return await this.prompt(`${string} Find index of "${searchValue}" from index ${fromIndex}`);
}
async lastIndexOf(string, searchValue, fromIndex) {
    return await this.prompt(`${string} Find last index of "${searchValue}" from index ${fromIndex}`);
}
async match(string, regexp) {
    return await this.prompt(`${string} Match string with regex "${regexp}"`);
}
async replace(string, searchValue, replaceValue) {
    return await this.prompt(`${string} Replace "${searchValue}" with "${replaceValue}"`);
}
async slice(string, beginIndex, endIndex) {
    return await this.prompt(`${string} Slice string from ${beginIndex} to ${endIndex}`);
}
async split(string, separator, limit) {
    return await this.prompt(`${string} Split string by "${separator}" with limit ${limit}`);
}
async substr(string, start, length) {
    return await this.prompt(`${string} Get substring starting at ${start} with length ${length}`);
}
async toUpperCase(string) {
    return await this.prompt(`${string} Convert the following text to uppercase`);
}
async toLowerCase(string) {
    return await this.prompt(`${string} Convert string to lowercase`);
}
async trim(string) {
    return await this.prompt(`${string} Trim whitespace from string`);
}

// Array methods
async concat(array, ...values) {
    return await this.prompt(`Using this array: ${array} concatenate the following values ${values} as a javascript array `);
}
async every(array, callback) {
    return await this.prompt(`Using this array: ${array} Check every element with callback ${callback}`);
}
async filter(array, callback) {
    return await this.prompt(`Using this array: ${array} Filter array with callback ${callback}`);
}
async find(array, callback) {
    return await this.prompt(`Using this array: ${array} Find element in array with callback ${callback}`);
}
async findIndex(array, callback) {
    return await this.prompt(`Using this array: ${array} Find index in array with callback ${callback}`);
}
async forEach(array, callback) {
    return await this.prompt(`Using this array: ${array} For each element in array, apply callback ${callback}`);
}
async indexOf(array, searchElement, fromIndex) {
    return await this.prompt(`Using this array: ${array} Find index of "${searchElement}" from index ${fromIndex}`);
}
async join(array, separator) {
    return await this.prompt(`Using this array: ${array} Join array with separator "${separator}"`);
}
async lastIndexOf(array, searchElement, fromIndex) {
    return await this.prompt(`Using this array: ${array} Find last index of "${searchElement}" from index ${fromIndex}`);
}
async map(array, callback) {
    return await this.prompt(`Using this array: ${array} Map array with callback ${callback}`);
}
async pop(array) {
    return await this.prompt(`Using this array: ${array} Pop last element from array`);
}
async push(array, ...elements) {
    return await this.prompt(`Using this array: ${array} Push elements ${elements} to array`);
}
async reduce(array, callback, initialValue) {
    return await this.prompt(`Using this array: ${array} Reduce array with callback ${callback} and initial value ${initialValue}`);
}
async reverse(array) {
    return await this.prompt(`Using this array: ${array} Reverse array`);
}
async shift(array) {
    return await this.prompt(`Using this array: ${array} Shift first element from array`);
}
async slice(array, beginIndex, endIndex) {
    return await this.prompt(`Using this array: ${array} Slice array from ${beginIndex} to ${endIndex}`);
}
async some(array, callback) {
    return await this.prompt(`Using this array: ${array} Check if some elements in array satisfy callback ${callback}`);
}
async sort(array, compareFunction) {
    return await this.prompt(`Using this array: ${array} Sort array with compare function ${compareFunction}`);
}
async splice(array, start, deleteCount, ...items) {
    return await this.prompt(`Using this array: ${array} Splice array starting at ${start}, deleting ${deleteCount}, inserting ${items}`);
}
async unshift(array, ...elements) {
    return await this.prompt(`Using this array: ${array} Unshift elements ${elements} to array`);
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
