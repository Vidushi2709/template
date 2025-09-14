"use client";

import { useEffect, useState } from "react";

export function VisitorCounter({ digits = 6 }: { digits?: number }) {
  const [value, setValue] = useState<string>("".padStart(digits, "0"));

  useEffect(() => {
    // Fake deterministic id per session
    const seed = Math.floor(100000 + Math.random() * 899999)
      .toString()
      .slice(0, digits);
    setValue(seed.padStart(digits, "0"));
  }, [digits]);

  return (
    <div className="flex items-center justify-center gap-1">
      {value.split("").map((d, i) => (
        <span
          key={i}
          className="inline-flex h-8 w-7 items-center justify-center rounded-md border-[3px] border-[#f7cde1] bg-white text-[#ff5fa6] shadow-[0_2px_0_#f1b7cf,inset_0_0_0_2px_#ffe6f1] font-bold"
          aria-label={"digit " + d}
        >
          {d}
        </span>
      ))}
    </div>
  );
}
