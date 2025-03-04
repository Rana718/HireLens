"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCoverLetter } from "@/actions/cover-letter";
import { CoverLetter } from "@/types";

interface CoverLetterListProps {
    coverLetters: CoverLetter[];
}

export default function CoverLetterList({ coverLetters }: CoverLetterListProps) {
    const router = useRouter();

    const handleDelete = async (id: string) => {
        try {
            await deleteCoverLetter(id);
            toast.success("Cover letter deleted successfully!");
            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to delete the cover letter.");
        }
    };

    if (!coverLetters?.length) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>No Cover Letters Available</CardTitle>
                    <CardDescription>
                        Start by creating your first cover letter.
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {coverLetters.map((letter) => (
                <Card key={letter.id} className="group relative">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                <CardTitle className="text-xl gradient-title">
                                    {letter.jobTitle} at {letter.companyName}
                                </CardTitle>
                                <CardDescription>
                                    Created on {format(new Date(letter.createdAt ?? Date.now()), "PPP")}
                                </CardDescription>
                            </div>
                            <div className="flex space-x-2">
                                <AlertDialog>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => router.push(`/ai-cover-letter/${letter.id}`)}
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action is irreversible. Deleting this cover letter will remove it permanently.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => handleDelete(letter.id)}
                                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                            >
                                                Delete Cover Letter
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-muted-foreground text-sm line-clamp-3">
                            {letter.jobDescription}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
