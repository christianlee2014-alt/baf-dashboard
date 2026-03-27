/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0D1117',
          card: '#161B22',
          hover: '#1C2128',
          border: '#30363D',
        },
        text: {
          primary: '#F0F6FC',
          secondary: '#8B949E',
          muted: '#484F58',
        },
        accent: {
          green: '#39D353',
          red: '#F85149',
          amber: '#D29922',
          blue: '#58A6FF',
          purple: '#BC8CFF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
        'btn': '8px',
      }
    },
  },
  plugins: [],
}
