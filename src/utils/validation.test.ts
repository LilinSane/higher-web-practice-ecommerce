import {
    validateRequired,
    validateEmail,
    validatePassword,
    validateMinLength,
    validateMatch,
    validateAddress,
    validatePhone
} from './validation';

describe('Валидаторы', () => {

    test('validateRequired', () => {
        expect(validateRequired("test")).toBeNull();
        expect(validateRequired("   ")).toBe("Поле обязательно для заполнения");
        expect(validateRequired(undefined)).toBe("Поле обязательно для заполнения");
    });

    test('validateEmail', () => {
        expect(validateEmail("test@example.com")).toBeNull();
        expect(validateEmail("invalid-email")).toBe("Введите корректный email");
    });

    test('validatePassword', () => {
        expect(validatePassword("123456")).toBeNull();
        expect(validatePassword("123")).toBe("Пароль должен быть длиннее 6 символов");
    });

    test('validateMinLength', () => {
        const validator = validateMinLength(5);
        expect(validator("hello")).toBeNull();
        expect(validator("hi")).toBe("Минимальная длина — 5 символов");
    });

    test('validateMatch', () => {
        const validator = validateMatch("password123");
        expect(validator("password123")).toBeNull();
        expect(validator("wrong")).toBe("Пароли не совпадают");
    });

    test('validateAddress', () => {
        expect(validateAddress("Ленина, 10")).toBeNull();
        expect(validateAddress("ул")).toBe("Введите адрес в формате: Улица, дом, квартира");
        expect(validateAddress("Улица без номера")).toBe("Введите адрес в формате: Улица, дом, квартира");
    });

    test('validatePhone', () => {
        expect(validatePhone("79991234567")).toBeNull();
        expect(validatePhone("89991234567")).toBeNull();
        expect(validatePhone("123")).toBe("Введите корректный номер телефона");
    });
});