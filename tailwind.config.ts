import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./docs/**/*.md",
    "./lib/**/*.{ts,tsx}",
    "./public/**/*.html",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Preto Profundo */
        black: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
        /* Azul-Petróleo / Verde-Água - Escala Harmoniosa */
        petrol: {
          50: "#e6f2f4",
          100: "#cce5e9",
          200: "#99ccd4",
          300: "#66b2be",
          400: "#4ea89a",
          500: "#3a8a7f",
          600: "#2d7d6e",
          700: "#1f5f5a",
          800: "#1a4d5c",
          900: "#143d4a",
          950: "#0d2a33",
          deep: "#1f5f5a",
          deeper: "#1a4d5c",
          darkest: "#0d2a33",
        },
        /* Destaques */
        gold: "#f5d06b",
        amber: {
          600: "#d97706",
        },
        orange: {
          600: "#ea580c",
        },
        /* Semantic */
        success: "#2d7d6e",
        warning: "#f59e0b",
        error: "#ef4444",
        info: "#1a4d5c",
      },
      textColor: {
        primary: "#e5e5e5",
        secondary: "#a3a3a3",
        tertiary: "#737373",
        bright: "#ffffff",
      },
      backgroundColor: {
        primary: "#0a0a0a",
        secondary: "#171717",
        tertiary: "#262626",
        "surface-1": "#1a1a1a",
        "surface-2": "#222222",
      },
      borderColor: {
        default: "#333333",
        light: "#404040",
      },
      backgroundImage: {
        "gradient-hero":
          "linear-gradient(135deg, #1a4d5c 0%, #1f5f5a 50%, #2d7d6e 100%)",
        "gradient-button":
          "linear-gradient(135deg, #2d7d6e 0%, #1f5f5a 55%, #4ea89a 100%)",
        "gradient-secondary":
          "linear-gradient(135deg, rgb(45 125 110 / 0.16), rgb(45 125 110 / 0.08))",
        "gradient-card-overlay":
          "linear-gradient(135deg, rgb(26 77 92 / 0.12), rgb(45 125 110 / 0.06))",
        "gradient-text": "linear-gradient(135deg, #4ea89a 0%, #2d7d6e 100%)",
      },
      boxShadow: {
        sm: "0 1px 2px rgb(0 0 0 / 0.5)",
        md: "0 4px 6px rgb(0 0 0 / 0.6)",
        lg: "0 10px 15px rgb(0 0 0 / 0.7)",
        button: "0 6px 18px rgb(45 125 110 / 0.4)",
        "button-hover": "0 12px 30px rgb(78 168 154 / 0.3)",
        "card-hover":
          "0 0 20px rgb(45 125 110 / 0.3), 0 20px 40px rgb(0 0 0 / 0.6)",
        glow: "0 0 40px rgb(45 125 110 / 0.2)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [typography],
};

export default config;
