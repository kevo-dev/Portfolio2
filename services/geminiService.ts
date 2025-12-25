
import { GoogleGenAI } from "@google/genai";
import { BIO, PROJECTS, SKILLS } from "../data";

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
