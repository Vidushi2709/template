import { Panel } from "@/components/panel";
import { NavButton } from "@/components/nav-button";
import Link from "next/link";

export function LeftNav() {
  return (
    <div className="flex flex-col space-y-3">
      <Panel title="navigation" headerDecor className="h-auto">
        <div className="flex flex-col gap-2">
          <NavButton label="home" emoji="🍓" href="/" />
          <NavButton label="about me" emoji="💌" href="/about" />
          <NavButton label="blog" emoji="📒" href="/blog" />
          <NavButton label="projects" emoji="🧸" href="/projects" />
          <NavButton label="resume" emoji="📄" href="/resume" />
          <NavButton label="contact" emoji="📫" href="/contact" />
        </div>
      </Panel>

      <Panel title="socials" className="h-auto">
        <div className="flex flex-col gap-1">
          <Link
            href="https://github.com/vidushi2709"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-1.5 rounded-lg border-[3px] border-[var(--border)] bg-[var(--panel-header-bg)] text-[var(--primary)] dark:text-white hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)] transition-colors"
          >
            <span className="text-base">🐙</span>
            <span className="text-xs font-semibold">github</span>
          </Link>

          <Link
            href="https://linkedin.com/in/vidushi-anand-49420928a"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-1.5 rounded-lg border-[3px] border-[var(--border)] bg-[var(--panel-header-bg)] text-[var(--primary)] dark:text-white hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)] transition-colors"
          >
            <span className="text-base">💼</span>
            <span className="text-xs font-semibold">linkedin</span>
          </Link>

          <Link
            href="https://twitter.com/idkwhyvi62159"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-1.5 rounded-lg border-[3px] border-[var(--border)] bg-[var(--panel-header-bg)] text-[var(--primary)] dark:text-white hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)] transition-colors"
          >
            <span className="text-base">🐦</span>
            <span className="text-xs font-semibold">twitter</span>
          </Link>

          <Link
            href="https://medium.com/@vidushianand09"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-1.5 rounded-lg border-[3px] border-[var(--border)] bg-[var(--panel-header-bg)] text-[var(--primary)] dark:text-white hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)] transition-colors"
          >
            <span className="text-base">📖</span>
            <span className="text-xs font-semibold">medium</span>
          </Link>
        </div>
      </Panel>
    </div>
  );
}
