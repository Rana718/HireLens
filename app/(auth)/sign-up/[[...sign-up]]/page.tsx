"use client";
import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function SignUpPage() {
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

            <motion.div
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="relative bg-[#1a1a1a]/80 p-8 rounded-2xl backdrop-blur-xl border border-[#0077FF]/30">
                    <SignUp />
                </div>
            </motion.div>
        </div>
    );
}
