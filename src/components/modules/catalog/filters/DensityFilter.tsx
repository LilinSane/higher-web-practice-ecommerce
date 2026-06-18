import { HeadingText } from "@/components/ui/base/text/HeadingText.tsx";
import { useAppDispatch, useAppSelector } from "@/store/store.ts";
import { setDensity } from "@/store/slices/catalogSlice.ts";

interface DensityFilterProps {
    densities: string[];
}

export function DensityFilter({ densities }: DensityFilterProps) {
    const dispatch = useAppDispatch();
    const selectedDensity = useAppSelector((state) => state.catalog.selectedDensity);

    return (
        <div className="mb-6">
            <HeadingText className="text-[16px] mb-4">Густота</HeadingText>
            <div className="flex flex-col gap-2">
                {densities.map((density) => (
                    <label key={density} className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                            type="radio"
                            value={density}
                            checked={selectedDensity === density}
                            onChange={() => dispatch(setDensity(density))}
                            className="text-blue-600"
                        />
                        {density}
                    </label>
                ))}
            </div>
        </div>
    );
}