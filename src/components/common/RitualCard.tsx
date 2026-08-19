"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BookBookmark,
  Brain,
  Notebook,
  SunDim,
  Sparkle,
  Feather,
  Heart,
  Flame,
  Smiley,
  CheckCircle,
  CaretRight,
  Lightbulb,
  IconProps,
} from "@phosphor-icons/react";

// Phosphor Icon 타입 정의 및 매핑
export type RitualIconType =
  | "book"
  | "brain"
  | "notebook"
  | "sun"
  | "sparkle"
  | "feather"
  | "heart"
  | "flame"
  | "smiley";

const iconMap: Record<RitualIconType, React.ComponentType<IconProps>> = {
  book: BookBookmark,
  brain: Brain,
  notebook: Notebook,
  sun: SunDim,
  sparkle: Sparkle,
  feather: Feather,
  heart: Heart,
  flame: Flame,
  smiley: Smiley,
};

// SVG 멀티컬러 (초록-핑크-파랑) 그라데이션 & 겹침 opacity 아이콘 렌더러
function GradientRitualIcon({
  icon: IconComponent,
  size = 52,
  iconType = "notebook",
}: {
  icon: React.ComponentType<IconProps>;
  size?: number;
  iconType?: RitualIconType;
}) {
  const gradientId = `ritual-tri-grad-${iconType}`;

  return (
    <div className="relative inline-flex items-center justify-center shrink-0">
      <svg width="0" height="0" className="absolute opacity-0 pointer-events-none">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            {/* 초록(#00C474) ➔ 핑크(#EC4899) ➔ 파랑(#3B82F6) 3색 그라데이션 */}
            <stop offset="0%" stopColor="#00C474" />
            <stop offset="50%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </svg>
      <IconComponent
        size={size}
        weight="duotone"
        style={{
          color: `url(#${gradientId})`,
          fill: `url(#${gradientId})`,
          stroke: `url(#${gradientId})`,
        }}
        className="[--ph-duotone-opacity:0.55] filter drop-shadow-xs"
      />
    </div>
  );
}

export interface RitualCardProps {
  id?: string;
  title?: string;
  dailyTime?: string;
  level?: string;
  duration?: string;
  reward?: string;
  description?: string;
  icon?: RitualIconType;
  variant?: "detailed" | "compact" | "icon-only" | "pure-icon" | "icon-pure" | "raw-icon" | "icon-raw";
  size?: number;
  selected?: boolean;
  badge?: string;
  categoryTag?: string;
  onClick?: () => void;
  className?: string;
}

export function RitualCard({
  title = "",
  dailyTime = "하루 5분",
  level = "중급",
  duration = "한달 지속",
  reward = "+30",
  description,
  icon = "notebook",
  variant = "detailed",
  size,
  selected = false,
  badge,
  categoryTag,
  onClick,
  className = "",
}: RitualCardProps) {
  const IconComponent = iconMap[icon] || Notebook;

  // 0-A. hover/아래텍스트/테두리가 완전히 없는 순수 단독 그래픽 아이콘 버전 (raw-icon / icon-raw)
  if (variant === "raw-icon" || variant === "icon-raw") {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center justify-center shrink-0 select-none ${onClick ? "cursor-pointer" : ""} ${className}`}
      >
        <GradientRitualIcon icon={IconComponent} size={size || 44} iconType={icon} />
      </div>
    );
  }

  // 0-B. 박스가 없는 순수 아이콘 버전을 버튼 형태로 지원 (pure-icon / icon-pure)
  if (variant === "pure-icon" || variant === "icon-pure") {
    return (
      <motion.button
        type="button"
        whileTap={{ scale: 0.96 }}
        onClick={onClick}
        className={`relative inline-flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-200 shrink-0 hover:bg-emerald-50/50 active:bg-emerald-100/50 outline-none ${className}`}
        title={title}
      >
        <GradientRitualIcon icon={IconComponent} size={size || 44} iconType={icon} />
        {title && (
          <span className="text-xs font-bold text-gray-800 tracking-tight mt-1 line-clamp-1">
            {title}
          </span>
        )}
        {badge && (
          <span className="absolute -top-1 -right-1 text-[9px] font-black bg-[#00C473] text-white px-1.5 py-0.5 rounded-full shadow-xs">
            {badge}
          </span>
        )}
      </motion.button>
    );
  }

  // 1. 아이콘 전용 컴팩트 미니 버전 (icon-only - 2px border & Forest Green hover/active)
  if (variant === "icon-only") {
    return (
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={onClick}
        className={`relative flex items-center justify-center p-4 rounded-2xl transition-all duration-200 shrink-0 border-2 ${
          selected
            ? "bg-[#E9F8F0] border-[#005A34]"
            : "bg-white border-gray-200 hover:border-[#005A34] active:border-[#005A34]"
        } ${className}`}
      >
        <GradientRitualIcon icon={IconComponent} size={42} iconType={icon} />
        {badge && (
          <span className="absolute -top-1.5 -right-1.5 text-[9px] font-black bg-[#00C473] text-white px-1.5 py-0.5 rounded-full shadow-xs">
            {badge}
          </span>
        )}
      </motion.button>
    );
  }

  // 2. 한 줄 컴팩트 칩 형태 (compact - 1px border & Forest Green hover/active)
  if (variant === "compact") {
    return (
      <motion.div
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`cursor-pointer p-3.5 rounded-2xl flex items-center justify-between transition-all duration-200 border ${
          selected
            ? "bg-[#E9F8F0] border-[#005A34]"
            : "bg-white border-gray-200 hover:border-[#005A34] active:border-[#005A34]"
        } ${className}`}
      >
        <div className="flex items-center gap-3">
          <GradientRitualIcon icon={IconComponent} size={32} iconType={icon} />
          <div className="flex flex-col text-left">
            <span className="text-xs font-black text-gray-900 leading-tight">{title}</span>
            <span className="text-[10px] font-bold text-[#005A34] mt-0.5">
              {dailyTime} · {level} · {duration}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {reward && (
            <span className="text-[10px] font-extrabold text-[#005A34] bg-[#E9F8F0] px-2 py-0.5 rounded-md border border-[#00C473]/30">
              {reward}
            </span>
          )}
          {selected ? (
            <CheckCircle size={18} className="text-[#00C473]" weight="fill" />
          ) : (
            <CaretRight size={16} className="text-gray-400" />
          )}
        </div>
      </motion.div>
    );
  }

  // 3. 상세 정보가 포함된 대표 리추얼 카드 (detailed - 2px border & Forest Green hover/active)
  return (
    <div
      onClick={onClick}
      className={`p-5 bg-white rounded-2xl flex flex-col gap-3.5 relative overflow-hidden text-left cursor-pointer transition-all duration-200 border-2 ${
        selected
          ? "bg-[#E9F8F0] border-[#005A34]"
          : "border-gray-200 hover:border-[#005A34] active:border-[#005A34]"
      } ${className}`}
    >
      {/* 상단 태그 헤더 */}
      {categoryTag && (
        <div className="flex justify-between items-center z-10 mb-0.5">
          <span className="text-sm font-bold text-[#00C474] flex items-center gap-1.5">
            <Sparkle size={16} weight="fill" />
            {categoryTag}
          </span>
          {badge && (
            <span className="text-xs font-black text-emerald-700 bg-white/80 px-2.5 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* 리추얼 카드 메인 콘텐츠 바디 */}
      <div className="flex flex-col gap-3.5 z-10">
        {/* 상단 1열: 아이콘 + 타이틀 + 체크표시 */}
        <div className="flex items-center gap-3">
          <GradientRitualIcon icon={IconComponent} size={44} iconType={icon} />
          <span className="text-xl font-bold text-gray-900 tracking-tight flex-1">{title}</span>
          {selected && <CheckCircle size={24} className="text-[#00C474] shrink-0" weight="fill" />}
        </div>

        {/* 4개 개별 멀티컬러 정사각형 칩 (radius: rounded-xl) */}
        <div className="flex items-center justify-start gap-1.5">
          {dailyTime && (
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-100/90 border border-amber-300/60 text-center shadow-2xs shrink-0">
              <span className="text-xs font-bold text-gray-900">
                {dailyTime.replace("하루 ", "")}
              </span>
            </div>
          )}
          {level && (
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-100/90 border border-purple-300/60 text-center shrink-0">
              <span className="text-xs font-bold text-gray-900">{level}</span>
            </div>
          )}
          {duration && (
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-sky-100/90 border border-sky-300/60 text-center shrink-0">
              <span className="text-xs font-bold text-gray-900">
                {duration.replace(" 지속", "")}
              </span>
            </div>
          )}
          {reward && (
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-rose-200/90 border border-rose-300/60 text-center shadow-xs shrink-0">
              <span className="text-xs font-bold text-gray-900">
                {reward.replace(" 덤벨", "").replace("/월", "")}
              </span>
            </div>
          )}
        </div>

        {/* 상세 설명 가이드 (Phosphor Lightbulb & text-sm 폰트 확대) */}
        {description && (
          <div className="flex items-start gap-2.5 bg-white/95 p-3.5 rounded-xl border border-emerald-100/60 shadow-2xs">
            <Lightbulb size={20} className="text-[#00C474] shrink-0 mt-0.5" weight="fill" />
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
