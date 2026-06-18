import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {ProductSort} from '@/types';

interface CatalogState {
    sortType: ProductSort | "";
    selectedCategory: string | null;
    selectedStyles: string[];
    selectedDensity: string | null;
    selectedCharisma: boolean;
    selectedWax: boolean;
    priceFrom: string;
    priceTo: string;
    currentPage: number;
}

export const initialState: CatalogState = {
    sortType: "",
    selectedCategory: null,
    selectedStyles: [],
    selectedDensity: null,
    selectedCharisma: false,
    selectedWax: false,
    priceFrom: "",
    priceTo: "",
    currentPage: 1,
};


const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setSortType: (state, action: PayloadAction<ProductSort | "">) => {
            state.sortType = action.payload;
            state.currentPage = 1;
        },
        setCategory: (state, action: PayloadAction<string | null>) => {
            state.selectedCategory = action.payload;
            state.currentPage = 1;
        },
        toggleStyle: (state, action: PayloadAction<string>) => {
            const style = action.payload;
            if (state.selectedStyles.includes(style)) {
                state.selectedStyles = state.selectedStyles.filter(s => s !== style);
            } else {
                state.selectedStyles.push(style);
            }
            state.currentPage = 1;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setDensity: (state, action: PayloadAction<string | null>) => {
            state.selectedDensity = action.payload;
            state.currentPage = 1;
        },
        toggleCharisma: (state) => {
            state.selectedCharisma = !state.selectedCharisma;
        },
        toggleWax: (state) => {
            state.selectedWax = !state.selectedWax;
        },
        setPriceFrom: (state, action: PayloadAction<string>) => {
            state.priceFrom = action.payload;
        },
        setPriceTo: (state, action: PayloadAction<string>) => {
            state.priceTo = action.payload;
        },
        resetFilters: (state) => {
            state.selectedCategory = null;
            state.selectedStyles = [];
            state.selectedDensity = null;
            state.selectedCharisma = false;
            state.selectedWax = false;
            state.priceFrom = "";
            state.priceTo = "";
            state.sortType = "";
            state.currentPage = 1;
        }
    }
});

export const {
    setSortType,
    setCategory,
    toggleStyle,
    setDensity,
    toggleCharisma,
    toggleWax,
    setCurrentPage,
    setPriceFrom,
    setPriceTo,
    resetFilters
} = catalogSlice.actions;

export const selectIsFiltersEmpty = (state: { catalog: CatalogState }) => {
    const s = state.catalog;
    return (s.selectedCategory === null &&
        s.selectedStyles.length === 0 &&
        s.selectedDensity === null && !s.selectedCharisma && !s.selectedWax && s.priceFrom === "" && s.priceTo === "" && s.sortType === "");
};

export default catalogSlice.reducer;