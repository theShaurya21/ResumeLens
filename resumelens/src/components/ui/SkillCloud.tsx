"use client";
// src/components/ui/SkillCloud.tsx
import type { SkillItem } from "@/types";

type CloudType = "match" | "miss" | "extra";

interface Props {
  skills: SkillItem[];
  type:   CloudType;
}

const STYLES: Record<CloudType, string> = {
  match: "bg-green/8 border-green/25 text-green",
  miss:  "bg-red/8 border-red/25 text-[#ff6b8a]",
  extra: "bg-amber/8 border-amber/25 text-amber",
};

const EMPTY: Record<CloudType, string> = {
  match: "No matching skills detected.",
  miss:  "No missing skills — great match!",
  extra: "No extra skills.",
};

export default function SkillCloud({ skills, type }: Props) {
  if (!skills.length) {
    return (
      <p className="text-[12px] font-mono text-muted">{EMPTY[type]}</p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((s) => {
        const isCriticalMiss = s.i === "critical" && type === "miss";
        return (
          <span
            key={s.n}
            className={[
              "skill-chip inline-flex items-center gap-1.5 rounded-[9px] px-3.5 py-[7px]",
              "text-[12px] font-semibold font-mono border",
              STYLES[type],
              isCriticalMiss ? "shadow-[0_0_0_1.5px_#d50000]" : "",
            ].join(" ")}
            title={`${s.cat} · ${s.i}`}
          >
            <span className="w-[5px] h-[5px] rounded-full bg-current flex-shrink-0" />
            {s.n}
            {s.i === "critical"  && (
              <span className="text-[9px] opacity-60 uppercase tracking-wide">★</span>
            )}
            {s.i === "important" && (
              <span className="text-[9px] opacity-60 uppercase tracking-wide">◆</span>
            )}
          </span>
        );
      })}
    </div>
  );
}
