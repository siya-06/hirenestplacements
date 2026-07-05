import nodemailer from 'nodemailer';
import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');

// Check if SMTP environment variables are configured
const isSmtpConfigured = () => {
  return (
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.SMTP_USER !== 'your_smtp_user' &&
    process.env.SMTP_USER !== 'dummy_user'
  );
};

// Create Nodemailer Transporter
const getTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465', // true for SSL port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    family: 4,
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
  });
};

// Main generic email sending routine
export const sendEmail = async ({ to, subject, html, text }) => {
  if (!isSmtpConfigured()) {
    console.log('\n==================================================');
    console.log(`[MOCK EMAIL NOTIFICATION LOG]`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body (Text):\n${text}`);
    console.log('==================================================\n');
    return { mock: true };
  }

  try {
    console.log('====================================');
    console.log('SMTP SEND ATTEMPT');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Host:', process.env.SMTP_HOST);
    console.log('Port:', process.env.SMTP_PORT);
    console.log('User:', process.env.SMTP_USER);
    console.log('====================================');

    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from: `"HireNest Placements" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log('EMAIL SENT SUCCESSFULLY');
    console.log('Message ID:', info.messageId);
    console.log('Accepted:', info.accepted);
    console.log('Rejected:', info.rejected);

    return info;
  } catch (error) {
    console.error('EMAIL SEND FAILED');
    console.error(error);
    // We return the error rather than throwing to avoid blocking form submissions
    return { error: error.message };
  }
};

// @desc Send confirmation notification to applicant candidate
export const sendCandidateConfirmation = async (candidateEmail, candidateName, positionApplied) => {
  console.log(`[sendCandidateConfirmation] Recipient Email: ${candidateEmail}`);
  const subject = `Application Received - ${positionApplied} - HireNest Placements`;
  const text = `Dear ${candidateName},\n\nThank you for submitting your resume for the "${positionApplied}" role at HireNest Placements. Our executive consultancy team will review your profile against the position mandates.\n\nWe will reach out to you directly if there is a match.\n\nBest regards,\nHireNest Placements Team`;
  const html = `
    <p>Dear <strong>${candidateName}</strong>,</p>
    <p>Thank you for submitting your resume for the "<strong>${positionApplied}</strong>" role at HireNest Placements.</p>
    <p>Our executive consultancy team will review your credentials against the position mandates. We will reach out to you directly if there is a match with this or other mandates.</p>
    <br/>
    <p>Best regards,<br/>
    <strong>HireNest Placements Team</strong></p>
  `;
  return sendEmail({ to: candidateEmail, subject, text, html });
};

// @desc Send new candidate notification alert to the company inbox
export const sendCompanyCandidateNotification = async (candidate, positionApplied) => {
  const companyEmail = process.env.COMPANY_EMAIL || 'info@hirenestplacement.com';
  console.log(`[sendCompanyCandidateNotification] Recipient Email: ${companyEmail}`);
  const subject = `New Candidate Application - ${positionApplied}`;
  const text = `A new resume application has been submitted:\n\nCandidate Name: ${candidate.fullName}\nEmail Address: ${candidate.email}\nPosition Applied: ${positionApplied}\nLocation: ${candidate.location}\nYears of Experience: ${candidate.experience}\nHighest Qualification: ${candidate.qualification}\nSkills: ${candidate.skills.join(', ')}\nLinkedIn: ${candidate.linkedin || 'N/A'}\nResume Download URL: ${candidate.resumeUrl}`;
  const html = `
    <h2>New Candidate Application Submitted</h2>
    <p><strong>Candidate Name:</strong> ${candidate.fullName}</p>
    <p><strong>Email Address:</strong> ${candidate.email}</p>
    <p><strong>Position Applied:</strong> ${positionApplied}</p>
    <p><strong>Location:</strong> ${candidate.location}</p>
    <p><strong>Years of Experience:</strong> ${candidate.experience}</p>
    <p><strong>Highest Qualification:</strong> ${candidate.qualification}</p>
    <p><strong>Skills:</strong> ${candidate.skills.join(', ')}</p>
    <p><strong>LinkedIn Profile:</strong> <a href="${candidate.linkedin}" target="_blank">${candidate.linkedin || 'N/A'}</a></p>
    <p><strong>Resume Attachment:</strong> <a href="${candidate.resumeUrl}" target="_blank">Download/View Resume File</a></p>
  `;
  return sendEmail({ to: companyEmail, subject, text, html });
};

// @desc Send contact form inquiry alert to the company inbox
export const sendCompanyContactNotification = async (contact) => {
  const companyEmail = process.env.COMPANY_EMAIL || 'info@hirenestplacement.com';
  console.log(`[sendCompanyContactNotification] Recipient Email: ${companyEmail}`);
  const subject = 'New Contact Inquiry - HireNest Placements';
  const text = `A new contact message has been submitted:\n\nSender Name: ${contact.name}\nEmail Address: ${contact.email}\nSubject: ${contact.subject}\nMessage Content:\n${contact.message}`;
  const html = `
    <h2>New Contact Inquiry Submitted</h2>
    <p><strong>Sender Name:</strong> ${contact.name}</p>
    <p><strong>Email Address:</strong> ${contact.email}</p>
    <p><strong>Subject:</strong> ${contact.subject}</p>
    <p><strong>Message Content:</strong></p>
    <blockquote style="border-left: 4px solid #003527; padding-left: 12px; margin-left: 0; font-style: italic;">
      ${contact.message}
    </blockquote>
  `;
  return sendEmail({ to: companyEmail, subject, text, html });
};
