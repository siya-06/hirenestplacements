import Job from '../models/Job.js';

// @desc    Get all jobs (supports query parameter ?all=true to return inactive ones)
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req, res) => {
  try {
    const showAll = req.query.all === 'true';
    const query = showAll ? {} : { active: true };
    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job posting not found.' });
    }
    res.status(200).json(job);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Job posting not found.' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new job mandate
// @route   POST /api/jobs
// @access  Private/Admin
export const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      experience,
      description,
      requirements,
      responsibilities,
      benefits
    } = req.body;

    if (!title || !company || !location || !experience || !description) {
      return res.status(400).json({ message: 'Required fields: title, company, location, experience, description.' });
    }

    const parseArrayInput = (input) => {
      if (typeof input === 'string') {
        return input.split(',').map(s => s.trim()).filter(s => s.length > 0);
      }
      return Array.isArray(input) ? input : [];
    };

    const newJob = new Job({
      title,
      company,
      location,
      experience,
      description,
      requirements: parseArrayInput(requirements),
      responsibilities: parseArrayInput(responsibilities),
      benefits: parseArrayInput(benefits)
    });

    const savedJob = await newJob.save();
    res.status(201).json({
      message: 'Job posting created successfully.',
      data: savedJob
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a job mandate
// @route   PUT /api/jobs/:id
// @access  Private/Admin
export const updateJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      experience,
      description,
      requirements,
      responsibilities,
      benefits,
      active
    } = req.body;

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job posting not found.' });
    }

    const parseArrayInput = (input) => {
      if (typeof input === 'string') {
        return input.split(',').map(s => s.trim()).filter(s => s.length > 0);
      }
      return Array.isArray(input) ? input : [];
    };

    if (title !== undefined) job.title = title;
    if (company !== undefined) job.company = company;
    if (location !== undefined) job.location = location;
    if (experience !== undefined) job.experience = experience;
    if (description !== undefined) job.description = description;
    if (requirements !== undefined) job.requirements = parseArrayInput(requirements);
    if (responsibilities !== undefined) job.responsibilities = parseArrayInput(responsibilities);
    if (benefits !== undefined) job.benefits = parseArrayInput(benefits);
    if (active !== undefined) job.active = active;

    const updatedJob = await job.save();
    res.status(200).json({
      message: 'Job posting updated successfully.',
      data: updatedJob
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Job posting not found.' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a job mandate
// @route   DELETE /api/jobs/:id
// @access  Private/Admin
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job posting not found.' });
    }
    res.status(200).json({ message: 'Job posting deleted successfully.' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Job posting not found.' });
    }
    res.status(500).json({ message: error.message });
  }
};
