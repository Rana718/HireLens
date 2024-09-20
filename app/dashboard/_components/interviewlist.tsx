"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { useEffect, useState, useCallback } from "react";
import { InterviewData } from "@/types/interviewdata";
import InterViewCard from "./interviewcard";

function InterViewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState<InterviewData[]>([]);

  // Memoize GetInterviewList to prevent triggering useEffect on every render
  const GetInterviewList = useCallback(async () => {
    if (user) {
      const result = await db
        .select()
        .from(MockInterview)
        // @ts-expect-error - This error occurs due to typing issues with Clerk user object
        .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id));
      console.log(result);
      setInterviewList(result);
    }
  }, [user]);

  useEffect(() => {
    if (user) GetInterviewList();
  }, [user, GetInterviewList]);

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewList &&
          interviewList.map((interview, index) => (
            <InterViewCard key={index} interview={interview} />
          ))}
      </div>
    </div>
  );
}

export default InterViewList;
