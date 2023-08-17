const JGPT = require('./jgpt.js');
require('dotenv').config();

const jgpt = new JGPT(process.env.OPENAI_API_KEY, process.env.OPENAI_ORG_ID);

const randomObject = { number: Math.random() * 100, string: Math.random(), boolean: Math.random() < 0.5 };
const command = "Show me this info as an HTML doc";

jgpt.prompt(randomObject, command).then(result => console.log(result));
