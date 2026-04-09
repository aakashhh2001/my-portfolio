import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TerminalHeader } from '../components/TerminalHeader';
import { ExternalLink, Github, Filter, Code2 } from 'lucide-react';
import { PROJECTS_BY_CATEGORY } from '../data/portfolio';

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Projects', count: PROJECTS_BY_CATEGORY.all.length },
    { id: 'cloud', label: 'Cloud Infra', count: PROJECTS_BY_CATEGORY.cloud.length },
    { id: 'devops', label: 'DevOps & CI/CD', count: PROJECTS_BY_CATEGORY.devops.length },
  ];

  const getProjects = () => {
    return PROJECTS_BY_CATEGORY[activeFilter as keyof typeof PROJECTS_BY_CATEGORY] || PROJECTS_BY_CATEGORY.all;
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Terminal Header */}
      <TerminalHeader
        command="docker ps -a --format '{{.Names}}'"
        description="Listing active deployments and infrastructure configurations"
      />

      {/* Filter Tabs */}
      <section className="py-12 bg-[#0A0E11] border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded font-mono text-sm transition-all duration-200 border ${
                  activeFilter === filter.id
                    ? 'bg-[#00FF41] text-black border-[#00FF41] font-bold shadow-[0_0_10px_rgba(0,255,65,0.3)]'
                    : 'bg-[#000000] text-neutral-400 border-neutral-800 hover:border-[#00FF41]/50 hover:text-[#00FF41]'
                }`}
              >
                <Filter size={14} />
                <span>{filter.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeFilter === filter.id ? 'bg-black/20 text-black' : 'bg-neutral-800 text-neutral-500'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
          >
            <AnimatePresence>
              {getProjects().map((project, index) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="bg-[#0A0E11] border border-neutral-800 rounded-lg overflow-hidden group hover:border-[#00FF41]/50 transition-all duration-300 shadow-[0_0_15px_rgba(0,255,65,0.02)] hover:shadow-[0_0_20px_rgba(0,255,65,0.1)]"
                >
                  {/* Project Image */}
                  <div className="relative aspect-video overflow-hidden border-b border-neutral-800">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E11] via-[#0A0E11]/50 to-transparent" />
                    
                    {/* Project Type Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded text-xs font-mono font-bold border ${
                        project.category === 'DevOps' 
                          ? 'bg-[#00D9FF]/10 text-[#00D9FF] border-[#00D9FF]/30'
                          : 'bg-[#E1B12C]/10 text-[#E1B12C] border-[#E1B12C]/30'
                      }`}>
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="font-mono text-xl font-bold text-[#C5CDD3] group-hover:text-[#00FF41] transition-colors">
                      <span className="text-[#FF4757] mr-2 text-sm">&gt;</span>{project.title}
                    </h3>

                    <p className="text-neutral-400 text-sm leading-relaxed min-h-[60px] font-mono">
                      {project.description}
                    </p>

                    <div className="pt-4 border-t border-neutral-800">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-neutral-900 text-[#00FF41] text-xs font-mono rounded border border-neutral-800 hover:border-[#00FF41]/50 transition-colors cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 pt-4 font-mono uppercase text-xs tracking-wider">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-neutral-500 hover:text-[#00FF41] transition-colors group/btn"
                        >
                          <Github size={16} className="group-hover/btn:scale-110 transition-transform" />
                          <span>View Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {getProjects().length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="font-mono text-5xl text-[#FF4757] mb-4 font-bold">404</div>
              <div className="text-neutral-500 font-mono">No active deployments found in this zone.</div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};