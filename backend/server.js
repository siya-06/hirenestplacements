import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import jobRoutes from './routes/jobRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

import nodemailer from 'nodemailer';
import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');

// Load environmental variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Endpoints
app.use('/api/admin', adminRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/contacts', contactRoutes);

// Temporary Email Diagnostics Route
app.get('/api/test-email', async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify();

    const companyEmail = process.env.COMPANY_EMAIL || 'info@hirenestplacement.com';
    const info = await transporter.sendMail({
      from: `"HireNest Diagnostics" <${process.env.SMTP_USER}>`,
      to: companyEmail,
      subject: 'HireNest Placements SMTP Test Email',
      text: 'This is a real diagnostics test email sent to verify SMTP setup.',
      html: '<p>This is a real diagnostics test email sent to verify SMTP setup.</p>',
    });

    console.log('Test Email Send Results:', {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
    });

    res.status(200).json({
      success: true,
      message: 'SMTP connection verified and test email sent successfully.',
      details: {
        messageId: info.messageId,
        accepted: info.accepted,
        rejected: info.rejected,
      }
    });
  } catch (error) {
    console.error('SMTP diagnostics failed:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Root Check Endpoint
app.get('/', (req, res) => {
  res.send('HireNest Placements API service is active.');
});

// Generic 404 handler for API routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found.' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('API Error:', err.message);
  res.status(err.status || 500).json({
    message: err.message || 'An internal server error occurred.'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in development mode`);
});
