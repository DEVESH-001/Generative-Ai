"use client";

import Image from "next/image";
import axios from "axios";
import { RealtimeSession } from "@openai/agents/realtime";
import { voiceAgent } from "./api/agents/voiceAgent";
import Link from "next/link";

export default function Home() {
  async function handleStartAgent() {
    console.log("Making call to api_key /api");

    const response = await axios.get("/api");
    console.log(response.data);

    const tempKey = response.data.tempAPIKEY;
    console.log(tempKey);

    //create a realTimeSession
    // const session = new RealtimeSession(voiceAgent,{
    //   model: 'gpt-realtime',
    // })
    const session = new RealtimeSession(voiceAgent, {
      model: "gpt-4o-realtime-preview-2025-06-03",
      config: {
        inputAudioFormat: "pcm16",
        inputAudioNoiseReduction: { type: "near_field" },
        inputAudioTranscription: {
          language: "en",
          model: "gpt-4o-mini-transcribe",
        },
      },
    });
    await session.connect({ apiKey: tempKey });
    console.log(session);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <button
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            onClick={handleStartAgent}
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Voice-Agent
          </button>
          <Link
            className="underline dark:text-zinc-300"
            href={"https://devesh.work"}
            target="_blank"
          >
            About-Me
          </Link>
        </div>
      </main>
    </div>
  );
}
