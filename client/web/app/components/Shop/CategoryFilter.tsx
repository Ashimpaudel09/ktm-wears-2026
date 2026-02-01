type Category = {
  _id: string;
  name: string;
  slug?: string;
};

type Props = {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (slug: string) => void;
  setPage: (page: number) => void;
};

export function CategoryFilter({
  categories,
  activeCategory,
  setActiveCategory,
  setPage,
}: Props) {
  const items = [
    { label: "All", slug: "all" },
    ...categories.map((c) => ({
      label: c.name,
      slug: c.slug ?? c.name.toLowerCase().replace(/\s+/g, "-"),
    })),
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      {items.map(({ label, slug }) => (
        <button
          key={slug}
          onClick={() => {
            setPage(1);
            setActiveCategory(slug);
          }}
          className={`rounded-full px-4 py-2 text-sm border transition ${
            activeCategory === slug
              ? "bg-[#0f00ff] text-white border-[#0f00ff]"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
