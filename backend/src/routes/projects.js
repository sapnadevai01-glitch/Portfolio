const express = require('express');
const { body, validationResult } = require('express-validator');
const prisma = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Get featured projects (public)
router.get('/', async (req, res) => {
  try {
    const { featured } = req.query;
    const where = featured === 'true' ? { featured: true } : {};

    const projects = await prisma.project.findMany({
      where,
      orderBy: { order: 'asc' }
    });

    const parsed = projects.map(p => ({
      ...p,
      technologies: JSON.parse(p.technologies || '[]')
    }));

    res.json(parsed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single project (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) }
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({
      ...project,
      technologies: JSON.parse(project.technologies || '[]')
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create project (protected)
router.post('/', auth, [
  body('title').trim().notEmpty(),
  body('description').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, longDescription, image, demoUrl, sourceUrl, technologies, featured, order } = req.body;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        longDescription: longDescription || '',
        image: image || '',
        demoUrl: demoUrl || '',
        sourceUrl: sourceUrl || '',
        technologies: JSON.stringify(technologies || []),
        featured: featured || false,
        order: order || 0
      }
    });

    await prisma.activityLog.create({
      data: {
        action: 'CREATE',
        entityType: 'Project',
        entityId: project.id,
        description: `Project "${title}" created`
      }
    });

    res.status(201).json({
      ...project,
      technologies: JSON.parse(project.technologies)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update project (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, longDescription, image, demoUrl, sourceUrl, technologies, featured, order } = req.body;

    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        longDescription,
        image,
        demoUrl,
        sourceUrl,
        technologies: JSON.stringify(technologies || []),
        featured,
        order
      }
    });

    await prisma.activityLog.create({
      data: {
        action: 'UPDATE',
        entityType: 'Project',
        entityId: project.id,
        description: `Project "${title}" updated`
      }
    });

    res.json({
      ...project,
      technologies: JSON.parse(project.technologies)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete project (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.project.delete({ where: { id: parseInt(id) } });

    await prisma.activityLog.create({
      data: {
        action: 'DELETE',
        entityType: 'Project',
        entityId: parseInt(id),
        description: 'Project deleted'
      }
    });

    res.json({ message: 'Project deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
