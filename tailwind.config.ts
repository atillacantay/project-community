import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#6366f1", // Light mode için birincil renk
          DEFAULT: "#4f46e5", // Varsayılan
          dark: "#4338ca", // Dark mode için birincil renk
        },
        secondary: {
          light: "#fbbf24",
          DEFAULT: "#f59e0b",
          dark: "#d97706",
        },
        neutral: {
          light: "#f3f4f6",
          DEFAULT: "#e5e7eb",
          dark: "#374151",
        },
        background: {
          light: "#ffffff",
          DEFAULT: "#f9fafb",
          dark: "#1f2937",
        },
        paper: {
          light: "#ffffff",
          DEFAULT: "#f8fafc",
          dark: "#2d3748",
        },
        text: {
          light: "#111827",
          DEFAULT: "#374151",
          dark: "#e5e7eb",
        },
        accent: {
          light: "#14b8a6",
          DEFAULT: "#0d9488",
          dark: "#0f766e",
        },
        error: {
          light: "#f87171",
          DEFAULT: "#ef4444",
          dark: "#dc2626",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Ana yazı tipi
        serif: ["Merriweather", "serif"], // Alternatif serif yazı tipi
        mono: ["Source Code Pro", "monospace"], // Kod için monospaced yazı tipi
      },
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        light: "0 4px 6px rgba(0, 0, 0, 0.1)", // Light mode gölge
        dark: "0 4px 6px rgba(0, 0, 0, 0.6)", // Dark mode gölge
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark"], // Dark mode için arka plan rengi
      textColor: ["dark"], // Dark mode için metin rengi
      borderColor: ["dark"], // Dark mode için kenar rengi
      boxShadow: ["dark"], // Dark mode için gölgeler
    },
  },
  plugins: [],
} satisfies Config;
