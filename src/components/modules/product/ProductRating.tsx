import Star from "@/assets/Star.svg?react";
import {useGetRatingsQuery, useRateProductMutation, useDeleteRatingMutation} from "@/api/catalogApi.ts";
import {useAppSelector} from "@/store/store.ts";
import type {Product} from "@/types";
import React, {memo, useMemo} from "react";
import {useGetProfileQuery} from "@/api/userApi.ts";
import {useGetOrdersQuery} from "@/api/ordersApi.ts";

interface ProductRatingProps {
    product: Product;
}

export const ProductRating = memo(({product}: ProductRatingProps) => {
    const {data: ratings = []} = useGetRatingsQuery();
    const [rateProduct] = useRateProductMutation();
    const [deleteRating] = useDeleteRatingMutation();
    const userId = useAppSelector((state) => state.user.userId);
    const { data: user } = useGetProfileQuery(userId!, {
        skip: !userId,
    });
    const { data: orders = [] } = useGetOrdersQuery(userId!, { skip: !userId });

    const productRatings = useMemo(() =>
            ratings.filter(r => r.productId === product.id),
        [ratings, product.id]);

    const userRating = useMemo(() =>
            productRatings.find(r => r.userId === userId),
        [productRatings, userId]);

    const hasPurchased = useMemo(() => {
        return orders.some(order =>
            order.items.some(item => item.productId === product.id)
        );
    }, [orders, product.id]);

    const handleStarClick = async (e: React.MouseEvent<HTMLButtonElement>, rating: number) => {
        e.preventDefault();
        e.stopPropagation();

        if (!userId || !hasPurchased) return;

        if (userRating && userRating.rating === rating) {
            await deleteRating(userRating.id).unwrap();
        } else {
            if (userRating) await deleteRating(userRating.id).unwrap();

            await rateProduct({
                productId: product.id,
                userId: userId,
                rating: rating,
                userName: `${user.firstName} ${user.lastName.charAt(0)}.`,
            }).unwrap();
        }
    };

    return (
        <div className="mt-8">
            <h3 className="font-bold text-lg mb-2">Оценить товар</h3>
            <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((num) => (
                    <button
                        key={num}
                        onClick={(e) => handleStarClick(e, num)}
                        type="button"
                        disabled={!userId}
                        className="cursor-pointer"
                    >
                        <Star
                            className={`w-8 h-8 transition ${userRating && userRating.rating >= num ? "text-blue-700 fill-blue-700" : "text-blue-200 hover:text-blue-400"}`}/>
                    </button>
                ))}
            </div>

            <div className="flex flex-col">
                {productRatings.filter(r => r.productId === product.id).map((rating) => (
                    <div key={rating.id} className="flex justify-between items-center py-4 border-t border-gray-200">
                        <div className="flex items-center gap-3">
                            <span className="font-bold">{rating.userName}</span>
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map(n => (
                                    <Star key={n}
                                          className={`w-4 h-4 ${rating.rating >= n ? "text-blue-700 fill-blue-700" : "text-gray-200"}`}/>
                                ))}
                            </div>
                            <span className="text-sm font-semibold">{rating.rating}</span>
                        </div>
                        <span className="text-gray-500 text-sm">{new Date(rating.createdAt).toLocaleDateString()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
});
