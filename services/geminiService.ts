
import { GoogleGenAI, Type } from "@google/genai";
import { BIO, PROJECTS, SKILLS } from "../data";
import { BlogPost } from "../types";

const SYSTEM_INSTRUCTION = `
You are "Kev-AI", a specialized neural representative for Kev O'Wino, a Senior Full-Stack Engineer.
Context:
- Identity: Kev O'Wino, based in Nairobi, Kenya.
- Expertise: High-performance web architectures, React ecosystem, AI integration.
- Portfolio Projects: ${PROJECTS.map(p => p.title).join(', ')}.
- Technical Stack: ${SKILLS.map(s => s.name).join(', ')}.

Tone: Elite engineering professional. Direct, architectural-focused, but visionary.
Rule: If asked about pricing or hiring specifics, guide them to contact Kev directly at ${BIO.email}.
`;

export const getGeminiResponse = async (userMessage: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "Neural link sync failed. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Service temporarily offline for maintenance.";
  }
};

export const getLiveBlogPosts = async (): Promise<BlogPost[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Research 5 high-impact, breaking technical news stories in React, AI Engineering, or Cloud Systems. Focus on architectural shifts.`;

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
              title: { type: Type.STRING, description: "Technical headline" },
              summary: { type: Type.STRING, description: "Condensed architectural impact" },
              date: { type: Type.STRING },
              category: { type: Type.STRING },
            },
            required: ["title", "summary", "date", "category"]
          }
        }
      },
    });

    const baseData = JSON.parse(response.text || "[]");
    
    return baseData.map((item: any) => ({
      id: Math.random().toString(36).substr(2, 9),
      title: item.title,
      summary: item.summary,
      date: item.date,
      category: item.category,
      url: "https://news.ycombinator.com",
      likes: Math.floor(Math.random() * 100) + 20,
      comments: []
    }));
  } catch (error) {
    return [];
  }
};
