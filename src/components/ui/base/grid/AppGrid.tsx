import * as React from "react";
import { cn } from "@/lib/utils";

interface AppGridProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function AppGrid({ children, className, ...props }: AppGridProps) {
    return (
        <div
            className={cn(
                "max-w-[1440px] mx-auto px-4 grid items-center gap-4 md:gap-6",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}