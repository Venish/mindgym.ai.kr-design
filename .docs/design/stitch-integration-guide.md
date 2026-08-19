# 🌿 마인드짐(MindGym) Stitch 개발용 통합 프론트엔드 명세 및 디자인 가이드 (v10)

본 설계서는 **마인드짐(MindGym) 모바일 웹앱**의 모든 화면 기획, 백엔드 로직 연동 스펙, **GodUI 기반의 마이크로 모션 코드 및 디자인 시스템**을 한데 엮은 **단일 통합 개발 바이블**입니다.

기존의 자책감을 유발하던 게임형 '스트릭 리셋'과 '쉴드 방패' 소모 구조를 전면 제거하고, **자기자비(Self-Compassion)와 지속 가능한 마음 정원(Gentle Garden)** 철학을 Lucas Bassetti의 **GodUI** 컴포넌트 생태계로 구현할 수 있도록 상세 코딩 규격을 수록했습니다.

---

## 🗺️ PART 1. 서비스 뷰 아키텍처 및 라우팅 (Routing Map)

Next.js App Router 아키텍처 하위의 라우트 구성과 컴포넌트 배치 맵입니다.

```text
/src/app/
├── (auth)
│   └── onboarding/               ➔ [독립 뷰] 온보딩 인트로 및 KOSS 진단 (P-01)
├── (main)/                       ➔ [4대 글로벌 탭 공통 레이아웃 (Header + Bottom Tab Bar) 적용]
│   ├── dashboard/                ➔ [탭 1] 대시보드 메인 홈 및 마음 정원 (P-18)
│   │                              ├── [Drawer] 아침 체크인 & 처방 (P-07, P-08)
│   │                              ├── [Inline Card] 낮 체크인 우회 배너 (P-09)
│   │                              ├── [Drawer 플로우] 저녁 체크인 ➔ 예/아니오 분기 ➔ 처방 ➔ 하루정산 마무리 (P-10 ~ P-14)
│   │                              └── [Overlay Modal] 30일 누적 완성 메가 축하 골드 정원 팝업
│   ├── ritual/                   ➔ [탭 2] 자율 리추얼 라이브러리 (P-15, 3열 그리드 나열)
│   │                              └── [Drawer] 리추얼 정보 상세 및 즐겨찾기 토글
│   ├── magazine/                 ➔ [탭 3] 월간 마음건강 매거진 서재 (P-20)
│   │                              └── [Overlay Modal] 매거진 뷰어 (완독 센서 연동)
│   └── report/                   ➔ [탭 4] KOSS 분석 리포트 & 과거 정원 아카이브 (P-02, P-19)
│                                  ├── [Wizard Modal] 이달의 나 감정 의도 & 추천 리추얼 확정 (P-03, P-04)
│                                  ├── [Drawer] 아침/저녁 알림 시간 피커 설정 (P-05)
│                                  └── [Overlay Modal] 월간 루프 회고 및 정산 다음 달 루프 전환 (P-06)
└── player/
    └── [id]/                     ➔ [독립 뷰] 가이드 자막 싱크 오디오 명상 플레이어 (P-16)
                                   └── [Overlay Modal] 리추얼 완료 덤벨 획득 정산 (P-17)
```

---

## 🎨 PART 2. 브랜드 디자인 가이드 (Tailwind v4 & GodUI)

⚠️ **디자인 핵심 강제 조항**:
1. **메인 시그니처 초록**: 반드시 **`#00C474`**만을 사용합니다.
2. **절대 금지 컬러**: 어둡고 강박감을 주는 딥그린 **`#015A35`**는 프로젝트 전체에서 절대로 사용하지 마십시오.
3. **무테(Borderless) 선언**: `border`나 `border-gray-100` 등의 테두리 선을 99% 이상 제거합니다. 대신 넉넉한 여백과 아주 고상한 미세 그림자(`shadow-soft-depth`) 및 여백 패딩만을 사용합니다.
4. **오직 순수 흰색(Pure White) 버전만 제작**: 배경은 무조건 순수 흰색(`bg-white`, `#FFFFFF`, `oklch(1 0 0)`)만 채택합니다.

마인드짐이 추구하는 평온하고 차분한 치유의 아이덴티티를 구현하기 위한 스타일링 및 UI 라이브러리 셋업 규격입니다.

### 1. 브랜드 시그니처 OKLCH 컬러 팔레트 (Gently Cooled Theme)
기존의 Warning Red를 완전히 지우고, 스스로 자라나는 마음 정원을 은근히 강조하는 파스텔 톤의 테마로 구성합니다.

```javascript
// tailwind.config.js 확장 컬러 설정
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#00C474',      // 대표 초록 불꽃, 새싹 및 마스터 완료 메인 강조 컬러
          mint: '#55DFA0',       // 보조 새싹 줄기 및 아침 가벼운 처방 뱃지
          'mint-light': '#EBFBF4', // 체크인 성공 날짜 타일 및 완료 바텀시트 배경
          tea: '#A0AEC0',        // 자연스러운 휴식일(Rest Day)의 보조 라인아트 그레이
          'tea-light': '#FFFFFF', // 휴식일 타일 및 대시보드 웰컴 위로 카드 배경
          clay: '#4E5968',       // 지지형 스토리텔링 본문 서체 전용 토스형 딥그레이
          ink: '#191F28',        // 최상위 굵은 타이틀 전용 세련된 다크 블랙
        },
      },
    },
  },
}
```

### 2. GodUI 컴포넌트 CLI 설치 목록
모든 기본 UI는 Lucas Bassetti의 **GodUI (godui.design)** 레지스트리 기반으로 이식합니다. CLI를 사용하여 로컬 디렉토리에 소스코드로 직접 내려받아 자유롭게 커스텀합니다.

```bash
# 1. 의존성 패키지 설치
npm install framer-motion clsx tailwind-merge @phosphor-icons/react lucide-react

# 2. GodUI 컴포넌트 설치 (클래스 기반 복사-붙여넣기)
pnpm dlx shadcn@latest add @godui/magic-button
pnpm dlx shadcn@latest add @godui/aurora-text
pnpm dlx shadcn@latest add @godui/neumorph-card
```

### 3. 동적 애니메이션 확장 프리셋
Framer Motion 및 CSS Transition 효과를 정교화하기 위해 `tailwind.config.js`에 주입해야 할 애니메이션 사양입니다.

```javascript
module.exports = {
  theme: {
    extend: {
      animation: {
        'sprout-grow': 'sprout-grow 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) both',
        'steam-rise': 'steam-rise 2s ease-in-out infinite',
        'pulse-gentle': 'pulse-gentle 3s ease-in-out infinite',
      },
      keyframes: {
        'sprout-grow': {
          '0%': { transform: 'scale(0) translateY(10px)', opacity: '0' },
          '70%': { transform: 'scale(1.15) translateY(-2px)', opacity: '0.8' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        'steam-rise': {
          '0%': { transform: 'translateY(2px) translateX(0) scaleY(0.8)', opacity: '0.2' },
          '50%': { transform: 'translateY(-3px) translateX(1px) scaleY(1.1)', opacity: '0.8' },
          '100%': { transform: 'translateY(-8px) translateX(-1px) scaleY(0.9)', opacity: '0' },
        },
        'pulse-gentle': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.95' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        }
      }
    }
  }
}
```

---

## ⚙️ PART 3. 핵심 글로벌 공통 소스 코드 (Core Engine & Components)

마인드짐 App Router 환경의 모든 컴포넌트가 싱글톤 데이터 상태를 공유하고, Phosphor Icons 및 Vercel 움직이는 SVG 아이콘이 적용된 핵심 코드 세트입니다.

### 1. 전역 상태 엔진 (`src/context/MindGymContext.tsx`)
```tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type GardenDayState = "COMPLETED" | "REST_DAY";

export interface Ritual {
  id: string;
  title: string;
  category: string;
  type: "SHORT" | "HYBRID" | "LONG";
  time: string;
  dumbbell: number;
  description: string;
}

interface MindGymStateContextType {
  userName: string;
  totalDumbbells: number;
  completedDays: string[]; // 실천 완료 YYYY-MM-DD
  restDays: string[];      // 자연스러운 휴식 YYYY-MM-DD
  currentIntention: string;
  favorites: string[];
  readMagazines: string[];
  addDumbbells: (amount: number) => void;
  markTodayCompleted: () => void;
  markTodayRest: () => void;
  toggleFavorite: (id: string) => void;
  readMagazine: (id: string) => void;
  getLevelName: (dumbbells?: number) => string;
  getNextLevelDiff: () => number;
  getGardenProgress: () => { completedCount: number; restCount: number; totalDays: number };
}

const MindGymStateContext = createContext<MindGymStateContextType | undefined>(undefined);

export const MindGymProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userName] = useState("김민우");
  const [totalDumbbells, setTotalDumbbells] = useState(120);
  const [completedDays, setCompletedDays] = useState<string[]>([]);
  const [restDays, setRestDays] = useState<string[]>([]);
  const [currentIntention, setCurrentIntention] = useState("안정된 8월");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [readMagazines, setReadMagazines] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTotal = localStorage.getItem("mg_total_dumbbells");
      const storedCompleted = localStorage.getItem("mg_completed_days");
      const storedRest = localStorage.getItem("mg_rest_days");
      const storedIntention = localStorage.getItem("mg_current_intention");
      const storedFavorites = localStorage.getItem("mg_favorites");
      const storedMagazines = localStorage.getItem("mg_read_magazines");

      if (storedTotal) setTotalDumbbells(parseInt(storedTotal));
      if (storedCompleted) setCompletedDays(JSON.parse(storedCompleted));
      if (storedRest) setRestDays(JSON.parse(storedRest));
      if (storedIntention) setCurrentIntention(storedIntention);
      if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
      if (storedMagazines) setReadMagazines(JSON.parse(storedMagazines));
      
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      localStorage.setItem("mg_total_dumbbells", totalDumbbells.toString());
      localStorage.setItem("mg_completed_days", JSON.stringify(completedDays));
      localStorage.setItem("mg_rest_days", JSON.stringify(restDays));
      localStorage.setItem("mg_current_intention", currentIntention);
      localStorage.setItem("mg_favorites", JSON.stringify(favorites));
      localStorage.setItem("mg_read_magazines", JSON.stringify(readMagazines));
    }
  }, [totalDumbbells, completedDays, restDays, currentIntention, favorites, readMagazines, isInitialized]);

  // 마운트 직후 지난 며칠 동안의 미완료일을 자동으로 REST_DAY로 보정
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth();
      const todayDate = today.getDate();

      const newRestDays = [...restDays];
      let updated = false;

      for (let d = 1; d < todayDate; d++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        if (!completedDays.includes(dateStr) && !newRestDays.includes(dateStr)) {
          newRestDays.push(dateStr);
          updated = true;
        }
      }

      if (updated) {
        setRestDays(newRestDays);
      }
    }
  }, [isInitialized, completedDays]);

  const getLevelName = (dumbbells = totalDumbbells) => {
    if (dumbbells < 150) return "나무 덤벨 (Lv.1)";
    if (dumbbells < 300) return "돌 덤벨 (Lv.2)";
    if (dumbbells < 500) return "청동 덤벨 (Lv.3)";
    if (dumbbells < 800) return "철 덤벨 (Lv.4)";
    if (dumbbells < 1200) return "은 덤벨 (Lv.5)";
    if (dumbbells < 1800) return "금 덤벨 (Lv.6)";
    if (dumbbells < 2500) return "플래티넘 덤벨 (Lv.7)";
    return "다이아 덤벨 (Lv.8)";
  };

  const getNextLevelDiff = () => {
    if (totalDumbbells < 150) return 150 - totalDumbbells;
    if (totalDumbbells < 300) return 300 - totalDumbbells;
    if (totalDumbbells < 500) return 500 - totalDumbbells;
    if (totalDumbbells < 800) return 800 - totalDumbbells;
    if (totalDumbbells < 1200) return 1200 - totalDumbbells;
    if (totalDumbbells < 1800) return 1800 - totalDumbbells;
    if (totalDumbbells < 2500) return 2500 - totalDumbbells;
    return 0;
  };

  const addDumbbells = (amount: number) => {
    setTotalDumbbells((prev) => prev + amount);
  };

  const getTodayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const markTodayCompleted = () => {
    const todayStr = getTodayStr();
    setCompletedDays((prev) => {
      if (prev.includes(todayStr)) return prev;
      const next = [...prev, todayStr];
      setRestDays((r) => r.filter((day) => day !== todayStr));

      if (next.length === 30) {
        addDumbbells(30);
      }
      return next;
    });
  };

  const markTodayRest = () => {
    const todayStr = getTodayStr();
    setRestDays((prev) => {
      if (prev.includes(todayStr) || completedDays.includes(todayStr)) return prev;
      return [...prev, todayStr];
    });
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const readMagazine = (id: string) => {
    setReadMagazines((prev) => {
      if (prev.includes(id)) return prev;
      addDumbbells(10);
      return [...prev, id];
    });
  };

  const getGardenProgress = () => {
    const today = new Date();
    const totalDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    return {
      completedCount: completedDays.length,
      restCount: restDays.length,
      totalDays,
    };
  };

  return (
    <MindGymStateContext.Provider
      value={{
        userName,
        totalDumbbells,
        completedDays,
        restDays,
        currentIntention,
        favorites,
        readMagazines,
        addDumbbells,
        markTodayCompleted,
        markTodayRest,
        toggleFavorite,
        readMagazine,
        getLevelName,
        getNextLevelDiff,
        getGardenProgress,
      }}
    >
      {children}
    </MindGymStateContext.Provider>
  );
};

export const useMindGym = () => {
  const context = useContext(MindGymStateContext);
  if (context === undefined) throw new Error("useMindGym must be used within a MindGymProvider");
  return context;
};
```

### 2. 하이브리드 네이티브 탭바 (`src/components/GlobalBottomTab.tsx`)
```tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, FlowerLotus, BookOpen, ChartBar } from "@phosphor-icons/react";

export function GlobalBottomTab() {
  const pathname = usePathname();

  const tabs = [
    { name: "홈", href: "/dashboard", icon: House },
    { name: "리추얼", href: "/ritual", icon: FlowerLotus },
    { name: "매거진", href: "/magazine", icon: BookOpen },
    { name: "아카이브", href: "/report", icon: ChartBar },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-lg  flex justify-around items-center px-4 z-40 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
      {tabs.map((tab) => {
        const isActive = pathname.startsWith(tab.href);
        const IconComponent = tab.icon;

        return (
          <Link 
            key={tab.href}
            href={tab.href} 
            className="flex flex-col items-center justify-center w-16 h-full gap-1 transition-all duration-200"
          >
            <div className={`transition-all duration-300 transform ${isActive ? "text-[#00C474] scale-110" : "text-[#8E949E] hover:text-[#4E5968]"}`}>
              <IconComponent size={24} weight={isActive ? "fill" : "regular"} />
            </div>
            <span className={`text-[10px] font-semibold tracking-tight transition-colors duration-200 ${isActive ? "text-[#00C474]" : "text-[#8E949E]"}`}>
              {tab.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
```

### 3. Vercel 스타일 동적 SVG 애니메이션 아이콘 4종 (`src/components/animated-icons/`)

#### 🪴 A. `AnimatedSprout.tsx` (완수 새싹)
```tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export const AnimatedSprout = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M4 20H20"
        stroke="#E5E8EB"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.path
        d="M12 20C12 15 11 11 15 8"
        stroke="#00C474"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      />
      <motion.path
        d="M15 8C17.5 8 19 6 18 4C16 3 14 5.5 15 8Z"
        fill="#00C474"
        initial={{ scale: 0, originX: "15px", originY: "8px" }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 10, delay: 0.7 }}
      />
      <motion.path
        d="M11.5 13C9 13 8 11.5 9 10C10.5 9 11.5 11.5 11.5 13Z"
        fill="#55DFA0"
        initial={{ scale: 0, originX: "11.5px", originY: "13px" }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.9 }}
      />
    </svg>
  );
};
```

#### ☕ B. `AnimatedCoffeeCup.tsx` (자연스러운 휴식 차 한 잔)
```tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export const AnimatedCoffeeCup = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M8 5C8.5 4 8.5 3 9 2"
        stroke="#A0AEC0"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={{ y: [2, -1, 2], opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      />
      <motion.path
        d="M12 4.5C12.5 3.5 12.5 2.5 13 1.5"
        stroke="#A0AEC0"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={{ y: [1, -2, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ repeat: Infinity, duration: 2.1, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.path
        d="M16 5C16.5 4 16.5 3 17 2"
        stroke="#A0AEC0"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={{ y: [2, -1, 2], opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut", delay: 0.6 }}
      />
      <path d="M5 8H19V14C19 16.5 17 18.5 14.5 18.5H9.5C7 18.5 5 16.5 5 14V8Z" fill="#F3F4F6" stroke="#A0AEC0" strokeWidth="2" strokeLinejoin="round" />
      <path d="M19 10C21 10 22 11 22 12.5C22 14 21 15 19 15" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" />
      <path d="M3 21H21" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};
```

#### ☀️ C. `AnimatedMorningSun.tsx` (아침 웰컴 해)
```tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export const AnimatedMorningSun = () => {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        style={{ originX: "24px", originY: "24px" }}
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1="24" y1="6" x2="24" y2="10"
            stroke="#FFB236"
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${angle} 24 24)`}
          />
        ))}
      </motion.g>
      <motion.circle
        cx="24"
        cy="24"
        r="10"
        fill="#FFD05B"
        stroke="#FFB236"
        strokeWidth="3"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      />
    </svg>
  );
};
```

#### 🌙 D. `AnimatedEveningMoon.tsx` (저녁 회고 별달)
```tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export const AnimatedEveningMoon = () => {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M31 15C31 24.3888 23.3888 32 14 32C12.5 32 11 31.7 9.7 31.2C15.3 35.5 22.3 36 28 33C33.7 30 36.5 23.5 35 17C34.3 14 32.8 11.5 31 10C31 11.5 31 13.2 31 15Z"
        fill="#9FADF9"
        stroke="#6B7CFF"
        strokeWidth="3"
        strokeLinejoin="round"
        animate={{ rotate: [-4, 4, -4], y: [0, -1.5, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        style={{ originX: "24px", originY: "24px" }}
      />
      <motion.path
        d="M10 12L11 14L13 14.5L11.5 15.5L12 17.5L10 16.5L8 17.5L8.5 15.5L7 14.5L9 14L10 12Z"
        fill="#FFD05B"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      />
      <motion.path
        d="M36 32L36.8 33.5L38.5 33.8L37.2 34.8L37.6 36.5L36 35.7L34.4 36.5L34.8 34.8L33.5 33.8L35.2 33.5L36 32Z"
        fill="#FFD05B"
        animate={{ opacity: [0.1, 1, 0.1] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", delay: 0.4 }}
      />
    </svg>
  );
};
```

### 4. GodUI 통합형 오로라 헤더 (`src/components/DashboardHeader.tsx`)
```tsx
"use client";

import React from "react";
import { AuroraText } from "@/components/godui/aurora-text";
import { AnimatedMorningSun } from "@/components/animated-icons/AnimatedMorningSun";
import { useMindGym } from "@/context/MindGymContext";

export default function DashboardHeader() {
  const { userName, currentIntention } = useMindGym();

  return (
    <div className="w-full max-w-md mx-auto bg-white/40 rounded-[28px] p-6 shadow-[0_4px_30px_rgba(0,0,0,0.02)] backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex items-center justify-between gap-4">
      <div className="flex-1">
        <span className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          {currentIntention}
        </span>
        <h2 className="text-xl font-extrabold text-gray-950 mt-2.5 leading-snug">
          안녕하세요, <br />
          <AuroraText className="from-emerald-500 via-teal-400 to-sky-400 font-black">
            {userName}님
          </AuroraText>
          의 오늘 마음정원입니다.
        </h2>
      </div>
      <div className="p-3 bg-amber-50/70  shadow-[0_2px_10px_rgba(245,158,11,0.04)] rounded-full flex items-center justify-center">
        <AnimatedMorningSun />
      </div>
    </div>
  );
}
```

---

## 📱 PART 4. 페이지별 마크업 구조 및 인터랙션 상세 명세

모든 페이지 및 오버레이 컴포넌트에 적용될 기획적 흐름과 마크업 정의서입니다.

### 🚀 1. 독립 진입로: 온보딩 및 KOSS 자가 진단 (`/onboarding`)

#### 📱 UI 와이어프레임
```text
============================================================
[   MIND GYM ONBOARDING   ]                     ( 1 / 37 )
============================================================

  🌱 내 안의 진짜 스트레스를 찾아볼까요?
  
  [ 프로그레스 바: ▂▂▂▂▂▂                                ]

  Q1. 회사 일이 너무 많아 밤늦게까지 야근할 때가 잦다.
  
  ┌────────────────────────────────────────────────────────┐
  │  ( ) 전혀 그렇지 않다                                   │
  ├────────────────────────────────────────────────────────┤
  │  ( ) 그렇지 않다                                       │
  ├────────────────────────────────────────────────────────┤
  │  ( ) 그렇다                                            │
  ├────────────────────────────────────────────────────────┤
  │  ( ) 매우 그렇다                                       │
  └────────────────────────────────────────────────────────┘

  [ ⚡ GodUI ShimmerButton: 다음 질문으로 (자동 전환) ]
============================================================
```

#### ⚙️ UI/UX 설계 및 상태 제어
*   **첫 슬라이더 구성**: 3단계 웰빙 킬러 카피 인라인 슬라이드 배치 ➔ `[KOSS 자가진단 시작]` 누르면 36문항 4점 척도 진단 인라인 활성화.
*   **GodUI 요소**: 질문 전환을 위한 `ShimmerButton` 작동.
*   **리워드 및 라우팅**: 마지막 문항 완료 즉시 웰컴 덤벨 `+50` 지급 트랜잭션 발동 ➔ `Gold Sprout Theme` 및 `한글 컬러 테마` 전격 해금 후 `/dashboard`로 이동.

---

### 🏠 2. [탭 1] 대시보드 메인 홈 (`/dashboard`)

#### 📱 UI 와이어프레임
```text
============================================================
[👤 김민우 님]                                     [🗓️ 아카이브]
============================================================
  "안정된 8월을 가꾸는 중" 🌱
  Lv.2 돌 덤벨  (다음 레벨까지 덤벨 30개 남음)
  [█████████████████████████████░░░] 90%
  
------------------------------------------------------------
  🏡 이달의 마음 정원 (누적 실천 캘린더)
------------------------------------------------------------
  [ 8월 정원 현황: 총 5일 실천 🪴  ·  2일 휴식 ☕ ]
  
  일    월    화    수    목    금    토
        [1]   [2]   (3)   [4]   [5]   [6]   <- []: 실천완료(🌱)
   (7)  [8]   (9)  (10)  (11)  (12)  (13)   <- (): 자연스런쉼(☕)
  (14) (15)  (16)  (17)  (18)  (19)  (20)   <- 비어도 리셋 없음
  
  ☕ "쉬어가는 것도 마음을 가꾸는 훌륭한 단련입니다."
------------------------------------------------------------
  🎁 오늘의 마음 체크인 배너 (시간대별 유동형)
------------------------------------------------------------
  | ☕ 어제 잘 쉬어갔나요? 오늘의 마음 날씨는 어떤가요?
  |  
  | [ 👉 2분 마음체크인하고 처방 받기 (+3 덤벨) ]
============================================================
```

#### ⚙️ UI/UX 설계 및 상태 제어
*   **마음 정원 (Calendar)**: `completedDays`는 `AnimatedSprout`로, `restDays`는 `AnimatedCoffeeCup`로 표시하여 유저의 시각적 수집욕을 부드럽게 자극.
*   **오늘의 체크인 배너**: 어제 쉬고 복귀한 날 아침, 페널티 경고 대신 **"어제 마음껏 쉬며 완충하셨나요? 오늘의 마음 날씨를 따뜻하게 적어주세요."** 배너 노출로 안전막 보강.
*   **시간대별 웰컴 제어**: 아침 5시~11시 아침 체크인, 저녁 18시~자정 저녁 체크인 바텀시트(`GodUI Drawer`) 자동 오프너 가동.

---

### 🧘 3. [탭 2] 자율 리추얼 라이브러리 (`/ritual`)

#### 📱 UI 와이어프레임
```text
============================================================
[🔍 마음 리추얼 검색 ]                            [❤️ 즐겨찾기]
============================================================
  [ 전체 ]  [# Autonomy ]  [# Job_Underload ]  [# Relationship]
  
  ┌──────┐  ┌──────┐  ┌──────┐
  │ R-01 │  │ R-02 │  │ R-03 │
  │ 🧘   │  │ ✍️   │  │ ☕   │  <- 3열 미니멀 원형 아이콘 그리드
  │호흡  │  │기록  │  │차담  │
  └──────┘  └──────┘  └──────┘
  ┌──────┐  ┌──────┐  ┌──────┐
  │ R-04 │  │ R-05 │  │ R-06 │
  └──────┘  └──────┘  └──────┘

  💡 탭하여 정보 확인 후, 원하는 시간대에 자율 재생 가능!
============================================================
```

#### ⚙️ UI/UX 설계 및 상태 제어
*   **3열 그리드 비주얼**: GodUI의 `NeumorphCard` 효과를 3열의 파스텔톤 동그라미 카드들에 심어 미니멀하고 단아한 도서관 서재 느낌 유도.
*   **상세 확인**: 타일을 클릭하면 하단에서 `GodUI Drawer`가 통통 튀며 상승 ➔ 리추얼 설명과 하트 즐겨찾기 토글, `[▶ 시작하기]` 버튼 제공.

---

### 📚 4. [탭 3] 월간 마음건강 매거진 서재 (`/magazine`)

#### 📱 UI 와이어프레임
```text
============================================================
[ 월간 마음건강 매거진 서재 ]
============================================================
  
  [ 8월호 스페셜 아티클 ] 
  "지친 하루 끝에서 내 마음을 끌어안는 '자기자비' 연습"
  
  [📖 지금 읽기 (+10 덤벨 완독 리워드)]
  
  --------------------------------------------------------
  📚 과월호 보관소
  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
  │   7월호 🌿   │  │   6월호 🌊   │  │   5월호 ☀️   │
  │ "자율성의 회복"│  │ "마음의 방전" │  │ "번아웃 신호" │
  └──────────────┘  └──────────────┘  └──────────────┘
============================================================
```

#### ⚙️ UI/UX 설계 및 상태 제어
*   **매거진 리독 뷰어**: 고해상도 전체화면 리더기 오픈.
*   **완독 리워드 센싱**: 최소 1분 이상 머무르고 뷰어 최하단 스크롤 센서에 도달하는 순간, 상단에 세련된 초록 완료 뱃지와 함께 **`+10 덤벨 획득! 🏆` 완료 토스트** 전송.

---

### 📊 5. [탭 4] KOSS 분석 리포트 & 과거 정원 아카이브 (`/report`)

#### 📱 UI 와이어프레임
```text
============================================================
[ KOSS 마음 리포트 ]                            [⚙️ 알림설정]
============================================================
  김민우 님의 종합 감정 의도: "차분하게 깊어지는 마음"
  
               [ 레이더 차트 다이어그램 ]
               (Autonomy, Workload, Reward 등)
  
  약점 영역 보완 테마: 직무 자율성(Autonomy) 🔴 보완 필요
  
------------------------------------------------------------
  📜 지난 마음 정원 아카이브 (Monthly Garden Album)
------------------------------------------------------------
  ┌─────────────────┐  ┌─────────────────┐
  │    7월의 정원    │  │    6월의 정원    │
  │  [🪴 18] [☕ 4] │  │  [🪴 21] [☕ 2] │
  └─────────────────┘  └─────────────────┘
  * 누적 수확한 명예 배지 진열장 [🏆 6개 보유] 보기
============================================================
```

#### ⚙️ UI/UX 설계 및 상태 제어
*   **과거 정원 아카이브(P-19) 통합**: 게임형 아이템 가방 화면을 완전히 걷어내고, 내가 지난달들에 가꾼 정원들을 정갈한 앨범북 형태로 소장하고 회고하는 **'명예 아카이브'**로 전면 전환.
*   **지향 감정어 변경 마법사**: `[감정어 설정 변경]` 누르면 가로 스와이프 칩 마법사 모달 트리거 ➔ 전역 `currentIntention` 동시 연동 갱신.

---

### 🧘 6. 독립 플레이어 뷰 (`/player/[id]`)

#### 📱 UI 와이어프레임
```text
============================================================
[ R-30: 나를 깨우는 박스호흡 ]                      [ 완료(X) ]
============================================================

                     [ ( 01 : 45 ) ]
                 원형 프로그레스 호흡 링
                 
  " 천천히 숨을 들이쉬고, 머릿속의 생각을 비워내세요... "
  ( 오디오 음성 싱크 가이드 자막이 실시간 하이라이팅 스크롤 )

============================================================
```

#### ⚙️ UI/UX 설계 및 상태 제어
*   **풀스크린 시각 차단**: 하단 탭바와 상단 헤더를 완벽히 가린 딥 다크 치유 오디오 전용 몰입형 플레이어.
*   **리워드 연동**: 오디오 완료 혹은 중간 닫기 시 즉각 **[리추얼 완료 성취 정산 모달 - P-17]** 팝업.
    *   **리워드 테이블**: `SHORT` 코스 완료 시 `+5 덤벨`, `HYBRID` 완료 시 `+8 덤벨`, `LONG` 완료 시 `+12 덤벨` 지급 모션 가동 및 `markTodayCompleted` 엔진 발동하여 홈 대시보드 정원 실천 타일 활성화 연계.

---

## 🏋️ PART 5. 핵심 시스템 규격 및 자율 채점 로직

### 1. KOSS 자가진단 36문항 표준 채점 공식
진단을 완료하면 아래 공식에 의해 영역별 스트레스가 100점 만점으로 자동 환산됩니다.

$$\text{환산 점수} = \frac{(\text{실제 응답 총합} - \text{문항 수}) \times 100}{\text{문항 수} \times 3}$$

*   **역문항 연산**: 36문항 중 자율성 역문항 등은 프로그램 내에서 자동으로 점수 전도 처리(`(5 - 응답값)`)합니다.

### 2. 8단계 마음 근력 덤벨 레벨 테이블
```text
나무 덤벨 (Lv.1): 0 ~ 149 덤벨      | 나뭇결 질감의 얇고 귀여운 나무 덤벨
돌 덤벨 (Lv.2)  : 150 ~ 299 덤벨    | 투박하지만 단단한 회색 돌 덤벨
청동 덤벨 (Lv.3): 300 ~ 499 덤벨    | 푸른 청동 빛깔의 엔틱한 고풍 덤벨
철 덤벨 (Lv.4)  : 500 ~ 799 덤벨    | 묵직하고 반짝이는 무광의 무쇠 금속 덤벨
은 덤벨 (Lv.5)  : 800 ~ 1,199 덤벨  | 영롱하고 고귀한 실버 하이라이트 덤벨
금 덤벨 (Lv.6)  : 1,200 ~ 1,799 덤벨| 찬란하게 빛나는 순금 골드 오라 덤벨
플래티넘 (Lv.7) : 1,800 ~ 2,499 덤벨| 차갑고 눈부신 백금 오라 및 이펙트 덤벨
다이아 덤벨 (Lv.8): 2,500 덤벨 이상  | 최고 존엄의 크리스탈 다이아몬드 덤벨
```

---

## 📅 PART 6. 1주차 몰빵 온보딩 집중 몰입 시나리오

| 일차 | 미션 명칭 | 연출 효과 및 보상 장치 (GodUI & 동적 SVG) |
| :---: | :--- | :--- |
| **Day 1** | 첫 자아 각성과 마음 씨앗 선물 | KOSS 진단 완료 즉시 **웰컴 덤벨 `+50`** 지급.<br>대시보드에 내 첫 **`Gold Sprout Garden Theme`** 배경 스킨 즉시 해금. |
| **Day 2** | 고속 성장의 도파민 (레벨업) | **'신규 관원 2배 버프'** 백그라운드 작동.<br>가벼운 SHORT 명상 하나만 완수해도 단숨에 **돌 덤벨(Lv.2)**로 고속 레벨업 모션 구동. |
| **Day 3** | 3일 정원 첫 녹색 새싹 축제 | 3일 연속 성공 시 **`[🌱 새싹 단련가 배지]`** 해금.<br>달력의 3개 새싹들이 일제히 팅글거리며 스프링 흔들림 모션 발동. |
| **Day 4** | 낮 틈새 우회 긴급 처방전 체득 | 오전 미완료 유저 ➔ 낮 11:30 이후 홈 진입 시 '낮 체크인 배너' 강제 팝업.<br>완수 시 정원에 숨겨진 **'히든 민트 꽃' 타일** 획득. |
| **Day 5** | **자연스러운 휴식일의 감격 (Aha!)** | **어제 하루 통째로 쉰 뒤 접속한 가상 시나리오.**<br>리셋 경고 대신 "어제 잘 쉬어갔나요?" 환영 문구 출력.<br>어제 날짜 칸에 자동으로 **`AnimatedCoffeeCup` ☕** 아이콘이 안착되는 시각적 안도감 선사. |
| **Day 6** | 72종 보물창고 라이브러리 정복 | 상황/고통 검색 가이드 미션 완수 시 **보너스 `+20` 덤벨** 가산.<br>자발적 자율 명상 탐색 습관화 형성. |
| **Day 7** | 마음 근력 1주차 첫 성적표 | 내 정원 모양이 담긴 **`1주차 마음 정원 리포트` 일러스트 카드** 발행.<br>고해상도 이미지 내보내기 및 인스타그램 공유 유입으로 바이럴 극대화. |
