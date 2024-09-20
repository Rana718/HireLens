import React, { ReactNode } from 'react';
import Navbar from './_components/Navbar';
import { Toaster } from '@/components/ui/sonner';

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="pt-16 mx-5 md:mx-20 lg:mx-36">
        {children}
      </div>
      <Toaster />
    </div>
  );
}

export default DashboardLayout;
