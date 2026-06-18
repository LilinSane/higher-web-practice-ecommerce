import { ReactNode } from "react";
import {cn} from "@/lib/utils.ts";

interface HeadingTextProps {
    children: ReactNode;
    className?: string;
}

export function HeadingText({ children, className = "" }: HeadingTextProps) {
    return (
        <h1 className={cn("text-2xl font-bold text-[#1F2937] block", className)}>
            {children}
        </h1>
    );
}