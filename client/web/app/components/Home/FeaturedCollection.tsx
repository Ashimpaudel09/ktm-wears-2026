import React, { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useProductStore } from "@/lib/store/productStore";
import { Badge } from "../ui/badge";
import { ProductCard } from "../Product/Product";
import { useProductNavigation } from "@/customHooks/product-navigation";

/* -------------------------------------------------------------------------- */
/*                           FEATURED COLLECTION                              */
/* -------------------------------------------------------------------------- */

export function FeaturedCollection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const { products, fetchProducts, whatsappContact } = useProductStore();
  const gotoProductPage = useProductNavigation();

  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    fetchProducts({ featured: true }); // fetch all featured
  }, [fetchProducts]);

  /* -------------------------------------------------------------------------- */
  /*                       FILTER + SORT BY _id (Newest First)                  */
  /* -------------------------------------------------------------------------- */
  const filteredAndSortedProducts = [...products]
    .filter((product) => {
      const categoryName =
        typeof product.category === "string"
          ? product.category
          : product.category?.name ?? "";
      return activeFilter === "All" || categoryName === activeFilter;
    })
    .sort((a, b) => b._id.localeCompare(a._id)); // newest first by ObjectId

  /* -------------------------------------------------------------------------- */
  /*                                  PAGINATION                                */
  /* -------------------------------------------------------------------------- */
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / ITEMS_PER_PAGE
  );

  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* Reset page when filter changes */
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  /* -------------------------------------------------------------------------- */
  /*                                  RENDER                                    */
  /* -------------------------------------------------------------------------- */
  return (
    <section className="w-full py-0 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* HEADER (unchanged) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge
            color="blue"
            className="mb-4 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase border-[#0f00ff] text-[#0f00ff]"
          >
            New Collection 2026
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Featured Collection
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore the latest trends in eyewear and fashion.
          </p>
        </motion.div>

        {/* FILTER BUTTONS (unchanged) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {["All", "Eyewear", "Clothing", "Accessories", "Shoes"].map(
            (filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setActiveFilter(filter === "Clothing" ? "Clothes" : filter)
                }
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                  activeFilter === filter ||
                  (activeFilter === "Clothes" && filter === "Clothing")
                    ? "bg-[#0f00ff] text-white shadow-lg shadow-blue-500/30"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {filter}
              </motion.button>
            )
          )}
        </motion.div>

        {/* EMPTY STATE */}
        {filteredAndSortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 mb-4">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4" />
            </div>
            <p className="text-gray-600 text-lg">
              No products found for the selected category.
            </p>
          </motion.div>
        )}

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onWhatsapp={(id: string) =>
                whatsappContact(
                  "9779863796211",
                  "Hello! I am interested in the product:",
                  id
                )
              }
            />
          ))}
        </div>

        {/* PAGINATION (modern UI) */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center gap-2 mt-12">
            {/* PREV */}
            <button
              onClick={() =>
                currentPage > 1 && setCurrentPage(currentPage - 1)
              }
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                currentPage === 1
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Prev
            </button>

            {/* PAGE NUMBERS */}
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium border transition ${
                    page === currentPage
                      ? "bg-[#0f00ff] text-white border-[#0f00ff] shadow-md"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* NEXT */}
            <button
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                currentPage === totalPages
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
