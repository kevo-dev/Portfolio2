
import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';

interface NavbarProps {
  currentView: 'home' | 'blog';
  onNavigate: (view: 'home' | 'blog', sectionId?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', id: SectionId.About, view: 'home' },
    { name: 'Projects', id: SectionId.Projects, view: 'home' },
    { name: 'Blog', id: SectionId.Blog, view: 'blog' },
    { name: 'Skills', id: SectionId.Skills, view: 'home' },
    { name: 'Contact', id: SectionId.Contact, view: 'home' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || currentView === 'blog' ? 'py-4 glass border-b border-white/10' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button 
          onClick={() => onNavigate('home', SectionId.Hero)}
          className="text-xl font-bold tracking-tighter flex items-center gap-2 group"
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <span className="text-white text-xs">KO</span>
          </div>
          <span className="hidden sm:block">Kev O'Wino</span>
        </button>

        <div className="flex items-center gap-8">
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button 
                  onClick={() => onNavigate(link.view as any, link.view === 'home' ? link.id : undefined)}
                  className={`text-sm font-medium transition-colors ${currentView === link.view && link.id === SectionId.Blog ? 'text-indigo-400' : 'text-gray-400 hover:text-white'}`}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
          
          <button 
            onClick={() => onNavigate('home', SectionId.Contact)}
            className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            Hire Me
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
