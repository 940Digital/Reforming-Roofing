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
      },
      fontFamily: {
        display: ["var(--font-anton)", "Impact", "sans-serif"],
        body: ["var(--font-rubik)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
