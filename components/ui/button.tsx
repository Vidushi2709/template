import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full",
          "border-[3px] border-[var(--border)] bg-[var(--primary-foreground)] px-4 py-2",
          "text-[15px] font-semibold text-[var(--primary)]",
          "shadow-[0_2px_0_rgba(0,0,0,0.08)] transition active:translate-y-[2px] active:shadow-none",
          "hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]",
          "dark:bg-[var(--secondary)] dark:text-[var(--secondary-foreground)]",
          className
        )}
        {...props}
      />
    );
  }
);
export default Button;
