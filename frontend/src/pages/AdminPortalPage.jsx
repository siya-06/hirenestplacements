import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminPortalPage = () => {
  const [activeTab, setActiveTab] = useState('candidates'); // candidates, jobs, inquiries
  
  // Data States
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  
  // Loading & Error States
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // Search & Filter States
  const [candidateSearch, setCandidateSearch] = useState('');
  const [candidateFilter, setCandidateFilter] = useState(''); // New, Reviewing, Shortlisted, Rejected, Hired
  
  // Modal & Selection States
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null); // null if creating
  
  // Job Form State
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    location: '',
    experience: '',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: ''
  });

  // Fetch data helpers
  const fetchCandidates = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/candidates`);
      setCandidates(res.data);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load candidate applications.');
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/jobs?all=true`);
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load job postings.');
    }
  };

  const fetchInquiries = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/contacts`);
      setInquiries(res.data);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load contact inquiries.');
    }
  };

  const loadData = async () => {
    setLoading(true);
    setErrorMsg('');
    setActionSuccess('');
    
    if (activeTab === 'candidates') {
      await fetchCandidates();
    } else if (activeTab === 'jobs') {
      await fetchJobs();
    } else if (activeTab === 'inquiries') {
      await fetchInquiries();
    }
    setLoading(false);
  };

  useEffect(() => {
    document.title = "Internal Admin Dashboard | HireNest Placements";
    loadData();
  }, [activeTab]);

  // Handle Candidate Status Patch
  const handleStatusChange = async (candidateId, newStatus) => {
    try {
      setErrorMsg('');
      setActionSuccess('');
      const res = await axios.patch(`${BACKEND_URL}/candidates/${candidateId}/status`, { status: newStatus });
      setActionSuccess(`Candidate status updated to "${newStatus}" successfully.`);
      
      // Update local state
      setCandidates(prev => prev.map(c => c._id === candidateId ? { ...c, status: newStatus } : c));
      if (selectedCandidate && selectedCandidate._id === candidateId) {
        setSelectedCandidate(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Failed to update candidate status.');
    }
  };

  // Handle Job Form Inputs
  const handleJobFormChange = (e) => {
    setJobForm({
      ...jobForm,
      [e.target.id]: e.target.value
    });
  };

  // Open Job Modal for Create
  const openCreateJobModal = () => {
    setEditingJob(null);
    setJobForm({
      title: '',
      company: '',
      location: '',
      experience: '',
      description: '',
      requirements: '',
      responsibilities: '',
      benefits: ''
    });
    setJobModalOpen(true);
  };

  // Open Job Modal for Edit
  const openEditJobModal = (job) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      company: job.company,
      location: job.location,
      experience: job.experience,
      description: job.description,
      requirements: Array.isArray(job.requirements) ? job.requirements.join(', ') : '',
      responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join(', ') : '',
      benefits: Array.isArray(job.benefits) ? job.benefits.join(', ') : ''
    });
    setJobModalOpen(true);
  };

  // Handle Job Form Submission
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setActionSuccess('');
    
    try {
      if (editingJob) {
        // Edit API call
        const res = await axios.put(`${BACKEND_URL}/jobs/${editingJob._id}`, jobForm);
        setActionSuccess(`Job "${jobForm.title}" updated successfully.`);
      } else {
        // Create API call
        const res = await axios.post(`${BACKEND_URL}/jobs`, jobForm);
        setActionSuccess(`Job "${jobForm.title}" created successfully.`);
      }
      
      setJobModalOpen(false);
      fetchJobs(); // refresh
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Failed to submit job details.');
    }
  };

  // Handle Toggle Active/Disable for Jobs
  const handleToggleJobActive = async (job) => {
    try {
      setErrorMsg('');
      setActionSuccess('');
      const updatedActiveState = !job.active;
      
      const res = await axios.put(`${BACKEND_URL}/jobs/${job._id}`, { active: updatedActiveState });
      
      setActionSuccess(`Job "${job.title}" has been ${updatedActiveState ? 'enabled' : 'disabled'} successfully.`);
      
      // Update local state
      setJobs(prev => prev.map(j => j._id === job._id ? { ...j, active: updatedActiveState } : j));
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to toggle job active status.');
    }
  };

  // Candidate Filters
  const filteredCandidates = candidates.filter(cand => {
    const searchLower = candidateSearch.toLowerCase();
    const matchesSearch = 
      cand.fullName.toLowerCase().includes(searchLower) ||
      cand.email.toLowerCase().includes(searchLower) ||
      cand.positionApplied.toLowerCase().includes(searchLower);
      
    const matchesStatus = candidateFilter === '' || cand.status === candidateFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-background min-h-screen">
      
      {/* Top Banner Header */}
      <section className="bg-primary-container text-on-primary py-10 px-8 relative overflow-hidden">
        <div className="max-w-container-max mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="font-indicator text-indicator uppercase tracking-widest mb-2 opacity-80 flex items-center">
              <span className="mr-2">❖</span> Executive Console
            </div>
            <h1 className="font-display-hero text-[32px] font-bold">Admin Management Portal</h1>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={loadData}
              className="px-5 py-2.5 bg-secondary-container text-on-secondary-container hover:brightness-105 font-bold font-label-md rounded-full flex items-center gap-1.5 transition-all"
            >
              <span className="material-symbols-outlined text-sm">refresh</span> Refresh List
            </button>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
      </section>

      {/* Tabs Navigation Selector */}
      <section className="border-b border-outline-variant bg-surface sticky top-20 z-40">
        <div className="max-w-container-max mx-auto px-8 flex">
          <button 
            onClick={() => setActiveTab('candidates')}
            className={`px-8 py-5 font-label-md font-semibold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'candidates' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-primary'}`}
          >
            <span className="material-symbols-outlined text-base">groups</span> Candidates ({candidates.length})
          </button>
          <button 
            onClick={() => setActiveTab('jobs')}
            className={`px-8 py-5 font-label-md font-semibold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'jobs' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-primary'}`}
          >
            <span className="material-symbols-outlined text-base">work_history</span> Job Postings ({jobs.length})
          </button>
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`px-8 py-5 font-label-md font-semibold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'inquiries' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-primary'}`}
          >
            <span className="material-symbols-outlined text-base">alternate_email</span> Inquiries ({inquiries.length})
          </button>
        </div>
      </section>

      {/* Alert Notices */}
      <section className="max-w-container-max mx-auto px-8 pt-6">
        {actionSuccess && (
          <div className="p-4 bg-secondary-container text-on-secondary-container border border-secondary/20 rounded-xl flex items-center gap-2 mb-4 animate-fadeIn">
            <span className="material-symbols-outlined">check_circle</span>
            <span className="text-sm font-label-md">{actionSuccess}</span>
          </div>
        )}
        {errorMsg && (
          <div className="p-4 bg-error-container text-on-error-container border border-error/20 rounded-xl flex items-center gap-2 mb-4 animate-fadeIn">
            <span className="material-symbols-outlined">error</span>
            <span className="text-sm font-label-md">{errorMsg}</span>
          </div>
        )}
      </section>

      {/* Main Tab Contents Panel */}
      <main className="max-w-container-max mx-auto px-8 py-6 pb-20">
        
        {loading ? (
          <div className="flex justify-center items-center py-24 bg-surface border border-outline-variant rounded-2xl">
            <div className="text-center">
              <span className="material-symbols-outlined text-4xl text-primary animate-spin mb-3">progress_activity</span>
              <p className="text-on-surface-variant font-label-md">Loading registry...</p>
            </div>
          </div>
        ) : (
          <div>
            
            {/* TABS 1: CANDIDATES */}
            {activeTab === 'candidates' && (
              <div className="space-y-6">
                
                {/* Search & Filter bar */}
                <div className="flex flex-col md:flex-row gap-4 bg-surface p-4 rounded-2xl border border-outline-variant">
                  <div className="relative flex-grow">
                    <input 
                      type="text" 
                      placeholder="Search candidate name, email, or role..." 
                      className="w-full pl-10 pr-4 py-2.5 bg-surface-container border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm"
                      value={candidateSearch}
                      onChange={(e) => setCandidateSearch(e.target.value)}
                    />
                    <span className="material-symbols-outlined absolute left-3 top-3 text-on-surface-variant text-base">search</span>
                  </div>
                  <div className="w-full md:w-56">
                    <select
                      className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2.5 text-on-surface focus:outline-none focus:border-secondary text-sm"
                      value={candidateFilter}
                      onChange={(e) => setCandidateFilter(e.target.value)}
                    >
                      <option value="">All Statuses</option>
                      <option value="New">New</option>
                      <option value="Reviewing">Reviewing</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Hired">Hired</option>
                    </select>
                  </div>
                </div>

                {/* Candidates Table Grid */}
                {filteredCandidates.length === 0 ? (
                  <div className="bg-surface p-12 rounded-2xl border border-outline-variant text-center">
                    <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">face</span>
                    <p className="text-on-surface-variant font-body-lg">No matching candidate applications found.</p>
                  </div>
                ) : (
                  <div className="bg-surface rounded-2xl border border-outline-variant overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="bg-surface-container border-b border-outline-variant text-on-surface-variant font-label-md">
                            <th className="p-4 font-semibold">Candidate Name</th>
                            <th className="p-4 font-semibold">Target position</th>
                            <th className="p-4 font-semibold">Experience</th>
                            <th className="p-4 font-semibold">Submitted Date</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredCandidates.map((cand) => (
                            <tr key={cand._id} className="border-b border-outline-variant hover:bg-surface-container-low transition-all">
                              <td className="p-4">
                                <div className="font-semibold text-primary">{cand.fullName}</div>
                                <div className="text-xs text-on-surface-variant">{cand.email}</div>
                              </td>
                              <td className="p-4 font-medium text-on-surface">{cand.positionApplied}</td>
                              <td className="p-4 text-on-surface-variant">{cand.experience} Years</td>
                              <td className="p-4 text-on-surface-variant">{new Date(cand.createdAt).toLocaleDateString()}</td>
                              <td className="p-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                                  cand.status === 'New' ? 'bg-primary-fixed text-on-primary-fixed' :
                                  cand.status === 'Reviewing' ? 'bg-tertiary-fixed text-on-tertiary-fixed' :
                                  cand.status === 'Shortlisted' ? 'bg-secondary-fixed text-on-secondary-fixed' :
                                  cand.status === 'Rejected' ? 'bg-error-container text-on-error-container' :
                                  'bg-emerald-600 text-white'
                                }`}>
                                  {cand.status}
                                </span>
                              </td>
                              <td className="p-4 text-center">
                                <button 
                                  onClick={() => setSelectedCandidate(cand)}
                                  className="px-4 py-1.5 border border-primary text-primary hover:bg-primary-fixed-dim text-xs font-bold rounded-full transition-all"
                                >
                                  Open Profile
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TABS 2: JOB POSTINGS */}
            {activeTab === 'jobs' && (
              <div className="space-y-6">
                
                {/* Header operations bar */}
                <div className="flex justify-between items-center">
                  <h3 className="font-headline-sm text-headline-sm text-primary">Job Mandates Registry</h3>
                  <button 
                    onClick={openCreateJobModal}
                    className="px-6 py-2.5 bg-primary text-on-primary hover:bg-secondary font-bold font-label-md rounded-full flex items-center gap-1.5 transition-all"
                  >
                    <span className="material-symbols-outlined text-base">add</span> Create Posting
                  </button>
                </div>

                {/* Postings Listings Grid */}
                {jobs.length === 0 ? (
                  <div className="bg-surface p-12 rounded-2xl border border-outline-variant text-center">
                    <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">work</span>
                    <p className="text-on-surface-variant font-body-lg">No job postings recorded in database.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {jobs.map((job) => (
                      <div 
                        key={job._id}
                        className={`p-6 rounded-2xl border bg-surface flex flex-col justify-between gap-6 transition-all ${job.active ? 'border-outline-variant' : 'border-outline opacity-60 bg-surface-container-low'}`}
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-start gap-4">
                            <h4 className="font-headline-sm text-headline-sm text-primary font-bold">{job.title}</h4>
                            <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider shrink-0 ${
                              job.active ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-surface-variant text-on-surface-variant'
                            }`}>
                              {job.active ? 'Active' : 'Disabled'}
                            </span>
                          </div>
                          <div className="text-sm font-semibold text-secondary">{job.company} • {job.location}</div>
                          <p className="text-sm text-on-surface-variant line-clamp-3">{job.description}</p>
                        </div>

                        <div className="flex justify-between items-center border-t border-outline-variant pt-4">
                          <span className="text-xs text-[#707974]">Exp: {job.experience}</span>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => openEditJobModal(job)}
                              className="px-3.5 py-1.5 border border-primary text-primary hover:bg-primary-fixed-dim text-xs font-bold rounded-full transition-all"
                            >
                              Edit Details
                            </button>
                            <button 
                              onClick={() => handleToggleJobActive(job)}
                              className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all ${
                                job.active 
                                  ? 'border border-error text-error hover:bg-error-container'
                                  : 'bg-primary text-on-primary hover:bg-secondary'
                              }`}
                            >
                              {job.active ? 'Disable' : 'Enable'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TABS 3: INQUIRIES */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                {inquiries.length === 0 ? (
                  <div className="bg-surface p-12 rounded-2xl border border-outline-variant text-center">
                    <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">mail</span>
                    <p className="text-on-surface-variant font-body-lg">No contact inquiries recorded in database.</p>
                  </div>
                ) : (
                  <div className="bg-surface rounded-2xl border border-outline-variant overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="bg-surface-container border-b border-outline-variant text-on-surface-variant font-label-md">
                            <th className="p-4 font-semibold">Sender Details</th>
                            <th className="p-4 font-semibold">Subject</th>
                            <th className="p-4 font-semibold">Inquiry Message</th>
                            <th className="p-4 font-semibold">Received Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inquiries.map((inq) => (
                            <tr key={inq._id} className="border-b border-outline-variant hover:bg-surface-container-low transition-all">
                              <td className="p-4 w-56">
                                <div className="font-semibold text-primary">{inq.name}</div>
                                <div className="text-xs text-on-surface-variant">{inq.email}</div>
                              </td>
                              <td className="p-4 font-medium text-on-surface w-64">{inq.subject}</td>
                              <td className="p-4 text-on-surface-variant whitespace-pre-line max-w-lg leading-relaxed">{inq.message}</td>
                              <td className="p-4 text-on-surface-variant w-36">{new Date(inq.createdAt).toLocaleDateString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        )}
      </main>

      {/* MODAL 1: CANDIDATE DRAWER / DETAILS MODAL */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
          <div className="bg-surface w-full max-w-2xl rounded-3xl border border-outline-variant overflow-hidden shadow-2xl animate-scaleUp max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-primary-container text-on-primary p-6 flex justify-between items-center shrink-0">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-white font-bold">{selectedCandidate.fullName}</h3>
                <p className="text-xs text-on-primary-container">Target Position: {selectedCandidate.positionApplied}</p>
              </div>
              <button 
                onClick={() => setSelectedCandidate(null)}
                className="text-on-primary-container hover:text-white"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            {/* Modal Scroll Body */}
            <div className="p-8 overflow-y-auto space-y-6 custom-scrollbar flex-grow">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-outline-variant pb-6">
                <div>
                  <h5 className="text-xs text-[#707974] font-bold uppercase tracking-wider mb-1">Email Address</h5>
                  <p className="text-sm font-semibold text-primary">{selectedCandidate.email}</p>
                </div>
                <div>
                  <h5 className="text-xs text-[#707974] font-bold uppercase tracking-wider mb-1">Phone Number</h5>
                  <p className="text-sm font-semibold text-primary">{selectedCandidate.phone}</p>
                </div>
                <div className="mt-2">
                  <h5 className="text-xs text-[#707974] font-bold uppercase tracking-wider mb-1">Current Location</h5>
                  <p className="text-sm text-on-surface">{selectedCandidate.location}</p>
                </div>
                <div className="mt-2">
                  <h5 className="text-xs text-[#707974] font-bold uppercase tracking-wider mb-1">Submitted Date</h5>
                  <p className="text-sm text-on-surface">{new Date(selectedCandidate.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="border-b border-outline-variant pb-6 space-y-4">
                <div>
                  <h5 className="text-xs text-[#707974] font-bold uppercase tracking-wider mb-1">Highest Qualification</h5>
                  <p className="text-sm text-on-surface font-medium">{selectedCandidate.qualification}</p>
                </div>
                <div>
                  <h5 className="text-xs text-[#707974] font-bold uppercase tracking-wider mb-1">Years of Experience</h5>
                  <p className="text-sm text-on-surface font-medium">{selectedCandidate.experience} Years</p>
                </div>
                <div>
                  <h5 className="text-xs text-[#707974] font-bold uppercase tracking-wider mb-1.5">Core Candidate Skills</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.skills.map((skill, idx) => (
                      <span key={idx} className="bg-primary-fixed text-on-primary-fixed text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* LinkedIn & CV Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-outline-variant pb-6">
                <div>
                  <h5 className="text-xs text-[#707974] font-bold uppercase tracking-wider mb-2">Resume Attachment</h5>
                  <a 
                    href={selectedCandidate.resumeUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-secondary text-on-secondary font-bold text-xs rounded-full hover:brightness-105 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">download_for_offline</span> View CV / Resume
                  </a>
                </div>
                {selectedCandidate.linkedin && (
                  <div>
                    <h5 className="text-xs text-[#707974] font-bold uppercase tracking-wider mb-2">Professional Socials</h5>
                    <a 
                      href={selectedCandidate.linkedin} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 border border-outline text-on-surface font-semibold text-xs rounded-full hover:bg-surface-container transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">link</span> LinkedIn Profile
                    </a>
                  </div>
                )}
              </div>

              {/* Status Manager Block */}
              <div>
                <h5 className="text-xs text-[#707974] font-bold uppercase tracking-wider mb-2">Update Workflow Status</h5>
                <div className="w-56">
                  <select
                    className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2 text-sm text-primary font-semibold focus:outline-none focus:border-secondary"
                    value={selectedCandidate.status}
                    onChange={(e) => handleStatusChange(selectedCandidate._id, e.target.value)}
                  >
                    <option value="New">New</option>
                    <option value="Reviewing">Reviewing</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Hired">Hired</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-surface-container px-6 py-4 border-t border-outline-variant flex justify-end shrink-0">
              <button 
                onClick={() => setSelectedCandidate(null)}
                className="px-6 py-2 bg-primary text-on-primary hover:bg-secondary font-bold text-xs rounded-full transition-all"
              >
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: JOB CREATE & EDIT DIALOG */}
      {jobModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
          <div className="bg-surface w-full max-w-2xl rounded-3xl border border-outline-variant overflow-hidden shadow-2xl animate-scaleUp max-h-[90vh] flex flex-col">
            
            <div className="bg-primary-container text-on-primary p-6 flex justify-between items-center shrink-0">
              <h3 className="font-headline-sm text-headline-sm text-white font-bold">
                {editingJob ? `Edit Job Mandate: ${editingJob.title}` : 'Create Job Mandate'}
              </h3>
              <button 
                onClick={() => setJobModalOpen(false)}
                className="text-on-primary-container hover:text-white"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            <form onSubmit={handleJobSubmit} className="overflow-y-auto flex-grow">
              <div className="p-8 space-y-4 custom-scrollbar">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="title" className="block text-on-surface-variant font-label-md mb-1.5 text-xs">Job Title *</label>
                    <input 
                      type="text" 
                      id="title" 
                      required
                      placeholder="e.g. Senior Software Architect"
                      className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-2.5 text-on-surface focus:outline-none focus:border-secondary text-sm"
                      value={jobForm.title}
                      onChange={handleJobFormChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-on-surface-variant font-label-md mb-1.5 text-xs">Company Name *</label>
                    <input 
                      type="text" 
                      id="company" 
                      required
                      placeholder="e.g. Starline Tech"
                      className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-2.5 text-on-surface focus:outline-none focus:border-secondary text-sm"
                      value={jobForm.company}
                      onChange={handleJobFormChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="location" className="block text-on-surface-variant font-label-md mb-1.5 text-xs">Location *</label>
                    <input 
                      type="text" 
                      id="location" 
                      required
                      placeholder="e.g. Berlin, Germany"
                      className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-2.5 text-on-surface focus:outline-none focus:border-secondary text-sm"
                      value={jobForm.location}
                      onChange={handleJobFormChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="experience" className="block text-on-surface-variant font-label-md mb-1.5 text-xs">Experience *</label>
                    <input 
                      type="text" 
                      id="experience" 
                      required
                      placeholder="e.g. 8+ Years"
                      className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-2.5 text-on-surface focus:outline-none focus:border-secondary text-sm"
                      value={jobForm.experience}
                      onChange={handleJobFormChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-on-surface-variant font-label-md mb-1.5 text-xs">Job Description *</label>
                  <textarea 
                    id="description" 
                    required
                    rows="4"
                    placeholder="Provide overview of the job mandate..."
                    className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-2.5 text-on-surface focus:outline-none focus:border-secondary text-sm"
                    value={jobForm.description}
                    onChange={handleJobFormChange}
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="requirements" className="block text-on-surface-variant font-label-md mb-1.5 text-xs">Requirements (comma separated)</label>
                  <textarea 
                    id="requirements" 
                    rows="2"
                    placeholder="e.g. 8+ Years in design, Experience with AWS, Ph.D. in Computer Science"
                    className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-2 text-on-surface focus:outline-none focus:border-secondary text-sm"
                    value={jobForm.requirements}
                    onChange={handleJobFormChange}
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="responsibilities" className="block text-on-surface-variant font-label-md mb-1.5 text-xs">Responsibilities (comma separated)</label>
                  <textarea 
                    id="responsibilities" 
                    rows="2"
                    placeholder="e.g. Lead system designs, Mentor senior developers, Write technical plans"
                    className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-2 text-on-surface focus:outline-none focus:border-secondary text-sm"
                    value={jobForm.responsibilities}
                    onChange={handleJobFormChange}
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="benefits" className="block text-on-surface-variant font-label-md mb-1.5 text-xs">Benefits (comma separated)</label>
                  <textarea 
                    id="benefits" 
                    rows="2"
                    placeholder="e.g. Flexible hybrid schedule, Unlimited PTO, €5,000 annual education budget"
                    className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-2 text-on-surface focus:outline-none focus:border-secondary text-sm"
                    value={jobForm.benefits}
                    onChange={handleJobFormChange}
                  ></textarea>
                </div>

              </div>

              {/* Modal Footer actions */}
              <div className="bg-surface-container px-6 py-4 border-t border-outline-variant flex justify-end gap-3 shrink-0">
                <button 
                  type="button"
                  onClick={() => setJobModalOpen(false)}
                  className="px-6 py-2 border border-outline text-on-surface hover:bg-surface-container font-bold text-xs rounded-full transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-primary text-on-primary hover:bg-secondary font-bold text-xs rounded-full transition-all"
                >
                  {editingJob ? 'Save Changes' : 'Publish Job'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPortalPage;
