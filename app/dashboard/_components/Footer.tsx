import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-xl font-semibold text-white">HireLens</h3>
          <p className="text-gray-400 mt-2">AI-Powered Mock Interviews</p>
        </div>
        <div className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} HireLens. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
