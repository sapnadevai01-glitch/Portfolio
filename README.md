# Developer Portfolio Website

A full-stack portfolio website with a modern, colorful UI featuring glassmorphism design, dark/light mode, and a complete admin panel for content management.

## Tech Stack

### Frontend
- React.js (Vite)
- React Router v6
- Axios
- Framer Motion
- Tailwind CSS
- Lucide React Icons

### Backend
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcryptjs

## Features

### Public Website
- 🏠 Home page with animated hero section
- 👤 About section with personal info
- 🛠️ Skills section with animated progress bars
- 📁 Projects showcase with modals
- 💼 Experience timeline
- 🎓 Education timeline
- 🏆 Certificates showcase
- 📝 Blog section
- 💬 Testimonials carousel
- 📧 Contact form
- 🌙 Dark/Light mode

### Admin Panel
- 🔐 Secure login with JWT
- 📊 Dashboard with stats and activities
- ✏️ Full CRUD for all modules:
  - Profile
  - Projects
  - Skills
  - Experience
  - Education
  - Certificates
  - Blogs
  - Testimonials
  - Contact Messages

## Installation

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)

### Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE portfolio_db;
```

2. Update the `.env` file in `/backend` with your PostgreSQL credentials:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/portfolio_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Run migrations
npx prisma migrate dev --name init

# Seed sample data
npm run seed

# Start the server
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Access

### Public Website
- URL: http://localhost:3000

### Admin Panel
- URL: http://localhost:3000/admin/login
- Default credentials:
  - Email: `admin@portfolio.com`
  - Password: `admin123`

### API Server
- URL: http://localhost:5000

## Project Structure

```
portfolio/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── seed.js          # Seed data
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js  # Prisma client
│   │   ├── middleware/
│   │   │   └── auth.js      # JWT authentication
│   │   ├── routes/
│   │   │   ├── admin.js     # Admin routes
│   │   │   ├── auth.js      # Auth routes
│   │   │   ├── blogs.js     # Blog routes
│   │   │   ├── certificates.js
│   │   │   ├── contact.js
│   │   │   ├── education.js
│   │   │   ├── experiences.js
│   │   │   ├── profile.js
│   │   │   ├── projects.js
│   │   │   ├── skills.js
│   │   │   └── testimonials.js
│   │   └── index.js         # Express app entry
│   ├── .env                 # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/       # Admin components
│   │   │   ├── layout/      # Navbar, Footer
│   │   │   ├── sections/    # Section components
│   │   │   └── ui/          # Reusable UI components
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── admin/       # Admin pages
│   │   │   └── public/      # Public pages
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── SPEC.md                  # Project specification
└── README.md
```

## API Endpoints

### Public Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/profile | Get profile |
| GET | /api/skills | List all skills |
| GET | /api/projects | List projects |
| GET | /api/experiences | List experiences |
| GET | /api/education | List education |
| GET | /api/certificates | List certificates |
| GET | /api/blogs | List published blogs |
| GET | /api/blogs/:slug | Get single blog |
| GET | /api/testimonials | List testimonials |
| POST | /api/contact | Submit contact form |

### Admin Routes (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | Admin login |
| GET | /api/auth/me | Get current user |
| GET | /api/admin/stats | Dashboard stats |
| GET | /api/admin/activities | Recent activities |
| PUT | /api/admin/profile | Update profile |
| GET/POST/PUT/DELETE | /api/admin/* | CRUD operations |

## Design Features

- 🎨 Modern glassmorphism UI
- 🌈 Colorful gradients
- ✨ Smooth Framer Motion animations
- 🔄 Dark/Light mode toggle
- 📱 Fully responsive design
- 🖱️ Hover effects and micro-interactions
- 💫 Animated skill bars
- 📰 Testimonials carousel
- 📝 Timeline components

## License

MIT License - Feel free to use this project for personal or commercial purposes.
