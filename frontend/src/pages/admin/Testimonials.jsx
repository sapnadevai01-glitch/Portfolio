import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Modal from '../../components/ui/Modal';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTestimonial, setEditTestimonial] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', role: '', company: '', content: '', avatar: '', rating: 5, order: 0 });

  useEffect(() => { fetchTestimonials(); }, []);

  const fetchTestimonials = async () => {
    try { const res = await api.get('/testimonials'); setTestimonials(res.data); }
    catch { toast.error('Failed to load'); }
  };

  const openModal = (testimonial = null) => {
    if (testimonial) { setEditTestimonial(testimonial); setForm(testimonial); }
    else { setEditTestimonial(null); setForm({ name: '', role: '', company: '', content: '', avatar: '', rating: 5, order: 0 }); }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editTestimonial) { await api.put(`/testimonials/${editTestimonial.id}`, form); toast.success('Updated!'); }
      else { await api.post('/testimonials', form); toast.success('Created!'); }
      setModalOpen(false);
      fetchTestimonials();
    } catch { toast.error('Failed to save'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try { await api.delete(`/testimonials/${id}`); toast.success('Deleted'); fetchTestimonials(); }
    catch { toast.error('Failed'); }
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-8">
        <div><h1 className="text-3xl font-bold text-gray-900 dark:text-white">Testimonials</h1><p className="text-gray-500 dark:text-gray-400">Manage client testimonials.</p></div>
        <Button onClick={() => openModal()}>Add Testimonial</Button>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map(t => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                {t.avatar && <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />}
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{t.name}</h3>
                  <p className="text-sm text-primary">{t.role}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 italic mb-4 flex-grow">"{t.content}"</p>
              <div className="flex items-center justify-between">
                <div className="flex text-yellow-400">{'★'.repeat(t.rating)}</div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => openModal(t)}>Edit</Button>
                  <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleDelete(t.id)}>Del</Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <Input label="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required />
          <Input label="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
          <Textarea label="Content" rows={3} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
          <Input label="Avatar URL" value={form.avatar} onChange={e => setForm({ ...form, avatar: e.target.value })} />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
            <select value={form.rating} onChange={e => setForm({ ...form, rating: parseInt(e.target.value) })} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface text-gray-900 dark:text-white">
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Stars</option>)}
            </select>
          </div>
          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Testimonials;
