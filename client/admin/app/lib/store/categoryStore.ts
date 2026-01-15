import { create } from "zustand";
import type { Category } from "../../types";
import { categoriesApi } from "../api/categories";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

interface CategoryState {
  categories: Category[];
  loading: boolean;
  fetchCategories: () => Promise<void>;
  createCategory: (data: {
    name: string;
    description?: string;
    isActive?: boolean;
  }) => Promise<void>;
  updateCategory: (id: string, data: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  loading: false,

  fetchCategories: async () => {
    set({ loading: true });
    try {
      const response = await categoriesApi.getAll();
      set({ categories: response.data || [], loading: false });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to fetch categories");
      set({ loading: false });
    }
  },

  createCategory: async (data) => {
    try {
      const response = await categoriesApi.create(data);
      set({ categories: [...get().categories, response.data!] });
      toast.success("Category created successfully");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to create category");
      throw error;
    }
  },

  updateCategory: async (id, data) => {
    try {
      const response = await categoriesApi.update(id, data);
      set({
        categories: get().categories.map((cat) =>
          cat._id === id ? response.data! : cat,
        ),
      });
      toast.success("Category updated successfully");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to update category");
      throw error;
    }
  },

  deleteCategory: async (id) => {
    try {
      await categoriesApi.delete(id);
      set({ categories: get().categories.filter((cat) => cat._id !== id) });
      toast.success("Category deleted successfully");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to delete category");
      throw error;
    }
  },
}));
