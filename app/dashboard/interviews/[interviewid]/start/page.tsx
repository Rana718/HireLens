"use client";
import React, { useState, useEffect } from 'react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { InterviewData } from '@/types/interviewdata';
import QuestionSection from './_components/questionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({ params }: { params: { interviewid: string } }) {
  const [interviewData, setInterviewData] = useState<InterviewData>({} as InterviewData);
  const [interviewQuestions, setInterviewQuestions] = useState<{ question: string; answer: string }[]>([]);
  const [activeQuestion, setActiveQuestion] = useState(0);

  useEffect(() => {
    const GetInterviewDetails = async () => {
      const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewid));
      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      console.log(jsonMockResp);
      setInterviewData(result[0]);
      setInterviewQuestions(jsonMockResp);
    };

    GetInterviewDetails();
  }, [params.interviewid]);

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <QuestionSection interviewQuestions={interviewQuestions} activeindex={activeQuestion} setActiveQuestion={setActiveQuestion}/>
        <RecordAnswerSection interviewQuestions={interviewQuestions} activeindex={activeQuestion} interviewData={interviewData} />
      </div>

      <div className='flex justify-end gap-6 mb-10'>
        {activeQuestion > 0 && <Button onClick={() => setActiveQuestion(activeQuestion - 1)}>Previous Question</Button>}
        {activeQuestion !== interviewQuestions.length - 1 && (
          <Button onClick={() => setActiveQuestion(activeQuestion + 1)}>Next Question</Button>
        )}
        {activeQuestion === interviewQuestions.length - 1 && (
          <Link href={`/dashboard/interviews/${interviewData.mockId}/feedback`}>
            <Button>Submit</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
