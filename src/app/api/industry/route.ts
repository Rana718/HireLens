import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function GET() {
    try {
        const industries = await db.industryInsight.findMany({
            select: { industry: true },
        });

        for (const { industry } of industries) {
            const prompt = `
                Provide an in-depth analysis of the current state of the ${industry} industry. 
                Your response must be formatted strictly as a valid JSON object without any additional text, explanations, or markdown formatting.

                The JSON should follow this structure:
                {
                    "salaryRanges": [
                    { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
                    ],
                    "growthRate": number, // Growth rate as a percentage (e.g., 4.5)
                    "demandLevel": "High" | "Medium" | "Low", // Indicate the current demand level
                    "topSkills": ["string", "string", "string", "string", "string"], // List at least 5 key skills in demand
                    "marketOutlook": "Positive" | "Neutral" | "Negative", // Overall industry outlook
                    "keyTrends": ["string", "string", "string", "string", "string"], // Provide at least 5 emerging trends
                    "recommendedSkills": ["string", "string", "string", "string", "string"] // Suggest at least 5 skills for career growth
                }

                Guidelines:
                - Ensure the "salaryRanges" section includes at least 5 common job roles with realistic salary data.
                - The "growthRate" should be a valid percentage reflecting industry expansion or contraction.
                - The "demandLevel" should reflect hiring trends based on industry needs.
                - The "marketOutlook" should indicate whether the industry is expected to grow, remain stable, or decline.
                - The "keyTrends" should highlight important technological advancements, regulatory changes, or major shifts in the industry.
                - The "recommendedSkills" should include technical and soft skills beneficial for career growth.

                Return ONLY the JSON output. No additional explanations, notes, or markdown formatting.
            `;


            const res = await model.generateContent(prompt);
            const text = res.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
            const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
            const insights = JSON.parse(cleanedText);

            await db.industryInsight.update({
                where: { industry },
                data: {
                    ...insights,
                    lastUpdated: new Date(),
                    nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                },
            });
        }

        return NextResponse.json({ message: "Industry insights updated successfully" });
    } catch (error) {
        console.error("Error updating industry insights:", error);
        return NextResponse.error();
    }
}
