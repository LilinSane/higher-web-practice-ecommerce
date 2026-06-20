import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/store.ts";
import { useGetProfileQuery } from "@/api/userApi.ts";
import { HeadingText } from "@/components/ui/base/text/HeadingText.tsx";
import {ProfileEditForm} from "@/components/modules/profile-edit/ProfileEditForm.tsx";

export function ProfileEditPage() {
    const navigate = useNavigate();
    const userId = useAppSelector((state) => state.user.userId);
    const { data: user } = useGetProfileQuery(userId || '');

    return (
        <div className="relative z-10 flex flex-col gap-6 max-w-2xl">
            <HeadingText className="text-3xl mb-2">Редактирование профиля</HeadingText>

            <ProfileEditForm
                user={user}
                onCancel={() => navigate('/profile')}
            />
        </div>
    );
}