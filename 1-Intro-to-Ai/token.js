// `In this code we will see how to use tiktoken library to encode and decode text, which is used in openai models for tokenization`

import { Tiktoken } from "js-tiktoken/lite"; //https://www.npmjs.com/package/js-tiktoken
import o200k_base from "js-tiktoken/ranks/o200k_base";

//encoder
//const enc = new Tiktoken(o200k_base);
// const userQuery = "Hey There, I am  Devesh Yadav";
// const tokens = enc.encode(userQuery);

//decoder
const inputTokens = [
  25216, 3274, 11, 357, 939, 220, 1516, 3350, 71, 865, 110810,
];
const enc = new Tiktoken(o200k_base);

const decoded = enc.decode(inputTokens);

console.log({ decoded });
