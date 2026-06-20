import {useState} from "react";
import {ShadowContainer} from "@/components/ui/base/containers/ShadowContainer";
import {CommonInput} from "@/components/ui/base/inputs/CommonInput";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/lib/select";
import {useFormErrors} from "@/hooks/useFormErrors.ts";
import {composeValidators, validateAddress, validateRequired} from "@/utils/validation.ts";
import type {DeliveryMethod, PickupPoint} from "@/types";

interface DeliveryMethodCardProps {
    onChange: (m: DeliveryMethod) => void;
    onAddressChange: (val: string) => void;
    points: PickupPoint[];
    selectedPickupPointId: string | null;
    onPickupPointChange: (id: string) => void;
}

export function DeliveryMethodCard({
                                       onChange,
                                       onAddressChange,
                                       points,
                                       selectedPickupPointId,
                                       onPickupPointChange
                                   }: DeliveryMethodCardProps) {
    const [method, setMethod] = useState<"courier" | "pickup">("courier");
    const [city, setCity] = useState<string>("moscow");


    const { errors, setErrors, clearError } = useFormErrors<{address: string | null}>({ address: null });

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const error = composeValidators(val, [validateRequired, validateAddress]);
        if (error) {
            setErrors({ address: error });
            onAddressChange("");
        } else {
            clearError('address');
            onAddressChange(val);
        }
    };

    const handleMethodSelect = (m: "courier" | "pickup") => {
        setMethod(m);
        onChange(m === "courier" ? "courier" : "pickup_point");

        if (m === "pickup") {
            onAddressChange("");
        }
    };

    const currentPickupPoint = points.find(p => p.id === selectedPickupPointId);

    return (
        <ShadowContainer className="p-4">
            <h2 className="text-lg font-bold mb-4 text-black">Способ доставки</h2>

            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                    <button
                        data-testid="courier-tab"
                        onClick={() => handleMethodSelect("courier")}
                        className={`w-full px-3 py-2 rounded-lg text-sm transition-all border-2 ${
                            method === "courier"
                                ? "bg-blue-100 text-blue-800 font-medium border-blue-800"
                                : "bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
                        }`}
                    >
                        Курьером
                    </button>
                    <button
                        data-testid="pickup-tab"
                        onClick={() => handleMethodSelect("pickup")}
                        className={`w-full px-3 py-2 rounded-lg text-sm transition-all border-2 ${
                            method === "pickup"
                                ? "bg-blue-100 text-blue-800 font-medium border-blue-800"
                                : "bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
                        }`}
                    >
                        В пункт выдачи
                    </button>
                </div>

                {method === "courier" ? (
                    <div className="flex flex-row gap-3 items-center">
                        <div className="h-10">
                            <Select value={city} onValueChange={setCity}>
                                <SelectTrigger className="w-50 py-5 bg-white border-gray-200">
                                    <SelectValue placeholder="Выберите город"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="moscow">Москва</SelectItem>
                                    <SelectItem value="spb">Санкт-Петербург</SelectItem>
                                    <SelectItem value="ekb">Екатеринбург</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <CommonInput
                            id="address"
                            label=""
                            placeholder="Улица, дом, квартира"
                            error={errors.address || undefined}
                            onChange={handleAddressChange}
                        />
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <div className="h-10">
                            <Select
                                value={selectedPickupPointId || ""}
                                onValueChange={onPickupPointChange}
                            >
                                <SelectTrigger className="w-50 py-5 bg-white border-gray-200">
                                    <SelectValue placeholder="Выберите пункт выдачи" />
                                </SelectTrigger>
                                <SelectContent>
                                    <>
                                        {points.map((point) => (
                                            <SelectItem key={point.id} value={point.id}>
                                                {point.name}
                                            </SelectItem>
                                        ))}
                                    </>
                                </SelectContent>
                            </Select>
                        </div>
                        {currentPickupPoint && (
                        <div className="flex flex-col">
                            <span className="font-medium text-black">{currentPickupPoint.address}</span>
                            <span className="text-sm text-gray-600">Время работы 9:00 - 21:00</span>
                        </div>
                        )}
                    </div>
                )}

                <div className="mt-2 text-sm text-gray-500">
                    Доставят <span className="font-medium text-black">19 июня, 2026</span>
                </div>
            </div>
        </ShadowContainer>
    );
}