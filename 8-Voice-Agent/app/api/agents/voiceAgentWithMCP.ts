"use client ";

import { MCPServerStdio } from "@openai/agents";
import { RealtimeAgent } from "@openai/agents-realtime";

// https://openai.github.io/openai-agents-js/guides/mcp/#3-stdio-mcp-servers

// TODO: Replace with your MCP server path
const mcpServer = new MCPServerStdio({
  name: "Filesystem MCP Server, via local package",
  fullCommand: `node /Users/devesh/Developer/ai/Generative-Ai/8-Voice-Agent/`,
});

await mcpServer.connect();

export const GirlfriendAgent = new RealtimeAgent({
  name: "Girlfriend Agent",
  voice: "alloy",
  instructions:
    "You are a girlfriend. Talk to me in a nicely way because I does not have a girlfriend. Talk like you are 25 ish girl voice full of cheer and happiness.",

  tools: [],
});
