
'use client';

import React from 'react';
import { Project } from '../types';

interface BentoGridProps {
  projects: Project[];
}

const BentoGrid: React.FC<BentoGridProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px] md:auto-rows-[320px]">
      {projects.map((project, index) => {
        const isFeatured = project.featured;
        const colSpan = isFeatured ? 'md:col-span-8' : 'md:col-span-4';
        const rowSpan = isFeatured ? 'md:row-span-2' : 'md:row-span-1';

        return (
          <div 
            key={project.id}
            className={`${colSpan} ${rowSpan} relative group overflow-hidden rounded-[2.5rem] glass border-white/5 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(79,70,229,0.15)]`}
          >
            {/* Background Image with Parallax-like effect */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
               <img 
                src={project.imageUrl} 
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 opacity-30 group-hover:opacity-40 grayscale group-hover:grayscale-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 backdrop-blur-xl rounded-full text-[9px] font-bold tracking-[0.15em] text-indigo-300 border border-white/10 uppercase">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base mb-4 max-w-lg line-clamp-2 font-light leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-500 pt-2">
                  <a href={project.link} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white group/btn" aria-label={`View demo for ${project.title}`}>
                    Launch Demo 
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                  {project.github && (
                    <a href={project.github} className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Github</a>
                  )}
                </div>
              </div>
            </div>
            
            {/* Decorative Corner Accent */}
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity">
               <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BentoGrid;
