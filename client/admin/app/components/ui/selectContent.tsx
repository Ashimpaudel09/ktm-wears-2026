import { useEffect, useRef } from "react";
import { useSelect } from "./select";
export function SelectContent({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = useSelect();
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute z-50 mt-1 w-full rounded-md bg-zinc-900 border border-zinc-700 shadow-lg overflow-hidden"
    >
      <div className="max-h-60 overflow-y-auto">{children}</div>
    </div>
  );
}
