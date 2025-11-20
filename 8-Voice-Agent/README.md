# Voice Agent with OpenAI Speech-to-Speech and Next.js

This project demonstrates the creation of a voice agent application leveraging OpenAI's advanced speech-to-speech capabilities, built with the Next.js framework for a robust and scalable user interface.

- [https://platform.openai.com/docs/guides/voice-agents?voice-agent-architecture=speech-to-speech]
- if we put out API Key in frontend it will get expose. OpenAI provides a way for that [https://platform.openai.com/docs/api-reference/realtime-sessions], by using ephemeral API Key. An ephemeral API key is a temporary API key that can be used to make requests to the OpenAI API. It is valid for a limited time and can be revoked at any time.
- install axios
- install @openai/voice-agent

https://openai.github.io/openai-agents-js/guides/voice-agents/quickstart/

- so first read the doc you will automatically get the idea how to build voice agent via openai
- create a nextjs project
- in /app folder create a /api folder and create a /route.ts file
- install axios
- in route.ts create a GET API to generate a temporary API key/ephemeral API key
- and then create a folder in /api call it agents and create a file call it voiceAgent.ts or any of your wish
- in the root /page.tsx in /app folder create a button and on click of that button make a call to the GET API created in route.ts
- make a funcion `handleStartAgent`, in that function make a call to the GET API created in route.ts
- now create a `session` from [https://openai.github.io/openai-agents-js/guides/voice-agents/quickstart/] 4th point(Create a session)
- now create a `voiceAgent` from [https://openai.github.io/openai-agents-js/guides/voice-agents/quickstart/] 5th point(Create a voice agent)
- at last figure the code yourself, its simple `:-)`

- you can build a E-commerce store sales agent voice on store(hint- make tools like get_product, get_product_by_id, checkout etc.). 

## NOTE EVERYTHING YOU TALK IS BEING RECORDED IN YOU API KEY, Chechout - [https://platform.openai.com/docs/guides/conversation-state?api-mode=responses]