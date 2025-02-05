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
    <div className="min-h-screen bg-[#111111] text-[#E0E0E0] flex flex-col justify-center items-center px-4 text-center relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,119,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,119,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px]"></div>

      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <div className="w-full h-full bg-gradient-to-r from-[#0077FF]/20 via-[#8A2BE2]/20 to-[#00FF85]/20"></div>
      </motion.div>

      <motion.h1
        className="text-6xl sm:text-7xl font-bold text-[#0077FF] my-6 relative"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        AI Interview
        <span className="absolute -top-2 -right-10 text-[#00FF85] text-xl">Beta</span>
      </motion.h1>

      <motion.p
        className="text-xl sm:text-2xl mb-12 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Level up your interview game with <span className="text-[#00FF85]">AI-powered</span> mock interviews
      </motion.p>

      {/* Feature Cards */}
      <motion.div
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-12 max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {[
          { icon: "💼", title: "Realistic Scenarios", desc: "Industry-standard simulations" },
          { icon: "🧠", title: "AI-Driven Feedback", desc: "Real-time performance analysis" },
          { icon: "⏱️", title: "Time-Sensitive Tasks", desc: "Pressure-tested environments" },
          { icon: "📊", title: "Performance Tracking", desc: "Detailed progress metrics" }
        ].map((item, index) => (
          <motion.div
            key={index}
            className="bg-[#111111]/50 backdrop-blur-lg border border-[#0077FF]/30 rounded-xl p-6 hover:border-[#00FF85]/50 transition-all duration-300"
            whileHover={{ scale: 1.05, borderColor: '#00FF85' }}
          >
            <div className="text-3xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-[#0077FF] mb-2">{item.title}</h3>
            <p className="text-[#E0E0E0]/80">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* New Pricing Cards */}
      <motion.div
        className="grid gap-8 sm:grid-cols-3 mb-12 max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        {[
          { title: "Basic", price: "Free", features: ["3 Mock Interviews", "Basic Feedback", "Limited Questions"] },
          { title: "Pro", price: "$29", features: ["Unlimited Interviews", "Advanced Analytics", "Custom Scenarios"] },
          { title: "Enterprise", price: "Custom", features: ["Team Management", "API Access", "Custom Integration"] }
        ].map((plan, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-b from-[#111111] to-[#0077FF]/10 border border-[#0077FF]/30 rounded-xl p-8"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-bold text-[#0077FF] mb-4">{plan.title}</h3>
            <div className="text-4xl font-bold mb-6 text-[#00FF85]">{plan.price}</div>
            <ul className="text-left space-y-4">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="text-[#00FF85] mr-2">✓</span> {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <Button
          onClick={handleStart}
          className="bg-[#0077FF] hover:bg-[#0077FF]/80 text-white font-bold py-4 px-8 rounded-lg text-xl relative overflow-hidden group"
        >
          <span className="relative z-10">Start Now</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00FF85] to-[#8A2BE2] opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
        </Button>
      </motion.div>

      <motion.p
        className="text-sm text-[#E0E0E0]/60 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        Powered by advanced AI technology to help you succeed
      </motion.p>
    </div>
  );
}
