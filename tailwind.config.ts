import type { Config } from "tailwindcss";
import formPlugin from "@tailwindcss/forms";

export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        15: "repeat(15, minmax(0, 1fr))",
      },
    },
  },
  plugins: [formPlugin],
} satisfies Config;
