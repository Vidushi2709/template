import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2",
          "text-[15px] text-[var(--foreground)] placeholder:text-[color-mix(in_oklab,var(--foreground)_50%,transparent)]",
          "outline-none transition",
          "focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--input-border)]",
          className
        )}
        {...props}
      />
    );
  }
);
export default Input;
