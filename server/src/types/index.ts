import { Request } from 'express';

export interface IProduct {
  name: string;
  slug: string;
  description: string;
  price?: number;
  category: string;
  images: IProductImage[];
  isActive: boolean;
  isFeatured: boolean;
  tags?: string[];
}

export interface IProductImage {
  url: string;
  publicId: string;
  alt?: string;
}

export interface MulterRequest extends Request {
  files?: Express.Multer.File[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}