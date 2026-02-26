
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
     screens: {
      sm: '400px',   
      md: '700px',   
      lg: '1024px', 
    },
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        'light-violet': '#7B6ADA',   
        'dark-violet': '#311C5D',   
        'light-yellow': '#FFEF5F',   
        'dark-yellow': '#D4E85A',   
        'light-blue': '#5F99AE',    //ABDADC
        'dark-blue': '#336D82',    //008BFF
        'light-red': '#F8615A',     
        'dark-red': '#CF0000',   //DC0E0E   DC3535
        'light-green': "#B4FE98",
        'dark-green': "#5D8233"
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};