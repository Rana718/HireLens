import React from 'react';
import { InterviewData } from '@/types/interviewdata';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function InterViewCard({ interview }: { interview: InterviewData }) {
  const router = useRouter();

  const handleFeedback = () => {
    router.push(`/dashboard/interviews/${interview?.mockId}/feedback`);
  };

  const handleStartInterview = () => {
    router.push(`/dashboard/interviews/${interview?.mockId}`);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
      <h2 className="font-semibold text-lg text-white">{interview?.jobPosition}</h2>
      <p className="text-sm text-gray-300">{interview?.jobExperience} Years of Experience</p>
      <p className="text-xs text-gray-400 mt-1">Created At: {interview?.createdAt}</p>

      <div className="flex justify-between mt-4 space-x-3">
        <Button
          variant="outline"
          size="sm"
          className="w-full bg-yellow-400 border-gray-500 text-white font-bold hover:bg-gray-600 hover:text-white transition-colors"
          onClick={handleFeedback}
        >
          Feedback
        </Button>
        <Button
          size="sm"
          className="w-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
          onClick={handleStartInterview}
        >
          Start Interview
        </Button>
      </div>
    </div>
  );
}

export default InterViewCard;
