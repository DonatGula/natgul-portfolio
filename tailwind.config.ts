import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./pages/**/*.{ts,tsx}","./components/**/*.{ts,tsx}","./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { pink: { DEFAULT: "#FF2D78" } },
      fontFamily: { display: ["Outfit","sans-serif"], mono: ["JetBrains Mono","monospace"], sans: ["Space Grotesk","sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
