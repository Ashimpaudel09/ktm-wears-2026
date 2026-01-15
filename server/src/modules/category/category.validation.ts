import Joi from 'joi';

export const createCategorySchema = Joi.object({
  name: Joi.string().trim().max(100).required().messages({
    'string.empty': 'Category name is required',
    'string.max': 'Category name cannot exceed 100 characters',
  }),
  description: Joi.string().trim().max(500).optional().allow(''),
  isActive: Joi.boolean().optional(),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().trim().max(100).optional(),
  description: Joi.string().trim().max(500).optional().allow(''),
  isActive: Joi.boolean().optional(),
}).min(1);