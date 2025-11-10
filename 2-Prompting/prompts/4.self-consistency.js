import 'dotenv/config'
import { OpenAI } from 'openai/client.js'

const client = new OpenAI()

async function main() {
  const SYSTEM_PROMPT = `
    You are an AI assistant who works on SELF-CONSISTENCY strategy/format.
    For a given user query, you need to generate multiple different reasoning paths/solutions.
    After generating multiple solutions, you need to compare them and select the most consistent and common answer among them as the final output.

    Rules:
    - Strictly follow the output JSON format.
    - Always generate multiple different reasoning paths/solutions for the same problem.
    - After generating multiple solutions, compare them and select the most consistent and common answer among them.
    - Provide the final output based on the most consistent answer.

    Output JSON format:
    {"solution_id": "number", "reasoning_path": "string", "final_answer": "string"}

    Example:
    User:Can you solve 3+4*10-4*3
    ASSISTANT:{"solution_id":"1","reasoning_path":"Following BODMAS, first calculate 4*10=40 and 4*3=12. Then the equation becomes 3+40-12. Next, calculate 3+40=43, and finally 43-12=31.","final_answer":"31"}
    ASSISTANT:{"solution_id":"2","reasoning_path":"Using BODMAS, start with multiplications: 4*10=40 and 4*3=12. The equation simplifies to 3+40-12. Then, add 3+40 to get 43, and subtract 12 to get 31.","final_answer":"31"}
    ASSISTANT:{"solution_id":"3","reasoning_path":"According to BODMAS, first perform the multiplications: 4*10=40 and 4*3=12. This changes the equation to 3+40-12. Next, add 3 and 40 to get 43, and then subtract 12 to arrive at 31.","final_answer":"31"}
    Final Output: The final answer to the equation 3 + 4 * 10 - 4 * 3 is 31, as it is the most consistent answer among all solutions.
    `;

  const messages = [
    {
      role: 'system',
      content: SYSTEM_PROMPT,
    },
    {
      role: 'user',
      content: 'Write a code to reverse a linked list in javascript ',
    },
  ];

  const responses = [];
  const numberOfSolutions = 5;

  for (let i = 0; i < numberOfSolutions; i++) {
    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: messages,
      temperature: 0.7,
    });

    const messageContent = response.choices[0].message.content;
    responses.push(JSON.parse(messageContent));
  }

  // Analyze responses to find the most consistent final answer
  const answerCount = {};
  responses.forEach((res) => {
    const answer = res.final_answer;
    if (answerCount[answer]) {
      answerCount[answer]++;
    } else {
      answerCount[answer] = 1;
    }
  });

  let mostConsistentAnswer = null;
  let maxCount = 0;
  for (const [answer, count] of Object.entries(answerCount)) {
    if (count > maxCount) {
      maxCount = count;
      mostConsistentAnswer = answer;
    }
  }

  console.log('Most Consistent Answer:', mostConsistentAnswer);
  console.log('All Responses:', responses);
}

main();

