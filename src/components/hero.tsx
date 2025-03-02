"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection: React.FC = () => {
   const imageRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleScroll = () => {
         const currentImage = imageRef.current;
         if (!currentImage) return;

         const scrollPosition = window.scrollY;
         const scrollThreshold = 100;

         if (scrollPosition > scrollThreshold) {
            currentImage.classList.add("scrolled");
         } else {
            currentImage.classList.remove("scrolled");
         }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   return (
      <section className="w-full pt-36 md:pt-48 pb-10 bg-gradient-to-b from-blue-50 to-blue-100">
         <div className="space-y-8 text-center px-4">
            <div className="mx-auto max-w-4xl space-y-6">
               <h1 className="text-5xl font-extrabold md:text-6xl lg:text-7xl xl:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500 animate-gradient">
                  Elevate Your Career with
                  <br />
                  AI-Powered Coaching
               </h1>
               <p className="mx-auto max-w-2xl text-lg text-gray-700 md:text-xl">
                  Unlock your potential with personalized career guidance,
                  expert interview prep, and cutting-edge AI tools. Transform
                  your professional journey and achieve lasting success.
               </p>
            </div>
            <div className="flex justify-center space-x-4">
               <Link href="/dashboard">
                  <Button size="lg" className="px-8 py-4">
                     Start Your Journey
                  </Button>
               </Link>
            </div>
            <div className="hero-image-wrapper mt-10 md:mt-0">
               <div
                  ref={imageRef}
                  className="hero-image transition-all duration-300 ease-in-out"
               >
                  <Image
                     src="/banner.jpeg"
                     width={1280}
                     height={720}
                     alt="Dashboard Preview"
                     className="rounded-xl shadow-2xl border mx-auto"
                     priority
                  />
               </div>
            </div>
         </div>
      </section>
   );
};

export default HeroSection;
