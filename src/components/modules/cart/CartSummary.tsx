import {ShadowContainer} from "@/components/ui/base/containers/ShadowContainer.tsx";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/lib/button.tsx";

interface CartSummaryProps {
    totalItems: number;
    totalPrice: number;
    isFormValid: boolean;
}

export function CartSummary({totalItems, totalPrice, isFormValid}: CartSummaryProps) {
    const navigate = useNavigate();

    return (
        <ShadowContainer className="p-6 h-fit flex flex-col gap-4">
            <div className="flex justify-between items-end">
                <h2 className="font-bold text-lg">Ваша корзина</h2>
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

            <Button
                variant="primaryBlue"
                disabled={!isFormValid}
                onClick={() => navigate('/checkout')}
                className="w-full py-5">
                Оформить заказ
            </Button>
        </ShadowContainer>
    );
}