import { Plus } from "lucide-react";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useProductStore } from "~/lib/store/productStore";
import { useCategoryStore } from "~/lib/store/categoryStore";
import type { Product, ProductImage } from "~/types/index";
import { Button } from "../ui/button";
import ProductModal from "./ProductModal";
import EditProductModal from "./EditProductModal";
import ConfirmDialog from "../common/ConfirmDialog";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "motion/react";

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
type EditableImage = {
  id: string;
  url: string;
  file?: File;
};

const toEditableImages = (
  images: ProductImage[] = [],
  productId: string,
): EditableImage[] => {
  return images.map((img, index) => ({
    id: img.id ?? `${productId}-${index}`, // ✅ guaranteed string
    url: img.url,
  }));
};

/* -------------------------------------------------------------------------- */
/*                              PRODUCT SECTION                                */
/* -------------------------------------------------------------------------- */

export default function ProductSection() {
  const { products, fetchProducts, deleteProduct, loading, pagination } =
    useProductStore();
  const { categories, fetchCategories } = useCategoryStore();

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm);
  const [page, setPage] = useState(1);

  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});

  /* -------------------------- FETCH CATEGORIES --------------------------- */
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  /* -------------------------- LOAD PRODUCTS ------------------------------ */
  const loadProducts = useCallback(async () => {
    const filters: Record<string, unknown> = { page, limit: 12 };
    if (activeCategory !== "all") filters.category = activeCategory;
    if (debouncedSearch) filters.search = debouncedSearch;
    await fetchProducts(filters);
  }, [page, activeCategory, debouncedSearch, fetchProducts]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  /* -------------------------- HANDLERS ---------------------------------- */
  const handleAddClick = async () => {
    await fetchCategories();
    setAddOpen(true);
  };

  const handleEditClick = async (product: Product) => {
    await fetchCategories();
    setSelectedProduct(product);
    setEditOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setProductToDelete(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    await deleteProduct(productToDelete);
    setIsDeleting(false);
    setConfirmOpen(false);
    setProductToDelete(null);
  };

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

  /* -------------------------- FILTER + SEARCH ---------------------------- */
  const displayedProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        activeCategory === "all" || p.category === activeCategory;
      const matchesSearch = p.name
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, debouncedSearch]);

  /* -------------------------- RENDER ------------------------------------- */
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap gap-2 items-center">
          <p className="text-xl font-semibold">Products</p>
          {/* CATEGORY FILTERS */}
          {["all", ...categories.map((c) => c._id)].map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => {
                setActiveCategory(cat);
                setPage(1);
              }}
            >
              {cat === "all"
                ? "All"
                : categories.find((c) => c._id === cat)?.name}
            </Button>
          ))}
        </div>

        {/* SEARCH + ADD */}
        <div className="flex gap-2 items-center w-full sm:w-auto">
          <input
            className="w-full sm:w-64 px-4 py-2 border rounded-full focus:ring-2 focus:ring-blue-500"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setPage(1);
              setSearchTerm(e.target.value);
            }}
          />
          <Button onClick={handleAddClick} className="flex items-center gap-2">
            <Plus size={16} /> Add
          </Button>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {displayedProducts.map((product) => {
              const currentIndex = imageIndexes[product._id] ?? 0;
              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  currentIndex={currentIndex}
                  prevImage={prevImage}
                  nextImage={nextImage}
                  onEdit={() => handleEditClick(product)}
                  onDelete={() => handleDeleteClick(product._id)}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* PAGINATION */}
      {pagination?.totalPages && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button
            size="sm"
            onClick={() => page > 1 && setPage(page - 1)}
            disabled={page === 1}
          >
            Prev
          </Button>
          {Array.from({ length: pagination.totalPages }).map((_, i) => {
            const p = i + 1;
            return (
              <Button
                key={p}
                size="sm"
                variant={p === page ? "default" : "outline"}
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            );
          })}
          <Button
            size="sm"
            onClick={() => page < pagination.totalPages && setPage(page + 1)}
            disabled={page === pagination.totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {/* Add / Edit / Delete Modals */}
      {addOpen && (
        <ProductModal
          onClose={() => setAddOpen(false)}
          categories={categories.map((c) => ({ id: c._id, name: c.name }))}
        />
      )}
      {editOpen && selectedProduct && (
        <EditProductModal
          productId={selectedProduct._id}
          productName={selectedProduct.name}
          productDescription={selectedProduct.description}
          productPrice={selectedProduct.price}
          productCategory={
            typeof selectedProduct.category === "string"
              ? selectedProduct.category
              : selectedProduct.category._id
          }
          productTags={selectedProduct.tags ?? []}
          productIsActive={selectedProduct.isActive ?? true}
          productIsFeatured={selectedProduct.isFeatured ?? false}
          productImages={toEditableImages(
            selectedProduct.images ?? [],
            selectedProduct._id,
          )}
          categories={categories.map((c) => ({ id: c._id, name: c.name }))}
          onClose={() => setEditOpen(false)}
        />
      )}
      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
      />
    </div>
  );
}
