import {Outlet, useLocation} from 'react-router-dom';
import {Header} from "@/components/layout/header/Header.tsx";
import {MobileFooter} from "@/components/layout/footer/MobileFooter.tsx";
import {useAppSelector} from "@/store/store.ts";

export function MainLayout() {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const location = useLocation();
    const isAuthPage = ['/login', '/register'].includes(location.pathname);

    return (
        <div className="min-h-screen bg-[#F9FAFB] text-foreground flex flex-col">
            <Header
                isAuthenticated={isAuthenticated}
                className={isAuthPage ? "hidden md:block" : ""}
            />

            <main className="max-w-[1440px] w-full mx-auto flex-1 p-4 pb-20 mb-20 md:pb-4">
                <Outlet />
            </main>

            {!isAuthPage && (
                <div className="md:hidden">
                    <MobileFooter isAuthenticated={isAuthenticated}/>
                </div>
            )}
        </div>
    );
}
