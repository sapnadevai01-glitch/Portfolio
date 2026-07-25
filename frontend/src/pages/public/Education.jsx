import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, GraduationCap } from 'lucide-react';
import axios from 'axios';
import Card from '../../components/ui/Card';

const Education = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    axios.get('/api/education').then(res => setEducation(res.data)).catch(() => {});
  }, []);

  const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-dark-bg">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 dark:text-white mb-4">
              My <span className="gradient-text">Education</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Academic background and qualifications.</p>
          </motion.div>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="flex gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{edu.degree} in {edu.field}</h3>
                    <p className="text-primary font-medium mb-2">{edu.institution}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <Calendar className="w-4 h-4" />
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                    {edu.description && <p className="text-gray-600 dark:text-gray-300">{edu.description}</p>}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Education;
