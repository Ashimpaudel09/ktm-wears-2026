import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/Product/Product";
import { useProductStore } from "@/lib/store/productStore";
import { useCategoryStore } from "@/lib/store/categoryStore";
import type { ProductImage } from "@/types";

/* -------------------------------------------------------------------------- */
/*                                   DEBOUNCE                                  */
/* -------------------------------------------------------------------------- */
function useDebounce<T>(value: T, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */
export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm);
  const [page, setPage] = useState(1);

  const categories = useCategoryStore((s) => s.categories);
  const fetchCategories = useCategoryStore((s) => s.fetchCategories);

  const products = useProductStore((s) => s.products);
  const pagination = useProductStore((s) => s.pagination);
  const loading = useProductStore((s) => s.loading);
  const fetchProducts = useProductStore((s) => s.fetchProducts);
  const resetProducts = useProductStore((s) => s.resetProducts);

  /* ---------------- FETCH CATEGORIES ---------------- */
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  /* ---------------- URL → STATE SYNC ---------------- */
  useEffect(() => {
    setActiveCategory(searchParams.get("cat") ?? "all");
    setSearchTerm(searchParams.get("search") ?? "");
    setPage(Number(searchParams.get("page") ?? 1));
  }, [searchParams]);

  /* ---------------- CATEGORY SLUG → ID ---------------- */
  const resolveCategoryId = useCallback(
    (slug: string) => {
      if (slug === "all") return undefined;
      return categories.find(
        (c) =>
          (c.slug ??
            c.name.toLowerCase().replace(/\s+/g, "-")) === slug
      )?._id;
    },
    [categories]
  );

  /* ---------------- LOAD PRODUCTS ---------------- */
  const loadProducts = useCallback(async () => {
    if (loading) return;

    const filters: Record<string, unknown> = {
      page,
      limit: 12,
    };

    const categoryId = resolveCategoryId(activeCategory);
    if (categoryId) filters.category = categoryId;
    if (debouncedSearch) filters.search = debouncedSearch;

    resetProducts();
    await fetchProducts(filters);
  }, [
    page,
    loading,
    fetchProducts,
    resetProducts,
    activeCategory,
    debouncedSearch,
    resolveCategoryId,
  ]);

  useEffect(() => {
    loadProducts();

    const next = new URLSearchParams(searchParams);

    activeCategory === "all"
      ? next.delete("cat")
      : next.set("cat", activeCategory);

    debouncedSearch
      ? next.set("search", debouncedSearch)
      : next.delete("search");

    page === 1 ? next.delete("page") : next.set("page", String(page));

    setSearchParams(next, { replace: true });
  }, [activeCategory, debouncedSearch, page]);

  /* ---------------- SEARCH PRIORITY SORTING ---------------- */
  const displayedProducts = useMemo(() => {
    const term = debouncedSearch.toLowerCase();

    return [...products].sort((a, b) => {
      const aName = a.name?.toLowerCase().includes(term);
      const bName = b.name?.toLowerCase().includes(term);
      if (aName && !bName) return -1;
      if (!aName && bName) return 1;

      const aDesc = a.description?.toLowerCase().includes(term);
      const bDesc = b.description?.toLowerCase().includes(term);
      if (aDesc && !bDesc) return -1;
      if (!aDesc && bDesc) return 1;

      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;

      return (
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
      );
    });
  }, [products, debouncedSearch]);

  const totalPages = pagination?.totalPages ?? 1;

  /* ---------------- RENDER ---------------- */
  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <Badge className="mb-4">Shop Collection 2026</Badge>
          <h1 className="text-4xl font-bold">Shop Products</h1>
        </div>

        {/* SEARCH */}
        <div className="flex justify-center mb-8">
          <input
            value={searchTerm}
            onChange={(e) => {
              setPage(1);
              setSearchTerm(e.target.value);
            }}
            placeholder="Search products..."
            className="w-full max-w-md px-4 py-2 rounded-full border focus:ring-2 focus:ring-[#0f00ff]"
          />
        </div>

        {/* CATEGORIES */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[{ label: "All", slug: "all" }, ...categories.map((c) => ({
            label: c.name,
            slug: c.slug ?? c.name.toLowerCase().replace(/\s+/g, "-"),
          }))].map(({ label, slug }) => (
            <button
              key={slug}
              onClick={() => {
                setPage(1);
                setActiveCategory(slug);
              }}
              className={`rounded-full px-4 py-2 text-sm border transition ${
                activeCategory === slug
                  ? "bg-[#0f00ff] text-white border-[#0f00ff]"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        <AnimatePresence mode="wait">
          {loading ? (
            // Refresh-style loader in grid
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              {Array.from({ length: 12 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-48 bg-gray-200 animate-pulse rounded-md"
                />
              ))}
            </motion.div>
          ) : displayedProducts.length === 0 ? (
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
              key={`grid-${activeCategory}-${debouncedSearch}-${page}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              {displayedProducts.map((product) => {
                const images: ProductImage[] =
                  product.images?.length
                    ? product.images.map((img) => ({
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
                          `Hello! I am interested in this product: https://${window.location.host}/product/${id}`
                        )}`
                      )
                    }
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* PAGINATION */}
        {totalPages > 1 && !loading && (
          <div className="flex flex-wrap justify-center items-center gap-2 mt-12">
            <button
              onClick={() => page > 1 && setPage(page - 1)}
              disabled={page === 1}
              className={`px-4 py-2 rounded-full border text-sm ${
                page === 1
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-full border text-sm transition-all duration-300 ${
                    p === page
                      ? "bg-[#0f00ff] text-white border-[#0f00ff] shadow-md"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              onClick={() => page < totalPages && setPage(page + 1)}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-full border text-sm ${
                page === totalPages
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
