"use client";
// src/components/ui/LoadingScreen.tsx
import { useEffect, useState } from "react";

const PIPELINE_STEPS = [
  "Tokenisation & Stopword Removal",
  "TF-IDF Vector Construction",
  "Cosine Similarity Computation",
  "Skill Taxonomy Matching",
  "Category Score Analysis",
  "Experience Gap Detection",
  "Generating Recommendations",
];

export default function LoadingScreen() {
  const [lit, setLit] = useState<number>(-1);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setLit(i);
      i++;
      if (i >= PIPELINE_STEPS.length) clearInterval(id);
    }, 330);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">

      {/* Triple-ring spinner */}
      <div className="relative w-20 h-20 mb-8">
        {[
          { size: "w-20 h-20 top-0 left-0",    color: "border-t-cyan",   dur: "0.9s"  },
          { size: "w-14 h-14 top-3 left-3",    color: "border-r-purple", dur: "1.3s"  },
          { size: "w-8  h-8  top-6 left-6",    color: "border-b-green",  dur: "1.7s"  },
        ].map((ring, i) => (
          <div
            key={i}
            className={[
              "absolute rounded-full border-2 border-transparent animate-spin",
              ring.size,
              ring.color,
            ].join(" ")}
            style={{ animationDuration: ring.dur, animationDirection: i === 1 ? "reverse" : "normal" }}
          />
        ))}
      </div>

      <p className="font-mono text-[13px] text-muted mb-6 tracking-widest uppercase">
        Running NLP Pipeline…
      </p>

      <div className="flex flex-col gap-2 items-center">
        {PIPELINE_STEPS.map((step, i) => (
          <p
            key={step}
            className={[
              "font-mono text-[11px] tracking-wide transition-all duration-400",
              i < lit  ? "text-green opacity-70"
              : i === lit ? "text-cyan opacity-100"
              : "text-muted2 opacity-40",
            ].join(" ")}
          >
            {i < lit ? "✓" : i === lit ? "›" : "·"}&nbsp;&nbsp;
            {String(i + 1).padStart(2, "0")} — {step}
          </p>
        ))}
      </div>
    </div>
  );
}
