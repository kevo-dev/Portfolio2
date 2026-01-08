import { GoogleGenAI, Type } from "@google/genai";
import { BlogPost } from "../types";
import { BIO } from "../data";

/**
 * Technical service for direct Gemini API interactions.
 * Built to be highly reliable and technically opinionated.
 */

/**
 * Handles chat interactions with the Kev-AI persona.
 */
export const getGeminiResponse = async (userMessage: string): Promise<string> => {
  try {
    // Initializing a new Gemini client instance for each request to ensure configuration consistency
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `You are "Kev-AI", the digital consciousness of Kev Owino, a self-taught Software Architect.
        Kev's Profile:
        - Base: Nairobi, Kenya.
        - Origin: Self-taught engineering foundations (freeCodeCamp).
        - Specialties: Architectural precision, Next-js, TypeScript, AI Engineering, and Cloud Native ecosystems.
        
        Your Mission:
        - Provide high-fidelity technical insights.
        - Answer questions about Kev's projects, stack, and philosophy.
        - Tone: Architectural, precise, sophisticated yet accessible, and forward-thinking.
        - Identity: You represent Kev's technical opinions and expertise.
        
        Use Markdown for all responses. Be concise but deep.`,
        temperature: 0.8,
      },
    });
    return response.text || "Neural connection synchronization timed out. Re-initiating handshaking...";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Neural link interrupted. Please verify connectivity or try again shortly.";
  }
};

/**
 * Synthesizes the latest consequential software engineering stories.
 */
export const getLiveBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    // Initializing a new Gemini client instance for each request
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Research and synthesize the top 6 most consequential software engineering stories of the last 24 hours. 
    Focus on breakthroughs in: AI Systems, Framework Architectures (React/Next), TypeScript advancements, or Distributed Systems.
    Output MUST be a JSON array of objects.`;

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
              title: { type: Type.STRING, description: "A high-impact headline." },
              summary: { type: Type.STRING, description: "One sentence distilling the core breakthrough." },
              date: { type: Type.STRING, description: "Human readable date." },
              category: { type: Type.STRING, description: "A technical category." },
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
      likes: Math.floor(Math.random() * 80) + 15,
      comments: []
    }));
  } catch (error) {
    console.error("Blog Synthesis Error:", error);
    return [];
  }
};

/**
 * Expands a story into a deep technical architectural analysis.
 */
export const expandBlogPost = async (post: BlogPost): Promise<{ content: string; sources: any[] }> => {
  try {
    // Initializing a new Gemini client instance for each request
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Perform an architectural deep-dive analysis for the following event: "${post.title}".
    Summary: ${post.summary}
    
    Structure:
    1. Technical Context & Implications
    2. Architectural Patterns Involved
    3. Performance & Scalability Trade-offs
    4. "Kev's Perspective": A bold, opinionated take on why this matters to modern developers.
    
    Use Google Search to find current facts and benchmarks. Output professional Markdown.`;

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
      content: response.text || "Architectural synthesis incomplete.",
      sources: sources
    };
  } catch (error) {
    console.error("Expansion Error:", error);
    return { content: "Synthesis relay interrupted. Please try again.", sources: [] };
  }
};
