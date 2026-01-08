'use client';

import React from 'react';
import { Project } from '../types';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface BentoGridProps {
  projects: Project[];
}

const BentoGrid: React.FC<BentoGridProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[300px] md:auto-rows-[350px]">
      {projects.map((project, index) => {
        const isFeatured = project.featured;
        const colSpan = isFeatured ? 'md:col-span-8' : 'md:col-span-4';
        const rowSpan = isFeatured ? 'md:row-span-2' : 'md:row-span-1';

        return (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`${colSpan} ${rowSpan} relative group overflow-hidden rounded-[3rem] glass border-white/10 transition-all duration-700 hover:shadow-[0_40px_100px_rgba(79,70,229,0.15)] bg-black/40`}
          >
            {/* Background Image Container */}
            <div className="absolute inset-0 w-full h-full">
               <img 
                src={project.imageUrl} 
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent" />
            </div>

            {/* Top Bar (Featured Indicator) */}
            <div className="absolute top-8 left-8 z-20 flex gap-2">
              {isFeatured && (
                <span className="px-3 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                  Featured
                </span>
              )}
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-10 flex flex-col justify-end z-10">
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-white/5 backdrop-blur-2xl rounded-full text-[10px] font-black tracking-widest text-indigo-400 border border-white/10 uppercase">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="space-y-4 group-hover:translate-y-[-10px] transition-transform duration-500">
                <h3 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-base md:text-lg mb-6 max-w-xl font-light leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex items-center gap-8 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <a 
                    href={project.link} 
                    className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-white hover:text-indigo-400 transition-colors group/link"
                    aria-label={`Launch ${project.title}`}
                  >
                    Launch <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                  {project.github && (
                    <a 
                      href={project.github} 
                      className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors group/git"
                    >
                      Source <Github size={14} className="group-hover/git:scale-110 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            {/* Visual Flare */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px] rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </motion.div>
        );
      })}
    </div>
  );
};

export default BentoGrid;