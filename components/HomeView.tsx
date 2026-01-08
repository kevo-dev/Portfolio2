'use client';

import React from 'react';
import Navbar from './Navbar';
import BentoGrid from './BentoGrid';
import AIAssistant from './AIAssistant';
import { PROJECTS, SKILLS, BIO } from '../data';
import { SectionId } from '../types';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Facebook, ArrowRight, Zap, Globe, Cpu } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: 'home' | 'blog') => void;
}

const SocialLinks = () => (
  <div className="flex items-center gap-4">
    {[
      { icon: Github, href: BIO.socials.github, label: 'GitHub' },
      { icon: Linkedin, href: BIO.socials.linkedin, label: 'LinkedIn' },
      { icon: Twitter, href: BIO.socials.twitter, label: 'Twitter' },
      { icon: Instagram, href: BIO.socials.instagram, label: 'Instagram' }
    ].map((social, i) => (
      <motion.a
        key={i}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 + (0.1 * i) }}
        className="w-12 h-12 glass flex items-center justify-center rounded-2xl text-gray-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group"
      >
        <social.icon size={20} className="group-hover:scale-110 transition-transform" />
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
    <div className="relative min-h-screen bg-[#030712] text-gray-100 selection:bg-indigo-500/30 overflow-x-hidden">
      <Navbar currentView="home" onNavigate={onNavigate} />

      <main className="mesh-gradient">
        {/* Hero Section */}
        <section id={SectionId.Hero} className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[700px] bg-indigo-600/10 blur-[180px] pointer-events-none rounded-full" />
          
          <div className="max-w-6xl w-full text-center space-y-16 relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-6 py-2.5 bg-indigo-500/10 backdrop-blur-3xl rounded-full border border-indigo-500/20 mx-auto"
            >
              <Zap size={14} className="text-indigo-400 fill-indigo-400" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-indigo-300">Software Architecture & Interface Design</span>
            </motion.div>
            
            <div className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-7xl md:text-[12rem] font-black tracking-tighter leading-[0.8] text-white"
              >
                CRAFTING <br />
                <span className="gradient-text italic">DIGITAL DNA</span>.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="text-xl md:text-3xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed tracking-tight"
              >
                Kev Owino. Architectural precision meets raw creativity. Elevating web ecosystems through high-fidelity engineering.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8"
            >
              <button onClick={() => scrollTo(SectionId.Projects)} className="w-full sm:w-auto px-12 py-6 bg-white text-black font-black rounded-3xl hover:bg-indigo-50 transition-all shadow-[0_25px_50px_rgba(255,255,255,0.1)] active:scale-95 text-center uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 group">
                Examine Portfolio <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => onNavigate('blog')} className="w-full sm:w-auto px-12 py-6 glass border border-white/10 text-white font-black rounded-3xl hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all active:scale-95 text-center uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 group">
                <Globe size={18} className="group-hover:rotate-12 transition-transform text-indigo-400" /> View Journal
              </button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-gray-700">Explore Terminal</span>
            <div className="w-px h-20 bg-gradient-to-b from-indigo-500/60 to-transparent" />
          </motion.div>
        </section>

        {/* Identity Section */}
        <section id={SectionId.About} className="py-72 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -inset-10 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="relative aspect-[4/5] rounded-[5rem] overflow-hidden glass p-4 group">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent z-10" />
                  <img 
                    src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=800" 
                    alt="Kev Owino" 
                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
                  />
                  <div className="absolute bottom-20 left-20 z-20">
                     <p className="text-indigo-400 font-mono text-[11px] uppercase tracking-[0.5em] mb-3 font-black">Core Intelligence</p>
                     <h4 className="text-6xl font-black text-white tracking-tighter">Kev Owino</h4>
                  </div>
                </div>
              </motion.div>
              
              <div className="space-y-16">
                <div className="space-y-10">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-px bg-indigo-500/40" />
                    <span className="text-indigo-400 font-mono text-[12px] uppercase tracking-[0.6em] font-black">Origins // 01</span>
                  </div>
                  <h3 className="text-7xl md:text-9xl font-black tracking-tighter leading-none text-white">
                    The <span className="text-gray-600">Self-Taught</span> Pioneer.
                  </h3>
                  <p className="text-2xl text-gray-400 leading-relaxed font-light tracking-tight">
                    Refined in the open-source trenches and tempered by architectural complexity. Based in Nairobi, I build digital ecosystems where performance is non-negotiable and aesthetics are paramount.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-16">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-indigo-400">
                      <Cpu size={18} />
                      <span className="text-[11px] font-black uppercase tracking-widest">Architectural Base</span>
                    </div>
                    <p className="text-white font-bold text-xl">React • Next.js • TypeScript</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-indigo-400">
                      <Globe size={18} />
                      <span className="text-[11px] font-black uppercase tracking-widest">Operational Hub</span>
                    </div>
                    <p className="text-white font-bold text-xl">Nairobi Node • Global</p>
                  </div>
                </div>

                <div className="pt-10">
                  <SocialLinks />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Works Section */}
        <section id={SectionId.Projects} className="py-72 px-6 bg-[#050914]/60 relative border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-40 gap-16">
              <div className="space-y-10">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-px bg-indigo-500/40" />
                  <span className="text-indigo-400 font-mono text-[12px] uppercase tracking-[0.6em] font-black">Portfolio // 02</span>
                </div>
                <h3 className="text-8xl md:text-[11rem] font-black tracking-tighter leading-none text-white uppercase">Works.</h3>
              </div>
              <p className="max-w-xs text-gray-500 font-medium text-xl border-l-2 border-indigo-500/40 pl-10 py-6 italic leading-relaxed">
                A definitive catalog of architectural stability and high-performance digital expression.
              </p>
            </div>
            <BentoGrid projects={PROJECTS} />
          </div>
        </section>

        {/* Stack Section */}
        <section id={SectionId.Skills} className="py-72 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center mb-40 space-y-10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-px bg-indigo-500/40" />
                <span className="text-indigo-400 font-mono text-[12px] uppercase tracking-[0.6em] font-black">Capabilities // 03</span>
                <div className="w-16 h-px bg-indigo-500/40" />
              </div>
              <h3 className="text-8xl md:text-[10rem] font-black tracking-tighter leading-none text-white uppercase">The Stack.</h3>
              <p className="text-gray-500 text-2xl font-light max-w-3xl">High-precision tools calibrated for modern software architecture.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {SKILLS.map((skill, index) => (
                <motion.div 
                  key={skill.name} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: index * 0.05 }}
                  className="glass p-10 rounded-[3rem] group hover:border-indigo-500/50 transition-all border border-white/5 relative overflow-hidden bg-black/20"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[80px] rounded-full -mr-16 -mt-16 transition-all group-hover:bg-indigo-500/15" />
                  <div className="space-y-10 relative z-10">
                    <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center font-black text-sm text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg">
                      {skill.name.slice(0, 1)}
                    </div>
                    <div className="space-y-6">
                      <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white group-hover:text-indigo-300 transition-colors">{skill.name}</span>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                         <motion.div className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]" initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 2, ease: "easeOut" }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-32 px-6 border-t border-white/5 bg-[#010309] relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-24 relative z-10">
          <div className="flex flex-col gap-10 items-center md:items-start text-center md:text-left">
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-white text-sm shadow-2xl shadow-indigo-600/40">KO</div>
                <div className="flex flex-col">
                   <p className="text-sm font-black uppercase tracking-[0.5em] text-white">Kev Owino</p>
                   <p className="text-[10px] font-bold text-indigo-500/60 uppercase tracking-[0.4em] italic mt-1">Software Architect</p>
                </div>
             </div>
             <p className="text-gray-500 text-lg max-w-sm font-medium leading-relaxed">Developing the future of web ecosystems with uncompromising precision and creative dominance.</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-10">
             <div className="flex gap-12 text-gray-500 text-[11px] font-black uppercase tracking-[0.4em]">
                <button onClick={() => scrollTo(SectionId.Hero)} className="hover:text-indigo-400 transition-colors">Terminus</button>
                <button onClick={() => scrollTo(SectionId.Projects)} className="hover:text-indigo-400 transition-colors">Catalog</button>
                <button onClick={() => onNavigate('blog')} className="hover:text-indigo-400 transition-colors">Journal</button>
             </div>
             <div className="text-center md:text-right space-y-3">
                <p className="text-[11px] font-mono text-gray-700 uppercase tracking-widest">© {new Date().getFullYear()} Kev Owino • Nairobi Operational Node</p>
                <p className="text-[10px] font-mono text-indigo-500/40 uppercase tracking-[0.5em] flex items-center justify-center md:justify-end gap-3">
                  <Zap size={12} className="fill-current" /> Neural Node Sync Active
                </p>
             </div>
          </div>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
}