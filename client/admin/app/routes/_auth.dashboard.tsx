import { useEffect, useMemo } from "react";
import { useProductStore } from "../lib/store/productStore";
import { useCategoryStore } from "../lib/store/categoryStore";
import LoadingSpinner from "../components/common/LoadingSpinner";
export default function DashboardPage() {
  const {
    products,
    fetchProducts,
    loading: productsLoading,
  } = useProductStore();
  const {
    categories,
    fetchCategories,
    loading: categoriesLoading,
  } = useCategoryStore();

  useEffect(() => {
    fetchProducts({ limit: 8 });
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const stats = useMemo(() => {
    return {
      totalProducts: products.length,
      totalCategories: categories.length,
      activeProducts: products.filter((p) => p.isActive).length,
      featuredProducts: products.filter((p) => p.isFeatured).length,
    };
  }, [products, categories]);

  const loading = productsLoading || categoriesLoading;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your store</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-primary-foreground">
        <Stat label="Products" value={stats.totalProducts} />
        <Stat label="Categories" value={stats.totalCategories} />
        <Stat label="Active Products" value={stats.activeProducts} />
        <Stat label="Featured Products" value={stats.featuredProducts} />
      </div>

      {/* Recent Products */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Products</h2>

        {products.length === 0 ? (
          <p className="text-sm text-muted-foreground">No products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"></div>
        )}
      </section>
    </div>
  );
}

/* ---------------- STAT COMPONENT ---------------- */

type StatProps = {
  label: string;
  value: number;
};

function Stat({ label, value }: StatProps) {
  return (
    <div className="rounded-xl border bg-card p-4 text-center text-foreground shadow-sm">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
