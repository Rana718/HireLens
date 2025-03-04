"use client";
import React, { useEffect, useState } from "react";
import CoverLetterPreview from "../_components/ConverLetterPreview";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getCoverLetter } from "@/actions/cover-letter";
import { useParams } from "next/navigation";

const Page = () => {
    const [coverLetter, setCoverLetter] = useState<any>(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchCoverLetter = async () => {
            if (id) {
                const letter = await getCoverLetter(id as string);
                setCoverLetter(letter);
            }
        };

        fetchCoverLetter();
    }, [id]);

    if (!coverLetter) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto py-6">
            <div className="flex flex-col space-y-2">
                <Link href="/ai-cover-letter">
                    <Button variant="link" className="gap-2 pl-0">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Cover Letters
                    </Button>
                </Link>

                <h1 className="text-6xl font-bold gradient-title mb-6">
                    {coverLetter?.jobTitle} at {coverLetter?.companyName}
                </h1>
            </div>

            <CoverLetterPreview content={coverLetter?.content || ""} />
        </div>
    );
};

export default Page;
