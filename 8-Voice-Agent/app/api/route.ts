//creating an API to generate a temporary API key/ephemeral API key

import axios from "axios";
// [https://api.openai.com/v1/realtime/client_secrets]
export async function GET() {
  const response = await axios.post(
    `https://api.openai.com/v1/realtime/sessions`,
    {
      // putting data
      model: "gpt-4o-realtime-preview",
      modalities: ["audio", "text"],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    }
  );
  console.log(response.data.value);

  return Response.json({ tempAPIKEY: response.data.client_secret.value });
}
