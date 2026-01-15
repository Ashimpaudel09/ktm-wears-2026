import * as React from "react";
import { cn } from "../../lib/utils/utils";

/* -------------------------------- Card -------------------------------- */

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props} />
));
Card.displayName = "Card";

/* ------------------------------ CardHeader ------------------------------ */

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5 px-6 pt-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/* ------------------------------- CardTitle ------------------------------ */

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-[30px] font-bold leading-tight tracking-tight text-primary",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/* ---------------------------- CardDescription --------------------------- */

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-md leading-relaxed text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/* ------------------------------ CardContent ----------------------------- */

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-6 pb-6 pt-4", className)} {...props} />
));
CardContent.displayName = "CardContent";

/* ------------------------------ CardFooter ------------------------------ */

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-end gap-2 px-6 pb-6 pt-0",
      className,
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

/* -------------------------------- Exports -------------------------------- */

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
