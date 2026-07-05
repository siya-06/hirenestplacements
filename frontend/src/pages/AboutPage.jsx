import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="bg-background">
      {/* About Us Hero Section */}
      <section className="bg-primary-container text-on-primary py-20 px-8 relative overflow-hidden">
        <div className="max-w-container-max mx-auto relative z-10">
          <div className="font-indicator text-indicator uppercase tracking-widest mb-4 opacity-80 flex items-center">
            <span className="mr-2">❖</span> About HireNest Placements
          </div>
          <h1 className="font-display-hero text-display-hero mb-6 leading-tight max-w-3xl">
            Redefining Executive Recruitment Across Borders
          </h1>
          <p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl leading-relaxed">
            Founded in 2012, HireNest Placements has grown into an elite talent acquisition partner. We serve global enterprises, high-growth startups, and exceptional leaders.
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
            <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Built on Authority, Precision, and Discretion</h2>
            <p className="text-on-surface-variant font-body-md mb-6 leading-relaxed">
              HireNest Placements began with a clear purpose: to bridge the gap between world-class organizations and the unique executive talent they require to succeed. Unlike typical transactional recruiting agencies, we position ourselves as strategic advisors, ensuring long-term cultural alignment and mutual success.
            </p>
            <p className="text-on-surface-variant font-body-md mb-6 leading-relaxed">
              Over the last decade, we have focused our operations in major industrial and technology corridors, with dedicated hubs in Lucknow, Uttar Pradesh and Ahmedabad, Gujarat. Our specialist consultants partner with organizations across key sectors, including the IT industry, construction, water treatment, logistics, finance, and real estate, delivering results with unparalleled efficiency.
            </p>
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
      <section className="py-section-padding bg-surface-container-low px-8">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-container-lowest p-10 rounded-2xl border border-outline-variant shadow-[0px_4px_20px_rgba(0,0,0,0.02)]">
              <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center mb-6 text-primary">
                <span className="material-symbols-outlined font-bold">explore</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-4">Our Mission</h3>
              <p className="text-on-surface-variant font-body-md leading-relaxed">
                To identify, attract, and align outstanding leaders with forward-thinking organizations, creating resilient partnerships that drive industrial growth, product innovation, and social progression.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-10 rounded-2xl border border-outline-variant shadow-[0px_4px_20px_rgba(0,0,0,0.02)]">
              <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center mb-6 text-primary">
                <span className="material-symbols-outlined font-bold">visibility</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-4">Our Vision</h3>
              <p className="text-on-surface-variant font-body-md leading-relaxed">
                To remain the world’s most trusted executive recruitment consultancy, setting the global standard for search methodology, candidate care, and professional integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Detailed Values */}
      <section className="py-section-padding px-8 max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <div className="font-indicator text-indicator text-secondary uppercase mb-4 tracking-wider">❖ Why Partner With Us</div>
          <h2 className="font-headline-lg text-headline-lg text-primary">The Cornerstones of HireNest Methodologies</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-surface border border-outline-variant rounded-2xl text-center">
            <div className="text-4xl text-secondary mb-4">❖</div>
            <h4 className="font-headline-sm text-headline-sm text-primary mb-3">Bespoke Strategies</h4>
            <p className="text-on-surface-variant font-body-md">We do not believe in automated mass mailing. Every placement starts with an in-depth alignment session, resulting in a custom recruitment map for your search.</p>
          </div>
          <div className="p-8 bg-surface border border-outline-variant rounded-2xl text-center">
            <div className="text-4xl text-secondary mb-4">❖</div>
            <h4 className="font-headline-sm text-headline-sm text-primary mb-3">Absolute Discretion</h4>
            <p className="text-on-surface-variant font-body-md">Sourcing leaders in competitive industries requires trust. We protect corporate plans and candidates’ current standing with maximum confidentiality protocols.</p>
          </div>
          <div className="p-8 bg-surface border border-outline-variant rounded-2xl text-center">
            <div className="text-4xl text-secondary mb-4">❖</div>
            <h4 className="font-headline-sm text-headline-sm text-primary mb-3">Guaranteed Placements</h4>
            <p className="text-on-surface-variant font-body-md">We trust our assessment methods. If a candidate leaves your organization within the first 12 months, we carry out a replacement search with zero added consultancy fees.</p>
          </div>
        </div>
      </section>

      {/* CTA Button Block */}
      <section className="bg-primary-container text-on-primary py-16 px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="font-headline-lg text-headline-lg mb-6 text-white">Join Our Elite Leadership Network</h3>
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
