import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

type PanelProps = PropsWithChildren<{
  title?: string;
  className?: string;
  scrollable?: boolean;
  headerDecor?: boolean;
  style?: React.CSSProperties;
}>;

export function Panel({
  title = "",
  className,
  children,
  scrollable = false,
  headerDecor = true,
  style,
}: PanelProps) {
  return (
    <section
      className={cn(
        "rounded-xl border-[3px] border-[var(--border)] bg-[var(--card)]",
        "shadow-[-2px_0_0_rgba(0,0,0,0.08),0_2px_0_rgba(0,0,0,0.08)] overflow-hidden flex flex-col",
        "h-auto",
        className
      )}
      style={style}
      aria-label={title || "panel"}
    >
      {title ? (
        <div className="relative border-b-[3px] border-[var(--border)] flex-shrink-0 bg-[var(--panel-header-bg)]">
          {headerDecor && <div className="h-2 w-full bg-[var(--border)]" aria-hidden="true" />}
          <h2 className="px-3 py-2 text-center text-lg sm:text-xl font-extrabold tracking-widest text-[var(--heading)]">
            {title}
          </h2>
        </div>
      ) : null}
      <div
        className={cn(
          "p-3 sm:p-4 text-[15px] sm:text-[16px] leading-relaxed text-[var(--foreground)] flex-1 min-h-0",
          "dark:text-[var(--muted-text)]",
          scrollable &&
            "overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[var(--border)] scrollbar-track-[color-mix(in_oklab,var(--border)_20%,transparent)] hover:scrollbar-thumb-[var(--primary)] scrollable"
        )}
      >
        {children}
      </div>
    </section>
  );
}
