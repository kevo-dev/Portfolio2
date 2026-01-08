import { BlogPost } from "../types";

/**
 * Ensures we hit the root-level API correctly regardless of sub-route.
 */
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return '';
};

/**
 * Client-side wrapper for the neural assistant.
 * Proxies requests to /api/chat to protect the API key.
 */
export const getGeminiResponse = async (userMessage: string) => {
  try {
    const response = await fetch(`${getBaseUrl()}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });
    
    if (!response.ok) {
      console.error(`Gemini Proxy failed: ${response.status}`);
      return "Neural link sync failed. The node is temporarily offline.";
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
    // Force no-cache to prevent Vercel from caching 404s or old data
    const response = await fetch(`${getBaseUrl()}/api/blog/posts`, { 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`Blog Fetch failed (${response.status})`);
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
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
    const response = await fetch(`${getBaseUrl()}/api/blog/expand`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: post.title,
        summary: post.summary,
        url: post.url
      }),
      cache: 'no-store'
    });
    
    if (!response.ok) throw new Error('Expansion failed');
    return await response.json();
  } catch (error) {
    console.error("Expansion Proxy Error:", error);
    return { 
      content: "Neural connectivity interrupted during synthesis. Please check back later.", 
      sources: [] 
    };
  }
};
