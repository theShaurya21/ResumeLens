// src/lib/utils/samples.ts
// 6 realistic sample datasets: 3 resumes + 3 job descriptions

export const SAMPLES: Record<string, string> = {
  // ── RESUMES ────────────────────────────────────────────────────────────────
  ds_resume: `Ananya Singh | ananya.s@email.com | GitHub: github.com/ananyasingh | LinkedIn: linkedin.com/in/ananya-singh

EDUCATION
Bachelor of Technology (B.Tech) — Computer Science & Engineering
Delhi Technological University | 2020–2024 | CGPA: 8.4 / 10

TECHNICAL SKILLS
Languages: Python, R, SQL, JavaScript (basic)
ML / Data: Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn, Jupyter Notebook, Google Colab
Tools: Git, GitHub, VS Code, Tableau (basic), Excel
Databases: MySQL, SQLite
Concepts: Data Preprocessing, Feature Engineering, EDA, Statistical Analysis, Regression, Classification

PROJECTS
1. Customer Churn Prediction (Python, Scikit-learn, Pandas)
   - Built Random Forest & Logistic Regression models on 10,000+ telecom customer records
   - Achieved 87.3% accuracy; reduced false negatives by 22% with threshold tuning
   - Full pipeline: data cleaning → feature encoding → model training → evaluation → visualization

2. NLP Sentiment Analysis — Movie Reviews (Python, NLTK, TF-IDF)
   - Text preprocessing: tokenization, stopword removal, lemmatization
   - Compared Naive Bayes (79%) vs SVM (83%) on IMDb 50k dataset
   - Built Flask API serving predictions with confidence scores

3. Sales Forecasting Dashboard (Python, Statsmodels, Plotly)
   - ARIMA & SARIMA time-series models on 3-year retail sales data
   - Interactive Streamlit dashboard deployed locally

INTERNSHIP
Data Analyst Intern | ZenDesk Analytics, New Delhi | May–Aug 2023
- Cleaned and transformed 200k+ rows of clickstream data using Pandas & SQL
- Built 4 automated KPI dashboards in Tableau, reducing manual reporting by 6 hrs/week
- Presented weekly insights to product team

CERTIFICATIONS
- Machine Learning Specialization — Andrew Ng, Coursera (2023)
- Data Analysis with Python — IBM on Coursera (2022)
- SQL for Data Science — UC Davis, Coursera (2022)`,

  web_resume: `Karan Mehta | karan.mehta@email.com | Portfolio: karanm.dev | GitHub: github.com/karanmehta

EDUCATION
B.Tech Information Technology | NSIT Delhi | 2020–2024 | CGPA: 7.9

TECHNICAL SKILLS
Frontend: HTML5, CSS3, JavaScript (ES6+), React.js, Redux, Tailwind CSS, Bootstrap
Backend: Node.js, Express.js, REST APIs, JWT Authentication
Database: MongoDB, MySQL, Firebase
Dev Tools: Git, GitHub, VS Code, Postman, Figma (basic), Webpack
Deployment: Netlify, Vercel, Render

PROJECTS
1. FullStack E-Commerce Platform (React + Node.js + MongoDB)
   - Complete e-commerce app with cart, Razorpay payment integration
   - JWT + bcrypt authentication; role-based access (admin / user)
   - Deployed: frontend on Vercel, backend on Render; 47 GitHub stars

2. Real-Time Chat Application (React + Socket.io + MongoDB)
   - Group & private messaging, online status, message history
   - Responsive design; tested by 200+ users during demo event

3. Developer Portfolio + Blog
   - Custom CMS using Next.js with markdown parsing
   - Google Lighthouse: Performance 96, Accessibility 100
   - SEO optimised; deployed on Vercel

CERTIFICATIONS
- The Complete Web Developer Bootcamp — Udemy (2022)
- JavaScript Algorithms & Data Structures — freeCodeCamp (2022)`,

  ml_resume: `Rahul Verma | rahul.verma@email.com | GitHub: github.com/rverma-ml

EDUCATION
M.Tech Artificial Intelligence | IIT Delhi | 2022–2024 | CGPA: 8.7
B.Tech Computer Science | NIT Trichy | 2018–2022 | CGPA: 8.1

SKILLS
Languages: Python, C++, Bash
Deep Learning: PyTorch, TensorFlow, Keras, Hugging Face Transformers, ONNX
ML: Scikit-learn, XGBoost, CatBoost, Optuna, MLflow
NLP: BERT, GPT-2 fine-tuning, SpaCy, NLTK, Sentence Transformers
Computer Vision: OpenCV, YOLOv8, Detectron2, Albumentations
Data: Pandas, NumPy, PySpark, DVC
Deployment: FastAPI, Docker, AWS SageMaker, GCP Vertex AI, GitHub Actions
Experiment Tracking: MLflow, Weights & Biases

RESEARCH / PROJECTS
1. Medical Image Segmentation (PyTorch, U-Net, attention mechanisms)
   - Segmented 12 organ classes on CT scans; Dice score 0.91
   - Published at ICCV Workshop 2023

2. LLM Fine-tuning with LoRA (Hugging Face, PEFT)
   - Fine-tuned LLaMA-2-7B on domain-specific medical QA dataset
   - 4-bit quantization for memory efficiency; served via FastAPI + Docker on AWS

3. Real-Time Object Detection Pipeline (YOLOv8 + custom tracking)
   - 42 FPS on edge hardware with full CI/CD via GitHub Actions + Docker`,

  // ── JOB DESCRIPTIONS ──────────────────────────────────────────────────────
  ml_jd: `Senior Machine Learning Engineer — AI Products
TechVision AI | Bangalore (Hybrid)

We are building next-generation AI products and need a skilled ML Engineer.

REQUIRED:
- 2+ years machine learning / deep learning hands-on experience
- Python (mandatory); C++ or Go is a plus
- Strong PyTorch or TensorFlow experience
- NLP — transformers, BERT, GPT architectures, fine-tuning
- Computer vision: CNN, object detection, image segmentation
- Model deployment: FastAPI, Docker, Kubernetes
- Cloud: AWS SageMaker or GCP Vertex AI
- MLOps: MLflow, DVC, CI/CD for ML pipelines
- Git, GitHub, version control
- Mathematics: linear algebra, probability, optimisation

GOOD TO HAVE:
- LLM fine-tuning: LoRA, PEFT, quantisation
- Distributed training: DeepSpeed, Ray
- Hugging Face ecosystem
- Weights & Biases experiment tracking
- Data engineering: PySpark, Apache Kafka

RESPONSIBILITIES:
- Design and train deep learning models for production
- Build robust ML pipelines with versioning and monitoring
- Collaborate with product and data engineering teams
- Write clean, tested Python code; participate in code reviews
- Optimise models for latency and throughput

PACKAGE: ₹18–28 LPA + ESOPs`,

  fe_jd: `Frontend Developer (React) — Mid Level
StartupXYZ | Remote / Hyderabad

MUST HAVE:
- Strong React.js (hooks, functional components, custom hooks)
- TypeScript proficiency
- State management: Redux Toolkit or Zustand
- CSS-in-JS or Tailwind CSS
- REST API & GraphQL integration
- Testing: Jest + React Testing Library
- Git, GitHub, pull request workflow

GOOD TO HAVE:
- Next.js (SSR, SSG, App Router)
- Node.js / Express for BFF layer
- AWS S3, CloudFront
- CI/CD with GitHub Actions
- Figma to code workflow
- Performance profiling: Lighthouse, Web Vitals
- Accessibility (WCAG 2.1)

TECH STACK: React 18, TypeScript, Next.js 14, Tailwind CSS, React Query, Zustand, PostgreSQL

RESPONSIBILITIES:
- Build pixel-perfect, accessible React components
- Collaborate with designers on Figma handoffs
- Write unit and integration tests
- Participate in architecture discussions

PACKAGE: ₹12–18 LPA`,

  ds_jd: `Data Scientist — Analytics & Insights
DataCo | Mumbai / Remote

REQUIRED:
- Python (Pandas, NumPy, Scikit-learn) — mandatory
- SQL — complex queries, window functions, CTEs
- Machine learning: regression, classification, clustering, ensemble methods
- Statistical analysis: hypothesis testing, A/B testing, confidence intervals
- Data visualisation: Matplotlib, Seaborn, Plotly or Tableau
- Feature engineering, model evaluation, cross-validation
- Jupyter Notebook / Google Colab
- Git version control

GOOD TO HAVE:
- Deep learning: TensorFlow or PyTorch
- NLP: text classification, sentiment analysis, TF-IDF, embeddings
- Big data: Spark, Hive, or Redshift
- Deployment: MLflow, Streamlit, or Flask APIs
- Cloud: AWS or GCP basics

RESPONSIBILITIES:
- Explore and analyse large datasets (EDA)
- Build predictive models for business KPIs
- Create interactive dashboards for stakeholders
- Run A/B tests and measure experiment impact
- Collaborate with product, engineering, and business teams

PACKAGE: ₹8–15 LPA`,
};

export const SAMPLE_LABELS: Record<string, { label: string; group: "resume" | "jd" }> = {
  ds_resume:  { label: "Data Science",  group: "resume" },
  web_resume: { label: "Web Dev",       group: "resume" },
  ml_resume:  { label: "ML Engineer",   group: "resume" },
  ml_jd:      { label: "ML Engineer",   group: "jd"     },
  fe_jd:      { label: "Frontend Dev",  group: "jd"     },
  ds_jd:      { label: "Data Scientist",group: "jd"     },
};
