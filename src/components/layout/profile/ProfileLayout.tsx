import { Outlet } from "react-router-dom";
import { AppGrid } from "@/components/ui/base/grid/AppGrid.tsx";
import { ProfileMenu } from "@/components/modules/profile/ProfileMenu.tsx";

export function ProfileLayout() {
    return (
        <AppGrid className="grid-cols-1 md:grid-cols-4 pt-6 items-start gap-8">
            <div className="col-span-1 hidden md:block">
                <ProfileMenu />
            </div>

            <main className="col-span-1 md:col-span-3 w-full min-w-0">
                <div className="min-h-[400px]">
                    <Outlet/>
                </div>
            </main>
        </AppGrid>
    );
}