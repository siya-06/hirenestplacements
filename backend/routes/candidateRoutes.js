import express from 'express';
import { 
  createCandidate, 
  getCandidates, 
  getCandidateById, 
  updateCandidateStatus,
  upload 
} from '../controllers/candidateController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public apply route
router.post('/', upload.single('resume'), createCandidate);

// Admin queries (Protected)
router.get('/', protect, getCandidates);
router.get('/:id', protect, getCandidateById);
router.patch('/:id/status', protect, updateCandidateStatus);

export default router;
