const express = require('express');
const { body, validationResult } = require('express-validator');
const prisma = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Get published blogs (public)
router.get('/', async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all blogs (protected)
router.get('/all', auth, async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single blog by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await prisma.blog.findUnique({
      where: { slug }
    });

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create blog (protected)
router.post('/', auth, [
  body('title').trim().notEmpty(),
  body('slug').trim().notEmpty().isSlug(),
  body('content').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, slug, excerpt, content, image, published } = req.body;

    const existing = await prisma.blog.findUnique({ where: { slug } });
    if (existing) {
      return res.status(400).json({ error: 'Slug already exists' });
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        excerpt: excerpt || '',
        content,
        image: image || '',
        published: published || false
      }
    });

    await prisma.activityLog.create({
      data: {
        action: 'CREATE',
        entityType: 'Blog',
        entityId: blog.id,
        description: `Blog "${title}" created`
      }
    });

    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update blog (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, excerpt, content, image, published } = req.body;

    // Check if slug is taken by another blog
    if (slug) {
      const existing = await prisma.blog.findFirst({
        where: { slug, NOT: { id: parseInt(id) } }
      });
      if (existing) {
        return res.status(400).json({ error: 'Slug already exists' });
      }
    }

    const blog = await prisma.blog.update({
      where: { id: parseInt(id) },
      data: { title, slug, excerpt, content, image, published }
    });

    await prisma.activityLog.create({
      data: {
        action: 'UPDATE',
        entityType: 'Blog',
        entityId: blog.id,
        description: `Blog "${title}" updated`
      }
    });

    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete blog (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.blog.delete({ where: { id: parseInt(id) } });

    await prisma.activityLog.create({
      data: {
        action: 'DELETE',
        entityType: 'Blog',
        entityId: parseInt(id),
        description: 'Blog deleted'
      }
    });

    res.json({ message: 'Blog deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
