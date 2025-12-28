import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        surface: "#111118",
        accent: "#22d3ee",
        danger: "#ef4444",
        warning: "#facc15",
        success: "#22c55e",
      },
    },
  },
  plugins: [],
};

export default config;
