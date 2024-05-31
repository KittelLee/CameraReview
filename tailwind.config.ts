/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      sans: ["Pretendard", "sans-serif"],
      serif: ["Pretendard", "serif"],
    },
    extend: {
      colors: {
        "yellow-a": "rgb(247, 241, 226)",
        "yellow-b": "rgb(249, 246, 218)",

        "brown-a": "rgb(92, 66, 23)",
      },
    },
  },
  plugins: [],
};
