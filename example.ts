import  JGPT from './jgpt.js';
require('dotenv').config();
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not defined in the environment variables');
}

const jgpt = new JGPT(apiKey);

const context = JSON.stringify({
    name: "John",
    age: 30,
    city: "New York",
    skills: {
        html: "Moderate",
        css: "Moderate",
        js: "Moderate"
    }
});

async function executeCommands() {
    try {
        const jgptObjArrayRequest = await jgpt.command("return 3 items with different values in the following format: ", context);
        const response = await jgpt.command("convert this into plain CSV format", JSON.parse(jgptObjArrayRequest.returnData));
        console.log('bot response');
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

executeCommands();