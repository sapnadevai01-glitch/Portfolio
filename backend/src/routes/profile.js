const express = require('express');
const prisma = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Get public profile
router.get('/', async (req, res) => {
  try {
    let profile = await prisma.profile.findFirst();

    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          name: 'John Doe',
          title: 'Full Stack Developer',
          bio: 'Passionate developer building amazing web experiences.',
          email: 'hello@johndoe.com',
          location: 'San Francisco, CA'
        }
      });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update profile (protected)
router.put('/', auth, async (req, res) => {
  try {
    const {
      name, title, bio, avatar, resumeUrl,
      githubUrl, linkedinUrl, twitterUrl,
      email, phone, location
    } = req.body;

    let profile = await prisma.profile.findFirst();

    if (profile) {
      profile = await prisma.profile.update({
        where: { id: profile.id },
        data: {
          name, title, bio, avatar, resumeUrl,
          githubUrl, linkedinUrl, twitterUrl,
          email, phone, location
        }
      });
    } else {
      profile = await prisma.profile.create({
        data: {
          name: name || 'John Doe',
          title: title || 'Full Stack Developer',
          bio: bio || '',
          email: email || '',
          location: location || ''
        }
      });
    }

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: 'UPDATE',
        entityType: 'Profile',
        entityId: profile.id,
        description: 'Profile updated'
      }
    });

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
