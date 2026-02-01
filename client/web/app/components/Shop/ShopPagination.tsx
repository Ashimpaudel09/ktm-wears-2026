type Props = {
  page: number;
  setPage: (p: number) => void;
  pagination?: {
    totalPages?: number;
  };
  loading: boolean;
};

export function ShopPagination({ page, setPage, pagination, loading }: Props) {
  const totalPages = pagination?.totalPages ?? 1;

  if (totalPages <= 1 || loading) return null;

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-12">
      <button
        onClick={() => page > 1 && setPage(page - 1)}
        disabled={page === 1}
        className={`px-4 py-2 rounded-full border text-sm ${
          page === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"
        }`}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1;
        return (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`w-10 h-10 rounded-full border text-sm transition-all duration-300 ${
              p === page
                ? "bg-[#0f00ff] text-white border-[#0f00ff] shadow-md"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {p}
          </button>
        );
      })}

      <button
        onClick={() => page < totalPages && setPage(page + 1)}
        disabled={page === totalPages}
        className={`px-4 py-2 rounded-full border text-sm ${
          page === totalPages
            ? "opacity-40 cursor-not-allowed"
            : "hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
}
