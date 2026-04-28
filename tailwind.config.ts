import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a3c1f",
          dark: "#102614",
          medium: "#234a28",
          light: "#2e6634",
          muted: "rgba(26, 60, 31, 0.85)",
        },
        accent: {
          DEFAULT: "#f5c400",
          dark: "#d4a900",
          light: "#ffd740",
          pale: "#fff8d6",
          muted: "rgba(245, 196, 0, 0.15)",
        },
        secondary: {
          DEFAULT: "#3a7d44",
          dark: "#2d6235",
          light: "#4e9e5a",
          pale: "#e8f5e9",
        },
        tag: {
          bg: "rgba(245, 196, 0, 0.18)",
          border: "#f5c400",
          text: "#7a5900",
          "green-bg": "rgba(58, 125, 68, 0.15)",
          "green-border": "#3a7d44",
          "green-text": "#1a5c24",
        },
        surface: {
          white: "#ffffff",
          off: "#f9faf5",
          light: "#f2f4ee",
          mid: "#c8cdc0",
        },
        ink: {
          muted: "#6b7660",
          body: "#3d4535",
          dark: "#1a2118",
          black: "#0d1209",
        },
        dark: {
          section: "#0f2313",
          text: "#d4e6c3",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["DM Sans", "Helvetica Neue", "sans-serif"],
      },
      fontSize: {
        xs: "0.68rem",
        sm: "0.78rem",
        base: "0.875rem",
        md: "0.95rem",
        lg: "1.05rem",
        xl: "1.2rem",
        "2xl": "1.5rem",
        "3xl": "1.75rem",
        "4xl": "2.1rem",
        "5xl": "2.6rem",
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "18px",
        xl: "24px",
        "2xl": "32px",
      },
      boxShadow: {
        xs: "0 1px 3px rgba(26,60,31,0.08)",
        sm: "0 2px 8px rgba(26,60,31,0.10)",
        md: "0 6px 20px rgba(26,60,31,0.14)",
        lg: "0 12px 40px rgba(26,60,31,0.18)",
        xl: "0 24px 64px rgba(26,60,31,0.22)",
        card: "0 8px 32px rgba(26,60,31,0.16)",
        btn: "0 4px 16px rgba(58,125,68,0.35)",
        nav: "0 2px 16px rgba(10,28,12,0.18)",
      },
      maxWidth: {
        container: "1200px",
      },
      spacing: {
        nav: "52px",
      },
    },
  },
  plugins: [],
};

export default config;
