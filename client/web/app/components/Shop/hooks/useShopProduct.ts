import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useProductStore } from "@/lib/store/productStore";
import { useCategoryStore } from "@/lib/store/categoryStore";
import { useDebounce } from "./useDebounce";

export function useShopProducts() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchTerm);

  const categories = useCategoryStore((s) => s.categories);
  const fetchCategories = useCategoryStore((s) => s.fetchCategories);

  const {
    products,
    pagination,
    loading,
    fetchProducts,
    resetProducts,
  } = useProductStore();

  /* fetch categories once */
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  /* URL → state */
  useEffect(() => {
    setActiveCategory(searchParams.get("cat") ?? "all");
    setSearchTerm(searchParams.get("search") ?? "");
    setPage(Number(searchParams.get("page") ?? 1));
  }, [searchParams]);

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
    activeCategory,
    debouncedSearch,
    resolveCategoryId,
    loading,
    fetchProducts,
    resetProducts,
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

  return {
    products,
    categories,
    pagination,
    loading,
    page,
    activeCategory,
    searchTerm,
    debouncedSearch,
    setPage,
    setActiveCategory,
    setSearchTerm,
  };
}
