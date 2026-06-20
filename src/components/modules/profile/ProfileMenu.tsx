import { useLocation, useNavigate } from "react-router-dom";

const MENU_ITEMS = [
    { label: "Профиль", path: "/profile" },
    { label: "История заказов", path: "/profile/orders" },
    { label: "Корзина", path: "/profile/cart" },
];

export function ProfileMenu() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="mb-6 w-full">
            <div className="flex flex-col gap-1">
                {MENU_ITEMS.map((item) => {
                    const isActive = item.path === "/profile"
                        ? location.pathname.startsWith("/profile") &&
                        !location.pathname.startsWith("/profile/orders") &&
                        !location.pathname.startsWith("/profile/cart")
                        : location.pathname === item.path;

                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                                isActive
                                    ? "bg-blue-100 text-blue-800 font-medium"
                                    : "hover:bg-gray-50 text-gray-700"
                            }`}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}