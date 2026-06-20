import { Link } from "react-router-dom";
import type { OrderItem } from "@/types";

interface OrderItemsListProps {
    items: OrderItem[];
}

export function OrderItemsList({ items }: OrderItemsListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
            {items.map((item) => (
                <div key={item.productId} className="flex items-center gap-4 border-gray-100  last:border-0 last:pb-0">
                    <Link to={`/product/${item.productId}`}>
                        <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200 flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                    </Link>

                    <div className="flex flex-col gap-1 overflow-hidden">
                        <Link to={`/product/${item.productId}`}>
                            <span className="text-blue-900 font-medium truncate block">
                                {item.name}
                            </span>
                        </Link>

                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="font-bold text-gray-900">
                                {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600">{item.quantity} шт.</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}