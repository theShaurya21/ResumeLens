// src/components/ui/LearningPath.tsx
import type { LearningStep } from "@/types";
import { Clock, BookOpen, ExternalLink } from "lucide-react";

interface Props {
  steps: LearningStep[];
}

export default function LearningPath({ steps }: Props) {
  if (!steps.length) {
    return (
      <div className="font-mono text-[13px] text-green bg-green/6 border border-green/20 rounded-xl px-5 py-4">
        ✅ No critical skill gaps detected! Focus on deepening expertise in your strongest
        areas and building a polished GitHub portfolio.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3.5">
      {steps.map((item) => (
        <div
          key={item.step}
          className="flex gap-4 items-start bg-bg3 border border-border rounded-xl p-5 hover:border-border2 transition-colors duration-200"
        >
          {/* Step number */}
          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-mono text-[13px] font-bold bg-cyan/10 border-[1.5px] border-cyan/25 text-cyan">
            {item.step}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[15px] font-bold tracking-tight capitalize text-white/90">
                {item.skill}
              </span>
              <span className="font-mono text-[9px] px-2 py-0.5 rounded-md uppercase tracking-widest font-bold bg-green/10 border border-green/20 text-green">
                FREE
              </span>
              <span className="font-mono text-[9px] text-muted uppercase tracking-widest">
                {item.type}
              </span>
            </div>

            <div className="flex gap-5 mb-3 flex-wrap">
              <div className="flex items-center gap-1.5 text-[12px] text-muted">
                <Clock size={12} />
                ~{item.dur}
              </div>
              <div className="flex items-center gap-1.5 text-[12px] text-muted">
                <BookOpen size={12} />
                <span className="font-semibold text-white/75">{item.platform}</span>
              </div>
            </div>

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] text-cyan border border-cyan/20 rounded-lg px-3 py-1.5 hover:bg-cyan/7 hover:border-cyan/40 transition-all duration-150"
            >
              Start Learning
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
