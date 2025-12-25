import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";

export async function GET() {
  // Always use the direct environment variable for the API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Research the top 5 most consequential and debatable engineering news stories for today. 
  Focus on React, TypeScript, AI Engineering, or Cloud Native ecosystems.
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

    // Extract text from the .text property
    const baseData = JSON.parse(response.text || "[]");
    const posts = baseData.map((item: any) => ({
      id: Math.random().toString(36).substr(2, 9),
      ...item,
      url: "https://news.ycombinator.com",
      likes: Math.floor(Math.random() * 50) + 10,
      comments: []
    }));

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}