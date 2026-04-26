// src/app/about/page.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const PIPELINE = [
  { step: "01", title: "Tokenisation & Stopword Removal",  desc: "Raw text is lowercased, punctuation stripped, and split into tokens. A curated list of 200+ English + HR/JD-specific stopwords is removed so only meaningful content words remain.", color: "#00e5ff" },
  { step: "02", title: "TF-IDF Feature Extraction",         desc: "Term Frequency × Inverse Document Frequency is computed for each token across both documents. Rare, domain-specific terms receive higher weights than common words.", color: "#a855f7" },
  { step: "03", title: "Cosine Similarity → Match Score",   desc: "Both TF-IDF vectors are compared using cosine similarity — the angle between them in high-dimensional space. A score of 100% means identical vocabulary; 0% means no overlap.", color: "#00e676" },
  { step: "04", title: "Skill Taxonomy Matching",           desc: "130+ curated skills across 8 domains are checked against both texts using regex boundary matching. Skills are tagged with importance tiers: critical ★, important ◆, or nice-to-have.", color: "#ffb300" },
  { step: "05", title: "Category Score Analysis",           desc: "Each of the 8 skill domains (Programming, ML/AI, Data, Web, Backend, Databases, Cloud/DevOps, Core Concepts) is scored independently based on how many required skills are present.", color: "#ff6b8a" },
  { step: "06", title: "Keyword Frequency Comparison",      desc: "The top 10 highest-TF-IDF keywords from the JD are extracted and their frequency in both documents compared, revealing which important terms are missing from the resume.", color: "#00bcd4" },
  { step: "07", title: "Experience & Profile Gap",          desc: "Regex patterns detect years of experience required, education level, GitHub/portfolio presence, certifications, and internship history — producing targeted profile recommendations.", color: "#7c4dff" },
  { step: "08", title: "Readability Score",                 desc: "The resume text is scored using a Flesch-Kincaid approximation that penalises overly long sentences and multi-syllable words. ATS systems prefer clear, concise writing.", color: "#e040fb" },
  { step: "09", title: "Actionable Suggestions",            desc: "A priority-ranked list of up to 7 recommendations is generated based on score tier, missing critical skills, profile gaps, and common recruiter checklist items.", color: "#ff9800" },
  { step: "10", title: "Learning Path Construction",        desc: "For each missing skill a curated free learning resource is mapped from a hand-built database of 30+ platforms, complete with estimated duration and direct URL.", color: "#4caf50" },
];

const TECH = [
  { name: "Next.js 14",      desc: "App Router, Server Components, API Routes", color: "#00e5ff" },
  { name: "TypeScript",      desc: "Full type safety across all layers",          color: "#3178c6" },
  { name: "Three.js",        desc: "WebGL particle field + animated score globe", color: "#a855f7" },
  { name: "TF-IDF (custom)", desc: "Hand-built vectoriser with smoothed IDF",     color: "#00e676" },
  { name: "Cosine Similarity", desc: "Vector angle similarity in token space",    color: "#ffb300" },
  { name: "Tailwind CSS",    desc: "Utility-first dark futuristic design system", color: "#06b6d4" },
  { name: "Framer Motion",   desc: "Declarative animation system",                color: "#ff6b8a" },
  { name: "pdf-parse",       desc: "Server-side PDF text extraction",             color: "#7c4dff" },
  { name: "mammoth",         desc: "DOCX → plain text conversion",                color: "#e040fb" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 min-h-screen grid-bg">
        <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">

          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan border border-cyan/20 rounded-full px-4 py-1.5 mb-5 bg-cyan/4">
              📐 Technical Architecture
            </div>
            <h1 className="text-[clamp(28px,5vw,52px)] font-bold tracking-tight leading-tight mb-4">
              How <span className="gradient-text">ResumeLens</span> Works
            </h1>
            <p className="text-[15px] text-muted max-w-lg mx-auto leading-relaxed">
              A 10-step NLP pipeline that transforms raw text into actionable career intelligence.
            </p>
          </div>

          {/* Pipeline */}
          <div className="mb-16">
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-muted mb-6">
              NLP Pipeline — 10 Steps
            </h2>
            <div className="flex flex-col gap-4">
              {PIPELINE.map(({ step, title, desc, color }) => (
                <div
                  key={step}
                  className="flex gap-5 bg-card border border-border rounded-xl p-5 card-glow relative overflow-hidden"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-mono text-[13px] font-bold flex-shrink-0"
                    style={{ background: `${color}18`, border: `1px solid ${color}33`, color }}
                  >
                    {step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[14px] mb-1.5" style={{ color }}>
                      {title}
                    </h3>
                    <p className="text-[13px] text-muted leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div>
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-muted mb-6">
              Tech Stack
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TECH.map(({ name, desc, color }) => (
                <div
                  key={name}
                  className="bg-card border border-border rounded-xl p-5 card-glow"
                >
                  <p className="font-mono font-bold text-[13px] mb-1.5" style={{ color }}>
                    {name}
                  </p>
                  <p className="text-[12px] text-muted">{desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
