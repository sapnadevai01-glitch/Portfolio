const express = require('express');
const prisma = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

// Dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const [
      skillsCount,
      projectsCount,
      experiencesCount,
      educationCount,
      certificatesCount,
      blogsCount,
      testimonialsCount,
      messagesCount,
      unreadMessagesCount
    ] = await Promise.all([
      prisma.skill.count(),
      prisma.project.count(),
      prisma.experience.count(),
      prisma.education.count(),
      prisma.certificate.count(),
      prisma.blog.count(),
      prisma.testimonial.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { read: false } })
    ]);

    res.json({
      skillsCount,
      projectsCount,
      experiencesCount,
      educationCount,
      certificatesCount,
      blogsCount,
      testimonialsCount,
      messagesCount,
      unreadMessagesCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Recent activities
router.get('/activities', async (req, res) => {
  try {
    const activities = await prisma.activityLog.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' }
    });
    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Mark message as read
router.put('/messages/:id/read', async (req, res) => {
  try {
    const { id } = req.params;
    const message = await prisma.contactMessage.update({
      where: { id: parseInt(id) },
      data: { read: true }
    });
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete message
router.delete('/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.contactMessage.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Message deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
