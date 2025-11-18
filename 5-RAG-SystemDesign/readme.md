# RAG SYSTEM DESIGN

- When designing a Retrieval-Augmented Generation (RAG) system, several key components and considerations must be taken into account to ensure effective performance and usability.

## Key Components of RAG System Design

1. **Data Sources**:
   - Users are dumb and they make silly spelling mistakes or grammatical errors.
   - Use multiple data sources to improve the chances of retrieving relevant information.
   - You can write a function to re-write the query given by the user to improve retrieval.
   - Typo fix, add more context, etc.

**Example of system prompt to re-write user query:**
`You are a helpful assistant that rewrites user queries to improve retrieval accuracy. Correct any spelling mistakes, enhance clarity, and add relevant context where necessary. Here are some examples:
 User Query: "What is the capitel of Frnace?"
 Rewritten Query: "What is the capital of France?"
 User Query: "Tell me abot the histroy of AI."
 Rewritten Query: "Can you provide information about the history of Artificial Intelligence?"`

User_Query -> Rewriting_Function -> Emedding_Model(take chunks) -> Judge_Model(for best chunk) -> Rewrite_Query -> Retrieval_Model -> RAG_Model -> Final Answer

2. **Sub-Query Generation**:
   - Sub queries can be generated from the main query to target specific aspects of the information needed.
   - This can help in retrieving more focused and relevant documents.
   - In simple terms, break down the main query into smaller, more specific queries. More specific queries can lead to better retrieval results and improved answer quality that addresses different aspects of the user's request.
   - But sometimes, generating sub-queries may not be necessary, especially if the main query is already clear and specific.
   - Instead of generating sub-queries, you can focus on enhancing the main query through techniques like query expansion or rephrasing to improve retrieval effectiveness.

3. **HyDe**:
    - Hypothetical Document Embeddings (HyDe) is a technique where you generate hypothetical answers to the user's query and then create embeddings for these hypothetical answers.
        - These embeddings can then be used to retrieve relevant documents that are more aligned with the user's intent.
        - This approach can help in capturing the context and details of the query better than traditional retrieval methods.
    - HyDe can be particularly useful when the user's query is ambiguous or lacks sufficient context.
    - By generating hypothetical answers, the system can explore different interpretations of the query and retrieve documents that cover a broader range of relevant information.
