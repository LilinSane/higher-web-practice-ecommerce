import {ProfileCard} from "@/components/modules/profile/ProfileCard.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/lib/select.tsx";
import React, {useState} from "react";
import {HeadingText} from "@/components/ui/base/text/HeadingText.tsx";
import meditationImage from '@/assets/meditation.png';
import {useAppDispatch, useAppSelector} from "@/store/store.ts";
import {Link, useNavigate} from "react-router-dom";
import {clearProfile} from "@/store/slices/userSlice.ts";
import {setAuthenticated} from "@/store/slices/authSlice.ts";
import {Button} from "@/components/ui/lib/button.tsx";
import {useGetProfileQuery} from "@/api/userApi.ts";


export function ProfilePage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userId = useAppSelector((state) => state.user.userId);
    const {data: user} = useGetProfileQuery(userId || '');

    const [language, setLanguage] = useState<string>("none");
    const [checked, setChecked] = useState<boolean>(false);

    const handleLogout = () => {
        dispatch(clearProfile());
        dispatch(setAuthenticated(false));
        navigate('/login');
    };

    return (
        <div className="relative z-10 flex flex-col gap-6">
            <div className="flex flex-col gap-6">
                <div
                    className="fixed bottom-0 right-0 w-[400px] h-[400px] -z-10 bg-no-repeat bg-right-bottom hidden md:block"
                    style={{
                        backgroundImage: `url(${meditationImage})`,
                        backgroundSize: 'contain',
                    }}
                />

                <HeadingText className="text-3xl mb-2 md:hidden">Мой профиль</HeadingText>

                <ProfileCard user={user} onEdit={() => navigate('/profile/edit')}/>

                <div className="w-40">
                    <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-full bg-background border-input shadow-sm">
                            <SelectValue placeholder="Сортировка"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">По умолчанию</SelectItem>
                            <SelectItem value="russian">Русский</SelectItem>
                            <SelectItem value="english_en">Английский (Англия)</SelectItem>
                            <SelectItem value="english_us">Английский (США)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                        type="radio"
                        checked={checked}
                        onClick={() => setChecked(!checked)}
                        onChange={() => null}
                        className="text-blue-600"
                    />
                    Уведомлять об изменении статуса заказов по email
                </label>

                <Link to="/profile/orders" className="text-blue-900 font-medium hover:underline md:hidden">
                    История заказов
                </Link>

                <div className="w-40">
                    <Button
                        variant="destructive"
                        size="lg"
                        className="w-full md:w-auto"
                        onClick={handleLogout}
                    >
                        Выйти из профиля
                    </Button>
                </div>

            </div>
        </div>
    );
}