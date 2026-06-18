    import { useGetOrdersQuery } from '@/api/ordersApi';
    import { useAppSelector } from '@/store/store';
    import {HeadingText} from "@/components/ui/base/text/HeadingText.tsx";
    import {OrderCard} from "@/components/modules/orders/OrderCard.tsx";

    export function OrdersPage() {
        const userId = useAppSelector((state) => state.user.userId);
        const { data: orders } = useGetOrdersQuery(userId || '');

        return (
            <div className="flex flex-col gap-6">
                <HeadingText className="text-3xl">История заказов</HeadingText>

                {!orders || orders.length === 0 ? (
                    <p>У вас пока нет заказов.</p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {orders.map(order => (
                            <div key={order.id}>
                                <OrderCard order={order}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }