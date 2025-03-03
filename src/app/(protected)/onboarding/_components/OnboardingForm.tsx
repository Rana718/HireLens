"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import useFetch from "@/hooks/use-fetch";
import { onboardingSchema } from "@/lib/schema";
import { updateUser } from "@/actions/users";

interface Industry {
    id: string;
    name: string;
    subIndustries: string[];
}


interface OnboardingFormProps {
    industries: Industry[];
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ industries }) => {
    const router = useRouter();
    const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);


    const {
        loading: updateLoading,
        fn: updateUserFn,
        data: updateResult,
    } = useFetch(updateUser);


    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        resolver: zodResolver(onboardingSchema),
    });

    const onSubmit = async (values: any) => {
        try {
            const formattedIndustry = `${values.industry}-${values.subIndustry
                .toLowerCase()
                .replace(/ /g, "-")}`;

            await updateUserFn({
                ...values,
                industry: formattedIndustry,
            });
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    useEffect(() => {
        if (updateResult?.updatedUser && !updateLoading) {
            toast.success("Your profile has been updated!");
            router.push("/dashboard");
            router.refresh();
        }
    }, [updateResult]);

    const watchIndustry = watch("industry");

    return (
        <div className="flex items-center justify-center bg-background">
            <Card className="w-full max-w-lg mt-10 mx-2">
                <CardHeader>
                    <CardTitle className="gradient-title text-4xl">
                        Build Your Profile
                    </CardTitle>
                    <CardDescription>
                        Choose your industry to receive tailored career guidance and opportunities.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Industry Selection */}
                        <div className="space-y-2">
                            <Label htmlFor="industry">Field of Work</Label>
                            <Select
                                onValueChange={(value) => {
                                    setValue("industry", value);
                                    const industry = industries.find((ind) => ind.id === value);
                                    setSelectedIndustry(industry || null);
                                    setValue("subIndustry", "");
                                }}
                            >
                                <SelectTrigger id="industry">
                                    <SelectValue placeholder="Select your field" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Fields</SelectLabel>
                                        {industries.map((ind) => (
                                            <SelectItem key={ind.id} value={ind.id}>
                                                {ind.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.industry && (
                                <p className="text-sm text-red-500">{errors.industry.message}</p>
                            )}
                        </div>

                        {/* Sub-Industry Selection */}
                        {watchIndustry && selectedIndustry && (
                            <div className="space-y-2">
                                <Label htmlFor="subIndustry">Specialization Area</Label>
                                <Select
                                    onValueChange={(value) => setValue("subIndustry", value)}
                                >
                                    <SelectTrigger id="subIndustry">
                                        <SelectValue placeholder="Choose a specialization" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Specializations</SelectLabel>
                                            {selectedIndustry.subIndustries.map((sub) => (
                                                <SelectItem key={sub} value={sub}>
                                                    {sub}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.subIndustry && (
                                    <p className="text-sm text-red-500">{errors.subIndustry.message}</p>
                                )}
                            </div>
                        )}

                        {/* Years of Experience */}
                        <div className="space-y-2">
                            <Label htmlFor="experience">Work Experience</Label>
                            <Input
                                id="experience"
                                type="number"
                                min="0"
                                max="50"
                                placeholder="Enter your years of experience"
                                {...register("experience")}
                            />
                            {errors.experience && (
                                <p className="text-sm text-red-500">{errors.experience.message}</p>
                            )}
                        </div>

                        {/* Skills Input */}
                        <div className="space-y-2">
                            <Label htmlFor="skills">Key Skills</Label>
                            <Input
                                id="skills"
                                placeholder="e.g., React, Python, Data Analysis"
                                {...register("skills")}
                            />
                            <p className="text-sm text-muted-foreground">
                                Use commas to separate multiple skills.
                            </p>
                            {errors.skills && (
                                <p className="text-sm text-red-500">{errors.skills.message}</p>
                            )}
                        </div>

                        {/* Bio Input */}
                        <div className="space-y-2">
                            <Label htmlFor="bio">About You</Label>
                            <Textarea
                                id="bio"
                                placeholder="Share a brief summary of your professional background..."
                                className="h-32"
                                {...register("bio")}
                            />
                            {errors.bio && (
                                <p className="text-sm text-red-500">{errors.bio.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" className="w-full" disabled={updateLoading}>
                            {updateLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving Profile...
                                </>
                            ) : (
                                "Update Profile"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default OnboardingForm;
