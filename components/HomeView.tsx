
'use client';

import React from 'react';
import Navbar from './Navbar';
import BentoGrid from './BentoGrid';
import AIAssistant from './AIAssistant';
import { PROJECTS, SKILLS, BIO } from '../data';
import { SectionId } from '../types';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { motion } from 'framer-motion';

interface HomeViewProps {
  onNavigate: (view: 'home' | 'blog') => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-gray-100 selection:bg-indigo-500/30 bg-grain">
      <Navbar currentView="home" onNavigate={onNavigate} />

      <main className="mesh-gradient">
        <section id={SectionId.Hero} className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 relative overflow-hidden">
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[160px] pointer-events-none" />
          
          <div className="max-w-5xl w-full text-center space-y-12 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <a href={BIO.socials.github} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-12 py-5 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95 text-center uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                GitHub Profile
              </a>
              <button onClick={() => scrollTo(SectionId.Projects)} className="w-full sm:w-auto px-12 py-5 glass border border-white/10 text-white font-black rounded-2xl hover:border-indigo-500/50 transition-all active:scale-95 text-center uppercase tracking-widest text-xs">
                View Projects
              </button>
            </div>
          </div>
        </section>

        <section id={SectionId.About} className="py-40 px-6 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -inset-10 bg-indigo-500/10 rounded-[4rem] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 aspect-[4/5] glass p-2">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent z-20" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" alt="Kev Owino" className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                  <div className="absolute bottom-10 left-10 z-30 text-white">
                     <h4 className="text-3xl font-black">Kev Owino</h4>
                     <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Self-taught Dev @ Nairobi</p>
                  </div>
                </div>
              </motion.div>
              
              <div className="space-y-12">
                <div className="space-y-6">
                  <h2 className="text-indigo-400 font-mono tracking-[0.4em] text-[10px] uppercase font-black">01 / The Vision</h2>
                  <h3 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">Engineering <br /><span className="text-indigo-500 italic">Curiosity</span>.</h3>
                  <p className="text-xl text-gray-400 leading-relaxed font-light">{BIO.about}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id={SectionId.Projects} className="py-40 px-6 bg-[#050914]/50 relative scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12 text-white">
              <div className="space-y-6">
                 <h2 className="text-indigo-400 font-mono tracking-[0.4em] text-[10px] uppercase font-black">02 / Selected Works</h2>
                 <h3 className="text-6xl md:text-8xl font-black tracking-tighter">Case Studies</h3>
              </div>
              <p className="text-gray-500 max-w-sm text-lg font-light leading-relaxed border-l-2 border-indigo-500/30 pl-8">Focused on high-availability systems with pixel-perfect UI.</p>
            </div>
            <BentoGrid projects={PROJECTS} />
          </div>
        </section>

        <section id={SectionId.Skills} className="py-40 px-6 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <div className="space-y-16">
                <div className="space-y-6 text-white">
                  <h2 className="text-indigo-400 font-mono tracking-[0.4em] text-[10px] uppercase font-black">03 / Tech Stack</h2>
                  <h3 className="text-6xl md:text-8xl font-black tracking-tighter">Tools of Trade.</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {SKILLS.map((skill, index) => (
                    <motion.div key={skill.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass p-8 rounded-[2rem] flex flex-col gap-6 group hover:border-indigo-500/50 transition-all border border-white/5 hover:bg-white/5">
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center font-black text-xs text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">{skill.name.slice(0, 1)}</div>
                      <div className="space-y-1">
                        <span className="text-xs font-black uppercase tracking-widest text-white">{skill.name}</span>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                           <motion.div className="h-full bg-indigo-500" initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut", delay: (index * 0.1) + 0.3 }} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
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
