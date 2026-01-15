import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useProductStore } from "~/lib/store/productStore";
import { useCategoryStore } from "~/lib/store/categoryStore";
import type { Product, ProductImage } from "~/types/index";
import { Button } from "../ui/button";
import ProductModal from "./ProductModal";
import EditProductModal from "./EditProductModal";
import ConfirmDialog from "../common/ConfirmDialog";
import ProductCard from "./ProductCard";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type EditableImage = {
  id: string;
  url: string;
  file?: File;
};

type SelectedProduct = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  category: string;
  tags?: string[];
  isActive?: boolean;
  isFeatured?: boolean;
  images: EditableImage[];
};

/* -------------------------------------------------------------------------- */
/*                              PRODUCT SECTION                               */
/* -------------------------------------------------------------------------- */

export default function ProductSection() {
  const { products, fetchProducts, deleteProduct } = useProductStore();
  const { fetchCategories, categories } = useCategoryStore();

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<SelectedProduct | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});

  /* -------------------------------------------------------------------------- */
  /*                                  EFFECTS                                   */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    // Only recent 5 products
    fetchProducts({ page: 1, limit: 5 });
  }, [fetchProducts]);

  /* -------------------------------------------------------------------------- */
  /*                                 HANDLERS                                   */
  /* -------------------------------------------------------------------------- */

  const handleAddClick = async () => {
    await fetchCategories();
    setAddOpen(true);
  };

  const handleEditClick = async (product: Product) => {
    await fetchCategories();

    const normalizedImages: EditableImage[] =
      product.images?.map((img: ProductImage, index: number) => ({
        id: img.id ?? `${product._id}-${index}`,
        url: img.url,
      })) ?? [];

    // Extract category ID if it's an object
    const categoryId =
      typeof product.category === "string"
        ? product.category
        : product.category?._id || product.category?._id || "";

    setSelectedProduct({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: categoryId, // Use the extracted ID here
      tags: product.tags,
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      images: normalizedImages,
    });

    setEditOpen(true);
  };
  const handleDeleteClick = (id: string) => {
    setProductToDelete(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      setIsDeleting(true);
      await deleteProduct(productToDelete);
    } finally {
      setIsDeleting(false);
      setConfirmOpen(false);
      setProductToDelete(null);
    }
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

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold">Recent Products</p>
        <Button
          variant="secondary"
          onClick={handleAddClick}
          className="flex items-center gap-2"
        >
          <Plus size={18} />
          Add Product
        </Button>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.slice(0, 5).map((product) => {
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
      </div>

      {/* Add Modal */}
      {addOpen && (
        <ProductModal
          onClose={() => setAddOpen(false)}
          categories={categories.map((c) => ({
            id: c._id,
            name: c.name,
          }))}
        />
      )}

      {/* Edit Modal */}
      {editOpen && selectedProduct && (
        <EditProductModal
          productId={selectedProduct.id}
          productName={selectedProduct.name}
          productDescription={selectedProduct.description}
          productPrice={selectedProduct.price}
          productCategory={selectedProduct.category}
          productTags={selectedProduct.tags ?? []}
          productIsActive={selectedProduct.isActive ?? true}
          productIsFeatured={selectedProduct.isFeatured ?? false}
          productImages={selectedProduct.images}
          categories={categories.map((c) => ({
            id: c._id,
            name: c.name,
          }))}
          onClose={() => setEditOpen(false)}
        />
      )}

      {/* Delete Confirmation */}
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
