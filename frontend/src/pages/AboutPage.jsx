import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  useEffect(() => {
    document.title = "About HIRENEST PLACEMENTS | Corporate Recruitment Services in India";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Learn more about HIRENEST PLACEMENTS PRIVATE LIMITED, a premium recruitment consultant offering AI-assisted talent sourcing, permanent staffing, and executive search.');
    }
  }, []);

  return (
    <div className="bg-background">
      {/* About Us Hero Section */}
      <section className="bg-primary text-on-primary py-20 px-8 relative overflow-hidden">
        <div className="max-w-container-max mx-auto relative z-10">
          <div className="font-indicator text-indicator uppercase tracking-widest mb-4 opacity-80 flex items-center">
            <span className="mr-2">❖</span> About HIRENEST PLACEMENTS PRIVATE LIMITED
          </div>
          <h1 className="font-display-hero text-[36px] lg:text-display-hero mb-6 leading-tight max-w-3xl">
            Reach Beyond the Limits
          </h1>
          <h2 className="font-headline-md text-headline-md text-on-primary-container max-w-2xl leading-relaxed mb-4">
            India's Next-Generation Recruitment Partner
          </h2>
          <p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl leading-relaxed">
            Finding exceptional talent shouldn't be difficult. At HIRENEST PLACEMENTS PRIVATE LIMITED, we help businesses hire faster, smarter, and more efficiently using AI-assisted sourcing, market intelligence, rigorous candidate screening, and industry-focused recruitment strategies.
          </p>
        </div>
        {/* Subtle grid texture overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
      </section>

      {/* Company Story & Split Image */}
      <section className="py-section-padding px-8 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="font-indicator text-indicator text-secondary uppercase mb-4 tracking-wider">❖ Our Story</div>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-6">AI-Assisted Recruitment Sourcing & Selection</h2>
            <p className="text-on-surface-variant font-body-md mb-6 leading-relaxed">
              Founded in 2025, HIRENEST PLACEMENTS PRIVATE LIMITED was built with a clear purpose: to bridge the gap between world-class organizations and unique talent. We deliver recruitment solutions that reduce hiring time, improve candidate quality, and support long-term business growth. Your Growth Begins with the Right People.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {[
                '✔ AI-Assisted Talent Sourcing',
                '✔ Pre-Screened & Interview-Ready Candidates',
                '✔ Industry-Specific Recruitment Specialists',
                '✔ Fast Turnaround Time',
                '✔ PAN India Hiring',
                '✔ Executive Search',
                '✔ Permanent Hiring',
                '✔ Contract Staffing',
                '✔ Bulk Hiring',
                '✔ Transparent Recruitment Process'
              ].map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2 text-primary font-semibold text-sm">
                  <span className="text-secondary font-bold text-base">✔</span>
                  <span>{highlight.replace('✔ ', '')}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-video lg:aspect-[4/3] bg-surface-container-high">
            <img 
              className="w-full h-full object-cover" 
              alt="Office collaboration meeting"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxfuRf8OrUspvrLVNwVBtI5OwXVC9jSmbsEoXPf39jKQlPML1NnuEQJj2Cefuj6YfT_KD2CSCqYIFOHDxzFh5FLDTfwaa7CazyumRyAK2-gjwS7e-_ikD5sBpGsW2lba7qZBf78qlQq-yienTbOs2ZPYarSH2X1F1mhzvcCwzbmlnQOp4xi379_qgdlDYSyqrO1T7DYO5C5Ph9WuOTItT-UeoqWADD8GfkL2e-e_tUWa6BN63qaGOCalzwP0UE1hfC5Aoft-bu1g" 
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-section-padding bg-surface-container-low px-8 border-y border-outline-variant">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface p-10 rounded-2xl border border-outline-variant shadow-sm">
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-6 text-primary">
                <span className="material-symbols-outlined font-bold">explore</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-4">Our Mission</h3>
              <p className="text-on-surface-variant font-body-md leading-relaxed">
                To accelerate business growth across India through ethical hiring, AI-assisted recruitment tech, and sourcing high-quality candidates that form long-term partnerships.
              </p>
            </div>
            <div className="bg-surface p-10 rounded-2xl border border-outline-variant shadow-sm">
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-6 text-primary">
                <span className="material-symbols-outlined font-bold">visibility</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-4">Our Vision</h3>
              <p className="text-on-surface-variant font-body-md leading-relaxed">
                To build India's most trusted recruitment consultant framework, driven by deep industry expertise, technology integration, and exceptional service standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services / Core Capabilities Section */}
      <section className="py-section-padding px-8 max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <div className="font-indicator text-indicator text-secondary uppercase mb-4 tracking-wider">❖ Our Core Services</div>
          <h2 className="font-headline-lg text-headline-lg text-primary">Recruitment Solutions We Deliver</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-surface border border-outline-variant rounded-2xl shadow-sm hover:border-secondary transition-all">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4">person_add</span>
            <h4 className="font-headline-sm text-headline-sm text-primary mb-3">Permanent Recruitment</h4>
            <p className="text-on-surface-variant font-body-md">Connecting you with qualified candidates who align with your operational targets and long-term values.</p>
          </div>
          <div className="p-8 bg-surface border border-outline-variant rounded-2xl shadow-sm hover:border-secondary transition-all">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4">manage_accounts</span>
            <h4 className="font-headline-sm text-headline-sm text-primary mb-3">Executive Search</h4>
            <p className="text-on-surface-variant font-body-md">Discreetly sourcing and securing C-suite executives and senior leaders who possess the foresight to scale your business.</p>
          </div>
          <div className="p-8 bg-surface border border-outline-variant rounded-2xl shadow-sm hover:border-secondary transition-all">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4">groups</span>
            <h4 className="font-headline-sm text-headline-sm text-primary mb-3">Bulk Hiring</h4>
            <p className="text-on-surface-variant font-body-md">Managing high-volume recruitment mandates efficiently for retail setups, plant expansions, and new projects.</p>
          </div>
          <div className="p-8 bg-surface border border-outline-variant rounded-2xl shadow-sm hover:border-secondary transition-all">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4">business_center</span>
            <h4 className="font-headline-sm text-headline-sm text-primary mb-3">Contract Staffing</h4>
            <p className="text-on-surface-variant font-body-md">Providing agile and qualified personnel on a contractual basis to manage project deadlines and peak demands.</p>
          </div>
          <div className="p-8 bg-surface border border-outline-variant rounded-2xl shadow-sm hover:border-secondary transition-all">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4">school</span>
            <h4 className="font-headline-sm text-headline-sm text-primary mb-3">Campus Recruitment</h4>
            <p className="text-on-surface-variant font-body-md">Partnering with leading colleges and institutions to source top-tier fresh talent ready to enter the workforce.</p>
          </div>
          <div className="p-8 bg-surface border border-outline-variant rounded-2xl shadow-sm hover:border-secondary transition-all">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4">workspace_premium</span>
            <h4 className="font-headline-sm text-headline-sm text-primary mb-3">Industry-Specific Recruitment</h4>
            <p className="text-on-surface-variant font-body-md">Deploying dedicated consultants with domain expertise in areas from software architecture to manufacturing processes.</p>
          </div>
        </div>
      </section>

      {/* CTA Button Block */}
      <section className="bg-primary-container text-on-primary py-16 px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="font-headline-lg text-headline-lg mb-6 text-white">Join Our Executive Leadership Network</h3>
          <p className="font-body-lg text-on-primary-container mb-8">
            Whether you are planning to fill critical executive slots or considering your own next move, our consultants are ready to discuss.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/contact" className="px-8 py-3 rounded-full bg-secondary-container text-on-secondary-container font-bold hover:brightness-105 transition-all text-center">
              Contact a Consultant
            </Link>
            <Link to="/submit-resume" className="px-8 py-3 rounded-full border border-on-primary-container hover:bg-white/10 transition-all text-center">
              Submit My Profile
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
