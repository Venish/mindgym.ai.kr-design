"use client";

import { create } from "zustand";

export type ThemeMode =
  | "fresh-mint"
  | "warm-ivory"
  | "soft-sage"
  | "lavender-calm"
  | "classic"
  | "brutal-brand"
  | "dark";

export interface ThemePresetInfo {
  id: ThemeMode;
  name: string;
  badge: string;
  desc: string;
  bgHex: string;
  accentHex: string;
  cardSubtleHex: string;
}

export const THEME_PRESETS: ThemePresetInfo[] = [
  {
    id: "dark",
    name: "슬레이트 다크 나이트",
    badge: "야간 집중 · 다크",
    desc: "눈이 편안한 딥 차콜/슬레이트 배경과 산뜻한 네온 에메랄드 텍스트",
    bgHex: "#0F172A",
    accentHex: "#34D399",
    cardSubtleHex: "#334155",
  },
  {
    id: "fresh-mint",
    name: "프레시 클리어 민트",
    badge: "추천 · 생기 맑음",
    desc: "맑고 깨끗한 아침이슬 민트 톤으로 눈부심 없이 화사한 생동감 선사 (칙칙함 0%)",
    bgHex: "#F2F9F5",
    accentHex: "#00BA66",
    cardSubtleHex: "#E5F4EC",
  },
  {
    id: "warm-ivory",
    name: "웜 밀크 아이보리",
    badge: "추천 · 눈 편한 생기",
    desc: "아늑한 우윳빛 아이보리 캔버스와 선명한 오리지널 네온 에메랄드의 환상적인 밸런스",
    bgHex: "#FAF7F2",
    accentHex: "#00C474",
    cardSubtleHex: "#F2ECE2",
  },
  {
    id: "brutal-brand",
    name: "네오 브루탈리즘 (브랜드 그린)",
    badge: "★ 인더스트리얼 힙",
    desc: "크림 옐로우 멀티컬러와 2px 블랙 보더, 하드 섀도우 위에 브랜드 그린이 포인트로 튀는 스트리트 감성",
    bgHex: "#FFFBEB",
    accentHex: "#00C474",
    cardSubtleHex: "#FEF08A",
  },
  {
    id: "soft-sage",
    name: "브라이트 세이지",
    badge: "허브 정원",
    desc: "회색기를 뺀 산뜻한 세이지 리프 배경과 딥 포레스트 그린의 조화로운 안정감",
    bgHex: "#EEF5F1",
    accentHex: "#009E5C",
    cardSubtleHex: "#DEECE3",
  },
  {
    id: "lavender-calm",
    name: "라벤더 캄 & 민트",
    badge: "호텔 스파",
    desc: "은은하고 우아한 연보라빛 안개 캔버스와 세련된 소프트 틸 포인트",
    bgHex: "#F6F5FA",
    accentHex: "#0284C7",
    cardSubtleHex: "#ECEAF5",
  },
  {
    id: "classic",
    name: "클래식 오리지널 화이트",
    badge: "원형 순백색",
    desc: "화사하고 선명한 순백색(#FFFFFF) 바탕과 네온 에메랄드의 오리지널 스타일",
    bgHex: "#FFFFFF",
    accentHex: "#00C474",
    cardSubtleHex: "#F9FAFB",
  },
];

interface ThemeState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "warm-ivory", // 유저 요청으로 '웜 밀크 아이보리'를 기본 적용!
  setTheme: (theme) => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("mg_theme_mode", theme);
    }
    set({ theme });
  },
  toggleTheme: () => {
    set((state) => {
      const order: ThemeMode[] = ["fresh-mint", "warm-ivory", "brutal-brand", "soft-sage", "lavender-calm", "classic", "dark"];
      const nextIdx = (order.indexOf(state.theme) + 1) % order.length;
      const nextTheme = order[nextIdx];
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", nextTheme);
        document.documentElement.classList.toggle("dark", nextTheme === "dark");
        localStorage.setItem("mg_theme_mode", nextTheme);
      }
      return { theme: nextTheme };
    });
  },
}));
