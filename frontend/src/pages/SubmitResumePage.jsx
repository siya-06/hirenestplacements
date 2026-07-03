import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const SubmitResumePage = () => {
  const routerLocation = useLocation();
  const initialJobTitle = routerLocation.state?.jobTitle || '';

  // Form Fields State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    qualification: '',
    experience: '',
    skills: '',
    linkedin: '',
    positionApplied: initialJobTitle
  });
  
  const [file, setFile] = useState(null);
  
  // UI Status State
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    document.title = "Submit Profile & Resume | HireNest Placements";
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Submit your credentials and CV to HireNest Placements. Let our expert recruiters connect you with premium executive mandates.');
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear validation error when user types
    if (validationErrors[id]) {
      setValidationErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (!allowedTypes.includes(selectedFile.type)) {
      setErrorMsg('Invalid file format. Only PDF and Word (.doc, .docx) formats are permitted.');
      setFile(null);
      return;
    }

    // Validate size (5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrorMsg('File exceeds maximum size limits. Resume files must be under 5MB.');
      setFile(null);
      return;
    }

    setErrorMsg('');
    setFile(selectedFile);
  };

  // Perform client-side checks
  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required.';
    
    // Email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please provide a valid email address.';
    }

    // Phone check
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (formData.phone.length < 7) {
      errors.phone = 'Please provide a valid telephone number.';
    }

    if (!formData.location.trim()) errors.location = 'Current location details are required.';
    if (!formData.qualification.trim()) errors.qualification = 'Highest qualification is required.';
    
    if (!formData.experience) {
      errors.experience = 'Years of experience is required.';
    } else if (Number(formData.experience) < 0) {
      errors.experience = 'Experience cannot be a negative value.';
    }

    if (!formData.skills.trim()) errors.skills = 'Please list at least one core skill.';
    if (!formData.positionApplied.trim()) errors.positionApplied = 'Please enter the target position.';

    // LinkedIn URL format validation (optional)
    if (formData.linkedin && !formData.linkedin.startsWith('http://') && !formData.linkedin.startsWith('https://')) {
      errors.linkedin = 'URL must start with http:// or https://';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccess(false);

    if (!validateForm()) {
      window.scrollTo(0, 300);
      return;
    }

    if (!file) {
      setErrorMsg('Please select and upload your resume file (.pdf, .doc, .docx).');
      return;
    }

    setSubmitting(true);

    const submissionData = new FormData();
    submissionData.append('fullName', formData.fullName.trim());
    submissionData.append('email', formData.email.trim());
    submissionData.append('phone', formData.phone.trim());
    submissionData.append('location', formData.location.trim());
    submissionData.append('qualification', formData.qualification.trim());
    submissionData.append('experience', formData.experience);
    submissionData.append('skills', formData.skills.trim());
    submissionData.append('linkedin', formData.linkedin.trim());
    submissionData.append('positionApplied', formData.positionApplied.trim());
    submissionData.append('resume', file); // key name expected by backend multer: 'resume'

    try {
      const response = await axios.post(`${BACKEND_URL}/candidates`, submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccess(true);
      // Reset form fields
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        qualification: '',
        experience: '',
        skills: '',
        linkedin: '',
        positionApplied: ''
      });
      setFile(null);
      window.scrollTo(0, 300);
    } catch (err) {
      console.error('Submission failed:', err);
      setErrorMsg(err.response?.data?.message || 'Failed to submit profile. Please verify connection and parameters.');
      window.scrollTo(0, 300);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Banner Banner */}
      <section className="bg-primary-container text-on-primary py-16 px-8 text-center relative overflow-hidden">
        <div className="max-w-container-max mx-auto relative z-10">
          <div className="font-indicator text-indicator uppercase tracking-widest mb-4 opacity-80 flex justify-center items-center">
            <span className="mr-2">❖</span> Career Development
          </div>
          <h1 className="font-display-hero text-display-hero mb-6">Submit Your Resume</h1>
          <p className="font-body-lg text-on-primary-container max-w-2xl mx-auto">
            Take your next major career step. Submit your credentials to match with premium C-level, tech lead, and operations roles.
          </p>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
      </section>

      {/* Form Form */}
      <section className="py-12 px-8 max-w-3xl mx-auto">
        <div className="bg-surface p-8 lg:p-12 rounded-3xl border border-outline-variant shadow-[0px_4px_30px_rgba(0,0,0,0.03)]">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-8 text-center">Candidate Application</h2>

          {success && (
            <div className="mb-8 p-6 bg-secondary-container text-on-secondary-container rounded-2xl flex items-start gap-4 border border-secondary/20 animate-fadeIn">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
              <div>
                <h4 className="font-bold font-headline-sm">Application Sent!</h4>
                <p className="font-body-md mt-1">Our executive recruiting partners will review your resume against matching active mandates. We will reach out shortly.</p>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="mb-8 p-6 bg-error-container text-on-error-container rounded-2xl flex items-start gap-4 border border-error/20 animate-fadeIn">
              <span className="material-symbols-outlined text-3xl">error</span>
              <div>
                <h4 className="font-bold font-headline-sm">Submission Error</h4>
                <p className="font-body-md mt-1">{errorMsg}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Grid 1: Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-on-surface-variant font-label-md mb-2">Full Name *</label>
                <input 
                  type="text" 
                  id="fullName" 
                  className={`w-full bg-surface-container border ${validationErrors.fullName ? 'border-error' : 'border-outline-variant'} rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm`}
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {validationErrors.fullName && <p className="text-error text-xs mt-1.5 font-medium">{validationErrors.fullName}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-on-surface-variant font-label-md mb-2">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  className={`w-full bg-surface-container border ${validationErrors.email ? 'border-error' : 'border-outline-variant'} rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm`}
                  placeholder="e.g. sarah.j@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {validationErrors.email && <p className="text-error text-xs mt-1.5 font-medium">{validationErrors.email}</p>}
              </div>
            </div>

            {/* Grid 2: Contacts & Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-on-surface-variant font-label-md mb-2">Phone Number *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className={`w-full bg-surface-container border ${validationErrors.phone ? 'border-error' : 'border-outline-variant'} rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm`}
                  placeholder="e.g. +44 20 7946 0123"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {validationErrors.phone && <p className="text-error text-xs mt-1.5 font-medium">{validationErrors.phone}</p>}
              </div>
              
              <div>
                <label htmlFor="location" className="block text-on-surface-variant font-label-md mb-2">Current Location *</label>
                <input 
                  type="text" 
                  id="location" 
                  className={`w-full bg-surface-container border ${validationErrors.location ? 'border-error' : 'border-outline-variant'} rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm`}
                  placeholder="e.g. London, UK"
                  value={formData.location}
                  onChange={handleChange}
                />
                {validationErrors.location && <p className="text-error text-xs mt-1.5 font-medium">{validationErrors.location}</p>}
              </div>
            </div>

            {/* Grid 3: Experience & Degree */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="qualification" className="block text-on-surface-variant font-label-md mb-2">Highest Qualification *</label>
                <input 
                  type="text" 
                  id="qualification" 
                  className={`w-full bg-surface-container border ${validationErrors.qualification ? 'border-error' : 'border-outline-variant'} rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm`}
                  placeholder="e.g. M.Sc. in Computer Science"
                  value={formData.qualification}
                  onChange={handleChange}
                />
                {validationErrors.qualification && <p className="text-error text-xs mt-1.5 font-medium">{validationErrors.qualification}</p>}
              </div>
              
              <div>
                <label htmlFor="experience" className="block text-on-surface-variant font-label-md mb-2">Years of Experience *</label>
                <input 
                  type="number" 
                  id="experience" 
                  min="0"
                  className={`w-full bg-surface-container border ${validationErrors.experience ? 'border-error' : 'border-outline-variant'} rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm`}
                  placeholder="e.g. 8"
                  value={formData.experience}
                  onChange={handleChange}
                />
                {validationErrors.experience && <p className="text-error text-xs mt-1.5 font-medium">{validationErrors.experience}</p>}
              </div>
            </div>

            {/* Field: Position Applied */}
            <div>
              <label htmlFor="positionApplied" className="block text-on-surface-variant font-label-md mb-2">Position Applied For *</label>
              <input 
                type="text" 
                id="positionApplied" 
                className={`w-full bg-surface-container border ${validationErrors.positionApplied ? 'border-error' : 'border-outline-variant'} rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm ${initialJobTitle ? 'font-semibold text-primary' : ''}`}
                placeholder="e.g. Senior Software Architect"
                value={formData.positionApplied}
                onChange={handleChange}
                readOnly={!!initialJobTitle}
              />
              {validationErrors.positionApplied && <p className="text-error text-xs mt-1.5 font-medium">{validationErrors.positionApplied}</p>}
              {initialJobTitle && <p className="text-on-surface-variant text-[11px] mt-1">This field is pre-filled from your selected job details page.</p>}
            </div>

            {/* Form Fields: Skills & Socials */}
            <div>
              <label htmlFor="skills" className="block text-on-surface-variant font-label-md mb-2">Core Skills * (comma separated)</label>
              <input 
                type="text" 
                id="skills" 
                className={`w-full bg-surface-container border ${validationErrors.skills ? 'border-error' : 'border-outline-variant'} rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm`}
                placeholder="e.g. JavaScript, AWS, System Architecture, Team Leadership"
                value={formData.skills}
                onChange={handleChange}
              />
              {validationErrors.skills && <p className="text-error text-xs mt-1.5 font-medium">{validationErrors.skills}</p>}
            </div>

            <div>
              <label htmlFor="linkedin" className="block text-on-surface-variant font-label-md mb-2">LinkedIn URL (optional)</label>
              <input 
                type="url" 
                id="linkedin" 
                className={`w-full bg-surface-container border ${validationErrors.linkedin ? 'border-error' : 'border-outline-variant'} rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm`}
                placeholder="e.g. https://linkedin.com/in/sarah-jenkins"
                value={formData.linkedin}
                onChange={handleChange}
              />
              {validationErrors.linkedin && <p className="text-error text-xs mt-1.5 font-medium">{validationErrors.linkedin}</p>}
            </div>

            {/* Resume Upload File Selector */}
            <div>
              <label htmlFor="resume" className="block text-on-surface-variant font-label-md mb-2">Upload Resume * (.pdf, .doc, .docx - Max 5MB)</label>
              <div className="border-2 border-dashed border-outline-variant hover:border-secondary transition-colors rounded-2xl p-6 text-center cursor-pointer relative bg-surface-container">
                <input 
                  type="file" 
                  id="resume" 
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2 font-light">cloud_upload</span>
                {file ? (
                  <div>
                    <p className="text-secondary font-bold text-sm">{file.name}</p>
                    <p className="text-on-surface-variant text-xs mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-on-surface-variant font-bold text-sm">Click to choose or drag & drop file here</p>
                    <p className="text-[#707974] text-xs mt-1">PDF, DOC, or DOCX formats accepted</p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={submitting}
              className={`w-full py-4 rounded-full bg-primary text-on-primary font-bold text-base transition-all hover:brightness-105 active:scale-95 flex items-center justify-center gap-2 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {submitting ? (
                <>
                  <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
                  Uploading Profile...
                </>
              ) : (
                'Submit Application'
              )}
            </button>

          </form>
        </div>
      </section>
    </div>
  );
};

export default SubmitResumePage;
