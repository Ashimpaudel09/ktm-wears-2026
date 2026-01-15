import { useSelect } from "./select";
import clsx from "clsx";
export function SelectItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const { value: selected, setValue } = useSelect();

  return (
    <button
      type="button"
      onClick={() => setValue(value)}
      className={clsx(
        "w-full px-3 py-2 text-left text-sm hover:bg-blue-600/20 transition",
        selected === value && "bg-blue-600/30 text-blue-400",
      )}
    >
      {children}
    </button>
  );
}
