"use client";

import { useState } from "react";
import { NavButton } from "@/components/nav-button";
;

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-xl border-[3px] border-[var(--border)] bg-[var(--panel-header-bg)] p-3 text-center font-extrabold tracking-widest text-[var(--heading)] hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)] transition-colors"
      >
        {isOpen ? "✕ close menu" : "☰ open menu"}
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 space-y-2">
          <div className="rounded-xl border-[3px] border-[var(--border)] bg-white/30 dark:bg-black/30 backdrop-blur-lg shadow-[0_4px_0_rgba(0,0,0,0.08)] ring-1 ring-white/20 dark:ring-white/10 overflow-hidden">
            <div className="border-b-[3px] border-[var(--border)] bg-white/40 dark:bg-black/40 backdrop-blur-md">
              <h2 className="px-3 py-2 text-center text-lg font-extrabold tracking-widest text-[var(--heading)]">
                navigation
              </h2>
            </div>
            <div className="p-3 space-y-2">
              <NavButton label="home" emoji="🍓" href="/" />
              <NavButton label="about me" emoji="💌" href="/about" />
              <NavButton label="blog" emoji="📒" href="/blog" />
              <NavButton label="projects" emoji="🧸" href="/projects" />
              <NavButton label="resume" emoji="📄" href="/resume" />
              <NavButton label="contact" emoji="📫" href="/contact" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}