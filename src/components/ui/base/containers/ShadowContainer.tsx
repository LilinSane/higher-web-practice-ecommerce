import { ReactNode } from "react";

interface ShadowContainerProps {
    children: ReactNode;
    className?: string;
}

export function ShadowContainer({ children, className = "" }: ShadowContainerProps) {
    return (
        <div className={`bg-background border border-border rounded-2xl p-5 md:p-6 shadow-sm ${className}`}>
            {children}
        </div>
    );
}