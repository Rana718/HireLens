"use client"
import React, { useEffect, useState } from 'react'
import { WebcamIcon } from 'lucide-react'
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import { MockInterview } from '@/utils/schema';
import Webcam from "react-webcam";
import { Button } from '@/components/ui/button';


function interview({params}:any) {
  const [interviewdata, setInterviewdata] = useState();
  const [webcamenabled, setWebcamenabled] = useState(false);

  useEffect(() => {
    console.log(params.interviewid)
    getinterviewdetails();
  },[]);

  const getinterviewdetails = async () => {
    const result:any = await db.select().from(MockInterview).where(
      eq(MockInterview.id, params.interviewid)
    )
    setInterviewdata(result[0]);
  }

  return (
    <div className='my-10 flex justify-center flex-col items-center'>
      <h2 className='font-bold text-2xl'>Let's Get Started</h2>

      <div>
        {webcamenabled ? 
          <Webcam onUserMedia={()=>setWebcamenabled(true)}
            onUserMediaError={()=>setWebcamenabled(false)}
            mirrored={true}
            style={{
              height: 300,
              width: 300
            }}
          />:
          <>
          <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border'/>
          <Button onClick={()=>setWebcamenabled(true)}>Enable Webcam</Button>
          </>
        }
      </div>

      <div>
        <h2><strong>Job Role/Job Position:</strong>{interviewdata.jobrole}</h2>
      </div>

    </div>
  )
}

export default interview
