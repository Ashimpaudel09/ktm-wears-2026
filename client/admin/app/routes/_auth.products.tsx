import { useEffect } from "react";
// import ProductList from '../components/products/ProductList';
import { useProductStore } from "../lib/store/productStore";
import { useCategoryStore } from "../lib/store/categoryStore";
import ProductSection from "~/components/products/ProductSection";

export default function ProductsPage() {
  const { fetchProducts } = useProductStore();
  const { fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-foreground mb-2">
          Products
        </h1>
        <p className="text-muted-foreground">Manage your product catalog</p>
      </div>
      <ProductSection />
    </div>
  );
}
