import slugify from 'slugify';
import Category, { ICategoryDocument } from './category.model';
import { AppError } from '../../middlewares/error.middleware';

export class CategoryService {
  async createCategory(data: { name: string; description?: string; isActive?: boolean }): Promise<ICategoryDocument> {
    const slug = slugify(data.name, { lower: true, strict: true });
    
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      throw new AppError('Category with this name already exists', 409);
    }

    const category = await Category.create({ ...data, slug });
    return category;
  }

  async getAllCategories(activeOnly: boolean = false): Promise<ICategoryDocument[]> {
    const filter = activeOnly ? { isActive: true } : {};
    return Category.find(filter).sort({ name: 1 });
  }

  async getCategoryById(id: string): Promise<ICategoryDocument> {
    const category = await Category.findById(id);
    if (!category) {
      throw new AppError('Category not found', 404);
    }
    return category;
  }

  async getCategoryBySlug(slug: string): Promise<ICategoryDocument> {
    const category = await Category.findOne({ slug });
    if (!category) {
      throw new AppError('Category not found', 404);
    }
    return category;
  }

  async updateCategory(id: string, data: { name?: string; description?: string; isActive?: boolean }): Promise<ICategoryDocument> {
    if (data.name) {
      const newSlug = slugify(data.name, { lower: true, strict: true });
      
      const existingCategory = await Category.findOne({ 
        slug: newSlug, 
        _id: { $ne: id } 
      });
      
      if (existingCategory) {
        throw new AppError('Category with this name already exists', 409);
      }
      
      (data as any).slug = newSlug;
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    return category;
  }

  async deleteCategory(id: string): Promise<void> {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      throw new AppError('Category not found', 404);
    }
  }
}

export default new CategoryService();