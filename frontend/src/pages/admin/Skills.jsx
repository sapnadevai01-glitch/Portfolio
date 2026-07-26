import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editSkill, setEditSkill] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', category: 'Frontend', proficiency: 80, icon: '', order: 0 });

  useEffect(() => { fetchSkills(); }, []);

  const fetchSkills = async () => {
    try { const res = await api.get('/skills'); setSkills(res.data); }
    catch { toast.error('Failed to load skills'); }
  };

  const openModal = (skill = null) => {
    if (skill) { setEditSkill(skill); setForm(skill); }
    else { setEditSkill(null); setForm({ name: '', category: 'Frontend', proficiency: 80, icon: '', order: 0 }); }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editSkill) { await api.put(`/skills/${editSkill.id}`, form); toast.success('Skill updated!'); }
      else { await api.post('/skills', form); toast.success('Skill created!'); }
      setModalOpen(false);
      fetchSkills();
    } catch { toast.error('Failed to save'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return;
    try { await api.delete(`/skills/${id}`); toast.success('Deleted'); fetchSkills(); }
    catch { toast.error('Failed to delete'); }
  };

  const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Other'];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-8">
        <div><h1 className="text-3xl font-bold text-gray-900 dark:text-white">Skills</h1><p className="text-gray-500 dark:text-gray-400">Manage your skills.</p></div>
        <Button onClick={() => openModal()}>Add Skill</Button>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map(skill => (
          <motion.div key={skill.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="flex items-center justify-between">
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white">{skill.name}</h3>
                  <span className="text-primary font-bold">{skill.proficiency}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: `${skill.proficiency}%` }} />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{skill.category}</span>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <Button size="sm" variant="ghost" onClick={() => openModal(skill)}>Edit</Button>
                <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleDelete(skill.id)}>Del</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editSkill ? 'Edit Skill' : 'Add Skill'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Skill Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface text-gray-900 dark:text-white">
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <Input label="Proficiency (%)" type="number" min="1" max="100" value={form.proficiency} onChange={e => setForm({ ...form, proficiency: parseInt(e.target.value) })} required />
          <Input label="Icon (optional)" value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} />
          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Skills;
