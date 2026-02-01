import { motion, AnimatePresence } from "motion/react";
import { ProductCard } from "@/components/Product/Product";
import type { Product, ProductImage } from "@/types";

type Props = {
  products: Product[];
  loading: boolean;
  activeCategory: string;
  search: string;
  page: number;
};

export function ProductGrid({
  products,
  loading,
  activeCategory,
  search,
  page,
}: Props) {
  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-48 bg-gray-200 animate-pulse rounded-md"
            />
          ))}
        </motion.div>
      ) : products.length === 0 ? (
        <motion.p
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 text-gray-500"
        >
          No products found
        </motion.p>
      ) : (
        <motion.div
          key={`grid-${activeCategory}-${search}-${page}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {products.map((product) => {
            const images: ProductImage[] = product.images?.length
              ? product.images.map((img: ProductImage) => ({
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
              <ProductCard
                key={product._id}
                product={{ ...product, images }}
                onWhatsapp={(id) =>
                  window.open(
                    `https://wa.me/9779863796211?text=${encodeURIComponent(
                      `Hello! I am interested in this product: https://${window.location.host}/product/${id}`,
                    )}`,
                  )
                }
              />
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
