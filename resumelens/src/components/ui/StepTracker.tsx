"use client";
// src/components/ui/StepTracker.tsx

interface Step {
  num:   string;
  label: string;
}

const STEPS: Step[] = [
  { num: "01", label: "Upload"  },
  { num: "02", label: "Analyze" },
  { num: "03", label: "Results" },
];

interface Props {
  current: 1 | 2 | 3;
}

export default function StepTracker({ current }: Props) {
  return (
    <div className="flex items-center justify-center gap-0 mb-12">
      {STEPS.map((step, i) => {
        const idx    = i + 1;
        const isDone = idx < current;
        const isActive = idx === current;

        return (
          <div key={step.num} className="flex items-center gap-0">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={[
                  "w-9 h-9 rounded-full flex items-center justify-center",
                  "font-mono text-[13px] font-bold border-[1.5px] transition-all duration-300",
                  isDone
                    ? "border-green bg-green/10 text-green"
                    : isActive
                    ? "border-cyan bg-cyan/10 text-cyan shadow-[0_0_0_4px_rgba(0,229,255,0.08)]"
                    : "border-border2 bg-card text-muted",
                ].join(" ")}
              >
                {isDone ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : step.num}
              </div>
              <span
                className={[
                  "text-[10px] font-mono uppercase tracking-widest transition-colors duration-300",
                  isDone   ? "text-green"
                  : isActive ? "text-cyan"
                  : "text-muted",
                ].join(" ")}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line between steps */}
            {i < STEPS.length - 1 && (
              <div
                className={[
                  "w-16 h-[1.5px] mb-[18px] mx-0 transition-all duration-500",
                  isDone ? "bg-gradient-to-r from-green to-cyan" : "bg-border2",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
