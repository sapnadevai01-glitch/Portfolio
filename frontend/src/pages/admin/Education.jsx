import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Modal from '../../components/ui/Modal';

const Education = () => {
  const [education, setEducation] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editEdu, setEditEdu] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ institution: '', degree: '', field: '', startDate: '', endDate: '', description: '', order: 0 });

  useEffect(() => { fetchEducation(); }, []);

  const fetchEducation = async () => {
    try { const res = await api.get('/education'); setEducation(res.data); }
    catch { toast.error('Failed to load'); }
  };

  const openModal = (edu = null) => {
    if (edu) {
      setEditEdu(edu);
      setForm({ ...edu, startDate: edu.startDate?.split('T')[0], endDate: edu.endDate?.split('T')[0] });
    } else {
      setEditEdu(null);
      setForm({ institution: '', degree: '', field: '', startDate: '', endDate: '', description: '', order: 0 });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editEdu) { await api.put(`/education/${editEdu.id}`, form); toast.success('Updated!'); }
      else { await api.post('/education', form); toast.success('Created!'); }
      setModalOpen(false);
      fetchEducation();
    } catch { toast.error('Failed to save'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try { await api.delete(`/education/${id}`); toast.success('Deleted'); fetchEducation(); }
    catch { toast.error('Failed'); }
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-8">
        <div><h1 className="text-3xl font-bold text-gray-900 dark:text-white">Education</h1><p className="text-gray-500 dark:text-gray-400">Manage education.</p></div>
        <Button onClick={() => openModal()}>Add Education</Button>
      </motion.div>

      <div className="space-y-4">
        {education.map(edu => (
          <motion.div key={edu.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{edu.degree} in {edu.field}</h3>
                <p className="text-primary">{edu.institution}</p>
                <p className="text-sm text-gray-400 mt-2">{new Date(edu.startDate).toLocaleDateString()} - {new Date(edu.endDate).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => openModal(edu)}>Edit</Button>
                <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleDelete(edu.id)}>Del</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editEdu ? 'Edit Education' : 'Add Education'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Institution" value={form.institution} onChange={e => setForm({ ...form, institution: e.target.value })} required />
          <Input label="Degree" value={form.degree} onChange={e => setForm({ ...form, degree: e.target.value })} required />
          <Input label="Field of Study" value={form.field} onChange={e => setForm({ ...form, field: e.target.value })} required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} required />
            <Input label="End Date" type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} required />
          </div>
          <Textarea label="Description" rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Education;
