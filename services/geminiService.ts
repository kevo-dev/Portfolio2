import { BlogPost } from "../types";

/**
 * Client-side wrapper for the neural assistant.
 * Proxies requests to /api/chat to protect the API key.
 */
export const getGeminiResponse = async (userMessage: string) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });
    
    if (!response.ok) {
      console.error(`Gemini Proxy failed with status: ${response.status}`);
      return "Neural link sync failed. Please try again.";
    }

    const data = await response.json();
    return data.text || "Neural link sync failed. Please try again.";
  } catch (error) {
    console.error("Gemini Proxy Connection Error:", error);
    return "Service temporarily offline for maintenance.";
  }
};

/**
 * Fetches the latest technical news via the internal API route.
 */
export const getLiveBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch('/api/blog/posts', { cache: 'no-store' });
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Blog Fetch failed (${response.status}):`, errorText);
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Blog Fetch Proxy Error:", error);
    return [];
  }
};

/**
 * Deep-dives into a specific post using the internal expansion API.
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
    });
    if (!response.ok) throw new Error('Expansion failed');
    return await response.json();
  } catch (error) {
    console.error("Expansion Proxy Error:", error);
    return { 
      content: "Neural connectivity interrupted during synthesis.", 
      sources: [] 
    };
  }
};
