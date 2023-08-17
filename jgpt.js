const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

class JGPT {
    constructor(apiKey, orgId) {
        const configuration = new Configuration({
            apiKey: apiKey,
            organization: orgId,
        });
        this.openai = new OpenAIApi(configuration);
    }
    async prompt(object, command) {
        try {
            const prompt = `Context: Here is my data: ${JSON.stringify(object)}. Guidelines: Only output information relevant to my data, do not explain or talk any more than necessary. Command: ${command}`;
            const response = await this.openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
            });
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error(error);
            throw new Error(`Error converting using GPT: ${error.message}`);
        }
    }
}
module.exports = JGPT;
