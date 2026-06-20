import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartItem } from "./CartItem";
import { BrowserRouter } from "react-router-dom";

jest.mock("@/assets/Trash.svg?react", () => {
    return function DummyTrashIcon(props: React.SVGProps<SVGSVGElement>) {
        return <svg {...props} data-testid="trash-icon" />;
    };
});

const mockUpdate = jest.fn();
const mockRemove = jest.fn();

jest.mock("@/api/cartApi", () => ({
    useUpdateQuantityMutation: () => [mockUpdate],
    useRemoveFromCartMutation: () => [mockRemove],
}));

const mockItem = {
    id: "cart-entry-1",
    productId: "3e6e9a7a-0a5f-4e2d-9b0a-2e8d6e4c1a01",
    price: 5590,
    quantity: 2,
    product: {
        name: "Председатель",
        images: ["/mustashes/chairman/0.png"],
    },
};

describe("CartItem Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("должен корректно рендерить данные о товаре и общую стоимость", () => {
        render(
            <BrowserRouter>
                <CartItem item={mockItem} />
            </BrowserRouter>
        );

        expect(screen.getByText("Председатель")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("11 180 ₽")).toBeInTheDocument();
    });

    it("должен вызывать update мутацию с увеличенным количеством при клике на плюс", () => {
        render(
            <BrowserRouter>
                <CartItem item={mockItem} />
            </BrowserRouter>
        );

        const plusButton = screen.getByRole("button", { name: "+" });
        fireEvent.click(plusButton);

        expect(mockUpdate).toHaveBeenCalledWith({ id: "cart-entry-1", quantity: 3 });
    });

    it("должен вызывать update мутацию с уменьшенным количеством при клике на минус", () => {
        render(
            <BrowserRouter>
                <CartItem item={mockItem} />
            </BrowserRouter>
        );

        const minusButton = screen.getByRole("button", { name: "-" });
        fireEvent.click(minusButton);

        expect(mockUpdate).toHaveBeenCalledWith({ id: "cart-entry-1", quantity: 1 });
    });

    it("должен дизейблить кнопку минус, если количество равно 1", () => {
        const itemWithOneQty = { ...mockItem, quantity: 1 };

        render(
            <BrowserRouter>
                <CartItem item={itemWithOneQty} />
            </BrowserRouter>
        );

        const minusButton = screen.getByRole("button", { name: "-" });
        expect(minusButton).toBeDisabled();
    });

    it("должен вызывать remove мутацию при клике на иконку удаления", () => {
        render(
            <BrowserRouter>
                <CartItem item={mockItem} />
            </BrowserRouter>
        );

        const removeButton = screen.getByRole("button", { name: "Удалить товар" });
        fireEvent.click(removeButton);

        expect(mockRemove).toHaveBeenCalledWith("cart-entry-1");
    });
});