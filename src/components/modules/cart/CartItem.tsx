import { Link } from 'react-router-dom';
import type { CartItem } from '@/types';
import { useUpdateQuantityMutation, useRemoveFromCartMutation } from '@/api/cartApi';
import TrashIcon from '@/assets/Trash.svg?react';

interface CartItemProps {
    item: CartItem;
}

export function CartItem({ item }: CartItemProps) {
    const [update] = useUpdateQuantityMutation();
    const [remove] = useRemoveFromCartMutation();

    const handleQuantityChange = (newQty: number) => {
        if (newQty < 1) return remove(item.id);
        update({ id: item.id, quantity: newQty });
    };

    return (
        <div className="flex items-center gap-4 p-2">
            <Link to={`/product/${item.productId}`}>
                <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
            </Link>

            <div className="flex-1 min-w-0">
                <Link to={`/product/${item.productId}`} className="text-blue-900 font-medium truncate block">
                    {item.product.name}
                </Link>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="w-7 h-7 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold transition"
                >
                    -
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold transition"
                >
                    +
                </button>
            </div>

            <div className="flex items-center gap-4 w-32 justify-end">
                <div className="font-bold text-gray-900">
                    {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                </div>
                <button
                    onClick={() => remove(item.id)}
                    className="text-blue-900 hover:text-red-600 transition"
                    aria-label="Удалить товар"
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}