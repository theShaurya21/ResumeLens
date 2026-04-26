// src/app/dashboard/page.tsx
import Link   from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const TIPS = [
  {
    icon: "🎯",
    title: "Mirror JD Language",
    desc:  "Copy exact phrases from the JD into your resume. ATS systems match exact strings — not synonyms. 'Machine Learning' ≠ 'ML' to most parsers.",
    color: "#00e5ff",
  },
  {
    icon: "📊",
    title: "Quantify Everything",
    desc:  '"Built a model" → "Built a Random Forest model achieving 87% accuracy on 50k samples, reducing false positives by 22%". Numbers are parsed and remembered.',
    color: "#00e676",
  },
  {
    icon: "💻",
    title: "GitHub Is Your Portfolio",
    desc:  "Pin 3 strong projects with clean READMEs. Recruiters spend 30 seconds on GitHub. Make it obvious what you built and how.",
    color: "#a855f7",
  },
  {
    icon: "📝",
    title: "ATS-Safe Formatting",
    desc:  "Use a single-column layout. Avoid tables, text boxes, columns, and headers/footers in .docx files — ATS parsers linearise all content and columns break badly.",
    color: "#ffb300",
  },
  {
    icon: "🛤",
    title: "Skills Section First",
    desc:  "Place a Technical Skills section in the top third of the page. ATS and human reviewers both look here first. Group by category: Languages · Frameworks · Tools.",
    color: "#ff6b8a",
  },
  {
    icon: "🏅",
    title: "Certifications Matter for Freshers",
    desc:  "Free certs from Coursera (Andrew Ng's ML), NPTEL, HuggingFace NLP Course, or freeCodeCamp directly compensate for lack of work experience.",
    color: "#00bcd4",
  },
];

const SCORE_GUIDE = [
  { range: "75–97%", label: "Excellent Match",  desc: "Apply immediately. Tailor cover letter. Highlight top 3 matching skills.", color: "#00e676" },
  { range: "55–74%", label: "Good Match",        desc: "Apply with targeted edits. Address 2–3 missing skills in the cover letter.", color: "#00e5ff" },
  { range: "35–54%", label: "Moderate Match",    desc: "Rewrite project descriptions using JD keywords. Learn 2 critical missing skills.", color: "#ffb300" },
  { range: "05–34%", label: "Low Match",         desc: "Major resume overhaul needed. Complete the learning path before applying.", color: "#ff1744" },
];

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 min-h-screen grid-bg">
        <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">

          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan border border-cyan/20 rounded-full px-4 py-1.5 mb-5 bg-cyan/4">
              📈 Career Dashboard
            </div>
            <h1 className="text-[clamp(28px,5vw,48px)] font-bold tracking-tight leading-tight mb-3">
              Tips to <span className="gradient-text">Maximise Your Score</span>
            </h1>
            <p className="text-[15px] text-muted max-w-md mx-auto leading-relaxed">
              Practical, actionable advice to improve your resume match score.
            </p>
          </div>

          {/* Score guide */}
          <div className="bg-card border border-border rounded-[18px] p-7 mb-8 card-glow">
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-cyan mb-5">
              Score Interpretation Guide
            </h2>
            <div className="flex flex-col gap-3">
              {SCORE_GUIDE.map(({ range, label, desc, color }) => (
                <div
                  key={range}
                  className="flex gap-4 items-start bg-bg3 border border-border rounded-xl p-4"
                  style={{ borderLeft: `3px solid ${color}` }}
                >
                  <div>
                    <span
                      className="font-mono text-[13px] font-bold"
                      style={{ color }}
                    >
                      {range}
                    </span>
                    <span className="font-mono text-[11px] text-muted ml-3">{label}</span>
                  </div>
                  <p className="text-[12.5px] text-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {TIPS.map(({ icon, title, desc, color }) => (
              <div
                key={title}
                className="bg-card border border-border rounded-xl p-5 card-glow"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[18px] mb-3 border"
                  style={{ background: `${color}12`, borderColor: `${color}25` }}
                >
                  {icon}
                </div>
                <h3 className="font-bold text-[14px] mb-2" style={{ color }}>{title}</h3>
                <p className="text-[12.5px] text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple2 via-blue-600 to-cyan2 bg-[length:300%_300%] animate-gradient rounded-[14px] px-10 py-4 text-white font-bold text-[15px] shadow-[0_0_40px_rgba(0,229,255,0.2)] hover:-translate-y-0.5 transition-transform duration-200"
            >
              ← Analyze My Resume Now
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
