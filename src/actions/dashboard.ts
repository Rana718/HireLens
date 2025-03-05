"use server";

import { config } from "@/config/env";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(config.AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const generateAIInsights = async (industry: string) => {
    const prompt = `
        Analyze the current state of the ${industry} industry and output insights ONLY in the JSON format exactly matching the schema below. Do not include any additional text, markdown, or commentary.
        
        Your JSON must include:
        - A "salaryRanges" array with at least 5 objects. Each object must include:
        - "role": a string representing a common role in the industry.
        - "min": a number indicating the minimum salary.
        - "max": a number indicating the maximum salary.
        - "median": a number indicating the median salary.
        - "location": a string representing the location.
        - A "growthRate" property as a number representing the industry's growth rate in percentage.
        - A "demandLevel" property which must be one of: "High", "Medium", or "Low".
        - A "topSkills" array containing at least 5 relevant skills (strings).
        - A "marketOutlook" property which must be one of: "Positive", "Neutral", or "Negative".
        - A "keyTrends" array containing at least 5 trends (strings).
        - A "recommendedSkills" array containing at least 5 recommended skills (strings).
        
        Schema:
        {
        "salaryRanges": [
            { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
        ],
        "growthRate": number,
        "demandLevel": "High" | "Medium" | "Low",
        "topSkills": ["string", "string", "..."],
        "marketOutlook": "Positive" | "Neutral" | "Negative",
        "keyTrends": ["string", "string", "..."],
        "recommendedSkills": ["string", "string", "..."]
        }
        
        IMPORTANT: Return ONLY the JSON in the exact format above.
    `;


    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    return JSON.parse(cleanedText);
};

export async function getIndustryInsights() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
        include: {
            industryInsight: true,
        },
    });

    if (!user) throw new Error("User not found");


    if (!user.industryInsight) {
        const insights = await generateAIInsights(user.industry || "");

        const industryInsight = await db.industryInsight.create({
            data: {
                industry: user.industry,
                ...insights,
                nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });

        return industryInsight;
    }

    return user.industryInsight;
}
