export const validateRequired = (value: string | undefined): string | null => {
    return !value || value.trim() === "" ? "Поле обязательно для заполнения" : null;
};

export const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email) ? "Введите корректный email" : null;
};

export const validatePassword = (password: string): string | null => {
    return password.length < 6 ? "Пароль должен быть длиннее 6 символов" : null;
};

export const validateMinLength = (min: number) => (value: string): string | null => {
    return value.length < min ? `Минимальная длина — ${min} символов` : null;
};

export const validateMatch = (targetValue: string) => (value: string): string | null => {
    return value !== targetValue ? "Пароли не совпадают" : null;
};

export const validateAddress = (value: string): string | null => {
    const hasDigits = /\d/.test(value);
    return value.trim().length < 5 || !hasDigits
        ? "Введите адрес в формате: Улица, дом, квартира"
        : null;
};

export const validatePhone = (phone: string): string | null => {
    const cleaned = phone.replace(/\D/g, '');
    const phoneRegex = /^[78]\d{10}$/;

    return !phoneRegex.test(cleaned)
        ? "Введите корректный номер телефона"
        : null;
};

export const composeValidators = (value: string, validators: ((val: string) => string | null)[]) => {
    for (const validator of validators) {
        const error = validator(value);
        if (error) return error;
    }
    return null;
};