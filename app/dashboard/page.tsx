import InterViewList from './_components/interviewlist';
import React from 'react';
import AddNewInterview from './_components/AddNewInterview';

function Dashboardpage() {
  return (
    <div className="p-10 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 min-h-screen">
      <h2 className="font-bold text-3xl text-white animate-fadeInUp">Dashboard</h2>
      <h2 className="text-gray-400 mb-4 animate-fadeInUp">Create and Start your AI Mockup Interview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5">
        <div className="transition-transform transform hover:scale-105 duration-300 animate-fadeInUp">
          <AddNewInterview />
        </div>
      </div>

      <div className="transition-opacity duration-500 ease-in-out opacity-90 hover:opacity-100 animate-fadeInUp">
        <InterViewList />
      </div>
    </div>
  );
}

export default Dashboardpage;
