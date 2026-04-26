// src/lib/nlp/learningPath.ts

import type { SkillItem, LearningStep } from "@/types";

interface Resource {
  dur:      string;
  platform: string;
  url:      string;
  free:     boolean;
  type:     string;
}

const RESOURCES: Record<string, Resource> = {
  python:             { dur: "3 weeks",  platform: "Kaggle Learn Python",              url: "https://www.kaggle.com/learn/python",                                    free: true,  type: "Foundational" },
  tensorflow:         { dur: "4 weeks",  platform: "TensorFlow Official Tutorials",    url: "https://www.tensorflow.org/tutorials",                                   free: true,  type: "Framework"    },
  pytorch:            { dur: "4 weeks",  platform: "fast.ai Practical Deep Learning",  url: "https://course.fast.ai",                                                 free: true,  type: "Framework"    },
  "scikit-learn":     { dur: "3 weeks",  platform: "Scikit-learn User Guide",          url: "https://scikit-learn.org/stable/user_guide.html",                        free: true,  type: "Framework"    },
  sql:                { dur: "2 weeks",  platform: "SQLZoo Interactive Tutorial",       url: "https://sqlzoo.net",                                                     free: true,  type: "Database"     },
  react:              { dur: "4 weeks",  platform: "React.dev Official Tutorial",       url: "https://react.dev/learn",                                                free: true,  type: "Frontend"     },
  "react.js":         { dur: "4 weeks",  platform: "React.dev Official Tutorial",       url: "https://react.dev/learn",                                                free: true,  type: "Frontend"     },
  "next.js":          { dur: "2 weeks",  platform: "Next.js Learn Course",              url: "https://nextjs.org/learn",                                               free: true,  type: "Framework"    },
  nextjs:             { dur: "2 weeks",  platform: "Next.js Learn Course",              url: "https://nextjs.org/learn",                                               free: true,  type: "Framework"    },
  docker:             { dur: "2 weeks",  platform: "Docker Official Getting Started",   url: "https://docs.docker.com/get-started",                                    free: true,  type: "DevOps"       },
  kubernetes:         { dur: "3 weeks",  platform: "Kubernetes.io Tutorials",           url: "https://kubernetes.io/docs/tutorials",                                   free: true,  type: "DevOps"       },
  aws:                { dur: "4 weeks",  platform: "AWS Skill Builder (Free Tier)",     url: "https://explore.skillbuilder.aws",                                       free: true,  type: "Cloud"        },
  "machine learning": { dur: "8 weeks",  platform: "Andrew Ng — ML Coursera",           url: "https://www.coursera.org/learn/machine-learning",                        free: true,  type: "Core AI"      },
  "deep learning":    { dur: "6 weeks",  platform: "fast.ai + deeplearning.ai",         url: "https://course.fast.ai",                                                 free: true,  type: "Core AI"      },
  nlp:                { dur: "4 weeks",  platform: "HuggingFace NLP Course",            url: "https://huggingface.co/learn/nlp-course",                                free: true,  type: "Specialisation"},
  "natural language processing": { dur: "4 weeks", platform: "HuggingFace NLP Course", url: "https://huggingface.co/learn/nlp-course",                                free: true,  type: "Specialisation"},
  "computer vision":  { dur: "4 weeks",  platform: "CS231n Stanford (Free)",            url: "http://cs231n.stanford.edu",                                             free: true,  type: "Specialisation"},
  typescript:         { dur: "2 weeks",  platform: "Total TypeScript (Free Tier)",      url: "https://totaltypescript.com",                                            free: true,  type: "Language"     },
  mongodb:            { dur: "2 weeks",  platform: "MongoDB University (Free)",          url: "https://learn.mongodb.com",                                              free: true,  type: "Database"     },
  fastapi:            { dur: "1 week",   platform: "FastAPI Official Tutorial",          url: "https://fastapi.tiangolo.com/tutorial",                                  free: true,  type: "Backend"      },
  git:                { dur: "1 week",   platform: "Atlassian Git Tutorial",             url: "https://www.atlassian.com/git/tutorials",                                free: true,  type: "Tool"         },
  pandas:             { dur: "2 weeks",  platform: "Pandas 10-min Guide",               url: "https://pandas.pydata.org/docs/user_guide/10min.html",                   free: true,  type: "Data"         },
  numpy:              { dur: "1 week",   platform: "NumPy Official Tutorial",            url: "https://numpy.org/doc/stable/user/quickstart.html",                      free: true,  type: "Data"         },
  mlflow:             { dur: "1 week",   platform: "MLflow Official Docs",              url: "https://mlflow.org/docs/latest/index.html",                               free: true,  type: "MLOps"        },
  "hugging face":     { dur: "3 weeks",  platform: "HuggingFace Full Course",           url: "https://huggingface.co/learn",                                           free: true,  type: "Framework"    },
  transformers:       { dur: "3 weeks",  platform: "HuggingFace Transformers Docs",     url: "https://huggingface.co/docs/transformers",                                free: true,  type: "Framework"    },
  xgboost:            { dur: "1 week",   platform: "XGBoost Official Docs",             url: "https://xgboost.readthedocs.io/en/stable/tutorials/index.html",          free: true,  type: "Framework"    },
  postgresql:         { dur: "2 weeks",  platform: "PostgreSQL Tutorial",               url: "https://www.postgresqltutorial.com",                                      free: true,  type: "Database"     },
  flask:              { dur: "2 weeks",  platform: "Flask Mega-Tutorial (Miguel Grinberg)", url: "https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world", free: true, type: "Backend" },
  django:             { dur: "3 weeks",  platform: "Django Girls Tutorial",             url: "https://tutorial.djangogirls.org",                                        free: true,  type: "Backend"      },
};

function defaultResource(skill: SkillItem): Resource {
  return {
    dur:      "2–3 weeks",
    platform: "YouTube + freeCodeCamp",
    url:      `https://www.youtube.com/results?search_query=${encodeURIComponent(skill.n + " tutorial for beginners")}`,
    free:     true,
    type:     "General",
  };
}

export function buildLearningPath(missing: SkillItem[]): LearningStep[] {
  return missing.slice(0, 6).map((skill, i) => ({
    step:  i + 1,
    skill: skill.n,
    ...(RESOURCES[skill.n] ?? defaultResource(skill)),
  }));
}
