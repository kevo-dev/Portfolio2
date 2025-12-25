
import React from 'react';
import Navbar from './components/Navbar';
import BentoGrid from './components/BentoGrid';
import AIAssistant from './components/AIAssistant';
import { PROJECTS, SKILLS, BIO } from './data';
import { SectionId } from './types';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section id={SectionId.Hero} className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 relative overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -z-10 animate-pulse delay-700" />
        
        <div className="max-w-4xl w-full text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-white/5 animate-fade-in">
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
            <a href={`#${SectionId.Projects}`} className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-transform">
              Explore Projects
            </a>
            <a href={`#${SectionId.Contact}`} className="w-full sm:w-auto px-8 py-4 glass text-white font-bold rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-colors">
              Get in Touch
            </a>
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
                src="https://picsum.photos/seed/kev/800/1000" 
                alt="Profile" 
                className="relative z-10 rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
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

      {/* Skills Section */}
      <section id={SectionId.Skills} className="py-32 px-6">
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
                <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded uppercase">Real Data</span>
              </h4>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart data={SKILLS.slice(0, 6)}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#9ca3af" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
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
      <section id={SectionId.Contact} className="py-32 px-6 bg-[#050914] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          <div className="space-y-4">
            <h2 className="text-indigo-400 font-mono tracking-widest text-sm uppercase">Ready to Start?</h2>
            <h3 className="text-5xl md:text-7xl font-bold">Let's build something <span className="gradient-text">amazing</span> together.</h3>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8">
            <a 
              href={`mailto:${BIO.email}`}
              className="group flex flex-col items-center gap-4 glass p-10 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all w-full md:w-auto"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-tighter">Email Me</p>
                <p className="text-xl font-bold">{BIO.email}</p>
              </div>
            </a>

            <div className="flex flex-col items-center gap-4 glass p-10 rounded-3xl border border-white/5 w-full md:w-auto">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-tighter">Location</p>
                <p className="text-xl font-bold">{BIO.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Kev O'Wino. Built with React & Gemini.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Interactive AI Assistant */}
      <AIAssistant />
    </div>
  );
};

export default App;
