import React, { useEffect, useState, useCallback } from 'react';
import { QuestionSectionProps } from '@/types/questionsectionprops';
import { Mic, WebcamIcon } from 'lucide-react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from "sonner"
import { chatSession } from '@/utils/Aimod';
import { InterviewData } from '@/types/interviewdata';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

interface RecordAnswerSectionProps extends QuestionSectionProps {
    interviewData: InterviewData
}

function RecordAnswerSection({ interviewQuestions, activeindex, interviewData }: RecordAnswerSectionProps) {
    const [userAnswer, setUserAnswer] = useState('');
    const [isloading, setIsloading] = useState(false);
    const { user } = useUser();

    const {
        error,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });

    useEffect(() => {
        results.forEach((result) => {
            // @ts-expect-error (Expecting an issue if the next line has type issues)
            setUserAnswer(prevAns => prevAns + result?.transcript);
        });
    }, [results]);

    // Memoized function to avoid recreating during re-renders
    const UpdateUserAnswer = useCallback(async () => {
        setIsloading(true);
        const feedbackprompt = `Question:${interviewQuestions[activeindex]?.question},
                                User Answer:${userAnswer}, Depends on question and user answer for give interview question please give us rating for answer and feedback as area of improvement if any
                                in just 3 to 5 lines to improve it in JSON format with rating field and feedback field`;

        const result = await chatSession.sendMessage(feedbackprompt);
        const feedbackresp = (await result.response.text()).replace('```json', '').replace('```', '');
        console.log(feedbackresp);
        const Jsonfeedback = JSON.parse(feedbackresp);

        const resp = await db.insert(UserAnswer).values({
            mockIdRef: interviewData?.mockId,
            question: interviewQuestions[activeindex]?.question,
            correctAns: interviewQuestions[activeindex]?.answer,
            userAns: userAnswer,
            feedback: Jsonfeedback?.feedback,
            rating: Jsonfeedback?.rating,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        });

        if (resp) {
            toast.success("Answer Saved Successfully");
        }

        setUserAnswer('');
        setResults([]);
        setIsloading(false);
    }, [interviewQuestions, activeindex, userAnswer, user?.primaryEmailAddress?.emailAddress, interviewData?.mockId, setResults]);

    useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
            UpdateUserAnswer();
        }
    }, [isRecording, userAnswer, UpdateUserAnswer]);

    const saveuseranswer = async () => {
        if (isRecording) {
            stopSpeechToText();
        } else {
            startSpeechToText();
        }
    };

    return (
        <div>
            <div className="flex flex-col mt-20 justify-center items-center bg-secondary rounded-lg p-10 relative">
                <WebcamIcon className="h-72 w-72 absolute text-black bg-gray-100 p-10 rounded-lg mb-4" />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10,
                    }}
                />
            </div>

            <Button className="mt-10" disabled={isloading} onClick={saveuseranswer}>
                {isRecording ? (
                    <h2 className="text-red-600 flex gap-2">
                        <Mic /> Stop Recording
                    </h2>
                ) : (
                    'Record Answer'
                )}
            </Button>

            {error && <p className="text-red-500 mt-4">Error: {error}</p>}
        </div>
    );
}

export default RecordAnswerSection;
