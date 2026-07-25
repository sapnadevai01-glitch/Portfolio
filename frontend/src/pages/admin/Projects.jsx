import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', longDescription: '', image: '',
    demoUrl: '', sourceUrl: '', technologies: '', featured: false, order: 0
  });

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/api/projects/all');
      setProjects(res.data);
    } catch (err) { toast.error('Failed to load projects'); }
  };

  const openModal = (project = null) => {
    if (project) {
      setEditProject(project);
      setForm({
        ...project,
        technologies: (project.technologies || []).join(', ')
      });
    } else {
      setEditProject(null);
      setForm({ title: '', description: '', longDescription: '', image: '', demoUrl: '', sourceUrl: '', technologies: '', featured: false, order: 0 });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        ...form,
        technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean)
      };
      if (editProject) {
        await axios.put(`/api/projects/${editProject.id}`, data);
        toast.success('Project updated!');
      } else {
        await axios.post('/api/projects', data);
        toast.success('Project created!');
      }
      setModalOpen(false);
      fetchProjects();
    } catch (err) { toast.error('Failed to save project'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await axios.delete(`/api/projects/${id}`);
      toast.success('Project deleted');
      fetchProjects();
    } catch (err) { toast.error('Failed to delete'); }
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your portfolio projects.</p>
        </div>
        <Button onClick={() => openModal()}>Add Project</Button>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card hover className="h-full flex flex-col">
              {project.image && (
                <div className="relative overflow-hidden rounded-xl mb-4 h-40 -mx-6 -mt-6">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{project.title}</h3>
                  {project.featured && <Badge variant="primary">Featured</Badge>}
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                <div className="flex gap-2 flex-wrap mb-4">
                  {(project.technologies || []).slice(0, 3).map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                <Button size="sm" variant="ghost" onClick={() => openModal(project)}>Edit</Button>
                <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleDelete(project.id)}>Delete</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editProject ? 'Edit Project' : 'Add Project'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <Textarea label="Description" rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
          <Textarea label="Long Description" rows={3} value={form.longDescription} onChange={e => setForm({ ...form, longDescription: e.target.value })} />
          <Input label="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Demo URL" value={form.demoUrl} onChange={e => setForm({ ...form, demoUrl: e.target.value })} />
            <Input label="Source URL" value={form.sourceUrl} onChange={e => setForm({ ...form, sourceUrl: e.target.value })} />
          </div>
          <Input label="Technologies (comma-separated)" value={form.technologies} onChange={e => setForm({ ...form, technologies: e.target.value })} />
          <div className="flex items-center gap-4">
            <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4" />
            <label htmlFor="featured" className="text-gray-700 dark:text-gray-300">Featured Project</label>
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

export default Projects;
