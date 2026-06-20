import { useState } from "react";
import { ShadowContainer } from "@/components/ui/base/containers/ShadowContainer";
import type {PaymentMethod} from "@/types";

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string }[] = [
    { id: "card_online", label: "Картой онлайн" },
    { id: "card_on_delivery", label: "Картой при получении" },
    { id: "cash", label: "Наличными при получении" },
];

interface PaymentMethodCardProps { onChange: (id: PaymentMethod) => void; }

export function PaymentMethodCard({ onChange }: PaymentMethodCardProps) {
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card_online");

    const handleSelect = (method: PaymentMethod) => {
        setSelectedMethod(method);
        onChange(method);
    };

    return (
        <ShadowContainer className="p-4">
            <h2 className="text-lg font-bold mb-4 text-black">Способ оплаты</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {PAYMENT_OPTIONS.map((option) => {
                    const isSelected = selectedMethod === option.id;

                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => handleSelect(option.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all border-2 ${
                                isSelected
                                    ? "bg-blue-100 text-blue-800 font-medium border-blue-800"
                                    : "bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
                            }`}
                        >
                            {option.label}
                        </button>
                    );
                })}
            </div>
        </ShadowContainer>
    );
}