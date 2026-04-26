// src/app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const type = (formData.get("type") as string) ?? "txt";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    // 5 MB guard
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5 MB." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let text = "";

    if (type === "pdf") {
      const pdfParse = (await import("pdf-parse")).default;
      const data = await pdfParse(buffer);
      text = data.text;
    } else if (type === "docx") {
      const mammoth = await import("mammoth");
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else {
      // Plain text / txt
      text = buffer.toString("utf-8");
    }

    text = text.trim();

    if (text.length < 20) {
      return NextResponse.json(
        {
          error:
            "Could not extract enough text. Ensure the file is not a scanned image. Try pasting text directly.",
        },
        { status: 422 }
      );
    }

    return NextResponse.json({ text }, { status: 200 });
  } catch (err) {
    console.error("[/api/upload]", err);
    return NextResponse.json(
      { error: "Failed to parse file. Please try pasting the text directly." },
      { status: 500 }
    );
  }
}
