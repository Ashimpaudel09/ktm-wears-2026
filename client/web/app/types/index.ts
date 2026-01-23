export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  url: string;
  publicId: string;
  alt?: string;
  id?: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price?: number;
  category: Category | string;
  images: ProductImage[];
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  activeProducts: number;
  featuredProducts: number;
}
