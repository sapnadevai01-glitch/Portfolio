import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import api from '../../utils/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    api.get('/projects/all').then(res => setProjects(res.data)).catch(() => {});
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-dark-bg">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 dark:text-white mb-4">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A showcase of my recent work and personal projects.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full overflow-hidden group cursor-pointer" onClick={() => setSelectedProject(project)}>
                  {project.image && (
                    <div className="relative overflow-hidden rounded-xl mb-4 h-48">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {(project.technologies || []).slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">{tech}</span>
                    ))}
                  </div>
                  <button className="text-primary font-medium hover:underline">View Details →</button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-dark-card rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedProject.title}</h2>
              <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            {selectedProject.image && (
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-64 object-cover rounded-xl mb-6" />
            )}
            <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedProject.longDescription || selectedProject.description}</p>
            <div className="flex gap-2 flex-wrap mb-6">
              {(selectedProject.technologies || []).map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">{tech}</span>
              ))}
            </div>
            <div className="flex gap-4">
              {selectedProject.demoUrl && selectedProject.demoUrl !== '#' && (
                <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer">
                  <Button><ExternalLink className="w-4 h-4" /> Live Demo</Button>
                </a>
              )}
              {selectedProject.sourceUrl && selectedProject.sourceUrl !== '#' && (
                <a href={selectedProject.sourceUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary"><Github className="w-4 h-4" /> Source Code</Button>
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Projects;
