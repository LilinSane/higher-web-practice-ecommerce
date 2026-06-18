import {ShadowContainer} from "@/components/ui/base/containers/ShadowContainer.tsx";
import {Button} from "@/components/ui/lib/button.tsx";

interface CheckoutSummaryProps {
    totalItems: number;
    totalPrice: number;
    onSubmit: () => void;
    isFormValid: boolean;
}

export function CheckoutSummary({totalItems, totalPrice, onSubmit, isFormValid}: CheckoutSummaryProps) {
    return (
        <ShadowContainer className="p-6 h-fit flex flex-col gap-4">
            <div className="flex justify-between items-end">
                <h2 className="font-bold text-lg">Ваш заказ</h2>
                <span className="text-gray-500 text-sm">
                        {totalItems} {totalItems === 1 ? 'товар' : 'товара'}
                </span>
            </div>

            <div className="flex justify-between text-sm text-gray-500">
                <span>Сумма заказа</span>
                <span className="text-[#10B981] font-bold text-lg">
                    {totalPrice.toLocaleString()} ₽
                </span>
            </div>

            <div className="flex justify-between text-sm text-gray-500">
                <span>Стоимость доставки</span>
                <span className="text-[#10B981] font-bold text-lg">
                    бесплатно
                </span>
            </div>

            <div className="flex justify-between text-sm text-gray-500 border-t border-gray-200">
                <span>Итого</span>
                <span className="text-[#10B981] font-bold text-lg">
                    {totalPrice.toLocaleString()} ₽
                </span>
            </div>

            <Button
                variant="primaryBlue"
                disabled={!isFormValid}
                onClick={onSubmit}
                className="w-full py-5">
                Оплатить
            </Button>
        </ShadowContainer>
    );
}