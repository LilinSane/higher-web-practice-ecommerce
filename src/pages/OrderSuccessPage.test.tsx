import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { OrderSuccessPage } from "./OrderSuccessPage";

const mockNavigate = jest.fn();

interface RootStateMock {
    user: {
        userId: string;
    };
}

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => <a href={to}>{children}</a>,
}));

const mockUserId = "8f6b1a1e-7d1d-4b2c-9c6c-1c5f3c9c1a11";
jest.mock("@/store/store", () => ({
    useAppSelector: (callback: (state: RootStateMock) => unknown) => callback({ user: { userId: mockUserId } }),
}));

const mockUseGetOrdersQuery = jest.fn();
const mockUseGetPickupPointsQuery = jest.fn();

jest.mock("@/api/ordersApi.ts", () => ({
    useGetOrdersQuery: (userId: string, options?: unknown) => mockUseGetOrdersQuery(userId, options),
}));

jest.mock("@/api/catalogApi.ts", () => ({
    useGetPickupPointsQuery: () => mockUseGetPickupPointsQuery(),
}));

const mockOrder = {
    id: "84c71c68-52b5-4e61-8168-171a4e337db1",
    number: "ЗАКАЗ-1781946536606",
    userId: "8f6b1a1e-7d1d-4b2c-9c6c-1c5f3c9c1a11",
    status: "pending",
    items: [
        {
            productId: "3e6e9a7a-0a5f-4e2d-9b0a-2e8d6e4c1a01",
            name: "Председатель",
            image: "/mustashes/chairman/0.png",
            price: 5590,
            quantity: 1
        }
    ],
    totalPrice: 5590,
    paymentMethod: "card_on_delivery",
    deliveryMethod: "courier",
    deliveryAddress: {
        country: "Россия",
        city: "Москва",
        street: "Ленина",
        house: "10",
        apartment: "12"
    },
    customer: {
        firstName: "Иван",
        lastName: "Петров",
        email: "ivan@example.com",
        phone: "+7 (981) 111-11-11"
    },
    createdAt: "2026-06-20T09:08:56.606Z",
    comment: ""
};

const mockPoints = [
    {
        id: "5a6b7c8d-9e0f-4a1b-8c2d-3e4f5a9c8001",
        name: "Пункт выдачи №1",
        address: "Москва, Арбат 12"
    },
    {
        id: "6b7c8d9e-0f1a-4b2c-8d3e-4f5a6b0d8002",
        name: "Пункт выдачи №2",
        address: "Москва, улица Ленина 45"
    }
];

describe("OrderSuccessPage Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseGetPickupPointsQuery.mockReturnValue({ data: mockPoints });
    });

    it("должен отображать лоадер во время загрузки данных заказа", () => {
        mockUseGetOrdersQuery.mockReturnValue({ data: [], isLoading: true });

        render(<OrderSuccessPage />);

        expect(screen.getByText(/загрузка данных заказа/i)).toBeInTheDocument();
    });

    it("должен отображать заглушку, если заказ не найден", () => {
        mockUseGetOrdersQuery.mockReturnValue({ data: [], isLoading: false });

        render(<OrderSuccessPage />);

        expect(screen.getByRole("heading", { name: /заказ не найден/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /в каталог/i })).toHaveAttribute("href", "/");
    });

    it("должен корректно рендерить информацию об успешном заказе курьером", () => {
        mockUseGetOrdersQuery.mockReturnValue({ data: [mockOrder], isLoading: false });

        render(<OrderSuccessPage />);

        expect(screen.getByRole("heading", { level: 1, name: /спасибо за покупку/i })).toBeInTheDocument();

        expect(screen.getByText(/оплачено картой/i)).toBeInTheDocument();
    });

    it("должен переключать на оплату наличными, если изменен paymentMethod на cash", () => {
        const cashOrder = { ...mockOrder, paymentMethod: "cash" };
        mockUseGetOrdersQuery.mockReturnValue({ data: [cashOrder], isLoading: false });

        render(<OrderSuccessPage />);

        expect(screen.getByText(/оплата наличными/i)).toBeInTheDocument();
    });

    it("должен вызывать navigate при клике на кнопку 'Вернуться к покупкам' (мобильная версия)", () => {
        mockUseGetOrdersQuery.mockReturnValue({ data: [mockOrder], isLoading: false });

        render(<OrderSuccessPage />);

        const backToShopButton = screen.getByRole("button", { name: /вернуться к покупкам/i });
        fireEvent.click(backToShopButton);

        expect(mockNavigate).toHaveBeenCalledWith("/");
    });
});