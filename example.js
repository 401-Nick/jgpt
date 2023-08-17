const readline = require('readline');
const JGPTMem = require('./jgptMem.js');
require('dotenv').config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const jgptBot = new JGPTMem(process.env.OPENAI_API_KEY, process.env.OPENAI_ORG_ID);

const continueConversation = () => {
    rl.question("You: ", (userInput) => {
        jgptBot.talk(userInput).then(result => {
            console.log(`Bot: ${result}`);
            continueConversation();
        });
    });
};

// Start the conversation
continueConversation();
