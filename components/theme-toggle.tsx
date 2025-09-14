"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    const stored = localStorage.getItem("theme:dark") === "true";
    if (stored) {
      root.classList.add("dark");
      setIsDark(true);
    } else {
      root.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  function toggle() {
    const root = document.documentElement;
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("theme:dark", String(next));
    root.classList.toggle("dark", next);
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <button
        className="rounded-full border-[3px] border-[var(--secondary)] bg-[var(--primary-foreground)] p-2 text-xl text-[var(--primary)] shadow-[0_2px_0_rgba(0,0,0,0.08)] hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)] aspect-square leading-none transition-colors duration-200"
        aria-label="Toggle theme"
      >
        <span role="img" aria-hidden>🌙</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      className="rounded-full border-[3px] border-[var(--secondary)] bg-[var(--primary-foreground)] p-2 text-xl text-[var(--primary)] shadow-[0_2px_0_rgba(0,0,0,0.08)] hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)] aspect-square leading-none transition-colors duration-200"
      aria-label="Toggle theme"
      title={isDark ? "Switch to light" : "Switch to dark"}
    >
      <span role="img" aria-hidden>
        {isDark ? "🌞" : "🌙"}
      </span>
    </button>
  );
}


