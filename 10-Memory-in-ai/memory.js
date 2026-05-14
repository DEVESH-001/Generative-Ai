//import MemoryClient from "mem0ai";
import { Memory } from "mem0ai/oss";
import "dotenv/config";
import { OpenAI } from "openai";

const client = new OpenAI();

//memory instance
const mem = new Memory({
  version: "v1.1",
  embedder: {
    provider: "openai",
    config: {
      apiKey: process.env.OPENAI_API_KEY,
      model: "text-embedding-3-small",
    },
  },
  llm: {
    provider: "openai",
    config: {
      apiKey: process.env.OPENAI_API_KEY,
      model: "gpt-4o-mini",
    },
  },
  vectorStore: {
    provider: "qdrant",
    config: {
      collectionName: "memories",
      embeddingModelDims: 1536,
      host: "localhost",
      port: 6333,
    },
  },
});

async function chat(query = "") {
  const memories = await mem.search(query, { userId: "devesh" });
  const memString = memories.results.map((e) => e.memory).join("\n");
  console.log("Memories:", memString);

  const SYSTEM_PROMPT = `You are a helpful assistant. Use the following context to answer the question.
  Context About User:
  ${memString}`;

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: query },
    ],
  });
  console.log(`Bot:`, response.choices[0].message.content);
  console.log("------Adding To MEMORY--🧠-----------");

  await mem.add(
    [
      { role: "user", content: "My name is devesh" },
      {
        role: "assistant",
        content: response.choices[0].message.content,
      },
    ],
    { userId: "devesh" }, // come from Database
  );

  console.log("------Added To MEMORY--✅-----------");

  //  return response;
}

//chat("Hey my name is Devesh, and i am from rajasthan");
chat("Where am i from?");
