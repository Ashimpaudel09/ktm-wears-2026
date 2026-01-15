import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { useContext } from "react";
import { SelectContext } from "./select";

export function SelectTrigger({
  children,
  disabled = false,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("SelectTrigger must be used inside <Select>");
  }

  const { open, setOpen, variant } = context;

  const variants = {
    default: "bg-zinc-900 border border-zinc-700",
    outline: "bg-transparent border border-zinc-600",
    ghost: "bg-transparent border-none",
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => setOpen(!open)}
      className={clsx(
        "w-full h-11 px-3 rounded-md flex items-center justify-between text-left",
        "text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
        variants[variant],
        disabled && "opacity-50 cursor-not-allowed",
      )}
    >
      <span className="truncate">{children}</span>
      <ChevronDown
        size={16}
        className={clsx("transition-transform", open && "rotate-180")}
      />
    </button>
  );
}
