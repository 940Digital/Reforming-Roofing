import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#042D58",
        red: "#B42335",
        blue: "#095798",
        cream: "#FFFDF2",
        paper: "#F3EEDF",
        ink: "#1A1A1A",
        tint: "#E5F0FE",
        rule: "rgba(4,45,88,0.15)",
        hair: "#D9D4C7",
      },
      fontFamily: {
        display: ["var(--font-anton)", "Impact", "sans-serif"],
        body: ["var(--font-rubik)", "system-ui", "sans-serif"],
        serif: ["var(--font-caslon)", "Georgia", "serif"],
        civic: ["var(--font-public)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
