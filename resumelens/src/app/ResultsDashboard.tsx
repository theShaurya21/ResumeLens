"use client";
// src/app/ResultsDashboard.tsx
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { AnalysisResult } from "@/types";
import SkillCloud     from "@/components/ui/SkillCloud";
import SuggestionCard from "@/components/ui/SuggestionCard";
import LearningPath   from "@/components/ui/LearningPath";
import CategoryBars   from "@/components/charts/CategoryBars";
import KeywordChart   from "@/components/charts/KeywordChart";
import { RefreshCw, CheckCircle2, XCircle, Star } from "lucide-react";

const ScoreGlobe = dynamic(
  () => import("@/components/three/ScoreGlobe"),
  { ssr: false }
);

const TIER_COLOR = {
  excellent: "#00e676",
  good:      "#00e5ff",
  moderate:  "#ffb300",
  low:       "#ff1744",
} as const;

const TIER_EMOJI = {
  excellent: "🏆",
  good:      "✅",
  moderate:  "⚠️",
  low:       "❌",
} as const;

const TIER_HEADLINE = {
  excellent: "Your profile is a strong fit for this role.",
  good:      "Your resume aligns well — a few tweaks will perfect it.",
  moderate:  "Moderate alignment detected — targeted tailoring needed.",
  low:       "Significant gaps found — strategic resume overhaul recommended.",
};

const TIER_DESC = {
  excellent: "The NLP engine found strong vocabulary overlap and skill alignment. Focus on polishing your ATS formatting and quantifying achievements.",
  good:      "Good keyword alignment and skill coverage. Address the missing skills and add measurable outcomes to maximise shortlisting chances.",
  moderate:  "Several critical skills and keywords are absent. Following the recommendations below will significantly improve your match score.",
  low:       "Very different vocabularies and skill sets detected. Use the learning path and suggestions below to strategically bridge this gap.",
};

interface Props {
  result:  AnalysisResult;
  onReset: () => void;
}

// Animated counter hook
function useCounter(target: number, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / (duration / 30));
    const id = setInterval(() => {
      start = Math.min(start + step, target);
      setVal(start);
      if (start >= target) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [target, duration]);
  return val;
}

// Section card wrapper
function Section({ title, icon, children, delay = 0 }: {
  title: string; icon: string; children: React.ReactNode; delay?: number;
}) {
  return (
    <div
      className="bg-card border border-border rounded-[18px] p-7 relative overflow-hidden card-glow animate-fade-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-6 h-6 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center text-[13px]">
          {icon}
        </div>
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-cyan">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

// Horizontal divider
function Divider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-border2 to-transparent my-6" />
  );
}

export default function ResultsDashboard({ result: R, onReset }: Props) {
  const c          = TIER_COLOR[R.tier];
  const scoreCount = useCounter(R.score);
  const rlFillRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      if (rlFillRef.current) rlFillRef.current.style.width = R.readability + "%";
    }, 500);
    return () => clearTimeout(t);
  }, [R.readability]);

  return (
    <div className="flex flex-col gap-5">

      {/* ── 1. SCORE HERO ──────────────────────────────────────────────── */}
      <div
        className="bg-card border border-border rounded-[22px] p-8 relative overflow-hidden card-glow animate-fade-up flex flex-col md:flex-row items-center gap-10"
        style={{ animationFillMode: "both" }}
      >
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 25% 50%, ${c}08, transparent 65%)`,
          }}
        />

        {/* Globe + score */}
        <div className="relative flex-shrink-0">
          <ScoreGlobe score={R.score} tier={R.tier} size={200} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-mono text-[46px] font-bold leading-none tracking-tight" style={{ color: c }}>
              {scoreCount}%
            </span>
            <span className="font-mono text-[12px] text-muted mt-1">Match Score</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          {/* Tier badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[13px] font-bold tracking-wide mb-4 border-[1.5px]"
            style={{ color: c, background: `${c}18`, borderColor: `${c}44` }}
          >
            {TIER_EMOJI[R.tier]} {R.tierLabel}
          </div>

          <h2 className="text-[26px] font-bold tracking-tight mb-2 leading-snug">
            {TIER_HEADLINE[R.tier]}
          </h2>
          <p className="text-[14px] text-muted leading-relaxed mb-5 max-w-md">
            {TIER_DESC[R.tier]}
          </p>

          {/* Meta pills */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {[
              { label: "Similarity Score", val: `${R.score}%`         },
              { label: "Resume Tokens",    val: R.wordCount.r          },
              { label: "JD Tokens",        val: R.wordCount.j          },
              { label: "Processing",       val: `${R.processingMs}ms`  },
            ].map(({ label, val }) => (
              <div
                key={label}
                className="font-mono text-[11px] bg-white/4 border border-border2 rounded-lg px-3 py-1.5 text-muted"
              >
                {label}:&nbsp;<span className="text-white font-bold">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. STATS ROW ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4 animate-fade-up stagger-1" style={{ animationFillMode: "both" }}>
        {[
          { label: "Skills Matched", val: R.matched.length, color: "#00e676", Icon: CheckCircle2 },
          { label: "Skills Missing", val: R.missing.length, color: "#ff6b8a", Icon: XCircle      },
          { label: "Bonus Skills",   val: R.extra.length,   color: "#ffb300", Icon: Star         },
        ].map(({ label, val, color, Icon }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-[16px] py-6 px-5 text-center relative overflow-hidden"
            style={{ borderBottom: `2px solid ${color}` }}
          >
            <div className="font-mono text-[38px] font-bold leading-none mb-1.5 animate-pop-in" style={{ color }}>
              {val}
            </div>
            <div className="flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted">
              <Icon size={11} style={{ color }} />
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* ── 3. SKILL BREAKDOWN ─────────────────────────────────────────── */}
      <Section title="Skill Breakdown" icon="🧠" delay={100}>
        <div className="flex flex-col gap-0">
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-green">
                Matched Skills
              </span>
              <div className="flex-1 h-px bg-border" />
              <span className="font-mono text-[10px] text-muted">{R.matched.length} skills</span>
            </div>
            <SkillCloud skills={R.matched} type="match" />
          </div>

          <Divider />

          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ff6b8a" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#ff6b8a]">
                Missing from Resume
              </span>
              <div className="flex-1 h-px bg-border" />
              <span className="font-mono text-[10px] text-muted">{R.missing.length} skills</span>
            </div>
            <SkillCloud skills={R.missing} type="miss" />
          </div>

          <Divider />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star size={13} color="#ffb300" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-amber">
                Bonus Skills in Resume
              </span>
              <div className="flex-1 h-px bg-border" />
              <span className="font-mono text-[10px] text-muted">{R.extra.length} skills</span>
            </div>
            <SkillCloud skills={R.extra} type="extra" />
          </div>
        </div>
      </Section>

      {/* ── 4. CATEGORY ANALYSIS ───────────────────────────────────────── */}
      <Section title="Category Analysis" icon="📊" delay={150}>
        <CategoryBars categories={R.categories} />
      </Section>

      {/* ── 5. KEYWORD RELEVANCE ───────────────────────────────────────── */}
      <Section title="Keyword Relevance — JD vs Resume" icon="🔑" delay={200}>
        <KeywordChart keywords={R.keywords} />
      </Section>

      {/* ── 6. EXPERIENCE & PROFILE GAP ────────────────────────────────── */}
      <Section title="Experience & Profile Gap" icon="📋" delay={250}>
        {/* Cells */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
          {[
            {
              label: "Exp Required",
              val:   R.expGap.yrsReq ? `${R.expGap.yrsReq}+ yrs` : "Fresher OK",
              color: R.expGap.yrsReq ? "#ffb300" : "#00e676",
            },
            {
              label: "Education",
              val:   R.expGap.hasDeg ? "✓ Detected" : "Not Found",
              color: R.expGap.hasDeg ? "#00e676" : "#ff6b8a",
            },
            {
              label: "GitHub / Portfolio",
              val:   R.expGap.hasGH ? "✓ Found" : "Missing",
              color: R.expGap.hasGH ? "#00e676" : "#ff6b8a",
            },
            {
              label: "Certifications",
              val:   R.expGap.hasCert ? "✓ Found" : "Missing",
              color: R.expGap.hasCert ? "#00e676" : "#ff6b8a",
            },
            {
              label: "Internship",
              val:   R.expGap.hasInternship ? "✓ Found" : "Not Found",
              color: R.expGap.hasInternship ? "#00e676" : "#ffb300",
            },
            {
              label: "JD Level",
              val:   R.expGap.fresher ? "Fresher OK" : "Experienced",
              color: R.expGap.fresher ? "#00e676" : "#ffb300",
            },
          ].map(({ label, val, color }) => (
            <div
              key={label}
              className="bg-bg3 border border-border rounded-xl px-4 py-4 text-center"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">{label}</p>
              <p className="font-mono text-[18px] font-bold" style={{ color }}>{val}</p>
            </div>
          ))}
        </div>

        {/* Notes */}
        {R.expGap.notes.length > 0 ? (
          <div className="flex flex-col gap-2.5">
            {R.expGap.notes.map((note, i) => (
              <div
                key={i}
                className="flex gap-2.5 items-start text-[12.5px] text-muted bg-bg3 border border-border rounded-xl px-4 py-3 leading-relaxed"
              >
                <span className="text-[12px] flex-shrink-0 mt-0.5">⚡</span>
                {note}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[13px] font-mono text-green bg-green/6 border border-green/20 rounded-xl px-4 py-3">
            ✅ No critical profile gaps detected. Resume structure looks solid.
          </p>
        )}

        {/* Readability */}
        <div className="flex items-center gap-4 mt-5 bg-bg3 border border-border rounded-xl px-5 py-4">
          <span className="font-mono text-[12px] text-muted whitespace-nowrap">
            Resume Readability
          </span>
          <div className="flex-1 h-2 bg-border2 rounded-full overflow-hidden">
            <div
              ref={rlFillRef}
              className="h-full rounded-full bar-fill"
              style={{
                width: "0%",
                background: "linear-gradient(90deg, #ff1744, #ffb300, #00e676)",
              }}
            />
          </div>
          <span
            className="font-mono text-[14px] font-bold whitespace-nowrap"
            style={{ color: R.readability >= 60 ? "#00e676" : R.readability >= 40 ? "#ffb300" : "#ff6b8a" }}
          >
            {R.readability}/100
          </span>
        </div>
      </Section>

      {/* ── 7. SUGGESTIONS ─────────────────────────────────────────────── */}
      <Section title="Actionable Recommendations" icon="💡" delay={300}>
        <div className="flex flex-col gap-3">
          {R.suggestions.map((s, i) => (
            <SuggestionCard key={i} suggestion={s} index={i} />
          ))}
        </div>
      </Section>

      {/* ── 8. LEARNING PATH ───────────────────────────────────────────── */}
      <Section title="Personalised Learning Path" icon="🛤" delay={350}>
        <LearningPath steps={R.learningPath} />
      </Section>

      {/* ── RESET ──────────────────────────────────────────────────────── */}
      <div className="flex justify-center mt-2 mb-4">
        <button
          onClick={onReset}
          className="flex items-center gap-2.5 bg-transparent border-[1.5px] border-border2 rounded-xl px-7 py-3 text-muted font-semibold text-[14px] cursor-pointer hover:border-cyan hover:text-cyan transition-all duration-200"
        >
          <RefreshCw size={15} />
          Analyze Another Resume
        </button>
      </div>

    </div>
  );
}
