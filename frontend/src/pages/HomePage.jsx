import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const HomePage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackJobs = [
    {
      _id: 'fb1',
      title: 'Senior Software Architect',
      company: 'Starline Tech',
      location: 'Berlin, Germany',
      experience: '8+ Years',
      description: 'Lead design of enterprise cloud architectures.',
      type: 'FULL TIME'
    },
    {
      _id: 'fb2',
      title: 'VP of Talent Operations',
      company: 'Red Rock Solutions',
      location: 'San Francisco, USA',
      experience: '10+ Years',
      description: 'Oversee and design talent sourcing strategies.',
      type: 'REMOTE'
    },
    {
      _id: 'fb3',
      title: 'Creative Director',
      company: 'Bluefin Studio',
      location: 'London, UK',
      experience: '6+ Years',
      description: 'Lead design directives across marketing and product lines.',
      type: 'CONTRACT'
    }
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/jobs`);
        setJobs(response.data.slice(0, 3));
      } catch (error) {
        console.warn('Could not fetch jobs from API, loading static fallbacks:', error.message);
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

  const handleApplyClick = (job, e) => {
    if (e) e.stopPropagation();
    navigate('/submit-resume', { state: { jobTitle: job.title } });
  };

  return (
    <div>
      {/* Dual-Panel Split Hero Section */}
      <section className="py-section-padding px-8 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter min-h-[600px]">
          {/* Left Image Panel */}
          <div className="hero-split-mask h-full min-h-[400px]">
            <img 
              className="w-full h-full object-cover" 
              alt="Professional young male executive focusing on laptop in boardroom" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQLkVr4-aoID7pCg4__jCToIro2v67_X_UVtvyK8NXAj-U3s0G6xL-DpXKCNzPEvPU8EO3gqcncnykehDNulAscP8Gf1PkooSNDwctMA91zwDgmqtbIiRws-u8kbuVTU55HBqMj1OuArCHFWSc3A2nPk-xbW1ZLZ2t89mdvrp1FCVLPxiO2aLcvRXX3SN3_XygEa3jTnu59RnS9Fi-MxHih9S7RVdxwRB5EI67Vs78Fqpnz8Yp2qEVUqKta1JcX8f4HQScBgJ1bg"
            />
          </div>
          {/* Right Content Panel (Emerald Box) */}
          <div className="bg-primary-container p-12 lg:p-16 flex flex-col justify-center rounded-[24px] text-on-primary relative overflow-hidden">
            <div className="relative z-10">
              <div className="font-indicator text-indicator uppercase tracking-widest mb-6 opacity-80 flex items-center">
                <span className="mr-2">❖</span> We Help You Find Skilled Talent
              </div>
              <h1 className="font-display-hero text-display-hero mb-8 leading-tight">
                Your Next Career Move Starts Here
              </h1>
              <p className="font-body-lg text-body-lg mb-10 text-on-primary-container max-w-lg">
                Expert-led recruitment strategies for global enterprises and ambitious professionals. We bridge the gap with precision and authority.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/jobs" className="px-8 py-4 rounded-full bg-secondary-container text-on-secondary-container font-label-md font-bold flex items-center gap-2 hover:brightness-105 transition-all">
                  Browse Jobs <span className="material-symbols-outlined text-[20px]">north_east</span>
                </Link>
                <Link to="/submit-resume" className="px-8 py-4 rounded-full border border-on-primary-container text-on-primary font-label-md hover:bg-white/10 transition-all text-center">
                  Submit Resume
                </Link>
              </div>
            </div>
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
          </div>
        </div>
      </section>

      {/* Partner Logos Horizontal Bar */}
      <section className="bg-surface-container-low py-12 border-y border-outline-variant">
        <div className="max-w-container-max mx-auto px-8 overflow-hidden">
          <div className="flex items-center justify-between gap-12 opacity-50 grayscale hover:grayscale-0 transition-all flex-wrap md:flex-nowrap">
            <span className="font-headline-sm text-headline-sm font-bold flex items-center gap-2"><span className="material-symbols-outlined">corporate_fare</span> STARLINE</span>
            <span className="font-headline-sm text-headline-sm font-bold flex items-center gap-2"><span className="material-symbols-outlined">terrain</span> RED ROCK</span>
            <span className="font-headline-sm text-headline-sm font-bold flex items-center gap-2"><span className="material-symbols-outlined">diamond</span> KOPEX</span>
            <span className="font-headline-sm text-headline-sm font-bold flex items-center gap-2"><span className="material-symbols-outlined">water_drop</span> BLUEFIN</span>
            <span className="font-headline-sm text-headline-sm font-bold flex items-center gap-2"><span className="material-symbols-outlined">account_balance</span> RENCENT</span>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-section-padding bg-background px-8 max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <div className="font-indicator text-indicator text-secondary uppercase mb-4 tracking-wider flex justify-center items-center">
            <span className="mr-2">❖</span> Our Global Impact
          </div>
          <h2 className="font-headline-lg text-headline-lg text-primary">Measured in Results, Built on Trust</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <div className="bg-surface-container-lowest p-10 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-transform group">
            <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
            </div>
            <div className="text-[32px] font-bold text-primary mb-1">5000+</div>
            <p className="text-on-surface-variant font-label-md">Candidates Placed</p>
          </div>
          <div className="bg-surface-container-lowest p-10 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-transform group">
            <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>handshake</span>
            </div>
            <div className="text-[32px] font-bold text-primary mb-1">300+</div>
            <p className="text-on-surface-variant font-label-md">Hiring Partners</p>
          </div>
          <div className="bg-surface-container-lowest p-10 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-transform group">
            <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>work_history</span>
            </div>
            <div className="text-[32px] font-bold text-primary mb-1">1000+</div>
            <p className="text-on-surface-variant font-label-md">Open Positions</p>
          </div>
          <div className="bg-surface-container-lowest p-10 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-transform group">
            <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
            <div className="text-[32px] font-bold text-primary mb-1">95%</div>
            <p className="text-on-surface-variant font-label-md">Client Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-section-padding bg-surface-container-low px-8">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-stack-lg mb-16">
            <div className="max-w-2xl">
              <div className="font-indicator text-indicator text-secondary uppercase mb-4 tracking-wider">❖ Comprehensive Solutions</div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Expertise Across the Lifecycle</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">We provide a structured approach to talent acquisition, ensuring every placement aligns with corporate culture and long-term goals.</p>
            </div>
            <Link to="/about" className="px-8 py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-on-primary transition-all text-center">View Our Story</Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-surface-container-lowest p-8 rounded-xl border border-transparent hover:border-secondary transition-all group">
              <h3 className="font-headline-md text-headline-md text-primary mb-4">Executive Search</h3>
              <p className="text-on-surface-variant mb-8 font-body-md">Sourcing C-suite and senior leadership through precision-driven networking and rigorous assessment.</p>
              <div className="h-1 bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-1/3 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-xl border border-transparent hover:border-secondary transition-all group">
              <h3 className="font-headline-md text-headline-md text-primary mb-4">Tech Recruitment</h3>
              <p className="text-on-surface-variant mb-8 font-body-md">Placing developers, architects, and product leads who drive innovation in rapidly scaling environments.</p>
              <div className="h-1 bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-1/2 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-xl border border-transparent hover:border-secondary transition-all group">
              <h3 className="font-headline-md text-headline-md text-primary mb-4">Consulting Services</h3>
              <p className="text-on-surface-variant mb-8 font-body-md">Advisory on talent strategy, employee branding, and performance-based compensation modeling.</p>
              <div className="h-1 bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-1/4 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Job Openings */}
      <section className="py-section-padding bg-background px-8 max-w-container-max mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-headline-lg text-headline-lg text-primary">Featured Opportunities</h2>
          <Link to="/jobs" className="text-secondary font-bold hover:underline flex items-center gap-1 font-label-md">
            View All Openings <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
          </Link>
        </div>
        
        {loading ? (
          <div className="text-center py-10">
            <p className="text-on-surface-variant font-body-lg">Loading placements...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div 
                key={job._id}
                onClick={() => handleCardClick(job._id)}
                className="bg-surface p-6 rounded-xl border border-outline-variant flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-lg bg-surface-container-high flex items-center justify-center font-bold text-primary">
                    {job.company.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="bg-secondary-fixed text-on-secondary-fixed text-[12px] font-bold px-2 py-0.5 rounded">
                        {job.experience} Exp
                      </span>
                      <span className="text-on-surface-variant text-[14px]">
                        {job.location}
                      </span>
                    </div>
                    <h4 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors">
                      {job.title}
                    </h4>
                    <p className="text-on-surface-variant font-label-md line-clamp-1">
                      {job.description}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={(e) => handleApplyClick(job, e)}
                  className="px-6 py-2 rounded-full bg-primary text-on-primary font-label-md group-hover:bg-secondary transition-colors self-start md:self-auto"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us (Asymmetric Split) */}
      <section className="py-section-padding px-8 max-w-container-max mx-auto overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary-fixed opacity-20 rounded-full blur-3xl"></div>
            <div className="rounded-3xl overflow-hidden shadow-2xl relative z-10">
              <img 
                className="w-full h-full object-cover aspect-[4/5]" 
                alt="Diverse team of professional recruiters collaborating" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxfuRf8OrUspvrLVNwVBtI5OwXVC9jSmbsEoXPf39jKQlPML1NnuEQJj2Cefuj6YfT_KD2CSCqYIFOHDxzFh5FLDTfwaa7CazyumRyAK2-gjwS7e-_ikD5sBpGsW2lba7qZBf78qlQq-yienTbOs2ZPYarSH2X1F1mhzvcCwzbmlnQOp4xi379_qgdlDYSyqrO1T7DYO5C5Ph9WuOTItT-UeoqWADD8GfkL2e-e_tUWa6BN63qaGOCalzwP0UE1hfC5Aoft-bu1g"
              />
            </div>
            {/* Overlapping Card */}
            <div className="absolute -bottom-10 -right-10 bg-tertiary p-8 rounded-2xl text-on-tertiary max-w-[280px] hidden md:block shadow-xl z-20">
              <div className="font-headline-sm text-headline-sm mb-2">95% Success</div>
              <p className="text-on-tertiary-container font-body-md italic">"Our methodology ensures that 95% of our candidates stay with their new company for over 2 years."</p>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="font-indicator text-indicator text-secondary uppercase mb-4 tracking-wider">❖ The HireNest Difference</div>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-8">Why Industry Leaders Choose Our Partnership</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-secondary flex items-center justify-center text-secondary">❖</div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-primary mb-2">Authority & Trust</h4>
                  <p className="text-on-surface-variant font-body-md">With over a decade of executive recruitment, we have built a network that is inaccessible to standard platforms.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-secondary flex items-center justify-center text-secondary">❖</div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-primary mb-2">Precision Vetting</h4>
                  <p className="text-on-surface-variant font-body-md">Our multi-stage assessment includes cultural alignment, technical proficiency, and leadership potential analysis.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-secondary flex items-center justify-center text-secondary">❖</div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-primary mb-2">Global Reach</h4>
                  <p className="text-on-surface-variant font-body-md">Headquartered in London with partners in NYC, Berlin, and Singapore, we source talent across borders effortlessly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section className="py-section-padding bg-primary-container text-on-primary">
        <div className="max-w-container-max mx-auto px-8">
          <div className="text-center mb-16">
            <div className="font-indicator text-indicator uppercase mb-4 tracking-widest opacity-70">❖ Success Stories</div>
            <h2 className="font-headline-lg text-headline-lg">Voices from Our Network</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-tertiary p-10 rounded-2xl border border-white/10 relative">
              <span className="material-symbols-outlined absolute top-6 right-8 text-secondary-container opacity-30 text-5xl">format_quote</span>
              <p className="font-body-lg text-body-lg italic mb-8 leading-relaxed">"HireNest didn't just find us a candidate; they found us a future leader. Their understanding of our company culture was uncanny. The process was calm, professional, and ultimately very successful."</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-surface-container-high overflow-hidden">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Sarah Jenkins Jenkins Headshot" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAplmEwK8Wvb07FFgr6nufcBmxbi1siDmIuEz7GL2Tq2JTMQDvGIyQaAQJwBIEi7208qM76UatAn_jNH4saZvZS4rCMxLKuPrpPg1pMUrdr-eb_CAUhEFr-MtML3WZAMYV5W-WtbbyeMj8sfmIC2V-YiclB_8uXyLzitM5an6vA9BnVuz7DvGOsbrzBh_mvnvdAlZFD5oQXEX-KW59MlKTi4M_yHDXq6dC5FbyDCue8WyvHZ0erxRr3VGO_Hldsgm7qO8hyWwdHg"
                  />
                </div>
                <div>
                  <div className="font-headline-sm text-headline-sm leading-tight">Sarah Jenkins</div>
                  <div className="text-secondary-container font-label-md">CTO at Starline Tech</div>
                </div>
              </div>
            </div>
            <div className="bg-tertiary p-10 rounded-2xl border border-white/10 relative">
              <span className="material-symbols-outlined absolute top-6 right-8 text-secondary-container opacity-30 text-5xl">format_quote</span>
              <p className="font-body-lg text-body-lg italic mb-8 leading-relaxed">"Transitioning to an executive role can be daunting, but the team at HireNest provided exceptional guidance. Their discretion and precision were exactly what I needed for my next career leap."</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-surface-container-high overflow-hidden">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Marcus Thorne Headshot" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPKLRKqpHgdjTnZ2TKwhyxGakjGKSD-rwHOyWaR5zwkOAQ7uS5k9kXTi4peS6RuC_owQ8iyawFSp30Psm3eu86okJjrC7L8h7sA9-p9Lw8SCBp-QMP_s8AoyudyrRpCvYLtTVoDzWG6FPweIIqnYa9KW9eKaKIpsw8hSejc-GgGyoAP3HxDxRs5tU6uFnX1IiofRPOnMBNly3xqrkxxx5KSz9F2MUh4Ur6CoaYY283aa3TpaHC8j_SE4MbkkrI8QP0pG89GsrkPA"
                  />
                </div>
                <div>
                  <div className="font-headline-sm text-headline-sm leading-tight">Marcus Thorne</div>
                  <div className="text-secondary-container font-label-md">Chief Operations Officer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display-hero text-headline-lg-mobile md:text-display-hero text-primary mb-8">Ready to Elevate Your Team?</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">Partner with HireNest today and experience recruitment redefined. Our consultants are standing by to discuss your specific needs.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contact" className="px-10 py-5 rounded-full bg-primary text-on-primary font-bold text-lg hover:scale-105 transition-transform flex items-center gap-3 justify-center">
              Book a Consultation <span className="material-symbols-outlined">calendar_month</span>
            </Link>
            <Link to="/jobs" className="px-10 py-5 rounded-full border-2 border-primary text-primary font-bold text-lg hover:bg-primary-fixed-dim transition-colors text-center">
              Browse Openings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
