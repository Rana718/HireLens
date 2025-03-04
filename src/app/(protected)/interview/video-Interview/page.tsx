'use client';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

function ComingSoonPage() {
    const handleNotifyClick = () => {
        alert("We'll add this feature as soon as possible!");
    };

    const handleDemoClick = () => {
        alert("Demo version will be available soon!");
    };

    return (
        <div className="flex flex-col items-center justify-center ">
            <Card className="max-w-2xl p-8 text-center space-y-6 bg-zinc-900/50 border-zinc-800">
                <h1 className="text-3xl font-bold text-primary">
                    AI-Powered Video Interviews Coming Soon!
                </h1>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">Upcoming Features:</h2>
                    <ul className="text-left space-y-2 list-disc list-inside text-zinc-300">
                        <li>Real-time AI confidence analysis</li>
                        <li>Interview performance feedback</li>
                        <li>Body language and tone assessment</li>
                        <li>Personalized improvement suggestions</li>
                        <li>Practice sessions with AI interviewer</li>
                    </ul>
                </div>

                <div className="flex justify-center gap-4">
                    <Button
                        variant="outline"
                        className="border-zinc-700 hover:bg-zinc-800 text-zinc-200"
                        onClick={handleNotifyClick}
                    >
                        Get Notified
                    </Button>
                    <Button
                        className="bg-primary hover:bg-primary/90"
                        onClick={handleDemoClick}
                    >
                        Try Demo Version
                    </Button>
                </div>

                <p className="text-sm text-zinc-400">
                    We're working hard to bring you the most advanced AI-powered interview preparation platform.
                </p>
            </Card>
        </div>
    );
}

export default ComingSoonPage;