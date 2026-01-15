import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import InputError from "../ui/input-error";
import { useProductStore } from "~/lib/store/productStore";
import { GripVertical } from "lucide-react";

import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import LoadingSpinner from "../common/LoadingSpinner";
import { Button } from "../ui/button";
import Select from "../ui/select";
import { SelectTrigger } from "../ui/selectTrigger";
import { SelectItem } from "../ui/selectItem";
import { SelectContent } from "../ui/selectContent";

// Zod schema for editing (images are optional)
export const editProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  images: z.any().optional(), // Optional for editing
});

export type EditProductFormValues = z.infer<typeof editProductSchema>;

interface EditableImage {
  id: string;
  url: string;
  file?: File;
}

interface EditProductModalProps {
  productId: string;
  productName: string;
  productDescription?: string;
  productPrice?: number;
  productCategory: string; // Allow both string and object
  productTags?: string[];
  productIsActive?: boolean;
  productIsFeatured?: boolean;
  productImages: EditableImage[];
  categories: { id: string; name: string }[];
  onClose: () => void;
}

interface PreviewImage {
  file?: File;
  url: string;
  id: string;
  isExisting?: boolean;
}

function SortableImage({
  img,
  onRemove,
}: {
  img: PreviewImage;
  onRemove: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: img.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative h-24 w-24 rounded border overflow-hidden group bg-black"
    >
      <img src={img.url} alt="preview" className="h-full w-full object-cover" />

      {/* Drag handle */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="absolute bottom-1 left-1 bg-black/70 text-white p-1 rounded cursor-grab"
        title="Drag to reorder"
      >
        <GripVertical size={14} />
      </button>

      {/* Remove button */}
      <button
        type="button"
        onClick={() => onRemove(img.id)}
        className="absolute top-1 right-1 bg-gray-200 text-red-500 rounded-full h-5 w-5 text-xs flex items-center justify-center hover:bg-red-600 hover:text-white"
        title="Remove image"
      >
        <X size={12} />
      </button>
    </div>
  );
}

export default function EditProductModal({
  productId,
  productName,
  productDescription,
  productPrice,
  productCategory,
  productTags = [],
  productIsActive = true,
  productIsFeatured = false,
  productImages,
  categories,
  onClose,
}: EditProductModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<PreviewImage[]>([]);
  const { updateProduct } = useProductStore();

  // Extract category ID if it's an object
  type CategoryLike = { _id?: string; id?: string } | string;
  const categoryTyped = productCategory as CategoryLike;
  const categoryId =
    typeof categoryTyped === "string"
      ? categoryTyped
      : categoryTyped._id || categoryTyped.id || "";

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: productName,
      description: productDescription || "",
      price: productPrice || 0,
      category: categoryId,
      tags: productTags,
      isActive: productIsActive,
      isFeatured: productIsFeatured,
      images: [],
    },
  });

  const watchedFiles = watch("images");
  const selectedCategory = categories.find((c) => c.id === watch("category"));

  // Sensors for drag and drop
  const sensors = useSensors(useSensor(PointerSensor));

  // Initialize with existing images
  useEffect(() => {
    const existingImages: PreviewImage[] = productImages.map((img) => ({
      id: img.id,
      url: img.url,
      isExisting: true,
    }));
    setImages(existingImages);
  }, [productImages]);

  // Append new images when files are selected
  React.useEffect(() => {
    if (!watchedFiles || watchedFiles.length === 0) return;

    const newFiles = Array.from(watchedFiles as unknown as FileList).map(
      (file) => ({
        file,
        url: URL.createObjectURL(file),
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        isExisting: false,
      }),
    );

    setImages((prev) => [...prev, ...newFiles]);
  }, [watchedFiles]);

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = images.findIndex((img) => img.id === active.id);
      const newIndex = images.findIndex((img) => img.id === over?.id);
      setImages((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  const onSubmit = async (data: EditProductFormValues) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");
      formData.append("price", data.price.toString());
      formData.append("category", data.category);
      formData.append("isActive", data.isActive.toString());
      formData.append("isFeatured", data.isFeatured.toString());

      // Handle tags
      if (data.tags && data.tags.length > 0) {
        data.tags.forEach((tag) => {
          if (tag.trim()) formData.append("tags[]", tag.trim());
        });
      }

      // Check if there are any new images
      const hasNewImages = images.some((img) => !img.isExisting && img.file);

      // Only send images if user uploaded new ones
      // WARNING: This will replace ALL existing images with the new ones
      if (hasNewImages) {
        images.forEach((img) => {
          if (!img.isExisting && img.file) {
            formData.append("images", img.file);
          }
        });
      }
      // If no new images uploaded, don't send images field at all
      // This keeps existing images unchanged

      await updateProduct(productId, formData);
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
      // Optionally show error to user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] bg-black rounded-xl p-6 shadow-lg overflow-y-auto">
        <div className="flex items-center justify-between mb-4 sticky top-0 bg-black z-10">
          <h2 className="text-lg font-semibold">Edit Product</h2>
          <button onClick={onClose} disabled={isLoading}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Product Name
            </label>
            <Input
              {...register("name")}
              disabled={isLoading}
              error={!!errors.name}
            />
            {errors.name && <InputError message={errors.name.message!} />}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              className="bg-zinc-900 w-full h-40 px-2 py-1"
              {...register("description")}
              disabled={isLoading}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <Input
              type="number"
              {...register("price", { valueAsNumber: true })}
              disabled={isLoading}
              error={!!errors.price}
            />
            {errors.price && <InputError message={errors.price.message!} />}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <Select
              value={watch("category")}
              onValueChange={(val) =>
                setValue("category", val, { shouldValidate: true })
              }
            >
              <SelectTrigger>
                {selectedCategory ? selectedCategory.name : "Select category"}
              </SelectTrigger>

              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <InputError message={errors.category.message!} />
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tags (comma separated)
            </label>
            <Controller
              control={control}
              name="tags"
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value?.join(", ") || ""}
                  disabled={isLoading}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(",").map((t) => t.trim()),
                    )
                  }
                />
              )}
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium mb-1">Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("images")}
              disabled={isLoading}
            />

            {images.length > 0 && (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={images.map((i) => i.id)}
                  strategy={horizontalListSortingStrategy}
                >
                  <div className="mt-2 flex flex-wrap gap-2">
                    {images.map((img) => (
                      <SortableImage
                        key={img.id}
                        img={img}
                        onRemove={removeImage}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>

          {/* Checkboxes */}
          <div className="flex justify-between items-center pt-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  {...register("isActive")}
                  disabled={isLoading}
                />{" "}
                Active
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  {...register("isFeatured")}
                  disabled={isLoading}
                />{" "}
                Featured
              </label>
            </div>

            <div className="flex gap-2">
              <Button
                variant={"destructive"}
                type="button"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant={"button"}
                disabled={isLoading || images.length === 0}
              >
                {isLoading ? (
                  <div className="flex">
                    <LoadingSpinner size="sm" /> Updating...
                  </div>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
