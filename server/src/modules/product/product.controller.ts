import { Response, NextFunction } from 'express';
import productService from './product.service';
import { createProductSchema, updateProductSchema, querySchema } from './product.validation';
import { MulterRequest } from '../../types';
import { uploadMultipleToCloudinary } from '../../utils/cloudinary.utils';

export class ProductController {
  async createProduct(req: MulterRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { error, value } = createProductSchema.validate(req.body);
      if (error) {
        res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
        return;
      }

      if (!req.files || req.files.length === 0) {
        res.status(400).json({
          success: false,
          message: 'At least one product image is required',
        });
        return;
      }

      const images = await uploadMultipleToCloudinary(req.files);
      const product = await productService.createProduct(value, images);

      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProducts(req: MulterRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { error, value } = querySchema.validate(req.query);
      if (error) {
        res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
        return;
      }

      const result = await productService.getProducts(value);

      res.status(200).json({
        success: true,
        message: 'Products retrieved successfully',
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: MulterRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await productService.getProductById(req.params.id as string);

      res.status(200).json({
        success: true,
        message: 'Product retrieved successfully',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductBySlug(req: MulterRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await productService.getProductBySlug(req.params.slug as string);

      res.status(200).json({
        success: true,
        message: 'Product retrieved successfully',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: MulterRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { error, value } = updateProductSchema.validate(req.body);
      if (error) {
        res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
        return;
      }

      let newImages;
      if (req.files && req.files.length > 0) {
        newImages = await uploadMultipleToCloudinary(req.files);
      }

      const product = await productService.updateProduct(req.params.id as string, value, newImages);

      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: MulterRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await productService.deleteProduct(req.params.id as string);

      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async getFeaturedProducts(req: MulterRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 8;
      const products = await productService.getFeaturedProducts(limit);

      res.status(200).json({
        success: true,
        message: 'Featured products retrieved successfully',
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();