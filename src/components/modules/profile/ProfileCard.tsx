import { ShadowContainer } from "@/components/ui/base/containers/ShadowContainer.tsx";
import { HeadingText } from "@/components/ui/base/text/HeadingText.tsx";
import {Button} from "@/components/ui/lib/button.tsx";
import type {User} from "@/types";

interface ProfileCardProps {
    user: User;
    onEdit: () => void;
}

export function ProfileCard({ user, onEdit }: ProfileCardProps) {

    if (!user) return null;

    return (
        <ShadowContainer className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex items-center gap-6 flex-1">
                <div
                    className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border border-blue-200">
                    <span className="text-2xl font-bold text-blue-900">
                        {user.firstName[0]}{user.lastName[0]}
                    </span>
                </div>

                <div className="flex flex-col gap-1 min-w-0">
                    <HeadingText className="text-lg m-0 font-normal">
                        {user.firstName} {user.lastName}
                    </HeadingText>
                    <p className="text-gray-600 text-sm">
                        {user.email}
                    </p>
                </div>
            </div>

            <Button
                variant="outlineBlue"
                size="lg"
                className="w-full md:w-auto"
                onClick={onEdit}
            >
                Редактировать
            </Button>
        </ShadowContainer>
    );
}