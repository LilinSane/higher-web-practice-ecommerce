import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useCatalog } from './useCatalog';
import catalogReducer, { initialState as catalogInitialState } from '@/store/slices/catalogSlice';
import { catalogApi } from '@/api/catalogApi';
import { useGetProductsQuery } from '@/api/catalogApi';

jest.mock('@/api/catalogApi', () => {
    const actualApi = jest.requireActual('@/api/catalogApi');
    return {
        ...actualApi,
        useGetProductsQuery: jest.fn(),
    };
});


const mockProducts = [
    { id: '1', price: 100, characteristics: { "категория": "Усы", "стиль": "Классика" }, rating: 5, createdAt: '2023-01-01' },
    { id: '2', price: 200, characteristics: { "категория": "Борода", "стиль": "Хипстер" }, rating: 3, createdAt: '2023-01-02' },
];

describe('useCatalog: Логика фильтрации', () => {
    const createStore = (customState = {}) => configureStore({
        reducer: {
            catalog: catalogReducer,
            [catalogApi.reducerPath]: catalogApi.reducer
        },
        preloadedState: {
            catalog: {
                ...catalogInitialState,
                ...customState
            }
        }
    });

    beforeEach(() => {
        (useGetProductsQuery as jest.Mock).mockReturnValue({
            data: mockProducts,
            isLoading: false,
        });
    });

    test('фильтрует по категории', () => {
        const store = createStore({ selectedCategory: 'Усы' });
        const { result } = renderHook(() => useCatalog(), {
            wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
        });

        expect(result.current.paginatedProducts).toHaveLength(1);
        expect(result.current.paginatedProducts[0].id).toBe('1');
    });

    test('сортирует по возрастанию цены', () => {
        const store = createStore({ sortType: 'price_asc' });
        const { result } = renderHook(() => useCatalog(), {
            wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
        });

        expect(result.current.paginatedProducts[0].price).toBe(100);
        expect(result.current.paginatedProducts[1].price).toBe(200);
    });

    test('фильтрует по диапазону цен (priceFrom)', () => {
        const store = createStore({ priceFrom: "150" });
        const { result } = renderHook(() => useCatalog(), {
            wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
        });

        expect(result.current.paginatedProducts).toHaveLength(1);
        expect(result.current.paginatedProducts[0].price).toBe(200);
    });
});