import  JGPT from './jgpt.js';
require('dotenv').config();
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not defined in the environment variables');
}

const jgpt = new JGPT(apiKey);

const testObj = `const person = {
    name: "John",
    age: 30,
    city: "New York",
    skills: {
        html: "Moderate",
        css: "Moderate",
        js: "Moderate"
    }
};`

jgpt.command(testObj, "convert this to russian").then((response) => {console.log(response)});