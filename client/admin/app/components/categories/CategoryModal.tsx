import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import InputError from "../ui/input-error";
import { useCategoryStore } from "~/lib/store/categoryStore";
import LoadingSpinner from "../common/LoadingSpinner";
import { Button } from "../ui/button";

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

export default function CategoryModal({ onClose }: { onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false); // track loading
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "" },
  });

  const { createCategory } = useCategoryStore();

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setIsLoading(true);
      await createCategory(data); // wait for creation
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* modal */}
      <div className="relative w-full max-w-md rounded-xl bg-muted-foreground p-6 shadow-lg text-foreground">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Add Category</h2>
          <button onClick={onClose} disabled={isLoading}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Category Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Category Name</label>
            <Input
              {...register("name")}
              className="bg-input-background"
              error={!!errors.name}
              disabled={isLoading}
            />
            {errors.name && <InputError message={errors.name.message!} />}
          </div>

          {/* actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant={"default"} onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button variant={"button"} disabled={isLoading}>
              {isLoading ? <LoadingSpinner size="sm" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
