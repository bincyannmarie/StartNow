import express from 'express';
import { authenticateJWT } from "../middlewares/auth.middleware.js";  // whatever middleware you use to check JWT
import Pitch from '../models/startup.model.js';
import User from '../models/user.model.js';

const router = express.Router();

// Get all pitches (for investor browsing)
router.get('/pitches', authenticateJWT, async (req, res) => {
  // Optionally check user role
  if (req.user.role !== 'investor') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const pitches = await Pitch.find().populate('founder');  // or whichever associations
  res.json(pitches);
});

// Mark interest in a pitch
router.post('/interests/:pitchId', authenticateJWT, async (req, res) => {
  if (req.user.role !== 'investor') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const investor = await User.findById(req.user.id);
  const { pitchId } = req.params;
  if (!investor.interestedPitches.includes(pitchId)) {
    investor.interestedPitches.push(pitchId);
    await investor.save();
  }
  res.json({ message: 'Marked interest' });
});

// Get investor’s interested pitches
router.get('/interests', authenticateJWT, async (req, res) => {
  if (req.user.role !== 'investor') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const investor = await User.findById(req.user.id).populate({
    path: 'interestedPitches',
    populate: { path: 'founder' },
  });
  res.json(investor.interestedPitches);
});

export default router;
