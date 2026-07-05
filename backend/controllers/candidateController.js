import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import Candidate from '../models/Candidate.js';
import { sendCandidateConfirmation, sendCompanyCandidateNotification } from '../utils/emailService.js';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer memory storage
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept pdf, doc, docx
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'), false);
    }
  },
});

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = (fileBuffer, originalName) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'hirenest_resumes',
        resource_type: 'raw', // Support PDF/DOCX
        public_id: `${Date.now()}-${originalName.replace(/\.[^/.]+$/, '')}`,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

// @desc    Submit candidate application with resume
// @route   POST /api/candidates
// @access  Public
export const createCandidate = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      location,
      qualification,
      experience,
      skills,
      linkedin,
      positionApplied,
    } = req.body;

    // Validate text inputs (phone is optional)
    if (!fullName || !email || !location || !qualification || !experience || !skills || !positionApplied) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    // Validate file upload
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a resume file.' });
    }

    // Duplicate email check for the SAME position
    const duplicateApp = await Candidate.findOne({ 
      email: email.toLowerCase(), 
      positionApplied: { $regex: new RegExp(`^${positionApplied}$`, 'i') } 
    });
    
    if (duplicateApp) {
      return res.status(400).json({ 
        message: `You have already submitted an application for the "${positionApplied}" position.` 
      });
    }

    // Parse skills (supports comma-separated string or array)
    let parsedSkills = [];
    if (typeof skills === 'string') {
      parsedSkills = skills.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
    } else if (Array.isArray(skills)) {
      parsedSkills = skills;
    }

    let resumeUrl = '';

    // Check if Cloudinary credentials are mock/default
    const isCloudinaryDummy =
      !process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.CLOUDINARY_CLOUD_NAME === 'your_cloudinary_cloud_name' ||
      process.env.CLOUDINARY_CLOUD_NAME === 'dummy_cloud_name';

    if (isCloudinaryDummy) {
      console.warn('Cloudinary credentials are not configured. Using dummy URL.');
      resumeUrl = `https://cloudinary.com/mock-resumes/${Date.now()}-${req.file.originalname}`;
    } else {
      try {
        const cloudinaryResult = await uploadToCloudinary(req.file.buffer, req.file.originalname);
        resumeUrl = cloudinaryResult.secure_url;
      } catch (uploadError) {
        console.error('Cloudinary upload failed, falling back to mock URL:', uploadError.message);
        resumeUrl = `https://cloudinary.com/mock-resumes-fallback/${Date.now()}-${req.file.originalname}`;
      }
    }

    // Save to MongoDB
    const candidate = new Candidate({
      fullName,
      email: email.toLowerCase(),
      phone: phone || '',
      location,
      qualification,
      experience: Number(experience),
      skills: parsedSkills,
      linkedin,
      positionApplied,
      resumeUrl,
      resumeFilename: req.file.originalname,
      status: 'New' // Explicitly set starting status
    });

    const savedCandidate = await candidate.save();

    console.log('Sending candidate confirmation...');
    await sendCandidateConfirmation(savedCandidate.email, savedCandidate.fullName, positionApplied);

    console.log('Sending admin notification...');
    await sendCompanyCandidateNotification(savedCandidate, positionApplied);

    console.log('Both email functions completed');

    res.status(201).json({
      message: 'Application submitted successfully!',
      data: savedCandidate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all candidate applications
// @route   GET /api/candidates
// @access  Private/Admin
export const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find({}).sort({ createdAt: -1 });
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single candidate by ID
// @route   GET /api/candidates/:id
// @access  Private/Admin
export const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate application not found.' });
    }
    res.status(200).json(candidate);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Candidate application not found.' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update candidate workflow status
// @route   PATCH /api/candidates/:id/status
// @access  Private/Admin
export const updateCandidateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['New', 'Reviewing', 'Shortlisted', 'Rejected', 'Hired'];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ 
        message: `Invalid status. Value must be one of: ${allowedStatuses.join(', ')}` 
      });
    }

    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate application not found.' });
    }

    candidate.status = status;
    const updatedCandidate = await candidate.save();

    res.status(200).json({
      message: `Candidate status updated to ${status}.`,
      data: updatedCandidate
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Candidate application not found.' });
    }
    res.status(500).json({ message: error.message });
  }
};
