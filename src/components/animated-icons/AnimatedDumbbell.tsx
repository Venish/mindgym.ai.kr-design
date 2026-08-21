"use client";

import React, { useId } from "react";

export type DumbbellLevel =
  | "wood" // 1. 나무 덤벨 (빛 모션 없음)
  | "stone" // 2. 돌 덤벨 (빛 모션 없음)
  | "bronze" // 3. 청동 덤벨 (빛 모션 없음)
  | "iron" // 4. 철 덤벨 (바깥 원판 빛 흐름 모션 ✨)
  | "silver" // 5. 은 덤벨 (바깥 원판 실버 빛 흐름 모션 ✨)
  | "gold" // 6. 금 덤벨 (바깥 원판 골드 빛 흐름 모션 ✨)
  | "platinum" // 7. 플래티넘 덤벨 (바깥 원판 프리미엄 빛 흐름 모션 ✨)
  | number; // 숫자 레벨 1~7 지원

interface DumbbellIconProps {
  size?: number;
  level?: DumbbellLevel;
  className?: string;
}

/** 덤벨 레벨별 고유 컬러 팔레트 및 효과 제어 정의 */
const LEVEL_PALETTES: Record<
  string,
  {
    outerGrad: [string, string, string, string]; // 바깥 원판 4단계 수직 그라데이션
    innerGrad: [string, string, string]; // 안쪽 원판 & Bar 3단계 수직 그라데이션
    shineColor: string; // 빛 흐름 그라데이션 컬러
    name: string;
    hasShine: boolean; // 철(Iron) 이상 레벨부터 대각선 빛 흐름 적용
  }
> = {
  // Level 1: 나무 덤벨 (Wood)
  wood: {
    name: "나무 덤벨",
    outerGrad: ["#D4A373", "#BC8A5F", "#A47148", "#8B5E34"],
    innerGrad: ["#E6CCB2", "#D4A373", "#A47148"],
    shineColor: "#FFFFFF",
    hasShine: false,
  },
  // Level 2: 돌 덤벨 (Stone)
  stone: {
    name: "돌 덤벨",
    outerGrad: ["#A8B5A2", "#95A38F", "#7F8D79", "#6B7965"],
    innerGrad: ["#C4D1BE", "#A8B5A2", "#7F8D79"],
    shineColor: "#FFFFFF",
    hasShine: false,
  },
  // Level 3: 청동 덤벨 (Bronze)
  bronze: {
    name: "청동 덤벨",
    outerGrad: ["#E09F67", "#C8854D", "#B06C35", "#965420"],
    innerGrad: ["#F2BA8C", "#E09F67", "#B06C35"],
    shineColor: "#FFE5D4",
    hasShine: false,
  },
  // Level 4: 철 덤벨 (Iron - 빛 흐름 모션 적용)
  iron: {
    name: "철 덤벨",
    outerGrad: ["#B0B7C3", "#9DA5B2", "#808997", "#6E7684"],
    innerGrad: ["#C2C9D5", "#B2B9C5", "#9DA4B0"],
    shineColor: "#FFFFFF",
    hasShine: true,
  },
  // Level 5: 은 덤벨 (Silver - 실버 빛 흐름 모션 적용)
  silver: {
    name: "은 덤벨",
    outerGrad: ["#E2E8F0", "#CBD5E1", "#94A3B8", "#64748B"],
    innerGrad: ["#F1F5F9", "#E2E8F0", "#CBD5E1"],
    shineColor: "#FFFFFF",
    hasShine: true,
  },
  // Level 6: 금 덤벨 (Gold - 골드 빛 흐름 모션 적용)
  gold: {
    name: "금 덤벨",
    outerGrad: ["#FCD34D", "#F59E0B", "#D97706", "#B45309"],
    innerGrad: ["#FDE68A", "#FCD34D", "#D97706"],
    shineColor: "#FFFBEB",
    hasShine: true,
  },
  // Level 7: 플래티넘 덤벨 (Platinum - 플래티넘 프리미엄 빛 흐름 모션 적용)
  platinum: {
    name: "플래티넘 덤벨",
    outerGrad: ["#6EE7B7", "#10B981", "#059669", "#047857"],
    innerGrad: ["#A7F3D0", "#34D399", "#059669"],
    shineColor: "#ECFDF5",
    hasShine: true,
  },
};

/** 숫자 레벨 1~7을 문자열 레벨 키로 매핑 */
function resolveLevelKey(level: DumbbellLevel): string {
  if (typeof level === "number") {
    if (level <= 1) return "wood";
    if (level === 2) return "stone";
    if (level === 3) return "bronze";
    if (level === 4) return "iron";
    if (level === 5) return "silver";
    if (level === 6) return "gold";
    return "platinum";
  }
  return LEVEL_PALETTES[level] ? level : "iron";
}

/**
 * 덤벨(Dumbbell) 아이콘 SVG 컴포넌트
 * - 철(Iron, Lv.4) 이상: 바깥 원판 소프트 대각선 빛 흐름 모션 (좌 ➔ 우 0.5s 시차 릴레이)
 */
export const DumbbellIcon: React.FC<DumbbellIconProps> = ({
  size = 64,
  level = "iron",
  className = "",
}) => {
  const levelKey = resolveLevelKey(level);
  const palette = LEVEL_PALETTES[levelKey] || LEVEL_PALETTES.iron;
  const instanceId = useId().replace(/:/g, "");

  const outerGradId = `db-outer-${levelKey}-${instanceId}`;
  const innerGradId = `db-inner-${levelKey}-${instanceId}`;
  const diagBeamGradId = `db-diag-${levelKey}-${instanceId}`;
  const leftMaskId = `db-lmask-${levelKey}-${instanceId}`;
  const rightMaskId = `db-rmask-${levelKey}-${instanceId}`;

  return (
    <svg
      width={size}
      height={Math.round(size / 2)}
      viewBox="0 0 600 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-200 ease-out active:scale-[0.96] ${className}`}
    >
      <defs>
        {/* 바깥 원판 빛 흐름 수직 이동 애니메이션 (우측 0.5s 지연) */}
        {palette.hasShine && (
          <style>{`
            @keyframes dumbbellYDownSweep {
              0% {
                transform: translate3d(0, -220px, 0);
                opacity: 0;
              }
              15% {
                opacity: 0.85;
              }
              50% {
                transform: translate3d(0, 260px, 0);
                opacity: 0;
              }
              100% {
                transform: translate3d(0, 260px, 0);
                opacity: 0;
              }
            }
            .plate-down-sweep-left-${levelKey} {
              will-change: transform, opacity;
              animation: dumbbellYDownSweep 4.2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
            }
            .plate-down-sweep-right-${levelKey} {
              will-change: transform, opacity;
              animation: dumbbellYDownSweep 4.2s cubic-bezier(0.25, 1, 0.5, 1) 0.5s infinite;
            }
          `}</style>
        )}

        {/* 바깥쪽 메인 원판 수직 그라데이션 */}
        <linearGradient id={outerGradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={palette.outerGrad[0]} />
          <stop offset="30%" stopColor={palette.outerGrad[1]} />
          <stop offset="65%" stopColor={palette.outerGrad[2]} />
          <stop offset="100%" stopColor={palette.outerGrad[3]} />
        </linearGradient>

        {/* 내부 Bar 및 안쪽 원판 수직 그라데이션 */}
        <linearGradient id={innerGradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={palette.innerGrad[0]} />
          <stop offset="50%" stopColor={palette.innerGrad[1]} />
          <stop offset="100%" stopColor={palette.innerGrad[2]} />
        </linearGradient>

        {/* ★ 좌측 바깥 원판 전용 마스크 ★ */}
        {palette.hasShine && (
          <mask id={leftMaskId}>
            <rect x="70" y="45" width="74" height="210" rx="24" fill="#FFFFFF" />
          </mask>
        )}

        {/* ★ 우측 바깥 원판 전용 마스크 ★ */}
        {palette.hasShine && (
          <mask id={rightMaskId}>
            <rect x="456" y="45" width="74" height="210" rx="24" fill="#FFFFFF" />
          </mask>
        )}

        {/* 대각선 사선 소프트 아우라 그라데이션 */}
        {palette.hasShine && (
          <linearGradient id={diagBeamGradId} x1="0%" y1="-12%" x2="100%" y2="88%">
            <stop offset="0%" stopColor={palette.shineColor} stopOpacity="0" />
            <stop offset="20%" stopColor={palette.shineColor} stopOpacity="0.12" />
            <stop offset="40%" stopColor={palette.shineColor} stopOpacity="0.6" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="60%" stopColor={palette.shineColor} stopOpacity="0.6" />
            <stop offset="80%" stopColor={palette.shineColor} stopOpacity="0.12" />
            <stop offset="100%" stopColor={palette.shineColor} stopOpacity="0" />
          </linearGradient>
        )}
      </defs>

      <g>
        {/* 1. 베이스 덤벨 쉐이프 */}
        {/* 바깥쪽 메인 원판 (Outer Plates) */}
        <rect x="70" y="45" width="74" height="210" rx="24" fill={`url(#${outerGradId})`} />
        <rect x="456" y="45" width="74" height="210" rx="24" fill={`url(#${outerGradId})`} />

        {/* 내부 요소 (Center Bar & Inner Plates) */}
        <rect x="180" y="129" width="240" height="42" fill={`url(#${innerGradId})`} />
        <rect x="140" y="75" width="46" height="150" rx="16" fill={`url(#${innerGradId})`} />
        <rect x="414" y="75" width="46" height="150" rx="16" fill={`url(#${innerGradId})`} />

        {/* 2. 철(Iron) 이상 레벨 전용: 바깥 원판 빛 흐름 모션 */}
        {palette.hasShine && (
          <>
            {/* 좌측 바깥 원판 (x=70) 빛 스위프 */}
            <g mask={`url(#${leftMaskId})`}>
              <rect
                className={`plate-down-sweep-left-${levelKey}`}
                x="40"
                y="-150"
                width="134"
                height="350"
                fill={`url(#${diagBeamGradId})`}
              />
            </g>

            {/* 우측 바깥 원판 (x=456) 빛 스위프 (0.5s 지연 릴레이) */}
            <g mask={`url(#${rightMaskId})`}>
              <rect
                className={`plate-down-sweep-right-${levelKey}`}
                x="426"
                y="-150"
                width="134"
                height="350"
                fill={`url(#${diagBeamGradId})`}
              />
            </g>
          </>
        )}
      </g>
    </svg>
  );
};

export const AnimatedDumbbell = DumbbellIcon;
export default DumbbellIcon;
