import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ProductSliderProps {
    images: string[];
}

export function ProductSlider({ images }: ProductSliderProps) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const handlePrev = () =>
        setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    const handleNext = () =>
        setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

    return (
        <div className="flex flex-col gap-4 relative group">
            <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                <img
                    src={images[activeImageIndex]}
                    alt="Product"
                    className="w-full h-full object-cover"
                />

                <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-opacity"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-opacity"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            <div className="flex gap-2">
                {images.map((img, i) => (
                    <div
                        key={i}
                        onClick={() => setActiveImageIndex(i)}
                        className={`w-20 h-20 bg-gray-100 rounded cursor-pointer border-2 transition ${
                            activeImageIndex === i ? 'border-blue-900' : 'border-transparent'
                        }`}
                    >
                        <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-cover rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}