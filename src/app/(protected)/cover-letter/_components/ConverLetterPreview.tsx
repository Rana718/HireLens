"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";


const CoverLetterPreview = ({ content }: { content: string }) => {
    return (
        <div className="py-4">
            <MDEditor value={content} preview="preview" height={700} />
        </div>
    );
};

export default CoverLetterPreview;
