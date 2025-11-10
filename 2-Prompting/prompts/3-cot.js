import "dotenv/config";
import { OpenAI } from "openai/client.js";

const client = new OpenAI();

async function main() {
  const SYSTEM_PROMPT = `
    You are an AI assistant who works on START, THINK and OUTPUT strategy/format.
    For a given user query first think and breakdown the problem into sub problems/steps.
    You should also keep thinking and thinking before giving the actual output.
    Also, before outputing the final result to the user you must check once if everything is correct.

    Rules:
    - Strictly follow the output JSON format.
    - Always follow the output in sequence taht is START -> THINK -> EVALUATE -> OUTPUT.
    - After every think, there is going to be an EVALUATE step that is performed manually by someone and you need to wait for it.
    - Always perform only one step at a time and wait for the other step.
    - If you find any mistakes in your previous steps, correct them before moving to the next step.
    - Always make sure to do multiple steps of thinking before giving the final OUTPUT.

    Output JSON format:
    {"step": "START | THINK | EVALUATE | OUTPUT", "content": "string"}

    Example:
    User:Can you solve 3+4*10-4*3
    ASSISTANT:{"step":"START","content":"The user wants me to solve 3 + 4 * 10 -4 * 3 maths problem"}    
    ASSISTANT:{"step":"THINK","content":"This is typical math problem when we use BODMAS formula ofr calculation"}    
    ASSISTANT:{"step":"EVALUATE","content":"Alright, going good"}    
    ASSISTANT:{"step":"THINK","content":"Lets breakdown the problem step by step"}    
    ASSISTANT:{"step":"EVALUATE","content":"Alright, going good"}    
    ASSISTANT:{"step":"THINK","content":"As per boadmas, first we need to solve all multiplications and divisions"}    
    ASSISTANT:{"step":"EVALUATE","content":"Alright, going good"}    
    ASSISTANT:{"step":"THINK","content":"So, first we solve 4*10=40 and 4*3=12"}    
    ASSISTANT:{"step":"THINK","content":"Great, now the equation becomes 3+40-12"}    
    ASSISTANT:{"step":"EVALUATE","content":"Alright, going good"}    
    ASSISTANT:{"step":"THINK","content":"As per bodmas, now we solve additions and subtractions from left to right"}    
    ASSISTANT:{"step":"EVALUATE","content":"Alright, going good"}    
    ASSISTANT:{"step":"THINK","content":"So, first we solve 3+40=43"}
    ASSISTANT:{"step":"THINK","content":"Great, now the equation becomes 43-12"}
    ASSISTANT:{"step":"EVALUATE","content":"Alright, going good"}    
    ASSISTANT:{"step":"THINK","content":"Now we solve 43-12=31"}
    ASSISTANT:{"step":"EVALUATE","content":"Alright, going good"}    
    ASSISTANT:{"step":"OUTPUT","content":"The final answer to the equation 3 + 4 * 10 - 4 * 3 is 31"}
    `;

  const messages = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
    {
      role: "user",
      content: "Write a code to reverse a linked list in javascript ",
    },
  ];

  //   let maxIterations = 50; // safety to prevent infinite loops
  //   let iteration = 0;

  while (true) {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: messages,
    });
    const rawContent = response.choices[0].message.content;
    const parsedContent = JSON.parse(rawContent);

    //append the history: because chat models are stateless, we need to keep the history, so we append the latest response to the messages array

    messages.push({
      role: "assistant",
      content: JSON.stringify(parsedContent),
    });

    if (parsedContent.step === "START") {
      console.log(`🔥`, parsedContent.content);
      continue;
    }
    if (parsedContent.step === "THINK") {
      console.log(`🧠`, parsedContent.content);
      //#TODO : api call to external LLM or search engine can be made here to get more information, send the messages as history to GEMINI and ask for a review and append it to history
      //#TODO: LLM as a judge to validate the thinking process of current model
      messages.push({
        role: "developer",
        // content: "Alright, going good", //#TODO: here we can add feedback from external LLM or search engine
        content: JSON.stringify({
          step: "EVALUATE",
          content: "Alright, going good",
        }),
      });
      continue;
    }
    if (parsedContent.step === "OUTPUT") {
      console.log(`🤖`, parsedContent.content);
      break;
    }
  }
  console.log("D O N E");
}

main();

//# TODO: when our model is in think state, we can add some external LLM like gemini or perplexity web search etc to help it get more information and to make sure our current model is thinking in the right direction
