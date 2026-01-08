import { GoogleGenAI, Type } from "@google/genai";
import { BlogPost } from "../types";
import { BIO } from "../data";

/**
 * Client-side service for Gemini API interactions.
 * Directly uses the API key from process.env.API_KEY as per instructions.
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
    const prompt = `Research the top 6 most consequential software engineering news stories for today. 
    Focus on: React, TypeScript, AI Engineering (LLMs/Agents), or Cloud Native architectures.
    Return the result as a JSON array of objects.`;

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
              title: { type: Type.STRING, description: "Headline of the tech news" },
              summary: { type: Type.STRING, description: "One sentence summary" },
              date: { type: Type.STRING, description: "Today's date" },
              category: { type: Type.STRING, description: "Tech category (e.g. AI, Web, DevOps)" },
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
      likes: Math.floor(Math.random() * 50) + 10,
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
    const prompt = `Act as a Senior Software Architect. Produce a high-fidelity technical deep-dive on: "${post.title}".
    Context: "${post.summary}"
    
    REQUIREMENTS:
    1. Architectural Analysis: Patterns, performance, and scalability implications.
    2. Section: "## Kev's Engineering Perspective": Opinionated commentary on relevance.
    3. Technical Depth: Professional technical Markdown.
    
    Use Google Search to ensure up-to-date accuracy.`;

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
      .map((chunk: any) => chunk.web ? { title: chunk.web.title, uri: chunk.web.uri } : null)
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
