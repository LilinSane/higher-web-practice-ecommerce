import {useGetCartQuery} from '@/api/cartApi';
import {useAppSelector} from '@/store/store';
import {HeadingText} from "@/components/ui/base/text/HeadingText.tsx";
import {ShadowContainer} from "@/components/ui/base/containers/ShadowContainer.tsx";
import {CartItem} from "@/components/modules/cart/CartItem.tsx";
import {CartSummary} from "@/components/modules/cart/CartSummary.tsx";

export function CartPage() {
    const userId = useAppSelector((state) => state.user.userId);
    const {data: cartItems = []} = useGetCartQuery(userId || '', {skip: !userId});

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const isFormValid = cartItems.length > 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-36 lg:pb-0">
            <div className="lg:col-span-2 flex flex-col gap-6">

                <div className="flex justify-between items-end">
                    <HeadingText className="text-3xl">Корзина</HeadingText>
                </div>

                {cartItems.length === 0 ? <p>Корзина пуста</p> : (
                    <div className="flex flex-col gap-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="lg:shadow-none">
                                <div className="hidden lg:block">
                                    <ShadowContainer><CartItem item={item}/></ShadowContainer>
                                </div>
                                <div className="lg:hidden border-b border-gray-200 py-2">
                                    <CartItem item={item}/>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="fixed bottom-12 left-0 w-full z-40 lg:static lg:z-0 lg:col-span-1">
                <div>
                    <CartSummary totalItems={totalItems} totalPrice={totalPrice} isFormValid={isFormValid}/>
                </div>
            </div>
        </div>
    );
}