"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getIconPath } from "@/utils/iconMap";
import { LockedOverlay } from "@/components/ui/LockedOverlay";

export type GlassIconBorderOption = "1" | "2" | "3" | "4"; 
// 1: Soft Mint Rim, 2: Refined Slate Rim, 3: Ice Frost Rim, 4: Rainbow Aurora Rim (컬러풀 예전 버전)

export interface RitualGlassIconCardProps {
  /** 리추얼 아이콘 명 (예: "미소 명상") */
  name: string;
  /** 아이콘 파일명 또는 경로 또는 ID (예: "001_미소명상.png", "/images/icons/1.png", "RT-001", 1) */
  icon: string | number;
  /** 옵션 태그 (예: "1분 · 명상") */
  tag?: string;
  /** 테두리 림 옵션 (1: Soft Mint, 2: Refined Slate, 3: Ice Frost, 4: Rainbow Aurora 컬러풀 예전버전) */
  borderOption?: GlassIconBorderOption;
  /** 카드 및 아이콘 규격 사이즈 ("sm": 3.6rem 푸터전용, "md": 5rem 기본, "lg": 6rem 대형) */
  size?: "sm" | "md" | "lg";
  /** 테마 ("light" | "dark") */
  theme?: "light" | "dark";
  /** 옵션 라벨 뱃지 노출 여부 (디자인 가이드 쇼케이스용) */
  showOptionBadge?: boolean;
  /** 오픈 전 잠금 상태 여부 (true인 경우 센터 자물쇠 오버레이 표출 및 클릭 불가) */
  isLocked?: boolean;
  /** 잠금 클릭 시 안내 툴팁 또는 클릭 이벤트 핸들러 */
  onClick?: () => void;
  /** 추가 커스텀 클래스 */
  className?: string;
}

/**
 * RitualGlassIconCard: 마음건강 리추얼 아이콘 카드 공통 컴포넌트 (Flat 모던 디자인 + 정중앙 잠금 오버레이)
 */
export function RitualGlassIconCard({
  name,
  icon,
  tag,
  borderOption = "1",
  size = "md",
  theme = "light",
  showOptionBadge = false,
  isLocked = false,
  onClick,
  className = "",
}: RitualGlassIconCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const iconSrc = getIconPath(icon);

  // 라이트/다크 테마별 & 옵션별 평상시 테두리 림 컬러
  const defaultRimColor =
    borderOption === "4"
      ? "var(--glass-rainbow-conic)"
      : theme === "dark"
      ? borderOption === "1"
        ? "var(--glass-rim-dark-mint)"
        : borderOption === "2"
        ? "var(--glass-rim-dark-slate)"
        : "var(--glass-rim-dark-frost)"
      : borderOption === "1"
      ? "var(--glass-rim-soft-mint)"
      : borderOption === "2"
      ? "var(--glass-rim-refined-slate)"
      : "var(--glass-rim-ice-frost)";

  const optionLabel =
    borderOption === "1"
      ? "1. Soft Mint"
      : borderOption === "2"
      ? "2. Refined Slate"
      : borderOption === "3"
      ? "3. Ice Frost"
      : "4. Rainbow Aurora";

  // size 옵션별 규격 스타일 매핑
  const boxSizeStyle =
    size === "sm"
      ? "w-[3.6rem] h-[3.6rem]"
      : size === "lg"
      ? "w-[6rem] h-[6rem]"
      : "glass-3d-box";

  const iconSizeStyle =
    size === "sm"
      ? "w-[2.75rem] h-[2.75rem]"
      : size === "lg"
      ? "w-[4.8rem] h-[4.8rem]"
      : "glass-core-icon";

  const textSizeStyle =
    size === "sm"
      ? "text-[9.5px] tracking-tighter leading-tight"
      : size === "lg"
      ? "text-[0.8125rem]"
      : "text-[0.6875rem]";

  const lockIconSize = size === "sm" ? 14 : size === "lg" ? 22 : 18;

  const handleClick = (e: React.MouseEvent) => {
    if (isLocked) {
      e.stopPropagation();
      return;
    }
    onClick?.();
  };

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center rounded-[1rem] p-0 bg-transparent border-none shadow-none ${
        isLocked ? "cursor-not-allowed select-none" : ""
      } ${className}`}
      title={isLocked ? `[아직 오픈 안 함] ${name}` : name}
    >
      {/* 쇼케이스용 옵션 라벨 뱃지 */}
      {showOptionBadge && (
        <span className="text-[0.5625rem] font-bold text-slate-400 mb-[0.25rem] font-mono">
          {optionLabel}
        </span>
      )}

      {/* 아이콘과 아이콘 명 묶음 (Hover Target) */}
      <div
        className={`flex flex-col items-center justify-center group w-full ${
          isLocked ? "cursor-not-allowed opacity-80" : "cursor-pointer"
        }`}
        onMouseEnter={() => !isLocked && setIsHovered(true)}
        onMouseLeave={() => !isLocked && setIsHovered(false)}
      >
        {/* Flat Card Box Container */}
        <div className={`relative ${boxSizeStyle} flex items-center justify-center`}>
          {/* Main Flat Base */}
          <div
            className={`relative ${boxSizeStyle} flex items-center justify-center overflow-hidden ${
              theme === "dark" ? "glass-base-dark" : "glass-base-light"
            }`}
          >
            {/* Rim Mask */}
            <div className="absolute inset-0 rounded-[inherit] glass-rim-mask-layer opacity-90 pointer-events-none overflow-hidden">
              {/* Bezel */}
              <div
                className="absolute top-[-60%] left-[-60%] w-[220%] h-[220%]"
                style={{
                  background: isHovered
                    ? "var(--glass-rainbow-conic)"
                    : defaultRimColor,
                  animationName: isHovered ? "waterRotateStudio" : "none",
                  animationDuration: "4s",
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                }}
              />
            </div>

            {/* Specular Light Reflection */}
            <div
              className={`absolute top-[0.25rem] left-[0.5rem] right-[0.5rem] h-[38%] rounded-t-full pointer-events-none z-10 ${
                theme === "dark" ? "glass-specular-dark" : "glass-specular-light"
              }`}
            />

            {/* Core Icon Image */}
            <div className={`relative ${iconSizeStyle} z-20 ${isLocked ? "opacity-60 grayscale-[20%]" : ""}`}>
              <Image
                src={iconSrc}
                alt={name}
                fill
                className="object-contain"
              />
            </div>

            {/* ================= 공통 정중앙 자물쇠 오버레이 (isLocked === true) ================= */}
            {isLocked && <LockedOverlay iconSize={lockIconSize} />}
          </div>
        </div>

        {/* 아이콘 명 */}
        <span
          className={`${textSizeStyle} font-bold transition-colors mt-[0.25rem] text-center truncate w-full ${
            isLocked
              ? "text-gray-400"
              : theme === "dark"
              ? "text-slate-300 group-hover:text-cyan-300"
              : "text-gray-700 group-hover:text-[#00C474]"
          }`}
        >
          {name}
        </span>
      </div>

      {/* 태그 */}
      {tag && (
        <span
          className={`text-[0.625rem] font-bold mt-[0.25rem] px-[0.625rem] py-[0.125rem] rounded-full ${
            isLocked
              ? "text-gray-400 bg-gray-100 border border-gray-200"
              : theme === "dark"
              ? "text-cyan-300 bg-cyan-950/80 border border-cyan-500/40"
              : "text-indigo-700 bg-indigo-50 border border-indigo-200"
          }`}
        >
          {isLocked ? "오픈 예정 🔒" : tag}
        </span>
      )}

      <style>{`
        @keyframes waterRotateStudio {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// 1. Soft Mint 전용 컴포넌트
export function RitualSoftMintIconCard(
  props: Omit<RitualGlassIconCardProps, "borderOption">
) {
  return <RitualGlassIconCard {...props} borderOption="1" />;
}

// 2. Refined Slate 전용 컴포넌트
export function RitualSlateIconCard(
  props: Omit<RitualGlassIconCardProps, "borderOption">
) {
  return <RitualGlassIconCard {...props} borderOption="2" />;
}

// 3. Ice Frost 전용 컴포넌트
export function RitualIceFrostIconCard(
  props: Omit<RitualGlassIconCardProps, "borderOption">
) {
  return <RitualGlassIconCard {...props} borderOption="3" />;
}

// 4. Rainbow Aurora (컬러풀 예전 버전) 전용 컴포넌트
export function RitualRainbowIconCard(
  props: Omit<RitualGlassIconCardProps, "borderOption">
) {
  return <RitualGlassIconCard {...props} borderOption="4" />;
}
