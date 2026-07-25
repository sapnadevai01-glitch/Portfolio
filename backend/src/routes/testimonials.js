const express = require('express');
const { body, validationResult } = require('express-validator');
const prisma = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all testimonials (public)
router.get('/', async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { order: 'asc' }
    });
    res.json(testimonials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create testimonial (protected)
router.post('/', auth, [
  body('name').trim().notEmpty(),
  body('role').trim().notEmpty(),
  body('content').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, role, company, content, avatar, rating, order } = req.body;

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        role,
        company: company || '',
        content,
        avatar: avatar || '',
        rating: rating || 5,
        order: order || 0
      }
    });

    await prisma.activityLog.create({
      data: {
        action: 'CREATE',
        entityType: 'Testimonial',
        entityId: testimonial.id,
        description: `Testimonial from "${name}" created`
      }
    });

    res.status(201).json(testimonial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update testimonial (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, company, content, avatar, rating, order } = req.body;

    const testimonial = await prisma.testimonial.update({
      where: { id: parseInt(id) },
      data: { name, role, company, content, avatar, rating, order }
    });

    await prisma.activityLog.create({
      data: {
        action: 'UPDATE',
        entityType: 'Testimonial',
        entityId: testimonial.id,
        description: `Testimonial from "${name}" updated`
      }
    });

    res.json(testimonial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete testimonial (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.testimonial.delete({ where: { id: parseInt(id) } });

    await prisma.activityLog.create({
      data: {
        action: 'DELETE',
        entityType: 'Testimonial',
        entityId: parseInt(id),
        description: 'Testimonial deleted'
      }
    });

    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
