import {Button} from '@/components/ui/lib/button.tsx';
import Logo from '@/assets/Logo-Full.svg?react';
import User from '@/assets/User.svg?react';
import Cart from '@/assets/Shopping_bag.svg?react';
import {SearchInput} from "@/components/ui/base/inputs/SearchInput.tsx";
import {IconButton} from "@/components/ui/base/buttons/IconButton.tsx";
import {useNavigate} from "react-router-dom";
import {AppGrid} from "@/components/ui/base/grid/AppGrid.tsx";
import {cn} from "@/lib/utils.ts";

interface HeaderProps {
    isAuthenticated: boolean;
    className?: string;
}

export function Header({isAuthenticated, className}: HeaderProps) {
    const navigate = useNavigate();

    return (
        <header className={cn("w-full bg-background border-b border-border sticky top-0 z-50", className)}>
            <AppGrid className="grid-cols-1 flex items-center justify-between h-16">

                <div className="hidden md:flex items-center gap-6 shrink-0">
                    <Logo/>

                    <Button variant="primaryBlue" size="lg" onClick={() => navigate('/')}>
                        Каталог
                    </Button>
                </div>

                <div className="flex-1 max-w-[500px] w-full">
                    <SearchInput placeholder="Искать"/>
                </div>

                <div className="hidden md:flex items-center gap-4 shrink-0 justify-end">
                    {!isAuthenticated ? (
                        <>
                            <Button variant="primaryBlue" size="lg" onClick={() => navigate('/login')}>
                                Войти
                            </Button>
                            <Button variant="primaryBlue" size="lg" onClick={() => navigate('/register')}>
                                Зарегистрироваться
                            </Button>
                        </>
                    ) : (
                        <>
                            <IconButton
                                label="Профиль"
                                icon={User}
                                onClick={() => navigate('/profile')}
                            />
                            <IconButton
                                label="Корзина"
                                icon={Cart}
                                onClick={() => navigate('/profile/cart')}
                            />
                        </>
                    )}
                </div>
            </AppGrid>
        </header>
    );
}