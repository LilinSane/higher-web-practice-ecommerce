import { useState } from 'react';

export function useFormErrors<T extends Record<string, string | null>>(initialErrors: T) {
    const [errors, setErrors] = useState<T>(initialErrors);

    const clearError = (field: keyof T) => {
        setErrors(prev => ({ ...prev, [field]: null }));
    };

    return { errors, setErrors, clearError };
}