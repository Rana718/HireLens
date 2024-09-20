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

function Interview({ params }: { params: { interviewid: string } }) {
  const [interviewData, setInterviewData] = useState<InterviewData>({} as InterviewData);
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  // Memoize getInterviewDetails to prevent re-rendering when it's not needed
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
    <div className="my-10 mx-5 md:mx-10 lg:mx-20">
      {/* Escape the single quote to prevent react/no-unescaped-entities warning */}
      <h2 className="font-bold text-3xl md:text-4xl text-center mb-8 text-white">Let&apos;s Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-lg border border-gray-300">
          <div className="mb-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
              <strong>Job Role/Job Position:</strong> {interviewData.jobPosition}
            </h2>
          </div>
          <div className="mb-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
              <strong>Job Description/Tech Stack:</strong> {interviewData.jobDesc}
            </h2>
          </div>
          <div className="mb-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
              <strong>Years of Experience:</strong> {interviewData.jobExperience}
            </h2>
          </div>

          <Alert className="border-yellow-500 bg-yellow-100 text-yellow-800 p-4 rounded-md shadow-sm">
            <div className="flex items-start">
              <Lightbulb className="mr-2 h-6 w-6 text-yellow-600" />
              <div>
                <AlertTitle className="text-lg font-medium">Information</AlertTitle>
                <AlertDescription className="text-sm">
                  Enable webcam and microphone for an AI-generated mock interview. No video will be recorded, and you can disable the webcam anytime. Receive a report on your answers at the end of the session.
                </AlertDescription>
              </div>
            </div>
          </Alert>
        </div>

        <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg shadow-md border border-gray-200">
          {webcamEnabled ? (
            <Webcam
              onUserMedia={() => console.log("Webcam enabled")}
              onUserMediaError={() => setWebcamEnabled(false)}
              mirrored={true}
              style={{ height: 300, width: 300, borderRadius: "8px", border: "2px solid #ddd" }}
            />
          ) : (
            <div className="flex flex-col items-center">
              <WebcamIcon className="h-72 w-72 text-gray-500 bg-gray-100 p-10 rounded-lg border border-gray-300 mb-4" />
              <Button
                onClick={() => setWebcamEnabled(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-sm transition duration-300"
              >
                Enable Webcam
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Link href={`/dashboard/interviews/${params.interviewid}/start`}>
          <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow-md transition duration-300">
            Start Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
