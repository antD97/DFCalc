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
        'inner-lg': 'inset 0 8px 8px -5px rgb(0 0 0 / 0.2), inset 0px -8px 8px -5px rgb(0 0 0 / 0.2)',
      }
    },
  },
  plugins: [],
};
export default config;
