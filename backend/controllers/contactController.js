import Contact from '../models/Contact.js';
import { sendCompanyContactNotification } from '../utils/emailService.js';

// @desc    Submit a contact inquiry
// @route   POST /api/contact
// @access  Public
export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please provide all required fields: name, email, subject, message.' });
    }

    const contact = new Contact({ name, email, subject, message });
    const savedContact = await contact.save();

    // Send notifications (asynchronously, non-blocking)
    sendCompanyContactNotification(savedContact);

    res.status(201).json({
      message: 'Thank you! Your message has been received.',
      data: savedContact
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all contact inquiries
// @route   GET /api/contacts
// @access  Private/Admin
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
