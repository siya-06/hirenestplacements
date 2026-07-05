import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Job from '../models/Job.js';
import connectDB from '../config/db.js';

dotenv.config();

const sampleJobs = [
  {
    title: 'Senior Software Architect',
    company: 'IT Industry',
    location: 'Lucknow, Uttar Pradesh',
    experience: '8+ Years',
    description: 'Lead the design of complex enterprise architectures, driving standard practices and aligning development teams. Requires deep knowledge of distributed systems, cloud design patterns, and high-performance applications.',
    requirements: [
      '8+ Years of software architecture design experience',
      'Mastery of Node.js, React, and cloud systems (AWS/GCP)',
      'Hands-on experience with high-scale distributed systems and DB sharding',
      'Strong communication and technical mentoring skills'
    ],
    responsibilities: [
      'Establish modern software engineering guidelines across developers',
      'Lead architectural design of next-generation distributed portals',
      'Mentor senior developers and conduct technical design reviews',
      'Design scaling solutions for MongoDB clusters'
    ],
    benefits: [
      'Highly competitive equity package',
      'Generous remote stipend for home equipment',
      'Comprehensive corporate private medical care',
      'Annual personal educational budget of ₹5,00,000'
    ],
    active: true
  },
  {
    title: 'VP of Talent Operations',
    company: 'Logistics Sector',
    location: 'Ahmedabad, Gujarat',
    experience: '10+ Years',
    description: 'Oversee and design talent sourcing, recruiter alignment, and retention strategies. Perfect for a senior professional looking to scaling recruitment teams and implement state-of-the-art hiring workflows.',
    requirements: [
      '10+ Years leading executive recruitment or talent operations',
      'Experience building and scaling globally distributed recruiting teams',
      'Deep knowledge of ATS platforms, metrics analytics, and HR compliance',
      'Strong leadership footprint and brand ambassador capabilities'
    ],
    responsibilities: [
      'Orchestrate global recruitment processes and metrics strategy',
      'Define recruiter quotas, performance incentives, and OKRs',
      'Manage corporate branding and global candidate pipeline',
      'Advise senior C-suite leadership on retention policies'
    ],
    benefits: [
      'Executive bonus structure (up to 30% of base)',
      'Unlimited Paid Time Off (PTO)',
      'Fully comprehensive healthcare coverage',
      'Corporate office access in major hubs'
    ],
    active: true
  },
  {
    title: 'Creative Director',
    company: 'Finance & Insurance',
    location: 'Lucknow, Uttar Pradesh',
    experience: '6+ Years',
    description: 'Lead design directives across marketing and product design. Work with key project leads to develop visual brand guidelines, manage content outputs, and orchestrate compelling visual strategies.',
    requirements: [
      '6+ Years managing high-end design or creative direction roles',
      'Stellar portfolio demonstrating digital product design and branding',
      'Proficiency in Figma, Adobe Creative Suite, and modern design frameworks',
      'Experience managing agile creative teams of 5+ designers'
    ],
    responsibilities: [
      'Drive visual brand style guides and digital product aesthetics',
      'Lead design teams in executing campaigns and marketing visuals',
      'Collaborate with product management to define UX styles',
      'Manage visual consistency across web, print, and video assets'
    ],
    benefits: [
      'Competitive contract structure',
      'Flexible hybrid schedule (1 day/week office standard)',
      'High-end corporate hardware setup (MacBook Pro + Studio Display)',
      'Invitation to design networking events'
    ],
    active: true
  }
];

const seedData = async () => {
  try {
    await connectDB();

    // Clear any existing jobs in database
    await Job.deleteMany({});
    console.log('Cleared any pre-existing jobs from the database.');

    // Insert the mock jobs
    const createdJobs = await Job.insertMany(sampleJobs);
    console.log(`Seeded ${createdJobs.length} jobs into the database successfully.`);

    process.exit(0);
  } catch (error) {
    console.error(`Error during seeding: ${error.message}`);
    process.exit(1);
  }
};

seedData();
