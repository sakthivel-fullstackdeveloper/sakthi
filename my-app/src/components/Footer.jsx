import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-gray-700 text-sm">
        <p>&copy; {new Date().getFullYear()} Sakthi Vel | All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">LinkedIn</a>
          <a href="mailto:sakthi@example.com" className="hover:text-blue-600">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
