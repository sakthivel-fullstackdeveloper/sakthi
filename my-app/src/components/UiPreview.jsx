import React from 'react';

const UiPreview = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 md:px-8 space-y-10 text-black">

      {/* 1. List Example */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl w-full mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-4">MERN Stack Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>MongoDB for flexible data modeling</li>
          <li>Express.js for scalable APIs</li>
          <li>React.js for dynamic UIs</li>
          <li>Node.js for non-blocking backend</li>
        </ul>
      </div>

      {/* 2. Div Card Info */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-3xl w-full mx-auto">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">Student Information</h2>
        <p className="text-sm md:text-base">Name: Sakthi Vel</p>
        <p className="text-sm md:text-base">Department: Information Technology</p>
        <p className="text-sm md:text-base">Batch: 2025</p>
      </div>

      {/* 3. Profile Image */}
      <div className="flex justify-center">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-blue-500 shadow-md"
        />
      </div>

      {/* 4. Responsive Image with Text */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-lg shadow-md max-w-5xl w-full mx-auto">
        <img
          src="https://via.placeholder.com/250"
          alt="MERN stack"
          className="w-full md:w-1/2 rounded-lg shadow-md object-cover"
        />
        <div className="space-y-2 text-sm md:text-base">
          <h2 className="text-xl md:text-2xl font-semibold">What is MERN Stack?</h2>
          <p>MERN is a JavaScript tech stack used to build modern full-stack web apps.</p>
          <p>It combines MongoDB, Express.js, React, and Node.js in a powerful ecosystem.</p>
        </div>
      </div>

      {/* 5. Glassmorphic UI Box */}
      <div className="bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-6 max-w-3xl w-full mx-auto text-black">
        <h3 className="text-xl md:text-2xl font-semibold mb-2">Glassmorphic Box</h3>
        <p>This card has a subtle blur effect and semi-transparent background for modern UI design.</p>
      </div>
    </div>
  );
};

export default UiPreview;
