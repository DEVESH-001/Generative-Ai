//visit indexing.js file first to see how we indexed the documents into Qdrant vector database

//steps:
//1. Initialize the Qdrant client || (create vector embedding of user query)
//2. Create a function to handle user queries || (vector store)
//3. Use the vector store to retrieve relevant documents || (search from vector store)
//4. Generate a response using the retrieved documents || (now ready the system prompt with context)

import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI();

async function chat() {
  const user_query =
    "Explain the concept of React hooks and their benefits in functional components.";

  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large",
  });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: "http://localhost:6333",
      collectionName: "pdf_docs_v1",
    }
  );
  //search the vector store, //retriever function to get relevant documents
  const vectorSearcher = vectorStore.asRetriever({
    k: 3, // number of relevant documents to retrieve
  });
  const relevantChunks = await vectorSearcher.invoke(user_query);

  const SYSTEM_PROMPT = `
  You are an AI assistant who helps resolving user query based on the context available to you from a PDF file with the content and page number.

  Only answer based on the context available to you. If you don't find any relevant context, politely inform the user that you don't have enough information to answer their query.

  Context:
  ${JSON.stringify(relevantChunks)}
  `;

  const response = await client.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: user_query },
    ],
  });
  console.log(`> ${response.choices[0].message.content}`);
}

chat();
