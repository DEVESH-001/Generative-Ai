//https://modelcontextprotocol.io/docs/develop/build-server#typescript
//https://github.com/modelcontextprotocol/typescript-sdk

// MCP: works on stdio(standard input/output(C++)) protocol
//https://openai.github.io/openai-agents-js/guides/mcp/ : OpenAI's documentation on MCP

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create server instance
const server = new McpServer({
  name: "fusion-lab-server",
  version: "1.0.0",
});

// register tool to the server
server.registerTool(
  "addTwoNumbers",
  {
    title: "Add Two Numbers",
    description: "This tool adds two numbers together",
    inputSchema: {
      num1: z.number().describe("First number"),
      num2: z.number().describe("Second number"),
    },
  },
  // now we define the function that will be executed when the tool is called
  async ({ num1, num2 }) => {
    return { content: [{ type: "text", text: `${num1 + num2}` }] }; // return the result in the format that MCP expects
  },
);

// Create transport
const transport = new StdioServerTransport();

// Start server
await server.connect(transport);

// run the server -> node mcp.js -> you will the terminal is now waiting for input

// this is how we give input to the server -> send a JSON object with the tool name and parameters
// {"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"addTwoNumbers","arguments":{"num1":10,"num2":2}}}

// open MCP register in your ai ide(cursor,windsurf)
// add this :
// "my-custom-server": {
//       "args": [
//         "/path/to/your/mcp.js"
//       ],
//       "command": "node"
//     },
