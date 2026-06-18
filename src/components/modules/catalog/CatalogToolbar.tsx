import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/lib/select.tsx";
import { useAppDispatch, useAppSelector } from "@/store/store.ts";
import { setSortType } from "@/store/slices/catalogSlice";
import type { ProductSort } from "@/types";

export function CatalogToolbar() {
    const dispatch = useAppDispatch();
    const sortType = useAppSelector((state) => state.catalog.sortType);

    const [displayType, setDisplayType] = useState<string>("none");

    const handleSortChange = (value: string) => {
        dispatch(setSortType(value === "none" ? "" : (value as ProductSort)));
    };

    return (
        <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-[160px]">
                <Select value={sortType || "none"} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-full bg-background border-input shadow-sm">
                        <SelectValue placeholder="Сортировка" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">По умолчанию</SelectItem>
                        <SelectItem value="popular">По популярности</SelectItem>
                        <SelectItem value="price_asc">Сначала дешевле</SelectItem>
                        <SelectItem value="price_desc">Сначала дороже</SelectItem>
                        <SelectItem value="newest">Новинки</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="w-[160px]">
                <Select value={displayType} onValueChange={setDisplayType}>
                    <SelectTrigger className="w-full bg-background border-input shadow-sm">
                        <SelectValue placeholder="Отображение" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">По умолчанию</SelectItem>
                        <SelectItem value="grid">Сетка</SelectItem>
                        <SelectItem value="list">Список</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}