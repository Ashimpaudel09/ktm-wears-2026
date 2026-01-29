import React from "react";
import clsx from "clsx";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type BadgeVariant = "blue" | "red" | "green" | "yellow" | "gray" | "black";

type BadgeProps = {
  children: React.ReactNode;
  color?: BadgeVariant;
  className?: string;
};

/* -------------------------------------------------------------------------- */
/*                                 STYLES                                     */
/* -------------------------------------------------------------------------- */

const colorStyles: Record<BadgeVariant, string> = {
  blue: "bg-blue-600 text-white",
  red: "bg-red-600 text-white",
  green: "bg-green-600 text-white",
  yellow: "bg-yellow-400 text-black",
  gray: "bg-gray-200 text-gray-800",
  black: "bg-black text-white",
};

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

export function Badge({ children, color = "gray", className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        colorStyles[color],
        className,
      )}
    >
      {children}
    </span>
  );
}
