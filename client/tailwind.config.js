/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ["./index.html", 
    "./src/**/*.{html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "cupcake","night"],
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
}

