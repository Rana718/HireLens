"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Page() {
  const router = useRouter();

  const handleStart = () => {
    router.replace('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 via-indigo-900 to-black flex flex-col justify-center items-center px-4 text-center">
      
      <motion.h1
        className="text-5xl sm:text-6xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to AI Interview
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl text-gray-300 mb-12 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Start your journey with AI-powered mock interviews. Boost your confidence and sharpen your skills by receiving feedback on your interview performance. Let AI prepare you for your dream job!
      </motion.p>

      
      <motion.div
        className="grid gap-6 sm:grid-cols-2 mb-8 text-left max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div>
          <h3 className="text-xl font-semibold text-white">💼 Realistic Scenarios</h3>
          <p className="text-gray-400 mt-2">
            Experience industry-standard questions and scenarios designed to simulate real interview settings.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">🧠 AI-Driven Feedback</h3>
          <p className="text-gray-400 mt-2">
            Get detailed insights and recommendations to improve your answers and delivery.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">⏱️ Time-Sensitive Tasks</h3>
          <p className="text-gray-400 mt-2">
            Practice completing tasks within time constraints to simulate the pressure of real interviews.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">📊 Performance Analysis</h3>
          <p className="text-gray-400 mt-2">
            Track your performance over time to see how much you've improved with each session.
          </p>
        </div>
      </motion.div>

      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <Button
          onClick={handleStart}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105"
        >
          Start Now
        </Button>
      </motion.div>

      
      <motion.p
        className="text-sm text-gray-500 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        Unlock your full potential and ace your next interview with AI guidance.
      </motion.p>
    </div>
  );
}
