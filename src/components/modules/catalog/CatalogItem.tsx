import Cart from '@/assets/Shopping_bag.svg?react';
import { Button } from "@/components/ui/lib/button.tsx";
import type { Product } from "@/types";
import {Link} from "react-router-dom";

interface CatalogItemProps {
    id: Product['id'];
    name: Product['name'];
    price: Product['price'];
    image: string;
    onBuyClick: (id: string) => void;
}

export function CatalogItem({ id, name, price, image, onBuyClick }: CatalogItemProps) {
    return (
        <div className="flex flex-col h-full bg-background border border-border rounded-xl p-3 overflow-hidden group hover:shadow-md transition-shadow">
            <Link to={`/product/${id}`} className="flex flex-col flex-1">
                <div
                    className="w-full aspect-square bg-muted rounded-lg overflow-hidden mb-3 flex items-center justify-center">
                    <img
                        src={image}
                        alt={name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                    />
                </div>

                <div className="flex flex-col gap-1 mb-4 flex-1">
                    <h3 className="text-sm font-medium text-foreground line-clamp-2 min-h-[40px]">
                        {name}
                    </h3>
                    <p className="text-base font-bold text-foreground">
                        {price.toLocaleString('ru-RU')} ₽
                    </p>
                </div>
            </Link>

                <Button
                    variant="primaryBlue"
                    type="button"
                    size="lg"
                    className="w-full"
                    onClick={() => onBuyClick(id)}
                >
                    <Cart className="h-5 w-5"/>
                </Button>
        </div>
    );
}