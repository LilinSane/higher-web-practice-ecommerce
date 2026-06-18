import { baseApi } from './baseApi';
import type { CartItem, Product } from '@/types';

export const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query<CartItem[], string>({
            query: (userId) => `/cart?userId=${userId}`,
            providesTags: ['Cart'],
        }),

        addToCart: builder.mutation<CartItem, { userId: string; product: Product }>({
            queryFn: async ({ userId, product }, { dispatch }, _, baseQuery) => {
                const cart = await dispatch(cartApi.endpoints.getCart.initiate(userId)).unwrap();
                const existingItem = cart.find(i => i.productId === product.id);

                if (existingItem) {
                    return await baseQuery({
                        url: `/cart/${existingItem.id}`,
                        method: 'PATCH',
                        body: { quantity: existingItem.quantity + 1 }
                    });
                }

                return await baseQuery({
                    url: '/cart',
                    method: 'POST',
                    body: {
                        id: crypto.randomUUID(),
                        userId,
                        productId: product.id,
                        product: product,
                        quantity: 1,
                        price: product.price
                    }
                });
            },
            invalidatesTags: ['Cart'],
        }),

        updateQuantity: builder.mutation<CartItem, { id: string; quantity: number }>({
            query: ({ id, quantity }) => ({
                url: `/cart/${id}`,
                method: 'PATCH',
                body: { quantity },
            }),
            invalidatesTags: ['Cart'],
        }),

        removeFromCart: builder.mutation<void, string>({
            query: (id) => ({
                url: `/cart/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),
    }),
});

export const {
    useGetCartQuery,
    useAddToCartMutation,
    useUpdateQuantityMutation,
    useRemoveFromCartMutation
} = cartApi;