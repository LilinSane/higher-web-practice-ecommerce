import {useMemo} from 'react';
import {useGetProductsQuery} from '@/api/catalogApi';
import {useAppSelector} from "@/store/store.ts";

export function useCatalog() {
    const {data: products = [], isLoading, error} = useGetProductsQuery();
    const {
        sortType,
        selectedCategory,
        selectedStyles,
        selectedDensity,
        selectedCharisma,
        selectedWax,
        priceFrom,
        priceTo,
        currentPage
    } = useAppSelector(state => state.catalog);

    const ITEMS_PER_PAGE = 8;

    const categories = useMemo(() =>
            Array.from(new Set(products.map(p => p.characteristics["категория"]).filter(Boolean))),
        [products]);

    const styles = useMemo(() =>
            Array.from(new Set(products.map(p => p.characteristics["стиль"]).filter(Boolean))),
        [products]);

    const densities = useMemo(() =>
            Array.from(new Set(products.map(p => p.characteristics["густота"]).filter(Boolean))),
        [products]);

    const {paginatedProducts, totalPages} = useMemo(() => {
        let result = [...products];

        if (selectedCategory) {
            result = result.filter(p => p.characteristics["категория"] === selectedCategory);
        }
        if (selectedStyles.length > 0) {
            result = result.filter(p => selectedStyles.includes(p.characteristics["стиль"]));
        }

        if (selectedDensity) {
            result = result.filter(p => p.characteristics["густота"] === selectedDensity);
        }

        if (selectedCharisma) {
            result = result.filter(p => Number(p.characteristics["харизма"]) >= 4);
        }
        if (selectedWax) {
            result = result.filter(p => p.characteristics["закрученность"] === "Высокая");
        }

        if (priceFrom) {
            result = result.filter(p => p.price >= Number(priceFrom));
        }

        if (priceTo) {
            result = result.filter(p => p.price <= Number(priceTo));
        }

        if (sortType) {
            result.sort((a, b) => {
                if (sortType === 'price_asc') return a.price - b.price;
                if (sortType === 'price_desc') return b.price - a.price;
                if (sortType === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                if (sortType === 'rating') return b.rating - a.rating;
                return 0;
            });
        }

        const totalItems = result.length;
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

        return {
            paginatedProducts: result.slice(startIndex, startIndex + ITEMS_PER_PAGE),
            totalPages
        };
    }, [products, selectedCategory, selectedStyles, selectedDensity, selectedCharisma, selectedWax, priceFrom, priceTo, sortType, currentPage]);

    return {
        paginatedProducts,
        totalPages,
        currentPage,
        categories,
        styles,
        densities,
        selectedCharisma,
        selectedWax,
        isLoading,
        error
    };
}