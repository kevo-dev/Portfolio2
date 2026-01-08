import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.error("Critical: API_KEY is missing in environment variables.");
    return NextResponse.json({ error: "Configuration Error" }, { status: 500 });
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `Research the top 6 most consequential engineering news stories for today. 
  Focus on React 19, TypeScript 5+, AI Engineering, or Cloud Native architectures.
  Return as a JSON array of objects with title, summary, date, and category.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              date: { type: Type.STRING },
              category: { type: Type.STRING },
            },
            required: ["title", "summary", "date", "category"]
          }
        }
      },
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from Gemini");

    const baseData = JSON.parse(text);
    const posts = baseData.map((item: any) => ({
      id: Math.random().toString(36).substr(2, 9),
      ...item,
      url: "https://news.ycombinator.com",
      likes: Math.floor(Math.random() * 100) + 20,
      comments: []
    }));

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Gemini Content Generation Error:", error);
    return NextResponse.json({ error: "Neural Synthesis Failed" }, { status: 500 });
  }
}