import {AppGrid} from "@/components/ui/base/grid/AppGrid.tsx";
import {CatalogContainer} from "@/components/modules/catalog/CatalogContainer.tsx";
import {HeadingText} from "@/components/ui/base/text/HeadingText.tsx";
import {ShadowContainer} from "@/components/ui/base/containers/ShadowContainer.tsx";
import {CatalogToolbar} from "@/components/modules/catalog/CatalogToolbar.tsx";
import {Pagination} from "@/components/ui/base/pagination/Pagination.tsx";
import {CatalogFilter} from "@/components/modules/catalog/CatalogFilter.tsx";
import {useCatalog} from "@/hooks/useCatalog.ts";
import {useAppDispatch, useAppSelector} from "@/store/store.ts";
import {setCurrentPage} from "@/store/slices/catalogSlice";
import {IconButton} from "@/components/ui/base/buttons/IconButton.tsx";
import Filter from '@/assets/Filter.svg?react';
import { useState} from "react";
import Arrow from '@/assets/Arrow.svg?react';
import {useNavigate} from "react-router-dom";
import {useAddToCartMutation} from "@/api/cartApi.ts";

export function CatalogPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userId = useAppSelector((state) => state.user.userId);
    const [addToCart] = useAddToCartMutation();

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const {paginatedProducts, totalPages, currentPage, categories, styles, densities, isLoading} = useCatalog();

    if (isLoading) {
        return <div>Загрузка товаров...</div>;
    }


    const handleBuyProduct = (productId: string) => {
        if (!userId) {
            navigate('/login');
            return;
        }

        const product = paginatedProducts.find(p => p.id === productId);
        if (product) {
             addToCart({ userId, product });
             navigate('/profile/cart')
        }
    };

    return (
        <AppGrid className="grid-cols-1 md:grid-cols-3 pt-6 items-start">
            <div className="hidden md:block ">
                <CatalogFilter categories={categories} styles={styles} densities={densities}/>
            </div>

            <div className="md:hidden">
                {isFilterOpen && (
                    <div className="fixed inset-0 z-50 bg-[#F9FAFB] p-4 md:hidden overflow-y-auto mb-10">
                        <div className="flex items-center gap-4 mb-6">
                            <IconButton className="text-foreground" label="" icon={Arrow}
                                        onClick={() => setIsFilterOpen(false)}/>
                            <HeadingText>Фильтры</HeadingText>
                        </div>
                        <div key="mobile-filter">
                            <CatalogFilter
                                categories={categories}
                                styles={styles}
                                densities={densities}
                            />
                        </div>
                    </div>
                )}
            </div>

            <main className="col-span-1 md:col-span-2 w-full">
                <div className="flex items-center justify-between gap-4 mb-5">
                    <HeadingText>УСЫ</HeadingText>
                    <div className="hidden md:flex">
                        <CatalogToolbar/>
                    </div>
                    <div className="md:hidden">
                        <IconButton label={""} icon={Filter} onClick={() => setIsFilterOpen(true)}/>
                    </div>
                </div>

                <ShadowContainer>
                    <CatalogContainer
                        products={paginatedProducts}
                        onBuyProduct={handleBuyProduct}
                    />
                </ShadowContainer>

                <div className="mt-8">
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => {
                                dispatch(setCurrentPage(page))
                                window.scrollTo({top: 0, behavior: 'smooth'});
                            }}
                        />
                    )}
                </div>
            </main>
        </AppGrid>
    );
}