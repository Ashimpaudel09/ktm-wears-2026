import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required").max(200, "Name too long"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be positive").optional(),
  category: z.string().min(1, "Category is required"),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type ProductFormData = z.infer<typeof productSchema>;
