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
        brand: {
          primary: "#3062F6",    // DevLearn Primary Blue from Image
          secondary: "#6206F1",  // Deep Indigo / Violet
          accent: "#1CD191",     // Emerald Mint
          dark: "#0F172A",       // Deep Slate / Navy
          darker: "#090D16",     // Hero / Footer Dark
          text: "#1F2937",       // Body text slate
          muted: "#6B7280",      // Muted gray
          light: "#F8FAFC",      // Light page background
          card: "#FFFFFF",       // Pure White Card
          border: "#E2E8F0",     // Subtle border
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
