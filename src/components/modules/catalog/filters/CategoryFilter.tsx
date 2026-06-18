import {useAppDispatch, useAppSelector} from '@/store/store.ts';
import {setCategory} from '@/store/slices/catalogSlice.ts';
import {HeadingText} from "@/components/ui/base/text/HeadingText.tsx";

export function CategoryFilter({categories}: { categories: string[] }) {
    const dispatch = useAppDispatch();
    const selectedCategory = useAppSelector(state => state.catalog.selectedCategory);

    return (
        <div className="mb-6">
            <HeadingText className="text-[16px] mb-4">Категория</HeadingText>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => dispatch(setCategory(category))}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        selectedCategory === category ? "bg-blue-100 text-blue-800 font-medium" : "bg-white hover:bg-gray-50"
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}