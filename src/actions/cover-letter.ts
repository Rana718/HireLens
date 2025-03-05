"use server";

import { config } from "@/config/env";
import { db } from "@/lib/prisma";
import { CoverLetter } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(config.AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


export async function generateCoverLetter(data: CoverLetter) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const prompt = `
        Write a professional cover letter in markdown for the ${data.jobTitle} position at ${data.companyName}. Follow standard business letter conventions, including a clear salutation, an introductory paragraph, a detailed body, and a closing/sign-off. The letter should be no longer than 400 words.

        Candidate Details:
        - Industry: ${user.industry}
        - Years of Experience: ${user.experience}
        - Skills: ${user.skills?.join(", ") || "N/A"}
        - Professional Background: ${user.bio}

        Job Description:
        ${data.jobDescription}

        Instructions:
        1. Use a professional and enthusiastic tone.
        2. Emphasize the candidate's most relevant skills, achievements, and experiences.
        3. Demonstrate an understanding of the company's needs and how the candidate's background aligns with them.
        4. Include specific examples or achievements where possible.
        5. Maintain concise and clear language while adhering to a maximum of 400 words.
        6. Format the letter using proper markdown syntax with sections for greeting, introduction, body, and conclusion.

        Please generate the cover letter based on the above information.
    `;


    try {
        const result = await model.generateContent(prompt);
        const content = result.response.text().trim();

        const coverLetter = await db.coverLetter.create({
            data: {
                content,
                jobDescription: data.jobDescription,
                companyName: data.companyName,
                jobTitle: data.jobTitle,
                status: "completed",
                userId: user.id,
            },
        });

        return coverLetter;
    } catch (error) {
        console.error("Error generating cover letter:", error);
        throw new Error("Failed to generate cover letter");
    }
}

export async function getCoverLetters() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    return await db.coverLetter.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function getCoverLetter(id: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    return await db.coverLetter.findUnique({
        where: {
            id,
            userId: user.id,
        },
    });
}

export async function deleteCoverLetter(id: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    return await db.coverLetter.delete({
        where: {
            id,
            userId: user.id,
        },
    });
}
