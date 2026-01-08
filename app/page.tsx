
'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import BentoGrid from '../components/BentoGrid';
import AIAssistant from '../components/AIAssistant';
import { PROJECTS, SKILLS, BIO } from '../data';
import { SectionId } from '../types';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { motion } from 'framer-motion';

interface HomePageProps {
  onNavigate: (view: 'home' | 'blog') => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-gray-100 selection:bg-indigo-500/30 bg-grain">
      <Navbar currentView="home" onNavigate={onNavigate} />

      <main className="mesh-gradient">
        {/* Hero Section */}
        <section id={SectionId.Hero} className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 relative overflow-hidden">
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[160px] pointer-events-none" />
          
          <div className="max-w-5xl w-full text-center space-y-12 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-6 py-2.5 bg-black/40 backdrop-blur-xl rounded-full border border-white/5 mx-auto"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-black tracking-[0.25em] uppercase text-gray-400">Self-taught Software Developer</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] text-white"
            >
              Building <br />
              <span className="gradient-text italic">The Web</span>.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Kev Owino. A developer driven by curiosity and a commitment to crafting high-fidelity digital experiences.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
            >
              <a href={BIO.socials.github} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-12 py-5 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95 text-center uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                GitHub Profile
              </a>
              <button onClick={() => scrollTo(SectionId.Projects)} className="w-full sm:w-auto px-12 py-5 glass border border-white/10 text-white font-black rounded-2xl hover:border-indigo-500/50 transition-all active:scale-95 text-center uppercase tracking-widest text-xs">
                View Projects
              </button>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id={SectionId.About} className="py-40 px-6 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative group"
              >
                <div className="absolute -inset-10 bg-indigo-500/10 rounded-[4rem] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 aspect-[4/5] glass p-2">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent z-20" />
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                    alt="Kev Owino" 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                  />
                  <div className="absolute bottom-10 left-10 z-30">
                     <h4 className="text-3xl font-black">Kev Owino</h4>
                     <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Self-taught Dev @ Nairobi</p>
                  </div>
                </div>
              </motion.div>
              
              <div className="space-y-12">
                <div className="space-y-6">
                  <h2 className="text-indigo-400 font-mono tracking-[0.4em] text-[10px] uppercase font-black">01 / The Vision</h2>
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]"
                  >
                    Engineering <br /><span className="text-indigo-500 italic">Curiosity</span>.
                  </motion.h3>
                  <p className="text-xl text-gray-400 leading-relaxed font-light">
                    {BIO.about}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-12 py-12 border-y border-white/5">
                  <div className="space-y-3">
                    <h4 className="text-6xl font-black text-white">05</h4>
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em]">Years Active</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-6xl font-black text-white">40+</h4>
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em]">Global Clients</p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="h-px flex-1 bg-white/5" />
                  <div className="flex gap-4">
                    {Object.entries(BIO.socials).map(([platform, url]) => (
                      <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:text-white text-gray-500 transition-all border border-white/5 group/s">
                        <span className="sr-only">{platform}</span>
                        <div className="capitalize font-black text-xs group-hover/s:scale-110 transition-transform">{platform.slice(0, 2)}</div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id={SectionId.Projects} className="py-40 px-6 bg-[#050914]/50 relative scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
              <div className="space-y-6">
                 <h2 className="text-indigo-400 font-mono tracking-[0.4em] text-[10px] uppercase font-black">02 / Selected Works</h2>
                 <h3 className="text-6xl md:text-8xl font-black tracking-tighter text-white">Case Studies</h3>
              </div>
              <p className="text-gray-500 max-w-sm text-lg font-light leading-relaxed border-l-2 border-indigo-500/30 pl-8">
                Focused on delivering high-availability systems with pixel-perfect UI implementation.
              </p>
            </div>
            <BentoGrid projects={PROJECTS} />
          </div>
        </section>

        {/* Skills Section */}
        <section id={SectionId.Skills} className="py-40 px-6 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <div className="space-y-16">
                <div className="space-y-6">
                  <h2 className="text-indigo-400 font-mono tracking-[0.4em] text-[10px] uppercase font-black">03 / Tech Stack</h2>
                  <h3 className="text-6xl md:text-8xl font-black tracking-tighter">Tools of Trade.</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {SKILLS.map((skill, index) => (
                    <motion.div 
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="glass p-8 rounded-[2rem] flex flex-col gap-6 group hover:border-indigo-500/50 transition-all border border-white/5 hover:bg-white/5"
                    >
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center font-black text-xs text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        {skill.name.slice(0, 1)}
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-black uppercase tracking-widest text-white">{skill.name}</span>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                           <motion.div 
                              className="h-full bg-indigo-500"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.5, ease: "easeOut", delay: (index * 0.1) + 0.3 }}
                           />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glass p-12 rounded-[4rem] h-[550px] border border-white/5 relative overflow-hidden flex flex-col justify-center"
              >
                <div className="absolute top-0 right-0 p-12 opacity-5">
                   <h4 className="text-[120px] font-black leading-none">Proficiency</h4>
                </div>
                <h4 className="text-2xl font-black mb-12 relative z-10">Neural Map</h4>
                <div className="flex-1 relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={SKILLS.slice(0, 6)}>
                      <XAxis dataKey="name" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ background: '#030712', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '15px' }}
                        cursor={{ fill: 'rgba(255,255,255,0.02)' }} 
                      />
                      <Bar dataKey="level" radius={[20, 20, 0, 0]} barSize={40} animationDuration={2000}>
                        {SKILLS.slice(0, 6).map((entry, index) => (
                          <Cell key={entry.name} fill={index % 2 === 0 ? '#6366f1' : '#a855f7'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id={SectionId.Contact} className="py-60 px-6 scroll-mt-20 relative">
          <div className="absolute inset-0 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-5xl mx-auto text-center space-y-20 relative z-10">
            <h2 className="text-indigo-400 font-mono tracking-[0.4em] text-[10px] uppercase font-black">04 / Collaboration</h2>
            <h3 className="text-7xl md:text-[140px] font-black tracking-tighter leading-none">Let's <br /> <span className="gradient-text italic">Build.</span></h3>
            <a href={`mailto:${BIO.email}`} className="group relative inline-block glass px-12 md:px-24 py-12 md:py-20 rounded-[4rem] border border-white/5 hover:border-indigo-500/30 transition-all shadow-2xl overflow-hidden max-w-full">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-2xl md:text-5xl font-black tracking-tighter group-hover:text-indigo-400 transition-colors break-words relative z-10">{BIO.email}</p>
            </a>
          </div>
        </section>
      </main>

      <footer className="py-20 px-6 border-t border-white/5 bg-[#010309] flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white text-xs">KO</div>
           <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic">Engineering Premium Ops.</p>
        </div>
        <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">© {new Date().getFullYear()} Kev Owino Portfolio V2.0.0</p>
      </footer>

      <AIAssistant />
    </div>
  );
}
