import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ProductCard } from "@/components/Product/Product";
import { useProductStore } from "@/lib/store/productStore";
import type { ProductImage } from "@/types";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const fetchProduct = useProductStore((s) => s.fetchProductById); // make sure you have this in your store

  useEffect(() => {
    if (!id) return;

    (async () => {
      const result = await fetchProduct(id);
      setProduct(result);
    })();
  }, [id, fetchProduct]);

  if (!product) return <p className="text-center py-20">Loading product...</p>;

  const images: ProductImage[] =
    product.images?.length
      ? product.images.map((img: any) => ({
          url: img.url || "/placeholder.jpg",
          publicId: img.publicId || "placeholder",
          alt: img.alt || product.name,
          id: img.id,
        }))
      : [
          {
            url: "/placeholder.jpg",
            publicId: "placeholder",
            alt: product.name,
          },
        ];

  return (
    <section className="min-h-screen py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Product Images */}
       
        {/* Product Info */}
        <div className="md:w-1/2 flex flex-col gap-6">
          <div>
            <span className="text-sm text-gray-500 uppercase">
              {product.category?.name || "Product"}
            </span>
            <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
            <p className="text-xl font-semibold mt-2">Rs {product.price}</p>
          </div>

          <p className="text-gray-700">{product.description}</p>

          {product.materials && (
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-semibold">Material & Care</h3>
              <p className="text-gray-600">{product.materials}</p>
            </div>
          )}

          {/* WhatsApp Inquiry */}
          <button
            onClick={() =>
              window.open(
                `https://wa.me/9779863796211?text=${encodeURIComponent(
                  `Hello! I am interested in this product: https://${window.location.host}/product/${product._id}`
                )}`
              )
            }
            className="mt-4 px-6 py-3 bg-[#0f00ff] text-white rounded-md font-semibold hover:bg-[#0c00cc]"
          >
            Ask on WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
