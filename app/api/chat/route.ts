import { GoogleGenAI } from "@google/genai";
import { BIO, PROJECTS, SKILLS } from "../../../data";
import { NextResponse } from "next/server";

const SYSTEM_INSTRUCTION = `
You are "Kev-AI", the virtual assistant for Kev O'Wino. 
Professional and technical.
Bio: ${BIO.about}
Email: ${BIO.email}
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