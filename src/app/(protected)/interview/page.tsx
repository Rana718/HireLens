import { getAssessments } from "@/actions/interview";
import StatsCards from "./_components/StatsCards";
import PerformanceChart from "./_components/PerformaceChart";
import QuizList from "./_components/QuizList";

export default async function page() {
    const assessments = await getAssessments();

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-6xl font-bold gradient-title">
                    Interview Preparation
                </h1>
            </div>
            <div className="space-y-6">
                <StatsCards assessments={assessments} />
                <PerformanceChart assessments={assessments} />
                <QuizList assessments={assessments} />
            </div>
        </div>
    );
}
