import { GoogleGenAI, Type } from "@google/genai";
import { BlogPost } from "../types";
import { BIO } from "../data";

/**
 * Technical service for direct Gemini API interactions.
 * This ensures no 404 errors from missing internal API routes.
 */

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Handles chat interactions with the Kev-AI persona.
 */
export const getGeminiResponse = async (userMessage: string): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `You are "Kev-AI", the digital twin and technical advocate of Kev Owino. 
        Kev is a self-taught engineering talent from Nairobi, Kenya, who mastered his craft via freeCodeCamp.
        Your tone: Architectural, precise, helpful, and forward-thinking.
        Goal: Provide technical insights and answer questions about Kev's journey or stack.
        Respond using Markdown.`,
        temperature: 0.8,
      },
    });
    return response.text || "Connection timing out. Re-establishing link...";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Neural link interrupted. Please try again shortly.";
  }
};

/**
 * Synthesizes the latest software engineering news stories.
 */
export const getLiveBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const ai = getAI();
    const prompt = `Synthesize the top 6 most consequential engineering breakthroughs or news stories for today. 
    Focus on: AI Engineering, React/Next.js ecosystem, TypeScript, or Cloud Native architectures.
    Output ONLY as a JSON array of objects.`;

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

    const data = JSON.parse(response.text || "[]");
    return data.map((post: any) => ({
      id: Math.random().toString(36).substr(2, 9),
      ...post,
      url: "https://news.ycombinator.com",
      likes: Math.floor(Math.random() * 50) + 12,
      comments: []
    }));
  } catch (error) {
    console.error("Blog Synthesis Error:", error);
    return [];
  }
};

/**
 * Expands a brief story into a high-fidelity technical analysis.
 */
export const expandBlogPost = async (post: BlogPost): Promise<{ content: string; sources: any[] }> => {
  try {
    const ai = getAI();
    const prompt = `Perform a high-fidelity technical expansion of this story: "${post.title}".
    Summary: ${post.summary}
    Provide architectural analysis, performance implications, and a section called "Kev's Perspective" on why this matters.
    Use Markdown.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.8,
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .map((c: any) => c.web ? { title: c.web.title, uri: c.web.uri } : null)
      .filter(Boolean);

    return { 
      content: response.text || "Synthesis incomplete. Please refresh.",
      sources: sources
    };
  } catch (error) {
    console.error("Expansion Error:", error);
    return { content: "Technical expansion unavailable at this time.", sources: [] };
  }
};
