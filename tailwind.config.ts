import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		screens: {
            xs: "475px"
        },
        colors: {
            primary: {
                "100": "#8DD3BB"
            }
        },
        fontFamily: {
            montserrat: ["var(--font-montserrat)"],
        }
  	}
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
