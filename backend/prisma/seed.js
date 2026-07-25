const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  const user = await prisma.user.upsert({
    where: { email: 'admin@portfolio.com' },
    update: {},
    create: {
      email: 'admin@portfolio.com',
      password: hashedPassword,
      name: 'Admin'
    }
  });
  console.log('Admin user created:', user.email);

  // Create default profile
  const profile = await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'John Doe',
      title: 'Full Stack Developer',
      bio: 'Passionate Full Stack Developer with expertise in building modern web applications. I love creating beautiful, performant, and user-friendly digital experiences that make a difference.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      resumeUrl: '#',
      githubUrl: 'https://github.com',
      linkedinUrl: 'https://linkedin.com',
      twitterUrl: 'https://twitter.com',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      location: 'San Francisco, CA'
    }
  });
  console.log('Profile created');

  // Create skills
  const skillsData = [
    { name: 'React', category: 'Frontend', proficiency: 95, icon: 'FaReact', order: 1 },
    { name: 'JavaScript', category: 'Frontend', proficiency: 92, icon: 'FaJs', order: 2 },
    { name: 'TypeScript', category: 'Frontend', proficiency: 88, icon: 'FaTs', order: 3 },
    { name: 'HTML/CSS', category: 'Frontend', proficiency: 90, icon: 'FaHtml5', order: 4 },
    { name: 'Tailwind CSS', category: 'Frontend', proficiency: 85, icon: 'FaTailwind', order: 5 },
    { name: 'Node.js', category: 'Backend', proficiency: 90, icon: 'FaNodeJs', order: 6 },
    { name: 'Express', category: 'Backend', proficiency: 88, icon: 'SiExpress', order: 7 },
    { name: 'PostgreSQL', category: 'Database', proficiency: 85, icon: 'FaDatabase', order: 8 },
    { name: 'MongoDB', category: 'Database', proficiency: 80, icon: 'SiMongodb', order: 9 },
    { name: 'Prisma', category: 'Database', proficiency: 87, icon: 'SiPrisma', order: 10 },
    { name: 'Docker', category: 'DevOps', proficiency: 75, icon: 'FaDocker', order: 11 },
    { name: 'Git', category: 'DevOps', proficiency: 90, icon: 'FaGitAlt', order: 12 },
    { name: 'AWS', category: 'DevOps', proficiency: 72, icon: 'FaAws', order: 13 },
    { name: 'Python', category: 'Other', proficiency: 78, icon: 'FaPython', order: 14 },
    { name: 'Figma', category: 'Other', proficiency: 80, icon: 'FaFigma', order: 15 }
  ];

  for (const skill of skillsData) {
    await prisma.skill.upsert({
      where: { id: skillsData.indexOf(skill) + 1 },
      update: skill,
      create: skill
    });
  }
  console.log('Skills created');

  // Create projects
  const projectsData = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured online store with cart, payments, and admin dashboard.',
      longDescription: 'Built a complete e-commerce solution with React frontend, Node.js backend, PostgreSQL database, and Stripe integration. Features include product management, order tracking, user authentication, and real-time notifications.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      demoUrl: '#',
      sourceUrl: '#',
      technologies: JSON.stringify(['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redux']),
      featured: true,
      order: 1
    },
    {
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates.',
      longDescription: 'A Trello-like application with drag-and-drop boards, real-time collaboration, team management, and comprehensive project analytics. Built with modern React patterns and WebSocket integration.',
      image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=600&fit=crop',
      demoUrl: '#',
      sourceUrl: '#',
      technologies: JSON.stringify(['React', 'TypeScript', 'Socket.io', 'MongoDB', 'Express']),
      featured: true,
      order: 2
    },
    {
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for tracking social media performance.',
      longDescription: 'Comprehensive analytics platform that aggregates data from multiple social media platforms. Provides insights, generates reports, and helps businesses make data-driven decisions.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      demoUrl: '#',
      sourceUrl: '#',
      technologies: JSON.stringify(['Next.js', 'Chart.js', 'API Integration', 'Tailwind']),
      featured: true,
      order: 3
    },
    {
      title: 'Weather Forecast App',
      description: 'Beautiful weather application with location-based forecasts.',
      longDescription: 'Modern weather app with beautiful UI, hourly forecasts, weather maps, and severe weather alerts. Uses OpenWeatherMap API for accurate data.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
      demoUrl: '#',
      sourceUrl: '#',
      technologies: JSON.stringify(['React', 'OpenWeatherMap API', 'Framer Motion']),
      featured: false,
      order: 4
    }
  ];

  for (let i = 0; i < projectsData.length; i++) {
    await prisma.project.upsert({
      where: { id: i + 1 },
      update: projectsData[i],
      create: projectsData[i]
    });
  }
  console.log('Projects created');

  // Create experiences
  const experiencesData = [
    {
      company: 'Tech Corp',
      position: 'Senior Full Stack Developer',
      location: 'San Francisco, CA',
      startDate: new Date('2022-01-01'),
      endDate: null,
      current: true,
      description: 'Leading development of enterprise web applications. Mentoring junior developers and architecting scalable solutions.',
      order: 1
    },
    {
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      location: 'Remote',
      startDate: new Date('2019-06-01'),
      endDate: new Date('2021-12-31'),
      current: false,
      description: 'Built and maintained multiple client projects. Implemented CI/CD pipelines and improved application performance.',
      order: 2
    },
    {
      company: 'Digital Agency',
      position: 'Frontend Developer',
      location: 'New York, NY',
      startDate: new Date('2017-03-01'),
      endDate: new Date('2019-05-31'),
      current: false,
      description: 'Developed responsive web interfaces for various clients. Collaborated with designers to implement pixel-perfect UIs.',
      order: 3
    }
  ];

  for (let i = 0; i < experiencesData.length; i++) {
    await prisma.experience.upsert({
      where: { id: i + 1 },
      update: experiencesData[i],
      create: experiencesData[i]
    });
  }
  console.log('Experiences created');

  // Create education
  const educationData = [
    {
      institution: 'Stanford University',
      degree: 'Master of Science',
      field: 'Computer Science',
      startDate: new Date('2015-09-01'),
      endDate: new Date('2017-06-01'),
      description: 'Specialized in Distributed Systems and Machine Learning',
      order: 1
    },
    {
      institution: 'University of California',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: new Date('2011-09-01'),
      endDate: new Date('2015-06-01'),
      description: 'Dean\'s List, Programming Club President',
      order: 2
    }
  ];

  for (let i = 0; i < educationData.length; i++) {
    await prisma.education.upsert({
      where: { id: i + 1 },
      update: educationData[i],
      create: educationData[i]
    });
  }
  console.log('Education created');

  // Create certificates
  const certificatesData = [
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: new Date('2023-03-15'),
      url: '#',
      description: 'Professional certification for designing distributed systems on AWS.',
      order: 1
    },
    {
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: new Date('2022-11-20'),
      url: '#',
      description: 'Expertise in building and managing cloud-native applications.',
      order: 2
    },
    {
      name: 'Meta Frontend Developer Certificate',
      issuer: 'Meta',
      date: new Date('2022-06-01'),
      url: '#',
      description: 'Comprehensive frontend development certification.',
      order: 3
    }
  ];

  for (let i = 0; i < certificatesData.length; i++) {
    await prisma.certificate.upsert({
      where: { id: i + 1 },
      update: certificatesData[i],
      create: certificatesData[i]
    });
  }
  console.log('Certificates created');

  // Create testimonials
  const testimonialsData = [
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      company: 'TechCorp',
      content: 'Outstanding developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are exceptional.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      order: 1
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'StartupXYZ',
      content: 'A true professional who understands both technical and business requirements. Great to work with on any project.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      order: 2
    },
    {
      name: 'Emily Davis',
      role: 'Design Lead',
      company: 'Creative Agency',
      content: 'His ability to translate designs into pixel-perfect code is remarkable. Always goes above and beyond expectations.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      order: 3
    }
  ];

  for (let i = 0; i < testimonialsData.length; i++) {
    await prisma.testimonial.upsert({
      where: { id: i + 1 },
      update: testimonialsData[i],
      create: testimonialsData[i]
    });
  }
  console.log('Testimonials created');

  // Create sample blog posts
  const blogsData = [
    {
      title: 'Building Scalable Web Applications with React',
      slug: 'building-scalable-web-applications-react',
      excerpt: 'Learn best practices for building large-scale React applications that are maintainable and performant.',
      content: 'When building complex React applications, its important to follow proven architectural patterns...',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      published: true
    },
    {
      title: 'Node.js Performance Optimization Tips',
      slug: 'nodejs-performance-optimization-tips',
      excerpt: 'Practical tips for optimizing your Node.js applications for better performance.',
      content: 'Performance is crucial for any production application. Here are some tips...',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
      published: true
    },
    {
      title: 'The Future of Web Development',
      slug: 'future-of-web-development',
      excerpt: 'Exploring upcoming trends and technologies that will shape the future of web development.',
      content: 'The web development landscape is constantly evolving...',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
      published: true
    }
  ];

  for (let i = 0; i < blogsData.length; i++) {
    await prisma.blog.upsert({
      where: { id: i + 1 },
      update: blogsData[i],
      create: blogsData[i]
    });
  }
  console.log('Blogs created');

  console.log('Database seeding completed!');
  console.log('\nAdmin credentials:');
  console.log('Email: admin@portfolio.com');
  console.log('Password: admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
