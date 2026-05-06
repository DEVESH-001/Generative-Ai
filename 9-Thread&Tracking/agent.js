//Threads are nothing but a way to keep track of the conversation history(like in chatgpt we can create multiple threads(history of conversations))

import "dotenv/config";
import { Agent, run } from "@openai/agents";

//load messages from database
let database = [];

const CustomerSupportAgent = new Agent({
  name: "Customer Support Agent",
  instructions: `You are a customer support agent. Help the user with their queries.`,
});

// run agent with query
async function runAgentWithQuery(query = "") {
  console.log("Database:", database);

  const result = await run(
    CustomerSupportAgent,
    database.concat({ role: "user", content: query }),
  );
  database = result.history;
  console.log("Result:", result.finalOutput);
}

runAgentWithQuery("My name is Devesh").then(() => {
  runAgentWithQuery("what's my name");
});
