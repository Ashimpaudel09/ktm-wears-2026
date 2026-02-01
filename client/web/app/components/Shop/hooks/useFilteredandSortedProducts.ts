import type { Product } from "@/types";
import { useMemo } from "react";

export function useFilteredAndSortedProducts(
  products: Product[],
  search: string,
) {
  return useMemo(() => {
    if (!search) return products;

    const terms = search.toLowerCase().trim().split(/\s+/).filter(Boolean); // split search into individual words

    // 1️⃣ Filter: each product must match at least one term
    const filtered = products.filter((product) => {
      const text =
        `${product.name || ""} ${product.description || ""}`.toLowerCase();
      const words = text.split(/\s+/).filter(Boolean);

      return terms.every((term) => words.some((word) => word.startsWith(term)));
    });

    // 2️⃣ Sort filtered products
    return filtered.sort((a, b) => {
      const getScore = (p: Product) => {
        const nameWords = (p.name || "").toLowerCase().split(/\s+/);
        const descWords = (p.description || "").toLowerCase().split(/\s+/);

        let score = 0;

        for (const term of terms) {
          if (nameWords.some((w: string) => w.startsWith(term))) score += 3;
          else if (descWords.some((w: string) => w.startsWith(term)))
            score += 2;
        }

        return score;
      };

      const diff = getScore(b) - getScore(a);
      if (diff !== 0) return diff;

      // Featured first
      if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;

      // Then newest
      return (
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
      );
    });
  }, [products, search]);
}
