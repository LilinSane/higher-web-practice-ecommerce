import {HeadingText} from "@/components/ui/base/text/HeadingText";
import {Button} from "@/components/ui/lib/button";
import StarIcon from "@/assets/Star.svg?react";
import CartIcon from "@/assets/Shopping_bag.svg?react";
import type {Product} from "@/types";
import React from "react";
import {useGetRatingsQuery} from "@/api/catalogApi.ts";

interface ProductInfoProps {
    product: Product;
    onBuy: () => void;
}

export function ProductInfo({ product, onBuy }: ProductInfoProps) {
    const { data: ratings = [] } = useGetRatingsQuery();
    const charEntries = Object.entries(product.characteristics);

    const productRatings = ratings.filter(r => r.productId === product.id);
    const avgRating = productRatings.length > 0
        ? (productRatings.reduce((acc, r) => acc + r.rating, 0) / productRatings.length).toFixed(1)
        : 0;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-start">
                <HeadingText className="text-2xl">{product.name}</HeadingText>
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1">
                        <StarIcon
                            className="w-6 h-6 text-blue-700 fill-blue-700"/>
                        <span className="font-bold text-lg">{avgRating}</span>
                    </div>
                    <span className="text-gray-500 text-sm">{productRatings.length} оценок</span>
                </div>
            </div>

            <div className="text-2xl font-bold text-[#10B981]">
                {product.price.toLocaleString('ru-RU')} ₽
            </div>

            <div className="flex justify-between items-center">
                <Button variant="primaryBlue" size="lg" className="flex px-18" onClick={onBuy}>
                    <CartIcon className="h-5 w-5"/>
                </Button>
                <span className="text-gray-500">
                    {product.inStock ? 'Есть в наличии' : 'Нет в наличии'}
                </span>
            </div>

            <div>
                <h3 className="font-bold text-lg mb-2">Описание</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="flex flex-col border-t border-gray-200 mt-4">
                {charEntries.map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                        <span className="text-gray-500 capitalize">{key}</span>
                        <span className="font-medium text-gray-900">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}