const express = require('express');
const { body, validationResult } = require('express-validator');
const prisma = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all education (public)
router.get('/', async (req, res) => {
  try {
    const education = await prisma.education.findMany({
      orderBy: { order: 'asc' }
    });
    res.json(education);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create education (protected)
router.post('/', auth, [
  body('institution').trim().notEmpty(),
  body('degree').trim().notEmpty(),
  body('field').trim().notEmpty(),
  body('startDate').isISO8601(),
  body('endDate').isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { institution, degree, field, startDate, endDate, description, order } = req.body;

    const education = await prisma.education.create({
      data: {
        institution,
        degree,
        field,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        description: description || '',
        order: order || 0
      }
    });

    await prisma.activityLog.create({
      data: {
        action: 'CREATE',
        entityType: 'Education',
        entityId: education.id,
        description: `Education "${institution}" created`
      }
    });

    res.status(201).json(education);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update education (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { institution, degree, field, startDate, endDate, description, order } = req.body;

    const education = await prisma.education.update({
      where: { id: parseInt(id) },
      data: {
        institution,
        degree,
        field,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        description,
        order
      }
    });

    await prisma.activityLog.create({
      data: {
        action: 'UPDATE',
        entityType: 'Education',
        entityId: education.id,
        description: `Education "${institution}" updated`
      }
    });

    res.json(education);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete education (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.education.delete({ where: { id: parseInt(id) } });

    await prisma.activityLog.create({
      data: {
        action: 'DELETE',
        entityType: 'Education',
        entityId: parseInt(id),
        description: 'Education deleted'
      }
    });

    res.json({ message: 'Education deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
