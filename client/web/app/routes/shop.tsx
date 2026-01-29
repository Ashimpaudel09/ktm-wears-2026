import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "react-router";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/Product/Product";
import { useProductStore } from "@/lib/store/productStore";
import { useCategoryStore } from "@/lib/store/categoryStore";
import type { ProductImage } from "@/types";

/* -------------------------------------------------------------------------- */
/*                              DEBOUNCE HOOK                                  */
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
/*                                 SHOP PAGE                                   */
/* -------------------------------------------------------------------------- */

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  /* ------------------------------ UI STATE ------------------------------- */
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm);
  const [hasMore, setHasMore] = useState(true);

  /* ----------------------------- PAGINATION ------------------------------ */
  const pageRef = useRef(1);

  /* ------------------------------- STORES -------------------------------- */
  const categories = useCategoryStore((s) => s.categories);
  const fetchCategories = useCategoryStore((s) => s.fetchCategories);

  const products = useProductStore((s) => s.products);
  const pagination = useProductStore((s) => s.pagination);
  const loading = useProductStore((s) => s.loading);
  const fetchProducts = useProductStore((s) => s.fetchProducts);
  const resetProducts = useProductStore((s) => s.resetProducts);

  /* -------------------------- FETCH CATEGORIES --------------------------- */
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  /* -------------------- URL → ACTIVE CATEGORY SYNC ----------------------- */
  useEffect(() => {
    const catFromUrl = searchParams.get("cat");

    if (!catFromUrl) {
      setActiveCategory("All");
      return;
    }

    const exists = categories.some((c) => c.name === catFromUrl);
    setActiveCategory(exists ? catFromUrl : "All");
  }, [searchParams, categories]);

  /* ----------------------- CATEGORY NAME → ID ----------------------------- */
  const resolveCategoryId = useCallback(
    (value: string) => {
      if (!value || value === "All") return undefined;
      const found = categories.find((c) => c.name === value);
      return found?._id;
    },
    [categories],
  );

  /* --------------------------- PRODUCT LOADER ----------------------------- */
  const loadProducts = useCallback(
    async (reset = false) => {
      if (loading) return;

      const page = reset ? 1 : pageRef.current;

      const filters: Record<string, unknown> = {
        page,
        limit: 12,
      };

      const categoryId = resolveCategoryId(activeCategory);
      if (categoryId) filters.category = categoryId;
      if (debouncedSearch) filters.search = debouncedSearch;

      await fetchProducts(filters);

      pageRef.current = page + 1;

      const totalPages = pagination.totalPages || 0;
      setHasMore(pageRef.current <= totalPages);
    },
    [
      loading,
      fetchProducts,
      pagination.totalPages,
      activeCategory,
      debouncedSearch,
      resolveCategoryId,
    ],
  );

  /* ---------------- RESET ON FILTER / SEARCH CHANGE ---------------------- */
  useEffect(() => {
    pageRef.current = 1;
    setHasMore(true);
    resetProducts();
    loadProducts(true);

    const currentCat = searchParams.get("cat");

    if (activeCategory !== "All" && currentCat !== activeCategory) {
      setSearchParams({ cat: activeCategory }, { replace: true });
    }

    if (activeCategory === "All" && currentCat) {
      setSearchParams({}, { replace: true });
    }
  }, [activeCategory, debouncedSearch]);

  /* ---------------------------- INFINITE SCROLL --------------------------- */
  useEffect(() => {
    const onScroll = () => {
      if (loading || !hasMore) return;

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        loadProducts();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [loadProducts, loading, hasMore]);

  /* ------------------------- SORT FEATURED FIRST -------------------------- */
  const displayedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return (
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
      );
    });
  }, [products]);

  /* ------------------------------- UI ------------------------------------ */
  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <Badge className="mb-4 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase border-[#0f00ff] text-[#0f00ff]">
            Shop Collection 2026
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop Products</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our full catalog — premium quality, carefully curated.
          </p>
        </motion.div>

        {/* SEARCH */}
        <div className="flex justify-center mb-8">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full max-w-md px-4 py-2 rounded-full border focus:ring-2 focus:ring-[#0f00ff]"
          />
        </div>

        {/* CATEGORY FILTERS */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["All", ...categories.map((c) => c.name)].map((label) => (
            <button
              key={label}
              onClick={() => setActiveCategory(label)}
              className={`rounded-full font-medium transition-all border
                px-3 py-1.5 text-xs
    sm:px-4 sm:py-2 sm:text-sm
    md:px-6 md:py-2.5
    ${
      activeCategory === label
        ? "bg-[#0f00ff] text-white border-[#0f00ff]"
        : "bg-white text-gray-700 hover:bg-gray-100"
    }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {displayedProducts.map((product) => {
            // Normalize images to ProductImage[]
            const images: ProductImage[] =
              product.images && product.images.length > 0
                ? product.images.map((img) => ({
                    url: img.url || "/placeholder.jpg",
                    publicId: img.publicId || img.url || "placeholder",
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
              <motion.div key={product._id}>
                <ProductCard
                  product={{
                    ...product,
                    images, // now type-safe
                  }}
                  onWhatsapp={(id) =>
                    window.open(
                      `https://wa.me/9779863796211?text=${encodeURIComponent(
                        `Hello! I am interested in this product: https://${window.location.host}/product/${id}`,
                      )}`,
                    )
                  }
                />
              </motion.div>
            );
          })}
        </div>

        {/* STATES */}
        {loading && (
          <p className="text-center py-10 text-gray-500">Loading more...</p>
        )}
        {!hasMore && products.length > 0 && (
          <p className="text-center py-10 text-gray-500">No more products</p>
        )}
        {!loading && products.length === 0 && (
          <p className="text-center py-24 text-gray-500">No products found</p>
        )}
      </div>
    </section>
  );
}
