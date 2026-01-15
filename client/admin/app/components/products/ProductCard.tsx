import { Edit, Trash, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type ProductImage = {
  url: string;
  alt?: string;
};

type Product = {
  _id: string;
  name: string;
  description?: string;
  price?: number;
  images?: ProductImage[];
  isActive?: boolean;
  isFeatured?: boolean;
};

type ProductCardProps = {
  product: Product;
  currentIndex: number;
  prevImage: (productId: string, length: number) => void;
  nextImage: (productId: string, length: number) => void;
  onEdit: () => void | Promise<void>;
  onDelete: () => void;
};

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */

export default function ProductCard({
  product,
  currentIndex,
  prevImage,
  nextImage,
  onEdit,
  onDelete,
}: ProductCardProps) {
  const images = product.images ?? [];

  return (
    <div className="bg-[#23293e] shadow-2xl rounded-2xl overflow-hidden flex flex-col">
      {/* Image Carousel */}
      <div className="relative h-72 w-full bg-muted-foreground overflow-hidden">
        {images.length > 0 ? (
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].alt ?? product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
            No Image
          </div>
        )}

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => prevImage(product._id, images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => nextImage(product._id, images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Index */}
        {images.length > 1 && (
          <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            {currentIndex + 1}/{images.length}
          </span>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isFeatured && (
            <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded">
              Featured
            </span>
          )}
          {product.isActive === false && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              Inactive
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="text-xl font-semibold line-clamp-2">{product.name}</h3>
          <p className="text-gray-400 text-sm line-clamp-3 mt-1">
            {product.description ?? "No description available."}
          </p>
        </div>

        <div className="text-lg font-semibold">
          Rs {product.price?.toFixed(2) ?? "0.00"}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto">
          <Button size="sm" onClick={onEdit} className="flex gap-1">
            <Edit size={16} /> Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={onDelete}
            className="flex gap-1"
          >
            <Trash size={16} /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
