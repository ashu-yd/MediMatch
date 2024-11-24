import express from 'express';
import { auth } from '../middleware/auth.js';
import Review from '../models/Review.js';
import MedicalStudent from '../models/MedicalStudent.js';

const router = express.Router();

// Create new review
router.post('/', auth, async (req, res) => {
  try {
    const review = new Review({
      ...req.body,
      userId: req.user.userId,
    });
    await review.save();

    // Update medical student's rating
    const student = await MedicalStudent.findOne({ userId: review.studentId });
    if (student) {
      const reviews = await Review.find({ studentId: review.studentId });
      const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
      student.rating = totalRating / reviews.length;
      student.reviewCount = reviews.length;
      await student.save();
    }

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get reviews for a medical student
router.get('/student/:studentId', async (req, res) => {
  try {
    const reviews = await Review.find({ studentId: req.params.studentId })
      .populate('userId', '-password')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;