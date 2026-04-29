import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // TRÈS IMPORTANT
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tu peux ajouter tes couleurs personnalisées ici pour les utiliser partout
        medical: {
          blue: '#0ea5e9',
          dark: '#075985',
        }
      },
    },
  },
  plugins: [],
};
export default config;