/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        nav: "#55AD9B",
        page: "#F1F8E8",
        card: "#95D2B3",
        "card-hover": "#D8EFD3",
        "default-text": "#17153B",
        "blue-accent": "#55AD9B",
        "blue-accent-hover": "#D8EFD3",
      },
    },
  },
  plugins: [],
};
