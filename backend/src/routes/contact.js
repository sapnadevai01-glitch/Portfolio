const express = require('express');
const { body, validationResult } = require('express-validator');
const prisma = require('../config/database');

const router = express.Router();

// Submit contact message (public)
router.post('/', [
  body('name').trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('subject').trim().notEmpty(),
  body('message').trim().isLength({ min: 10 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    const contact = await prisma.contactMessage.create({
      data: { name, email, subject, message }
    });

    await prisma.activityLog.create({
      data: {
        action: 'CREATE',
        entityType: 'ContactMessage',
        entityId: contact.id,
        description: `New message from "${name}"`
      }
    });

    res.status(201).json({ message: 'Message sent successfully', id: contact.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
