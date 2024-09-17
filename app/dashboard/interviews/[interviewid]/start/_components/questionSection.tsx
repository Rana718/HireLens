import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Volume2 } from "lucide-react";
import { QuestionSectionProps } from '@/types/questionsectionprops';


function QuestionSection({ interviewQuestions, activeindex }: QuestionSectionProps) {
    const textToSpeech = (text: string) => {
        if('speechSynthesis' in window){
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }else{
            alert('Your browser does not support speech synthesis');
        }
    }
    
    return interviewQuestions && (
        <div className="p-5 border rounded-lg my-10">
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {interviewQuestions.map((question, index) => (
                    <div key={index}>
                        <h2
                            className={`p-2 text-center text-xs md:text-sm cursor-pointer bg-secondary rounded-full
                                        ${index === activeindex ? 'bg-blue-700 text-white' : 'bg-secondary text-black'}`}
                        >
                            Question #{index + 1}
                        </h2>
                        
                    </div>
                ))}
            </div>

            <h2 className='my-5 text-md md:text-lg'>{interviewQuestions[activeindex]?.question}</h2>
            <Volume2 className='cursor-pointer' onClick={()=>textToSpeech(interviewQuestions[activeindex]?.question)}/>

            <Alert className="mt-20 border-blue-700 bg-blue-200 text-blue-700 p-4 rounded-md shadow-sm">
                <div className="flex items-center space-x-1">
                    <Lightbulb className="h-6 w-6 text-blue-700" />
                    <AlertTitle className="text-lg font-medium">Note:</AlertTitle>
                </div>
                <AlertDescription className="text-sm">
                    Click 'Record Answer' to respond. After the interview, you'll receive feedback with the correct answers and a comparison of your answers.
                </AlertDescription>
                
            </Alert>
        </div>
    );
}

export default QuestionSection;
