import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import MedicalStudent from '../models/MedicalStudent.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, specialization, experience, bio } = req.body;

    // Validate input fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const validRoles = ['user', 'medical_student'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create a new user
    const user = new User({ name, email, password, role });
    await user.save();

    // If the user is a medical student, create a corresponding MedicalStudent document
    if (role === 'medical_student') {
      const student = new MedicalStudent({
        userId: user._id,
        specialization: specialization || 'Not specified', // Set default if not provided
        experience: experience || 0, // Set default experience if not provided
        bio: bio || 'No bio available', // Set default bio if not provided
      });
      await student.save();
    }

    // Generate a JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Error in /register route:', error); // Log the error to the console
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ user, token });
  } catch (error) {
    console.error('Error in /login route:', error); // Log the error to the console
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error in /me route:', error); // Log the error to the console
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;