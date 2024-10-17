import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/classes.utils";

export type _TButtonVariants = _TVariants | "ghost" | "link";

interface _IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: _TButtonVariants;
  size: _TSizes;
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring aria-disabled:pointer-events-none aria-disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary dark:bg-primary-dark text-primary-foreground dark:text-primary-darkForeground shadow hover:bg-primary/80",
        destructive:
          "bg-destructive dark:bg-destructive-dark text-destructive-foreground dark:text-destructive-darkForeground shadow-sm hover:bg-destructive/80 dark:hover:bg-destructive-dark/80",
        outline:
          "border border:neutral-300 dark:border-neutral-600 bg-outline/5 dark:bg-outline-dark/5 shadow-sm hover:bg-outline/60 dark:hover:bg-outline-dark/60 hover:text-outline-foreground dark:hover:text-outline-darkForeground",
        secondary:
          "bg-secondary dark:bg-secondary-dark text-secondary-foreground dark:text-black shadow-sm hover:bg-secondary/80 dark:hover:bg-secondary-dark/80",
        ghost:
          "hover:bg-accent dark:hover:bg-accent-dark hover:text-accent-foreground dark:hover:text-accent-darkForeground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef<HTMLButtonElement, _IButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={type} // Using standard type instead of buttonType
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
