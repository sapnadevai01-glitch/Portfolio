import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import api from '../../utils/api';
import Card from '../../components/ui/Card';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    api.get('/certificates').then(res => setCertificates(res.data)).catch(() => {});
  }, []);

  const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-dark-bg">
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 dark:text-white mb-4">
              <span className="gradient-text">Certificates</span> & Achievements
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Professional certifications and accomplishments.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                      <Award className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{cert.name}</h3>
                      <p className="text-primary text-sm font-medium">{cert.issuer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <Calendar className="w-4 h-4" />
                    {formatDate(cert.date)}
                  </div>
                  {cert.description && <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{cert.description}</p>}
                  {cert.url && cert.url !== '#' && (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline text-sm font-medium">
                      View Certificate <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Certificates;
