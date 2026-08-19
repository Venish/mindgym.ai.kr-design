/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "NanumSquareRound",
          "NanumSquareRoundBold",
          "NanumBarunGothicYetHangul",
          "NanumBarunGothic",
          "Pretendard",
          "-apple-system",
          "sans-serif",
        ],
      },
      colors: {
        brand: {
          green: "#00C474",        // 대표 초록 새싹/완료 강조 (Signature Green #00C473 / #00C474)
          forest: "#005A34",       // 다크 그린 텍스트/포인트
          mint: "#55DFA0",         // 보조 민트
          "mint-light": "#E9F8F0",  // Mint Tint 20%
          tea: "#8B95A1",          // Gray 500
          "tea-light": "#FFFFFF",  // 순 백색 White 70%
          clay: "#4E5968",         // Gray 700
          ink: "#191F28",          // Ink 다크 블랙
          surface: "#F9FAFB",      // Surface 옅은 회색
        },
        neutralScale: {
          ink: "#191F28",
          gray700: "#4E5968",
          gray500: "#8B95A1",
          gray400: "#B0B8C1",
          gray200: "#EDEFF2",
          surface: "#F9FAFB",
        },
      },
      letterSpacing: {
        tightest: "-0.56px",
        tight: "-0.56px",
        normal: "-0.56px",
      },
      fontSize: {
        // Flexible Root REM 기반 타이포그래피 프리셋 (430px 기준 정비례 스케일링)
        'title-main': ['1.625rem', { lineHeight: '1.375', letterSpacing: '-0.56px', fontWeight: '800' }],    // 430px 기준 26px
        'title-section': ['1.375rem', { lineHeight: '1.35', letterSpacing: '-0.56px', fontWeight: '900' }],   // 430px 기준 22px
        'title-card': ['1.25rem', { lineHeight: '1.375', letterSpacing: '-0.56px', fontWeight: '700' }],      // 430px 기준 20px
        'body-main': ['1.125rem', { lineHeight: '1.625', letterSpacing: '-0.56px', fontWeight: '500' }],      // 430px 기준 18px
        'caption-main': ['1.0rem', { lineHeight: '1.4', letterSpacing: '-0.56px', fontWeight: '600' }],       // 430px 기준 16px
        'micro-main': ['0.875rem', { lineHeight: '1.2', letterSpacing: '-0.56px', fontWeight: '700' }],       // 430px 기준 14px
      },
      animation: {
        "sprout-grow": "sprout-grow 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) both",
        "steam-rise": "steam-rise 2s ease-in-out infinite",
        "pulse-gentle": "pulse-gentle 3s ease-in-out infinite",
        aurora: "aurora 6s ease-in-out infinite",
      },
      keyframes: {
        "sprout-grow": {
          "0%": { transform: "scale(0) translateY(10px)", opacity: "0" },
          "70%": { transform: "scale(1.15) translateY(-2px)", opacity: "0.8" },
          "100%": { transform: "scale(1) translateY(0)", opacity: "1" },
        },
        "steam-rise": {
          "0%": { transform: "translateY(2px) translateX(0) scaleY(0.8)", opacity: "0.2" },
          "50%": { transform: "translateY(-3px) translateX(1px) scaleY(1.1)", opacity: "0.8" },
          "100%": { transform: "translateY(-8px) translateX(-1px) scaleY(0.9)", opacity: "0" },
        },
        "pulse-gentle": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.95" },
          "50%": { transform: "scale(1.05)", opacity: "1" },
        },
        aurora: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
