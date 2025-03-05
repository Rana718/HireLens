"use server";

import { config } from "@/config/env";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(config.AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


export async function CreateNewInterview() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    
}