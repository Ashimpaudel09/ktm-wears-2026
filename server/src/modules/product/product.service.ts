import slugify from 'slugify';
import Product, { IProductDocument } from './product.model';
import { IProductImage } from '../../types';
import { AppError } from '../../middlewares/error.middleware';
import { deleteMultipleFromCloudinary } from '../../utils/cloudinary.utils';

interface ProductQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sort?: string;
  featured?: boolean;
}

interface ProductData {
  name: string;
  description: string;
  price?: number;
  category: string;
  isActive?: boolean;
  isFeatured?: boolean;
  tags?: string[];
}

interface PaginatedProductResponse {
  data: IProductDocument[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export class ProductService {
  async createProduct(data: ProductData, images: IProductImage[]): Promise<IProductDocument> {
    const slug = slugify(data.name, { lower: true, strict: true });
    
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      throw new AppError('Product with this name already exists', 409);
    }

    const product = await Product.create({
      ...data,
      slug,
      images,
    });

    return product.populate('category');
  }

  async getProducts(query: ProductQuery): Promise<PaginatedProductResponse> {
    const page = query.page || 1;
    const limit = query.limit || 12;
    const skip = (page - 1) * limit;

    const filter: any = { isActive: true };

    if (query.category) {
      filter.category = query.category;
    }

    if (query.featured !== undefined) {
      filter.isFeatured = query.featured;
    }

    if (query.search) {
      filter.$text = { $search: query.search };
    }

    const sort: any = query.sort || '-createdAt';

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('category')
        .sort(sort)
        .skip(skip)
        .limit(limit),
      Product.countDocuments(filter),
    ]);

    return {
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getProductById(id: string): Promise<IProductDocument> {
    const product = await Product.findById(id).populate('category');
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return product;
  }

  async getProductBySlug(slug: string): Promise<IProductDocument> {
    const product = await Product.findOne({ slug }).populate('category');
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return product;
  }

  async updateProduct(
    id: string,
    data: Partial<ProductData>,
    newImages?: IProductImage[]
  ): Promise<IProductDocument> {
    const product = await Product.findById(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const updateData: any = { ...data };

    if (data.name) {
      updateData.slug = slugify(data.name, { lower: true, strict: true });
      
      const existingProduct = await Product.findOne({
        slug: updateData.slug,
        _id: { $ne: id },
      });

      if (existingProduct) {
        throw new AppError('Product with this name already exists', 409);
      }
    }

    if (newImages && newImages.length > 0) {
      const oldPublicIds = product.images.map((img) => img.publicId);
      await deleteMultipleFromCloudinary(oldPublicIds);
      updateData.images = newImages;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('category');

    if (!updatedProduct) {
      throw new AppError('Product not found', 404);
    }

    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await Product.findById(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const publicIds = product.images.map((img) => img.publicId);
    await deleteMultipleFromCloudinary(publicIds);

    await Product.findByIdAndDelete(id);
  }

  async getFeaturedProducts(limit: number = 8): Promise<IProductDocument[]> {
    return Product.find({ isActive: true, isFeatured: true })
      .populate('category')
      .sort('-createdAt')
      .limit(limit);
  }
}

export default new ProductService();