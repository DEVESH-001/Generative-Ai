// (https://platform.openai.com/docs/guides/embeddings)
import "dotenv/config";
import { OpenAI } from "openai";

const client = new OpenAI();

async function init() {
  const result = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: "Hello world, how are you doing?",
    encoding_format: "float",
  });
  console.log(result.data);
}

init();

// the vector embeddings can be used for various applications such as semantic search, clustering, and recommendation systems.

