export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        violet: '#7b6ada',
        blue: '#6AD9DA',
        red: '#DA7B6A',
        yellow: '#C9DA6A',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};