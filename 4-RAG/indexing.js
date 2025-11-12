//RAG: Retrieval-Augmented Generation
//we are using RAG to enhance our generative AI model by providing it with relevant context from a set of documents.
//we are using Qdrant as our vector database to store and retrieve document embeddings(https://qdrant.tech/),with docker .

// STEPS:
// 1. reading files from a directory
// 2. convert files to chunks
// 3. embed the chunks
// 4. store the embeddings in Qdrant
//install npm install @langchain/community @langchain/core pdf-parse  (https://docs.langchain.com/oss/javascript/integrations/document_loaders/file_loaders/pdf)

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import "dotenv/config";

async function loadPDF() {
  const pdfFilePath = "./reactjs.pdf";
  const loader = new PDFLoader(pdfFilePath);
  //page by page load the PDF file
  const docs = await loader.load();
  //create vector embeddings from the chunks and store them in Qdrant. We have to use OpenAIEmbeddings for that, but langchain gives that also.(https://docs.langchain.com/oss/javascript/integrations/text_embedding#openai)
  // so we have to create the vector embedding od the 'docs' & store in Qdrant and store the embeddings there (https://docs.langchain.com/oss/javascript/integrations/vectorstores/qdrant)

  //ready the client openai model for embeddings
  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large",
  });

  //create the connection to Qdrant and store the embeddings
  const vectorStore = await QdrantVectorStore.fromDocuments(
    docs,
    embeddings,
    { url: "http://localhost:6333", collectionName: "pdf_docs_v1" } //database configuration
  );
  console.log("indexing of docs ✅");
}

loadPDF();
//indexing is done, now we can query the docs in chat.js file