# 🌿 마인드짐(MindGym) v2 감성 모션 컴포넌트 라이브러리 (Framer Motion & Vercel Animated Icons)

본 문서는 **마음 정원(Gentle Garden) v7** 아키텍처에 맞추어, 글로벌 최정상급 애니메이션 라이브러리(**Aceternity UI, Magic UI, Hover.dev, Motion-primitives**) 및 **Vercel Animated Icons** 스타일의 동적 SVG 인터랙션을 이식한 완성형 React/TypeScript 컴포넌트 코드북 v2입니다.

이전 버전에서 제안된 정적인 구조를 넘어, 유저가 마우스를 올리거나 체크인을 달성했을 때 살아 움직이는 듯한 **동적 SVG 인터랙션 컴포넌트 4종**을 전격 탑재했습니다.

---

## 🛠️ 개발 착수 전 필수 설정

```bash
# 필수 라이브러리 설치 (Next.js 14+ 또는 Antigravity 환경)
npm install framer-motion clsx tailwind-merge @phosphor-icons/react lucide-react
```

그리고 `src/lib/utils.ts` 경로에 클래스 병합용 `cn` 유틸 함수가 배치되어 있는지 확인해 주세요.

```typescript
// src/lib/utils.ts
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 🎭 PART 1. Vercel Animated Icons 스타일 동적 SVG 컴포넌트 4종

이 컴포넌트들은 별도의 외부 의존성 패키지 없이, 순수 SVG 소스와 **Framer Motion**의 마이크로 트랜지션만으로 작동하는 초경량 감성 아이콘들입니다. `src/components/animated-icons/` 폴더에 배치하여 사용하세요.

### 🪴 1. `AnimatedSprout.tsx` (자라나는 마음 새싹)
*   **언제 사용하나요?**: **오늘 마음 단련/체크인을 성공적으로 완료한 날짜 타일** 내부에 상주합니다. 활성화되는 순간 줄기가 솟아오르고 양쪽 잎사귀가 스프링 물리로 가볍게 튕기며 개화합니다.

```tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export function AnimatedSprout({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 화분 흙 라인 */}
      <path
        d="M2 22H22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* 줄기 성장 모션 */}
      <motion.path
        d="M12 22V10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* 왼쪽 새싹 잎사귀 (스프링 반동 피치) */}
      <motion.path
        d="M12 14C8 14 5 11 5 8C8 8 12 11 12 14Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={{ scale: 0, originX: 1, originY: 1 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.6 }}
      />

      {/* 오른쪽 새싹 잎사귀 */}
      <motion.path
        d="M12 11C16 11 19 8 19 5C16 5 12 8 12 11Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={{ scale: 0, originX: 0, originY: 1 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.8 }}
      />
    </svg>
  );
}
```

### ☕ 2. `AnimatedCoffeeCup.tsx` (살랑이며 피어오르는 온전한 휴식)
*   **언제 사용하나요?**: **체크인을 쉬어간 날짜 타일(REST_DAY)**에 사용됩니다. 강박을 유발하는 빈칸 대신, 부드럽게 좌우로 흔들리며 무한 루프로 피어오르는 따뜻한 김(Steam) 애니메이션을 통해 유저에게 시각적 안도감을 줍니다.

```tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export function AnimatedCoffeeCup({ size = 24, className = "" }: { size?: number; className?: string }) {
  // 김이 피어오르는 좌우 무한 살랑임 웨이브
  const steamVariants = (delay: number) => ({
    animate: {
      y: [-2, -8],
      x: [0, 1.5, -1.5, 0],
      opacity: [0, 0.8, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }
    }
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 커피잔 본체 */}
      <path
        d="M17 8H4V14C4 17.3 6.7 20 10 20H11C14.3 20 17 17.3 17 14V8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* 잔 손잡이 */}
      <path
        d="M17 10H19C20.7 10 22 11.3 22 13C22 14.7 20.7 16 19 16H17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 잔 받침 접시 */}
      <path
        d="M2 22H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* 무한 온천 스팀 라인 3가닥 */}
      <motion.path
        d="M7 5C7.5 4 7.5 3 7 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={steamVariants(0)}
        animate="animate"
      />
      <motion.path
        d="M10 5C10.5 4 10.5 3 10 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={steamVariants(0.5)}
        animate="animate"
      />
      <motion.path
        d="M13 5C13.5 4 13.5 3 13 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={steamVariants(1.0)}
        animate="animate"
      />
    </svg>
  );
}
```

### ☀️ 3. `AnimatedMorningSun.tsx` (호흡하듯 숨 쉬는 아침 해)
*   **언제 사용하나요?**: **오전 아침 체크인 웰컴 카드 배너** 상단에서 활성화됩니다. 중앙의 해가 부드럽게 팽창 수축하며, 햇살 라인들이 정방향으로 평화롭게 자전 루프를 돕니다.

```tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export function AnimatedMorningSun({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 중앙 태양 알맹이 (숨 쉬듯 맥동) */}
      <motion.circle
        cx="12"
        cy="12"
        r="5"
        fill="currentColor"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />

      {/* 회전하는 햇빛 빔 (자전 모션) */}
      <motion.g
        style={{ originX: "12px", originY: "12px" }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="4.2" y1="4.2" x2="5.6" y2="5.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="18.4" y1="18.4" x2="19.8" y2="19.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="4.2" y1="19.4" x2="5.6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="18.4" y1="5.6" x2="19.8" y2="4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}
```

### 🌙 4. `AnimatedEveningMoon.tsx` (반짝이는 은하수 초승달)
*   **언제 사용하나요?**: **저녁 회고 정산 피드백 배너 및 마인드 카드**에서 활용됩니다. 달이 은은하게 각도를 기웃거리는 동안, 옆의 작은 사각별 2개가 엇박자로 깜빡거리며 영롱한 저녁 감성을 극대화합니다.

```tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export function AnimatedEveningMoon({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 기우뚱 흔들리는 초승달 */}
      <motion.path
        d="M12 3C10.5 4.5 9.5 6.5 9.5 9C9.5 14 13.5 18 18.5 18C19.5 18 20.5 17.7 21.3 17.2C19.8 19.5 17.3 21 14.3 21C9.3 21 5.3 17 5.3 12C5.3 7.5 8.5 3.8 12 3Z"
        fill="currentColor"
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />

      {/* 반짝이는 별 1 */}
      <motion.path
        d="M19 3L19.5 4.5L21 5L19.5 5.5L19 7L18.5 5.5L17 5L18.5 4.5L19 3Z"
        fill="currentColor"
        animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", delay: 0.2 }}
      />

      {/* 반짝이는 별 2 */}
      <motion.path
        d="M21 9L21.3 10L22.3 10.3L21.3 10.6L21 11.6L20.7 10.6L19.7 10.3L20.7 10L21 9Z"
        fill="currentColor"
        animate={{ scale: [1.2, 0.5, 1.2], opacity: [1, 0.2, 1] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.8 }}
      />
    </svg>
  );
}
```

---

## 📅 PART 2. 동적 아이콘이 주입된 마음 정원 달력 (`MindGardenCalendarV2.tsx`)

위의 Vercel Animated Icons 스타일 모션을 실시간으로 주입하여, 단순 이모지 대신 고퀄리티 벡터 그래픽이 직접 반응하고 살아 움직이는 달력 컴포넌트 실전 완성판입니다.

```tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSprout } from "./animated-icons/AnimatedSprout";
import { AnimatedCoffeeCup } from "./animated-icons/AnimatedCoffeeCup";
import { cn } from "@/lib/utils";

interface DayTile {
  day: number;
  status: "completed" | "rest" | "empty";
  ritualTitle?: string;
}

export default function MindGardenCalendarV2() {
  const [selectedDay, setSelectedDay] = useState<DayTile | null>(null);

  const augustDays: DayTile[] = [
    { day: 1, status: "completed", ritualTitle: "나를 깨우는 3분 박스호흡" },
    { day: 2, status: "completed", ritualTitle: "긴장 완화 점심 걷기 정화" },
    { day: 3, status: "rest" }, // 자연스러운 휴식 (커피컵 무한 동적 스팀)
    { day: 4, status: "completed", ritualTitle: "감정 비우기 밤 일기 쓰기" },
    { day: 5, status: "completed", ritualTitle: "마음 가라앉히는 소리 명상" },
    { day: 6, status: "completed", ritualTitle: "신체 감각 바디스캔 이완" },
    { day: 7, status: "rest" }, // 바쁜 야근 후 보장받은 감동의 Rest Day
    { day: 8, status: "empty" },
    { day: 9, status: "empty" },
    { day: 10, status: "empty" },
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-[32px] p-6 border border-gray-100 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-950">8월의 마음 정원</h3>
          <p className="text-xs text-gray-500">총 5일 실천 완료 · 2일의 따뜻한 쉼 ☕</p>
        </div>
        <span className="text-xs px-3 py-1 bg-emerald-50 text-emerald-600 font-semibold rounded-full">🪴 동적 테마</span>
      </div>

      <div className="grid grid-cols-7 gap-2.5 mb-6">
        {["일", "월", "화", "수", "목", "금", "토"].map((w) => (
          <div key={w} className="text-center text-xs font-semibold text-gray-400 py-1">{w}</div>
        ))}

        {augustDays.map((tile, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => tile.status !== "empty" && setSelectedDay(tile)}
            className={cn(
              "relative aspect-square rounded-[18px] flex flex-col items-center justify-center transition-all border",
              tile.status === "completed" && "bg-emerald-50/50 border-emerald-100 text-emerald-600",
              tile.status === "rest" && "bg-amber-50/50 border-amber-100 text-amber-700",
              tile.status === "empty" && "bg-gray-50/30 border-gray-100/50 text-gray-300 pointer-events-none"
            )}
          >
            <span className="absolute top-1 left-1.5 text-[9px] opacity-60 font-bold">{tile.day}</span>
            <div className="mt-2">
              {tile.status === "completed" && (
                <AnimatedSprout size={18} className="text-emerald-500" />
              )}
              {tile.status === "rest" && (
                <AnimatedCoffeeCup size={18} className="text-amber-600" />
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* 타일 디테일 바텀 바 */}
      <AnimatePresence mode="wait">
        {selectedDay && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={cn(
              "p-4 rounded-2xl border flex items-center justify-between gap-3",
              selectedDay.status === "completed" ? "bg-emerald-50/40 border-emerald-100/60" : "bg-amber-50/40 border-amber-100/60"
            )}
          >
            <div className="flex gap-3 items-center">
              {selectedDay.status === "completed" ? (
                <AnimatedSprout size={24} className="text-emerald-500" />
              ) : (
                <AnimatedCoffeeCup size={24} className="text-amber-600" />
              )}
              <div>
                <span className="text-[10px] text-gray-400 font-semibold">{selectedDay.day}일의 기록</span>
                <p className="text-sm font-bold text-gray-800">
                  {selectedDay.status === "completed" ? selectedDay.ritualTitle : "무리하지 않고 잘 쉬어간 온전한 휴식일"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedDay(null)}
              className="text-xs font-bold text-gray-400 hover:text-gray-600 px-2 py-1"
            >
              닫기
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```
