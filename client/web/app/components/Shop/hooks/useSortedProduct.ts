import { useMemo } from "react";

export function useSortedProducts(products: any[], search: string) {
  return useMemo(() => {
    if (!search) return products;

    const term = search.toLowerCase().trim();

    // 1️⃣ Filter products
    const filtered = products.filter((product) => {
      const text = `${product.name || ""} ${product.description || ""}`;
      const words = text
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean); // remove empty strings

      return words.some((word) => word.startsWith(term));
    });

    // 2️⃣ Sort filtered products
    return filtered.sort((a, b) => {
      const score = (p: any) => {
        const nameWords = (p.name || "").toLowerCase().split(/\s+/);
        if (nameWords.some((w:any) => w.startsWith(term))) return 3;

        const descWords = (p.description || "").toLowerCase().split(/\s+/);
        if (descWords.some((w:any) => w.startsWith(term))) return 2;

        return 0;
      };

      const scoreDiff = score(b) - score(a);
      if (scoreDiff !== 0) return scoreDiff;

      if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;

      return (
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
      );
    });
  }, [products, search]);
}
