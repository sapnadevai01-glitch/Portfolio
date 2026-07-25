import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Skills from './pages/public/Skills';
import Projects from './pages/public/Projects';
import Experience from './pages/public/Experience';
import Education from './pages/public/Education';
import Certificates from './pages/public/Certificates';
import Blog from './pages/public/Blog';
import BlogDetail from './pages/public/BlogDetail';
import Testimonials from './pages/public/Testimonials';
import Contact from './pages/public/Contact';

// Admin
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminLayout from './components/admin/AdminLayout';

import AdminProfile from './pages/admin/Profile';
import AdminProjects from './pages/admin/Projects';
import AdminSkills from './pages/admin/Skills';
import AdminExperiences from './pages/admin/Experiences';
import AdminEducation from './pages/admin/Education';
import AdminCertificates from './pages/admin/Certificates';
import AdminBlogs from './pages/admin/Blogs';
import AdminTestimonials from './pages/admin/Testimonials';
import AdminMessages from './pages/admin/Messages';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import ProtectedRoute from './components/ui/ProtectedRoute';



/*
 Public Layout
*/
const PublicLayout = () => {

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

    </div>
  );
};



function App() {

  const { isAuthenticated, loading } = useAuth();


  if(loading){

    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="
        animate-spin 
        rounded-full 
        h-16 
        w-16 
        border-4 
        border-primary 
        border-t-transparent
        "></div>

      </div>
    );

  }



  return (

    <Routes>


      {/* PUBLIC ROUTES */}

      <Route path="/" element={<PublicLayout />}>

        <Route index element={<Home />} />

        <Route path="about" element={<About />} />

        <Route path="skills" element={<Skills />} />

        <Route path="projects" element={<Projects />} />

        <Route path="experience" element={<Experience />} />

        <Route path="education" element={<Education />} />

        <Route path="certificates" element={<Certificates />} />

        <Route path="blog" element={<Blog />} />

        <Route 
          path="blog/:slug" 
          element={<BlogDetail />} 
        />

        <Route 
          path="testimonials" 
          element={<Testimonials />} 
        />

        <Route 
          path="contact" 
          element={<Contact />} 
        />


      </Route>





      {/* ADMIN LOGIN */}

      <Route
        path="/admin/login"
        element={
          isAuthenticated 
          ? <Navigate to="/admin" />
          : <AdminLogin />
        }
      />





      {/* ADMIN ROUTES */}

      <Route

        path="/admin"

        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }

      >


        <Route 
          index 
          element={<AdminDashboard />} 
        />


        <Route 
          path="profile" 
          element={<AdminProfile />} 
        />


        <Route 
          path="projects" 
          element={<AdminProjects />} 
        />


        <Route 
          path="skills" 
          element={<AdminSkills />} 
        />


        <Route 
          path="experiences" 
          element={<AdminExperiences />} 
        />


        <Route 
          path="education" 
          element={<AdminEducation />} 
        />


        <Route 
          path="certificates" 
          element={<AdminCertificates />} 
        />


        <Route 
          path="blogs" 
          element={<AdminBlogs />} 
        />


        <Route 
          path="testimonials" 
          element={<AdminTestimonials />} 
        />


        <Route 
          path="messages" 
          element={<AdminMessages />} 
        />


      </Route>


    </Routes>

  );

}


export default App;