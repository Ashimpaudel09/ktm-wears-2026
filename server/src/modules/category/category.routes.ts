import { Router } from 'express';
import categoryController from './category.controller';
import { adminAuth } from '../../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/', categoryController.getAllCategories.bind(categoryController));
router.get('/:id', categoryController.getCategoryById.bind(categoryController));
router.get('/slug/:slug', categoryController.getCategoryBySlug.bind(categoryController));

// Admin routes
router.post('/', adminAuth, categoryController.createCategory.bind(categoryController));
router.put('/:id', adminAuth, categoryController.updateCategory.bind(categoryController));
router.delete('/:id', adminAuth, categoryController.deleteCategory.bind(categoryController));

export default router;