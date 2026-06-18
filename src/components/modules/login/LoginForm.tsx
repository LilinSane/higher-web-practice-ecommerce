import {HeadingText} from "@/components/ui/base/text/HeadingText.tsx";
import {CommonInput} from "@/components/ui/base/inputs/CommonInput.tsx";
import {Button} from "@/components/ui/lib/button.tsx";
import ArrowIcon from '@/assets/Arrow.svg?react';
import React from "react";
import {composeValidators, validateEmail, validatePassword, validateRequired} from "@/utils/validation.ts";
import {useNavigate} from "react-router-dom";
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
    const [login, { isLoading, error: apiError }] = useLoginMutation();
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
            navigate('/profile');
        } catch (err) {
            console.error("Login failed:", err);
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
                {apiError && <p className="text-red-500 text-sm">{apiError.message ? apiError.message : "Произошла ошибка, повторите попытку позже"}</p>}

                <CommonInput
                    id="email"
                    name="email"
                    label="Ваш логин или email"
                    type="email"
                    placeholder="ivanov@yandex.ru"
                    required
                    error={errors.email || undefined}
                    onChange={() => clearError('email')}
                />

                <CommonInput
                    id="password"
                    name="password"
                    label="Пароль"
                    type="password"
                    placeholder="******"
                    required
                    error={errors.password || undefined}
                    onChange={() => clearError('password')}
                />
                <Button variant="primaryBlue" size="lg" className="w-full" disabled={isLoading}>
                    Войти
                </Button>
            </form>

            <div className="mt-6 text-left text-sm">
                <div className="text-gray-600 mb-1">У вас нет аккаунта?</div>
                <a href="/register" className="text-blue-900 font-medium hover:underline">
                    Зарегистрироваться
                </a>
            </div>
        </>
    );
}