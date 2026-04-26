"use client";
// src/lib/hooks/useAnalysis.ts

import { useState, useCallback } from "react";
import type { AnalysisResult, UploadState } from "@/types";
import toast from "react-hot-toast";

export function useAnalysis() {
  const [state, setState] = useState<UploadState>({
    resumeText:     "",
    jobText:        "",
    resumeFileName: "",
    jobFileName:    "",
    isAnalyzing:    false,
    result:         null,
    error:          null,
  });

  const setResume = useCallback((text: string, fileName = "") => {
    setState((p) => ({ ...p, resumeText: text, resumeFileName: fileName, error: null }));
  }, []);

  const setJob = useCallback((text: string, fileName = "") => {
    setState((p) => ({ ...p, jobText: text, jobFileName: fileName, error: null }));
  }, []);

  const analyze = useCallback(async () => {
    if (state.resumeText.length < 80 || state.jobText.length < 80) {
      const msg = "Both fields need at least 80 characters. Use the sample buttons to try it out.";
      setState((p) => ({ ...p, error: msg }));
      toast.error(msg);
      return;
    }

    setState((p) => ({ ...p, isAnalyzing: true, error: null, result: null }));

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: state.resumeText,
          jobText:    state.jobText,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Server error" }));
        throw new Error(err.error ?? "Analysis failed");
      }

      const result: AnalysisResult = await res.json();
      setState((p) => ({ ...p, result, isAnalyzing: false }));
      toast.success(`Analysis complete — ${result.score}% match score`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unexpected error";
      setState((p) => ({ ...p, isAnalyzing: false, error: msg }));
      toast.error(msg);
    }
  }, [state.resumeText, state.jobText]);

  const reset = useCallback(() => {
    setState({
      resumeText: "", jobText: "", resumeFileName: "", jobFileName: "",
      isAnalyzing: false, result: null, error: null,
    });
  }, []);

  return { state, setResume, setJob, analyze, reset };
}
