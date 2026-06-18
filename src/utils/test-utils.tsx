import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { baseApi } from '@/api/baseApi';
import catalogReducer from '@/store/slices/catalogSlice';
import userReducer from '@/store/slices/userSlice';

export function renderWithProviders(ui: React.ReactElement) {
    const store = configureStore({
        reducer: {
            [baseApi.reducerPath]: baseApi.reducer,
            catalog: catalogReducer,
            user: userReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(baseApi.middleware),
    });

    return render(<Provider store={store}>{ui}</Provider>);
}