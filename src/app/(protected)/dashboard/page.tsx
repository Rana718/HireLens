import { getIndustryInsights } from '@/actions/dashboard';
import { redirect } from 'next/navigation';
import React from 'react'
import DashboardView from './_components/DashboardPreview';
import { getUserOnboardingStatus } from '@/actions/users';
import { ToolBar } from './_components/ToolBar';

async function page() {
    const { isOnboarded } = await getUserOnboardingStatus();

    // If not onboarded, redirect to onboarding page
    // Skip this check if already on the onboarding page
    if (!isOnboarded) {
        redirect("/onboarding");
    }

    const insights = await getIndustryInsights();

    return (
        <div className="container mx-auto">
            <ToolBar />
            <DashboardView insights={insights} />
        </div>
    );
}

export default page