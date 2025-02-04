/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
        pretendard: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        '@font-face': {
          fontFamily: 'Pretendard',
          src: 'url(/fonts/PretendardVariable.woff2) format("woff2")',
          fontWeight: 'normal',
          fontStyle: 'normal',
        },
        '@font-face': {
          fontFamily: 'Inter',
          src: 'url(/fonts/Inter-VariableFont_opsz,wght.woff2) format("woff2")',  // Inter 폰트 파일 경로 지정
          fontWeight: 'normal',
          fontStyle: 'normal',
        },
      });
    },
  ],
};