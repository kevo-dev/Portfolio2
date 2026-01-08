
'use client';

import React from 'react';
import Navbar from './Navbar';
import Blog from './Blog';
import AIAssistant from './AIAssistant';

interface BlogViewProps {
  onNavigate: (view: 'home' | 'blog') => void;
}

export default function BlogView({ onNavigate }: BlogViewProps) {
  return (
    <div className="relative min-h-screen bg-[#030712] text-gray-100 bg-grain">
      <Navbar currentView="blog" onNavigate={onNavigate} />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-16 space-y-4">
             <h2 className="text-indigo-400 font-mono tracking-[0.4em] text-[10px] uppercase font-black">Engineering Chronicles</h2>
             <h1 className="text-6xl md:text-8xl font-black tracking-tighter">The Journal</h1>
          </header>
          <Blog isFullPage={true} />
        </div>
      </main>
      <footer className="py-12 px-6 border-t border-white/5 text-center text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
        <p>© {new Date().getFullYear()} Kev Owino • Neural Expansion Node</p>
      </footer>
      <AIAssistant />
    </div>
  );
}
