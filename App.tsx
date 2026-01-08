
'use client';

import React, { useState, useEffect } from 'react';
import HomeView from './components/HomeView';
import BlogView from './components/BlogView';

export default function App() {
  const [view, setView] = useState<'home' | 'blog'>('home');

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
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (newView: 'home' | 'blog') => {
    setView(newView);
    if (newView === 'blog') {
      window.location.hash = 'blog';
    } else {
      window.location.hash = '';
      // If we're already on home but the hash was #blog, clearing it might not trigger scroll
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {view === 'home' ? (
        <HomeView onNavigate={navigateTo} />
      ) : (
        <BlogView onNavigate={navigateTo} />
      )}
    </div>
  );
}
