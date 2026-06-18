import {ShadowContainer} from "@/components/ui/base/containers/ShadowContainer.tsx";
import type {Order, OrderStatus} from "@/types";
import Arrow from "@/assets/Arrow.svg?react";
import {useState} from "react";
import {Link} from "react-router-dom";

interface OrderCardProps {
    order: Order;
}

const statusMap: Record<OrderStatus, string> = {
    pending: 'Ожидает оплаты',
    paid: 'Оплачен',
    processing: 'В обработке',
    shipped: 'Отправлен',
    delivered: 'Доставлен',
    cancelled: 'Отменен',
};

export function OrderCard({order}: OrderCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <ShadowContainer className="p-6">
            <div className="flex justify-between items-center mb-2">
                <div className="flex gap-4 text-gray-900">
                    <span className="text-xl font-bold text-gray-900">
                        от {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                    <span>{order.number}</span>
                </div>
                <div className="font-bold text-lg">{order.totalPrice.toLocaleString()} ₽</div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-4 text-gray-500">
                    <span className="text-[#10B981] text-lg font-bold font-medium">
                        {statusMap[order.status]}
                    </span>
                    <span className="text-sm p-1">
                        {order.deliveryMethod === 'pickup_point' ? 'В пункте выдачи' : 'Курьерская доставка'}
                    </span>
                </div>
                <div className="text-sm text-gray-500">
                    {order.paymentMethod === 'card_online' ? 'Картой онлайн' : 'При получении'}
                </div>
            </div>

            <div className="pt-4 flex flex-col gap-4">
                {isExpanded && (
                    <div className="flex flex-col gap-3">
                        {order.items.map((item, index) => (
                            <div key={item.productId}
                                 className="border-t-2 border-gray-200 flex items-center gap-4 p-2">
                                <Link to={`/product/${item.productId}`}>
                                    <div
                                        className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover"/>
                                    </div>
                                </Link>

                                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                    <Link to={`/product/${item.productId}`}>
                                        <span className="text-blue-900 font-medium truncate">
                                            {item.name}
                                        </span>
                                    </Link>
                                    <span className="text-gray-500 text-sm">
                                        Параметр {index + 1}
                                    </span>
                                </div>

                                <div className="font-bold text-gray-900">
                                    {item.price.toLocaleString()} ₽
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="border-t-2 border-gray-200 pt-4 flex justify-center">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 text-blue-900 font-medium hover:underline transition-all"
                >
                    {isExpanded ? 'Скрыть товары' : 'Показать товары в заказе'}
                    <Arrow
                        className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : '-rotate-90'}`}/>
                </button>
            </div>
        </ShadowContainer>
    );
}