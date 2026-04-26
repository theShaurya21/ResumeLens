// src/lib/nlp/taxonomy.ts
// Skill taxonomy: 8 categories × ~18 skills = 130+ total

import type { SkillItem, Importance } from "@/types";

interface TaxonomyEntry {
  color:  string;
  skills: Array<{ n: string; i: Importance }>;
}

export const TAXONOMY: Record<string, TaxonomyEntry> = {
  "Programming Languages": {
    color: "#00e5ff",
    skills: [
      { n: "python",     i: "critical"     },
      { n: "javascript", i: "critical"     },
      { n: "typescript", i: "important"    },
      { n: "java",       i: "important"    },
      { n: "c++",        i: "important"    },
      { n: "c#",         i: "nice-to-have" },
      { n: "r",          i: "important"    },
      { n: "go",         i: "nice-to-have" },
      { n: "golang",     i: "nice-to-have" },
      { n: "ruby",       i: "nice-to-have" },
      { n: "php",        i: "nice-to-have" },
      { n: "swift",      i: "nice-to-have" },
      { n: "kotlin",     i: "nice-to-have" },
      { n: "scala",      i: "nice-to-have" },
      { n: "rust",       i: "nice-to-have" },
      { n: "matlab",     i: "nice-to-have" },
      { n: "bash",       i: "nice-to-have" },
      { n: "dart",       i: "nice-to-have" },
    ],
  },

  "ML / AI Frameworks": {
    color: "#a855f7",
    skills: [
      { n: "tensorflow",     i: "critical"     },
      { n: "pytorch",        i: "critical"     },
      { n: "scikit-learn",   i: "critical"     },
      { n: "keras",          i: "important"    },
      { n: "xgboost",        i: "important"    },
      { n: "lightgbm",       i: "important"    },
      { n: "catboost",       i: "important"    },
      { n: "hugging face",   i: "important"    },
      { n: "transformers",   i: "important"    },
      { n: "langchain",      i: "nice-to-have" },
      { n: "fastai",         i: "nice-to-have" },
      { n: "opencv",         i: "important"    },
      { n: "yolo",           i: "nice-to-have" },
      { n: "spacy",          i: "important"    },
      { n: "nltk",           i: "important"    },
      { n: "onnx",           i: "nice-to-have" },
      { n: "mlflow",         i: "important"    },
      { n: "ray",            i: "nice-to-have" },
    ],
  },

  "Data & Analytics": {
    color: "#00e676",
    skills: [
      { n: "pandas",        i: "critical"     },
      { n: "numpy",         i: "critical"     },
      { n: "matplotlib",    i: "important"    },
      { n: "seaborn",       i: "important"    },
      { n: "jupyter",       i: "important"    },
      { n: "scipy",         i: "important"    },
      { n: "plotly",        i: "important"    },
      { n: "tableau",       i: "important"    },
      { n: "power bi",      i: "nice-to-have" },
      { n: "excel",         i: "nice-to-have" },
      { n: "pyspark",       i: "important"    },
      { n: "apache spark",  i: "important"    },
      { n: "airflow",       i: "nice-to-have" },
      { n: "kafka",         i: "nice-to-have" },
      { n: "dbt",           i: "nice-to-have" },
      { n: "streamlit",     i: "nice-to-have" },
      { n: "dvc",           i: "nice-to-have" },
    ],
  },

  "Web & Frontend": {
    color: "#ffb300",
    skills: [
      { n: "react",       i: "critical"     },
      { n: "react.js",    i: "critical"     },
      { n: "angular",     i: "important"    },
      { n: "vue",         i: "important"    },
      { n: "next.js",     i: "important"    },
      { n: "nextjs",      i: "important"    },
      { n: "nuxt",        i: "nice-to-have" },
      { n: "svelte",      i: "nice-to-have" },
      { n: "redux",       i: "important"    },
      { n: "tailwind",    i: "important"    },
      { n: "tailwindcss", i: "important"    },
      { n: "bootstrap",   i: "important"    },
      { n: "sass",        i: "nice-to-have" },
      { n: "webpack",     i: "nice-to-have" },
      { n: "vite",        i: "nice-to-have" },
    ],
  },

  "Backend & APIs": {
    color: "#ff6b8a",
    skills: [
      { n: "node.js",       i: "important"    },
      { n: "nodejs",        i: "important"    },
      { n: "express",       i: "important"    },
      { n: "fastapi",       i: "important"    },
      { n: "flask",         i: "important"    },
      { n: "django",        i: "important"    },
      { n: "spring",        i: "nice-to-have" },
      { n: "rails",         i: "nice-to-have" },
      { n: "rest api",      i: "critical"     },
      { n: "graphql",       i: "important"    },
      { n: "microservices", i: "important"    },
      { n: "socket.io",     i: "nice-to-have" },
    ],
  },

  "Databases": {
    color: "#00bcd4",
    skills: [
      { n: "sql",        i: "critical"     },
      { n: "mysql",      i: "important"    },
      { n: "postgresql", i: "important"    },
      { n: "mongodb",    i: "important"    },
      { n: "redis",      i: "important"    },
      { n: "sqlite",     i: "nice-to-have" },
      { n: "cassandra",  i: "nice-to-have" },
      { n: "oracle",     i: "nice-to-have" },
      { n: "firebase",   i: "important"    },
      { n: "dynamodb",   i: "nice-to-have" },
      { n: "neo4j",      i: "nice-to-have" },
      { n: "supabase",   i: "nice-to-have" },
    ],
  },

  "Cloud & DevOps": {
    color: "#7c4dff",
    skills: [
      { n: "aws",            i: "important"    },
      { n: "gcp",            i: "important"    },
      { n: "azure",          i: "important"    },
      { n: "docker",         i: "critical"     },
      { n: "kubernetes",     i: "important"    },
      { n: "git",            i: "critical"     },
      { n: "github",         i: "important"    },
      { n: "ci/cd",          i: "important"    },
      { n: "jenkins",        i: "nice-to-have" },
      { n: "terraform",      i: "nice-to-have" },
      { n: "linux",          i: "important"    },
      { n: "netlify",        i: "nice-to-have" },
      { n: "vercel",         i: "nice-to-have" },
      { n: "github actions", i: "important"    },
    ],
  },

  "Core Concepts": {
    color: "#e040fb",
    skills: [
      { n: "machine learning",            i: "critical"     },
      { n: "deep learning",               i: "critical"     },
      { n: "nlp",                         i: "critical"     },
      { n: "natural language processing", i: "critical"     },
      { n: "computer vision",             i: "important"    },
      { n: "data analysis",               i: "important"    },
      { n: "statistics",                  i: "important"    },
      { n: "linear algebra",              i: "important"    },
      { n: "feature engineering",         i: "important"    },
      { n: "agile",                       i: "nice-to-have" },
      { n: "scrum",                       i: "nice-to-have" },
      { n: "system design",               i: "important"    },
      { n: "object detection",            i: "important"    },
      { n: "a/b testing",                 i: "important"    },
      { n: "time series",                 i: "important"    },
    ],
  },
};

/** Flat list of all skills */
export const ALL_SKILLS: SkillItem[] = Object.entries(TAXONOMY).flatMap(
  ([cat, { color, skills }]) =>
    skills.map((s) => ({ ...s, cat, color }))
);
