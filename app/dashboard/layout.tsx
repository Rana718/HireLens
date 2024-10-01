import React, { ReactNode } from 'react';
import Navbar from './_components/Navbar';
import { Toaster } from '@/components/ui/sonner';

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-blue-800 text-white">
      <Navbar />
      <div className="flex-grow pt-20 px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 pb-5">
        {children}
      </div>
      <Toaster />
    </div>
  );
}

export default DashboardLayout;
