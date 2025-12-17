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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#06b6d4", // Vibrant Cyan
          foreground: "#ffffff",
          dark: "#0891b2", // Deep Cyan
          light: "#22d3ee", // Light Cyan
        },
        secondary: {
          DEFAULT: "#a855f7", // Vibrant Purple
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#ec4899", // Hot Pink
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "rgba(15, 23, 42, 0.8)", // Dark slate with transparency
          foreground: "#f1f5f9",
        },
        border: "#1e293b",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0c4a6e 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;

