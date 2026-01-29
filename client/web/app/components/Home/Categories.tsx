import React, { useEffect } from "react";
import { motion } from "motion/react";
import { useCategoryStore } from "../../lib/store/categoryStore";
import type { CategoryFormData } from "../../lib/schemas/category.schema";

// Map category names → images

type CategoryCardProps = {
  title: string;
  image: string;
  className?: string;
  delay?: number;
};

const CategoryCard = ({
  title,
  image,
  className,
  delay = 0,
}: CategoryCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`relative rounded-3xl overflow-hidden group cursor-pointer ${className}`}
  >
    <div className="absolute inset-0 bg-gray-100 transition-transform duration-700 group-hover:scale-105">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>

    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />

    <div className="absolute bottom-6 left-6 bg-white px-6 py-3 rounded-full shadow-lg">
      <span className="font-medium text-lg text-gray-900">
        {title}
      </span>
    </div>
  </motion.div>
);

export function Categories() {
  const { fetchCategories, categories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Only show active categories (from Zod schema)
  const activeCategories = categories.filter(
    (cat: CategoryFormData) => cat.isActive
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
          {/* Left */}
          <div className="md:col-span-2 flex flex-col gap-6 h-full">
            {activeCategories[0] && (
              <CategoryCard
                title={activeCategories[0].name}
                image={'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80'}
                className="h-[300px] md:h-1/2 w-full"
              />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-[300px] md:h-1/2">
              {activeCategories.slice(1, 3).map((cat, index) => (
                <CategoryCard
                  key={cat.name}
                  title={cat.name}
                  image={"https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80"}
                  className="h-full"
                  delay={0.1 * (index + 1)}
                />
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="md:col-span-1 h-[400px] md:h-full">
            {activeCategories[3] && (
              <CategoryCard
                title={activeCategories[3].name}
                image={"https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80"}
                className="h-full w-full"
                delay={0.3}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
