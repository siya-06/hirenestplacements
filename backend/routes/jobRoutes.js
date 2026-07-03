import express from 'express';
import { getJobs, getJobById, createJob, updateJob } from '../controllers/jobController.js';

const router = express.Router();

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', createJob);
router.put('/:id', updateJob);

export default router;
