const express = require('express');
const { body, validationResult } = require('express-validator');
const prisma = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all certificates (public)
router.get('/', async (req, res) => {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { order: 'asc' }
    });
    res.json(certificates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create certificate (protected)
router.post('/', auth, [
  body('name').trim().notEmpty(),
  body('issuer').trim().notEmpty(),
  body('date').isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, issuer, date, url, description, order } = req.body;

    const certificate = await prisma.certificate.create({
      data: {
        name,
        issuer,
        date: new Date(date),
        url: url || '',
        description: description || '',
        order: order || 0
      }
    });

    await prisma.activityLog.create({
      data: {
        action: 'CREATE',
        entityType: 'Certificate',
        entityId: certificate.id,
        description: `Certificate "${name}" created`
      }
    });

    res.status(201).json(certificate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update certificate (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, issuer, date, url, description, order } = req.body;

    const certificate = await prisma.certificate.update({
      where: { id: parseInt(id) },
      data: {
        name,
        issuer,
        date: new Date(date),
        url,
        description,
        order
      }
    });

    await prisma.activityLog.create({
      data: {
        action: 'UPDATE',
        entityType: 'Certificate',
        entityId: certificate.id,
        description: `Certificate "${name}" updated`
      }
    });

    res.json(certificate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete certificate (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.certificate.delete({ where: { id: parseInt(id) } });

    await prisma.activityLog.create({
      data: {
        action: 'DELETE',
        entityType: 'Certificate',
        entityId: parseInt(id),
        description: 'Certificate deleted'
      }
    });

    res.json({ message: 'Certificate deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
