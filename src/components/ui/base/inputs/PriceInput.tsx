import {Input} from "@/components/ui/lib/input.tsx";
import {cn} from "@/lib/utils.ts";

interface PriceInputProps {
    value: string | number;
    onChange: (val: string) => void;
    placeholder: string;
}

export function PriceInput({value, onChange, placeholder}: PriceInputProps) {
    return (
        <Input
            type="number"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
                "w-full text-sm rounded-sm transition-colors",
                "focus-visible:border-[#1E40AF] focus-visible:ring-1 focus-visible:ring-[#1E40AF] ",
                value !== "" ? "bg-gray-100 border-gray-200" : "bg-transparent"
            )}
            min={0}
        />
    );
}