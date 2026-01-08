'use client';

import React from 'react';
import Navbar from './Navbar';
import BentoGrid from './BentoGrid';
import AIAssistant from './AIAssistant';
import { PROJECTS, SKILLS, BIO } from '../data';
import { SectionId } from '../types';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Facebook, ArrowRight, Zap } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: 'home' | 'blog') => void;
}

const SocialLinks = () => (
  <div className="flex items-center gap-5">
    {[
      { icon: Github, href: BIO.socials.github, label: 'GitHub' },
      { icon: Linkedin, href: BIO.socials.linkedin, label: 'LinkedIn' },
      { icon: Twitter, href: BIO.socials.twitter, label: 'Twitter' },
      { icon: Instagram, href: BIO.socials.instagram, label: 'Instagram' },
      { icon: Facebook, href: BIO.socials.facebook, label: 'Facebook' }
    ].map((social, i) => (
      <motion.a
        key={i}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 * i }}
        className="p-3 glass rounded-xl text-gray-400 hover:text-white hover:border-indigo-500/50 transition-all hover:-translate-y-1 group"
        title={social.label}
      >
        <social.icon size={18} className="group-hover:scale-110 transition-transform" />
      </motion.a>
    ))}
  </div>
);

export default function HomeView({ onNavigate }: HomeViewProps) {
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
          <div className="absolute top-[15%] left-[5%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[180px] pointer-events-none" />
          <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[180px] pointer-events-none" />
          
          <div className="max-w-6xl w-full text-center space-y-12 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 mx-auto"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
              </span>
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-indigo-400">Next-Gen Engineering</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] text-white"
            >
              CRAFTING <br />
              <span className="gradient-text italic">DIGITAL DNA</span>.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="text-xl md:text-3xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed tracking-tight"
            >
              Kev Owino. Architectural precision meets raw creativity. Elevating web ecosystems through high-fidelity code.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10"
            >
              <a href={BIO.socials.github} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-12 py-6 bg-white text-black font-black rounded-2xl hover:bg-gray-100 transition-all shadow-[0_30px_60px_rgba(255,255,255,0.15)] active:scale-95 text-center uppercase tracking-widest text-[11px] flex items-center justify-center gap-3">
                <Github size={18} /> Source Access
              </a>
              <button onClick={() => scrollTo(SectionId.Projects)} className="w-full sm:w-auto px-12 py-6 glass border border-white/10 text-white font-black rounded-2xl hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all active:scale-95 text-center uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 group">
                Portfolio <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* Identity Section */}
        <section id={SectionId.About} className="py-52 px-6 scroll-mt-20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -inset-10 bg-indigo-500/5 rounded-[5rem] blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/5 aspect-[4/5] glass p-2 transition-transform duration-700 group-hover:scale-[1.01]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent z-20" />
                  <img src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=800" alt="Kev Owino" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0" />
                  <div className="absolute bottom-12 left-12 z-30 text-white space-y-1">
                     <h4 className="text-4xl font-black tracking-tighter">Kev Owino</h4>
                     <p className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.3em]">Neural Architect @ Nairobi</p>
                  </div>
                </div>
              </motion.div>
              
              <div className="space-y-14">
                <div className="space-y-8">
                  <h2 className="text-indigo-500 font-mono tracking-[0.5em] text-[11px] uppercase font-black flex items-center gap-4">
                    <span className="w-12 h-px bg-indigo-500/30" /> 01 / Identity
                  </h2>
                  <h3 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85]">Evolving <br /><span className="text-white italic">Self-Taught</span>.</h3>
                  <p className="text-2xl text-gray-400 leading-relaxed font-light tracking-tight">{BIO.about}</p>
                  
                  <div className="grid grid-cols-2 gap-8 pt-6">
                    <div className="space-y-2">
                       <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Foundation</span>
                       <p className="text-white font-bold">freeCodeCamp Core</p>
                    </div>
                    <div className="space-y-2">
                       <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Base</span>
                       <p className="text-white font-bold">Nairobi, Kenya</p>
                    </div>
                  </div>

                  <div className="pt-8">
                    <SocialLinks />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Works Section */}
        <section id={SectionId.Projects} className="py-52 px-6 bg-[#050914]/40 relative scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-12 text-white">
              <div className="space-y-8">
                 <h2 className="text-indigo-500 font-mono tracking-[0.5em] text-[11px] uppercase font-black flex items-center gap-4">
                    <span className="w-12 h-px bg-indigo-500/30" /> 02 / Portfolio
                 </h2>
                 <h3 className="text-7xl md:text-9xl font-black tracking-tighter leading-none">Selected Works</h3>
              </div>
            </div>
            <BentoGrid projects={PROJECTS} />
          </div>
        </section>

        {/* Stack Section */}
        <section id={SectionId.Skills} className="py-52 px-6 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <div className="space-y-20">
                <div className="space-y-8 text-white">
                  <h2 className="text-indigo-500 font-mono tracking-[0.5em] text-[11px] uppercase font-black flex items-center gap-4">
                    <span className="w-12 h-px bg-indigo-500/30" /> 03 / Capabilities
                  </h2>
                  <h3 className="text-7xl md:text-9xl font-black tracking-tighter leading-none">Tech Stack.</h3>
                  <p className="text-gray-500 text-xl font-light">Modular tools for a modern paradigm.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                  {SKILLS.map((skill, index) => (
                    <motion.div 
                      key={skill.name} 
                      initial={{ opacity: 0, y: 30 }} 
                      whileInView={{ opacity: 1, y: 0 }} 
                      viewport={{ once: true }} 
                      transition={{ delay: index * 0.05 }}
                      className="glass p-10 rounded-[2.5rem] flex flex-col gap-10 group hover:border-indigo-500/50 transition-all border border-white/5 hover:bg-white/5 overflow-hidden relative"
                    >
                      <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center font-black text-sm text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        {skill.name.slice(0, 1)}
                      </div>
                      <div className="space-y-4">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-white">{skill.name}</span>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                           <motion.div className="h-full bg-indigo-500" initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1.5 }} />
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

      <footer className="py-24 px-6 border-t border-white/5 bg-[#010309] relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex flex-col gap-8 items-center md:items-start">
             <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-indigo-600 rounded-[1.2rem] flex items-center justify-center font-black text-white text-sm">KO</div>
                <div className="flex flex-col">
                   <p className="text-xs font-black uppercase tracking-[0.4em] text-white">Kev Owino</p>
                   <p className="text-[10px] font-bold text-indigo-500/60 uppercase tracking-widest italic">Digital Architect</p>
                </div>
             </div>
             <SocialLinks />
          </div>
          <div className="flex flex-col items-center md:items-end gap-3">
             <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">© {new Date().getFullYear()} Kev Owino Portfolio</p>
             <p className="text-[9px] font-mono text-indigo-500/30 uppercase tracking-[0.5em] flex items-center gap-2">
               <Zap size={10} /> Synthesized via Gemini 3
             </p>
          </div>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
}