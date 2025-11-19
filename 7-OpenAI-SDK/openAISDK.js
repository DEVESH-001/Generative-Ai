//https://openai.github.io/openai-agents-js/

import { Agent, run } from "@openai/agents";
import "dotenv/config";

const cookingAgent = new Agent({
  name: "Cooking Assistant",
  instructions: `
    You are a helpful cooking assistant. Provide recipes and cooking tips based on user requests. Provide clear and concise instructions. If users ask for specific dietary needs, accommodate them in your responses. If user asks anything unrelated to cooking, politely inform them that you can only assist with cooking-related queries.
    `,
});

async function chatWithAgent(query) {
  const result = await run(cookingAgent, query); //run is provided by @openai/agents
  console.log(result.finalOutput);
}
chatWithAgent("Can you suggest a recipe for a eggs?");
