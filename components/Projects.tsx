import React, { useState, useEffect, useMemo } from 'react';
import { useI18n, useProjects } from '../App';
import { Project } from '../types';

const Projects: React.FC = () => {
  const { t, language } = useI18n();
  const projects = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  // Extract unique tags from all projects
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(project => {
      project.tags?.forEach(tag => tags.add(tag));
    });
    return ['All', ...Array.from(tags)];
  }, [projects]);

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter(project => project.tags?.includes(activeFilter));
  }, [projects, activeFilter]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const renderTechIcon = (tech: string) => {
    const normalizedTech = tech.toLowerCase();
    if (normalizedTech === 'flutter') {
      return (
        <div className="w-10 h-10 bg-[#02569B]/10 rounded-xl flex items-center justify-center border border-[#02569B]/20 transition-all group-hover:bg-[#02569B]/20">
          <svg className="w-6 h-6 text-[#02569B]" viewBox="0 0 24 24" fill="currentColor"><path d="M14.314 0L2.3 12L6 15.7L21.684.012h-7.357zm.008 24l7.305-7.305l-3.692-3.692l-7.305 7.305L14.322 24zM10.623 16.71l-3.702-3.702L.012 19.912V24l10.611-10.611v3.321z"/></svg>
        </div>
      );
    }
    if (normalizedTech === 'dart') {
      return (
        <div className="w-10 h-10 bg-[#0175C2]/10 rounded-xl flex items-center justify-center border border-[#0175C2]/20 transition-all group-hover:bg-[#0175C2]/20">
          <svg className="w-6 h-6 text-[#0175C2]" viewBox="0 0 24 24" fill="currentColor"><path d="M4.105 4.105S9.158 1.58 11.684.316a.3.3 0 0 1 .263 0C14.474 1.58 19.895 4.105 19.895 4.105a.3.3 0 0 1 .158.263v15.264a.3.3 0 0 1-.158.263s-5.421 2.526-7.947 3.789a.3.3 0 0 1-.263 0C9.158 22.421 4.105 19.895 4.105 19.895a.3.3 0 0 1-.158-.263V4.368a.3.3 0 0 1 .158-.263zm1.185 1.5l13.42 6.316v-1.5L5.29 4.105v1.5zm0 12.789l13.42-6.315v1.5L5.29 19.895v-1.5z"/></svg>
        </div>
      );
    }
    return (
      <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 transition-all group-hover:bg-emerald-500/20">
        <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </div>
    );
  };

  return (
    <section id="projects" className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-7xl font-black text-white mb-6 tracking-tighter">
            {t.projects.title}
          </h2>
          <div className="h-2 w-24 bg-emerald-500 mx-auto rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)]"></div>
        </div>

        {/* Filter Buttons */}
        {allTags.length > 1 && (
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  activeFilter === tag 
                    ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-110' 
                    : 'bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-[90rem] mx-auto justify-items-center">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="group relative flex flex-col bg-[#0a0a0a] rounded-[2rem] overflow-hidden border border-white/5 transition-all duration-500 hover:border-emerald-500/30 hover:shadow-[0_20px_80px_-20px_rgba(16,185,129,0.1)] min-h-[460px] w-full max-w-[300px]"
            >
              <div 
                onClick={() => setSelectedProject(project)}
                className="relative pt-10 px-8 pb-6 flex justify-center items-center cursor-pointer"
              >
                <div 
                  className="relative w-full aspect-square max-w-[150px] p-2 rounded-[1.8rem] border transition-colors duration-500 group-hover:border-emerald-500/50"
                  style={{ 
                    backgroundColor: project.iconBgColor || 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-contain rounded-[1.5rem] relative z-10 transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {project.id === 'ember' && (
                  <span className="absolute top-6 right-6 text-[7px] bg-emerald-500 text-black px-2 py-0.5 rounded-full font-black uppercase tracking-widest z-20">
                    {t.projects.active}
                  </span>
                )}
              </div>

              <div className="px-6 pb-8 flex flex-col flex-grow">
                <div className="mb-3 cursor-pointer" onClick={() => setSelectedProject(project)}>
                  {/* Tags Display on Card */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded-md text-[8px] font-bold text-zinc-500 uppercase tracking-wider group-hover:border-emerald-500/20 group-hover:text-emerald-500/80 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <h3 className="text-2xl font-black text-white tracking-tighter mb-1 leading-tight">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="text-emerald-500/60 text-[9px] font-black uppercase tracking-widest">
                        #{tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="text-zinc-500 text-sm mb-6 leading-relaxed font-medium line-clamp-3 cursor-pointer" onClick={() => setSelectedProject(project)}>
                  {language === 'en' ? project.description.en : project.description.it}
                </p>

                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                  <div className="flex gap-2">
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-emerald-500 text-black rounded-lg hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20"
                        title="Link"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    {project.playStore && (
                      <a 
                        href={project.playStore} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-emerald-500 text-black rounded-lg hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20"
                        title="Play Store"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                        </svg>
                      </a>
                    )}
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 hover:scale-110 transition-all"
                        title="GitHub"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                      </a>
                    )}
                  </div>
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="px-4 py-2 bg-white/5 text-zinc-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-white/5 hover:border-emerald-500/50 hover:text-white transition-all"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-black overflow-y-auto">
          <button 
            onClick={() => setSelectedProject(null)}
            className="fixed top-8 right-8 z-[110] bg-white/10 hover:bg-white/20 p-4 rounded-full backdrop-blur-xl border border-white/10 transition-all text-white group shadow-2xl"
            aria-label="Close"
          >
            <svg className="w-6 h-6 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="min-h-screen flex flex-col">
            <div className="container mx-auto px-6 pt-32 pb-20 max-w-6xl">
              
              <div className="flex flex-col md:flex-row gap-10 items-start md:items-center mb-12">
                <div 
                  className="w-32 h-32 p-2 rounded-[2.5rem] border shadow-xl shrink-0"
                  style={{ 
                    backgroundColor: selectedProject.iconBgColor || 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-full object-contain rounded-[2rem]" />
                </div>
                <div className="flex flex-col">
                  {/* Tags Display on Modal */}
                  {selectedProject.tags && selectedProject.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedProject.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter mb-4">
                    {selectedProject.title}
                  </h1>
                  <p className="text-emerald-500 font-bold text-sm tracking-widest uppercase mb-6">
                    {selectedProject.id === 'ember' ? 'By Roberto La Spina' : 'Project Showcase'}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    {selectedProject.link && (
                      <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-emerald-500 text-black font-black uppercase text-sm tracking-widest rounded-2xl hover:scale-105 transition-all shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)]">
                        Visit Link
                      </a>
                    )}
                    {selectedProject.playStore && (
                      <a href={selectedProject.playStore} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-emerald-500 text-black font-black uppercase text-sm tracking-widest rounded-2xl hover:scale-105 transition-all shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)]">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                        </svg>
                        Play Store
                      </a>
                    )}
                    {selectedProject.github && (
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase text-sm tracking-widest rounded-2xl hover:bg-white/10 transition-all">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                <div className="w-full overflow-x-auto no-scrollbar mb-16 -mx-6 px-6">
                  <div className="flex gap-4 w-max">
                    {selectedProject.screenshots.map((screenshot, idx) => (
                      <div key={idx} className="relative w-[280px] md:w-[320px] shrink-0 rounded-[2rem] overflow-hidden border border-white/10 aspect-[9/16] shadow-2xl bg-zinc-900 group">
                        <img src={screenshot} alt={`${selectedProject.title} screenshot ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex items-end">
                           <span className="text-[10px] font-black uppercase tracking-widest text-white">View Full Frame</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2">
                  <h2 className="text-white text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                    <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
                    About this App
                  </h2>
                  <div className="space-y-6 text-zinc-400 text-lg font-medium whitespace-pre-line leading-relaxed">
                    {(language === 'en' ? selectedProject.fullDescription?.en : selectedProject.fullDescription?.it) || (language === 'en' ? selectedProject.description.en : selectedProject.description.it)}
                  </div>
                </div>

                <div className="space-y-12">
                  <div className="flex flex-col gap-6 p-8 bg-white/[0.02] border border-white/5 rounded-[2rem]">
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Tech Stack</p>
                    <div className="grid grid-cols-1 gap-4">
                      {selectedProject.technologies.map((tech) => (
                        <div key={tech} className="flex items-center gap-4 group">
                          {renderTechIcon(tech)}
                          <span className="font-bold text-white capitalize">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;