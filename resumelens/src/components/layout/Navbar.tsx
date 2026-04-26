"use client";
// src/components/layout/Navbar.tsx
import Link from "next/link";
import { useState } from "react";
import { Brain, Menu, X, Layers } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/75 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan2 to-purple2 flex items-center justify-center shadow-lg shadow-cyan/20">
            <Layers size={16} className="text-white" />
          </div>
          <span className="font-bold text-[17px] tracking-tight">
            Resume<span className="text-cyan">Lens</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: "/",         label: "Analyzer" },
            { href: "/about",    label: "How It Works" },
            { href: "/dashboard",label: "Dashboard" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-muted hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Status badge */}
        <div className="hidden md:flex items-center gap-2 text-[11px] font-mono tracking-widest text-cyan bg-cyan/8 border border-cyan/20 rounded-full px-3 py-1.5 uppercase">
          <span className="w-1.5 h-1.5 bg-cyan rounded-full animate-blink" />
          NLP Engine v2
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-bg2 px-6 py-4 flex flex-col gap-4">
          {[
            { href: "/",          label: "Analyzer"     },
            { href: "/about",     label: "How It Works" },
            { href: "/dashboard", label: "Dashboard"    },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-muted hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
