import {HeadingText} from "@/components/ui/base/text/HeadingText.tsx";
import {CommonInput} from "@/components/ui/base/inputs/CommonInput.tsx";
import {Button} from "@/components/ui/lib/button.tsx";
import ArrowIcon from '@/assets/Arrow.svg?react';
import React, {useState} from "react";
import {composeValidators, validateEmail, validatePassword, validateRequired} from "@/utils/validation.ts";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "@/store/store.ts";
import {useLoginMutation} from "@/api/authApi.ts";
import {useFormErrors} from "@/hooks/useFormErrors.ts";
import {setAuthenticated} from "@/store/slices/authSlice.ts";
import {setUserId} from "@/store/slices/userSlice.ts";

interface LoginFormProps {
    onBack?: () => void;
    onSubmit?: (data) => void;
}

export function LoginForm({ onBack }: LoginFormProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const { errors, setErrors, clearError } = useFormErrors<Record<string, string | null>>({
        email: null,
        password: null
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const validationErrors = {
            email: composeValidators(email, [validateRequired, validateEmail]),
            password: composeValidators(password, [validateRequired, validatePassword]),
        };

        if (Object.values(validationErrors).some(err => err !== null)) {
            setErrors(validationErrors);
            return;
        }

        try {
            const user = await login({ email, password }).unwrap();
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
                <HeadingText className="text-left m-0">Вход в аккаунт</HeadingText>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
                {submitError && (
                    <p className="text-red-500 text-sm font-medium">{submitError}</p>
                )}

                <CommonInput
                    id="email"
                    name="email"
                    label="Ваш логин или email"
                    type="email"
                    placeholder="ivanov@yandex.ru"
                    required
                    error={errors.email || undefined}
                    onChange={() => {
                        clearError('email')
                        if (submitError) setSubmitError(null);
                    }}
                />

                <CommonInput
                    id="password"
                    name="password"
                    label="Пароль"
                    type="password"
                    placeholder="******"
                    required
                    error={errors.password || undefined}
                    onChange={() => {
                        clearError('password')
                        if (submitError) setSubmitError(null);
                    }}
                />
                <Button variant="primaryBlue" size="lg" className="w-full" disabled={isLoading}>
                    Войти
                </Button>
            </form>

            <div className="mt-6 text-left text-sm">
                <div className="text-gray-600 mb-1">У вас нет аккаунта?</div>
                <Link to="/register" className="text-blue-900 font-medium hover:underline">
                    Зарегистрироваться
                </Link>
            </div>
        </>
    );
}