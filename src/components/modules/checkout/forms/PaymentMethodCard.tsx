import { useState } from "react";
import { ShadowContainer } from "@/components/ui/base/containers/ShadowContainer";
import type {PaymentMethod} from "@/types";

const CARDS = [
    { id: "card_1", label: "Карта ·· 42" },
    { id: "card_2", label: "Карта ·· 99" },
];

interface PaymentMethodCardProps { onChange: (id: PaymentMethod) => void; }

export function PaymentMethodCard({ onChange }: PaymentMethodCardProps) {
    const [selectedId, setSelectedId] = useState<string>("card_1");

    const handleSelect = (id: string) => {
        setSelectedId(id);
        onChange(id as PaymentMethod);
    };

    return (
        <ShadowContainer className="p-4">
            <h2 className="text-lg font-bold mb-4 text-black">Способ оплаты</h2>

            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-3">
                    {CARDS.map((card) => {
                        const isSelected = selectedId === card.id;
                        return (
                            <button
                                key={card.id}
                                onClick={() => handleSelect(card.id)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all border-2 ${
                                    isSelected
                                        ? "bg-blue-100 text-blue-800 font-medium border-blue-800"
                                        : "bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
                                }`}
                            >
                                {card.label}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => console.log("Добавление карты...")}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all border-2 bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
                    >
                        Добавить карту
                    </button>
                </div>

                <button
                    onClick={() => handleSelect("cash")}
                    className={`w-fit text-left px-3 py-2 rounded-lg text-sm transition-all border-2 ${
                        selectedId === "cash"
                            ? "bg-blue-100 text-blue-800 font-medium border-blue-800"
                            : "bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
                    }`}
                >
                    Наличными при получении
                </button>
            </div>
        </ShadowContainer>
    );
}