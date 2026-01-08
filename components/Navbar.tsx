
'use client';

import React, { useState, useEffect } from 'react';
import { BIO } from '../data';

interface NavbarProps {
  currentView: 'home' | 'blog';
  onNavigate: (view: 'home' | 'blog') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const progress = document.getElementById("scroll-progress");
      if (progress) progress.style.width = scrolled + "%";
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Identity', target: 'about', type: 'scroll' },
    { name: 'Works', target: 'projects', type: 'scroll' },
    { name: 'Journal', target: 'blog', type: 'view' },
    { name: 'Stack', target: 'skills', type: 'scroll' },
  ];

  const handleAction = (link: any) => {
    setIsMobileMenuOpen(false);
    if (link.type === 'view') {
      onNavigate('blog');
    } else {
      if (currentView !== 'home') {
        onNavigate('home');
        // Delay scroll until home is mounted
        setTimeout(() => {
          const el = document.getElementById(link.target);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(link.target);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-500 ${isScrolled || currentView === 'blog' ? 'py-4' : 'py-8'}`}>
        <div className={`max-w-7xl mx-auto px-6 transition-all duration-500 ${isScrolled ? 'glass rounded-full border border-white/10 mx-6' : ''}`}>
          <div className="flex justify-between items-center py-2">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-3 group relative z-[160]">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-all duration-300 shadow-xl shadow-indigo-600/20">
                <span className="text-white text-[10px] font-black">KO</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-black text-sm text-white tracking-tighter">Kev Owino</span>
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest leading-none">Software Developer</span>
              </div>
            </button>

            <div className="hidden lg:flex items-center gap-12">
              <ul className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <button 
                      onClick={() => handleAction(link)}
                      className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group ${
                        (currentView === 'blog' && link.target === 'blog') || (currentView === 'home' && link.target === 'home') ? 'text-indigo-400' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 h-0.5 bg-indigo-500 transition-all w-0 group-hover:w-full" />
                    </button>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => handleAction({ target: 'contact', type: 'scroll' })}
                className="px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all active:scale-95 shadow-xl shadow-white/5"
              >
                Connect
              </button>
            </div>

            <button 
              className="lg:hidden relative z-[160] w-10 h-10 flex items-center justify-center glass rounded-xl" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`w-3/4 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[140] lg:hidden transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="absolute inset-0 bg-[#030712]/95 backdrop-blur-3xl" />
        <div className="relative h-full flex flex-col justify-center items-center px-8">
          <ul className="flex flex-col gap-10 text-center relative z-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button onClick={() => handleAction(link)} className="text-5xl font-black tracking-tighter text-white hover:text-indigo-400 active:scale-95 inline-block">
                  {link.name}
                </button>
              </li>
            ))}
            <li>
              <button onClick={() => handleAction({ target: 'contact', type: 'scroll' })} className="text-2xl font-black tracking-tighter text-indigo-500 uppercase">
                Contact
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
