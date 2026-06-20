import { HeadingText } from "@/components/ui/base/text/HeadingText.tsx";
import { CommonInput } from "@/components/ui/base/inputs/CommonInput.tsx";
import { Button } from "@/components/ui/lib/button.tsx";
import ArrowIcon from '@/assets/Arrow.svg?react';
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "@/store/store.ts";
import {useRegisterMutation} from "@/api/authApi.ts";
import {
    composeValidators,
    validateEmail, validateMatch,
    validateMinLength,
    validatePassword,
    validateRequired
} from "@/utils/validation.ts";
import {useFormErrors} from "@/hooks/useFormErrors.ts";
import {setAuthenticated} from "@/store/slices/authSlice.ts";
import {setUserId} from "@/store/slices/userSlice.ts";

interface RegisterFormProps {
    onBack?: () => void;
}

export function RegisterForm({ onBack }: RegisterFormProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [register, { isLoading }] = useRegisterMutation();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const { errors, setErrors, clearError } = useFormErrors<Record<string, string | null>>({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = {
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            confirmPassword: formData.get('confirmPassword') as string,
        };

        const validationErrors = {
            firstName: composeValidators(data.firstName, [validateRequired, validateMinLength(2)]),
            lastName: composeValidators(data.lastName, [validateRequired, validateMinLength(2)]),
            email: composeValidators(data.email, [validateRequired, validateEmail]),
            password: composeValidators(data.password, [validateRequired, validatePassword]),
            confirmPassword: composeValidators(data.confirmPassword, [validateRequired, validateMatch(data.password)]),
        };

        if (Object.values(validationErrors).some(err => err !== null)) {
            setErrors(validationErrors);
            return;
        }

        try {
            const user = await register(data).unwrap();
            dispatch(setAuthenticated(true));
            dispatch(setUserId(user.id));
            navigate('/');
        } catch (err) {
            setSubmitError(err?.data?.message || "Произошла ошибка, повторите попытку позже");
        }
    };

    return (
        <>
            <div className="flex items-center mb-6">
                {onBack && (
                    <button
                        onClick={onBack}
                        className="md:hidden hover:bg-gray-100 p-2 rounded-full transition-colors"
                        aria-label="Назад"
                    >
                        <ArrowIcon className="mb-2"/>
                    </button>
                )}
                <HeadingText className="text-left m-0">Регистрация</HeadingText>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
                {submitError && (
                    <p className="text-red-500 text-sm font-medium">{submitError}</p>
                )}


                <CommonInput id="firstName" name="firstName" label="Имя" placeholder="Иван"
                             error={errors.firstName || undefined} onChange={() => {
                    clearError('firstName')
                    if (submitError) setSubmitError(null);
                }} required/>
                <CommonInput id="lastName" name="lastName" label="Фамилия" placeholder="Иванов"
                             error={errors.lastName || undefined} onChange={() => {
                    clearError('lastName')
                    if (submitError) setSubmitError(null);
                }} required/>
                <CommonInput id="email" name="email" label="Почта" type="email" placeholder="ivanov@yandex.ru"
                             error={errors.email || undefined} onChange={() => {
                    clearError('email')
                    if (submitError) setSubmitError(null);
                }} required/>
                <CommonInput id="password" name="password" label="Пароль" type="password" placeholder="******"
                             error={errors.password || undefined} onChange={() => {
                    clearError('password')
                    if (submitError) setSubmitError(null);
                }} required/>
                <CommonInput id="confirmPassword" name="confirmPassword" label="Повтор пароля" type="password"
                             placeholder="******" error={errors.confirmPassword || undefined} onChange={() => {
                    clearError('confirmPassword')
                    if (submitError) setSubmitError(null);
                }} required/>

                <Button variant="primaryBlue" size="lg" className="w-full mt-2" disabled={isLoading}>
                    Зарегистрироваться
                </Button>
            </form>

            <div className="mt-6 text-left text-sm">
                <div className="text-gray-600 mb-1">Уже есть аккаунт?</div>
                <Link to="/login" className="!text-blue-900 font-medium hover:underline">Войти</Link>
            </div>
        </>
    );
}