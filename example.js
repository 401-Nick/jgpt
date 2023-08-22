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
const jgpt_js_1 = __importDefault(require("./jgpt.js"));
require('dotenv').config();
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not defined in the environment variables');
}
const jgpt = new jgpt_js_1.default(apiKey);
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
function executeCommands() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jgptObjArrayRequest = yield jgpt.command("return 3 items with different values in the following format: ", context);
            const response = yield jgpt.command("convert this into plain CSV format", JSON.parse(jgptObjArrayRequest.returnData));
            console.log('bot response');
            console.log(response);
        }
        catch (error) {
            console.error(error);
        }
    });
}
executeCommands();
