import express from 'express';
import { auth } from '../middleware/auth.js';
import MedicalStudent from '../models/MedicalStudent.js';
import User from '../models/User.js';

const router = express.Router();

// Get all medical students
router.get('/', async (req, res) => {
  try {
    const students = await MedicalStudent.find().populate('userId', '-password');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get medical student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await MedicalStudent.findOne({ userId: req.params.id }).populate('userId', '-password');
    if (!student) {
      return res.status(404).json({ message: 'Medical student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update medical student profile
router.put('/:id', auth, async (req, res) => {
  try {
    const { specialization, experience, bio, availability } = req.body;
    const student = await MedicalStudent.findOneAndUpdate(
      { userId: req.params.id },
      { specialization, experience, bio, availability },
      { new: true }
    ).populate('userId', '-password');
    
    if (!student) {
      return res.status(404).json({ message: 'Medical student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;