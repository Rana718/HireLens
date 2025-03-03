import { Prisma } from "@prisma/client";

export interface CoverLetter {
    id: string;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
    content: string;
    jobDescription: string | null;
    companyName: string;
    jobTitle: string;
    status: string;
}



export interface IndustryInsight {
    id: string;
    industry: string;
    salaryRanges: Prisma.JsonValue[];
    growthRate: number;
    demandLevel: string;
    topSkills: string[];
    marketOutlook: string;
    keyTrends: string[];
    recommendedSkills: string[];
    lastUpdated: Date;
    nextUpdate: Date;
}


export interface Assessment {
    id: string;
    userId: string;
    quizScore: number;
    questions: Prisma.JsonValue[];
    category: string;
    improvementTip?: string | null;
    createdAt: Date;
    updatedAt: Date;
}