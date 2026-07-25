import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import axios from 'axios';
import Card from '../../components/ui/Card';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    axios.get('/api/experiences').then(res => setExperiences(res.data)).catch(() => {});
  }, []);

  const formatDate = (date) => {
    if (!date) return 'Present';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-dark-bg">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 dark:text-white mb-4">
              Work <span className="gradient-text">Experience</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">My professional journey.</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-20"
                >
                  <div className="absolute left-4 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                  <Card>
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.position}</h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                      {exp.current && (
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm rounded-full font-medium">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                      {exp.location && <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {exp.location}</span>}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experience;
