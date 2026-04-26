// src/lib/nlp/engine.ts
// ─────────────────────────────────────────────────────────────────────────────
// Core NLP Pipeline
//   Step 1  Tokenisation & Stopword Removal
//   Step 2  TF-IDF Feature Extraction
//   Step 3  Cosine Similarity → Match Score
//   Step 4  Skill Taxonomy Matching
//   Step 5  Category Score Analysis
//   Step 6  Keyword Frequency Comparison
//   Step 7  Experience / Profile Gap Detection
//   Step 8  Readability Score (Flesch-Kincaid)
//   Step 9  Suggestion Generation
//   Step 10 Learning Path Construction
// ─────────────────────────────────────────────────────────────────────────────

import { STOPWORDS }   from "./stopwords";
import { ALL_SKILLS, TAXONOMY }  from "./taxonomy";
import { buildSuggestions }       from "./suggestions";
import { buildLearningPath }      from "./learningPath";
import type {
  AnalysisResult, SkillItem, CategoryScore, KeywordScore, ExperienceGap,
} from "@/types";

// ── 1. TOKENISATION ──────────────────────────────────────────────────────────
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s.+#/\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

// ── 2. TF-IDF ────────────────────────────────────────────────────────────────
interface TFIDFModel {
  tf:    Record<string, number>[];
  idf:   Record<string, number>;
  vocab: string[];
}

export function buildTFIDF(documents: string[][]): TFIDFModel {
  // Term Frequency (normalised)
  const tf = documents.map((doc) => {
    const freq: Record<string, number> = {};
    doc.forEach((w) => { freq[w] = (freq[w] ?? 0) + 1; });
    const total = Math.max(doc.length, 1);
    Object.keys(freq).forEach((w) => { freq[w] /= total; });
    return freq;
  });

  // Smoothed Inverse Document Frequency
  const vocab = [...new Set(documents.flat())];
  const N = documents.length;
  const idf: Record<string, number> = {};
  vocab.forEach((w) => {
    const df = documents.filter((d) => d.includes(w)).length;
    idf[w] = Math.log((N + 1) / (df + 1)) + 1;
  });

  return { tf, idf, vocab };
}

export function getTFIDFVector(
  tf: Record<string, number>,
  idf: Record<string, number>,
  vocab: string[]
): number[] {
  return vocab.map((w) => (tf[w] ?? 0) * (idf[w] ?? 1));
}

// ── 3. COSINE SIMILARITY ─────────────────────────────────────────────────────
export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot  += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  if (!magA || !magB) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

// ── 4. SKILL EXTRACTION ──────────────────────────────────────────────────────
function escRe(s: string): string {
  return s.replace(/[.+#*?^${}()|[\]\\]/g, "\\$&");
}

export function skillInText(skill: string, text: string): boolean {
  return new RegExp(`\\b${escRe(skill)}\\b`, "i").test(text);
}

export function extractSkills(text: string): SkillItem[] {
  return ALL_SKILLS.filter((s) => skillInText(s.n, text));
}

// ── 5. CATEGORY SCORES ───────────────────────────────────────────────────────
export function computeCategoryScores(
  resumeText: string,
  jobText: string
): CategoryScore[] {
  return Object.entries(TAXONOMY)
    .map(([cat, { color, skills }]) => {
      const needed = skills.filter((s) => skillInText(s.n, jobText));
      if (!needed.length) return null;
      const found = needed.filter((s) => skillInText(s.n, resumeText));
      return {
        cat,
        color,
        score:  Math.round((found.length / needed.length) * 100),
        found:  found.length,
        needed: needed.length,
      } satisfies CategoryScore;
    })
    .filter(Boolean) as CategoryScore[];
}

// ── 6. KEYWORD SCORES ────────────────────────────────────────────────────────
export function computeKeywordScores(
  resumeTokens: string[],
  jobTokens: string[],
  idf: Record<string, number>
): KeywordScore[] {
  const jFreq: Record<string, number> = {};
  const rFreq: Record<string, number> = {};
  jobTokens.forEach((w)    => { jFreq[w] = (jFreq[w] ?? 0) + 1; });
  resumeTokens.forEach((w) => { rFreq[w] = (rFreq[w] ?? 0) + 1; });

  return Object.entries(jFreq)
    .map(([word, jf]) => ({
      word,
      jFreq:   jf,
      rFreq:   rFreq[word] ?? 0,
      tfidf:   jf * (idf[word] ?? 1),
      present: (rFreq[word] ?? 0) > 0,
    }))
    .sort((a, b) => b.tfidf - a.tfidf)
    .slice(0, 10);
}

// ── 7. EXPERIENCE GAP ────────────────────────────────────────────────────────
export function analyzeExperienceGap(
  resumeText: string,
  jobText: string
): ExperienceGap {
  const yrMatch  = jobText.match(/(\d+)\+?\s*(?:to\s*\d+)?\s*years?/i);
  const yrsReq   = yrMatch ? parseInt(yrMatch[1]) : null;
  const hasDeg   = /b\.?tech|b\.?e\.?\b|bachelor|b\.?sc|m\.?tech|m\.?sc|master|mba|ph\.?d/i.test(resumeText);
  const fresher  = /fresher|entry.?level|0[\-–]1 year|fresh grad|junior/i.test(jobText);
  const hasGH    = /github|gitlab|bitbucket|portfolio/i.test(resumeText);
  const hasCert  = /certif|coursera|udemy|nptel|edx|linkedin learning/i.test(resumeText);
  const hasInternship = /intern|industrial training/i.test(resumeText);

  const notes: string[] = [];
  if (yrsReq && yrsReq >= 3)
    notes.push(`This role requires ${yrsReq}+ years of experience. Use internships, freelance, and open-source to close this gap.`);
  if (!hasDeg)
    notes.push("No educational qualification detected. Clearly state your degree in the resume header / education section.");
  if (!hasGH)
    notes.push("No GitHub or portfolio link found. Recruiters verify fresher skills via GitHub — add it to your header.");
  if (!hasCert)
    notes.push("No certifications detected. 1–2 free certs from Coursera, NPTEL, or LinkedIn Learning strengthen your profile.");
  if (!hasInternship)
    notes.push("No internship experience found. Apply for virtual internships or contribute to open-source projects.");

  return { yrsReq, hasDeg, fresher, hasGH, hasCert, hasInternship, notes };
}

// ── 8. READABILITY (Flesch-Kincaid) ──────────────────────────────────────────
export function computeReadability(text: string): number {
  const sentences = Math.max(text.split(/[.!?]+/).filter(Boolean).length, 1);
  const words     = Math.max(text.split(/\s+/).filter(Boolean).length, 1);
  const syllables = text
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .replace(/[aeiou]{2,}/g, "a")
    .replace(/[^aeiou]/g, "").length;

  const fk = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
  return Math.min(100, Math.max(0, Math.round(fk)));
}

// ── MASTER ORCHESTRATOR ──────────────────────────────────────────────────────
export function runAnalysis(
  resumeText: string,
  jobText: string
): AnalysisResult {
  const t0 = Date.now();

  // Step 1 — Tokenise
  const rTokens = tokenize(resumeText);
  const jTokens = tokenize(jobText);

  // Step 2 — TF-IDF
  const { tf, idf, vocab } = buildTFIDF([rTokens, jTokens]);

  // Step 3 — Cosine → Score
  const rVec  = getTFIDFVector(tf[0], idf, vocab);
  const jVec  = getTFIDFVector(tf[1], idf, vocab);
  const raw   = cosineSimilarity(rVec, jVec);
  const score = Math.min(97, Math.max(5, Math.round(raw * 230)));

  // Step 4 — Skills
  const rSkills = extractSkills(resumeText);
  const jSkills = extractSkills(jobText);
  const matched = jSkills.filter((j) => rSkills.some((r) => r.n === j.n));
  const missing = jSkills.filter((j) => !rSkills.some((r) => r.n === j.n));
  const extra   = rSkills.filter((r) => !jSkills.some((j) => j.n === r.n));

  // Step 5 — Categories
  const categories = computeCategoryScores(resumeText, jobText);

  // Step 6 — Keywords
  const keywords = computeKeywordScores(rTokens, jTokens, idf);

  // Step 7 — Experience Gap
  const expGap = analyzeExperienceGap(resumeText, jobText);

  // Step 8 — Readability
  const readability = computeReadability(resumeText);

  // Tier
  const tier =
    score >= 75 ? "excellent" :
    score >= 55 ? "good"      :
    score >= 35 ? "moderate"  : "low";

  const tierLabel = {
    excellent: "Excellent Match",
    good:      "Good Match",
    moderate:  "Moderate Match",
    low:       "Low Match",
  }[tier];

  // Step 9 — Suggestions
  const suggestions = buildSuggestions(score, missing, resumeText, jobText);

  // Step 10 — Learning Path
  const learningPath = buildLearningPath(missing);

  return {
    score, tier, tierLabel,
    matched, missing, extra,
    categories, keywords, expGap,
    readability,
    wordCount: { r: rTokens.length, j: jTokens.length },
    suggestions, learningPath,
    processingMs: Date.now() - t0,
  };
}
