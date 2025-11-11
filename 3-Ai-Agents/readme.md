# AI Agents

This module demonstrates building an AI agent using OpenAI's GPT model with function calling capabilities and a structured thinking process.

## Overview

The `agent.js` file implements an AI agent that follows a **START → THINK → TOOL → OBSERVE → OUTPUT** workflow pattern. This agent can break down complex problems, use available tools, and provide thoughtful responses.

## Key Features

### 1. **Structured Thinking Process**

The agent follows a multi-step reasoning approach:

- **START**: Understands the user's query
- **THINK**: Breaks down the problem and plans the solution
- **TOOL**: Calls appropriate tools when needed
- **OBSERVE**: Processes the tool's response
- **OUTPUT**: Provides the final answer to the user

### 2. **Available Tools**

The agent has access to three powerful tools:

#### `getWeatherDetailsByCity(cityname: string)`

- Fetches current weather information for any city
- Uses the wttr.in API
- Returns temperature and weather conditions

#### `getGithubUserInfoByUsername(username: string)`

- Retrieves public GitHub user information
- Uses GitHub's REST API
- Returns user details like repos, followers, location, etc.

#### `executeCommand(command: string)`

- Executes Linux/Unix commands on the user's machine
- Uses Node.js `child_process` module
- Returns command output or error messages

### 3. **Chain of Thought (CoT) Implementation**

The agent uses a stateless Chain of Thought approach where:

- Each API call is independent
- The agent thinks through problems step-by-step
- Multiple THINK steps ensure thorough analysis before action
- Tool outputs are observed before proceeding

## How It Works

1. **System Prompt**: Defines the agent's behavior, available tools, and output format
2. **Message Loop**: Continuously processes the conversation until reaching OUTPUT
3. **Tool Execution**: When the agent decides to use a tool, it:
   - Calls the appropriate function
   - Waits for the OBSERVE response
   - Continues thinking based on the result
4. **Final Output**: Provides a comprehensive answer to the user

## Example Usage

```javascript
User: "Current weather in Alwar and in Jaipur"

Agent Process:
🔥 START: Understanding the user wants weather for two cities
    🧠 THINK: I need to check weather for two cities
    🧠 THINK: I have getWeatherDetailsByCity tool available
    🧠 THINK: I'll call it for Alwar first
🛠️ TOOL: getWeatherDetailsByCity(alwar)
    🧠 OBSERVE: Received weather data for Alwar
    🧠 THINK: Now I need weather for Jaipur
🛠️ TOOL: getWeatherDetailsByCity(jaipur)
    🧠 OBSERVE: Received weather data for Jaipur
    🧠 THINK: I have both weather details now
🤖 OUTPUT: Provides formatted weather information for both cities
```

## Technical Implementation

- **Model**: GPT-4.1-mini
- **API**: OpenAI Chat Completions API
- **Output Format**: Structured JSON responses
- **Tool Mapping**: Dynamic function dispatch using `TOOL_MAP` object
- **Error Handling**: Graceful handling of invalid tools and command errors

## Running the Agent

```bash
npm install
node agent.js
```

Make sure to have a `.env` file with your OpenAI API key:

OPENAI_API_KEY=your_api_key_here

## Key Takeaways

- Demonstrates practical AI agent architecture
- Shows how to integrate external tools with LLMs
- Implements Chain of Thought reasoning for better decision-making
- Provides a reusable pattern for building autonomous AI agents
