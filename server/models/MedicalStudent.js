import mongoose from 'mongoose';

const timeSlotSchema = new mongoose.Schema({
  start: String,
  end: String,
});

const medicalStudentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialization: { type: String, default: '' },  // Make specialization optional
  experience: { type: Number, required: true },
  bio: String,
  availability: {
    type: Map,
    of: [timeSlotSchema],
  },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
});

export default mongoose.model('MedicalStudent', medicalStudentSchema);