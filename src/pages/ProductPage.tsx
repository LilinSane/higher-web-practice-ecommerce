import {useNavigate, useParams} from "react-router-dom";
import {useGetProductByIdQuery} from "@/api/catalogApi.ts";
import {ShadowContainer} from "@/components/ui/base/containers/ShadowContainer.tsx";
import {ProductInfo} from "@/components/modules/product/ProductInfo.tsx";
import {ProductSlider} from "@/components/modules/product/ProductSlider.tsx";
import {ProductRating} from "@/components/modules/product/ProductRating.tsx";
import {useAppSelector} from "@/store/store.ts";
import {useAddToCartMutation} from "@/api/cartApi.ts";

export function ProductPage() {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const userId = useAppSelector((state) => state.user.userId);

    const {data: product, isLoading} = useGetProductByIdQuery(id);
    const [addToCart] = useAddToCartMutation();

    if (isLoading) return <div>Загрузка товара...</div>;

    if (!product) return null;

    const handleBuyProduct = async () => {
        if (!userId) {
            navigate('/login');
            return;
        }

        try {
            await addToCart({userId, product}).unwrap();
            navigate('/profile/cart')
        } catch (error) {
            console.error("Failed add to cart:", error);
        }
    };


    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="block md:hidden">
                <div className="grid grid-cols-1 gap-12">
                    <ProductSlider images={product.images}/>
                    <ProductInfo product={product} onBuy={handleBuyProduct}/>
                </div>
            </div>

            <ShadowContainer className="hidden md:block">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <ProductSlider images={product.images}/>
                    <ProductInfo product={product} onBuy={handleBuyProduct}/>
                </div>
            </ShadowContainer>

            <ShadowContainer>
                <ProductRating  product={product}/>
            </ShadowContainer>
        </div>
    );
}