//https://docs.langchain.com/oss/javascript/langgraph/install
//npm i @langchain/core @langchain/langgraph @langchain/openai @langchai/community
//https://docs.langchain.com/oss/javascript/integrations/chat/openai

import { ChatOpenAI } from "@langchain/openai";
import { StateGraph, Annotation } from "@langchain/langgraph";
import "dotenv/config";
import { HumanMessage } from "langchain";

// const GraphAnnotation = Annotation.Root({
//   messages: Annotation({
//     reducer: (current, update) => current.concat(update), // accumulate messages
//     default: () => [],
//   }),
// });

async function createDeveshJiAgent() {
  const llm = new ChatOpenAI({
    model: "gpt-4.1-mini",
    temperature: 0,
    // other params...
  });
}

//graphs are collections of nodes that are connected to each other in some way.
// we have to create nodes, nodes are building blocks of graphs. They are async functions that take in some input and return some output.
//https://docs.langchain.com/oss/javascript/langgraph/workflows-agents

async function callOpenAi(state) {
  console.log(`Inside callOpenAi`, state);
  //state.messages.push("hello from LLM");
  const response = await llm.invoke(state.messages);
  return {
    messages: [response],
  };
}

//new node
// async function runAfterCallAI(state) {
//   console.log(`inside runAfterCallAI`, state);
//   return {
//     messages: ["message from runAfterCallAI"],
//   };
// }

//create a workflow
const workflow = new StateGraph(GraphAnnotation)
  .addNode("callOpenAi", callOpenAi)
  .addNode("runAfterCallAI", runAfterCallAI) //register node
  .addEdge("__start__", "callOpenAi")
  .addEdge("callOpenAi", "runAfterCallAI") //connect nodes, here we are connecting callOpenAi to runAfterCallAI because we want to run runAfterCallAI after callOpenAi
  .addEdge("runAfterCallAI", "__end__");

const graph = workflow.compile(); // compiles the workflow into a graph

async function runGraph() {
  const userQuery =
    "Explain the concept of React hooks and their benefits in functional components.";
  const updatedState = await graph.invoke({
    messages: [new HumanMessage(userQuery)],
  });
  console.log("State after graph", updatedState);
}

runGraph();
