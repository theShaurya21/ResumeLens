import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      colors: {
        bg:      "#05070f",
        bg2:     "#080c18",
        bg3:     "#0c1120",
        card:    "#0e1628",
        card2:   "#111c32",
        border:  "#162040",
        border2: "#1e2f55",
        cyan:    "#00e5ff",
        cyan2:   "#00b8d4",
        purple:  "#a855f7",
        purple2: "#7c3aed",
        green:   "#00e676",
        amber:   "#ffb300",
        red:     "#ff1744",
        muted:   "#4a6080",
        muted2:  "#2a3d5f",
      },
      animation: {
        "shimmer":      "shimmer 4s linear infinite",
        "blink":        "blink 2s infinite",
        "spin-slow":    "spin 3s linear infinite",
        "fade-up":      "fadeUp .5s ease both",
        "gradient":     "gradientShift 5s ease infinite",
        "pop-in":       "popIn .5s cubic-bezier(.34,1.56,.64,1) both",
      },
      keyframes: {
        shimmer:       { to: { backgroundPosition: "200% center" } },
        blink:         { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.2" } },
        fadeUp:        { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        gradientShift: { "0%,100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } },
        popIn:         { from: { opacity: "0", transform: "scale(.5)" }, to: { opacity: "1", transform: "scale(1)" } },
      },
    },
  },
  plugins: [],
};

export default config;
