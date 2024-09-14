"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/Aimod'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
//@ts-ignore
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
    const [mode, setMode] = useState(5);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState([]); 
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        console.log(jobrole, jobDescription, yearOfExperience);

        const context = `
            job Position: ${jobrole}, Job Description: ${jobDescription}, Years of Experience: ${yearOfExperience}, Based on this information, please give me ${mode} interview questions with answers in JSON format, with "question" and "answer" as fields.
        `;
        
        const result = await chatSession.sendMessage(context);
        const modedata = (await result.response.text()).replace('```json', '').replace('```', '');
        console.log(modedata);
        setResponse(modedata);

        if (modedata) {
            // @ts-ignore
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
                router.push(`/dashboard/interviews/${resp[0].mockId}`)
            }
        } else {
            console.log("No Data Found");
        }

        setLoading(false);
    }

    return (
        <div>
            <div className='p-10 border rounded-lg bg-black hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}
            >
                <h2 className='text-lg text-center text-white'>+ Add New</h2>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}> {/* Added onOpenChange for proper control */}
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Tell us more about your interview preparation</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={submitHandler}> {/* Fixed submitHandler typo */}
                                <h2>Add details about your job position/role, job description, and years of experience</h2>

                                <div className='mt-7 my-3'>
                                    <label>Job Role/Job Position</label>
                                    <Input placeholder='Ex. Software Engineer' value={jobrole} onChange={(e) => setJobrole(e.target.value)} required />
                                </div>

                                <div className='my-3'>
                                    <label>Job Description/Tech Stack (In Short)</label>
                                    <Textarea placeholder='Ex. React, Nextjs, Nodejs, Typescript, Tailwindcss' value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} required />
                                </div>

                                <div className='my-3'>
                                    <label>Years of experience</label>
                                    <Input placeholder='Ex. 2' type='number' max={50} value={yearOfExperience} onChange={(e) => setYearOfExperience(e.target.value)} required />
                                </div>

                                <div className='flex gap-5 justify-end'>
                                    <Button variant="destructive" onClick={() => setOpenDialog(false)} >Cancel</Button>
                                    <Button type='submit' disabled={loading}>
                                        {loading ?
                                            <>
                                                <LoaderCircle className='animate-spin' /> Generating from AI
                                            </> : 'Start Interview'
                                        }
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
