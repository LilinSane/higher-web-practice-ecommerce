import { InputHTMLAttributes } from 'react';

interface CommonInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    id: string;
    error?: string;
    required?: boolean
}

export function CommonInput({ label, id, error, required, ...props }: CommonInputProps) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-gray-500">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <input
                id={id}
                className={`p-3 border rounded-lg w-full bg-white focus:ring-2 outline-none transition-all ${
                    error ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:ring-blue-500"
                }`}
                {...props}
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
}