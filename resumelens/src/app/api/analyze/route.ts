// src/app/api/analyze/route.ts
import { NextRequest, NextResponse } from "next/server";
import { runAnalysis } from "@/lib/nlp/engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resumeText, jobText } = body as {
      resumeText?: string;
      jobText?: string;
    };

    if (!resumeText || !jobText) {
      return NextResponse.json(
        { error: "Both resumeText and jobText are required." },
        { status: 400 }
      );
    }

    if (resumeText.trim().length < 80) {
      return NextResponse.json(
        { error: "Resume text is too short. Please provide more content (min 80 characters)." },
        { status: 400 }
      );
    }

    if (jobText.trim().length < 80) {
      return NextResponse.json(
        { error: "Job description is too short. Please provide more content (min 80 characters)." },
        { status: 400 }
      );
    }

    const result = runAnalysis(resumeText.trim(), jobText.trim());

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("[/api/analyze]", err);
    return NextResponse.json(
      { error: "Internal server error during analysis." },
      { status: 500 }
    );
  }
}
