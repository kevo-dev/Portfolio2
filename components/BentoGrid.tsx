
import React from 'react';
import { Project } from '../types';

interface BentoGridProps {
  projects: Project[];
}

const BentoGrid: React.FC<BentoGridProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
      {projects.map((project, index) => {
        const isFeatured = project.featured;
        const colSpan = isFeatured ? 'md:col-span-8' : 'md:col-span-4';
        const rowSpan = isFeatured ? 'md:row-span-2' : 'md:row-span-1';

        return (
          <div 
            key={project.id}
            className={`${colSpan} ${rowSpan} relative group overflow-hidden rounded-3xl glass transition-all hover:scale-[1.01] hover:shadow-2xl hover:shadow-indigo-500/10`}
          >
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-medium tracking-wider text-white border border-white/10 uppercase">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm mb-6 max-w-lg line-clamp-2">
                {project.description}
              </p>
              
              <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <a href={project.link} className="flex items-center gap-2 text-sm font-semibold text-white group/btn">
                  View Demo 
                  <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BentoGrid;
