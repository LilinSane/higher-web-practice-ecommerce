import {HeadingText} from "@/components/ui/base/text/HeadingText.tsx";
import {PaymentMethodCard} from "@/components/modules/checkout/forms/PaymentMethodCard.tsx";
import {useGetCartQuery, useRemoveFromCartMutation} from "@/api/cartApi";
import {useAppSelector} from "@/store/store";
import {DeliveryMethodCard} from "@/components/modules/checkout/forms/DeliveryMethodCard.tsx";
import {CustomerInfoCard} from "@/components/modules/checkout/forms/CustomerInfoCard.tsx";
import {CheckoutSummary} from "@/components/modules/checkout/CheckoutSummary.tsx";
import {useNavigate} from "react-router-dom";
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
    const {data: cartItems = []} = useGetCartQuery(userId || '', {skip: !userId});
    const {data: points = []} = useGetPickupPointsQuery();

    const [createOrder] = useCreateOrderMutation();
    const [removeFromCart] = useRemoveFromCartMutation();

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card_online');
    const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('courier');

    const [phone, setPhone] = useState("");
    const [comment, setComment] = useState("");
    const [addressStr, setAddressStr] = useState("");

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const pickupPointId = deliveryMethod === 'pickup_point' && points.length > 0
        ? points[0].id
        : undefined;

    const isFormValid = phone !== "" && (deliveryMethod === 'pickup_point' || addressStr !== "");

    const handleCreateOrder = async () => {
        if (!user) return;

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
            pickupPointId,
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

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 pb-42">
            <HeadingText className="text-3xl mb-8">Оформление заказа</HeadingText>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 flex flex-col gap-6">
                    <PaymentMethodCard onChange={setPaymentMethod}/>
                    <DeliveryMethodCard onAddressChange={setAddressStr} onChange={setDeliveryMethod}/>
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