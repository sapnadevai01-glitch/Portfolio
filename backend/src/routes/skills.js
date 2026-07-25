const express = require('express');
const { body, validationResult } = require('express-validator');
const prisma = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all skills (public)
router.get('/', async (req, res) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { order: 'asc' }]
    });
    res.json(skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create skill (protected)
router.post('/', auth, [
  body('name').trim().notEmpty(),
  body('category').trim().notEmpty(),
  body('proficiency').isInt({ min: 1, max: 100 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, proficiency, icon, order } = req.body;

    const skill = await prisma.skill.create({
      data: { name, category, proficiency, icon, order: order || 0 }
    });

    await prisma.activityLog.create({
      data: {
        action: 'CREATE',
        entityType: 'Skill',
        entityId: skill.id,
        description: `Skill "${name}" created`
      }
    });

    res.status(201).json(skill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update skill (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, proficiency, icon, order } = req.body;

    const skill = await prisma.skill.update({
      where: { id: parseInt(id) },
      data: { name, category, proficiency, icon, order }
    });

    await prisma.activityLog.create({
      data: {
        action: 'UPDATE',
        entityType: 'Skill',
        entityId: skill.id,
        description: `Skill "${name}" updated`
      }
    });

    res.json(skill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete skill (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.skill.delete({ where: { id: parseInt(id) } });

    await prisma.activityLog.create({
      data: {
        action: 'DELETE',
        entityType: 'Skill',
        entityId: parseInt(id),
        description: 'Skill deleted'
      }
    });

    res.json({ message: 'Skill deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
