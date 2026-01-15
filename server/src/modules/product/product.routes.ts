import { Router, Response, NextFunction } from 'express';
import productController from './product.controller';
import { adminAuth } from '../../middlewares/auth.middleware';
import { upload } from '../../utils/multer.utils';
import {  MulterRequest } from '../../types';

const router = Router();

// Public routes
router.get('/', (req, res, next) => productController.getProducts(req as MulterRequest, res as Response, next));
router.get('/featured', (req, res, next) => productController.getFeaturedProducts(req as MulterRequest, res as Response, next));
router.get('/:id', (req, res, next) => productController.getProductById(req as MulterRequest, res as Response, next));
router.get('/slug/:slug', (req, res, next) => productController.getProductBySlug(req as MulterRequest, res as Response, next));

// Admin routes
router.post(
  '/',
  adminAuth,
  upload.array('images', 10),
  (req, res, next) => productController.createProduct(req as MulterRequest, res as Response, next as NextFunction)
);

router.put(
  '/:id',
  adminAuth,
  upload.array('images', 10),
  (req, res, next) => productController.updateProduct(req as MulterRequest, res as Response, next as NextFunction)
);

router.delete('/:id', adminAuth, (req, res, next) => productController.deleteProduct(req as MulterRequest, res as Response, next as NextFunction));

export default router;