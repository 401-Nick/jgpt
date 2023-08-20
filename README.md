The `JGPT` package is a wrapper around the OpenAI API, specifically designed to facilitate and parse natural language interactions with GPT. The package is built using TypeScript and is organized into two main classes: `Conversation` and `JGPT`.

### `JGPT` Class:

1. **Constructor**: Accepts an API key as a string. An error is thrown if the key is not provided.
2. **`prompt` Method**: Allows querying the GPT-3.5-turbo model by accepting a prompt and optional token limit. It returns a parsed JSON response or raw content based on the data received.
3. **`command` and `talk` Methods**: Custom tools for specific interactions with the GPT model, allowing for more structured conversation prompts.
4. **`startConversation` Method**: Initializes a conversation using the `Conversation` class.

### `Conversation` Class:

1. **Constructor**: Accepts a `JGPT` instance and sets up user input and output streams.
2. **`continueConversation` Method**: An asynchronous method that continuously prompts the user for input, passes it to the GPT model via the `JGPT` class, and prints the response. It also handles the "exit" command to terminate the conversation.
3. **`start` Method**: Initiates the conversation loop.

### Disclaimer:

Usage of the package requires a valid OpenAI API key, and charges apply according to OpenAI's pricing model. Users must understand OpenAI's pricing and usage limits before utilizing this package.
