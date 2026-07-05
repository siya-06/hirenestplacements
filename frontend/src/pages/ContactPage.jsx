import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const COMPANY_EMAIL = import.meta.env.VITE_COMPANY_EMAIL || 'info@hirenestplacement.com';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    document.title = "Contact Us & Business Inquiries | HireNest Placements";
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Get in touch with the team at HireNest Placements. Reach our business consultants by phone, email, or contact form.');
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    if (validationErrors[id]) {
      setValidationErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Please provide your name.';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = 'Please provide your email address.';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Please specify a subject.';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please write a brief message.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message content is too short (minimum 10 characters).';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      await axios.post(`${BACKEND_URL}/contact`, formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Failed to submit contact message. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Banner */}
      <section className="bg-primary-container text-on-primary py-16 px-8 text-center relative overflow-hidden">
        <div className="max-w-container-max mx-auto relative z-10">
          <div className="font-indicator text-indicator uppercase tracking-widest mb-4 opacity-80 flex justify-center items-center">
            <span className="mr-2">❖</span> Support Center
          </div>
          <h1 className="font-display-hero text-display-hero mb-6">Contact Our Team</h1>
          <p className="font-body-lg text-on-primary-container max-w-2xl mx-auto">
            Get in touch with our specialist recruiting consultants in Lucknow or Ahmedabad. We look forward to partnering with you.
          </p>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
      </section>

      {/* Main Grid */}
      <section className="py-section-padding px-8 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left Column: Office info */}
          <div className="space-y-12">
            <div>
              <div className="font-indicator text-indicator text-secondary uppercase mb-4 tracking-wider">❖ Find Us</div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Our Offices</h2>
              <p className="text-on-surface-variant font-body-md leading-relaxed">
                HireNest Placements coordinates executive recruitment campaigns from our offices in Uttar Pradesh and Gujarat.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center text-primary shrink-0 font-medium">
                  <span className="material-symbols-outlined text-[24px]">location_on</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-primary mb-2">Lucknow Office</h4>
                  <p className="text-on-surface-variant font-body-md leading-relaxed">
                    Hazratganj, Lucknow,<br />
                    Uttar Pradesh, India
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center text-primary shrink-0 font-medium">
                  <span className="material-symbols-outlined text-[24px]">location_on</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-primary mb-2">Ahmedabad Office</h4>
                  <p className="text-on-surface-variant font-body-md leading-relaxed">
                    CG Road, Ahmedabad,<br />
                    Gujarat, India
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center text-primary shrink-0 font-medium">
                  <span className="material-symbols-outlined text-[24px]">alternate_email</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-primary mb-2">Business Inquiries</h4>
                  <a className="text-secondary font-bold underline underline-offset-4 font-body-md" href={`mailto:${COMPANY_EMAIL}`}>
                    {COMPANY_EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form card */}
          <div className="bg-surface p-8 lg:p-12 rounded-3xl border border-outline-variant shadow-[0px_4px_30px_rgba(0,0,0,0.03)] h-fit">
            <h3 className="font-headline-sm text-headline-sm text-primary mb-6">Send a Message</h3>
            
            {success && (
              <div className="mb-6 p-4 bg-secondary-container text-on-secondary-container rounded-xl flex items-start gap-3 border border-secondary/20">
                <span className="material-symbols-outlined text-2xl">check_circle</span>
                <p className="text-sm font-label-md">Thank you! Your message was submitted successfully.</p>
              </div>
            )}

            {errorMsg && (
              <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-xl flex items-start gap-3 border border-error/20">
                <span className="material-symbols-outlined text-2xl">error</span>
                <p className="text-sm font-label-md">{errorMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-on-surface-variant font-label-md mb-2">Your Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  className={`w-full bg-surface-container border ${validationErrors.name ? 'border-error' : 'border-outline-variant'} rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm`}
                  placeholder="e.g. Marcus Thorne"
                  value={formData.name}
                  onChange={handleChange}
                />
                {validationErrors.name && <p className="text-error text-xs mt-1.5 font-medium">{validationErrors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-on-surface-variant font-label-md mb-2">Your Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  className={`w-full bg-surface-container border ${validationErrors.email ? 'border-error' : 'border-outline-variant'} rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm`}
                  placeholder="e.g. marcus.t@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {validationErrors.email && <p className="text-error text-xs mt-1.5 font-medium">{validationErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-on-surface-variant font-label-md mb-2">Subject *</label>
                <input 
                  type="text" 
                  id="subject" 
                  className={`w-full bg-surface-container border ${validationErrors.subject ? 'border-error' : 'border-outline-variant'} rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm`}
                  placeholder="e.g. Recruiting Partnership Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                />
                {validationErrors.subject && <p className="text-error text-xs mt-1.5 font-medium">{validationErrors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-on-surface-variant font-label-md mb-2">Message * (minimum 10 chars)</label>
                <textarea 
                  id="message" 
                  rows="5"
                  className={`w-full bg-surface-container border ${validationErrors.message ? 'border-error' : 'border-outline-variant'} rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm`}
                  placeholder="Describe your inquiry or requirement..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {validationErrors.message && <p className="text-error text-xs mt-1.5 font-medium">{validationErrors.message}</p>}
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className={`w-full py-3.5 rounded-full bg-primary text-on-primary font-bold text-sm transition-all hover:brightness-105 active:scale-95 flex items-center justify-center gap-2 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {submitting ? (
                  <>
                    <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                    Sending Message...
                  </>
                ) : (
                  'Send Inquiry'
                )}
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ContactPage;
