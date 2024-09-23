"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { MockInterview } from "@/utils/schema";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { InterviewData } from "@/types/interviewdata";
import { motion } from "framer-motion";

function Interview({ params }: { params: { interviewid: string } }) {
  const [interviewData, setInterviewData] = useState<InterviewData>({} as InterviewData);
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  
  const getInterviewDetails = useCallback(async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewid));

      if (result.length > 0) {
        setInterviewData(result[0]);
      }
    } catch (error) {
      console.error("Failed to fetch interview details:", error);
    }
  }, [params.interviewid]);

  useEffect(() => {
    getInterviewDetails();
  }, [getInterviewDetails]);

  return (
    <div className="my-10 mx-5 md:mx-10 lg:mx-20 animate-fadeIn">
  <h2 className="font-extrabold text-3xl md:text-5xl text-center mb-10 text-gray-100 tracking-wide animate-pulse">
    Let&apos;s Get Started
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-6 p-8 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl shadow-2xl border border-gray-700 hover:border-gray-600 transition-transform duration-500 hover:shadow-xl"
    >
      <div className="mb-4">
        <h2 className="text-xl md:text-3xl font-semibold text-gray-300">
          <strong>Job Role/Position:</strong> {interviewData.jobPosition}
        </h2>
      </div>
      <div className="mb-4">
        <h2 className="text-xl md:text-3xl font-semibold text-gray-300">
          <strong>Job Description/Tech Stack:</strong> {interviewData.jobDesc}
        </h2>
      </div>
      <div className="mb-4">
        <h2 className="text-xl md:text-3xl font-semibold text-gray-300">
          <strong>Years of Experience:</strong> {interviewData.jobExperience}
        </h2>
      </div>

      <Alert className="border-yellow-600 bg-yellow-900/50 text-yellow-100 p-4 rounded-lg shadow-lg animate-fadeInUp">
        <div className="flex items-start">
          <Lightbulb className="mr-2 h-7 w-7 text-yellow-400 animate-pulse" />
          <div>
            <AlertTitle className="text-lg font-semibold">
              Important Information
            </AlertTitle>
            <AlertDescription className="text-sm">
              Enable webcam and microphone for an AI-generated mock interview.
              No video will be recorded. You can disable the webcam anytime.
              Receive a report on your answers at the end of the session.
            </AlertDescription>
          </div>
        </div>
      </Alert>
    </motion.div>

    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center p-8 bg-gray-900 rounded-xl shadow-lg border border-gray-700 transition-transform duration-500 hover:shadow-xl"
    >
      {webcamEnabled ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Webcam
            onUserMedia={() => console.log("Webcam enabled")}
            onUserMediaError={() => setWebcamEnabled(false)}
            mirrored={true}
            style={{
              height: 320,
              width: 320,
              borderRadius: "16px",
              border: "3px solid #666",
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex flex-col items-center"
        >
          <WebcamIcon className="h-72 w-72 text-gray-500 bg-gray-700 p-10 rounded-lg border border-gray-600 mb-4" />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={() => setWebcamEnabled(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-lg transition-all duration-300"
          >
            Enable Webcam
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  </div>

  <div className="flex justify-center mt-12">
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/dashboard/interviews/${params.interviewid}/start`}>
        <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-md shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out">
          Start Interview
        </Button>
      </Link>
    </motion.div>
  </div>
</div>

  );
}

export default Interview;
