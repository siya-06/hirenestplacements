import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SkeletonJobDetails } from '../components/SkeletonLoaders';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        console.error('Error fetching job details:', err.message);
        setErrorMsg(err.response?.data?.message || 'Failed to load job details. The mandate might be filled or inactive.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [id]);

  useEffect(() => {
    if (job) {
      document.title = `${job.title} at ${job.company} | HIRENEST PLACEMENTS`;
      
      // Update SEO meta descriptions dynamically
      const descriptionMeta = document.querySelector('meta[name="description"]');
      if (descriptionMeta) {
        descriptionMeta.setAttribute('content', `Apply for ${job.title} at ${job.company} in ${job.location}. Requirements: ${job.experience} experience. Executive placements by HIRENEST.`);
      }
    }
  }, [job]);

  const handleApply = () => {
    if (job) {
      navigate('/submit-resume', { state: { jobTitle: job.title } });
    }
  };

  if (loading) {
    return <SkeletonJobDetails />;
  }

  if (errorMsg || !job) {
    return (
      <div className="max-w-container-max mx-auto py-20 px-8 text-center bg-background min-h-[500px] flex flex-col justify-center items-center">
        <span className="material-symbols-outlined text-6xl text-error mb-4">warning</span>
        <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Mandate Unavailable</h2>
        <p className="text-on-surface-variant font-body-lg max-w-md mb-8">{errorMsg || 'The specified job mandate could not be loaded.'}</p>
        <Link to="/jobs" className="px-8 py-3 rounded-full bg-primary text-on-primary font-bold transition-all hover:scale-105">
          Browse Open Positions
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Job Details Hero Header */}
      <section className="bg-primary-container text-on-primary py-16 px-8 relative overflow-hidden">
        <div className="max-w-container-max mx-auto relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link to="/jobs" className="text-on-primary-container hover:text-white font-bold flex items-center gap-1 text-sm">
              <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Openings
            </Link>
            <span className="text-on-primary-container">•</span>
            <span className="bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {job.experience} Experience Required
            </span>
          </div>
          
          <h1 className="font-display-hero text-display-hero mb-4 leading-tight">{job.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-on-primary-container text-sm font-label-md">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-base">corporate_fare</span>
              {job.company}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-base">location_on</span>
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-base">calendar_today</span>
              Posted on {new Date(job.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
      </section>

      {/* Main Grid */}
      <section className="py-section-padding px-8 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Details Block */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Overview / Description */}
            <div>
              <h3 className="font-headline-lg text-headline-sm text-primary border-b border-outline-variant pb-3 mb-4">
                Role Overview
              </h3>
              <p className="text-on-surface-variant font-body-lg leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Key Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div>
                <h3 className="font-headline-lg text-headline-sm text-primary border-b border-outline-variant pb-3 mb-4">
                  Profile Requirements
                </h3>
                <ul className="space-y-4">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex gap-3 text-on-surface-variant font-body-md leading-relaxed">
                      <span className="material-symbols-outlined text-secondary shrink-0 select-none">verified</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div>
                <h3 className="font-headline-lg text-headline-sm text-primary border-b border-outline-variant pb-3 mb-4">
                  Core Responsibilities
                </h3>
                <ul className="space-y-4">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="flex gap-3 text-on-surface-variant font-body-md leading-relaxed">
                      <span className="text-secondary font-bold shrink-0 select-none">❖</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div>
                <h3 className="font-headline-lg text-headline-sm text-primary border-b border-outline-variant pb-3 mb-4">
                  Consultancy & Client Benefits
                </h3>
                <ul className="space-y-4">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex gap-3 text-on-surface-variant font-body-md leading-relaxed">
                      <span className="material-symbols-outlined text-secondary shrink-0 select-none">card_giftcard</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Right Application Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-surface p-8 rounded-3xl border border-outline-variant shadow-[0px_4px_30px_rgba(0,0,0,0.03)] sticky top-28 space-y-6">
              <h4 className="font-headline-sm text-headline-sm text-primary">Interested in this position?</h4>
              
              <p className="text-on-surface-variant font-body-md leading-relaxed">
                Apply today. Our executive partners will review your profile and match your qualifications against this mandate.
              </p>

              <div className="border-t border-outline-variant pt-4 space-y-3">
                <div className="flex justify-between text-sm py-1">
                  <span className="text-on-surface-variant">Employment:</span>
                  <span className="font-semibold text-primary">Full-Time Placements</span>
                </div>
                <div className="flex justify-between text-sm py-1">
                  <span className="text-on-surface-variant">Location:</span>
                  <span className="font-semibold text-primary">{job.location.split(',')[0]}</span>
                </div>
                <div className="flex justify-between text-sm py-1">
                  <span className="text-on-surface-variant">Job ID:</span>
                  <span className="font-semibold text-primary">{job._id.substring(18).toUpperCase()}</span>
                </div>
              </div>

              <button 
                onClick={handleApply}
                className="w-full py-4 rounded-full bg-primary text-on-primary hover:bg-secondary font-bold text-base transition-all flex items-center justify-center gap-2"
              >
                Apply for Position <span className="material-symbols-outlined">north_east</span>
              </button>

              <p className="text-[#707974] text-xs text-center leading-relaxed">
                By clicking Apply, you agree to our privacy policy and terms. HIRENEST protects candidate confidentiality absolute.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default JobDetailsPage;
