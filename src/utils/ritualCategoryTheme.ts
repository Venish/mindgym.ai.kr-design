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
  // 1) 스트레스 비우기: 소프트 민트 & 클리어 스카이 (은은한 맑음)
  "스트레스 비우기": {
    primaryColor: "#009E5C",
    badgeBg: "bg-emerald-100/90 text-emerald-900",
    badgeText: "text-[#00874E]",
    bgGradient: "bg-gradient-to-br from-[#F4FAF6] via-[#FFFFFF] to-[#F0F7FD]",
    orb1: "bg-[#00C474]/12",
    orb2: "bg-[#38BDF8]/12",
    orb3: "bg-[#FACC15]/10",
    orb4: "bg-[#34D399]/10",
  },
  // 2) 휴식과 충전: 소프트 블러쉬 & 피치 밀크 (부드러운 포근함)
  "휴식과 충전": {
    primaryColor: "#E11D48",
    badgeBg: "bg-rose-100/90 text-rose-900",
    badgeText: "text-[#BE123C]",
    bgGradient: "bg-gradient-to-br from-[#FFF5F7] via-[#FFFFFF] to-[#FAF5FF]",
    orb1: "bg-[#F43F5E]/12",
    orb2: "bg-[#FB923C]/10",
    orb3: "bg-[#C084FC]/10",
    orb4: "bg-[#FDE047]/10",
  },
  // 3) 자기자비 명상: 소프트 인디고 & 페일 로즈 (차분한 안정감)
  "자기자비 명상": {
    primaryColor: "#4F46E5",
    badgeBg: "bg-indigo-100/90 text-indigo-900",
    badgeText: "text-[#4338CA]",
    bgGradient: "bg-gradient-to-br from-[#F5F7FF] via-[#FFFFFF] to-[#FDF5F8]",
    orb1: "bg-[#6366F1]/12",
    orb2: "bg-[#38BDF8]/10",
    orb3: "bg-[#A855F7]/10",
    orb4: "bg-[#F472B6]/10",
  },
  // 4) 감정 정돈: 소프트 라벤더 & 아이스 블루 (투명한 맑음)
  "감정 정돈": {
    primaryColor: "#9333EA",
    badgeBg: "bg-purple-100/90 text-purple-900",
    badgeText: "text-[#7E22CE]",
    bgGradient: "bg-gradient-to-br from-[#FAF5FF] via-[#FFFFFF] to-[#F0F7FE]",
    orb1: "bg-[#A855F7]/12",
    orb2: "bg-[#F472B6]/10",
    orb3: "bg-[#38BDF8]/10",
    orb4: "bg-[#C084FC]/10",
  },
  // 5) 몰입과 집중: 소프트 버터 앰버 & 바닐라 (온화한 온기)
  "몰입과 집중": {
    primaryColor: "#D97706",
    badgeBg: "bg-amber-100/90 text-amber-900",
    badgeText: "text-[#B45309]",
    bgGradient: "bg-gradient-to-br from-[#FFFDF2] via-[#FFFFFF] to-[#F2FBF6]",
    orb1: "bg-[#F59E0B]/12",
    orb2: "bg-[#FB923C]/10",
    orb3: "bg-[#22C55E]/10",
    orb4: "bg-[#FCD34D]/10",
  },
  // 6) 관계와 경계: 소프트 아쿠아 틸 & 세이지 (산뜻한 여유)
  "관계와 경계": {
    primaryColor: "#0D9488",
    badgeBg: "bg-teal-100/90 text-teal-900",
    badgeText: "text-[#0F766E]",
    bgGradient: "bg-gradient-to-br from-[#F2FCFA] via-[#FFFFFF] to-[#F0F7FE]",
    orb1: "bg-[#14B8A6]/12",
    orb2: "bg-[#06B6D4]/10",
    orb3: "bg-[#86EFAC]/10",
    orb4: "bg-[#38BDF8]/10",
  },
  // 7) 몸 챙김: 소프트 스카이 시안 & 바이탈 민트 (가볍고 상쾌한 회복)
  "몸 챙김": {
    primaryColor: "#0284C7",
    badgeBg: "bg-sky-100/90 text-sky-900",
    badgeText: "text-[#0369A1]",
    bgGradient: "bg-gradient-to-br from-[#F2F8FE] via-[#FFFFFF] to-[#F4F6FE]",
    orb1: "bg-[#0EA5E9]/12",
    orb2: "bg-[#10B981]/10",
    orb3: "bg-[#6366F1]/10",
    orb4: "bg-[#38BDF8]/10",
  },
};

const DEFAULT_THEME: CategoryTheme = RITUAL_CATEGORY_THEMES["스트레스 비우기"];

export function getRitualCategoryTheme(category?: string): CategoryTheme {
  if (!category) return DEFAULT_THEME;
  const trimmed = category.trim();
  return RITUAL_CATEGORY_THEMES[trimmed] || DEFAULT_THEME;
}
