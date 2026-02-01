import { Badge } from "@/components/ui/badge";
import { useShopProducts } from "@/components/Shop/hooks/useShopProduct";
// replace the old hook with the new flexible one
import { useFilteredAndSortedProducts } from "@/components/Shop/hooks/useFilteredandSortedProducts";

import { ShopSearch } from "@/components/Shop/ShopSearch";
import { CategoryFilter } from "@/components/Shop/CategoryFilter";
import { ProductGrid } from "@/components/Shop/ProductGrid";
import { ShopPagination } from "@/components/Shop/ShopPagination";

export default function ShopPage() {
  const shop = useShopProducts();

  // Use the new hook that filters and sorts by flexible search
  const products = useFilteredAndSortedProducts(
    shop.products,
    shop.debouncedSearch,
  );

  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4">Shop Collection 2026</Badge>
          <h1 className="text-4xl font-bold">Shop Products</h1>
        </div>

        <ShopSearch
          value={shop.searchTerm}
          onChange={(v) => {
            shop.setPage(1);
            shop.setSearchTerm(v);
          }}
        />

        <CategoryFilter {...shop} />

        <ProductGrid
          products={products}
          loading={shop.loading}
          activeCategory={shop.activeCategory}
          search={shop.debouncedSearch}
          page={shop.page}
        />

        <ShopPagination {...shop} />
      </div>
    </section>
  );
}
