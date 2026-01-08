'use client';

import React, { useState, useEffect } from 'react';
import HomeView from './components/HomeView';
import BlogView from './components/BlogView';

export default function App() {
  const [view, setView] = useState<'home' | 'blog'>('home');

  useEffect(() => {
    const handleNavigation = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      
      // Support both /blog path and #blog hash for seamless navigation
      if (hash.startsWith('#blog') || path.includes('/blog')) {
        setView('blog');
      } else {
        setView('home');
      }
    };

    // Sync state on hash changes and browser back/forward buttons
    window.addEventListener('hashchange', handleNavigation);
    window.addEventListener('popstate', handleNavigation);
    
    // Initial check on mount
    handleNavigation();

    return () => {
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  const navigateTo = (newView: 'home' | 'blog') => {
    setView(newView);
    const search = window.location.search; // Preserve any search params like ?id=...
    if (newView === 'blog') {
      window.history.pushState(null, '', `/blog${search}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState(null, '', `/${search}`);
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