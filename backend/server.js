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

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT} in development mode`);
  
  if (process.env.SMTP_HOST) {
    try {
      const dnsLookup = await dns.promises.lookup(process.env.SMTP_HOST);
      console.log('==================================================');
      console.log('SMTP HOST RESOLUTION AT STARTUP:');
      console.log(`Host: ${process.env.SMTP_HOST}`);
      console.log(`Resolved IP: ${dnsLookup.address}`);
      console.log(`Address Family: IPv${dnsLookup.family}`);
      console.log('==================================================');
    } catch (err) {
      console.error('Failed to resolve SMTP host at startup:', err.message);
    }
  }
});
