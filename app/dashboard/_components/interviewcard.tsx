import React from 'react'
import { InterviewData } from '@/types/interviewdata'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function InterViewCard({ interview }: { interview: InterviewData }) {
  const router = useRouter();

  const handleFeedback = () => {
    router.push(`/dashboard/interviews/${interview?.mockId}/feedback`)
  }
  const handleStartInterview = () => {
    router.push(`/dashboard/interviews/${interview?.mockId}`)
  }

  return (
    <div className='border shadow-sm rounded-lg p-3'>
      <h2 className='font-bold text-blue-700'>{interview?.jobPosition}</h2>
      <h2 className='text-sm text-gray-800'>{interview?.jobExperience} Years of Experience</h2>
      <h2 className='text-xs text-gray-400'>Created At: {interview?.createdAt}</h2>
      
      <div className='flex justify-between mt-2 gap-5'>
        <Button variant="outline" size="sm" className='w-full' onClick={handleFeedback}>Feedback</Button>
        <Button size="sm" className='w-full' onClick={handleStartInterview}>Start Interview</Button>
      </div>

    </div>


  )
}

export default InterViewCard
