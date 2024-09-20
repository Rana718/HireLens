"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/Aimod'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
// @ts-expect-error
import { v4 as uuidv4 } from 'uuid';
import { MockInterview } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment';
import { useRouter } from 'next/navigation'

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const { user } = useUser();
    const [jobrole, setJobrole] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [yearOfExperience, setYearOfExperience] = useState("");
    const router = useRouter();
    const mode = 5;
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        console.log(jobrole, jobDescription, yearOfExperience);

        const context = `
            job Position: ${jobrole}, Job Description: ${jobDescription}, Years of Experience: ${yearOfExperience}, Based on this information, please give me ${mode} interview questions with answers in JSON format, with "question" and "answer" as fields.
        `;

        const result = await chatSession.sendMessage(context);
        const modedata = (await result.response.text()).replace('```json', '').replace('```', '');

        if (modedata) {
            // @ts-expect-error
            const resp = await db.insert(MockInterview).values({
                    mockId: uuidv4(),
                    jsonMockResp: modedata,
                    jobPosition: jobrole,
                    jobDesc: jobDescription,
                    jobExperience: yearOfExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
                }).returning({ mockId: MockInterview.mockId });

            console.log("Inserted ID::", resp);

            if(resp){
                setOpenDialog(false);
                console.log(resp[0].mockId);
                router.push(`/dashboard/interviews/${resp[0].mockId}`)
            }
        } else {
            console.log("No Data Found");
        }

        setLoading(false);
    }

    return (
        <div>
            <div
                className="p-5 border rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 hover:scale-110 hover:shadow-xl cursor-pointer transition-transform duration-300 ease-out"
                onClick={() => setOpenDialog(true)}
            >
                <h2 className="text-lg text-center text-white transition-colors duration-300 hover:text-yellow-400">
                    + Add New
                </h2>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="bg-gray-900 text-white p-8 rounded-lg shadow-lg animate-fadeInUp transition-all duration-500 ease-out">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-gray-200">Tell us more about your interview preparation</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={submitHandler}>
                                <h2 className="text-gray-400 mb-4">
                                    Add details about your job position/role, job description, and years of experience
                                </h2>

                                <div className="mt-7 my-3">
                                    <label className="text-gray-300">Job Role/Job Position</label>
                                    <Input
                                        className="mt-2 bg-gray-800 text-white border-gray-700 focus:ring-yellow-400 focus:border-yellow-400"
                                        placeholder="Ex. Software Engineer"
                                        value={jobrole}
                                        onChange={(e) => setJobrole(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="my-3">
                                    <label className="text-gray-300">Job Description/Tech Stack (In Short)</label>
                                    <Textarea
                                        className="mt-2 bg-gray-800 text-white border-gray-700 focus:ring-yellow-400 focus:border-yellow-400"
                                        placeholder="Ex. React, Nextjs, Nodejs, Typescript, Tailwindcss"
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="my-3">
                                    <label className="text-gray-300">Years of experience</label>
                                    <Input
                                        className="mt-2 bg-gray-800 text-white border-gray-700 focus:ring-yellow-400 focus:border-yellow-400"
                                        placeholder="Ex. 2"
                                        type="number"
                                        max={50}
                                        value={yearOfExperience}
                                        onChange={(e) => setYearOfExperience(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="flex gap-5 justify-end mt-5">
                                    <Button
                                        variant="destructive"
                                        className="bg-red-600 hover:bg-red-500 text-white transition-colors duration-300"
                                        onClick={() => setOpenDialog(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 transition-colors duration-300"
                                    >
                                        {loading ? (
                                            <>
                                                <LoaderCircle className="animate-spin mr-2" />
                                                Generating from AI
                                            </>
                                        ) : (
                                            'Start Interview'
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview;
