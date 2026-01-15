import React, { createContext, useContext, useState } from "react";

type SelectContextType = {
  value: string | null;
  setValue: (v: string) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  variant: "default" | "outline" | "ghost";
};

export const SelectContext = createContext<SelectContextType | null>(null);

export default function Select({
  value,
  onValueChange,
  children,
  variant = "default",
}: {
  value?: string;
  onValueChange?: (v: string) => void;
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
}) {
  const [internalValue, setInternalValue] = useState<string | null>(
    value ?? null,
  );
  const [open, setOpen] = useState(false);

  const setValue = (v: string) => {
    setInternalValue(v);
    onValueChange?.(v);
    setOpen(false);
  };

  return (
    <SelectContext.Provider
      value={{
        value: internalValue,
        setValue,
        open,
        setOpen,
        variant,
      }}
    >
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

export function useSelect() {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error("Select components must be used inside <Select>");
  return ctx;
}
