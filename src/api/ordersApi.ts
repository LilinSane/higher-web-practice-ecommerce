import { baseApi } from './baseApi';
import type { Order, CreateOrderPayload } from '@/types';

export const ordersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query<Order[], string>({
            query: (userId) => `/orders?userId=${userId}&_sort=createdAt&_order=desc`,
            providesTags: ['Orders'],
        }),
        createOrder: builder.mutation<Order, CreateOrderPayload>({
            query: (payload) => ({
                url: '/orders',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['Orders'],
        }),
    }),
});

export const { useGetOrdersQuery, useCreateOrderMutation } = ordersApi;