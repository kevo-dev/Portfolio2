'use client';

import React, { useState, useEffect, ErrorInfo, ReactNode } from 'react';
import HomeView from './components/HomeView';
import BlogView from './components/BlogView';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

// Fixed ErrorBoundary by using React.Component directly to ensure property inheritance and type inference for 'props' are correctly resolved
class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  // Explicit constructor helps ensure props are correctly initialized and typed in the class context
  constructor(props: Props) {
    super(props);
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#030712] text-white p-10">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-black text-indigo-500">SYSTEM CRITICAL ERROR</h1>
            <p className="text-gray-400">The neural link has collapsed. Re-initialization required.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-indigo-600 rounded-xl font-black uppercase text-xs"
            >
              Reboot Terminal
            </button>
          </div>
        </div>
      );
    }

    // Accessing children from props, which is inherited from the React.Component base class
    return this.props.children;
  }
}

export default function App() {
  const [view, setView] = useState<'home' | 'blog'>('home');

  useEffect(() => {
    const handleNavigation = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      
      if (hash.startsWith('#blog') || path.includes('/blog')) {
        setView('blog');
      } else {
        setView('home');
      }
    };

    window.addEventListener('hashchange', handleNavigation);
    window.addEventListener('popstate', handleNavigation);
    handleNavigation();

    return () => {
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  const navigateTo = (newView: 'home' | 'blog') => {
    setView(newView);
    if (newView === 'blog') {
      window.history.pushState(null, '', '/blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        {view === 'home' ? (
          <HomeView onNavigate={navigateTo} />
        ) : (
          <BlogView onNavigate={navigateTo} />
        )}
      </div>
    </ErrorBoundary>
  );
}
