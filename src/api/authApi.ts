import { baseApi } from './baseApi';
import type { User, LoginPayload, RegisterPayload } from '@/types';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<User, LoginPayload>({
            query: () => ({
                url: '/users',
                method: 'GET',
            }),
            transformResponse: (users: User[], _meta, arg) => {
                const user = users.find(u => u.email === arg.email && u.password === arg.password);
                if (!user) throw new Error('Неверный email или пароль');
                return user;
            },
        }),
        register: builder.mutation<User, RegisterPayload>({
            query: (userData) => ({
                url: '/users',
                method: 'POST',
                body: { ...userData, createdAt: new Date().toISOString(), id: crypto.randomUUID() },
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;