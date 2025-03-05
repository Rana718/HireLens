"use server";

import { config } from "@/config/env";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(config.AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function saveResume(content: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    try {
        const resume = await db.resume.upsert({
            where: {
                userId: user.id,
            },
            update: {
                content,
            },
            create: {
                userId: user.id,
                content,
            },
        });

        revalidatePath("/resume");
        return resume;
    } catch (error) {
        console.error("Error saving resume:", error);
        throw new Error("Failed to save resume");
    }
}

export async function getResume() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    return await db.resume.findUnique({
        where: {
            userId: user.id,
        },
    });
}

export async function improveWithAI({ current, type }: { current: string; type: string }) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
        include: {
            industryInsight: true,
        },
    });

    if (!user) throw new Error("User not found");

    const prompt = `
        Act as a professional resume writer specializing in ${user.industry}. Enhance the following ${type} description to be more compelling, results-driven, and aligned with industry standards.

        Original content: "${current}"

        Guidelines:
        - Begin with strong action verbs
        - Integrate measurable results and key achievements
        - Highlight relevant technical skills and expertise
        - Keep it concise yet impactful
        - Prioritize accomplishments over duties
        - Incorporate industry-specific keywords for ATS optimization

        Format:
        Provide a single well-structured paragraph without introductions, explanations, or extra commentary.
    `;


    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const improvedContent = response.text().trim();
        return improvedContent;
    } catch (error) {
        console.error("Error improving content:", error);
        throw new Error("Failed to improve content");
    }
}
