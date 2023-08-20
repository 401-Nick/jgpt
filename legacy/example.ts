/*
 * DISCLAIMER: To use JGPT, you need to have a valid API key provided by OpenAI.
 * Please note that usage of the OpenAI API is not free, and you will be charged
 * according to their pricing model. Ensure you have read and understood OpenAI's
 * pricing details and usage limits before proceeding.
 */




const JGPT = require('./jgpt.ts');
require('dotenv').config();

async function main() {
    const jgpt = new JGPT(process.env.OPENAI_API_KEY, process.env.OPENAI_ORG_ID);
    try {
        const string = "Hello, World!";
        const searchString = "World";
        const position = 7;
        const includeResult = await jgpt.includes(string, searchString);
        console.log(`Includes searchString: ${includeResult.javascriptOutput}`); // Example output: Includes result: true
        
        
        jgpt.indexOf(string, searchString, position).then(result=>{
            console.log(`Index of result: ${result.javascriptOutput}`); // Example output: Index of result: 13
        })

        const sliceResult = await jgpt.slice(string, 0, 5);
        console.log(`Slice result: ${sliceResult.javascriptOutput}`); // Example output: Slice result: Hello

        // Array operations
        const array = [1, 2, 3, 4];
        const concatResult = await jgpt.concat(array, 5, 6);
        console.log(`Concat result: ${concatResult.javascriptOutput}`); // Example output: Concat result: [1, 2, 3, 4, 5, 6]

        const filterCallback = 'value > 2';
        const filterResult = await jgpt.filter(array, filterCallback);
        console.log(`Filter result: ${filterResult.javascriptOutput}`); // Example output: Filter result: [3, 4]
        

        jgpt.startConversation();
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
    }
}

main();
