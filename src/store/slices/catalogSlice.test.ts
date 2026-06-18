import catalogReducer, {
    toggleStyle,
    resetFilters,
    setCategory,
    selectIsFiltersEmpty,
    setSortType
} from './catalogSlice';

describe('catalogSlice', () => {
    const initialState = {
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

    test('toggleStyle должен добавлять и удалять стиль', () => {
        const state1 = catalogReducer(initialState, toggleStyle('modern'));
        expect(state1.selectedStyles).toContain('modern');
        expect(state1.currentPage).toBe(1);

        const state2 = catalogReducer(state1, toggleStyle('modern'));
        expect(state2.selectedStyles).not.toContain('modern');
    });

    test('resetFilters должен сбрасывать всё состояние', () => {
        const dirtyState = {
            ...initialState,
            selectedCategory: 'furniture',
            selectedStyles: ['modern'],
            priceFrom: '100'
        };

        const state = catalogReducer(dirtyState, resetFilters());
        expect(state).toEqual(initialState);
    });

    test('setCategory должен менять категорию и сбрасывать страницу', () => {
        const state = catalogReducer({ ...initialState, currentPage: 5 }, setCategory('chairs'));
        expect(state.selectedCategory).toBe('chairs');
        expect(state.currentPage).toBe(1);
    });

    describe('selectIsFiltersEmpty', () => {
        test('должен возвращать true, когда фильтры не выбраны', () => {
            const state = { catalog: initialState };
            expect(selectIsFiltersEmpty(state)).toBe(true);
        });

        test('должен возвращать false, если выбран хотя бы один фильтр', () => {
            const stateWithFilters = {
                catalog: { ...initialState, selectedCategory: 'tables' }
            };
            expect(selectIsFiltersEmpty(stateWithFilters)).toBe(false);
        });

        test('должен возвращать false, если включен чекбокс (boolean)', () => {
            const stateWithCharisma = {
                catalog: { ...initialState, selectedCharisma: true }
            };
            expect(selectIsFiltersEmpty(stateWithCharisma)).toBe(false);
        });
    });
});