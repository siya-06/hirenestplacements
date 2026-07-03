import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer class="bg-tertiary text-on-tertiary py-section-padding">
      <div class="max-w-container-max mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div class="col-span-1 md:col-span-1">
          <div class="font-headline-sm text-headline-sm text-secondary-fixed mb-6">HireNest Placements</div>
          <p class="text-on-tertiary-container font-body-md mb-6 leading-relaxed">
            The premium bridge between elite talent and global opportunity. Founded in 2012, driven by precision.
          </p>
          <div class="flex gap-4">
            <a class="w-10 h-10 rounded-full border border-on-tertiary-container flex items-center justify-center hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors" href="#" aria-label="Social Link Website"><span class="material-symbols-outlined text-[20px]">public</span></a>
            <a class="w-10 h-10 rounded-full border border-on-tertiary-container flex items-center justify-center hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors" href="#" aria-label="Social Link Email"><span class="material-symbols-outlined text-[20px]">alternate_email</span></a>
          </div>
        </div>
        <div>
          <h4 class="font-label-md text-label-md text-secondary-fixed mb-6 uppercase tracking-wider">Quick Links</h4>
          <ul class="space-y-4">
            <li><Link class="text-on-tertiary-container hover:text-secondary-container transition-colors" to="/">Home</Link></li>
            <li><Link class="text-on-tertiary-container hover:text-secondary-container transition-colors" to="/about">About Us</Link></li>
            <li><Link class="text-on-tertiary-container hover:text-secondary-container transition-colors" to="/jobs">Current Openings</Link></li>
            <li><Link class="text-on-tertiary-container hover:text-secondary-container transition-colors" to="/submit-resume">Submit Resume</Link></li>
          </ul>
        </div>
        <div>
          <h4 class="font-label-md text-label-md text-secondary-fixed mb-6 uppercase tracking-wider">Company</h4>
          <ul class="space-y-4">
            <li><Link class="text-on-tertiary-container hover:text-secondary-container transition-colors" to="/about">Why Choose Us</Link></li>
            <li><Link class="text-on-tertiary-container hover:text-secondary-container transition-colors" to="/contact">Contact Info</Link></li>
            <li><Link class="text-on-tertiary-container hover:text-secondary-container transition-colors" to="/admin">Admin Portal</Link></li>
            <li><a class="text-on-tertiary-container hover:text-secondary-container transition-colors" href="#">Privacy Policy</a></li>
            <li><a class="text-on-tertiary-container hover:text-secondary-container transition-colors" href="#">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-label-md text-label-md text-secondary-fixed mb-6 uppercase tracking-wider">Contact</h4>
          <p class="text-on-tertiary-container font-body-md mb-2">Mayfair Executive Suites</p>
          <p class="text-on-tertiary-container font-body-md mb-6">London, W1J 7JZ, UK</p>
          <a class="text-secondary-fixed font-bold block mb-2 underline underline-offset-4" href="mailto:contact@hirenest.com">contact@hirenest.com</a>
          <p class="text-on-tertiary-container font-body-md">+44 (0) 20 7946 0123</p>
        </div>
      </div>
      <div class="max-w-container-max mx-auto px-8 mt-section-padding pt-8 border-t border-on-tertiary-container/20 text-center">
        <p class="text-on-tertiary-container font-body-md">
          © {new Date().getFullYear()} HireNest Placements. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
