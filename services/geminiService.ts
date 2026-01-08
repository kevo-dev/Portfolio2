import { BlogPost } from "../types";

/**
 * Technical service for Gemini API interactions via internal API routes.
 * This architecture ensures the API_KEY remains secure on the server.
 */

/**
 * Handles chat interactions with the Kev-AI persona.
 */
export const getGeminiResponse = async (userMessage: string): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.text || "Neural link sync failed. Please try again.";
  } catch (error) {
    console.error("Gemini Response Error:", error);
    return "The neural node is currently recalibrating. Please try again in a moment.";
  }
};

/**
 * Researches and returns the latest technical blog posts via internal API.
 */
export const getLiveBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch('/api/blog/posts', {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const posts = await response.json();
    return Array.isArray(posts) ? posts : [];
  } catch (error) {
    console.error("Blog Synthesis Error:", error);
    return [];
  }
};

/**
 * Generates an in-depth technical expansion for a blog post via internal API.
 */
export const expandBlogPost = async (post: BlogPost): Promise<{ content: string; sources: any[] }> => {
  try {
    const response = await fetch('/api/blog/expand', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: post.title,
        summary: post.summary,
        url: post.url
      }),
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Blog Expansion Error:", error);
    return { 
      content: "Neural connectivity interrupted. Detailed analysis unavailable at this time.", 
      sources: [] 
    };
  }
};
