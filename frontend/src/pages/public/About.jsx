import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, MapPin, Mail, Phone } from 'lucide-react';
import axios from 'axios';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const About = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get('/api/profile').then(res => setProfile(res.data)).catch(() => {});
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Hero */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
                <div className="relative">
                  <img
                    src={profile?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'}
                    alt={profile?.name || 'Profile'}
                    className="w-full max-w-md rounded-3xl shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-4 animate-float">
                    <div className="text-4xl font-bold gradient-text">5+</div>
                    <div className="text-sm text-gray-400">Years Experience</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <h1 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 dark:text-white mb-4">
                About <span className="gradient-text">Me</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {profile?.bio || 'I am a passionate Full Stack Developer with expertise in building modern web applications. I love creating beautiful, performant, and user-friendly digital experiences.'}
              </p>

              <div className="space-y-4 mb-8">
                {profile?.location && (
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile?.email && (
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>{profile.email}</span>
                  </div>
                )}
                {profile?.phone && (
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <Phone className="w-5 h-5 text-primary" />
                    <span>{profile.phone}</span>
                  </div>
                )}
              </div>

              {profile?.resumeUrl && profile.resumeUrl !== '#' && (
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <Button>
                    <Download className="w-5 h-5" /> Download Resume
                  </Button>
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section className="py-20 bg-white dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-poppins font-bold text-gray-900 dark:text-white mb-4">What I Do</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">I specialize in building modern web applications from concept to deployment.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Frontend Development', desc: 'Building responsive, interactive UIs with React, Next.js, and modern CSS.', icon: '🎨' },
              { title: 'Backend Development', desc: 'Creating robust APIs and server-side applications with Node.js, Express, and databases.', icon: '⚙️' },
              { title: 'Full Stack Solutions', desc: 'End-to-end development of complete web applications with modern tech stacks.', icon: '🚀' }
            ].map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card className="text-center h-full">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
