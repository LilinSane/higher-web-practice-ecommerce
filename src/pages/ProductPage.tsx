import {Link, useNavigate, useParams} from "react-router-dom";
import {useGetProductByIdQuery} from "@/api/catalogApi.ts";
import {ShadowContainer} from "@/components/ui/base/containers/ShadowContainer.tsx";
import {ProductInfo} from "@/components/modules/product/ProductInfo.tsx";
import {ProductSlider} from "@/components/modules/product/ProductSlider.tsx";
import {ProductRating} from "@/components/modules/product/ProductRating.tsx";
import {useAppSelector} from "@/store/store.ts";
import {useAddToCartMutation} from "@/api/cartApi.ts";
import {HeadingText} from "@/components/ui/base/text/HeadingText.tsx";

export function ProductPage() {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const userId = useAppSelector((state) => state.user.userId);

    const {data: product, isLoading} = useGetProductByIdQuery(id);
    const [addToCart] = useAddToCartMutation();

    if (isLoading) {
        return (
            <div className="max-w-md mx-auto py-32 px-4 text-center">
                <p className="text-gray-500 animate-pulse text-lg">Загрузка информации о товаре...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-md mx-auto py-24 px-4 text-center">
                <HeadingText className="text-2xl mb-4">Товар не найден</HeadingText>
                <p className="text-gray-600 mb-6">
                    К сожалению, запрашиваемый товар не существует или был удалён.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-blue-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors"
                >
                    В каталог
                </Link>
            </div>
        );
    }

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