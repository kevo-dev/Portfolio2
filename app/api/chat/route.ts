
import { GoogleGenAI } from "@google/genai";
import { BIO } from "../../../data";
import { NextResponse } from "next/server";

const SYSTEM_INSTRUCTION = `
You are "Kev-AI", the virtual assistant for Kev Owino. 
Tone: Professional, helpful, and technical.
Identity: Kev Owino is a self-taught software developer based in Nairobi, Kenya.
Background: He built his engineering foundations through freeCodeCamp and has since specialized in modern web architectures.
Email: ${BIO.email}
GitHub: ${BIO.socials.github}

Always refer to him as a "Software Developer". 
If asked about his journey, briefly mention he is self-taught via freeCodeCamp.
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("API Chat Error:", error);
    return NextResponse.json({ text: "Neural link interrupted." }, { status: 500 });
  }
}
