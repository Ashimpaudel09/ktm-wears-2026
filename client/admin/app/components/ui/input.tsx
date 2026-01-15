import * as React from "react";
import { cn } from "../../lib/utils/utils";
import type { LucideIcon } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  error?: boolean;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon: Icon, error, ...props }, ref) => {
    return (
      <div className="w-full h-12">
        <div
          className={cn(
            "relative flex items-center rounded-md border border-muted-foreground px-3 transition-colors",
            error
              ? "border-error border"
              : " border-muted-foreground focus-within:border-foreground focus-within:border",
            className,
          )}
        >
          {Icon && (
            <Icon className="mr-3 h-5 text-muted-foreground w-5 opacity-80" />
          )}

          <input
            type={type}
            ref={ref}
            className="
              w-full bg-transparent py-3
              text-sm 
              outline-none
              border-muted-foreground
            placeholder:text-gray-200,

            "
            {...props}
          />
        </div>
      </div>
    );
  },
);
Input.displayName = "Input";
export { Input };
