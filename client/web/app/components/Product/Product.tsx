import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import WhatsAppIcon from "@/components/Home/WhatsAppIcon";
import { Heart } from "lucide-react";

interface ProductCardProps {
  product: any;
  onWhatsapp: (id: string) => void;
}

export function ProductCard({ product, onWhatsapp }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images =
    product.images && product.images.length > 0
      ? product.images.map((img: any) =>
          typeof img === "string" ? img : img.url ?? "/placeholder.jpg"
        )
      : ["/placeholder.jpg"];

  const categoryName =
    typeof product.category === "string"
      ? product.category
      : product.category?.name ?? "";

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + images.length) % images.length
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="group cursor-pointer w-full md:w-auto">
      <div className="relative rounded-3xl overflow-hidden bg-gray-100 mb-4
                      aspect-[3/3.5] md:aspect-[3/3.5]">
        <img
          src={images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Best Seller Badge */}
        {product.isBestSeller && (
          <div className="absolute top-2 md:top-4 left-2 md:left-4 
                          bg-[#0f00ff]/90 backdrop-blur-sm text-white 
                          text-[8px] md:text-[10px] font-bold px-2 md:px-3 py-1 md:py-1.5 
                          rounded-full uppercase tracking-wider shadow-lg">
            Best Seller
          </div>
        )}

        {/* Favorite Heart Button */}
        <button className="absolute top-2 md:top-4 right-2 md:right-4 
                           bg-white/80 backdrop-blur-md p-1 md:p-2 
                           rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-gray-900">
          <Heart size={16} className="md:w-5 md:h-5" />
        </button>

       

        {/* Hover buttons for desktop */}
        <div className="hidden md:flex absolute opacity-0 bottom-4 left-4 right-4 
                        translate-y-full group-hover:translate-y-0 
                        group-hover:opacity-100 transition-transform duration-300 flex gap-2">
          <button className="flex-1 bg-white/90 backdrop-blur-md text-gray-900 py-3 rounded-xl text-sm font-semibold hover:bg-white shadow-lg">
            View Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onWhatsapp(product._id);
            }}
            className="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 shadow-lg flex items-center justify-center"
          >
            <WhatsAppIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex md:flex-row justify-between items-start text-xs md:text-base gap-1 md:gap-0">
        <div>
          <h3 className="font-semibold text-sm md:text-lg text-gray-900 mb-1">
            {product.name}
          </h3>
          <p className="text-[10px] md:text-sm text-gray-500">{categoryName}</p>
        </div>
        <div className="flex flex-col items-center gap-2 mt-2 md:mt-0">
          {product.price > 0 && (
            <h3 className="font-semibold text-sm md:text-base text-gray-900">
              Rs.{product.price}
            </h3>
          )}

          {/* WhatsApp button (mobile only) */}
          <div className="md:hidden w-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onWhatsapp(product._id);
              }}
              className="bg-green-500 text-white p-1 md:p-2 rounded-xl hover:bg-green-600 shadow-lg flex items-center justify-center gap-2 text-xs md:text-sm"
            >
              Chat <WhatsAppIcon className="w-4 md:w-5 h-4 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
