# Prompt Engineering

- the art of getting AI to do what you want

$ Effective Prompting

1. be specific
2. use technical terms
3. provide context
4. give examples
5. iterate and refine

❌ "how do I center something?"
✅ "What's the best way to center a div element horizontally and vertically using CSS?"

## Prompting types

- Zero-shot: asking the model to perform a task without any examples. [1-zero-shot.js]
- Few-shot: providing a few examples to guide the model on how to perform the task.(100-150 examples is optimal for best results) [2-few-shot.js]
- Chain-of-thought: the model is encouraged to break down reasoning step by step before arriving at an answer. [3-chain-of-thought.js]
- Self-Consistency: generating multiple reasoning paths and selecting the most consistent answer among them. [4-self-consistency.js]
- Persona-Based: the model is prompted to adopt a specific persona or style of communication. [5-persona-based.js]

- for making the model act like a specific person or character, collect as much data as possible about that person/character's speech patterns, tone, and style. Use this data to create detailed prompts that guide the model to respond in a manner consistent with the chosen persona.
