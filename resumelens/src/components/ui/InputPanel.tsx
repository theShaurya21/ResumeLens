"use client";
// src/components/ui/InputPanel.tsx
import { useRef, useState, useCallback } from "react";
import { Upload, FileText, Monitor } from "lucide-react";
import { SAMPLES, SAMPLE_LABELS } from "@/lib/utils/samples";
import toast from "react-hot-toast";

interface Props {
  label:       string;
  value:       string;
  fileName:    string;
  onChange:    (text: string, fileName?: string) => void;
  placeholder: string;
  sampleGroup: "resume" | "jd";
  accentColor: string; // tailwind color token e.g. "cyan" | "purple"
}

export default function InputPanel({
  label, value, fileName, onChange, placeholder, sampleGroup, accentColor,
}: Props) {
  const fileInputRef  = useRef<HTMLInputElement>(null);
  const [dragging, setDragging]   = useState(false);
  const [uploading, setUploading] = useState(false);

  const accentMap: Record<string, string> = {
    cyan:   "border-cyan bg-cyan/5 text-cyan",
    purple: "border-purple bg-purple/5 text-purple",
  };
  const iconMap: Record<string, string> = {
    cyan:   "bg-cyan/10 border-cyan/20",
    purple: "bg-purple/10 border-purple/20",
  };
  const glowMap: Record<string, string> = {
    cyan:   "focus:border-cyan focus:shadow-[0_0_0_3px_rgba(0,229,255,0.07)]",
    purple: "focus:border-purple focus:shadow-[0_0_0_3px_rgba(168,85,247,0.07)]",
  };

  // ── File upload ───────────────────────────────────────────────────────────
  const processFile = useCallback(async (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!["pdf", "docx", "txt"].includes(ext ?? "")) {
      toast.error("Unsupported file type. Please use PDF, DOCX, or TXT.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 5 MB.");
      return;
    }

    setUploading(true);

    try {
      if (ext === "txt") {
        const text = await file.text();
        onChange(text, file.name);
        toast.success(`Loaded: ${file.name}`);
      } else {
        // Server-side parsing for PDF / DOCX
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", ext!);

        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error ?? "Upload failed");

        onChange(data.text, file.name);
        toast.success(`Parsed: ${file.name}`);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = ""; // reset so same file can be re-selected
  }, [processFile]);

  const sampleKeys = Object.entries(SAMPLE_LABELS)
    .filter(([, v]) => v.group === sampleGroup)
    .map(([k, v]) => ({ key: k, label: v.label }));

  return (
    <div className="flex flex-col gap-0">
      {/* Label row */}
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
          {label}
        </span>
        <span className="font-mono text-[10px] text-muted2">
          {value.length} chars
        </span>
      </div>

      {/* Card */}
      <div className="bg-card border border-border rounded-[18px] p-5 relative overflow-hidden card-glow">

        {/* Dropzone */}
        <div
          className={[
            "border-[1.5px] border-dashed rounded-xl p-4 mb-4 cursor-pointer transition-all duration-200",
            dragging
              ? accentMap[accentColor]
              : "border-border2 hover:border-muted2 bg-bg3",
          ].join(" ")}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            className="hidden"
            onChange={onFileChange}
          />
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${iconMap[accentColor]}`}>
              {uploading ? (
                <div className={`w-3.5 h-3.5 border-2 border-t-transparent rounded-full animate-spin border-${accentColor}`} />
              ) : fileName ? (
                <FileText size={14} className={`text-${accentColor}`} />
              ) : (
                <Upload size={14} className={`text-${accentColor}`} />
              )}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-white/80">
                {uploading ? "Processing…" : fileName || "Upload File"}
              </p>
              <p className="text-[11px] text-muted">
                {fileName ? fileName : "PDF, DOCX, TXT · or drag & drop"}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-[10px] text-muted2 uppercase tracking-widest">
            or paste
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Textarea */}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={9}
          className={[
            "w-full bg-bg3 border border-border rounded-xl px-4 py-3.5",
            "font-mono text-[12px] leading-relaxed text-white/85",
            "placeholder:text-muted/40 resize-y outline-none transition-all duration-200",
            glowMap[accentColor],
          ].join(" ")}
        />

        {/* Sample chips */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="font-mono text-[9px] text-muted2 uppercase tracking-widest">
            Try:
          </span>
          {sampleKeys.map(({ key, label: chipLabel }) => (
            <button
              key={key}
              onClick={() => {
                onChange(SAMPLES[key], "");
                toast.success(`Sample loaded: ${chipLabel}`);
              }}
              className="font-mono text-[10px] px-2.5 py-1 border border-border2 rounded-md text-muted hover:border-cyan hover:text-cyan bg-transparent transition-all duration-150"
            >
              {chipLabel}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
