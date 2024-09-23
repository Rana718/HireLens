"use client";
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState, useCallback } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
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

    const Getfeedback = useCallback(async () => {
        const result = await db.select().from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, params.interviewid)).orderBy(UserAnswer.id);
        // @ts-expect-error: result is not typed properly from db select result
        setFeedbackList(result);
    }, [params.interviewid]);

    useEffect(() => {
        Getfeedback();
    }, [Getfeedback]);

    const handleStartInterview = () => {
        router.push(`/dashboard/interviews/${params.interviewid}`);
    };

    return (
        <div className="p-10">
            {feedbacklist?.length == 0 ? (
                <>
                    <h2 className="font-bold text-red-500 text-3xl flex items-center justify-center">No Interview result Found!!</h2>
                    <p className='pt-5 px-20'>
                        To receive your feedback, please ensure that you complete the interview first. Once you have finished, you can return to this page to view the detailed feedback regarding your performance.
                        The feedback will include insights into your strengths and areas where you can improve, providing you with a comprehensive overview of your responses. This information is essential for your growth, as it helps identify patterns in your answers and highlights specific skills that may need enhancement.
                        Completing the interview is an important step in your preparation journey, and we encourage you to take your time to showcase your abilities fully. Once you&apos;ve submitted your answers, you&apos;ll gain access to personalized feedback tailored to your performance.
                        We appreciate your effort and dedication to self-improvement. Remember, each interview is a valuable learning opportunity, so don&apos;t hesitate to dive in and give it your best shot! We look forward to seeing your progress.
                    </p>
                    <Button
                        onClick={handleStartInterview}
                        className="mr-8 mt-10 ml-20 text-xl p-5 border-2 border-transparent bg-green-700 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-green-600 hover:shadow-xl hover:ring-4 hover:ring-green-300 hover:ring-opacity-50 glow hover:glow focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        Start Interview
                    </Button>
                </>
            ) : (
                <>
                    <h2 className="text-3xl font-bold text-green-500">Congratulation!!!</h2>
                    <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
                    <h2 className="text-primary text-lg my-3">your overall interview rating: 3/5</h2>
                    <h2 className="text-sm text-gray-500">
                        Below is the interview question, correct answer, your answer, and feedback for improvement.
                    </h2>

                    {feedbacklist.map((item, index) => (
                        <Collapsible key={index} className="pt-2">
                            <CollapsibleTrigger className="p-2 bg-secondary rounded-lg flex justify-between my-2 text-left">
                                {item.question} <ChevronsDown className="w-5 h-5" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="flex flex-col gap-2">
                                    <h2 className={`p-2 border rounded-md`}>
                                        <strong>Rating: </strong>{item.rating}
                                    </h2>
                                    <h2 className={`p-2 border bg-yellow-100 rounded-md`}>
                                        <strong>Your Answer: </strong>{item.userAns}
                                    </h2>
                                    <h2 className={`p-2 border bg-green-100 rounded-md`}>
                                        <strong>Correct Answer: </strong>{item.correctAns}
                                    </h2>
                                    <h2 className={`p-2 border bg-blue-100 rounded-md`}>
                                        <strong>Feedback: </strong>{item.feedback}
                                    </h2>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </>
            )}
            <div className={`${feedbacklist?.length === 0 ? '' : 'mt-10'} flex items-end justify-end`}>
                <Button
                    onClick={() => router.replace('/dashboard')}
                    className="mr-8 mt-10 ml-20 text-xl p-5 border-2 border-transparent bg-blue-500 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-700 hover:shadow-xl hover:ring-4 hover:ring-blue-300 hover:ring-opacity-50 glowhome focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
                >
                    Go Home
                </Button>
            </div>
        </div>
    );
}

export default Feedback;
