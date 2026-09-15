export interface CategoryTheme {
  primaryColor: string;
  badgeBg: string;
  badgeText: string;
  bgGradient: string;
  orb1: string; // 상단 우측 메인 컬러 번짐
  orb2: string; // 중앙 좌측 조화 보조 컬러 번짐
  orb3: string; // 하단 우측 산뜻한 하이라이트 번짐
  orb4: string; // 좌측 상단 은은한 앰비언트 번짐
}

export const RITUAL_CATEGORY_THEMES: Record<string, CategoryTheme> = {
  // 1) 스트레스 비우기: 에메랄드 그린 + 스카이 블루 + 레몬 옐로우 + 민트
  "스트레스 비우기": {
    primaryColor: "#009E5C",
    badgeBg: "bg-emerald-100/90 text-emerald-900",
    badgeText: "text-[#00874E]",
    bgGradient: "bg-gradient-to-br from-[#E2F7EB] via-[#F0FDF4] to-[#E0F2FE]",
    orb1: "bg-[#00C474]/30",
    orb2: "bg-[#38BDF8]/28",
    orb3: "bg-[#FACC15]/25",
    orb4: "bg-[#34D399]/25",
  },
  // 2) 휴식과 충전: 로즈 블라썸 핑크 + 웜 선셋 피치 + 라벤더 바이올렛 + 버터 옐로우 (풍부한 수채화 오로라)
  "휴식과 충전": {
    primaryColor: "#E11D48",
    badgeBg: "bg-rose-100/90 text-rose-900",
    badgeText: "text-[#BE123C]",
    bgGradient: "bg-gradient-to-br from-[#FFE8EE] via-[#FFF3F6] to-[#F3E8FF]",
    orb1: "bg-[#F43F5E]/30",
    orb2: "bg-[#FB923C]/28",
    orb3: "bg-[#C084FC]/28",
    orb4: "bg-[#FDE047]/25",
  },
  // 3) 자기자비 명상: 인디고 블루 + 오션 스카이 + 바이올렛 + 소프트 로즈
  "자기자비 명상": {
    primaryColor: "#4F46E5",
    badgeBg: "bg-indigo-100/90 text-indigo-900",
    badgeText: "text-[#4338CA]",
    bgGradient: "bg-gradient-to-br from-[#E8EEFF] via-[#F3F5FE] to-[#FCE7F3]",
    orb1: "bg-[#6366F1]/30",
    orb2: "bg-[#38BDF8]/28",
    orb3: "bg-[#A855F7]/25",
    orb4: "bg-[#F472B6]/22",
  },
  // 4) 감정 정돈: 오키드 퍼플 + 로즈 핑크 + 아이스 블루 + 라벤더
  "감정 정돈": {
    primaryColor: "#9333EA",
    badgeBg: "bg-purple-100/90 text-purple-900",
    badgeText: "text-[#7E22CE]",
    bgGradient: "bg-gradient-to-br from-[#F3E8FF] via-[#FAF4FE] to-[#E0F2FE]",
    orb1: "bg-[#A855F7]/30",
    orb2: "bg-[#F472B6]/28",
    orb3: "bg-[#38BDF8]/28",
    orb4: "bg-[#C084FC]/25",
  },
  // 5) 몰입과 집중: 웜 앰버 골드 + 탠저린 코랄 + 에메랄드 옐로우
  "몰입과 집중": {
    primaryColor: "#D97706",
    badgeBg: "bg-amber-100/90 text-amber-900",
    badgeText: "text-[#B45309]",
    bgGradient: "bg-gradient-to-br from-[#FEF3C7] via-[#FFFBEB] to-[#DCFCE7]",
    orb1: "bg-[#F59E0B]/30",
    orb2: "bg-[#FB923C]/28",
    orb3: "bg-[#22C55E]/25",
    orb4: "bg-[#FCD34D]/25",
  },
  // 6) 관계와 경계: 클리어 틸 + 딥 아쿠아 시안 + 세이지 그린 + 스카이
  "관계와 경계": {
    primaryColor: "#0D9488",
    badgeBg: "bg-teal-100/90 text-teal-900",
    badgeText: "text-[#0F766E]",
    bgGradient: "bg-gradient-to-br from-[#CCFBF1] via-[#F0FDFA] to-[#E0F2FE]",
    orb1: "bg-[#14B8A6]/30",
    orb2: "bg-[#06B6D4]/28",
    orb3: "bg-[#86EFAC]/25",
    orb4: "bg-[#38BDF8]/25",
  },
};

const DEFAULT_THEME: CategoryTheme = RITUAL_CATEGORY_THEMES["스트레스 비우기"];

export function getRitualCategoryTheme(category?: string): CategoryTheme {
  if (!category) return DEFAULT_THEME;
  const trimmed = category.trim();
  return RITUAL_CATEGORY_THEMES[trimmed] || DEFAULT_THEME;
}
