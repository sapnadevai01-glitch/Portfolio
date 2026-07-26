import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../../utils/api';
import Card from '../../components/ui/Card';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    api.get('/testimonials').then(res => setTestimonials(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (testimonials.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrent(prev => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [testimonials.length]);

  const next = () => setCurrent(prev => (prev + 1) % testimonials.length);
  const prev = () => setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-dark-bg">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 dark:text-white mb-4">
              Client <span className="gradient-text">Testimonials</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">What people say about my work.</p>
          </motion.div>

          {testimonials.length > 0 && (
            <div className="relative">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <Card className="text-center p-8 md:p-12">
                  {testimonials[current].avatar && (
                    <img
                      src={testimonials[current].avatar}
                      alt={testimonials[current].name}
                      className="w-20 h-20 rounded-full mx-auto mb-6 object-cover border-4 border-primary/20"
                    />
                  )}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonials[current].rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 italic">"{testimonials[current].content}"</p>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{testimonials[current].name}</h3>
                  <p className="text-primary font-medium">{testimonials[current].role}</p>
                  {testimonials[current].company && (
                    <p className="text-gray-500 text-sm">{testimonials[current].company}</p>
                  )}
                </Card>
              </motion.div>

              {testimonials.length > 1 && (
                <>
                  <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-3 bg-white dark:bg-dark-card rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  </button>
                  <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-3 bg-white dark:bg-dark-card rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
