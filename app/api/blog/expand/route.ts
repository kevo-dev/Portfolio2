
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, summary, url } = await req.json();
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Act as a Software Developer. Produce a high-fidelity, fully rewritten technical deep-dive on: "${title}".
  Summary: "${summary}"
  Source: ${url}
  REQUIREMENTS:
  1. Multi-Source Synthesis: Cross-reference this with recent technical trends.
  2. Section: "## Kev's Engineering Perspective": Provide bold commentary on trade-offs and architectural impact.
  3. Format: Professional Markdown.`;

  try {
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
    console.error("Expansion error:", error);
    return NextResponse.json({ content: "Expansion failed due to neural connectivity issues." }, { status: 500 });
  }
}
