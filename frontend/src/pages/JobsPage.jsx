import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { SkeletonJobCard } from '../components/SkeletonLoaders';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const JobsPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter States
  const [search, setSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const fallbackJobs = [
    {
      _id: 'fb1',
      title: 'Senior Software Architect',
      company: 'Starline Tech',
      location: 'Berlin, Germany',
      experience: '8+ Years',
      description: 'Lead design of enterprise cloud architectures. Define software structures, choose tech stacks, and align development teams across global initiatives.',
      active: true
    },
    {
      _id: 'fb2',
      title: 'VP of Talent Operations',
      company: 'Red Rock Solutions',
      location: 'San Francisco, USA',
      experience: '10+ Years',
      description: 'Oversee and design talent sourcing strategies. Scale recruiting teams, implement automation tooling, and improve employee retention across borders.',
      active: true
    },
    {
      _id: 'fb3',
      title: 'Creative Director',
      company: 'Bluefin Studio',
      location: 'London, UK',
      experience: '6+ Years',
      description: 'Lead design directives across marketing and product lines. Coordinate design systems, branding portfolios, and orchestrate compelling media operations.',
      active: true
    }
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/jobs`);
        setJobs(response.data);
      } catch (err) {
        console.warn('Could not connect to API, showing static fallback jobs:', err.message);
        setJobs(fallbackJobs);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleCardClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleApply = (jobTitle) => {
    navigate('/submit-resume', { state: { jobTitle } });
  };

  // Filter logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(search.toLowerCase()) || 
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase());
      
    const matchesLocation = 
      selectedLocation === '' || 
      job.location.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  // Extract unique locations for the filter list
  const uniqueLocations = Array.from(new Set(jobs.map(j => {
    const parts = j.location.split(',');
    return parts[parts.length - 1].trim(); // Get country or main city
  })));

  return (
    <div className="bg-background min-h-screen">
      {/* Header Banner */}
      <section className="bg-primary-container text-on-primary py-16 px-8 text-center relative overflow-hidden">
        <div className="max-w-container-max mx-auto relative z-10">
          <div className="font-indicator text-indicator uppercase tracking-widest mb-4 opacity-80 flex justify-center items-center">
            <span className="mr-2">❖</span> Join Our Network
          </div>
          <h1 className="font-display-hero text-display-hero mb-6">Current Career Openings</h1>
          <p className="font-body-lg text-on-primary-container max-w-2xl mx-auto">
            Discover elite positions at the world’s leading technology companies, finance firms, and retail organizations.
          </p>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
      </section>

      {/* Filter and Job Lists Section */}
      <section className="py-12 px-8 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 bg-surface-container p-6 rounded-2xl border border-outline-variant h-fit">
            <h3 className="font-headline-sm text-headline-sm text-primary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">filter_alt</span> Filters
            </h3>
            
            {/* Search Input */}
            <div className="mb-6">
              <label htmlFor="search-input" className="block text-on-surface-variant font-label-md mb-2">Search Keyword</label>
              <div className="relative">
                <input 
                  id="search-input"
                  type="text" 
                  placeholder="Title, company, skill..." 
                  className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-base">search</span>
              </div>
            </div>

            {/* Location Select */}
            <div className="mb-4">
              <label htmlFor="location-select" className="block text-on-surface-variant font-label-md mb-2">Location</label>
              <select 
                id="location-select"
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-3 py-2 text-on-surface focus:outline-none focus:border-secondary text-sm"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {uniqueLocations.map((loc, idx) => (
                  <option key={idx} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            
            {/* Clear Button */}
            {(search || selectedLocation) && (
              <button 
                onClick={() => { setSearch(''); setSelectedLocation(''); }}
                className="w-full mt-4 py-2 border border-primary text-primary hover:bg-primary-fixed-dim font-bold text-xs rounded-full transition-all"
              >
                Clear All Filters
              </button>
            )}
          </div>

          {/* Job listings */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="space-y-6">
                <SkeletonJobCard />
                <SkeletonJobCard />
                <SkeletonJobCard />
              </div>
            ) : error ? (
              <div className="bg-error-container text-on-error-container p-6 rounded-2xl border border-error/20 text-center">
                <p className="font-body-lg">{error}</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="bg-surface p-12 rounded-2xl border border-outline-variant text-center">
                <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-4">find_in_page</span>
                <h4 className="font-headline-sm text-headline-sm text-primary mb-2">No Matching Positions Found</h4>
                <p className="text-on-surface-variant font-body-md max-w-md mx-auto">
                  We currently do not have open roles matching your specific query. Try clearing your filters or contact our team for guidance.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredJobs.map((job) => (
                  <div 
                    key={job._id}
                    onClick={() => handleCardClick(job._id)}
                    className="bg-surface p-8 rounded-2xl border border-outline-variant hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer"
                  >
                    <div className="space-y-3 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="bg-primary-fixed text-on-primary-fixed text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {job.experience} Experience
                        </span>
                        <span className="text-on-surface-variant font-label-md flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">location_on</span>
                          {job.location}
                        </span>
                      </div>
                      
                      <h3 className="font-headline-md text-headline-md text-primary group-hover:text-secondary transition-colors">
                        {job.title}
                      </h3>
                      
                      <p className="font-label-md text-secondary font-bold">
                        Company: {job.company}
                      </p>
                      
                      <p className="text-on-surface-variant font-body-md leading-relaxed line-clamp-2">
                        {job.description}
                      </p>
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApply(job.title);
                      }}
                      className="px-8 py-3 rounded-full bg-primary text-on-primary hover:bg-secondary font-bold font-label-md transition-colors flex items-center gap-2 group-hover:translate-x-1 duration-200 shrink-0 self-stretch md:self-auto justify-center"
                    >
                      Apply Now <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};

export default JobsPage;
