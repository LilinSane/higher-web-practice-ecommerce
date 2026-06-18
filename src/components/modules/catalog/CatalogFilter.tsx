import { ShadowContainer } from "@/components/ui/base/containers/ShadowContainer.tsx";
import { CategoryFilter } from "@/components/modules/catalog/filters/CategoryFilter.tsx";
import { StyleFilter } from "@/components/modules/catalog/filters/StyleFilter.tsx";
import {DensityFilter} from "@/components/modules/catalog/filters/DensityFilter.tsx";
import {ToggleFilter} from "@/components/modules/catalog/filters/ToggleFilter.tsx";
import {PriceFilter} from "@/components/modules/catalog/filters/PriceFilter.tsx";
import {Button} from "@/components/ui/lib/button.tsx";
import {useAppDispatch, useAppSelector} from "@/store/store.ts";
import {resetFilters, selectIsFiltersEmpty} from "@/store/slices/catalogSlice.ts";


interface CatalogFilterProps {
    categories: string[];
    styles: string[];
    densities: string[];
}

export function CatalogFilter({ categories, styles, densities }: CatalogFilterProps) {
    const dispatch = useAppDispatch();
    const isFiltersEmpty = useAppSelector(selectIsFiltersEmpty);

    return (
        <aside className="p-4 rounded-xl min-h-[300px]">
            <ShadowContainer>
                <CategoryFilter categories={categories} />
                <StyleFilter styles={styles} />
                <DensityFilter densities={densities}/>
                <ToggleFilter />
                <PriceFilter/>
                <Button
                    variant="outline"
                    size="lg"
                    className="w-full mt-4"
                    disabled={isFiltersEmpty}
                    onClick={() => dispatch(resetFilters())}
                >
                    Очистить фильтры
                </Button>
            </ShadowContainer>
        </aside>
    );
}