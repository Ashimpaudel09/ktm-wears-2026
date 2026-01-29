import React, { useEffect, memo, useCallback } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useCategoryStore } from "../../lib/store/categoryStore";
import type { CategoryFormData } from "../../lib/schemas/category.schema";

/* ---------------------------------------------
  Category → Image mapping (easy to extend)
---------------------------------------------- */
const CATEGORY_IMAGES: Record<string, string> = {
  default:
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
  fashion:
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
  lifestyle:
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
};

/* ---------------------------------------------
  Card
---------------------------------------------- */
type CategoryCardProps = {
  title: string;
  image: string;
  className?: string;
  delay?: number;
  onClick: () => void;
};

const CategoryCard = memo(
  ({ title, image, className, delay = 0, onClick }: CategoryCardProps) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className={`relative rounded-3xl overflow-hidden group cursor-pointer focus:outline-none ${className}`}
    >
      {/* Image */}
      <div className="absolute inset-0 bg-gray-100 transition-transform duration-700 group-hover:scale-105">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />

      {/* Label */}
      <div className="absolute bottom-6 left-6 bg-white px-6 py-3 rounded-full shadow-lg">
        <span className="font-medium text-lg text-gray-900">{title}</span>
      </div>
    </motion.div>
  )
);

CategoryCard.displayName = "CategoryCard";

/* ---------------------------------------------
  Categories Section
---------------------------------------------- */
export function Categories() {
  const navigate = useNavigate();
  const { fetchCategories, categories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const activeCategories = categories.filter(
    (cat: CategoryFormData) => cat.isActive
  );

  const handleNavigate = useCallback(
    (slug: string) => {
      navigate(`/shop?cat=${slug}`);
    },
    [navigate]
  );

  return (
    <section className="py-0 bg-white" id="shop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-500 mb-2 font-medium"
          >
            Express your style with our standout collection
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            Shop By <span className="text-[#0f00ff]">Category</span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:h-[600px]">
          {/* Left */}
          <div className="md:col-span-2 flex flex-col gap-6 h-full">
            {activeCategories[0] && (
              <CategoryCard
                title={activeCategories[0].name}
                image={CATEGORY_IMAGES.default}
                className="h-[300px] md:h-1/2"
                onClick={() => handleNavigate(activeCategories[0].slug)}
              />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-[300px] md:h-1/2">
              {activeCategories.slice(1, 3).map((cat, index) => (
                <CategoryCard
                  key={cat._id}
                  title={cat.name}
                  image={CATEGORY_IMAGES.fashion}
                  className="h-full"
                  delay={0.1 * (index + 1)}
                  onClick={() => handleNavigate(cat.slug)}
                />
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="md:col-span-1 h-[400px] md:h-full">
            {activeCategories[3] && (
              <CategoryCard
                title={activeCategories[3].name}
                image={CATEGORY_IMAGES.lifestyle}
                className="h-full"
                delay={0.3}
                onClick={() => handleNavigate(activeCategories[3].slug)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
