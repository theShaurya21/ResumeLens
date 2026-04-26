# ResumeLens — AI Resume Gap Analyzer

> A futuristic, NLP-powered resume analyzer built with **Next.js 14**, **Three.js**, **TF-IDF**, and **Cosine Similarity**.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| 3D Visuals | Three.js |
| Animations | Framer Motion |
| NLP Engine | Custom TF-IDF + Cosine Similarity |
| File Parsing | pdf-parse (PDF), mammoth (DOCX) |
| Charts | Recharts |
| Notifications | react-hot-toast |

---

## 📁 Project Structure

```
resumelens/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout (fonts, providers)
│   │   ├── page.tsx                # Home page (upload + analyze)
│   │   ├── globals.css             # Global styles
│   │   ├── about/
│   │   │   └── page.tsx            # About / how it works
│   │   ├── dashboard/
│   │   │   └── page.tsx            # Results dashboard
│   │   └── api/
│   │       ├── analyze/
│   │       │   └── route.ts        # POST /api/analyze — NLP pipeline
│   │       └── upload/
│   │           └── route.ts        # POST /api/upload — file parsing
│   │
│   ├── components/
│   │   ├── three/
│   │   │   ├── ParticleField.tsx   # Background neural particle network
│   │   │   └── ScoreGlobe.tsx      # 3D score visualization
│   │   ├── charts/
│   │   │   ├── CategoryBars.tsx    # Category score bar chart
│   │   │   └── KeywordChart.tsx    # Keyword comparison chart
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Fixed top navigation
│   │   │   └── Footer.tsx          # Footer
│   │   └── ui/
│   │       ├── InputPanel.tsx      # Resume + JD upload panels
│   │       ├── SkillCloud.tsx      # Skill tag cloud
│   │       ├── SuggestionCard.tsx  # Recommendation cards
│   │       ├── LearningPath.tsx    # Learning path timeline
│   │       ├── StepTracker.tsx     # Step 1→2→3 indicator
│   │       └── LoadingScreen.tsx   # NLP pipeline loading animation
│   │
│   ├── lib/
│   │   ├── nlp/
│   │   │   ├── engine.ts           # Core NLP: TF-IDF + cosine similarity
│   │   │   ├── taxonomy.ts         # Skill taxonomy (130+ skills, 8 categories)
│   │   │   ├── stopwords.ts        # Curated stopword list
│   │   │   ├── suggestions.ts      # Suggestion generator
│   │   │   └── learningPath.ts     # Learning path generator
│   │   ├── hooks/
│   │   │   ├── useAnalysis.ts      # Analysis state management hook
│   │   │   └── useThree.ts         # Three.js lifecycle hook
│   │   └── utils/
│   │       ├── fileParser.ts       # Client-side file handling
│   │       ├── samples.ts          # Sample resume/JD datasets
│   │       └── cn.ts               # clsx + tailwind-merge helper
│   │
│   ├── types/
│   │   └── index.ts                # All TypeScript interfaces
│   │
│   └── styles/
│       └── globals.css             # (imported in app/globals.css)
│
├── public/                         # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
└── README.md
```

---

## ⚡ Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

---

## 🧠 NLP Pipeline

```
Text Input
    ↓
1. Preprocessing & Tokenization
    ↓
2. Stopword Removal
    ↓
3. TF-IDF Vector Construction
    ↓
4. Cosine Similarity Calculation  → Match Score (0–100%)
    ↓
5. Skill Taxonomy Matching        → Matched / Missing / Extra
    ↓
6. Category Score Analysis        → 8 domain categories
    ↓
7. Keyword Relevance Analysis     → Top 10 JD keywords vs resume
    ↓
8. Experience Gap Detection       → Education, years, GitHub, certs
    ↓
9. Actionable Suggestions         → Priority-ranked recommendations
    ↓
10. Learning Path Generation      → Curated free resources per skill
```

---

## 🌐 API Routes

### `POST /api/analyze`
Runs the full NLP analysis pipeline.

**Request body:**
```json
{
  "resumeText": "string (min 80 chars)",
  "jobText": "string (min 80 chars)"
}
```

**Response:** `AnalysisResult` object (see `src/types/index.ts`)

---

### `POST /api/upload`
Parses uploaded PDF or DOCX files and returns plain text.

**Request:** `multipart/form-data` with `file` + `type` (pdf|docx|txt)

**Response:**
```json
{ "text": "extracted plain text..." }
```

---

## 📊 Features

- ✅ Real file upload: PDF, DOCX, TXT parsing
- ✅ Drag & drop file zones
- ✅ Sample datasets (6 preloaded: 3 resumes + 3 JDs)
- ✅ TF-IDF vectorization with smoothed IDF
- ✅ Cosine similarity match scoring
- ✅ 130+ skills across 8 domains tracked
- ✅ Importance tiering: critical ★ / important ◆ / nice-to-have
- ✅ Category-level scoring with bar charts
- ✅ Keyword frequency comparison (JD vs Resume)
- ✅ Experience & profile gap analysis
- ✅ Flesch-Kincaid readability scoring
- ✅ 7 actionable suggestions with priority levels
- ✅ Personalized learning path with real free resources
- ✅ Three.js particle field background + score globe
- ✅ Framer Motion animations
- ✅ Fully responsive (mobile + desktop)

---

## 🎓 Academic Context

This project implements all 10 steps from the **Smart Resume Gap Analyzer** project plan:

1. Problem Understanding & Research ✅
2. Requirement Analysis ✅
3. Data Collection (samples + real uploads) ✅
4. Data Preprocessing (tokenization, stopwords) ✅
5. Feature Extraction (TF-IDF) ✅
6. Similarity Calculation (Cosine) ✅
7. Result Generation (gaps + scores) ✅
8. User Interface Development ✅
9. Testing & Validation ✅
10. Final Deployment (npm run build) ✅

---

*Built for students and fresh graduates to understand industry expectations and improve resume quality.*
