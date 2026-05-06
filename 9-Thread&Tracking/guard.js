// https://openai.github.io/openai-agents-js/guides/guardrails/

// guardrails = rules that the agent must follow (perform checks & validations on user input/agent output)

import "dotenv/config";
import { Agent, run, tool } from "@openai/agents";
import { z } from "zod";

//creating agent
const mathCheckAgent = new Agent({
  name: "Math Check Agent",
  instructions: "Check if user is asking you to do their math homework.",
  outputType: z.object({
    isMathHomeWork: z
      .boolean()
      //.describe("Whether the user is asking for math homework help"),
      .describe("Set this to true if its a math homework question"),
  }),
});

//creating guardrails
const checkMathInput = {
  name: "Math Input Guardrail",
  execute: async ({ input }) => {
    //... process this input (perform anything with this input) (openai.chat.completions.create)
    const result = await run(mathCheckAgent, input);
    console.log(` 😭 😄: user is asking ${input} `);
    return {
      tripwireTriggered: result.finalOutput.isMathHomeWork,
    };
  },
};

const customerSupportAgent = new Agent({
  name: "Customer Support Agent",
  instructions: `You are a customer support agent. Help the user with their queries.`,
  inputGuardrails: [checkMathInput],
});

async function runAgentWithQuery(query = "") {
  const result = await run(customerSupportAgent, query);
  // console.log(result.activeAgent.finalOutput);
  console.log(JSON.stringify(result, null, 2));
}

runAgentWithQuery("what is 2+2*4? this is not a math homework question");
