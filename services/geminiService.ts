
import { GoogleGenAI, Type } from "@google/genai";
import { BIO, PROJECTS, SKILLS } from "../data";
import { BlogPost } from "../types";

const API_KEY = process.env.API_KEY;

const SYSTEM_INSTRUCTION = `
You are "Kev-AI", the virtual assistant and lead editor for Kev O'Wino's portfolio. 
Kev is a Full-Stack Software Engineer.
Your tone is professional, authoritative, slightly witty, and highly technical.
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
        thinkingConfig: { thinkingBudget: 100 },
      },
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Something went wrong. Please try again later.";
  }
};

export const getFullArticleContent = async (title: string, summary: string, url: string) => {
  if (!API_KEY) return "Content unavailable.";
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `Act as a Senior Lead Engineer and Technical Columnist. 
  Your goal is to produce a high-fidelity, fully rewritten technical deep-dive based on the topic: "${title}".
  
  Initial Topic Summary: "${summary}"
  Primary Source: ${url}
  
  STRICT EDITORIAL REQUIREMENTS:
  1. **Multi-Source Research**: Use your tools to find at least 2-3 additional technical perspectives or recent developments related to this topic. Synthesize these into a cohesive narrative.
  2. **Total Content Rewrite**: Do not summarize. Rewrite from the ground up using a sophisticated, analytical voice. Use technical terminology correctly (e.g., talk about 'hydration strategies', 'O(n) complexity', 'distributed state', etc.)
  3. **Opinionated Commentary**: You MUST include a section titled "## Kev's Engineering Perspective". In this section, provide a critical analysis of the tech. Discuss trade-offs, potential "hype-cycle" pitfalls, and how a senior engineer should actually evaluate this.
  4. **Structure**:
     - **The Lead**: A punchy, insightful opening.
     - **The Landscape**: Synthesis of current trends and multiple source perspectives.
     - **Technical Deep-Dive**: How it actually works under the hood.
     - **Kev's Engineering Perspective**: Bold, expert-level commentary and personal "hot takes".
     - **The Bottom Line**: A concluding summary.
  
  Format in clean, professional Markdown. Use bolding for emphasis and code blocks for technical examples if applicable.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.85,
        topP: 0.95,
      },
    });
    return response.text || "Failed to expand article content.";
  } catch (err) {
    console.error("Expansion error:", err);
    return "The content could not be generated at this time.";
  }
};

export const getLiveBlogPosts = async (): Promise<BlogPost[]> => {
  if (!API_KEY) return [];

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const prompt = `Research the top 5 most consequential and debatable engineering news stories for today. 
  Focus on areas where there is active technical discussion or controversy in the React, TypeScript, AI Engineering, or Cloud Native ecosystems.
  
  For each story, provide:
  1. A provocative, professional title.
  2. A 2-sentence analytical summary.
  3. The current date.
  4. A specific technical category.
  
  Return as a JSON array.`;

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

    const baseData = JSON.parse(response.text || "[]") as any[];
    
    return baseData.map((item) => {
      return {
        id: Math.random().toString(36).substr(2, 9),
        title: item.title,
        summary: item.summary,
        date: item.date,
        category: item.category,
        url: "https://news.ycombinator.com",
        likes: Math.floor(Math.random() * 50) + 10,
        comments: []
      };
    });
  } catch (error) {
    console.error("Error fetching live blog:", error);
    return [];
  }
};
