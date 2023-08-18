const JGPT = require('./jgpt.js');
require('dotenv').config();
const jgpt = new JGPT(process.env.OPENAI_API_KEY);

test('(<= Fail: Improve Prompt!, Success, Good prompt! | prompt:includes method should return true when a string includes a substring', async () => {
    const result = await jgpt.includes('hello world', 'world');
    expect(result.javascriptOutput).toBe(true);
});

test('(<= Fail: Improve Prompt!, Success, Good prompt! | indexOf method should find the index of a substring', async () => {
    const result = await jgpt.indexOf('hello world', 'world');
    expect(result.javascriptOutput).toBe(6);
});

test('(<= Fail: Improve Prompt!, Success, Good prompt! | lastIndexOf method should find the last index of a substring', async () => {
    const result = await jgpt.lastIndexOf('world world world', 'world');
    expect(result.javascriptOutput).toBe(12);
});

test('(<= Fail: Improve Prompt!, Success, Good prompt! | match method should match string with regex', async () => {
    const result = await jgpt.match('hello world', 'world');
    expect(result.javascriptOutput).toEqual(['world']);
});

test('(<= Fail: Improve Prompt!, Success, Good prompt! | replace method should replace a substring', async () => {
    const result = await jgpt.replace('hello world', 'world', 'Nick');
    expect(result.javascriptOutput).toBe('hello Nick');
});

test('(<= Fail: Improve Prompt!, Success, Good prompt! | slice method should slice a string', async () => {
    const result = await jgpt.slice('hello world', 0, 5);
    expect(result.javascriptOutput).toBe('hello');
});

test('(<= Fail: Improve Prompt!, Success, Good prompt! | split method should split a string', async () => {
    const result = await jgpt.split('hello world', ' ');
    expect(result.javascriptOutput).toEqual(['hello', 'world']);
});

test('(<= Fail: Improve Prompt!, Success, Good prompt! | substr method should get a substring', async () => {
    const result = await jgpt.substr('hello world', 0, 5);
    expect(result.javascriptOutput).toBe('hello');
});

test('(<= Fail: Improve Prompt!, Success, Good prompt! | toUpperCase method should convert a string to uppercase', async () => {
    const result = await jgpt.toUpperCase('hello world');
    expect(result.javascriptOutput).toBe('HELLO WORLD');
});

test('(<= Fail: Improve Prompt!, Success, Good prompt! | toLowerCase method should convert a string to lowercase', async () => {
    const result = await jgpt.toLowerCase('HELLO WORLD');
    expect(result.javascriptOutput).toBe('hello world');
});

test('(<= Fail: Improve Prompt!, Success, Good prompt! | trim method should trim whitespace from a string', async () => {
    const result = await jgpt.trim('  hello world  ');
    expect(result.javascriptOutput).toBe('hello world');
});


//Array Tests////////////////////////////////////////////////////////
// concat
test('(<= Fail: Improve Prompt!, Success, Good prompt! | concat method should concatenate values to an array', async () => {
    const result = await jgpt.concat([1, 2], [3, 4]);
    expect(result.javascriptOutput).toEqual([1, 2, 3, 4]);
});

// every
test('(<= Fail: Improve Prompt!, Success, Good prompt! | every method should check if all elements satisfy the condition', async () => {
    const result = await jgpt.every([2, 4, 6], 'x => x % 2 === 0');
    expect(result.javascriptOutput).toBe(true);
});

//Filter
//Find
//FindIndex
//forEach

// indexOf
test('(<= Fail: Improve Prompt!, Success, Good prompt! | indexOf method should find the index of a value', async () => {
    const result = await jgpt.indexOf([1, 2, 3], 2);
    expect(result.javascriptOutput).toBe(1);
});

// join
test('(<= Fail: Improve Prompt!, Success, Good prompt! | join method should join an array with a separator', async () => {
    const result = await jgpt.join([1, 2, 3], '-');
    expect(result.javascriptOutput).toBe('1-2-3');
});

// reverse
test('(<= Fail: Improve Prompt!, Success, Good prompt! | reverse method should reverse an array', async () => {
    const result = await jgpt.reverse([1, 2, 3]);
    expect(result.javascriptOutput).toEqual([3, 2, 1]);
});

// shift
test('(<= Fail: Improve Prompt!, Success, Good prompt! | shift method should remove the first element from an array', async () => {
    const result = await jgpt.shift([1, 2, 3]);
    expect(result.javascriptOutput).toEqual([2, 3]);
});

// splice
test('(<= Fail: Improve Prompt!, Success, Good prompt! | splice method should splice the array', async () => {
    const result = await jgpt.splice([1, 2, 3], 1, 1, [4, 5]);
    expect(result.javascriptOutput).toEqual([1, 4, 5, 3]);
});