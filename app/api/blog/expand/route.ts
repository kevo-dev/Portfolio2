import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { title, summary, url } = await req.json();
    const apiKey = process.env.API_KEY;

    if (!apiKey) throw new Error("API_KEY missing");

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `Act as a Senior Software Architect. Produce a high-fidelity, technical deep-dive on: "${title}".
    Context: "${summary}"
    Original Source: ${url}
    
    REQUIREMENTS:
    1. Architectural Analysis: Discuss patterns, performance implications, and scalability.
    2. Section: "## Kev's Engineering Perspective": Provide bold, opinionated commentary on why this matters to modern developers.
    3. Technical Depth: Use code concepts or architectural diagrams (described in text).
    4. Format: Clean, professional Markdown.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.8,
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .map((chunk: any) => chunk.web?.uri ? { title: chunk.web.title, uri: chunk.web.uri } : null)
      .filter(Boolean);

    return NextResponse.json({ 
      content: response.text,
      sources: sources
    });
  } catch (error) {
    console.error("Blog Expansion API Error:", error);
    return NextResponse.json({ 
      content: "Neural connectivity interrupted. Synthesis could not be completed for this specific node.",
      sources: []
    }, { status: 500 });
  }
}