# 🏋️ 마인드짐(MindGym) Next.js App Router 프로토타입 내비게이션 및 동적 컴포넌트 명세서 (v9)

본 문서는 **마인드짐 4대 핵심 탭과 마음 정원 흐름**을 Next.js App Router 환경에서 완벽하게 시뮬레이션하고 구현할 수 있도록 설계된 **실전용 전역 상태 머신 및 완성형 컴포넌트 규격서**입니다.

이번 v9 버전에서는 유저의 피드백을 완벽하게 반영하여, 기존의 텍스트 에모지를 모두 걷어내고 **Phosphor Icons (`@phosphor-icons/react`) 기반의 정적인 정보 제어** 시스템과 **Framer Motion 기반의 Vercel 스타일 동적 SVG 애니메이션 아이콘**의 하이브리드 코드 세트를 완전히 하나로 통합했습니다.

---

## 🛠️ PART 1. Next.js 완성형 전역 상태 엔진 (`MindGymContext.tsx` - v9)

Next.js App Router의 모든 페이지와 모달 컴포넌트가 싱글톤 데이터 상태를 공유하고 브라우저 `localStorage`와 실시간 동기화되도록 구현한 완성형 TypeScript Context 코드입니다. 강박적인 방패(Shield) 아이템과 연속 스트릭 리셋 수식을 완전히 걷어내고, **누적 실천 캘린더(Mind Garden)** 및 **자연스러운 휴식일(Rest Day)** 개념으로 고도화했습니다.

프로젝트 생성 후 `/src/context/MindGymContext.tsx` 경로에 그대로 배치하여 사용하십시오.

```tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// 1. 마음 정원 날짜 상태 타입 정의
export type GardenDayState = "COMPLETED" | "REST_DAY";

// 2. 리추얼 아이템 인터페이스
export interface Ritual {
  id: string;
  title: string;
  category: string;
  type: "SHORT" | "HYBRID" | "LONG";
  time: string;
  dumbbell: number;
  description: string;
}

// 3. 전역 상태 인터페이스
interface MindGymStateContextType {
  userName: string;
  totalDumbbells: number;
  completedDays: string[]; // 실천 완료한 날짜 목록 (예: ["2026-08-01", "2026-08-02"])
  restDays: string[];      // 휴식일로 기록된 날짜 목록 (예: ["2026-08-03"])
  currentIntention: string;
  favorites: string[];     // 즐겨찾기 리추얼 ID 목록
  readMagazines: string[]; // 완독 매거진 ID 목록
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

  // 컴포넌트 마운트 시 LocalStorage에서 상태 복구
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

  // 상태 변경 시 LocalStorage에 지속 동기화
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

  // 마운트 직후 지난 며칠 동안의 미완료일을 자동으로 REST_DAY로 보정하여 달력을 아름답게 보존
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth(); // 0-indexed
      const todayDate = today.getDate();

      const newRestDays = [...restDays];
      let updated = false;

      // 이번 달 1일부터 어제까지 루프를 돌며 completedDays나 restDays에 없으면 REST_DAY로 편입
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

  // 등급 구간 매핑
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

  // 다음 레벨 달성을 위한 잔여 덤벨 계산
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

  // 덤벨 증가 및 레벨업 축하 바인딩
  const addDumbbells = (amount: number) => {
    setTotalDumbbells((prev) => {
      const next = prev + amount;
      const oldLevel = getLevelName(prev);
      const newLevel = getLevelName(next);
      if (oldLevel !== newLevel) {
        setTimeout(() => {
          alert(`🎉 등급 수직 진화! [${oldLevel}] ➔ [${newLevel}]`);
        }, 100);
      }
      return next;
    });
  };

  // 오늘 날짜 구하기 유틸리티 (YYYY-MM-DD 형식)
  const getTodayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  // 오늘 체크인 및 리추얼 실천 완료 등록
  const markTodayCompleted = () => {
    const todayStr = getTodayStr();
    setCompletedDays((prev) => {
      if (prev.includes(todayStr)) return prev;
      
      const next = [...prev, todayStr];
      setRestDays((r) => r.filter((day) => day !== todayStr));

      // 30일 완성 마일스톤 메가 보상 체크
      if (next.length === 30) {
        addDumbbells(30); // 보너스 덤벨 지급
        setTimeout(() => {
          alert("🏆 [축하합니다! 30일 누적 완성 메가 이벤트!]\n- 🌱 '골든 가든(Golden Garden)' 스킨 전격 해금\n- 💪 보너스 +30 덤벨 가산 완료!\n- 30일 정밀 분석 마음 리포트가 완성되었습니다! 🎉");
        }, 100);
      }
      return next;
    });
  };

  // 명시적 오늘 휴식 선언
  const markTodayRest = () => {
    const todayStr = getTodayStr();
    setRestDays((prev) => {
      if (prev.includes(todayStr) || completedDays.includes(todayStr)) return prev;
      return [...prev, todayStr];
    });
  };

  // 즐겨찾기 자율 토글
  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 매거진 독서 및 최초 1회 덤벨 증정
  const readMagazine = (id: string) => {
    setReadMagazines((prev) => {
      if (prev.includes(id)) return prev;
      addDumbbells(10); // 최초 완독 보너스 지급
      return [...prev, id];
    });
  };

  // 정원 현황 요약
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
  if (context === undefined) {
    throw new Error("useMindGym must be used within a MindGymProvider");
  }
  return context;
};
```

---

## 🔗 PART 2. Next.js App Router 글로벌 하단 탭바 & Phosphor Icons 연동 컴포넌트

경고나 어색한 이모지 탭바 대신 세련된 **Phosphor Icons**의 아웃라인(`regular`)과 활성 강조 채우기(`fill`) 기중치를 활용해 모바일 네이티브 감성을 극대화한 글로벌 하단 네비게이션입니다.

`npm install @phosphor-icons/react` 패키지 설치가 필수적입니다.

```tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  House,          // 홈 대시보드
  FlowerLotus,    // 자율 리추얼 라이브러리 (마음 챙김/정원 테마와 완벽 일치)
  BookOpen,       // 마음건강 매거진
  ChartBar        // KOSS 분석 리포트 / 아카이브
} from "@phosphor-icons/react";

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
            <div 
              className={`transition-all duration-300 transform ${
                isActive 
                  ? "text-[#00C474] scale-110" 
                  : "text-[#8E949E] hover:text-[#4E5968]"
              }`}
            >
              <IconComponent 
                size={24} 
                weight={isActive ? "fill" : "regular"} 
              />
            </div>
            <span 
              className={`text-[10px] font-semibold tracking-tight transition-colors duration-200 ${
                isActive ? "text-[#00C474]" : "text-[#8E949E]"
              }`}
            >
              {tab.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
```

---

## 🎨 PART 3. Vercel 스타일 동적 SVG 애니메이션 아이콘 세트 (Framer Motion)

별도의 애니메이션 라이브러리 추가 없이, 순수 SVG 레이아웃 구조에 **Framer Motion의 물리 엔진을 심어 120fps 급으로 부드럽고 쫀득하게 움직이는 핵심 4대 감성 아이콘 소스**입니다. 대시보드와 마음 정원 캘린더 곳곳에 마운트하여 정서적인 위로와 성취감을 극대화합니다.

```tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

/* 🪴 1. AnimatedSprout (체크인 완료 타일용 새싹) */
export const AnimatedSprout = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 흙/바닥 라인 그리기 효과 */}
      <motion.path
        d="M4 20H20"
        stroke="#E5E8EB"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4 }}
      />
      {/* 솟아나는 초록 줄기 */}
      <motion.path
        d="M12 20C12 15 11 11 15 8"
        stroke="#00C474"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      />
      {/* 오른쪽 잎사귀 (통통 튀는 스프링 기법) */}
      <motion.path
        d="M15 8C17.5 8 19 6 18 4C16 3 14 5.5 15 8Z"
        fill="#00C474"
        initial={{ scale: 0, originX: "15px", originY: "8px" }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 10, delay: 0.7 }}
      />
      {/* 왼쪽 보조 줄기 및 잎사귀 */}
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

/* ☕ 2. AnimatedCoffeeCup (자연스러운 휴식일 타일용 온전한 차 한 잔) */
export const AnimatedCoffeeCup = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 따뜻한 김이 한 가닥씩 흐르는 무한 살랑 애니메이션 */}
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
      {/* 찻잔 몸통 */}
      <path d="M5 8H19V14C19 16.5 17 18.5 14.5 18.5H9.5C7 18.5 5 16.5 5 14V8Z" fill="#F3F4F6" stroke="#A0AEC0" strokeWidth="2" strokeLinejoin="round" />
      {/* 찻잔 손잡이 */}
      <path d="M19 10C21 10 22 11 22 12.5C22 14 21 15 19 15" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" />
      {/* 받침 접시 */}
      <path d="M3 21H21" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

/* ☀️ 3. AnimatedMorningSun (아침 체크인 웰컴용 태양) */
export const AnimatedMorningSun = () => {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 무한 회전하며 퍼지는 주위 태양 광선 빔 */}
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
      {/* 숨 쉬는 중앙 태양 구체 */}
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

/* 🌙 4. AnimatedEveningMoon (저녁 체크인 웰컴용 별무리 달) */
export const AnimatedEveningMoon = () => {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 둥실 기우는 다크 옐로우 초승달 */}
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
      {/* 주변 반짝이는 아기별들 */}
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

---

## 🛠️ PART 4. GodUI 컴포넌트 실전 설치 및 임포트 사용법 (v10)

모든 기본 UI는 shadcn CLI를 통해 Lucas Bassetti의 **GodUI** 레지스트리에서 원천 코드를 내려받아 구현합니다.

### 1. CLI 설치 명령어
```bash
# 1. 웰컴 및 전환 활성 버튼용 매직 버튼 설치
pnpm dlx shadcn@latest add @godui/magic-button

# 2. 감성 타이포그래피 강조용 오로라 텍스트 설치
pnpm dlx shadcn@latest add @godui/aurora-text

# 3. 마인드짐 프리미엄 카드 레이아웃용 네오모피즘 카드 설치
pnpm dlx shadcn@latest add @godui/neumorph-button
```

### 2. 실전 적용 예시: 대시보드 웰컴 헤더 (`DashboardHeader.tsx`)
Vercel 스타일의 움직이는 SVG `AnimatedMorningSun`과 GodUI의 감성 `AuroraText` 컴포넌트가 유기적으로 조합된 실전 구현 코드입니다.

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
        {/* 이달의 지향점 배지 */}
        <span className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          {currentIntention}
        </span>
        
        {/* GodUI의 AuroraText 효과를 이식한 감성 타이틀 */}
        <h2 className="text-xl font-extrabold text-gray-950 mt-2.5 leading-snug">
          안녕하세요, <br />
          <AuroraText className="from-emerald-500 via-teal-400 to-sky-400 font-black">
            {userName}님
          </AuroraText>
          의 오늘 마음정원입니다.
        </h2>
      </div>

      {/* Vercel 스타일의 회전하는 동적 아침 해 아이콘 */}
      <div className="p-3 bg-amber-50/70  shadow-[0_2px_10px_rgba(245,158,11,0.04)] rounded-full flex items-center justify-center">
        <AnimatedMorningSun size={48} />
      </div>
    </div>
  );
}
```
