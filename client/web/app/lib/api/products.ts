import api from "./axios";
import type { Product, PaginatedResponse, ApiResponse } from "../../types";

interface ProductFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  featured?: boolean;
  sort?: string;
}

export const productsApi = {
  getAll: async (filters?: ProductFilters) => {
    const { data } = await api.get<PaginatedResponse<Product>>("/products", {
      params: filters,
    });
    return data;
  },

  getFeatured: async (limit = 8) => {
    const { data } = await api.get<ApiResponse<Product[]>>(
      "/products/featured",
      {
        params: { limit },
      },
    );
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return data.data; // <-- unwrap
  },

  create: async (formData: FormData) => {
    const { data } = await api.post<ApiResponse<Product>>(
      "/products",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return data;
  },

  update: async (id: string, formData: FormData) => {
    const { data } = await api.put<ApiResponse<Product>>(
      `/products/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete<ApiResponse<void>>(`/products/${id}`);
    return data;
  },
};
