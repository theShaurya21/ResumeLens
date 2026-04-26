// src/types/index.ts

export interface SkillItem {
  n: string;          // skill name
  i: Importance;      // importance tier
  cat: string;        // category name
  color: string;      // category color
}

export type Importance = "critical" | "important" | "nice-to-have";
export type MatchTier  = "excellent" | "good" | "moderate" | "low";

export interface CategoryScore {
  cat:    string;
  color:  string;
  score:  number;   // 0–100
  found:  number;
  needed: number;
}

export interface KeywordScore {
  word:    string;
  jFreq:   number;  // frequency in job description
  rFreq:   number;  // frequency in resume
  tfidf:   number;  // TF-IDF weight
  present: boolean; // found in resume?
}

export interface ExperienceGap {
  yrsReq:       number | null;
  hasDeg:       boolean;
  fresher:      boolean;
  hasGH:        boolean;
  hasCert:      boolean;
  hasInternship:boolean;
  notes:        string[];
}

export interface Suggestion {
  icon:     string;
  title:    string;
  desc:     string;
  action:   string;
  priority: "high" | "medium" | "low";
}

export interface LearningStep {
  step:     number;
  skill:    string;
  type:     string;
  dur:      string;
  platform: string;
  url:      string;
  free:     boolean;
}

export interface AnalysisResult {
  score:        number;
  tier:         MatchTier;
  tierLabel:    string;
  matched:      SkillItem[];
  missing:      SkillItem[];
  extra:        SkillItem[];
  categories:   CategoryScore[];
  keywords:     KeywordScore[];
  expGap:       ExperienceGap;
  readability:  number;
  wordCount:    { r: number; j: number };
  suggestions:  Suggestion[];
  learningPath: LearningStep[];
  processingMs: number;
}

export interface UploadState {
  resumeText:     string;
  jobText:        string;
  resumeFileName: string;
  jobFileName:    string;
  isAnalyzing:    boolean;
  result:         AnalysisResult | null;
  error:          string | null;
}
