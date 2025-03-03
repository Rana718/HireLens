import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Quiz from "../_components/Quiz";

export default function page() {
    return (
        <div className="container mx-auto space-y-4 py-6">
            <div className="flex flex-col space-y-2 mx-2">
                <Link href="/interview">
                    <Button variant="link" className="gap-2 pl-0">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Interview Prep
                    </Button>
                </Link>

                <div>
                    <h1 className="text-6xl font-bold gradient-title">Practice Interview</h1>
                    <p className="text-muted-foreground">
                        Sharpen your skills with real-world interview questions.
                    </p>
                </div>
            </div>

            <Quiz />
        </div>
    );
}
