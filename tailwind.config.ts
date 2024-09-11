import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inner-lg': 'inset 0 15px 10px -15px rgb(0 0 0 / 0.6), inset 0 -15px 10px -15px rgb(0 0 0 / 0.6)',
      }
    },
  },
  plugins: [],
};
export default config;
