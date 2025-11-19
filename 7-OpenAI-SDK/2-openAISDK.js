//https://openai.github.io/openai-agents-js/

import { Agent, run, tool } from "@openai/agents";
import "dotenv/config";
import { z } from "zod";

const getCurrentTime = tool({
  name: "get_Current_Time",
  description: "Returns the current time in HH:MM:SS format",
  parameters: z.object({}),
  async execute() {
    return new Date().toLocaleTimeString(); //toLocaleTimeString returns time in HH:MM:SS format
  },
});

const getWeatherTool = tool({
  name: "get_weather",
  description: "Get the weather for a given city",
  parameters: z.object({ city: z.string() }),
  async execute({ city }) {
    return `The weather in ${city} is sunny.`;
  },
});

const getMenuTool = tool({
  name: "get_menu",
  description: "Fetches and returns the menu items",
  //   parameters: z.object({ restaurant: z.string() }),
  parameters: z.object({}),
  async execute() {
    return {
      Drinks: {
        Cappuccino: "$3.00",
        Latte: "$3.50",
        Espresso: "$2.50",
      },
      Breakfast: {
        Pancakes: "$5.00",
        Omelette: "$6.00",
        "Fruit Bowl": "$4.00",
      },
      Lunch: {
        "Caesar Salad": "$7.00",
        "Grilled Chicken Sandwich": "$8.50",
        "Veggie Wrap": "$7.50",
      },
    };
  },
});

const cookingAgent = new Agent({
  name: "Cooking Assistant",
  model: "gpt-4.1-mini",
  tools: [getCurrentTime, getWeatherTool, getMenuTool],
  instructions: `
    You are a helpful cooking assistant. Provide recipes and cooking tips based on user requests. Provide clear and concise instructions. If users ask for specific dietary needs, accommodate them in your responses. If user asks anything unrelated to cooking, politely inform them that you can only assist with cooking-related queries.
    `,
});

const codingAgent= new Agent({
  name:"Coding Agent",
  instructions:`
  You are an expert coding assistant particularly in Typescript.
  `,
  //making cookingAgent the tool of codingAgent, useful for transfering the query to cookingAgent. I guess in real-life we will never make an agent a tool of another agent, beacuse we have to focus on one task at a time. [https://openai.github.io/openai-agents-js/guides/tools/#3-agents-as-tools]
  tools:[cookingAgent]
})

//https://openai.github.io/openai-agents-js/guides/handoffs/
const gateWay =  Agent.create({
  name:"Gateway Agent",
  instructions: `
  You are a gateway agent. You will be provided with a query and you will have to determine which agent to use based on the query.
  `,
  handoffs:[cookingAgent,codingAgent] // handoffs are the agents that can be used to handle the query
})

async function chatWithAgent(query) {
  const result = await run(gateWay, query); //run is provided by @openai/agents
  console.log(`History`, result.history); //result.history contains the full conversation history

  console.log(result.finalOutput);
}
//chatWithAgent("Can you suggest a recipe for a eggs?");
chatWithAgent(
  "Depending on the current time in India, suggest me a breakfast recipe. Also what all items are available in menu?"
); // here we are calling llm and tools[time&weather]