import Search from '@/assets/Search.svg?react';
import { InputGroup, InputGroupButton, InputGroupInput } from "@/components/ui/lib/input-group.tsx";

interface SearchInputProps {
    placeholder?: string;
}

export function SearchInput({ placeholder }: SearchInputProps) {
    return (
        <InputGroup
            className="w-full flex items-center bg-white border border-input rounded-lg overflow-hidden focus-within:border-[#1E40AF] focus-within:ring-1 focus-within:ring-[#1E40AF] transition-all"
        >
            <InputGroupInput
                placeholder={placeholder}
                className="w-full h-10 border-0 bg-transparent rounded-none px-3 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <InputGroupButton
                type="submit"
                className="bg-[#1E40AF] hover:bg-blue-900 rounded-none h-10 px-4 flex items-center justify-center shrink-0 border-0 text-white transition-colors cursor-pointer"
            >
                <Search className="h-5 w-5 text-white"/>
            </InputGroupButton>
        </InputGroup>
    );
}