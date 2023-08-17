## This is a WIP. Right now the return object will most of the time be unusuable
My intention is the following:
jgpt.includes("Hello, World!", "World", 7) -- GPT Response: true

Current output:
jgpt.includes("Hello, World!", "World", 7) -- GPT Response: Sure! Here's a Python code snip...

# JGPT Documentation

JGPT leverages OpenAI's GPT models to allow developers to use natural language processing (NLP) directly within JavaScript. It emphasizes idea over syntax, providing a more intuitive approach to programming.

## Installation
Before using JGPT, you must obtain a valid API key from OpenAI and understand OpenAI's pricing details.

## Classes

### `class JGPT`

The main class that holds all the methods for interacting with natural language.

#### Constructor

```javascript
constructor(apiKey, orgId)
```

##### Parameters
- `apiKey` (String) - Your OpenAI API key.
- `orgId` (String) - Your OpenAI organization ID.

#### Methods

##### String Methods

String Methods
- `includes(string, searchString, position)`: Checks if a string includes another at a specific position.
- `indexOf(string, searchValue, fromIndex)`: Finds the index of a value in a string.
- `lastIndexOf(string, searchValue, fromIndex)`: Finds the last index of a value in a string.
- `match(string, regexp)`: Matches a string with a regular expression.
- `replace(string, searchValue, replaceValue)`: Replaces a value in a string with another.
- `slice(string, beginIndex, endIndex)`: Slices a string between two indices.
- `split(string, separator, limit)`: Splits a string by a separator with an optional limit.
- `substr(string, start, length)`: Gets a substring starting at a specific index with a specific length.
- `toUpperCase(string)`: Converts a string to uppercase.
- `toLowerCase(string)`: Converts a string to lowercase.
- `trim(string)`: Trims whitespace from a string.

##### Array Methods
- `concat(array, ...values)`: Concatenates values to an array.
- `every(array, callback)`: Checks every element with a callback.
- `filter(array, callback)`: Filters an array with a callback.
- `find(array, callback)`: Finds an element in an array with a callback.
- `findIndex(array, callback)`: Finds an index in an array with a callback.
- `forEach(array, callback)`: Applies a callback to each element in an array.
- `indexOf(array, searchElement, fromIndex)`: Finds the index of a value in an array.
- `join(array, separator)`: Joins an array with a separator.
- `lastIndexOf(array, searchElement, fromIndex)`: Finds the last index of a value in an array.
- `map(array, callback)`: Maps an array with a callback.
- `pop(array)`: Pops the last element from an array.
- `push(array, ...elements)`: Pushes elements to an array.
- `reduce(array, callback, initialValue)`: Reduces an array with a callback and initial value.
- `reverse(array)`: Reverses an array.
- `shift(array)`: Shifts the first element from an array.
- `slice(array, beginIndex, endIndex)`: Slices an array between two indices.
- `some(array, callback)`: Checks if some elements in an array satisfy a callback.
- `sort(array, compareFunction)`: Sorts an array with a compare function.
- `splice(array, start, deleteCount, ...items)`: Splices an array starting at an index, deleting a count, inserting items.
- `unshift(array, ...elements)`: Unshifts elements to an array.

##### Number Methods
- `toExponential(number, fractionDigits)`: Converts to exponential form with specific fraction digits.
- `toFixed(number, digits)`: Fixes to specific decimal places.
- `toLocaleString(number, locales, options)`: Converts to a locale string with locales and options.
- `toPrecision(number, precision)`: Converts to a specific precision.

##### Date Methods
- `getDate(date)`: Gets the date.
- `getDay(date)`: Gets the day.
- `getFullYear(date)`: Gets the full year.
- `getHours(date)`: Gets the hours.
- `getMilliseconds(date)`: Gets the milliseconds.
- `getMinutes(date)`: Gets the minutes.
- `getMonth(date)`: Gets the month.
- `getSeconds(date)`: Gets the seconds.
- `getTime(date)`: Gets the time.

### `class Conversation`

A helper class to manage ongoing conversations with JGPT.

#### Methods
- `continueConversation(context)`: Continues a conversation with JGPT.
- `start(context)`: Starts a new conversation with JGPT.

## Usage Example

```javascript
const JGPT = require('jgpt');
const jgpt = new JGPT('your-api-key', 'your-org-id');
jgpt.includes("Hello, World!", "World", 7).then(console.log);
```

## Conclusion
JGPT offers a unique way to interact with JavaScript using natural language, making development more approachable and user-friendly. Whether you're a seasoned developer or just getting started, JGPT brings the power of AI-driven language models directly to your JavaScript environment.
