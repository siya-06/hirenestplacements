import express from 'express';
import { 
  createCandidate, 
  getCandidates, 
  getCandidateById, 
  updateCandidateStatus,
  upload 
} from '../controllers/candidateController.js';

const router = express.Router();

// Public apply route
router.post('/', upload.single('resume'), createCandidate);

// Admin queries
router.get('/', getCandidates);
router.get('/:id', getCandidateById);
router.patch('/:id/status', updateCandidateStatus);

export default router;
