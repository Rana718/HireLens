"use server";

import { config } from "@/config/env";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(config.AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

interface Question {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

export async function generateQuiz(): Promise<Question[]> {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
        select: {
            industry: true,
            skills: true,
        },
    });

    if (!user) throw new Error("User not found");

    const prompt = `
        You are an AI specialized in generating technical interview questions. 

        Task: Generate 10 multiple-choice technical interview questions for a ${user.industry} professional${user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""}.  

        Requirements:  
        - Each question should have 4 answer choices.  
        - Clearly specify the correct answer.  
        - Provide a brief explanation for the correct answer.  

        Output Format (JSON only, no extra text):  

        {
        "questions": [
            {
            "question": "string",
            "options": ["string", "string", "string", "string"],
            "correctAnswer": "string",
            "explanation": "string"
            }
        ]
        }

        Important:  
        - Strictly follow the JSON structure above.  
        - Do not include any additional text, descriptions, or formatting outside the JSON response.  
    `;



    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text().trim();
        const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
        const quiz = JSON.parse(cleanedText);

        return quiz.questions;
    } catch (error) {
        console.error("Error generating quiz:", error);
        throw new Error("Failed to generate quiz questions");
    }
}

export async function saveQuizResult(
    questions: Question[],
    answers: string[],
    score: number
) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const questionResults = questions.map((q, index) => ({
        question: q.question,
        answer: q.correctAnswer,
        userAnswer: answers[index],
        isCorrect: q.correctAnswer === answers[index],
        explanation: q.explanation,
    }));

    const wrongAnswers = questionResults.filter((q) => !q.isCorrect);

    let improvementTip: string | null = null;
    if (wrongAnswers.length > 0) {
        const wrongQuestionsText = wrongAnswers
            .map(
                (q) =>
                    `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
            )
            .join("\n\n");

        const improvementPrompt = `
            You are an AI assistant providing constructive feedback for a technical interview.  
            
            Context:  
            The user answered the following ${user.industry} technical interview questions incorrectly:  
            
            ${wrongQuestionsText}  
            
            Task:  
            - Analyze the mistakes and identify knowledge gaps.  
            - Provide a concise and encouraging improvement tip.  
            - Do not explicitly mention the mistakes. Instead, focus on what the user should learn or practice to improve.  
            - Keep the response under 2 sentences and ensure it is motivational.  
            
            Example Response Format:  
            "A deeper understanding of [concept] will help strengthen your knowledge in this area. Reviewing [related topic] can further improve your skills."  
        `;



        try {
            const tipResult = await model.generateContent(improvementPrompt);
            improvementTip = tipResult.response.text().trim();
        } catch (error) {
            console.error("Error generating improvement tip:", error);
        }
    }

    try {
        const assessment = await db.assessment.create({
            data: {
                userId: user.id,
                quizScore: score,
                questions: questionResults,
                category: "Technical",
                improvementTip,
            },
        });

        return assessment;
    } catch (error) {
        console.error("Error saving quiz result:", error);
        throw new Error("Failed to save quiz result");
    }
}

export async function getAssessments() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    try {
        const assessments = await db.assessment.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        return assessments;
    } catch (error) {
        console.error("Error fetching assessments:", error);
        throw new Error("Failed to fetch assessments");
    }
}
