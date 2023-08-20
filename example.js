"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jgpt_js_1 = __importDefault(require("./jgpt.js"));
require('dotenv').config();
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not defined in the environment variables');
}
const jgpt = new jgpt_js_1.default(apiKey);
const testObj = `const person = {
    name: "John",
    age: 30,
    city: "New York",
    skills: {
        html: "Moderate",
        css: "Moderate",
        js: "Moderate"
    }
};`;
jgpt.command(testObj, "convert this to russian").then((response) => { console.log(response); });
