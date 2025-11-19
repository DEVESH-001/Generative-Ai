# OpenAI Agents JS SDK

[https://openai.github.io/openai-agents-js/]

This project demonstrates how to use the OpenAI Agents SDK to build intelligent agents with tools, handoffs, and multi-agent orchestration.

## Code Breakdown: `2-openAISDK.js`

The file `2-openAISDK.js` showcases the following key concepts:

### 1. Imports and Configuration

```javascript
import { Agent, run, tool } from "@openai/agents";
import "dotenv/config";
import { z } from "zod";
```

- **`@openai/agents`**: The core library for creating agents, tools, and running workflows.
- **`dotenv/config`**: Loads environment variables (like your OpenAI API key) from a `.env` file.
- **`zod`**: A schema validation library used to define the structure of parameters for tools.

### 2. Defining Tools

Tools allow agents to perform actions or fetch data. Three tools are defined in this example:

#### `getCurrentTime`

- **Purpose**: Returns the current system time in HH:MM:SS format.
- **Parameters**: None.
- **Implementation**: Uses `new Date().toLocaleTimeString()`.

#### `getWeatherTool`

- **Purpose**: Simulates fetching weather data for a specific city.
- **Parameters**: Requires a `city` (string).
- **Implementation**: Returns a hardcoded response ("The weather in [city] is sunny.").

#### `getMenuTool`

- **Purpose**: Retrieves a restaurant menu.
- **Parameters**: None.
- **Implementation**: Returns a structured JSON object containing categories like Drinks, Breakfast, and Lunch with items and prices.

### 3. Creating Agents

Agents are the core intelligence that process instructions and use tools.

#### `cookingAgent`

- **Role**: A helpful cooking assistant.
- **Model**: Uses `gpt-4.1-mini`.
- **Tools**: Equipped with `getCurrentTime`, `getWeatherTool`, and `getMenuTool`.
- **Instructions**: configured to provide recipes, cooking tips, and handle dietary needs. It explicitly declines non-cooking queries.

#### `codingAgent`

- **Role**: An expert coding assistant specialized in TypeScript.
- **Tools**: Interestingly, it uses `cookingAgent` as a tool.
  - _Note_: This demonstrates the "Agents as Tools" pattern, allowing one agent to delegate specific sub-tasks to another agent, although the comment notes this might be less common for distinct domains.

### 4. Gateway and Handoffs

The code implements a "Gateway" pattern to route user queries to the appropriate specialist agent.

#### `gateWay`

- **Role**: A router/dispatcher.
- **Instructions**: Determines which agent to use based on the incoming query.
- **Handoffs**: Configured with `[cookingAgent, codingAgent]`. This allows the gateway to transfer the conversation control to either the cooking or coding agent depending on what the user asks.

### 5. Execution Loop

The `chatWithAgent` function function runs the interaction:

```javascript
async function chatWithAgent(query) {
  const result = await run(gateWay, query);
  console.log(`History`, result.history);
  console.log(result.finalOutput);
}
```

- **`run(gateWay, query)`**: Starts the execution with the Gateway agent.
- **Flow**:
  1. The Gateway receives the query.
  2. It decides whether to handle it or hand it off to `cookingAgent` or `codingAgent`.
  3. The selected agent executes its logic, potentially calling tools (like `getCurrentTime` or `getMenuTool`).
  4. The final response is returned.

### Example Usage

The script ends by calling:

```javascript
chatWithAgent(
  "Depending on the current time in India, suggest me a breakfast recipe. Also what all items are available in menu?"
);
```

In this scenario:

1. The **Gateway** sees a request about recipes and menu items.
2. It hands off to the **Cooking Assistant**.
3. The **Cooking Assistant** calls `getCurrentTime` to check the time.
4. It calls `getMenuTool` to see available items.
5. It synthesizes a response suggesting a breakfast recipe and listing menu options.

- ** There is a automation.js file for building an automation agent that will go on the website and book a hotel or fill form, schedule a google meeting. Not implemented feel free to contribute to that file :)