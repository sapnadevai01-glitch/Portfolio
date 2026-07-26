import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => { fetchMessages(); }, []);

  const fetchMessages = async () => {
    try { const res = await api.get('/admin/messages'); setMessages(res.data); }
    catch { toast.error('Failed to load'); }
  };

  const markAsRead = async (id) => {
    try { await api.put(`/admin/messages/${id}/read`); toast.success('Marked as read'); fetchMessages(); }
    catch { toast.error('Failed'); }
  };

  const deleteMessage = async (id) => {
    if (!confirm('Delete this message?')) return;
    try { await api.delete(`/admin/messages/${id}`); toast.success('Deleted'); fetchMessages(); }
    catch { toast.error('Failed'); }
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Messages</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage contact form submissions.</p>
      </motion.div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No messages yet.</p>
          </Card>
        ) : (
          messages.map(msg => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className={msg.read ? 'opacity-75' : ''}>
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white">{msg.name}</h3>
                      {!msg.read && <Badge variant="primary">New</Badge>}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{msg.email}</p>
                    <p className="text-primary font-medium mb-2">{msg.subject}</p>
                    <p className="text-gray-600 dark:text-gray-300">{msg.message}</p>
                    <p className="text-xs text-gray-400 mt-4">{new Date(msg.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {!msg.read && (
                      <Button size="sm" variant="ghost" onClick={() => markAsRead(msg.id)}>Mark Read</Button>
                    )}
                    <Button size="sm" variant="ghost" className="text-red-500" onClick={() => deleteMessage(msg.id)}>Delete</Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Messages;
