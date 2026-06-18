import { useNavigate, useLocation } from "react-router-dom";
import { IconButton } from "@/components/ui/base/buttons/IconButton.tsx";
import Home from '@/assets/Home.svg?react';
import Catalog from '@/assets/Catalog.svg?react';
import User from '@/assets/User.svg?react';
import Cart from '@/assets/Shopping_bag.svg?react';
import {Button} from "@/components/ui/lib/button.tsx";

interface MobileFooterProps {
    isAuthenticated: boolean;
}

export function MobileFooter({ isAuthenticated }: MobileFooterProps) {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const getIconColor = (path: string) => (pathname === path ? "text-blue-600" : "text-foreground");

    return (
        <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 h-16 flex items-center justify-around px-4">
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
                    <IconButton label="Главная" icon={Home} onClick={() => navigate('/')}/>
                    <IconButton className={getIconColor('/')} label="Каталог" icon={Catalog} onClick={() => navigate('/')} />
                    <IconButton className={getIconColor('/profile')} label="Профиль" icon={User} onClick={() => navigate('/profile')} />
                    <IconButton className={getIconColor('/profile/cart')} label="Корзина" icon={Cart} onClick={() => navigate('/profile/cart')} />
                </>
            )}
        </footer>
    );
}