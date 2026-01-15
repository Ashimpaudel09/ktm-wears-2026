import { Edit, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { useCategoryStore } from "~/lib/store/categoryStore";
import { Button } from "../ui/button";
import CategoryModal from "./CategoryModal";
import EditCategoryModal from "./EditCategoryModal"; // import the edit modal
import ConfirmDialog from "../common/ConfirmDialog";

export default function CategoriesSection() {
  const { categories, deleteCategory } = useCategoryStore();
  const [addOpen, setAddOpen] = useState(false);

  // For edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // For confirm dialog
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAddCategory = () => setAddOpen(true);

  const handleEditClick = (id: string, name: string) => {
    setSelectedCategory({ id, name });
    setEditOpen(true);
  };

  const handleDeleteClick = (categoryId: string) => {
    setCategoryToDelete(categoryId);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      setIsDeleting(true);
      await deleteCategory(categoryToDelete);
    } finally {
      setIsDeleting(false);
      setConfirmOpen(false);
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <Button variant="secondary" onClick={handleAddCategory}>
          <Plus />
          Add Category
        </Button>

        {/* Add Modal */}
        {addOpen && <CategoryModal onClose={() => setAddOpen(false)} />}
      </div>

      {/* Category List */}
      <div className="space-y-3">
        {categories.map((category) => (
          <div
            key={category._id}
            className="flex items-center justify-between p-2 border-b border-muted-foreground"
          >
            <span>{category.name}</span>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="button"
                onClick={() => handleEditClick(category._id, category.name)}
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDeleteClick(category._id)}
              >
                <Trash className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editOpen && selectedCategory && (
        <EditCategoryModal
          onClose={() => setEditOpen(false)}
          categoryId={selectedCategory.id}
          categoryName={selectedCategory.name}
        />
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
      />
    </div>
  );
}
