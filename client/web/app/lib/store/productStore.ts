import { create } from "zustand";
import type { Product } from "../../types";
import { productsApi } from "../api/products";
import toast from "react-hot-toast";

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface FetchProductsResponse {
  data: Product[];
  pagination: Pagination;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  pagination: Pagination;
  fetchProducts: (filters?: Record<string, unknown>) => Promise<void>;
  createProduct: (formData: FormData) => Promise<void>;
  updateProduct: (id: string, formData: FormData) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  whatsappContact: (phoneNumber: string, message: string, productId: string) => void;
  resetProducts: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  loading: false,
  pagination: {
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0,
  },
  

  fetchProducts: async (filters: Record<string, unknown> = {}) => {
    set({ loading: true });
    try {
      const response: FetchProductsResponse = await productsApi.getAll(filters);
      set({
        products: response.data || [],
        pagination: response.pagination,
        loading: false,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to fetch products");
      } else {
        toast.error("Failed to fetch products");
      }
      set({ loading: false });
    }
  },

  createProduct: async (formData: FormData) => {
    try {
      await productsApi.create(formData);
      toast.success("Product created successfully");
      await get().fetchProducts();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to create product");
      } else {
        toast.error("Failed to create product");
      }
      throw error;
    }
  },

  updateProduct: async (id: string, formData: FormData) => {
    try {
      await productsApi.update(id, formData);
      toast.success("Product updated successfully");
      await get().fetchProducts();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to update product");
      } else {
        toast.error("Failed to update product");
      }
      throw error;
    }
  },

  deleteProduct: async (id: string) => {
    try {
      await productsApi.delete(id);
      set({ products: get().products.filter((p) => p._id !== id) });
      toast.success("Product deleted successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to delete product");
      } else {
        toast.error("Failed to delete product");
      }
      throw error;
    }
  },
 whatsappContact: (
  phoneNumber: string,
  message: string,
  productId: string
) => {
  const productUrl = `${window.location.origin}/product?id=${productId}`;

  const fullMessage = `${message}\n\nProduct link:\n${productUrl}`;

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    fullMessage
  )}`;

  window.open(url, "_blank");
},
resetProducts: () => {
    set({ products: [] });
  },

}));

