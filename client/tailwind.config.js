/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Make sure this points to your component folders
  ],
  theme: {
    extend: {
      animation: {
        float: 'float 3s ease-in-out infinite',
        dropIn: 'dropIn 1.5s ease-out forwards'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(-10px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        dropIn: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    }
  },
  plugins: [],
}
