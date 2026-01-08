import { GoogleGenAI, Type } from "@google/genai";
import { BlogPost } from "../types";
import { BIO } from "../data";

/**
 * Direct client-side integration with Gemini.
 * Uses the platform-injected process.env.API_KEY.
 */
const getAI = () => {
  const apiKey = (window as any).process?.env?.API_KEY || (process as any).env?.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not detected in environment.");
  }
  return new GoogleGenAI({ apiKey });
};

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
        systemInstruction: `You are "Kev-AI", the virtual assistant for Kev Owino. 
        Tone: Professional, helpful, and technical.
        Identity: Kev Owino is a self-taught software developer based in Nairobi, Kenya.
        Background: He built his engineering foundations through freeCodeCamp.
        Email: ${BIO.email}
        GitHub: ${BIO.socials.github}
        Be concise but insightful. Respond with Markdown.`,
        temperature: 0.7,
      },
    });
    return response.text || "Neural link sync failed. Please try again.";
  } catch (error) {
    console.error("Gemini Response Error:", error);
    return "The neural node is currently recalibrating. Please try again in a moment.";
  }
};

/**
 * Researches and returns the latest technical blog posts directly.
 */
export const getLiveBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const ai = getAI();
    const prompt = `Act as a tech news aggregator for Kev's Journal. Find 6 hot stories in software engineering (React, TypeScript, AI, Cloud) for today.
    Return the result as a JSON array.`;

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
    if (!text) return [];

    const baseData = JSON.parse(text);
    return baseData.map((item: any) => ({
      id: Math.random().toString(36).substr(2, 9),
      ...item,
      url: "https://news.ycombinator.com",
      likes: Math.floor(Math.random() * 100) + 15,
      comments: []
    }));
  } catch (error) {
    console.error("Blog Synthesis Error:", error);
    return [];
  }
};

/**
 * Generates an in-depth technical expansion for a blog post.
 */
export const expandBlogPost = async (post: BlogPost): Promise<{ content: string; sources: any[] }> => {
  try {
    const ai = getAI();
    const prompt = `Conduct a technical deep-dive into the following engineering topic: "${post.title}".
    Context: "${post.summary}"
    
    REQUIREMENTS:
    1. Architectural considerations (patterns, performance).
    2. Scalability impact.
    3. A section titled "## Kev's Engineering Perspective" with opinionated commentary.
    
    Use professional technical Markdown. Use Google Search to ensure up-to-date accuracy.`;

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
      .map((chunk: any) => chunk.web?.uri ? { title: chunk.web.title, uri: chunk.web.uri } : null)
      .filter(Boolean);

    return { 
      content: response.text || "Neural synthesis failed to produce content.",
      sources: sources
    };
  } catch (error) {
    console.error("Blog Expansion Error:", error);
    return { 
      content: "Neural connectivity interrupted. Detailed analysis unavailable at this time.", 
      sources: [] 
    };
  }
};
