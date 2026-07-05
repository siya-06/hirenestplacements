import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  experience: {
    type: Number, // Years of experience
    required: true,
  },
  skills: {
    type: [String], // Array of skills
    required: true,
  },
  linkedin: {
    type: String,
  },
  positionApplied: {
    type: String,
    required: true,
  },
  resumeUrl: {
    type: String,
    required: true,
  },
  resumeFilename: {
    type: String,
  },
  status: {
    type: String,
    enum: ['New', 'Reviewing', 'Shortlisted', 'Rejected', 'Hired'],
    default: 'New',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Candidate = mongoose.model('Candidate', candidateSchema);
export default Candidate;
