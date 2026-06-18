import { CatalogItem } from "./CatalogItem.tsx";
import type { Product } from "@/types";

interface CatalogContainerProps {
    products: Product[];
    onBuyProduct: (id: string) => void;
}

export function CatalogContainer({ products, onBuyProduct }: CatalogContainerProps) {
    if (products.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                Товары не найдены
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
                <div key={product.id}>
                    <CatalogItem
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.images[0] || "/placeholder.png"}
                    onBuyClick={onBuyProduct}
                    />
                </div>
            ))}
        </div>
    );
}