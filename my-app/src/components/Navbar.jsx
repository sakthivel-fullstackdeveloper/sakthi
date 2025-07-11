import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Optional if using React Router

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold text-blue-600">MyDashboard</div>

        <div className="hidden md:flex gap-6 text-black font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/projects" className="hover:text-blue-600">Projects</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-black font-medium">
          <Link to="/" className="block hover:text-blue-600">Home</Link>
          <Link to="/about" className="block hover:text-blue-600">About</Link>
          <Link to="/projects" className="block hover:text-blue-600">Projects</Link>
          <Link to="/contact" className="block hover:text-blue-600">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
