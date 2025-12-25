
import { GoogleGenAI, Type } from "@google/genai";
import { BIO, PROJECTS, SKILLS } from "../data";
import { BlogPost } from "../types";

const API_KEY = process.env.API_KEY;

const SYSTEM_INSTRUCTION = `
You are "Kev-AI", the virtual assistant for Kev O'Wino's portfolio website. 
Kev is a Full-Stack Software Engineer.
Your tone is professional, helpful, slightly witty, and enthusiastic.
Use the following context to answer questions:
- Biography: ${BIO.about}
- Role: ${BIO.role}
- Skills: ${SKILLS.map(s => s.name).join(', ')}
- Location: ${BIO.location}
- Featured Projects: ${PROJECTS.map(p => p.title).join(', ')}

If you don't know an answer, politely suggest the user contact Kev directly at ${BIO.email}.
Keep responses concise and formatted with markdown where appropriate.
`;

export const getGeminiResponse = async (userMessage: string) => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Please ensure it's configured.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 500,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Something went wrong. Please try again later.";
  }
};

export const getLiveBlogPosts = async (): Promise<BlogPost[]> => {
  if (!API_KEY) return [];

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const prompt = `Research the top 5 most important and recent engineering/web development news stories or technical trends for today. 
  Focus on React, TypeScript, AI in coding, and Cloud Architecture. 
  For each story, provide:
  1. A catchy title.
  2. A 2-sentence summary.
  3. The current date.
  4. A category tag.
  
  Return the information in a clear list. I will also use your search grounding chunks to provide the actual URLs.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
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

    const baseData = JSON.parse(response.text || "[]") as any[];
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    // Map the JSON data to our BlogPost interface, pairing with URLs from grounding if available
    return baseData.map((item, index) => {
      // Find a relevant URI from the grounding chunks
      const sourceUri = groundingChunks[index]?.web?.uri || 
                        groundingChunks[0]?.web?.uri || 
                        "https://news.ycombinator.com";

      return {
        title: item.title,
        summary: item.summary,
        date: item.date,
        category: item.category,
        url: sourceUri
      };
    });
  } catch (error) {
    console.error("Error fetching live blog:", error);
    return [];
  }
};
