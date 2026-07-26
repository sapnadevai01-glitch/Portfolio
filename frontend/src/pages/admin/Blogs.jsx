import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', image: '', published: false });

  useEffect(() => { fetchBlogs(); }, []);

  const fetchBlogs = async () => {
    try { const res = await api.get('/blogs/all'); setBlogs(res.data); }
    catch { toast.error('Failed to load'); }
  };

  const openModal = (blog = null) => {
    if (blog) { setEditBlog(blog); setForm(blog); }
    else { setEditBlog(null); setForm({ title: '', slug: '', excerpt: '', content: '', image: '', published: false }); }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editBlog) { await api.put(`/blogs/${editBlog.id}`, form); toast.success('Updated!'); }
      else { await api.post('/blogs', form); toast.success('Created!'); }
      setModalOpen(false);
      fetchBlogs();
    } catch { toast.error('Failed to save'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try { await api.delete(`/blogs/${id}`); toast.success('Deleted'); fetchBlogs(); }
    catch { toast.error('Failed'); }
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-8">
        <div><h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blogs</h1><p className="text-gray-500 dark:text-gray-400">Manage blog posts.</p></div>
        <Button onClick={() => openModal()}>Add Blog</Button>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {blogs.map(blog => (
          <motion.div key={blog.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="h-full flex flex-col">
              {blog.image && (
                <div className="relative overflow-hidden rounded-xl mb-4 h-32 -mx-6 -mt-6">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white">{blog.title}</h3>
                  <Badge variant={blog.published ? 'success' : 'warning'}>{blog.published ? 'Published' : 'Draft'}</Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{blog.excerpt}</p>
                <p className="text-xs text-gray-400 mt-2">{new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <Button size="sm" variant="ghost" onClick={() => openModal(blog)}>Edit</Button>
                <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleDelete(blog.id)}>Del</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editBlog ? 'Edit Blog' : 'Add Blog'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <Input label="Slug" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required />
          <Textarea label="Excerpt" rows={2} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} />
          <Textarea label="Content" rows={6} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
          <Input label="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
          <div className="flex items-center gap-4">
            <input type="checkbox" id="published" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} className="w-4 h-4" />
            <label htmlFor="published" className="text-gray-700 dark:text-gray-300">Published</label>
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

export default Blogs;
