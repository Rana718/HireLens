"use client";

import Link from "next/link";
import { FileText, PenBox, Video, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const tools = [
    {
        name: "Build Resume",
        icon: <FileText className="w-5 h-5" />,
        href: "/resume",
    },
    {
        name: "Cover Letter",
        icon: <PenBox className="w-5 h-5" />,
        href: "/cover-letter",
    },
    {
        name: "Mock Interview",
        icon: <Users className="w-5 h-5" />,
        href: "/interview",
    },
    {
        name: "Video Interview",
        icon: <Video className="w-5 h-5" />,
        href: "/interview/video-Interview",
    },
];

export function ToolBar() {
    return (
        <div className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md">
            <div className="container mx-auto px-4">
                <h2 className="text-xl font-bold py-2 text-left pl-2">Tools</h2>
                <div className="w-full overflow-x-auto scrollbar-hide pt-3 no-scrollbar">
                    <div className="flex w-max space-x-4 pb-4 flex-nowrap ">
                        {tools.map((tool, index) => (
                            <Link
                                key={tool.name}
                                href={tool.href}
                                className="transition-transform duration-200 hover:scale-105"
                            >
                                <Badge
                                    variant="outline"
                                    className={`text-base p-2 ${index === 0 ? "ml-4 pt-2" : ""}`}
                                >
                                    {tool.icon}
                                    <span className="font-medium">{tool.name}</span>
                                </Badge>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
