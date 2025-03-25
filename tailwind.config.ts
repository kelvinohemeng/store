import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontSize: {
        "e-xs": "0.75rem",
        "e-sm": "0.875rem",
        "e-base": "1rem",
        "e-lg": "1.125rem",
        "e-xl": "1.25rem",
        "e-2xl": "1.375rem",
        "e-3xl": "1.4375rem",
        "e-4xl": "1.5rem",
        "e-5xl": "1.625rem",
        "e-6xl": "1.75rem",
        "e-7xl": "1.875rem",
        "e-8xl": "2rem",
        "e-9xl": "2.25rem",
        "e-10xl": "3rem",
        "e-11xl": "4rem",
        "e-12xl": "4.5rem",
        "e-13xl": "6rem",
        "e-14xl": "7.5rem",
        "e-15xl": "9rem",
        "e-16xl": "11rem",
      },
      fontFamily: {
        helvetica: "Helvetica",
        "bdo-grotesk": "BDO Grotesk",
        inter: "Inter",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
