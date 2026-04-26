"use client";
// src/components/charts/KeywordChart.tsx
import { useEffect, useRef } from "react";
import type { KeywordScore } from "@/types";

interface Props {
  keywords: KeywordScore[];
}

export default function KeywordChart({ keywords }: Props) {
  const jFillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rFillRefs = useRef<(HTMLDivElement | null)[]>([]);

  const maxJ = Math.max(...keywords.map((k) => k.jFreq), 1);
  const maxR = Math.max(...keywords.map((k) => k.rFreq), 1);

  useEffect(() => {
    const timer = setTimeout(() => {
      jFillRefs.current.forEach((el, i) => {
        if (el) el.style.width = Math.round((keywords[i].jFreq / maxJ) * 100) + "%";
      });
      rFillRefs.current.forEach((el, i) => {
        if (el) el.style.width = Math.round((keywords[i].rFreq / maxR) * 100) + "%";
      });
    }, 150);
    return () => clearTimeout(timer);
  }, [keywords, maxJ, maxR]);

  return (
    <div className="flex flex-col gap-3.5">
      {keywords.map((kw, i) => (
        <div
          key={kw.word}
          className="grid items-center gap-3.5"
          style={{ gridTemplateColumns: "130px 1fr auto" }}
        >
          {/* Keyword label */}
          <span className="font-mono text-[12px] font-semibold text-white/80 truncate">
            {kw.word}
          </span>

          {/* Double bar */}
          <div className="flex flex-col gap-1">
            {/* JD bar */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-wide text-muted w-9 flex-shrink-0">
                JD
              </span>
              <div className="flex-1 h-[5px] bg-border2 rounded-full overflow-hidden">
                <div
                  ref={(el) => { jFillRefs.current[i] = el; }}
                  className="h-full rounded-full bar-fill"
                  style={{ background: "#a855f7", width: "0%" }}
                />
              </div>
            </div>
            {/* Resume bar */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-wide text-muted w-9 flex-shrink-0">
                CV
              </span>
              <div className="flex-1 h-[5px] bg-border2 rounded-full overflow-hidden">
                <div
                  ref={(el) => { rFillRefs.current[i] = el; }}
                  className="h-full rounded-full bar-fill"
                  style={{ background: kw.present ? "#00e676" : "#ff1744", width: "0%" }}
                />
              </div>
            </div>
          </div>

          {/* Status badge */}
          <span
            className={[
              "font-mono text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap",
              kw.present
                ? "bg-green/10 text-green"
                : "bg-red/10 text-[#ff6b8a]",
            ].join(" ")}
          >
            {kw.present ? "✓ Found" : "✗ Missing"}
          </span>
        </div>
      ))}
    </div>
  );
}
