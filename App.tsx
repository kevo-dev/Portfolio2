
import React, { useState, useEffect } from 'react';
import HomePage from './app/page';
import BlogPage from './app/blog/page';

export default function App() {
  const [view, setView] = useState<'home' | 'blog'>('home');

  // Handle hash changes for simple routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#blog')) {
        setView('blog');
      } else {
        setView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (newView: 'home' | 'blog') => {
    setView(newView);
    window.location.hash = newView === 'blog' ? 'blog' : '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container selection:bg-indigo-500/30">
      {/* Dynamic View Injection */}
      {view === 'home' ? (
        <HomePage onNavigate={navigateTo} />
      ) : (
        <BlogPage onNavigate={navigateTo} />
      )}
      
      {/* Global Scroll Progress */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-[210] transition-all duration-300" 
           style={{ width: '0%' }} 
           id="scroll-progress" />
    </div>
  );
}
