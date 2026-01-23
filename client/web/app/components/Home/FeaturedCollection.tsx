import React, { useEffect, useState } from "react";
import { Heart, ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useProductStore } from "@/lib/store/productStore";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import WhatsAppIcon from "./WhatsAppIcon";


/* -------------------------------------------------------------------------- */
/*                            FEATURED COLLECTION                              */
/* -------------------------------------------------------------------------- */

export function FeaturedCollection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});

  const { products, fetchProducts, gotoProductPage, whatsappContact } = useProductStore();

  useEffect(() => {
    fetchProducts({ featured: true, limit: 8 });
  }, [fetchProducts]);

  const filteredProducts = products.filter((product) => {

    const categoryName =
      typeof product.category === "string"
        ? product.category
        : product.category?.name ?? "";
    return categoryName === activeFilter || activeFilter === "All";
  })

  /* -------------------------------------------------------------------------- */
  /*                              IMAGE HANDLERS                                */
  /* -------------------------------------------------------------------------- */


  const prevImage = (productId: string, length: number) => {
    setImageIndexes((prev) => ({
      ...prev,
      [productId]:
        prev[productId] === 0 ? length - 1 : (prev[productId] ?? 0) - 1,
    }));
  };

  const nextImage = (productId: string, length: number) => {
    setImageIndexes((prev) => ({
      ...prev,
      [productId]:
        prev[productId] === length - 1 ? 0 : (prev[productId] ?? 0) + 1,
    }));
  };

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-2xl">
            <span className="text-[#0f00ff] text-xs font-bold uppercase tracking-widest">
              New Collection 2026
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">
              Featured <span className="text-[#0f00ff]">Collection</span>
            </h2>
            <p className="text-gray-600 text-lg mt-4">
              Explore the latest trends in eyewear and fashion.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white p-1 rounded-full border shadow-sm flex">
              {["All", "Eyewear", "Clothing", "Accessories", "Shoes"].map((filter) => (
                <button
                  key={filter}
                  onClick={() =>
                    setActiveFilter(filter === "Clothing" ? "Clothes" : filter)
                  }
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all
                    ${activeFilter === filter ||
                      (activeFilter === "Clothes" && filter === "Clothing")
                      ? "bg-[#0f00ff] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 && (
          <p className="text-gray-500 text-center w-full">No products found for the selected category.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const categoryName =
              typeof product.category === "string"
                ? product.category
                : product.category?.name ?? "";

            const images =
              product.images?.length > 0
                ? product.images.map((img: any) => img.url ?? img)
                : [product.images];

            const currentIndex = imageIndexes[product._id] ?? 0;

            return (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="group"
              >
                <div className="relative aspect-3/4 rounded-3xl overflow-hidden bg-gray-100 mb-4">

                  {/* Image */}
                  <img
                    src={images[currentIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Slider Controls */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          prevImage(product._id, images.length)
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <ArrowLeft size={18} />
                      </button>

                      <button
                        onClick={() =>
                          nextImage(product._id, images.length)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <ArrowRight size={18} />
                      </button>
                    </>
                  )}

                  {/* Wishlist */}

                  <button className="absolute right-4 top-4  ">
                    <Badge color="blue">Featured</Badge>
                  </button>


                </div>

                {/* Meta */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-500">
                      {categoryName}
                    </p>
                  </div>
                  <span className="font-semibold">Rs.{product.price}</span>
                  {/* Cart */}
                  <div className="">

                  </div>

                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-green-500 py-3 rounded-xl font-semibold"
                    onClick={() => whatsappContact("9779863796211",
                      "Hello ! I am interested in the product: ",
                      product._id)}
                  >
                    <WhatsAppIcon /> Contact
                  </Button>
                  <Button
                    className="bg-black text-white p-3 rounded-xl"
                    onClick={() => gotoProductPage(product._id)}

                  >
                    See Detail <ArrowRight size={16} />
                  </Button>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
