npm install jgpt

### JGPT Class

The `JGPT` class provides a convenient interface to interact with the OpenAI API and generate custom prompts based on given objects and commands.

#### Requirements

- The `openai` package.
- Environment variables with the OpenAI API key and organization ID.
- Node.js version compatible with the `openai` package.

#### Constructor: `new JGPT(apiKey, orgId)`

Create a new `JGPT` instance.

- `apiKey` (String): The OpenAI API key.
- `orgId` (String): The organization ID.

#### Method: `async prompt(object, command)`

Generates a prompt and returns the response from OpenAI's GPT-3.5-turbo model.

- `object` (Object): The data object to be used in the prompt.
- `command` (String): The specific command or query for the prompt.

##### Returns

- (String): The response from OpenAI's model.

##### Throws

- Error: If there's any error in generating the prompt or fetching the response.

#### Example Usage

```javascript
const jgpt = new JGPT(process.env.OPENAI_API_KEY, process.env.OPENAI_ORG_ID);

const randomObject = { number: Math.random() * 100, string: Math.random(), boolean: Math.random() < 0.5 };
const command = "Show me this info as an HTML doc";

jgpt.prompt(randomObject, command).then(result => console.log(result));
```

This code snippet creates an instance of `JGPT`, defines a random object, specifies a command, and prints the HTML document representation of the object.

#### Note

- Make sure to have your environment variables (`OPENAI_API_KEY`, `OPENAI_ORG_ID`) properly configured in your `.env` file.
- The method `prompt` returns a Promise. Make sure to handle it appropriately in your code.
- Error handling is essential for managing unexpected responses or other issues during execution.

This class provides a simple and effective way to leverage OpenAI's GPT-3.5-turbo model for various custom prompt creations based on provided data and commands.