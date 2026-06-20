import {HeadingText} from "@/components/ui/base/text/HeadingText.tsx";
import {PaymentMethodCard} from "@/components/modules/checkout/forms/PaymentMethodCard.tsx";
import {useGetCartQuery, useRemoveFromCartMutation} from "@/api/cartApi";
import {useAppSelector} from "@/store/store";
import {DeliveryMethodCard} from "@/components/modules/checkout/forms/DeliveryMethodCard.tsx";
import {CustomerInfoCard} from "@/components/modules/checkout/forms/CustomerInfoCard.tsx";
import {CheckoutSummary} from "@/components/modules/checkout/CheckoutSummary.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useCreateOrderMutation} from "@/api/ordersApi.ts";
import {useState} from "react";
import type {DeliveryMethod, Order, PaymentMethod} from "@/types";
import {parseAddressString} from "@/utils/addressParser.ts";
import {useGetPickupPointsQuery} from "@/api/catalogApi.ts";
import {useGetProfileQuery} from "@/api/userApi.ts";

export function CheckoutPage() {
    const navigate = useNavigate();
    const userId = useAppSelector((state) => state.user.userId);

    const { data: user } = useGetProfileQuery(userId || '', { skip: !userId });
    const {data: cartItems = [], isLoading: isCartLoading} = useGetCartQuery(userId || '', {skip: !userId});
    const {data: points = []} = useGetPickupPointsQuery();

    const [createOrder] = useCreateOrderMutation();
    const [removeFromCart] = useRemoveFromCartMutation();

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card_online');
    const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('courier');

    const [phone, setPhone] = useState("");
    const [comment, setComment] = useState("");
    const [addressStr, setAddressStr] = useState("");
    const [selectedPickupPointId, setSelectedPickupPointId] = useState<string | null>(null);

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const isFormValid = totalItems > 0 && phone !== "" && (
        (deliveryMethod === 'courier' && addressStr !== "") ||
        (deliveryMethod === 'pickup_point' && selectedPickupPointId !== null)
    );

    const handleCreateOrder = async () => {
        if (!user || totalItems === 0) return;

        const fullOrder: Order = {
            id: crypto.randomUUID(),
            number: `ЗАКАЗ-${Date.now()}`,
            userId: userId || '',
            status: 'pending',
            items: cartItems.map(item => ({
                productId: item.productId,
                name: item.product.name,
                image: item.product.images[0],
                price: item.price,
                quantity: item.quantity
            })),
            totalPrice: totalPrice,
            paymentMethod,
            deliveryMethod,
            deliveryAddress: deliveryMethod === 'courier' ? parseAddressString(addressStr) : undefined,
            pickupPointId: deliveryMethod === 'pickup_point' ? selectedPickupPointId || undefined : undefined,
            customer: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone
            },
            createdAt: new Date().toISOString(),
            comment
        };

        try {
            await createOrder(fullOrder).unwrap();

            await Promise.all(cartItems.map((item) => removeFromCart(item.id).unwrap()));

            navigate('/order-success');
        } catch (err) {
            console.error("Order failed:", err);
        }
    };

    if (!isCartLoading && cartItems.length === 0) {
        return (
            <div className="max-w-md mx-auto py-16 px-4 text-center">
                <HeadingText className="text-2xl mb-4">Ваша корзина пуста</HeadingText>
                <p className="text-gray-600 mb-6">Для оформления заказа добавьте товары из каталога.</p>
                <Link to="/" className="inline-block bg-blue-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors">
                    Перейти в каталог
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 pb-42">
            <HeadingText className="text-3xl mb-8">Оформление заказа</HeadingText>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 flex flex-col gap-6">
                    <PaymentMethodCard onChange={setPaymentMethod}/>
                    <DeliveryMethodCard
                        onAddressChange={setAddressStr}
                        onChange={setDeliveryMethod}
                        points={points}
                        selectedPickupPointId={selectedPickupPointId}
                        onPickupPointChange={setSelectedPickupPointId}
                    />
                    <CustomerInfoCard onPhoneChange={setPhone} onCommentChange={setComment}/>
                </div>

                <div className="fixed bottom-12 left-0 w-full z-40 lg:static lg:z-0 lg:col-span-1">
                    <div>
                        <CheckoutSummary isFormValid={isFormValid} totalItems={totalItems} totalPrice={totalPrice} onSubmit={handleCreateOrder}/>
                    </div>
                </div>
            </div>
        </div>
    );
}