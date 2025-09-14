"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

type NavButtonProps = {
  href?: string;
  label?: string;
  emoji?: string;
};

export function NavButton({
  href = "#",
  label = "link",
  emoji = "🍓",
}: NavButtonProps) {
  const [pressed, setPressed] = useState(false);
  const pathname = usePathname();
  const isActive = href !== "#" && pathname === href;

  return (
    <Link
      href={href}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex w-full items-center justify-start gap-2 rounded-lg border-[2px]",
        "border-[var(--border)] bg-[var(--panel-header-bg)] px-3 py-2 text-[14px] font-semibold text-[var(--primary)]",
        "shadow-[-2px_0_0_rgba(0,0,0,0.08),0_2px_0_rgba(0,0,0,0.08)] transition-colors",
        "dark:text-white",
        isActive && "bg-[var(--secondary)] text-[var(--secondary-foreground)]",
        !isActive && (pressed ? "translate-y-[1px]" : "hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)]")
      )}
    >
      <span aria-hidden="true">{emoji}</span>
      <span>{label}</span>
    </Link>
  );
}
