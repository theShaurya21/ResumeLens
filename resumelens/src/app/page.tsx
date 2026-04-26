"use client";
// src/app/page.tsx
import dynamic from "next/dynamic";
import { useAnalysis } from "@/lib/hooks/useAnalysis";
import Navbar        from "@/components/layout/Navbar";
import Footer        from "@/components/layout/Footer";
import StepTracker   from "@/components/ui/StepTracker";
import InputPanel    from "@/components/ui/InputPanel";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ResultsDashboard from "./ResultsDashboard";
import { Search } from "lucide-react";

// Three.js particle field — client-only, no SSR
const ParticleField = dynamic(
  () => import("@/components/three/ParticleField"),
  { ssr: false }
);

export default function HomePage() {
  const { state, setResume, setJob, analyze, reset } = useAnalysis();

  const step =
    state.result      ? 3
    : state.isAnalyzing ? 2
    : 1;

  return (
    <>
      <ParticleField count={150} />
      <Navbar />

      <main className="relative z-10 min-h-screen grid-bg">
        <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">

          {/* ── HERO ───────────────────────────────────────────────── */}
          {!state.result && !state.isAnalyzing && (
            <section className="text-center mb-14">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan border border-cyan/20 rounded-full px-4 py-1.5 mb-6 bg-cyan/4">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                AI-Powered Resume Intelligence
              </div>

              <h1 className="text-[clamp(32px,6vw,62px)] font-bold tracking-tight leading-[1.08] mb-4">
                Decode Your{" "}
                <span className="gradient-text block">Resume Gap</span>
              </h1>

              <p className="text-[16px] text-muted max-w-[500px] mx-auto leading-[1.7] mb-2">
                Upload your resume and any job description. Our TF-IDF engine
                calculates exactly where you stand — and what to do next.
              </p>
            </section>
          )}

          {/* ── STEP TRACKER ──────────────────────────────────────── */}
          <StepTracker current={step as 1 | 2 | 3} />

          {/* ── INPUT ─────────────────────────────────────────────── */}
          {!state.result && !state.isAnalyzing && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <InputPanel
                  label="Your Resume"
                  value={state.resumeText}
                  fileName={state.resumeFileName}
                  onChange={setResume}
                  placeholder={"Paste your full resume here…\n\nInclude: Skills · Education · Projects · Experience · Certifications"}
                  sampleGroup="resume"
                  accentColor="cyan"
                />
                <InputPanel
                  label="Job Description"
                  value={state.jobText}
                  fileName={state.jobFileName}
                  onChange={setJob}
                  placeholder={"Paste the job description here…\n\nInclude: Required skills · Responsibilities · Qualifications"}
                  sampleGroup="jd"
                  accentColor="purple"
                />
              </div>

              {/* Error bar */}
              {state.error && (
                <div className="bg-red/8 border border-red/25 rounded-xl px-5 py-3.5 text-[13px] font-mono text-[#ff6b8a] mb-5">
                  ⚠&nbsp;&nbsp;{state.error}
                </div>
              )}

              {/* Analyze button */}
              <div className="text-center mt-6">
                <button
                  onClick={analyze}
                  disabled={state.isAnalyzing}
                  className={[
                    "relative overflow-hidden inline-flex items-center gap-3",
                    "bg-gradient-to-r from-purple2 via-blue-600 to-cyan2",
                    "bg-[length:300%_300%] animate-gradient",
                    "border-none rounded-[14px] px-14 py-[18px]",
                    "text-white font-bold text-[16px] tracking-[-0.3px]",
                    "shadow-[0_0_40px_rgba(0,229,255,0.2),0_4px_24px_rgba(124,58,237,0.3)]",
                    "transition-all duration-200 cursor-pointer",
                    "hover:-translate-y-0.5 hover:shadow-[0_0_60px_rgba(0,229,255,0.35),0_8px_32px_rgba(124,58,237,0.4)]",
                    "active:translate-y-0",
                    "disabled:opacity-60 disabled:cursor-not-allowed",
                  ].join(" ")}
                >
                  <Search size={18} />
                  Run Deep Analysis
                </button>
              </div>
            </>
          )}

          {/* ── LOADING ───────────────────────────────────────────── */}
          {state.isAnalyzing && <LoadingScreen />}

          {/* ── RESULTS ───────────────────────────────────────────── */}
          {state.result && (
            <ResultsDashboard result={state.result} onReset={reset} />
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
