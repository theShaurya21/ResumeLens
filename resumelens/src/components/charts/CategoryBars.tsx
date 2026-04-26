"use client";
// src/components/charts/CategoryBars.tsx
import { useEffect, useRef } from "react";
import type { CategoryScore } from "@/types";

interface Props {
  categories: CategoryScore[];
}

export default function CategoryBars({ categories }: Props) {
  const fillRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate bars after mount
    const timer = setTimeout(() => {
      fillRefs.current.forEach((el, i) => {
        if (el) el.style.width = categories[i].score + "%";
      });
    }, 120);
    return () => clearTimeout(timer);
  }, [categories]);

  const strength = (score: number) =>
    score >= 70
      ? { label: "Strong",  color: "#00e676" }
      : score >= 40
      ? { label: "Partial", color: "#ffb300" }
      : { label: "Weak",    color: "#ff6b8a" };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {categories.map((cat, i) => {
        const st = strength(cat.score);
        return (
          <div
            key={cat.cat}
            className="bg-bg3 border border-border rounded-xl p-5"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <span
                className="text-[12px] font-semibold font-mono"
                style={{ color: cat.color }}
              >
                {cat.cat}
              </span>
              <span
                className="font-mono text-[24px] font-bold leading-none"
                style={{ color: cat.color }}
              >
                {cat.score}%
              </span>
            </div>

            {/* Bar */}
            <div className="h-1.5 bg-border2 rounded-full overflow-hidden mb-2">
              <div
                ref={(el) => { fillRefs.current[i] = el; }}
                className="h-full rounded-full bar-fill"
                style={{ background: cat.color, width: "0%" }}
              />
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-muted">
                {cat.found} / {cat.needed} skills
              </span>
              <span
                className="text-[10px] font-mono font-bold"
                style={{ color: st.color }}
              >
                {st.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
