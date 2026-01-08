'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { BlogPost, Comment } from '../types';
import { getLiveBlogPosts, expandBlogPost } from '../services/geminiService';

interface BlogProps {
  isFullPage?: boolean;
}

interface Source {
  title: string;
  uri: string;
}

const NeuralLoadingIllustration = () => (
  <div className="flex flex-col items-center justify-center py-24 space-y-8 animate-fade-in">
    <div className="relative w-32 h-32">
      <div className="absolute inset-0 border-2 border-indigo-500/30 rounded-full animate-ping" />
      <div className="absolute inset-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl rotate-45 animate-pulse flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.4)]">
        <svg className="w-8 h-8 text-white -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
    </div>
    <div className="text-center space-y-2">
      <h4 className="text-indigo-400 font-mono text-xs font-black tracking-[0.4em] uppercase animate-pulse">Neural Expansion</h4>
      <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest max-w-[200px] leading-relaxed">Synthesizing multiple technical sources...</p>
    </div>
  </div>
);

const Blog: React.FC<BlogProps> = ({ isFullPage = false }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [expanding, setExpanding] = useState(false);
  const [sources, setSources] = useState<Source[]>([]);
  const [commentText, setCommentText] = useState('');
  const [userName, setUserName] = useState('');

  // Handle URL sync for individual post view
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');
    
    if (postId && posts.length > 0) {
      const post = posts.find(p => p.id === postId);
      if (post && (!selectedPost || selectedPost.id !== postId)) {
        handlePostClick(post);
      }
    } else if (!postId && selectedPost) {
      setSelectedPost(null);
    }
  }, [posts]); // Re-run when posts are loaded

  const handlePostClick = useCallback(async (post: BlogPost) => {
    setSelectedPost(post);
    setSources([]); 
    
    // Update URL without full refresh to enable deep-linking
    const url = new URL(window.location.href);
    url.searchParams.set('id', post.id);
    window.history.pushState({}, '', url.toString());

    if (!post.content) {
      setExpanding(true);
      try {
        const { content, sources: extractedSources } = await expandBlogPost(post);
        const updatedPost = { ...post, content };
        setSelectedPost(updatedPost);
        setSources(extractedSources);
        setPosts(prev => prev.map(p => p.id === post.id ? updatedPost : p));
      } catch (err) {
        console.error(err);
      } finally {
        setExpanding(false);
      }
    }
  }, []);

  const handleBack = () => {
    setSelectedPost(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('id');
    window.history.pushState({}, '', url.toString());
  };

  // Dynamic Metadata Sync
  useEffect(() => {
    const updateMetaTags = (title: string, description: string) => {
      document.title = title;
      const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
        let el = document.querySelector(`meta[${attr}="${name}"]`);
        if (!el) {
          el = document.createElement('meta');
          el.setAttribute(attr, name);
          document.head.appendChild(el);
        }
        el.setAttribute('content', content);
      };
      setMeta('description', description);
      setMeta('og:title', title, 'property');
      setMeta('og:description', description, 'property');
      setMeta('twitter:title', title, 'property');
      setMeta('twitter:description', description, 'property');
    };

    if (selectedPost) {
      updateMetaTags(`${selectedPost.title} | Kev Owino Journal`, selectedPost.summary);
    } else {
      updateMetaTags("Kev Owino | Self-taught Software Developer", "Self-taught software developer specializing in high-performance web applications.");
    }
  }, [selectedPost]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await getLiveBlogPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !selectedPost) return;
    const name = userName.trim() || 'Anonymous Reader';
    const newComment: Comment = {
      id: Date.now().toString(),
      userName: name,
      text: commentText.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };
    const updated = { ...selectedPost, comments: [newComment, ...selectedPost.comments] };
    setSelectedPost(updated);
    setCommentText('');
  };

  if (selectedPost) {
    return (
      <div className="animate-fade-in max-w-4xl mx-auto space-y-12">
        <button onClick={handleBack} className="text-indigo-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:text-indigo-300 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Feed
        </button>
        <article className="space-y-8">
          <div className="space-y-4">
            <span className="text-indigo-400 font-mono text-[10px] uppercase font-black tracking-[0.4em]">{selectedPost.category}</span>
            <h1 className="text-4xl md:text-7xl font-black leading-[0.9] tracking-tighter">{selectedPost.title}</h1>
          </div>
          
          <div className="glass p-8 md:p-16 rounded-[3rem] overflow-hidden">
            {expanding ? (
              <NeuralLoadingIllustration />
            ) : (
              <div className="space-y-12">
                 <div className="whitespace-pre-wrap text-gray-300 leading-relaxed text-lg font-light tracking-wide prose prose-invert max-w-none">{selectedPost.content}</div>
                 
                 {sources.length > 0 && (
                   <div className="mt-12 pt-12 border-t border-white/5">
                     <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-6">Verified Evidence Node</h4>
                     <ul className="flex flex-wrap gap-3">
                       {sources.map((source, idx) => (
                         <li key={idx}>
                           <a href={source.uri} target="_blank" rel="noopener noreferrer" className="px-4 py-2 glass-dark rounded-xl text-[10px] font-black text-gray-400 hover:text-white hover:border-indigo-500/50 transition-all border border-white/5 block">
                             {source.title || "External Source"}
                           </a>
                         </li>
                       ))}
                     </ul>
                   </div>
                 )}
              </div>
            )}
          </div>

          <section className="pt-20 border-t border-white/5 space-y-12">
            <h3 className="text-3xl font-black tracking-tighter">Discussion ({selectedPost.comments.length})</h3>
            <form onSubmit={handleAddComment} className="space-y-4">
              <input value={userName} onChange={e => setUserName(e.target.value)} placeholder="Node Identifier" className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl focus:outline-none focus:border-indigo-500/50 transition-all text-sm font-bold placeholder:text-gray-700 text-white" />
              <textarea value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Synthesize feedback..." className="w-full h-40 bg-white/5 border border-white/10 p-6 rounded-2xl focus:outline-none focus:border-indigo-500/50 transition-all resize-none text-sm font-bold placeholder:text-gray-700 text-white" />
              <button type="submit" className="px-12 py-5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all transform active:scale-95 shadow-2xl shadow-indigo-600/20 text-white">Commit Feedback</button>
            </form>
            <div className="space-y-6">
              {selectedPost.comments.map(c => (
                <div key={c.id} className="flex gap-6 items-start">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-black text-indigo-400 text-lg shadow-inner">{c.userName[0]}</div>
                  <div className="flex-1 glass p-8 rounded-[2.5rem] border border-white/5">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-black text-sm tracking-tight">{c.userName}</span>
                      <span className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em]">{c.timestamp}</span>
                    </div>
                    <p className="text-gray-400 leading-relaxed text-sm font-light">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </article>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {loading ? [1, 2, 3, 4, 5, 6].map(i => <div key={i} className="glass p-10 h-[450px] rounded-[3rem] animate-pulse" />) :
        posts.map(post => (
          <div key={post.id} onClick={() => handlePostClick(post)} className="glass p-10 rounded-[3rem] cursor-pointer hover:border-indigo-500/50 transition-all flex flex-col justify-between group h-full hover:bg-white/5 border border-white/5">
            <div className="space-y-6">
              <span className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.4em]">{post.category}</span>
              <h3 className="text-2xl font-black leading-[1.1] tracking-tight group-hover:text-indigo-400 transition-colors">{post.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-4 leading-relaxed font-light">{post.summary}</p>
            </div>
            <div className="pt-10 flex items-center justify-between">
              <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">{post.date}</span>
              <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">Analysis <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Blog;