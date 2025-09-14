import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-xl border-[3px] border-[var(--secondary)] bg-[var(--primary-foreground)] px-3 py-2",
          "text-[15px] text-[var(--foreground)] placeholder:text-[color-mix(in_oklab,var(--foreground)_50%,transparent)]",
          "shadow-[0_2px_0_rgba(0,0,0,0.08),inset_0_0_0_2px_color-mix(in_oklab,var(--secondary)_30%,transparent)] outline-none transition",
          "focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]",
          "min-h-[120px] resize-vertical",
          className
        )}
        {...props}
      />
    );
  }
);
export default Textarea;
