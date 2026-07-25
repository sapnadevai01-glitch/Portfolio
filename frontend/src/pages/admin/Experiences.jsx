import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Modal from '../../components/ui/Modal';

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editExp, setEditExp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '', order: 0 });

  useEffect(() => { fetchExperiences(); }, []);

  const fetchExperiences = async () => {
    try { const res = await axios.get('/api/experiences'); setExperiences(res.data); }
    catch { toast.error('Failed to load'); }
  };

  const openModal = (exp = null) => {
    if (exp) {
      setEditExp(exp);
      setForm({ ...exp, startDate: exp.startDate?.split('T')[0], endDate: exp.endDate?.split('T')[0] || '' });
    } else {
      setEditExp(null);
      setForm({ company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '', order: 0 });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editExp) { await axios.put(`/api/experiences/${editExp.id}`, form); toast.success('Updated!'); }
      else { await axios.post('/api/experiences', form); toast.success('Created!'); }
      setModalOpen(false);
      fetchExperiences();
    } catch { toast.error('Failed to save'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try { await axios.delete(`/api/experiences/${id}`); toast.success('Deleted'); fetchExperiences(); }
    catch { toast.error('Failed'); }
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-8">
        <div><h1 className="text-3xl font-bold text-gray-900 dark:text-white">Experience</h1><p className="text-gray-500 dark:text-gray-400">Manage work experience.</p></div>
        <Button onClick={() => openModal()}>Add Experience</Button>
      </motion.div>

      <div className="space-y-4">
        {experiences.map(exp => (
          <motion.div key={exp.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{exp.position}</h3>
                <p className="text-primary">{exp.company}</p>
                <p className="text-sm text-gray-500">{exp.location}</p>
                <p className="text-sm text-gray-400 mt-2">{new Date(exp.startDate).toLocaleDateString()} - {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString() : ''}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => openModal(exp)}>Edit</Button>
                <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleDelete(exp.id)}>Del</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editExp ? 'Edit Experience' : 'Add Experience'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} required />
          <Input label="Position" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} required />
          <Input label="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} required />
            <Input label="End Date" type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} disabled={form.current} />
          </div>
          <div className="flex items-center gap-4">
            <input type="checkbox" id="current" checked={form.current} onChange={e => setForm({ ...form, current: e.target.checked })} className="w-4 h-4" />
            <label htmlFor="current" className="text-gray-700 dark:text-gray-300">Currently working here</label>
          </div>
          <Textarea label="Description" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Experiences;
