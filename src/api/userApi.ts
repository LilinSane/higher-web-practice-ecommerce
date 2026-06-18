import { baseApi } from './baseApi';
import type { User, UpdateProfilePayload } from '@/types';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<User, string>({
            query: (id) => `/users/${id}`,
            providesTags: ['User'],
        }),
        updateProfile: builder.mutation<User, { id: string; data: UpdateProfilePayload }>({
            query: ({ id, data }) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = userApi;