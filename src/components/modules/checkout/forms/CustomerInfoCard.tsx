import { ShadowContainer } from "@/components/ui/base/containers/ShadowContainer";
import { CommonInput } from "@/components/ui/base/inputs/CommonInput";
import { useAppSelector } from "@/store/store";
import {useGetProfileQuery} from "@/api/userApi.ts";
import {useFormErrors} from "@/hooks/useFormErrors.ts";
import {composeValidators, validatePhone, validateRequired} from "@/utils/validation.ts";

interface CustomerInfoCardProps {
    onPhoneChange: (phone: string) => void;
    onCommentChange: (comment: string) => void;
}

export function CustomerInfoCard({ onPhoneChange, onCommentChange }: CustomerInfoCardProps) {
    const userId = useAppSelector((state) => state.user.userId);
    const { data: user } = useGetProfileQuery(userId || '');

    const { errors, setErrors, clearError } = useFormErrors<{phone: string | null}>({ phone: null });

    const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = composeValidators(value, [validateRequired, validatePhone]);
        if (error) {
            setErrors({ phone: error });
            onPhoneChange("");
        } else {
            clearError('phone');
            onPhoneChange(value);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <ShadowContainer className="p-4">
            <h2 className="text-lg font-bold mb-4 text-black">Получатель</h2>

            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-6 items-start">

                    <div className="col-span-2 flex flex-col gap-1">
                        <div className="text-gray-900 font-medium">
                            {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-600">
                            {user.email}
                        </div>
                    </div>

                    <div>
                        <CommonInput
                            id="phone"
                            type="tel"
                            inputMode="tel"
                            label="Номер телефона"
                            placeholder="+7 (999) 000-00-00"
                            error={errors.phone || undefined}
                            onBlur={handlePhoneBlur}
                            onChange={(e) => {
                                e.target.value = e.target.value.replace(/[A-Za-zА-Яа-я]/g, '');
                                clearError('phone');
                            }}
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-700 font-medium">Комментарий к заказу</label>
                    <textarea
                        className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:border-blue-800 outline-none transition-all resize-none h-24"
                        placeholder="Позвоните за час до доставки..."
                        onChange={(e) => onCommentChange(e.target.value)}
                    />
                </div>
            </div>
        </ShadowContainer>
    );
}