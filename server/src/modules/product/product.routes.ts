import { Router } from 'express';
import productController from './product.controller';
import { adminAuth } from '../../middlewares/auth.middleware';
import { upload } from '../../utils/multer.utils';
import { IProduct, MulterRequest } from '../../types';
import { Multer } from 'multer';

const router = Router();

// Public routes
router.get('/', (req, res, next) => productController.getProducts(req as MulterRequest, res, next));
router.get('/featured', (req, res, next) => productController.getFeaturedProducts(req as MulterRequest, res, next));
router.get('/:id', (req, res, next) => productController.getProductById(req as MulterRequest, res, next));
router.get('/slug/:slug', (req, res, next) => productController.getProductBySlug(req as MulterRequest, res, next));

// Admin routes
router.post(
  '/',
  adminAuth,
  upload.array('images', 10),
  (req, res, next) => productController.createProduct(req as MulterRequest, res, next)
);

router.put(
  '/:id',
  adminAuth,
  upload.array('images', 10),
  (req, res, next) => productController.updateProduct(req as any, res, next)
);

router.delete('/:id', adminAuth, (req, res, next) => productController.deleteProduct(req as any, res, next));

export default router;