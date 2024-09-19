"use client"
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


interface FeedbackItem {
    id: number;
    mockIdRef: string;
    question: string;
    correctAns: string;
    userAns: string;
    feedback: string;
    rating: string;
    userEmail: string;
    createdAt: string;
}


function Feedback({ params }: { params: { interviewid: string } }) {
    const [feedbacklist, setFeedbackList] = useState<FeedbackItem[]>([]);
    const router = useRouter();

    useEffect(() => {
        Getfeedback();
    }, []);

    const Getfeedback = async () => {
        const result = await db.select().from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, params.interviewid)).orderBy(UserAnswer.id);
            //@ts-expect-error
            setFeedbackList(result);
    }

    const handleStartInterview = () => {
        router.push(`/dashboard/interviews/${params.interviewid}`);
    }

    return (
        <div className='p-10'>
            {feedbacklist?.length == 0 ?
                <>
                    <h2 className='font-bold text-xl text-gray-700'>No Interview result Found!!</h2>
                    <Button onClick={handleStartInterview}>Start Interview</Button>
                </> :
                <>

                    <h2 className='text-3xl font-bold text-green-500'>Congratulation!!!</h2>
                    <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
                    <h2 className='text-primary text-lg my-3'>your overall interview rating: 3/5</h2>
                    <h2 className='text-sm text-gray-500'>Below is the interview question, correct answer, your answer, and feedback for improvement.</h2>

                    {feedbacklist && feedbacklist.map((item, index) => (
                        <Collapsible key={index} className='pt-2'>
                            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg flex justify-between my-2 text-left'>
                                {item.question} <ChevronsDown className='w-5 h-5' />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className='flex flex-col gap-2'>
                                    <h2 className={`p-2 border rounded-md`}><strong>Rating: </strong>{item.rating}</h2>
                                    <h2 className={`p-2 border bg-yellow-100 rounded-md`}><strong>Your Answer: </strong>{item.userAns}</h2>
                                    <h2 className={`p-2 border bg-green-100 rounded-md`}><strong>Correct Answer: </strong>{item.correctAns}</h2>
                                    <h2 className={`p-2 border bg-blue-100 rounded-md`}><strong>Feedback: </strong>{item.feedback}</h2>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>

                    ))}

                    
                </>
            }
            <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>


        </div>
    )
}

export default Feedback
