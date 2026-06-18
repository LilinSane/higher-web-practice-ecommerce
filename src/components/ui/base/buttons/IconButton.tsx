import * as React from "react"
import type {SVGProps} from "react";
import {cn} from "@/lib/utils.ts";

interface IconButtonProps {
    label: string;
    icon: SVGProps<SVGSVGElement>;
    onClick: () => void;
    className?: string;
}

export function IconButton({label, icon: Icon, onClick, className}: IconButtonProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "flex flex-col items-center gap-1 cursor-pointer select-none text-xs text-muted-foreground hover:text-foreground transition-colors",
                className
            )}
        >
            <Icon/>
            <p>{label}</p>
        </div>
    );
}