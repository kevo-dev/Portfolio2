
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getGeminiResponse } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Systems online. I am Kev-AI. How can I assist with your architectural inquiry?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickPrompts = [
    "Tell me about Kev's stack",
    "How does he handle scalability?",
    "Recent projects?",
  ];

  const handleSubmit = async (e?: React.FormEvent, customMsg?: string) => {
    e?.preventDefault();
    const userMsg = customMsg || input.trim();
    if (!userMsg || isLoading) return;
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const responseText = await getGeminiResponse(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Signal lost. Please verify connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[200] flex flex-col items-end">
      {isOpen && (
        <div className="w-[calc(100vw-3rem)] sm:w-[420px] h-[580px] glass rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col mb-6 border border-indigo-500/20 animate-fade-in origin-bottom-right">
          <div className="p-6 bg-indigo-600/5 border-b border-white/5 flex justify-between items-center backdrop-blur-3xl">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-white text-xs shadow-lg shadow-indigo-600/30">AI</div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-[#030712] rounded-full" />
              </div>
              <div>
                <h4 className="font-black text-sm tracking-tight text-white">Kev-AI Neural Node</h4>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                  <span className="text-[9px] text-gray-500 font-black uppercase tracking-[0.3em]">Syncing • Gemini 3</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-2xl hover:bg-white/5 flex items-center justify-center transition-all text-gray-500 hover:text-white">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-hide bg-gradient-to-b from-transparent to-indigo-950/10">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-[1.5rem] text-[13px] leading-relaxed shadow-sm font-medium ${msg.role === 'user' ? 'bg-indigo-600 text-white ml-4 rounded-tr-none' : 'glass-dark border-white/5 text-gray-300 mr-4 rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="glass px-6 py-4 rounded-[1.5rem] rounded-tl-none flex gap-2 items-center">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="px-6 py-4 border-t border-white/5 bg-black/20 backdrop-blur-xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {quickPrompts.map(prompt => (
                <button 
                  key={prompt} 
                  onClick={() => handleSubmit(undefined, prompt)}
                  className="text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border border-white/5 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all text-gray-500 hover:text-white"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                placeholder="Synchronize input..." 
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xs font-bold focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-gray-700 text-white" 
              />
              <button type="submit" disabled={isLoading || !input.trim()} className="bg-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-indigo-500 transition-all disabled:opacity-50 disabled:grayscale shadow-2xl shadow-indigo-600/40">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </form>
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`w-16 h-16 md:w-20 md:h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center shadow-[0_20px_60px_rgba(79,70,229,0.4)] transition-all duration-500 hover:scale-110 active:scale-95 group overflow-hidden ${isOpen ? 'rotate-90' : ''}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          {isOpen ? (
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
};

export default AIAssistant;
