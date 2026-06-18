import {baseApi} from './baseApi';
import type {Product, ProductRating} from '@/types';

export const catalogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => '/products',
            providesTags: ['Products'],
        }),
        getProductById: builder.query<Product, string>({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{type: 'Products', id}],
        }),
        getRatings: builder.query<ProductRating[], void>({
            query: () => '/ratings',
            providesTags: ['Ratings'],
        }),
        rateProduct: builder.mutation<ProductRating, Omit<ProductRating, 'id' | 'createdAt' | 'userName'>>({
            query: (body) => ({
                url: '/ratings',
                method: 'POST',
                body: {
                    ...body,
                    id: crypto.randomUUID(),
                    createdAt: new Date().toISOString()
                },
            }),
            invalidatesTags: ['Ratings'],
        }),
        deleteRating: builder.mutation<void, string>({
            query: (ratingId) => ({
                url: `/ratings/${ratingId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Ratings'],
        }),
        getPickupPoints: builder.query<{ id: string; name: string; address: string }[], void>({
            query: () => '/pickupPoints',
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useGetRatingsQuery,
    useRateProductMutation,
    useDeleteRatingMutation,
    useGetPickupPointsQuery
} = catalogApi;