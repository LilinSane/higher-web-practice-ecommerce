import { HeadingText } from "@/components/ui/base/text/HeadingText.tsx";
import { useAppDispatch, useAppSelector } from "@/store/store.ts";
import { toggleStyle } from "@/store/slices/catalogSlice";

interface StyleFilterProps {
    styles: string[];
}

export function StyleFilter({ styles }: StyleFilterProps) {
    const dispatch = useAppDispatch();
    const selectedStyles = useAppSelector((state) => state.catalog.selectedStyles);

    return (
        <div className="mb-6">
            <HeadingText className="text-[16px] mb-4">Стиль</HeadingText>
            <div className="flex flex-col gap-2">
                {styles.map((style) => (
                    <label key={style} className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                            type="checkbox"
                            checked={selectedStyles.includes(style)}
                            onChange={() => dispatch(toggleStyle(style))}
                            className="rounded border-gray-300"
                        />
                        {style}
                    </label>
                ))}
            </div>
        </div>
    );
}