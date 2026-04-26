// src/app/layout.tsx
import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ResumeLens — AI Resume Gap Analyzer",
  description:
    "Analyze your resume against any job description using TF-IDF, cosine similarity, and NLP. Identify skill gaps, get actionable feedback, and build a personalized learning path.",
  keywords: [
    "resume analyzer", "job description match", "skill gap", "NLP",
    "TF-IDF", "cosine similarity", "AI resume", "career", "fresher",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <body className="bg-bg font-sans antialiased">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0e1628",
              color: "#e8edf8",
              border: "1px solid #1e2f55",
              fontFamily: "var(--font-space-grotesk)",
              fontSize: "14px",
              borderRadius: "12px",
            },
            success: {
              iconTheme: { primary: "#00e676", secondary: "#0e1628" },
            },
            error: {
              iconTheme: { primary: "#ff1744", secondary: "#0e1628" },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
