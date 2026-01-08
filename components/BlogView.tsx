'use client';

import React from 'react';
import Navbar from './Navbar';
import Blog from './Blog';
import AIAssistant from './AIAssistant';
import { BIO } from '../data';
import { Github, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

interface BlogViewProps {
  onNavigate: (view: 'home' | 'blog') => void;
}

const SocialLinks = () => (
  <div className="flex items-center justify-center gap-4">
    <a href={BIO.socials.github} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-lg text-gray-500 hover:text-white hover:border-indigo-500/50 transition-all" title="GitHub">
      <Github size={16} />
    </a>
    <a href={BIO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-lg text-gray-500 hover:text-white hover:border-indigo-500/50 transition-all" title="LinkedIn">
      <Linkedin size={16} />
    </a>
    <a href={BIO.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-lg text-gray-500 hover:text-white hover:border-indigo-500/50 transition-all" title="Twitter">
      <Twitter size={16} />
    </a>
    <a href={BIO.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-lg text-gray-500 hover:text-white hover:border-indigo-500/50 transition-all" title="Instagram">
      <Instagram size={16} />
    </a>
    <a href={BIO.socials.facebook} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-lg text-gray-500 hover:text-white hover:border-indigo-500/50 transition-all" title="Facebook">
      <Facebook size={16} />
    </a>
  </div>
);

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
      <footer className="py-20 px-6 border-t border-white/5 text-center space-y-8">
        <SocialLinks />
        <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">© {new Date().getFullYear()} Kev Owino • Neural Expansion Node</p>
      </footer>
      <AIAssistant />
    </div>
  );
}
