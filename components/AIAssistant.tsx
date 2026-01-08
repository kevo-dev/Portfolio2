'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getGeminiResponse } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Terminal, Sparkles, MessageSquare, ShieldCheck } from 'lucide-react';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Neural link established. I am Kev-AI. How can I assist with your architectural inquiry today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    "Tech Stack breakdown",
    "Scaling philosophy",
    "Portfolio highlights",
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
      setMessages(prev => [...prev, { role: 'model', text: "Signal lost. Neural relay failed to synchronize. Please re-initiate." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-[200] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="w-[calc(100vw-4rem)] sm:w-[450px] h-[650px] glass rounded-[3rem] shadow-[0_50px_120px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col mb-8 border border-indigo-500/20"
          >
            {/* Header */}
            <div className="p-8 bg-indigo-500/5 border-b border-white/5 flex justify-between items-center backdrop-blur-3xl">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-14 h-14 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-indigo-600/40">
                    <Terminal size={24} className="text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-[3px] border-[#0a0a1a] rounded-full" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-white tracking-tight flex items-center gap-2">
                    Kev-AI v3.0 <ShieldCheck size={14} className="text-indigo-400" />
                  </h4>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
                    <span className="text-[10px] text-indigo-400/70 font-black uppercase tracking-[0.2em]">Neural Sync Active</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-3 rounded-2xl hover:bg-white/5 transition-all text-gray-500 hover:text-white">
                <X size={22} />
              </button>
            </div>
            
            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide bg-gradient-to-b from-transparent to-indigo-950/5">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-6 rounded-[2rem] text-[14px] leading-relaxed font-medium ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white ml-4 rounded-tr-none shadow-xl' 
                      : 'glass border-white/10 text-gray-300 mr-4 rounded-tl-none bg-white/5'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="glass px-8 py-5 rounded-[2rem] rounded-tl-none flex gap-3 items-center">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Footer */}
            <div className="px-8 py-6 border-t border-white/5 bg-black/40 backdrop-blur-2xl">
              <div className="flex flex-wrap gap-2.5 mb-5">
                {quickPrompts.map(prompt => (
                  <button 
                    key={prompt} 
                    onClick={() => handleSubmit(undefined, prompt)}
                    className="text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl border border-white/5 hover:border-indigo-500/50 hover:bg-indigo-500/15 transition-all text-gray-500 hover:text-white"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex gap-4">
                <input 
                  value={input} 
                  onChange={e => setInput(e.target.value)} 
                  placeholder="Initiate communication protocol..." 
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm font-bold focus:outline-none focus:border-indigo-500/60 transition-all placeholder:text-gray-700 text-white" 
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()} 
                  className="bg-indigo-600 w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-indigo-500 transition-all disabled:opacity-50 shadow-2xl shadow-indigo-600/30 group"
                >
                  <Send size={20} className="text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-20 h-20 md:w-24 md:h-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center shadow-[0_25px_70px_rgba(79,70,229,0.4)] hover:scale-105 active:scale-95 transition-all duration-500 group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={32} className="text-white" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <MessageSquare size={36} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {!isOpen && (
          <div className="absolute top-0 right-0 p-1.5">
            <span className="flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500 border-2 border-indigo-700 shadow-xl"></span>
            </span>
          </div>
        )}
      </button>
    </div>
  );
};

export default AIAssistant;