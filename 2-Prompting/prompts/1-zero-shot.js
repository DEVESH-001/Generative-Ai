import "dotenv/config";
import { OpenAI } from "openai/client.js";

const client = new OpenAI();
// or we can use gemini api in same openai: https://ai.google.dev/gemini-api/docs/openai#javascript

async function main() {
  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: `You're an AI assistant expert in coding with Javascript. You only and only know javascript as coding language.

    If user asks anything other than Javascript coding question, Do not answer that and respond with "I can only answer Javascript coding questions. "`,
      },
      { role: "user", content: "What is Hoisting in javascript" },
    ],
  });
  console.log(response.choices[0].message.content);
}
main();
