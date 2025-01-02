/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "rgb(23 23 23)",
        golden: '#ffdb70',
        blue: '#1075fa',
        secondary: "#00f6ff",
      },
      fontFamily: {
      },
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
      boxShadow: {
        'inner-lg': 'inset 0 0 20px 5px black',
        'base': '0 0 5px 0 rgba(0,0,0,0.3)',
      },
      fontFamily: {
        logoFont: ['logo-font', 'sans-serif'],
      },
      content: ['before', 'after'],
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
