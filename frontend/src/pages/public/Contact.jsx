import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Card from '../../components/ui/Card';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/contact', form);
      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-dark-bg">
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 dark:text-white mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have a question or want to work together? Feel free to contact me.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {[
                    { icon: Mail, label: 'Email', value: 'hello@johndoe.com' },
                    { icon: Phone, label: 'Phone', value: '+1 234 567 8900' },
                    { icon: MapPin, label: 'Location', value: 'San Francisco, CA' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                        <p className="font-medium text-gray-900 dark:text-white">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Follow Me</h3>
                  <div className="flex gap-4">
                    {['github', 'linkedin', 'twitter'].map((social) => (
                      <a key={social} href="#" className="w-10 h-10 rounded-lg bg-dark-card flex items-center justify-center hover:bg-primary/20 transition-colors">
                        <span className="text-gray-400 hover:text-white capitalize">{social[0].toUpperCase()}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input label="Name" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                    <Input label="Email" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <Input label="Subject" placeholder="What's this about?" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required />
                  <Textarea label="Message" placeholder="Your message..." rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Sending...' : <><Send className="w-4 h-4" /> Send Message</>}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
