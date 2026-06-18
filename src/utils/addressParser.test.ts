import { parseAddressString } from './addressParser';

describe('parseAddressString', () => {
    test('корректно парсит строку с улицей, домом и квартирой', () => {
        const input = "Ленина, 10, кв. 5";
        const result = parseAddressString(input);

        expect(result).toEqual({
            country: "Россия",
            city: "Москва",
            street: "Ленина",
            house: "10",
            apartment: "5"
        });
    });

    test('корректно парсит строку без квартиры', () => {
        const input = "Невский, 1";
        const result = parseAddressString(input);

        expect(result).toEqual({
            country: "Россия",
            city: "Москва",
            street: "Невский",
            house: "1",
            apartment: undefined
        });
    });

    test('корректно удаляет префикс "кв" из квартиры', () => {
        const input = "Мира, 5, кв 20";
        const result = parseAddressString(input);

        expect(result.apartment).toBe("20");
    });

    test('обрабатывает пустую строку', () => {
        const result = parseAddressString("");

        expect(result).toEqual({
            country: "Россия",
            city: "Москва",
            street: "",
            house: "",
            apartment: undefined
        });
    });
});