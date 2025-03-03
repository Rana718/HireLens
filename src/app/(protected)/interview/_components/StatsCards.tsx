import { Brain, Target, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Assessment } from "@/types";

interface StatsCardsProps {
    assessments: Assessment[];
}

export default function StatsCards({ assessments }: StatsCardsProps) {
    const getAverageScore = () => {
        if (!assessments?.length) return 0;
        const total = assessments.reduce(
            (sum, assessment) => sum + assessment.quizScore,
            0
        );
        return (total / assessments.length).toFixed(1);
    };

    const getLatestAssessment = () => {
        if (!assessments?.length) return null;
        return assessments[0];
    };

    const getTotalQuestions = () => {
        if (!assessments?.length) return 0;
        return assessments.reduce(
            (sum, assessment) => sum + assessment.questions.length,
            0
        );
    };

    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Overall Performance</CardTitle>
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{getAverageScore()}%</div>
                    <p className="text-xs text-muted-foreground">
                        Average quiz score
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Questions Answered</CardTitle>
                    <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{getTotalQuestions()}</div>
                    <p className="text-xs text-muted-foreground">Cumulative questions practiced</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Recent Quiz Score</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {getLatestAssessment()?.quizScore.toFixed(1) || 0}%
                    </div>
                    <p className="text-xs text-muted-foreground">Last attempted quiz</p>
                </CardContent>
            </Card>
        </div>
    );
}
