import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/ui/Card';
import { FolderKanban, Wrench, Briefcase, GraduationCap, Award, FileText, MessageSquare, Eye } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, activitiesRes] = await Promise.all([
          axios.get('/api/admin/stats'),
          axios.get('/api/admin/activities')
        ]);
        setStats(statsRes.data);
        setActivities(activitiesRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    { label: 'Projects', value: stats?.projectsCount || 0, icon: FolderKanban, color: 'from-blue-500 to-blue-600' },
    { label: 'Skills', value: stats?.skillsCount || 0, icon: Wrench, color: 'from-green-500 to-green-600' },
    { label: 'Experience', value: stats?.experiencesCount || 0, icon: Briefcase, color: 'from-purple-500 to-purple-600' },
    { label: 'Education', value: stats?.educationCount || 0, icon: GraduationCap, color: 'from-orange-500 to-orange-600' },
    { label: 'Certificates', value: stats?.certificatesCount || 0, icon: Award, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Blogs', value: stats?.blogsCount || 0, icon: FileText, color: 'from-pink-500 to-pink-600' },
    { label: 'Testimonials', value: stats?.testimonialsCount || 0, icon: MessageSquare, color: 'from-indigo-500 to-indigo-600' },
    { label: 'Messages', value: stats?.messagesCount || 0, icon: MessageSquare, color: 'from-red-500 to-red-600', unread: stats?.unreadMessagesCount }
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {user?.name}!</h1>
        <p className="text-gray-500 dark:text-gray-400">Here's what's happening with your portfolio.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="h-full">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  {stat.unread > 0 && <p className="text-xs text-red-500">{stat.unread} unread</p>}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {activities.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No recent activity</p>
              ) : (
                activities.map(activity => (
                  <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Eye className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">{activity.description}</p>
                      <p className="text-xs text-gray-500">{new Date(activity.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </motion.div>

        {/* Quick Links */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Add Project', path: '/admin/projects', color: 'bg-blue-500' },
                { label: 'Add Skill', path: '/admin/skills', color: 'bg-green-500' },
                { label: 'Add Experience', path: '/admin/experiences', color: 'bg-purple-500' },
                { label: 'Write Blog', path: '/admin/blogs', color: 'bg-pink-500' }
              ].map(item => (
                <a
                  key={item.path}
                  href={item.path}
                  className={`${item.color} text-white px-4 py-3 rounded-xl text-center font-medium hover:opacity-90 transition-opacity`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
