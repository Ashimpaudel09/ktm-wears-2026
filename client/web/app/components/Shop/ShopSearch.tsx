export function ShopSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex justify-center mb-8">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className="w-full max-w-md px-4 py-2 rounded-full border focus:ring-2 focus:ring-[#0f00ff]"
      />
    </div>
  );
}
