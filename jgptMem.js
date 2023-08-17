const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

class JGPTMem {
    constructor(apiKey, orgId) {
        this.shortTermMemory = "";
        const configuration = new Configuration({
            apiKey: apiKey,
            organization: orgId,
        });
        this.openai = new OpenAIApi(configuration);
    }
    async talk(userInput) {
        try {
            const overridePrompt = `If I type shortterm, I want you to show you current GPT API Short Term memory.`;
            const prompt = `
            (Most important commands: ${overridePrompt})
            GPT API Short Term memory: ${this.shortTermMemory}
            (It is essential to continuously update the condensed memory with new sorted and your interactions with the user with little to no loss of data)
            (Write to current short term memory, including the current interaction.)     
            The User's question: ${userInput}
            ONLY respond in the format: {"condensedMemory":condensedSummary, "response": "your answer"}`;
            const response = await this.openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
            });
            const result = JSON.parse(response.data.choices[0].message.content);
            return result.response;
        } catch (error) {
            console.error(error);
            throw new Error(`Error converting using GPT: ${error.message}`);
        }
    }    
}

module.exports = JGPTMem;
