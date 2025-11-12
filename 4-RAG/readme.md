# RAG (Retrieval-Augmented Generation)

This directory contains resources and examples related to Retrieval-Augmented Generation (RAG). The example demonstrates how to index PDF documents into a vector database (Qdrant) and then query them to produce context-aware answers using an OpenAI model.

## Overview

RAG uses two main steps:

1. **Retrieval** — find relevant passages from a document store (vector DB).
2. **Generation** — use a language model to answer the user query conditioned on the retrieved passages.

Below are concise descriptions of the two main scripts in this folder and how they work.

## Files

- `indexing.js` — reads a PDF, splits it into chunks, creates embeddings with OpenAI, and stores embeddings in a Qdrant collection.
- `chat.js` — constructs a query embedding, retrieves the top relevant chunks from Qdrant, and asks the OpenAI chat model to answer using the retrieved context.

## What `indexing.js` does

`indexing.js` performs the indexing step:

- Uses `@langchain/community`'s `PDFLoader` to load a PDF file page-by-page.
- Converts the loaded document into chunks (the loader handles chunking/page-level splitting).
- Creates embeddings using `OpenAIEmbeddings` (configured with `text-embedding-3-large`).
- Stores the embeddings in a Qdrant collection named `pdf_docs_v1` using `QdrantVectorStore.fromDocuments`.
- The script expects Qdrant to be available at `http://localhost:6333` (default in the example).

Typical flow in `indexing.js`:

1. import loader and embedding classes
2. load the PDF: `const docs = await loader.load()`
3. create embeddings and write to Qdrant
4. log `indexing of docs ✅` when complete

Notes:

- Ensure the PDF (`reactjs.pdf` in the example) exists next to the script or update the path.
- The script loads environment variables with `import "dotenv/config";` so keep your `.env` in the same folder or set env variables before running.

## What `chat.js` does

`chat.js` demonstrates a simple RAG query flow:

- Creates an `OpenAIEmbeddings` instance and connects to an existing Qdrant collection via `QdrantVectorStore.fromExistingCollection`.
- Builds a retriever (`vectorStore.asRetriever({ k: 3 })`) and uses it to fetch the most relevant chunks for the user's query.
- Packages the retrieved chunks into a `SYSTEM_PROMPT` so the chat model only answers from the provided context.
- Calls the OpenAI chat completion endpoint (`client.chat.completions.create`) with the system prompt and user query.
- Prints the model's reply.

Notes:

- The example uses `model: "gpt-4.1"` for generation and `text-embedding-3-large` for embeddings — adjust as needed for your account and access.
- `chat.js` also uses `import "dotenv/config";` to load `OPENAI_API_KEY` from a `.env` file.

## Required environment variables

Create a `.env` file in the `4-RAG` folder (or export env vars) with at least:

```
OPENAI_API_KEY=your_openai_api_key_here
# If you use a different Qdrant host/port, set QDRANT_URL or update the scripts directly
# QDRANT_URL=http://localhost:6333
```

If you are using OpenAI SDK that expects a different variable name (older libs use `OPENAI_API_KEY`), ensure the variable name matches what the code expects.

### Qdrant Vector Database (via Docker) (https://qdrant.tech/)

This example uses **Qdrant** as the vector database, running in a Docker container. To start Qdrant locally:

```bash
docker run -p 6333:6333 qdrant/qdrant
```

This will start Qdrant on `http://localhost:6333`. The scripts connect to this endpoint by default.

- If you need persistent storage, mount a volume: `docker run -p 6333:6333 -v $(pwd)/qdrant_storage:/qdrant/storage qdrant/qdrant`
- For more info, see the [Qdrant Docker docs](https://qdrant.tech/documentation/quick-start/).

## Install dependencies

From the `4-RAG` folder run:

```bash
npm install
```

If you previously had a conflicting `pdf-parse` version, install the v1 line recommended by the loader:

```bash
npm install pdf-parse@^1 --legacy-peer-deps
```

## Run the example

1. **Start Qdrant (if not already running)**:

```bash
docker run -p 6333:6333 qdrant/qdrant
```

2. **Index documents** (run once after adding PDFs):

```bash
node indexing.js
```

You should see: `indexing of docs ✅` when indexing is complete.

3. **Start the chat/query script**:

```bash
node chat.js
```

You should see the model's response printed to the console.

## Troubleshooting

- **Missing API key error?** Make sure `.env` is present and contains `OPENAI_API_KEY`. Also verify `import "dotenv/config";` is present at the top of any script that creates an `OpenAI` client.
- **Qdrant connection errors?** Ensure Qdrant is running via Docker and reachable at `http://localhost:6333`.
- **`pdf-parse` version errors?** LangChain's `PDFLoader` currently requires `pdf-parse` v1; install `pdf-parse@^1` if you see errors about pdf-parse exports.

## Key takeaways

- **Qdrant runs in Docker** — start it with `docker run -p 6333:6333 qdrant/qdrant` before running the scripts.
- `indexing.js` prepares a searchable vector store from PDFs.
- `chat.js` performs retrieval from the vector store and uses the retrieved passages to ground the LLM's answers.
