import api from "./axios";
import type { Category, ApiResponse } from "../../types";

export const categoriesApi = {
  getAll: async () => {
    const { data } = await api.get<ApiResponse<Category[]>>("/categories");
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<ApiResponse<Category>>(`/categories/${id}`);
    return data;
  },

  create: async (category: {
    name: string;
    description?: string;
    isActive?: boolean;
  }) => {
    const { data } = await api.post<ApiResponse<Category>>(
      "/categories",
      category,
    );
    return data;
  },

  update: async (id: string, category: Partial<Category>) => {
    const { data } = await api.put<ApiResponse<Category>>(
      `/categories/${id}`,
      category,
    );
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete<ApiResponse<void>>(`/categories/${id}`);
    return data;
  },
};
