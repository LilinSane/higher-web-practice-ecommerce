import { useAppDispatch, useAppSelector } from "@/store/store.ts";
import { toggleCharisma, toggleWax } from "@/store/slices/catalogSlice.ts";
import { HeadingText } from "@/components/ui/base/text/HeadingText.tsx";
import {SwitchInput} from "@/components/ui/base/inputs/SwitchInput.tsx";

export function ToggleFilter() {
    const dispatch = useAppDispatch();
    const { selectedCharisma, selectedWax } = useAppSelector((state) => state.catalog);

    return (
        <div className="mt-6 pt-4">
            <HeadingText className="text-[16px] mb-2">Фильтр</HeadingText>

            <SwitchInput
                label="Повышает харизму"
                checked={selectedCharisma}
                onChange={() => dispatch(toggleCharisma())}
            />

            <SwitchInput
                label="Требует укладки воском"
                checked={selectedWax}
                onChange={() => dispatch(toggleWax())}
            />
        </div>
    );
}