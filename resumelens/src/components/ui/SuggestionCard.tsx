// src/components/ui/SuggestionCard.tsx
import type { Suggestion } from "@/types";

const PRIORITY_STYLE = {
  high:   { bar: "#ff6b8a", badge: "bg-red/10 text-[#ff6b8a]"   },
  medium: { bar: "#ffb300", badge: "bg-amber/10 text-amber"      },
  low:    { bar: "#00e676", badge: "bg-green/10 text-green"      },
};

interface Props {
  suggestion: Suggestion;
  index:      number;
}

export default function SuggestionCard({ suggestion: s, index }: Props) {
  const { bar, badge } = PRIORITY_STYLE[s.priority];

  return (
    <div
      className="flex gap-4 items-start bg-bg3 border border-border rounded-xl p-5 transition-transform duration-200 hover:translate-x-1"
      style={{ borderLeftColor: bar, borderLeftWidth: "3px" }}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-[10px] flex items-center justify-center text-lg flex-shrink-0 border"
        style={{ background: `${bar}18`, borderColor: `${bar}33` }}
      >
        {s.icon}
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span className="text-[14px] font-bold text-white/90">{s.title}</span>
          <span className={`font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-md font-bold ${badge}`}>
            {s.priority}
          </span>
        </div>
        <p className="text-[13px] text-muted leading-relaxed mb-2">{s.desc}</p>
        <p className="text-[12px] font-mono text-cyan flex gap-1.5 items-start leading-relaxed">
          <span className="flex-shrink-0 mt-px">→</span>
          {s.action}
        </p>
      </div>
    </div>
  );
}
