# Portfolio Website Specification

## 1. Project Overview

**Project Name:** Developer Portfolio  
**Type:** Full-stack Web Application  
**Core Functionality:** A professional portfolio website showcasing a developer's work, skills, and experience with a secure admin panel for content management.  
**Target Users:** Recruiters, clients, and fellow developers

---

## 2. Tech Stack

### Frontend
- React.js (Vite)
- React Router v6
- Axios
- Framer Motion
- React Icons
- AOS (Animate on Scroll)

### Backend
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT (jsonwebtoken)
- bcryptjs
- cors
- dotenv

---

## 3. Design System

### Color Palette
- **Primary:** #6C63FF (Vibrant Purple)
- **Secondary:** #FF6584 (Coral Pink)
- **Accent:** #00D9FF (Cyan)
- **Success:** #00C853 (Green)
- **Warning:** #FFB300 (Amber)
- **Error:** #FF5252 (Red)
- **Dark Background:** #0F0F1A
- **Dark Surface:** #1A1A2E
- **Dark Card:** #16213E
- **Light Background:** #F8F9FA
- **Light Surface:** #FFFFFF
- **Light Card:** #FFFFFF

### Gradients
- Hero: linear-gradient(135deg, #6C63FF 0%, #FF6584 50%, #00D9FF 100%)
- Cards: linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)
- Text: linear-gradient(90deg, #6C63FF, #00D9FF)

### Typography
- **Headings:** Poppins (700, 600)
- **Body:** Inter (400, 500)
- **Code:** JetBrains Mono

### Glassmorphism
- Background: rgba(255, 255, 255, 0.05)
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Border Radius: 16px
- Backdrop Filter: blur(10px)

---

## 4. Database Schema

### Models

```
User (Admin)
├── id: Int (PK)
├── email: String (Unique)
├── password: String (Hashed)
├── name: String
├── createdAt: DateTime
└── updatedAt: DateTime

Profile
├── id: Int (PK)
├── name: String
├── title: String
├── bio: Text
├── avatar: String (URL)
├── resumeUrl: String
├── githubUrl: String
├── linkedinUrl: String
├── twitterUrl: String
├── email: String
├── phone: String
├── location: String
└── updatedAt: DateTime

Skill
├── id: Int (PK)
├── name: String
├── category: String (Frontend, Backend, Database, DevOps, Other)
├── proficiency: Int (1-100)
├── icon: String
└── order: Int

Project
├── id: Int (PK)
├── title: String
├── description: Text
├── longDescription: Text
├── image: String (URL)
├── demoUrl: String
├── sourceUrl: String
├── technologies: String[]
├── featured: Boolean
├── order: Int
└── createdAt: DateTime

Experience
├── id: Int (PK)
├── company: String
├── position: String
├── location: String
├── startDate: DateTime
├── endDate: DateTime (Nullable)
├── current: Boolean
├── description: Text
└── order: Int

Education
├── id: Int (PK)
├── institution: String
├── degree: String
├── field: String
├── startDate: DateTime
├── endDate: DateTime
├── description: Text
└── order: Int

Certificate
├── id: Int (PK)
├── name: String
├── issuer: String
├── date: DateTime
├── url: String
├── description: Text
└── order: Int

Blog
├── id: Int (PK)
├── title: String
├── slug: String (Unique)
├── excerpt: Text
├── content: Text
├── image: String (URL)
├── published: Boolean
├── createdAt: DateTime
└── updatedAt: DateTime

Testimonial
├── id: Int (PK)
├── name: String
├── role: String
├── company: String
├── content: Text
├── avatar: String (URL)
├── rating: Int (1-5)
└── order: Int

ContactMessage
├── id: Int (PK)
├── name: String
├── email: String
├── subject: String
├── message: Text
├── read: Boolean
└── createdAt: DateTime

ActivityLog
├── id: Int (PK)
├── action: String
├── entityType: String
├── entityId: Int
├── description: String
└── createdAt: DateTime
```

---

## 5. API Endpoints

### Auth
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register admin (protected)
- `GET /api/auth/me` - Get current user

### Public (No Auth)
- `GET /api/profile` - Get public profile
- `GET /api/skills` - List all skills
- `GET /api/projects` - List featured projects
- `GET /api/projects/all` - List all projects
- `GET /api/experiences` - List experiences
- `GET /api/education` - List education
- `GET /api/certificates` - List certificates
- `GET /api/blogs` - List published blogs
- `GET /api/blogs/:slug` - Get single blog
- `GET /api/testimonials` - List testimonials
- `POST /api/contact` - Submit contact message

### Admin Protected
- `GET /api/admin/stats` - Dashboard stats
- `GET /api/admin/activities` - Recent activities
- `PUT /api/admin/profile` - Update profile
- `POST /api/admin/skills` - Create skill
- `PUT /api/admin/skills/:id` - Update skill
- `DELETE /api/admin/skills/:id` - Delete skill
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project
- `POST /api/admin/experiences` - Create experience
- `PUT /api/admin/experiences/:id` - Update experience
- `DELETE /api/admin/experiences/:id` - Delete experience
- `POST /api/admin/education` - Create education
- `PUT /api/admin/education/:id` - Update education
- `DELETE /api/admin/education/:id` - Delete education
- `POST /api/admin/certificates` - Create certificate
- `PUT /api/admin/certificates/:id` - Update certificate
- `DELETE /api/admin/certificates/:id` - Delete certificate
- `POST /api/admin/blogs` - Create blog
- `PUT /api/admin/blogs/:id` - Update blog
- `DELETE /api/admin/blogs/:id` - Delete blog
- `POST /api/admin/testimonials` - Create testimonial
- `PUT /api/admin/testimonials/:id` - Update testimonial
- `DELETE /api/admin/testimonials/:id` - Delete testimonial
- `GET /api/admin/messages` - List messages
- `PUT /api/admin/messages/:id/read` - Mark as read
- `DELETE /api/admin/messages/:id` - Delete message

---

## 6. Frontend Pages

### Public Pages
1. **Home** - Hero section with animated text, CTA buttons, social links
2. **About** - Personal info, bio, resume download
3. **Skills** - Animated skill bars with categories
4. **Projects** - Filterable project grid with modals
5. **Experience** - Timeline component
6. **Education** - Timeline component
7. **Certificates** - Card grid
8. **Blog** - Blog listing and single blog view
9. **Testimonials** - Carousel of client reviews
10. **Contact** - Contact form with validation

### Admin Pages
1. **Login** - Secure login form
2. **Dashboard** - Overview cards, charts, activities
3. **Profile** - Edit personal information
4. **Projects Management** - CRUD for projects
5. **Skills Management** - CRUD for skills
6. **Experience Management** - CRUD for experiences
7. **Education Management** - CRUD for education
8. **Certificates Management** - CRUD for certificates
9. **Blog Management** - CRUD for blog posts
10. **Testimonials Management** - CRUD for testimonials
11. **Messages** - View and manage contact submissions

---

## 7. Component Library

### UI Components
- Button (primary, secondary, outline, ghost)
- Card (glass, elevated, flat)
- Input (text, email, textarea, select)
- Badge
- Avatar
- Modal
- Toast
- Loading Spinner
- Progress Bar
- Timeline
- Carousel
- Chart (bar, line, pie)

### Section Components
- Navbar
- Footer
- Hero
- SectionTitle
- SkillCard
- ProjectCard
- ExperienceCard
- EducationCard
- CertificateCard
- BlogCard
- TestimonialCard
- ContactForm
- AdminSidebar

---

## 8. Animations

- **Page Transitions:** Fade in/out with Framer Motion
- **Scroll Animations:** AOS library for reveal on scroll
- **Hover Effects:** Scale, glow, color shift
- **Loading States:** Skeleton loaders, spinners
- **Micro-interactions:** Button clicks, form submissions
- **Hero Animation:** Typewriter effect, gradient animation

---

## 9. Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 10. Security

- Password hashing with bcrypt (12 rounds)
- JWT tokens with 7-day expiry
- Protected admin routes
- Input validation and sanitization
- CORS configuration
- Rate limiting on contact form
