import clsx from "clsx";
import { useSelect } from "./select";
export function SelectValue({ placeholder }: { placeholder: string }) {
  const { value } = useSelect();

  return (
    <span className={clsx(!value && "text-zinc-400")}>
      {value || placeholder}
    </span>
  );
}
