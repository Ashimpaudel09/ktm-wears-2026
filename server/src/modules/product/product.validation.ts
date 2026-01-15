import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().trim().max(200).required(),
  description: Joi.string().trim().required(),
  price: Joi.number().min(0).optional(),
  category: Joi.string().required(),
  isActive: Joi.boolean().optional(),
  isFeatured: Joi.boolean().optional(),
  tags: Joi.array().items(Joi.string().trim()).optional(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().trim().max(200).optional(),
  description: Joi.string().trim().optional(),
  price: Joi.number().min(0).optional(),
  category: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
  isFeatured: Joi.boolean().optional(),
  tags: Joi.array().items(Joi.string().trim()).optional(),
}).min(1);

export const querySchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  search: Joi.string().trim().optional(),
  category: Joi.string().optional(),
  sort: Joi.string().valid('name', '-name', 'price', '-price', 'createdAt', '-createdAt').optional(),
  featured: Joi.boolean().optional(),
});
