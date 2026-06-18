import {HeadingText} from "@/components/ui/base/text/HeadingText.tsx";
import {ShadowContainer} from "@/components/ui/base/containers/ShadowContainer.tsx";
import {Button} from "@/components/ui/lib/button.tsx";
import {useNavigate} from "react-router-dom";
import {useGetOrdersQuery} from "@/api/ordersApi.ts";
import {useAppSelector} from "@/store/store";
import {OrderRecipientInfo} from "@/components/modules/order-sucess/OrderRecipientInfo.tsx";
import {OrderAddressInfo} from "@/components/modules/order-sucess/OrderAddressInfo.tsx";
import {useGetPickupPointsQuery} from "@/api/catalogApi.ts";
import {OrderItemsList} from "@/components/modules/order-sucess/OrderItemList.tsx";
import React from "react";

export function OrderSuccessPage() {
    const navigate = useNavigate();
    const userId = useAppSelector((state) => state.user.userId);

    const {data: orders = []} = useGetOrdersQuery(userId || '', {skip: !userId});
    const { data: points = [] } = useGetPickupPointsQuery();

    const lastOrder = orders[0];

    if (!lastOrder) return null;

    const pickupPoint = points.find(p => p.id === lastOrder.pickupPointId);

    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <div className="text-left mb-10">
                <HeadingText className="text-4xl mb-4">Спасибо за покупку!</HeadingText>
                <h2 className="font-bold text-xl">Мы уже готовим выбранные усы к отправке!</h2>
            </div>

            <ShadowContainer className="p-6">
                <OrderRecipientInfo customer={lastOrder.customer} comment={lastOrder.comment}/>
                <div className="border-t border-gray-400 mt-5"></div>
                <OrderAddressInfo
                    deliveryMethod={lastOrder.deliveryMethod}
                    address={lastOrder.deliveryAddress}
                    pickupAddress={pickupPoint?.address}
                />
                <div className="border-t border-gray-400 mt-5"></div>
                <OrderItemsList items={lastOrder.items}/>
                <div className="border-t border-gray-400 mt-5 pt-5 flex gap-3">
                    <div>
                        <h3 className="text-sm font-normal text-gray-500 mb-1">Общая сумма</h3>
                        <span
                            className="font-bold text-gray-900 text-2xl">{lastOrder.totalPrice.toLocaleString()} ₽</span>
                    </div>
                    <div>
                        <h3 className="text-sm font-normal text-gray-500 mb-1">{lastOrder.paymentMethod === 'card_online'
                            ? 'Оплачено картой'
                            : 'Оплата наличными'}
                        </h3>
                        <span
                            className="font-bold text-gray-400 text-2xl">{lastOrder.paymentMethod === 'card_online'
                            ? '*43 54'
                            : ''}
                        </span>
                    </div>
                </div>
            </ShadowContainer>

            <div className="mt-8 flex justify-between">
                <div>
                    <Button variant="primaryBlue" className="p-5">
                        Распечатать
                    </Button>
                </div>
                <div>
                    <a href="/profile/orders" className="text-blue-900 font-medium hover:underline">
                        Все заказы
                    </a>
                </div>
            </div>
            <div className="fixed bottom-14 left-0 w-full p-4 bg-white border-t border-gray-200 z-50 lg:hidden">
                <Button
                    variant="primaryBlue"
                    className="w-full p-5"
                    onClick={() => navigate('/')}
                >
                    Вернуться к покупкам
                </Button>
            </div>
        </div>
    );
}