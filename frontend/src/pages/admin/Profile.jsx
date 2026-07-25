import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Button from '../../components/ui/Button';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '', title: '', bio: '', avatar: '', resumeUrl: '',
    githubUrl: '', linkedinUrl: '', twitterUrl: '',
    email: '', phone: '', location: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('/api/profile').then(res => setProfile(res.data)).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put('/api/profile', profile);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Profile</h1>
        <p className="text-gray-500 dark:text-gray-400">Update your public profile information.</p>
      </motion.div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Input label="Name" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
            <Input label="Title" value={profile.title} onChange={e => setProfile({ ...profile, title: e.target.value })} />
          </div>
          <Textarea label="Bio" rows={4} value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} />
          <Input label="Avatar URL" value={profile.avatar} onChange={e => setProfile({ ...profile, avatar: e.target.value })} />
          <Input label="Resume URL" value={profile.resumeUrl} onChange={e => setProfile({ ...profile, resumeUrl: e.target.value })} />

          <h3 className="text-lg font-bold text-gray-900 dark:text-white pt-4 border-t border-gray-200 dark:border-gray-700">Social Links</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Input label="GitHub URL" value={profile.githubUrl} onChange={e => setProfile({ ...profile, githubUrl: e.target.value })} />
            <Input label="LinkedIn URL" value={profile.linkedinUrl} onChange={e => setProfile({ ...profile, linkedinUrl: e.target.value })} />
            <Input label="Twitter URL" value={profile.twitterUrl} onChange={e => setProfile({ ...profile, twitterUrl: e.target.value })} />
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white pt-4 border-t border-gray-200 dark:border-gray-700">Contact Info</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Input label="Email" type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
            <Input label="Phone" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
            <Input label="Location" value={profile.location} onChange={e => setProfile({ ...profile, location: e.target.value })} />
          </div>

          <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</Button>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
