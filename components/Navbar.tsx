
import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { BIO } from '../data';

interface NavbarProps {
  currentView: 'home' | 'blog';
  onNavigate: (view: 'home' | 'blog', sectionId?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'About', id: SectionId.About, view: 'home' },
    { name: 'Projects', id: SectionId.Projects, view: 'home' },
    { name: 'Blog', id: SectionId.Blog, view: 'blog' },
    { name: 'Skills', id: SectionId.Skills, view: 'home' },
    { name: 'Contact', id: SectionId.Contact, view: 'home' },
  ];

  const handleLinkClick = (view: 'home' | 'blog', sectionId?: string) => {
    onNavigate(view, sectionId);
    setIsMobileMenuOpen(false);
  };

  const SocialIcons = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center gap-5 ${className}`}>
      <a href={BIO.socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all hover:scale-110" aria-label="GitHub">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      </a>
      <a href={BIO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all hover:scale-110" aria-label="LinkedIn">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
      </a>
      <a href={BIO.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all hover:scale-110" aria-label="Twitter">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
      </a>
    </div>
  );

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled || currentView === 'blog' ? 'py-4 glass border-b border-white/10' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={() => handleLinkClick('home', SectionId.Hero)}
            className="text-xl font-bold tracking-tighter flex items-center gap-2 group relative z-[110]"
          >
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-indigo-600/20">
              <span className="text-white text-xs font-black">KO</span>
            </div>
            <span className="hidden sm:block font-extrabold text-white tracking-tight">Kev O'Wino</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => handleLinkClick(link.view as any, link.view === 'home' ? link.id : undefined)}
                    className={`text-sm font-semibold transition-all relative group ${
                      (currentView === link.view && (link.view === 'blog' || currentView === 'home')) 
                        ? 'text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full ${currentView === link.view && link.id === SectionId.Blog ? 'w-full' : ''}`} />
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="h-4 w-px bg-white/10" />
            
            <SocialIcons />

            <button 
              onClick={() => handleLinkClick('home', SectionId.Contact)}
              className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="lg:hidden relative z-[110] p-2 text-white bg-white/5 rounded-xl border border-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between overflow-hidden">
              <span className={`w-full h-0.5 bg-current transition-all duration-300 origin-left ${isMobileMenuOpen ? 'rotate-45 translate-x-1' : ''}`} />
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 -translate-x-full' : ''}`} />
              <span className={`w-full h-0.5 bg-current transition-all duration-300 origin-left ${isMobileMenuOpen ? '-rotate-45 translate-x-1' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - High Contrast, Non-Transparent */}
      <div className={`fixed inset-0 z-[90] lg:hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        {/* Solid Dark Background with Blur Overlay */}
        <div className="absolute inset-0 bg-[#030712] transition-opacity duration-500" />
        
        <div className="relative flex flex-col h-full pt-32 pb-12 px-8 overflow-y-auto">
          <ul className="flex flex-col gap-8 mb-12">
            {navLinks.map((link, i) => (
              <li key={link.id} className={`transition-all duration-500 delay-[${i * 100}ms] ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                <button 
                  onClick={() => handleLinkClick(link.view as any, link.view === 'home' ? link.id : undefined)}
                  className={`text-4xl font-black tracking-tighter transition-colors ${
                    currentView === link.view && (link.id === SectionId.Blog || link.view === 'home')
                      ? 'text-indigo-500' 
                      : 'text-white hover:text-indigo-400'
                  }`}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>

          <div className={`mt-auto space-y-10 transition-all duration-700 delay-300 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Find Me Online</p>
              <SocialIcons className="gap-8" />
            </div>

            <button 
              onClick={() => handleLinkClick('home', SectionId.Contact)}
              className="w-full py-5 bg-indigo-600 text-white text-lg font-black rounded-2xl hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
            >
              Let's Build Something
            </button>
            
            <p className="text-center text-gray-500 text-xs font-mono">
              Nairobi, Kenya • Available for remote work
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
