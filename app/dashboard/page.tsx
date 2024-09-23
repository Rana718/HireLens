import InterViewList from './_components/interviewlist';
import React from 'react';
import AddNewInterview from './_components/AddNewInterview';

function Dashboardpage() {
  return (
    <div className="p-10 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 min-h-screen rounded-2xl">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-10">
          <h2 className="font-extrabold text-4xl text-white tracking-wide animate-fadeInUp">
            Dashboard
          </h2>
          <p className="text-gray-400 mt-3 text-lg animate-fadeInUp">
            Create and Start your AI Mockup Interview
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="transform hover:scale-105 duration-300 transition-opacity rounded-lg p-6 animate-fadeInUp">
            <AddNewInterview />
          </div>
        </div>

        
        <div className="transition-opacity duration-700 ease-in-out opacity-90 hover:opacity-100 animate-fadeInUp">
          <InterViewList />
        </div>
      </div>
    </div>
  );
}

export default Dashboardpage;
