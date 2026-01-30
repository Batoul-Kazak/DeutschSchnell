
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        // 'my-yellow': '#C9DA6A',
        // 'my-violet': '#7b6ada',
        // 'my-blue': '#6AD9DA',
        // 'my-red': '#DA7B6A',
        // 'my-orange': '#FF9E44',
        'my-yellow': '#D4E85A',   
'my-violet': '#7B6ADA',   
'my-blue': '#000080',    
'my-red': '#FF6B6B',     
'my-orange': '#FFA726'   
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};