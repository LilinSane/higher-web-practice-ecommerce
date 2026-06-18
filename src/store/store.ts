import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '@/api/baseApi';
import { useDispatch, useSelector } from 'react-redux';
import catalogReducer from './slices/catalogSlice.ts';
import authReducer from './slices/authSlice.ts';
import userReducer from './slices/userSlice.ts';
import ordersReducer from './slices/ordersSlice.ts';

const rootReducer = combineReducers({
    catalog: catalogReducer,
    auth: authReducer,
    user: userReducer,
    orders: ordersReducer,
    [baseApi.reducerPath]: baseApi.reducer,
});

const persistedUser = localStorage.getItem('user');

const preloadedState = persistedUser
    ? { auth: { user: JSON.parse(persistedUser), isAuthenticated: true } }
    : undefined;

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
    preloadedState
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();