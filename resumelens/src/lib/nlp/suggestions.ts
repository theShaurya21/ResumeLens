// src/lib/nlp/suggestions.ts

import type { SkillItem, Suggestion } from "@/types";

export function buildSuggestions(
  score: number,
  missing: SkillItem[],
  resumeText: string,
  _jobText: string
): Suggestion[] {
  const out: Suggestion[] = [];

  // Critical skills missing
  const crit = missing.filter((s) => s.i === "critical");
  if (crit.length) {
    out.push({
      icon: "🎯",
      title: "Critical Skills Gap",
      priority: "high",
      desc: `Missing ${crit.map((s) => s.n).slice(0, 4).join(", ")}${crit.length > 4 ? ` +${crit.length - 4} more` : ""} — these are marked as essential in the JD.`,
      action: `Add these to your Skills section. If learning them, write "Currently learning: X" to signal initiative.`,
    });
  }

  // Score-based recommendation
  if (score < 35) {
    out.push({
      icon: "📝",
      title: "Low Keyword Match — Tailoring Needed",
      priority: "high",
      desc: `Match score is only ${score}%. Your resume vocabulary doesn't align with the JD language.`,
      action: `Rewrite project descriptions using exact phrases from the JD. Mirror their terminology — not synonyms — for ATS compatibility.`,
    });
  } else if (score < 60) {
    out.push({
      icon: "✍️",
      title: "Moderate Match — Targeted Edits Will Help",
      priority: "medium",
      desc: `${score}% is decent but beatable. Keyword alignment improvements can push this into the "Good Match" zone.`,
      action: `Add quantified results: "Improved accuracy by 15%" beats "Built a model". Mirror exact JD phrases in your project descriptions.`,
    });
  } else {
    out.push({
      icon: "⭐",
      title: "Strong Match — Optimise for ATS Visibility",
      priority: "low",
      desc: `${score}% is a strong match! Your vocabulary and skill set align well with this role.`,
      action: `Lead with a "Technical Skills" section at the top — ATS systems scan the first 30% of a resume most carefully.`,
    });
  }

  // Projects
  if (!/project|built|developed|created|implemented/i.test(resumeText)) {
    out.push({
      icon: "🔨",
      title: "No Projects Section Detected",
      priority: "high",
      desc: "Projects are the #1 differentiator for fresh graduates. None were clearly identified in your resume.",
      action: "Add 2–3 projects with: Name, Tech Stack, Problem Solved, Measurable Outcome, GitHub link.",
    });
  }

  // GitHub
  if (!/github|gitlab|bitbucket/i.test(resumeText)) {
    out.push({
      icon: "💻",
      title: "Missing GitHub Profile Link",
      priority: "medium",
      desc: "75% of tech recruiters check GitHub for fresher candidates to verify claimed skills.",
      action: "Create a clean GitHub profile. Pin your best 3 projects. Add the URL prominently in your resume header.",
    });
  }

  // Quantification
  if (!/\d+%|\d+x|\d+ hrs|accuracy|improv|reduc|increas|achiev/i.test(resumeText)) {
    out.push({
      icon: "📊",
      title: "No Quantified Achievements",
      priority: "medium",
      desc: "Your resume lacks measurable outcomes. Numbers make resume bullets 40% more compelling to recruiters.",
      action: 'Add metrics: "Achieved 87% accuracy", "Reduced load time by 40%", "Processed 50k+ records daily".',
    });
  }

  // ATS
  out.push({
    icon: "🤖",
    title: "ATS Keyword Optimisation",
    priority: "medium",
    desc: "Most companies use Applicant Tracking Systems that match exact keywords — not synonyms — to shortlist resumes.",
    action: "Use exact phrases from the JD. Avoid tables, columns, text boxes, and headers/footers in your .docx file.",
  });

  // Certifications
  if (!/certif|coursera|udemy|nptel|edx|linkedin learning/i.test(resumeText)) {
    out.push({
      icon: "📚",
      title: "No Certifications Found",
      priority: "medium",
      desc: "Certifications boost credibility especially for freshers without work experience.",
      action: `Earn a free cert in ${missing[0]?.n ?? "a relevant skill"} from Coursera or NPTEL. Even beginner-level certs show initiative.`,
    });
  }

  return out.slice(0, 7);
}
