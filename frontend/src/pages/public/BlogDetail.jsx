import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`/api/blogs/${slug}`).then(res => setBlog(res.data)).catch(() => {});
  }, [slug]);

  if (!blog) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-dark-bg">
      <article className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            {blog.image && (
              <img src={blog.image} alt={blog.title} className="w-full h-80 object-cover rounded-2xl mb-8" />
            )}

            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <Calendar className="w-4 h-4" />
              {formatDate(blog.createdAt)}
            </div>

            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 dark:text-white mb-6">{blog.title}</h1>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{blog.excerpt}</p>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{blog.content}</div>
            </div>
          </motion.div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
