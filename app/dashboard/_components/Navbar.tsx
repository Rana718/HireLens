"use client";
import { UserButton } from '@clerk/nextjs';
import React from 'react';
import { usePathname } from 'next/navigation';

function Navbar() {
  const path = usePathname();

  return (
    <div className='fixed top-0 left-0 w-full z-50 flex p-4 items-center justify-between bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 shadow-lg'>
      <span className='text-white font-bold text-xl tracking-wide cursor-pointer hover:text-gray-300 transition-colors duration-300'>
        HireLens
      </span>

      <ul className='hidden md:flex gap-8 text-white font-medium'>
        <li className={`cursor-pointer hover:text-yellow-400 transition-colors duration-300 ${path === "/dashboard" ? "text-yellow-400" : ""}`}>
          Dashboard
        </li>
        <li className={`cursor-pointer hover:text-yellow-400 transition-colors duration-300 ${path === "/question" ? "text-yellow-400" : ""}`}>
          Question
        </li>
        <li className={`cursor-pointer hover:text-yellow-400 transition-colors duration-300 ${path === "/upgrade" ? "text-yellow-400" : ""}`}>
          Upgrade
        </li>
        <li className={`cursor-pointer hover:text-yellow-400 transition-colors duration-300 ${path === "/how-it-works" ? "text-yellow-400" : ""}`}>
          How it Works?
        </li>
      </ul>

      <div className='hover:scale-105 transition-transform duration-300'>
        <UserButton />
      </div>
    </div>
  );
}

export default Navbar;
