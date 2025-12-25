
import React, { useState, useEffect } from 'react';
import { getLiveBlogPosts, getFullArticleContent } from '../services/geminiService';
import { BlogPost, Comment } from '../types';

interface BlogProps {
  isFullPage?: boolean;
}

const NeuralLoadingIllustration = () => (
  <div className="flex flex-col items-center justify-center py-20 space-y-8 animate-fade-in">
    <div className="relative w-32 h-32">
      {/* Outer Pulse Rings */}
      <div className="absolute inset-0 border-2 border-indigo-500/30 rounded-full animate-ping" />
      <div className="absolute inset-0 border-2 border-purple-500/20 rounded-full animate-ping [animation-delay:400ms]" />
      
      {/* Central Neural Core */}
      <div className="absolute inset-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl rotate-45 animate-pulse flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.4)]">
        <svg className="w-8 h-8 text-white -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>

      {/* Orbiting Particles */}
      <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
        <div className="absolute top-0 left-1/2 w-2 h-2 bg-indigo-400 rounded-full -translate-x-1/2 shadow-[0_0_10px_#818cf8]" />
      </div>
      <div className="absolute inset-0 animate-[spin_6s_linear_infinite_reverse]">
        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full -translate-x-1/2 shadow-[0_0_10px_#c084fc]" />
      </div>
    </div>
    
    <div className="text-center space-y-2">
      <h4 className="text-indigo-400 font-mono text-sm font-bold tracking-[0.3em] uppercase animate-pulse">
        Neural Expansion in Progress
      </h4>
      <p className="text-gray-500 text-xs font-mono max-w-[200px] leading-relaxed">
        Gemini is synthesizing source data and technical context...
      </p>
    </div>
  </div>
);

const BlogSkeletonCard = () => (
  <div className="glass p-8 rounded-[2rem] h-[400px] flex flex-col justify-between border-white/5 overflow-hidden relative group">
    {/* Scanning Beam Effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite] skew-x-12" />
    
    <div className="space-y-6 relative z-10">
      <div className="flex justify-between items-center">
        <div className="h-6 w-24 bg-white/5 rounded-full animate-pulse" />
        <div className="h-3 w-16 bg-white/5 rounded animate-pulse" />
      </div>
      
      <div className="space-y-4">
        <div className="h-8 w-full bg-white/5 rounded-xl animate-pulse" />
        <div className="h-8 w-4/5 bg-white/5 rounded-xl animate-pulse [animation-delay:200ms]" />
      </div>

      <div className="space-y-3 pt-2">
        <div className="h-3 w-full bg-white/5 rounded animate-pulse" />
        <div className="h-3 w-full bg-white/5 rounded animate-pulse [animation-delay:400ms]" />
        <div className="h-3 w-2/3 bg-white/5 rounded animate-pulse [animation-delay:600ms]" />
      </div>
    </div>

    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
      <div className="flex gap-4">
        <div className="w-8 h-4 bg-white/5 rounded animate-pulse" />
        <div className="w-8 h-4 bg-white/5 rounded animate-pulse" />
      </div>
      <div className="w-24 h-3 bg-white/5 rounded animate-pulse" />
    </div>

    {/* Center Probe Icon */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
      <div className="w-12 h-12 border-2 border-indigo-500/30 rounded-full animate-ping" />
    </div>
  </div>
);

const ShareModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  post: BlogPost 
}> = ({ isOpen, onClose, post }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: 'Twitter',
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this article: ${post.title}`)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'bg-[#1DA1F2]'
    },
    {
      name: 'Email',
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
      url: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`I thought you might find this interesting: ${shareUrl}`)}`,
      color: 'bg-indigo-600'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass w-full max-w-md rounded-[2.5rem] border-white/10 p-8 shadow-2xl animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <h4 className="text-xl font-bold">Share Article</h4>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {shareLinks.map(link => (
            <a 
              key={link.name} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:bg-white/10 transition-all group"
            >
              <div className={`w-12 h-12 ${link.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                {link.icon}
              </div>
              <span className="text-sm font-semibold">{link.name}</span>
            </a>
          ))}
        </div>

        <div className="space-y-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Direct Link</p>
          <div className="flex gap-2">
            <div className="flex-1 glass bg-black/20 border-white/5 rounded-2xl px-4 py-3 text-sm text-gray-400 font-mono truncate">
              {shareUrl}
            </div>
            <button 
              onClick={handleCopy}
              className={`px-6 rounded-2xl font-bold transition-all active:scale-95 ${copied ? 'bg-green-600 text-white' : 'bg-white text-black hover:bg-gray-200'}`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Blog: React.FC<BlogProps> = ({ isFullPage = false }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [expanding, setExpanding] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [userName, setUserName] = useState(() => localStorage.getItem('kev-blog-username') || '');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const data = await getLiveBlogPosts();
      
      const postsWithLocalComments = data.map(post => {
        const localComments = localStorage.getItem(`blog-comments-${post.title}`);
        return {
          ...post,
          comments: localComments ? JSON.parse(localComments) : post.comments
        };
      });

      setPosts(postsWithLocalComments);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const handlePostClick = async (post: BlogPost) => {
    setSelectedPost(post);
    if (!post.content) {
      setExpanding(true);
      const content = await getFullArticleContent(post.title, post.summary, post.url);
      const updatedPost = { ...post, content };
      setSelectedPost(updatedPost);
      setPosts(prev => prev.map(p => p.id === post.id ? updatedPost : p));
      setExpanding(false);
    }
  };

  const handleLike = () => {
    if (!selectedPost) return;
    const updated = { ...selectedPost, likes: selectedPost.likes + 1 };
    setSelectedPost(updated);
    setPosts(prev => prev.map(p => p.id === selectedPost.id ? updated : p));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !selectedPost) return;

    const finalUserName = userName.trim() || 'Anonymous Reader';
    localStorage.setItem('kev-blog-username', finalUserName);

    const newComment: Comment = {
      id: Date.now().toString(),
      userName: finalUserName,
      text: commentText.trim(),
      timestamp: new Date().toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    const updatedComments = [newComment, ...selectedPost.comments];
    const updatedPost = { ...selectedPost, comments: updatedComments };

    localStorage.setItem(`blog-comments-${selectedPost.title}`, JSON.stringify(updatedComments));

    setSelectedPost(updatedPost);
    setPosts(prev => prev.map(p => p.id === selectedPost.id ? updatedPost : p));
    setCommentText('');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (selectedPost) {
    return (
      <div className="animate-fade-in max-w-4xl mx-auto space-y-12 py-12 px-4 md:px-0">
        <button 
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors font-medium group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Feed
        </button>
        
        <article className="space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-500/20">
                {selectedPost.category}
              </span>
              <span className="text-gray-500 font-mono text-xs">{selectedPost.date}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter">{selectedPost.title}</h1>
            <p className="text-xl text-gray-400 leading-relaxed font-light italic border-l-4 border-indigo-500 pl-6">
              {selectedPost.summary}
            </p>
          </div>

          <div className="prose prose-invert prose-indigo max-w-none glass p-8 md:p-12 rounded-[2.5rem] border-white/5 relative">
            {expanding ? (
              <NeuralLoadingIllustration />
            ) : (
              <div className="text-gray-300 leading-loose space-y-6 text-lg whitespace-pre-wrap animate-fade-in">
                {selectedPost.content}
              </div>
            )}
            
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button 
                  onClick={handleLike}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all active:scale-95 group"
                >
                  <svg className="w-6 h-6 fill-current group-hover:scale-125 transition-transform" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  <span className="font-bold">{selectedPost.likes} Likes</span>
                </button>

                <button 
                  onClick={() => setIsShareModalOpen(true)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white hover:text-black transition-all active:scale-95 group"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                  <span className="font-bold">Share</span>
                </button>
              </div>
              
              <a 
                href={selectedPost.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs text-gray-500 hover:text-indigo-400 transition-colors font-mono w-full sm:w-auto text-center"
              >
                Original Source: {new URL(selectedPost.url).hostname}
              </a>
            </div>
          </div>

          <ShareModal 
            isOpen={isShareModalOpen} 
            onClose={() => setIsShareModalOpen(false)} 
            post={selectedPost} 
          />

          <section className="space-y-10 pt-16 border-t border-white/5">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-black tracking-tight flex items-center gap-4">
                Discussion 
                <span className="text-sm bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-full font-mono">{selectedPost.comments.length}</span>
              </h3>
            </div>

            <form onSubmit={handleAddComment} className="glass p-8 rounded-[2.5rem] border-white/10 space-y-6 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Your Name</label>
                  <input 
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Satoshi Nakamoto"
                    className="w-full bg-black/20 border border-white/5 rounded-2xl px-5 py-3 focus:border-indigo-500 focus:outline-none text-white transition-all text-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Your Thoughts</label>
                <textarea 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your perspective on this article..."
                  className="w-full h-32 bg-black/20 border border-white/5 rounded-2xl px-5 py-4 focus:border-indigo-500 focus:outline-none text-white resize-none transition-all text-sm leading-relaxed"
                />
              </div>

              <div className="flex justify-end">
                <button 
                  type="submit"
                  disabled={!commentText.trim()}
                  className="px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 active:scale-95 disabled:opacity-50 disabled:scale-100"
                >
                  Post Comment
                </button>
              </div>
            </form>

            <div className="space-y-8">
              {selectedPost.comments.length === 0 ? (
                <div className="text-center py-20 glass rounded-[2.5rem] border-dashed border-white/10">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  </div>
                  <p className="text-gray-400 font-medium">The conversation is just starting.</p>
                  <p className="text-gray-600 text-sm">Be the first to share your thoughts!</p>
                </div>
              ) : (
                selectedPost.comments.map(comment => (
                  <div key={comment.id} className="flex gap-6 group animate-fade-in">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center font-black text-white shadow-lg text-sm">
                        {getInitials(comment.userName)}
                      </div>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white text-base">{comment.userName}</h4>
                        <span className="text-[10px] text-gray-500 font-mono tracking-tighter uppercase">{comment.timestamp}</span>
                      </div>
                      <div className="glass p-6 rounded-3xl rounded-tl-none border-white/5 relative">
                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{comment.text}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Real-time Feed</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Engineering Chronicles</h2>
        </div>
        <p className="text-gray-400 max-w-sm font-light text-sm">
          Latest technical breakthroughs scraped from verified sources and expanded with Gemini 3 Flash.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <BlogSkeletonCard key={i} />
          ))
        ) : (
          posts.map((post, idx) => (
            <div 
              key={post.id} 
              onClick={() => handlePostClick(post)}
              className="group glass p-8 rounded-[2rem] flex flex-col justify-between hover:border-indigo-500/40 transition-all hover:scale-[1.02] cursor-pointer relative overflow-hidden border-white/5"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/40">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest px-2.5 py-1 bg-indigo-500/10 rounded-lg border border-indigo-500/10">
                    {post.category}
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold group-hover:text-indigo-400 transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-3 font-light leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    <span className="text-[10px] font-bold">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                    <span className="text-[10px] font-bold">{post.comments.length}</span>
                  </div>
                </div>
                <span className="text-[10px] text-gray-500 font-mono">{new URL(post.url).hostname.replace('www.', '')}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blog;
