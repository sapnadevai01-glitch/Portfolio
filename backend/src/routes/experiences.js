const express = require('express');
const { body, validationResult } = require('express-validator');
const prisma = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all experiences (public)
router.get('/', async (req, res) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: 'asc' }
    });
    res.json(experiences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create experience (protected)
router.post('/', auth, [
  body('company').trim().notEmpty(),
  body('position').trim().notEmpty(),
  body('startDate').isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { company, position, location, startDate, endDate, current, description, order } = req.body;

    const experience = await prisma.experience.create({
      data: {
        company,
        position,
        location: location || '',
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current: current || false,
        description: description || '',
        order: order || 0
      }
    });

    await prisma.activityLog.create({
      data: {
        action: 'CREATE',
        entityType: 'Experience',
        entityId: experience.id,
        description: `Experience "${company}" created`
      }
    });

    res.status(201).json(experience);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update experience (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { company, position, location, startDate, endDate, current, description, order } = req.body;

    const experience = await prisma.experience.update({
      where: { id: parseInt(id) },
      data: {
        company,
        position,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current,
        description,
        order
      }
    });

    await prisma.activityLog.create({
      data: {
        action: 'UPDATE',
        entityType: 'Experience',
        entityId: experience.id,
        description: `Experience "${company}" updated`
      }
    });

    res.json(experience);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete experience (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.experience.delete({ where: { id: parseInt(id) } });

    await prisma.activityLog.create({
      data: {
        action: 'DELETE',
        entityType: 'Experience',
        entityId: parseInt(id),
        description: 'Experience deleted'
      }
    });

    res.json({ message: 'Experience deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
