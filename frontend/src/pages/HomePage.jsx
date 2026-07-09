import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const HomePage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  const fallbackJobs = [
    {
      _id: 'fb1',
      title: 'Senior Software Architect',
      company: 'IT Industry',
      location: 'Lucknow, UP',
      experience: '8+ Years',
      description: 'Lead design of enterprise cloud architectures.',
      type: 'FULL TIME'
    },
    {
      _id: 'fb2',
      title: 'VP of Talent Operations',
      company: 'Logistics Sector',
      location: 'Ahmedabad, Gujarat',
      experience: '10+ Years',
      description: 'Oversee and design talent sourcing strategies.',
      type: 'REMOTE'
    },
    {
      _id: 'fb3',
      title: 'Creative Director',
      company: 'Finance & Insurance',
      location: 'Lucknow, UP',
      experience: '6+ Years',
      description: 'Lead design directives across marketing and product lines.',
      type: 'CONTRACT'
    }
  ];

  useEffect(() => {
    document.title = "HIRENEST PLACEMENTS | Recruitment Agency & Placement Consultancy in India";
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

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div>
      {/* Dual-Panel Split Hero Section */}
      <section className="py-section-padding px-8 max-w-container-max mx-auto">
        <div className="flex flex-col lg:flex-row gap-gutter min-h-[600px] items-stretch">
          {/* Left Image Panel */}
          <div className="hero-split-mask w-full lg:w-[45%] min-h-[400px]">
            <img 
              className="w-full h-full object-cover rounded-[24px]" 
              alt="Professional executives roundtable meeting" 
              src="/hero-roundtable.jpg"
            />
          </div>
          {/* Right Content Panel */}
          <div className="bg-gradient-to-br from-[#0B2E59] via-[#10305B] to-[#051B36] p-12 lg:p-16 flex flex-col justify-center rounded-[24px] text-on-primary relative overflow-hidden w-full lg:w-[55%]">
            {/* Subtle Grid and Dots Pattern Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
            <div className="absolute inset-0 pointer-events-none opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1.5px, transparent 1.5px)", backgroundSize: "16px 16px" }}></div>
            
            <div className="relative z-10">
              <div className="font-indicator text-indicator uppercase tracking-widest mb-6 opacity-80 flex items-center">
                <span className="mr-2">❖</span> Reach Beyond the Limits
              </div>
              <h1 className="font-display-hero text-[36px] lg:text-display-hero mb-8 leading-tight">
                India's Next-Generation Recruitment Partner
              </h1>
              <p className="font-body-lg text-body-lg mb-10 text-on-primary-container max-w-lg">
                Finding exceptional talent shouldn't be difficult. At HIRENEST PLACEMENTS PRIVATE LIMITED, we help businesses hire faster, smarter, and more efficiently using AI-assisted sourcing, market intelligence, rigorous candidate screening, and industry-focused recruitment strategies.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="px-8 py-4 rounded-full bg-secondary-container text-on-secondary-container font-label-md font-bold flex items-center gap-2 hover:brightness-105 transition-all">
                  Hire Talent <span className="material-symbols-outlined text-[20px]">north_east</span>
                </Link>
                <Link to="/submit-resume" className="px-8 py-4 rounded-full border border-on-primary-container text-on-primary font-label-md hover:bg-white/10 transition-all text-center">
                  Submit Resume
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos Horizontal Bar */}
      <section className="bg-surface-container-low py-12 border-y border-outline-variant">
        <div className="max-w-container-max mx-auto px-8">
          <div className="text-center mb-8">
            <h3 className="font-label-md text-label-md text-secondary uppercase tracking-widest font-bold">Key Sectors & Industries Served</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            <span className="font-headline-sm text-[15px] font-bold text-primary flex items-center justify-center gap-2"><span className="material-symbols-outlined text-secondary">computer</span> IT Industry</span>
            <span className="font-headline-sm text-[15px] font-bold text-primary flex items-center justify-center gap-2"><span className="material-symbols-outlined text-secondary">engineering</span> Construction</span>
            <span className="font-headline-sm text-[15px] font-bold text-primary flex items-center justify-center gap-2"><span className="material-symbols-outlined text-secondary">water_drop</span> Water Treatment</span>
            <span className="font-headline-sm text-[15px] font-bold text-primary flex items-center justify-center gap-2"><span className="material-symbols-outlined text-secondary">account_balance</span> Finance & Ins.</span>
            <span className="font-headline-sm text-[15px] font-bold text-primary flex items-center justify-center gap-2"><span className="material-symbols-outlined text-secondary">local_shipping</span> Logistics</span>
            <span className="font-headline-sm text-[15px] font-bold text-primary flex items-center justify-center gap-2"><span className="material-symbols-outlined text-secondary">domain</span> Real Estate</span>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-section-padding bg-surface-container-low px-8 border-y border-outline-variant">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-stack-lg mb-16">
            <div className="max-w-2xl">
              <div className="font-indicator text-indicator text-secondary uppercase mb-4 tracking-wider">❖ Comprehensive Solutions</div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Talent Acquisition & Professional Staffing Services</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">We provide a structured approach to recruitment, ensuring every placement aligns with corporate culture and long-term business goals.</p>
            </div>
            <Link to="/about" className="px-8 py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-on-primary transition-all text-center">View Our Story</Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-surface p-8 rounded-xl border border-outline-variant hover:border-secondary transition-all group">
              <h3 className="font-headline-md text-headline-md text-primary mb-4">Executive Search</h3>
              <p className="text-on-surface-variant mb-8 font-body-md">Sourcing C-suite and senior leadership through precision-driven networking and rigorous assessment.</p>
              <div className="h-1 bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-1/3 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
            <div className="bg-surface p-8 rounded-xl border border-outline-variant hover:border-secondary transition-all group">
              <h3 className="font-headline-md text-headline-md text-primary mb-4">Permanent Staffing</h3>
              <p className="text-on-surface-variant mb-8 font-body-md">Connecting organizations with high-performing professionals for critical permanent roles.</p>
              <div className="h-1 bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-1/2 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
            <div className="bg-surface p-8 rounded-xl border border-outline-variant hover:border-secondary transition-all group">
              <h3 className="font-headline-md text-headline-md text-primary mb-4">Bulk Hiring</h3>
              <p className="text-on-surface-variant mb-8 font-body-md">Managing high-volume operational recruitment campaigns with speed, reliability, and precision.</p>
              <div className="h-1 bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-1/4 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Recruitment Process */}
      <section className="py-section-padding bg-background px-8 border-b border-outline-variant">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <div className="font-indicator text-indicator text-secondary uppercase mb-4 tracking-wider">❖ Structured Search Methodology</div>
            <h2 className="font-headline-lg text-headline-lg text-primary">Our Recruitment Process</h2>
            <p className="text-on-surface-variant font-body-md mt-2 max-w-2xl mx-auto">
              We follow a rigorous, step-by-step process to ensure candidate quality, speed of delivery, and strategic operational alignment.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 text-center">
            {[
              { title: 'Understand Requirements', icon: 'psychology' },
              { title: 'Source Talent', icon: 'hub' },
              { title: 'Screen Candidates', icon: 'pageview' },
              { title: 'Assess Skills', icon: 'assignment_turned_in' },
              { title: 'Shortlist', icon: 'format_list_bulleted' },
              { title: 'Interview Coordination', icon: 'calendar_today' },
              { title: 'Selection', icon: 'verified' },
              { title: 'Joining Support', icon: 'handshake' }
            ].map((step, idx) => (
              <div key={idx} className="bg-surface p-6 rounded-2xl border border-outline-variant flex flex-col items-center justify-center shadow-sm hover:border-secondary transition-all">
                <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center text-primary mb-4 shrink-0 font-bold">
                  <span className="material-symbols-outlined text-2xl">{step.icon}</span>
                </div>
                <h4 className="font-semibold text-xs text-primary leading-tight">{step.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Job Openings */}
      <section className="py-section-padding bg-background px-8 max-w-container-max mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-headline-lg text-headline-lg text-primary">Featured Mandates</h2>
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

      {/* Industries Section */}
      <section className="py-section-padding bg-surface-container-low px-8 border-y border-outline-variant">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <div className="font-indicator text-indicator text-secondary uppercase mb-4 tracking-wider">❖ Domains of Expertise</div>
            <h2 className="font-headline-lg text-headline-lg text-primary">Industries We Serve</h2>
            <p className="text-on-surface-variant font-body-md mt-2 max-w-2xl mx-auto">
              Our specialist recruitment consultants partner with organizations across key sectors, matching critical talent to industry-specific mandates.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { title: 'Information Technology', icon: 'computer' },
              { title: 'Logistics', icon: 'local_shipping' },
              { title: 'Supply Chain', icon: 'inventory_2' },
              { title: 'Manufacturing', icon: 'precision_manufacturing' },
              { title: 'Engineering', icon: 'build' },
              { title: 'Healthcare', icon: 'medical_services' },
              { title: 'Pharmaceuticals', icon: 'vaccines' },
              { title: 'BFSI', icon: 'account_balance' },
              { title: 'Retail', icon: 'storefront' },
              { title: 'E-Commerce', icon: 'shopping_bag' },
              { title: 'Sales', icon: 'trending_up' },
              { title: 'Marketing', icon: 'campaign' },
              { title: 'Human Resources', icon: 'badge' },
              { title: 'Administration', icon: 'admin_panel_settings' },
              { title: 'Startups', icon: 'rocket_launch' },
              { title: 'MSMEs', icon: 'business' },
              { title: 'Large Enterprises', icon: 'corporate_fare' }
            ].map((ind, idx) => (
              <div key={idx} className="bg-surface p-6 rounded-2xl border border-outline-variant flex items-center gap-4 hover:shadow-md hover:border-secondary transition-all">
                <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[24px]">{ind.icon}</span>
                </div>
                <h4 className="font-headline-sm text-sm font-bold text-primary">{ind.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose HIRENEST (Asymmetric Split) */}
      <section className="py-section-padding px-8 max-w-container-max mx-auto overflow-hidden">
        <div className="text-center mb-16">
          <div className="font-indicator text-indicator text-secondary uppercase mb-4 tracking-wider">❖ The HIRENEST Advantage</div>
          <h2 className="font-headline-lg text-headline-lg text-primary">Why Choose HIRENEST</h2>
          <p className="text-on-surface-variant font-body-md mt-2 max-w-2xl mx-auto">
            We combine artificial intelligence with professional search methodologies to deliver candidates who stay and perform.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-8 bg-surface border border-outline-variant rounded-2xl flex flex-col items-center text-center shadow-sm hover:border-secondary transition-all">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4">smart_toy</span>
            <h4 className="font-headline-sm text-base font-bold text-primary mb-2">AI-Assisted Recruitment</h4>
            <p className="text-on-surface-variant text-sm">Leveraging next-gen algorithms to map passive candidate networks and predict organizational compatibility.</p>
          </div>
          <div className="p-8 bg-surface border border-outline-variant rounded-2xl flex flex-col items-center text-center shadow-sm hover:border-secondary transition-all">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4">verified</span>
            <h4 className="font-headline-sm text-base font-bold text-primary mb-2">Pre-Screened Candidates</h4>
            <p className="text-on-surface-variant text-sm">Our rigorous vetting verifies qualifications, technical expertise, and career stability.</p>
          </div>
          <div className="p-8 bg-surface border border-outline-variant rounded-2xl flex flex-col items-center text-center shadow-sm hover:border-secondary transition-all">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4">bolt</span>
            <h4 className="font-headline-sm text-base font-bold text-primary mb-2">Fast Hiring</h4>
            <p className="text-on-surface-variant text-sm">Reducing average time-to-hire to 7-14 days without sacrificing alignment or quality.</p>
          </div>
          <div className="p-8 bg-surface border border-outline-variant rounded-2xl flex flex-col items-center text-center shadow-sm hover:border-secondary transition-all">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4">map</span>
            <h4 className="font-headline-sm text-base font-bold text-primary mb-2">PAN India Reach</h4>
            <p className="text-on-surface-variant text-sm">A centralized sourcing structure capable of placing talent in any tier-1 or tier-2 city.</p>
          </div>
          <div className="p-8 bg-surface border border-outline-variant rounded-2xl flex flex-col items-center text-center shadow-sm hover:border-secondary transition-all">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4">support_agent</span>
            <h4 className="font-headline-sm text-base font-bold text-primary mb-2">Dedicated Consultants</h4>
            <p className="text-on-surface-variant text-sm">Single point of contact for your search, ensuring continuous progress and expert guidance.</p>
          </div>
          <div className="p-8 bg-surface border border-outline-variant rounded-2xl flex flex-col items-center text-center shadow-sm hover:border-secondary transition-all">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4">manage_accounts</span>
            <h4 className="font-headline-sm text-base font-bold text-primary mb-2">Executive Search</h4>
            <p className="text-on-surface-variant text-sm">Discreet C-suite and leadership acquisition tailored to confidential growth mandates.</p>
          </div>
          <div className="p-8 bg-surface border border-outline-variant rounded-2xl flex flex-col items-center text-center shadow-sm hover:border-secondary transition-all">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4">gavel</span>
            <h4 className="font-headline-sm text-base font-bold text-primary mb-2">Ethical Hiring</h4>
            <p className="text-on-surface-variant text-sm">Zero bias, strict candidate care standards, and complete transparency at every stage.</p>
          </div>
          <div className="p-8 bg-surface border border-outline-variant rounded-2xl flex flex-col items-center text-center shadow-sm hover:border-secondary transition-all">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4">psychology</span>
            <h4 className="font-headline-sm text-base font-bold text-primary mb-2">Industry Specialists</h4>
            <p className="text-on-surface-variant text-sm">Consultants with active experience in domains from technical systems to operational logistics.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-section-padding bg-surface-container-low px-8 border-t border-outline-variant">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="font-indicator text-indicator text-secondary uppercase mb-4 tracking-wider">❖ Frequently Asked Questions</div>
            <h2 className="font-headline-lg text-headline-lg text-primary">FAQ</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "What services does HIRENEST PLACEMENTS PRIVATE LIMITED offer?",
                a: "HIRENEST PLACEMENTS PRIVATE LIMITED provides comprehensive recruitment services including Executive Search, Permanent Recruitment, Bulk Hiring, Contract Staffing, Campus Recruitment, and Industry-Specific Recruitment."
              },
              {
                q: "Which industries do you specialize in?",
                a: "We specialize in staffing for Information Technology, Logistics, Supply Chain, Manufacturing, Engineering, Healthcare, Pharmaceuticals, BFSI, Retail, E-Commerce, Sales, Marketing, Human Resources, Administration, Startups, MSMEs, and Large Enterprises."
              },
              {
                q: "Do you provide recruitment services across India?",
                a: "Yes. HIRENEST PLACEMENTS PRIVATE LIMITED operates a robust PAN India recruitment network, connecting employers with qualified candidates across all major states and industrial corridors."
              },
              {
                q: "How do you ensure candidate quality?",
                a: "We deploy AI-assisted sourcing, detailed market intelligence, and a multi-layer candidate screening process. Technical competencies, career stability, and cultural fit are evaluated by our industry-specific consultants before any profile is shortlisted."
              },
              {
                q: "How quickly can you close a position?",
                a: "Our standard turnaround time is between 7 to 14 business days, depending on the level of specialization, geographic location, and specific mandate details."
              },
              {
                q: "Can you handle bulk hiring requirements?",
                a: "Yes. We possess dedicated bulk recruitment teams capable of managing high-volume mandates for retail expansions, startup scaling, operational rollouts, and seasonal requirements without compromising candidate quality."
              },
              {
                q: "Do you recruit for startups as well as large enterprises?",
                a: "Yes, we support organizations of all scales. We act as talent partners for early-stage startups making their first foundational hires, mid-market enterprises, MSMEs, and multinational corporations."
              },
              {
                q: "What makes HIRENEST different from other recruitment agencies?",
                a: "HIRENEST combines cutting-edge AI-assisted sourcing with traditional expert vetting. We emphasize ethical hiring practices, transparent communication, and long-term candidate retention, resulting in exceptionally low turnover rates."
              },
              {
                q: "Do you provide executive and leadership hiring?",
                a: "Yes, our Executive Search division specializes in confidential and strategic sourcing for C-suite executives, directors, VPs, and senior leadership positions."
              },
              {
                q: "How can employers start working with HIRENEST?",
                a: "Employers can initiate a partnership by clicking the 'Hire Talent' button on our homepage, filling out the Contact page form, or emailing us directly at info@hirenestplacement.com to schedule a briefing session."
              },
              {
                q: "How can job seekers apply?",
                a: "Job seekers can submit their resume through our 'Submit Resume' page or apply to active listings on our 'Current Openings' page."
              },
              {
                q: "Do you charge job seekers?",
                a: "No, HIRENEST PLACEMENTS PRIVATE LIMITED does not charge job seekers any fees for registration, assessment, or job placement services."
              },
              {
                q: "Do you maintain confidentiality?",
                a: "Yes, we adhere to strict confidentiality protocols. Candidate details are only shared with prospective employers after explicit consent, and employer mandates can be conducted on a completely unbranded basis if requested."
              },
              {
                q: "Why should companies outsource recruitment?",
                a: "Outsourcing recruitment allows companies to leverage specialized sourcing talent, reduce overall time-to-hire, minimize recruitment costs, scale hiring capacity dynamically, and access pre-vetted, passive candidate pools."
              },
              {
                q: "How do I request a recruitment consultation?",
                a: "You can request a complimentary talent consultation by reaching out via our Contact page or emailing us directly at info@hirenestplacement.com."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-surface rounded-xl border border-outline-variant overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center text-primary font-bold hover:bg-surface-container transition-all text-sm lg:text-base"
                >
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined transition-transform duration-200" style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'none' }}>
                    expand_more
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4 pt-2 text-on-surface-variant font-body-md border-t border-outline-variant bg-surface-container-low text-xs lg:text-sm">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display-hero text-headline-lg-mobile md:text-display-hero text-primary mb-8">Ready to Elevate Your Team?</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">Partner with HIRENEST today and experience recruitment redefined. Our consultants are standing by to discuss your specific needs.</p>
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
