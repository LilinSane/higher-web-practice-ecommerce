import { useAppDispatch, useAppSelector } from "@/store/store.ts";
import { setPriceFrom, setPriceTo } from "@/store/slices/catalogSlice.ts";
import { HeadingText } from "@/components/ui/base/text/HeadingText.tsx";
import { PriceInput } from "@/components/ui/base/inputs/PriceInput.tsx";

export function PriceFilter() {
    const dispatch = useAppDispatch();
    const { priceFrom, priceTo } = useAppSelector((state) => state.catalog);

    return (
        <div className="mb-6 border-t pt-4">
            <HeadingText className="text-[16px] mb-4">Цена</HeadingText>
            <div className="flex items-center gap-2">
                <PriceInput
                    placeholder="От"
                    value={priceFrom}
                    onChange={(val) => dispatch(setPriceFrom(val))}
                />
                <PriceInput
                    placeholder="До"
                    value={priceTo}
                    onChange={(val) => dispatch(setPriceTo(val))}
                />
            </div>
        </div>
    );
}