import express from 'express';
import { auth } from '../middleware/auth.js';
import Consultation from '../models/Consultation.js';

const router = express.Router();

// Create new consultation
router.post('/', auth, async (req, res) => {
  try {
    const consultation = new Consultation({
      ...req.body,
      userId: req.user.userId,
    });
    await consultation.save();
    res.status(201).json(consultation);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get consultations for a user
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const consultations = await Consultation.find({ userId: req.params.userId })
      .populate('studentId', '-password')
      .sort({ createdAt: -1 });
    res.json(consultations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get consultations for a medical student
router.get('/student/:studentId', auth, async (req, res) => {
  try {
    const consultations = await Consultation.find({ studentId: req.params.studentId })
      .populate('userId', '-password')
      .sort({ createdAt: -1 });
    res.json(consultations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update consultation status
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate(['userId', 'studentId']);
    
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }
    res.json(consultation);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add message to consultation
router.post('/:id/messages', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          messages: {
            senderId: req.user.userId,
            content,
          },
        },
      },
      { new: true }
    );
    
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }
    res.json(consultation);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;