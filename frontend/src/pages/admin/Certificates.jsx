import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Modal from '../../components/ui/Modal';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCert, setEditCert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', issuer: '', date: '', url: '', description: '', order: 0 });

  useEffect(() => { fetchCertificates(); }, []);

  const fetchCertificates = async () => {
    try { const res = await axios.get('/api/certificates'); setCertificates(res.data); }
    catch { toast.error('Failed to load'); }
  };

  const openModal = (cert = null) => {
    if (cert) { setEditCert(cert); setForm({ ...cert, date: cert.date?.split('T')[0] }); }
    else { setEditCert(null); setForm({ name: '', issuer: '', date: '', url: '', description: '', order: 0 }); }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editCert) { await axios.put(`/api/certificates/${editCert.id}`, form); toast.success('Updated!'); }
      else { await axios.post('/api/certificates', form); toast.success('Created!'); }
      setModalOpen(false);
      fetchCertificates();
    } catch { toast.error('Failed to save'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try { await axios.delete(`/api/certificates/${id}`); toast.success('Deleted'); fetchCertificates(); }
    catch { toast.error('Failed'); }
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-8">
        <div><h1 className="text-3xl font-bold text-gray-900 dark:text-white">Certificates</h1><p className="text-gray-500 dark:text-gray-400">Manage certificates.</p></div>
        <Button onClick={() => openModal()}>Add Certificate</Button>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certificates.map(cert => (
          <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="h-full">
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{cert.name}</h3>
              <p className="text-primary text-sm mb-2">{cert.issuer}</p>
              <p className="text-xs text-gray-400">{new Date(cert.date).toLocaleDateString()}</p>
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <Button size="sm" variant="ghost" onClick={() => openModal(cert)}>Edit</Button>
                <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleDelete(cert.id)}>Del</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editCert ? 'Edit Certificate' : 'Add Certificate'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Certificate Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <Input label="Issuer" value={form.issuer} onChange={e => setForm({ ...form, issuer: e.target.value })} required />
          <Input label="Date" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
          <Input label="URL (optional)" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} />
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

export default Certificates;
