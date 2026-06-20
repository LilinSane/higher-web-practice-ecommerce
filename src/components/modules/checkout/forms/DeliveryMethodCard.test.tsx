import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DeliveryMethodCard } from "./DeliveryMethodCard";
import type { PickupPoint } from "@/types";

const mockClearError = jest.fn();
const mockSetErrors = jest.fn();
jest.mock("@/hooks/useFormErrors.ts", () => ({
    useFormErrors: () => ({
        errors: { address: null },
        setErrors: mockSetErrors,
        clearError: mockClearError,
    }),
}));

const mock_composeValidators = jest.fn();
jest.mock("@/utils/validation.ts", () => ({
    composeValidators: (val: string, validators: unknown[]) => mock_composeValidators(val, validators),
    validateRequired: jest.fn(),
    validateAddress: jest.fn(),
}));

const mockPoints: PickupPoint[] = [
    { id: "point-1", name: "Пункт на Ленина", address: "ул. Ленина, д. 10" },
    { id: "point-2", name: "Пункт на Пушкина", address: "ул. Пушкина, д. 25" },
];

describe("DeliveryMethodCard Component", () => {
    const mockOnChange = jest.fn();
    const mockOnAddressChange = jest.fn();
    const mockOnPickupPointChange = jest.fn();

    const defaultProps = {
        onChange: mockOnChange,
        onAddressChange: mockOnAddressChange,
        points: mockPoints,
        selectedPickupPointId: null,
        onPickupPointChange: mockOnPickupPointChange,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("должен по умолчанию рендерить доставку курьером и инпут адреса", () => {
        render(<DeliveryMethodCard {...defaultProps} />);

        expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/улица/i)).toBeInTheDocument();
    });

    it("должен переключаться на самовывоз и вызывать onChange", () => {
        render(<DeliveryMethodCard {...defaultProps} />);

        const pickupTabButton = screen.getByTestId("pickup-tab");
        fireEvent.click(pickupTabButton);

        expect(mockOnChange).toHaveBeenCalledWith("pickup_point");
        expect(mockOnAddressChange).toHaveBeenCalledWith("");
        expect(screen.queryByPlaceholderText(/улица/i)).not.toBeInTheDocument();
    });

    it("должен вызывать onAddressChange при успешной валидации адреса курьера", () => {
        mock_composeValidators.mockReturnValue(null);
        const testAddress = "ул. Гагарина, д. 42";

        render(<DeliveryMethodCard {...defaultProps} />);

        const addressInput = screen.getByPlaceholderText(/улица/i);
        fireEvent.change(addressInput, { target: { value: testAddress } });

        expect(mockClearError).toHaveBeenCalledWith("address");
        expect(mockOnAddressChange).toHaveBeenCalledWith(testAddress);
    });

    it("должен отображать адрес выбранного пункта выдачи", () => {
        const targetPoint = mockPoints[0];

        render(
            <DeliveryMethodCard
                {...defaultProps}
                selectedPickupPointId={targetPoint.id}
            />
        );

        const pickupTabButton = screen.getByTestId("pickup-tab");
        fireEvent.click(pickupTabButton);

        expect(screen.getByText(targetPoint.address)).toBeInTheDocument();
        expect(screen.getByText(/время работы/i)).toBeInTheDocument();
    });
})