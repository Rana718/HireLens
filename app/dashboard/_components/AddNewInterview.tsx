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



function AddNewInterview() {
    const [openDailog, setOpenDialog] = useState(false);
    const [jobrole, setJobrole] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [yearOfExperience, setYearOfExperience] = useState("");
    const [mode, setMode] = useState(5);

    const sumbitHandelr = async (e:any) => {
        e.preventDefault();
        console.log(jobrole, jobDescription, yearOfExperience);

        const context = `
            job Position: ${jobrole}, Job Description: ${jobDescription}, Years of Experience: ${yearOfExperience}, Depends on this information please give me ${mode} interview question with Answered in Json Format, Give Question and Answered as field in JSON
        `;
        const result = await chatSession.sendMessage(context);
        const modedata = (result.response.text()).replace('```json', '').replace('```', '');
        console.log(modedata);

    }

    return(

        <div>
            <div className='p-10 border rounded-lg bg-black hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}
            >
                <h2 className='text-lg text-center text-white'>+ Add New</h2>
            </div>

            <Dialog open={openDailog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Tell us more about your job interviwing</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={sumbitHandelr}>
                                <h2>
                                    add Detalis about your job position/role, job description and years of experience
                                </h2>

                                <div className='mt-7 my-3'>
                                    <label>Job Role/Job Position</label>
                                    <Input placeholder='Ex. Software Engineer' value={jobrole} onChange={(e)=>setJobrole(e.target.value)} required/>
                                </div>

                                <div className='my-3'>
                                    <label>Job Description/Tech Stack (In Short)</label>
                                    <Textarea placeholder='Ex. React, Nextjs, Nodejs, Typescript, Tailwindcss' value={jobDescription} onChange={(e)=>setJobDescription(e.target.value)} required/>
                                </div>

                                <div className='my-3'>
                                    <label>Year of experience</label>
                                    <Input placeholder='Ex. 2' type='number' max={50} value={yearOfExperience} onChange={(e)=>setYearOfExperience(e.target.value)} required/>
                                </div>

                                <div className='flex gap-5 justify-end'>

                                    <Button variant="destructive" onClick={() => setOpenDialog(false)} >Cancel</Button>
                                    <Button type='submit'>Start Interview</Button>

                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


        </div>
    )
}

export default AddNewInterview
