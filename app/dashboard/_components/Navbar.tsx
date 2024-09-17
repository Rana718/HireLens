"use client";
import { UserButton } from '@clerk/nextjs';
import React from 'react';
import { usePathname } from 'next/navigation';

function Navbar() {
  const path = usePathname();

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex p-4 items-center justify-between bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-700 shadow-xl animate-slideInDown">
      <span className="text-white font-extrabold text-2xl tracking-widest cursor-pointer hover:text-pink-300 transition-colors duration-300 transform hover:scale-110">
        HireLens
      </span>

      <ul className="hidden md:flex gap-8 text-white font-semibold">
        <li className={`cursor-pointer hover:text-pink-300 transition-colors duration-300 transform hover:scale-110 ${path === "/dashboard" ? "text-pink-300" : ""}`}>
          Dashboard
        </li>
        <li className={`cursor-pointer hover:text-pink-300 transition-colors duration-300 transform hover:scale-110 ${path === "/question" ? "text-pink-300" : ""}`}>
          Question
        </li>
        <li className={`cursor-pointer hover:text-pink-300 transition-colors duration-300 transform hover:scale-110 ${path === "/upgrade" ? "text-pink-300" : ""}`}>
          Upgrade
        </li>
        <li className={`cursor-pointer hover:text-pink-300 transition-colors duration-300 transform hover:scale-110 ${path === "/how-it-works" ? "text-pink-300" : ""}`}>
          How it Works?
        </li>
      </ul>

      <div className="hover:scale-110 transition-transform duration-300">
        <UserButton />
      </div>
    </div>
  );
}

export default Navbar;
