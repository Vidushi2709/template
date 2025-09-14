import { Pixelify_Sans, Nunito } from "next/font/google";
import type { PropsWithChildren, ReactNode } from "react";
import { LeftNav } from "@/components/left-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";

const pixel = Pixelify_Sans({ weight: ["400", "700"], subsets: ["latin"] });
const bodyFont = Nunito({ subsets: ["latin"] });

type SiteFrameProps = PropsWithChildren<{
  title?: string;
  rightSidebar?: ReactNode;
  leftSidebar?: ReactNode;
}>;

export function SiteFrame({
  title = "VIDUSHI ANAND",
  rightSidebar = null,
  leftSidebar = null,
  children,
}: SiteFrameProps) {
  return (
    <main className={`min-h-screen w-full ${bodyFont.className}`}>
      <div className="mx-auto max-w-6xl px-2 py-2 sm:px-4 sm:py-6 md:py-10 flex items-center justify-center">
        <div className="w-full min-h-screen sm:min-h-0 sm:h-[91vh] sm:max-w-5xl rounded-3xl border-[4px] border-[var(--secondary)] bg-[var(--card)] shadow-[0_4px_0_rgba(0,0,0,0.08)] flex flex-col">
          <header className="relative overflow-hidden rounded-t-[22px] flex-shrink-0">
                        <div className="flex items-center justify-center h-20 w-full sm:h-28 md:h-36 bg-[var(--primary)] relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{
                  backgroundImage: `url('https://i.pinimg.com/736x/21/8d/73/218d73097147595cc759ca877ad10bd6.jpg')`
                }}
              />
              <h1
                className={`${pixel.className} text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[0_25em] text-[var(--primary-foreground)] relative z-10`}
                aria-label={title}
              >
                {title}
              </h1>
              <div className="absolute right-4 top-4 sm:right-6 sm:top-6 flex items-center gap-2 z-20">
                <ThemeToggle />
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-1 p-2 sm:gap-2 sm:p-3 md:grid-cols-12 md:gap-4 md:p-4 flex-1 min-h-0 h-full overflow-y-auto scrollbar-hide">
            <aside className="hidden md:block space-y-3 md:col-span-3">
              {leftSidebar || <LeftNav />}
            </aside>
            <section className="space-y-1 sm:space-y-2 md:space-y-3 md:col-span-6">
              <div className="md:hidden mb-2">
                <MobileNav />
              </div>
              {children}
            </section>
            <aside className="space-y-2 sm:space-y-3 md:col-span-3">
              {rightSidebar}
            </aside>
          </div>

          <div className="h-4 sm:h-6 w-full rounded-b-[22px] bg-[var(--secondary)] flex-shrink-0" />
        </div>
      </div>
    </main>
  );
}
