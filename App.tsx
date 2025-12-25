
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BentoGrid from './components/BentoGrid';
import Blog from './components/Blog';
import AIAssistant from './components/AIAssistant';
import { PROJECTS, SKILLS, BIO } from './data';
import { SectionId } from './types';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'blog'>('home');

  const handleNavigate = (targetView: 'home' | 'blog', sectionId?: string) => {
    if (targetView === 'blog') {
      setView('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setView('home');
      if (sectionId) {
        // Wait for state update to render home sections before scrolling
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
      }
    }
  };

  return (
    <div className="relative min-h-screen">
      <Navbar currentView={view} onNavigate={handleNavigate} />

      {view === 'blog' ? (
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <Blog isFullPage={true} />
          </div>
        </main>
      ) : (
        <main>
          {/* Hero Section */}
          <section id={SectionId.Hero} className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 relative overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -z-10 animate-pulse delay-700" />
            
            <div className="max-w-4xl w-full text-center space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-white/5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                <span className="text-xs font-semibold tracking-wider uppercase text-gray-400">Available for new opportunities</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-tight">
                Engineering <span className="gradient-text">Exceptional</span> Digital Experiences.
              </h1>
              
              <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                I'm a Full-Stack Engineer specializing in building modern, high-performance web applications with a focus on user experience and architectural excellence.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button onClick={() => handleNavigate('home', SectionId.Projects)} className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-transform">
                  Explore Projects
                </button>
                <button onClick={() => handleNavigate('home', SectionId.Contact)} className="w-full sm:w-auto px-8 py-4 glass text-white font-bold rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-colors">
                  Get in Touch
                </button>
              </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
              </svg>
            </div>
          </section>

          {/* About Section */}
          <section id={SectionId.About} className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-indigo-500/10 rounded-3xl blur-2xl group-hover:bg-indigo-500/20 transition-colors" />
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                    alt="Profile" 
                    className="relative z-10 rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500 w-full object-cover aspect-[4/5]"
                  />
                </div>
                
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-indigo-400 font-mono tracking-widest text-sm uppercase">About Me</h2>
                    <h3 className="text-4xl md:text-5xl font-bold">Driven by Innovation, Defined by Code.</h3>
                  </div>
                  
                  <p className="text-lg text-gray-400 leading-relaxed font-light">
                    {BIO.about}
                  </p>

                  <div className="grid grid-cols-2 gap-8 py-6 border-y border-white/5">
                    <div>
                      <h4 className="text-3xl font-bold mb-1">5+</h4>
                      <p className="text-sm text-gray-500 uppercase font-medium">Years Experience</p>
                    </div>
                    <div>
                      <h4 className="text-3xl font-bold mb-1">50+</h4>
                      <p className="text-sm text-gray-500 uppercase font-medium">Projects Shipped</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {Object.entries(BIO.socials).map(([platform, url]) => (
                      <a key={platform} href={url} className="w-12 h-12 glass rounded-full flex items-center justify-center hover:text-indigo-400 transition-colors border border-white/10">
                        <span className="sr-only">{platform}</span>
                        <div className="capitalize font-mono text-xs">{platform.charAt(0)}</div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id={SectionId.Projects} className="py-32 px-6 bg-[#050914]">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div className="space-y-4">
                  <h2 className="text-indigo-400 font-mono tracking-widest text-sm uppercase">Selected Works</h2>
                  <h3 className="text-4xl md:text-5xl font-bold">Portfolio Showcase</h3>
                </div>
                <p className="text-gray-400 max-w-md font-light">
                  A collection of hand-crafted digital solutions focusing on performance, scalability, and user-centric design.
                </p>
              </div>
              
              <BentoGrid projects={PROJECTS} />
            </div>
          </section>

          {/* Home Blog Preview */}
          <section id={SectionId.Blog} className="py-32 px-6">
            <div className="max-w-7xl mx-auto space-y-12">
              <Blog />
              <div className="flex justify-center pt-8">
                <button 
                  onClick={() => handleNavigate('blog')}
                  className="px-8 py-4 glass border border-white/10 rounded-2xl hover:bg-white/5 transition-colors font-bold flex items-center gap-3"
                >
                  View Full Blog Experience
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id={SectionId.Skills} className="py-32 px-6 bg-[#050914]">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-indigo-400 font-mono tracking-widest text-sm uppercase">Expertise</h2>
                    <h3 className="text-4xl md:text-5xl font-bold">Technical Stack</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {SKILLS.map(skill => (
                      <div key={skill.name} className="glass p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-3 group hover:border-indigo-500/30 transition-all">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="text-xs font-bold text-indigo-400">{skill.name.slice(0, 2).toUpperCase()}</span>
                        </div>
                        <span className="text-xs font-medium text-gray-400 group-hover:text-white">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass p-8 rounded-3xl h-[400px]">
                  <h4 className="text-lg font-semibold mb-8 flex items-center gap-2">
                    Proficiency Index
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded uppercase font-mono tracking-tighter">Real-time Data</span>
                  </h4>
                  <ResponsiveContainer width="100%" height="80%">
                    <BarChart data={SKILLS.slice(0, 6)}>
                      <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis hide />
                      <Tooltip 
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="glass px-3 py-2 rounded-lg border border-white/10">
                                <p className="text-xs font-bold">{payload[0].value}%</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="level" radius={[10, 10, 0, 0]}>
                        {SKILLS.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6366f1' : '#a855f7'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id={SectionId.Contact} className="py-32 px-6 relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center space-y-12">
              <div className="space-y-4">
                <h2 className="text-indigo-400 font-mono tracking-widest text-sm uppercase">Let's Talk</h2>
                <h3 className="text-5xl md:text-7xl font-bold">Ready to build something <span className="gradient-text">extraordinary</span>?</h3>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8">
                <a href={`mailto:${BIO.email}`} className="group flex flex-col items-center gap-4 glass p-10 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all w-full md:w-auto">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-tighter">Email Me</p>
                    <p className="text-xl font-bold">{BIO.email}</p>
                  </div>
                </a>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Kev O'Wino. Built with React & AI.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
};

export default App;
