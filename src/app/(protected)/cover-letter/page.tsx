import { getCoverLetters } from "@/actions/cover-letter";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterList from "./_components/CoverLetterList";

async function page() {
    const coverLetters = await getCoverLetters();

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-5">
                <h1 className="text-6xl font-bold gradient-title">Saved Cover Letters</h1>
                <Link href="/cover-letter/new">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Cover Letter
                    </Button>
                </Link>
            </div>

            <CoverLetterList coverLetters={coverLetters} />
        </div>

    )
}

export default page