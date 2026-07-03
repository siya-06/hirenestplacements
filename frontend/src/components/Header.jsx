import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "font-label-md text-label-md text-primary border-b-2 border-primary pb-1 transition-colors active:scale-95 duration-150"
      : "font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors active:scale-95 duration-150";

  const mobileLinkClass = ({ isActive }) =>
    isActive
      ? "block font-label-md text-label-md text-primary border-l-4 border-primary pl-3 py-2 bg-primary-fixed/20"
      : "block font-label-md text-label-md text-on-surface-variant hover:text-primary pl-3 py-2";

  return (
    <header class="bg-surface sticky top-0 z-50 border-b border-outline-variant">
      <div class="flex justify-between items-center h-20 px-8 max-w-container-max mx-auto">
        <Link to="/" class="font-headline-md text-headline-md font-bold text-primary hover:opacity-90">
          HireNest Placements
        </Link>
        
        {/* Desktop Nav */}
        <nav class="hidden md:flex items-center space-x-8">
          <NavLink to="/" className={linkClass} end>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About Us</NavLink>
          <NavLink to="/jobs" className={linkClass}>Current Openings</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          <NavLink to="/submit-resume" className={linkClass}>Submit Resume</NavLink>
        </nav>

        <div class="flex items-center gap-4">
          <Link to="/submit-resume" class="hidden lg:flex px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md hover:opacity-90 transition-all active:scale-95">
            Apply Now
          </Link>
          <button onClick={toggleMenu} class="md:hidden flex items-center focus:outline-none">
            <span class="material-symbols-outlined text-primary text-[28px]">
              {isOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div class="md:hidden bg-surface border-b border-outline-variant px-8 py-4 space-y-3 transition-all duration-300">
          <NavLink to="/" onClick={toggleMenu} className={mobileLinkClass} end>Home</NavLink>
          <NavLink to="/about" onClick={toggleMenu} className={mobileLinkClass}>About Us</NavLink>
          <NavLink to="/jobs" onClick={toggleMenu} className={mobileLinkClass}>Current Openings</NavLink>
          <NavLink to="/contact" onClick={toggleMenu} className={mobileLinkClass}>Contact</NavLink>
          <NavLink to="/submit-resume" onClick={toggleMenu} className={mobileLinkClass}>Submit Resume</NavLink>
          <Link 
            to="/submit-resume" 
            onClick={toggleMenu} 
            class="block text-center w-full px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md hover:opacity-90 transition-all"
          >
            Apply Now
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
