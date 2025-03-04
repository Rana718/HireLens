"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import QuizResult from "./QuizResult";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { Assessment } from "@/types";

// Define the structure for each generated quiz question.
interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [answers, setAnswers] = useState<(string | null)[]>([]);
    const [showExplanation, setShowExplanation] = useState<boolean>(false);

    const {
        loading: generatingQuiz,
        fn: generateQuizFn,
        data: quizData,
    } = useFetch<QuizQuestion[], []>(generateQuiz);

    const {
        loading: savingResult,
        fn: saveQuizResultFn,
        data: resultData,
        setData: setResultData,
    } = useFetch<Assessment, [QuizQuestion[], string[], number]>(saveQuizResult);

    useEffect(() => {
        if (quizData && quizData.length > 0) {
            setAnswers(new Array(quizData.length).fill(null));
        }
    }, [quizData]);

    const handleAnswer = (answer: string) => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[currentQuestion] = answer;
            return updatedAnswers;
        });
    };

    const handleNext = () => {
        if (currentQuestion < (quizData?.length || 0) - 1) {
            setCurrentQuestion((prev) => prev + 1);
            setShowExplanation(false);
        } else {
            finishQuiz();
        }
    };

    const calculateScore = (): number => {
        if (!quizData) return 0;
        const correctAnswers = answers.filter(
            (answer, index) => answer === quizData[index].correctAnswer
        ).length;
        return (correctAnswers / quizData.length) * 100;
    };

    const finishQuiz = async () => {
        if (!quizData) return;
        const score = calculateScore();
        try {
            const validAnswers = answers.filter((answer): answer is string => answer !== null);
            await saveQuizResultFn(quizData, validAnswers, score);
            toast.success("Quiz completed!");
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Failed to save quiz results"
            );
        }
    };

    const startNewQuiz = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setShowExplanation(false);
        generateQuizFn();
        setResultData(undefined);
    };

    if (generatingQuiz) {
        return <BarLoader className="mt-4" width={"100%"} color="gray" />;
    }

    if (resultData) {
        return (
            <div className="mx-2">
                <QuizResult result={resultData} onStartNew={startNewQuiz} />
            </div>
        );
    }

    if (!quizData || quizData.length === 0) {
        return (
            <Card className="mx-2">
                <CardHeader>
                    <CardTitle>Ready to test your knowledge?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        This quiz contains 10 questions specific to your industry and skills.
                        Take your time and choose the best answer for each question.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button onClick={generateQuizFn} className="w-full">
                        Start Quiz
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    const question = quizData[currentQuestion];

    return (
        <Card className="mx-2">
            <CardHeader>
                <CardTitle>
                    Question {currentQuestion + 1} of {quizData.length}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-lg font-medium">{question.question}</p>
                <RadioGroup
                    onValueChange={handleAnswer}
                    value={answers[currentQuestion] ?? ""}
                    className="space-y-2"
                >
                    {question.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`}>{option}</Label>
                        </div>
                    ))}
                </RadioGroup>

                {showExplanation && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                        <p className="font-medium">Explanation:</p>
                        <p className="text-muted-foreground">{question.explanation}</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between">
                {!showExplanation && (
                    <Button
                        onClick={() => setShowExplanation(true)}
                        variant="outline"
                        disabled={!answers[currentQuestion]}
                    >
                        Show Explanation
                    </Button>
                )}
                <Button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion] || savingResult}
                    className="ml-auto"
                >
                    {savingResult ? (
                        <BarLoader className="mt-4" width={"100%"} color="gray" />
                    ) : currentQuestion < quizData.length - 1 ? (
                        "Next Question"
                    ) : (
                        "Finish Quiz"
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}
