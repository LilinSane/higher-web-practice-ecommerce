import React, {useState} from "react";
import {ShadowContainer} from "@/components/ui/base/containers/ShadowContainer.tsx";
import {CommonInput} from "@/components/ui/base/inputs/CommonInput.tsx";
import {Button} from "@/components/ui/lib/button.tsx";
import {useUpdateProfileMutation} from "@/api/userApi.ts";
import {useFormErrors} from "@/hooks/useFormErrors.ts";
import {composeValidators, validateEmail, validateMinLength, validateRequired} from "@/utils/validation.ts";
import CameraIcon from "@/assets/Camera.svg?react";
import type {User} from "@/types";

interface ProfileEditFormProps {
    user: User;
    onCancel: () => void;
}

export function ProfileEditForm({user, onCancel}: ProfileEditFormProps) {
    const [updateProfile, {isLoading}] = useUpdateProfileMutation();
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {errors, setErrors, clearError} = useFormErrors<Record<string, string | null>>({
        firstName: null,
        lastName: null,
        email: null,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
        };

        const validationErrors = {
            firstName: composeValidators(data.firstName, [validateRequired, validateMinLength(2)]),
            lastName: composeValidators(data.lastName, [validateRequired, validateMinLength(2)]),
            email: composeValidators(data.email, [validateRequired, validateEmail]),
        };

        if (Object.values(validationErrors).some((err) => err !== null)) {
            setErrors(validationErrors);
            return;
        }

        try {
            await updateProfile({id: user.id, data}).unwrap();
            onCancel();
        } catch (err) {
            setSubmitError(err?.data?.message || "Произошла ошибка, повторите попытку позже");
        }
    };

    if(isLoading) {
        return (
            <div className="max-w-md mx-auto py-16 px-4 text-center">
                <p className="text-gray-500">Загрузка данных пользователя...</p>
            </div>
        );
    }

    return (
        <ShadowContainer className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col items-center md:items-start gap-6" noValidate>
                {submitError && (
                    <p className="text-red-500 text-sm font-medium">{submitError}</p>
                )}

                <div
                    className="relative w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
                    <span className="text-3xl font-bold text-blue-900">
                        {user.firstName[0]}{user.lastName[0]}
                    </span>

                    <button
                        type="button"
                        className="absolute bottom-0 right-0 translate-x-1 translate-y-1 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
                    >
                        <CameraIcon className="w-5 h-5 text-white"/>
                    </button>
                </div>

                <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <CommonInput
                                id="firstName"
                                name="firstName"
                                label="Имя"
                                defaultValue={user.firstName}
                                error={errors.firstName || undefined}
                                onChange={() => clearError("firstName")}
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <CommonInput
                                id="lastName"
                                name="lastName"
                                label="Фамилия"
                                defaultValue={user.lastName}
                                error={errors.lastName || undefined}
                                onChange={() => clearError("lastName")}
                                required
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <CommonInput
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            defaultValue={user.email}
                            error={errors.email || undefined}
                            onChange={() => clearError("email")}
                            required
                        />
                    </div>
                </div>

                <div className="w-full flex flex-col-reverse md:flex-row gap-3">
                    <Button type="button" variant="outlineBlue" size="lg" className="w-full md:w-auto"
                            onClick={onCancel}>
                        Отменить
                    </Button>
                    <Button type="submit" variant="primaryBlue" size="lg" className="w-full md:w-auto"
                            disabled={isLoading}>
                        Сохранить
                    </Button>
                </div>
            </form>
        </ShadowContainer>
    );
}