import express from 'express';
import jwt from 'jsonwebtoken';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const companyEmail = process.env.COMPANY_EMAIL || 'info@hirenest.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (email === companyEmail && password === adminPassword) {
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      email
    });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

// @desc    Verify admin session token
// @route   GET /api/admin/verify
// @access  Private/Admin
router.get('/verify', protect, (req, res) => {
  res.status(200).json({ success: true, email: req.adminEmail });
});

export default router;
