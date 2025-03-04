"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection: React.FC = () => {
   const textVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
         opacity: 1,
         y: 0,
         transition: { duration: 0.8, ease: "easeOut" },
      },
   };

   const containerVariants = {
      hidden: {},
      visible: { transition: { staggerChildren: 0.3 } },
   };

   return (
      <section className="w-full pt-24 pb-10 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
         <div className="space-y-8 text-center px-4">
            <motion.div
               variants={containerVariants}
               initial="hidden"
               animate="visible"
               className="mx-auto max-w-4xl space-y-6"
            >
               <motion.h1
                  variants={textVariants}
                  className="text-5xl font-extrabold md:text-6xl lg:text-7xl xl:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500 animate-gradient"
               >
                  Empower Your Career with AI Excellence
               </motion.h1>
               <motion.p
                  variants={textVariants}
                  className="mx-auto max-w-2xl text-lg text-gray-700 md:text-xl dark:text-gray-300"
               >
                  Discover tailored industry insights, competitive salary suggestions,
                  and role-specific advice. Create your resume, craft the perfect cover
                  letter, and ace your interviews using the power of AI.
               </motion.p>
               <motion.p
                  variants={textVariants}
                  className="mx-auto max-w-2xl text-lg text-gray-700 md:text-xl dark:text-gray-300"
               >
                  Whether you're preparing for your dream job or seeking to boost your
                  career confidence, our platform offers interactive tools like mock MCQ
                  interviews and video sessions to help you shine.
               </motion.p>
            </motion.div>

            <motion.div
               variants={textVariants}
               className="flex justify-center space-x-4"
            >
               <Link href="/dashboard">
                  <Button
                     size="lg"
                     className="px-8 py-4 transition-transform duration-300 hover:scale-105"
                  >
                     Start Your Journey
                  </Button>
               </Link>

            </motion.div>
         </div>
      </section>
   );
};

export default HeroSection;
