"use client";

import React from "react";
import Image from "next/image";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { MagicButton } from "@/components/godui/MagicButton";
import { getRitualDetail } from "@/data/ritualsDetailData";
import { getRitualCategoryTheme } from "@/utils/ritualCategoryTheme";
import { getIconPath } from "@/utils/iconMap";
import { Clock, Trophy, ChartBar, CalendarCheck, Brain } from "@phosphor-icons/react";

interface RitualGuideSheetProps {
  ritualId?: string;
  ritualTitle?: string;
  onClose: () => void;
  onStart?: () => void;
}

/**
 * RitualGuideSheet: 리추얼 가이드(ℹ️) 공통 바텀시트 컴포넌트
 * - 73개 리추얼의 카테고리, 3D 아이콘, 기대 효과, 3단계 실천 가이드, 의학적 원리, 메타 칩을 일관되게 제공
 */
export function RitualGuideSheet({
  ritualId,
  ritualTitle,
  onClose,
  onStart,
}: RitualGuideSheetProps) {
  const detail = getRitualDetail(ritualId || ritualTitle || "RT-001");
  const displayTitle = ritualTitle || detail.title;
  const displayCategory = detail.category;
  const catTheme = getRitualCategoryTheme(displayCategory);
  const iconSrc = detail.iconPath || getIconPath(detail.iconNum);

  return (
    <div
      className="w-full h-full min-h-full bg-theme-app flex flex-col justify-between select-none relative txt-brand-ink transition-colors duration-300 border-none shadow-none"
    >
      {/* 1. 상단 공통 서브페이지 헤더 */}
      <SubPageHeader
        title="리추얼 가이드"
        leftType="close"
        onLeftClick={onClose}
      />

      {/* 2. 본문 스크롤 영역 (충분한 호흡의 여백) */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-6 px-5 pt-4 pb-8 w-full max-w-lg mx-auto text-left">
        {/* 상단 리추얼 기본 정보 영역 (배경 박스 제거 + 대형 3D 아이콘 중앙 배치) */}
        <div className="flex flex-col items-center justify-center text-center gap-3 py-2">
          <div className="relative w-24 h-24 drop-shadow-md">
            <Image
              src={iconSrc}
              alt={displayTitle}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-1.5">
              <span
                className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${catTheme.badgeBg} ${catTheme.badgeText}`}
              >
                {displayCategory}
              </span>
              <span className="text-[11px] font-bold text-theme-muted">
                {detail.id}
              </span>
            </div>
            <h2 className="text-2xl font-black txt-brand-ink tracking-tight">
              {displayTitle}
            </h2>
          </div>
        </div>

        {/* 메타 요약 정방형(정사각형) 4개 칩 바 (시간 / 난이도 / 주기 / 보상) */}
        <div className="grid grid-cols-4 gap-3 text-center">
          <div className="aspect-square flex flex-col items-center justify-center p-2 rounded-2xl bg-amber-100/80 dark:bg-amber-950/60 shadow-2xs">
            <Clock size={20} weight="bold" className="text-amber-800 dark:text-amber-300 mb-1" />
            <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300">소요 시간</span>
            <span className="text-sm font-black text-amber-950 dark:text-amber-100 mt-0.5">{detail.time}</span>
          </div>
          <div className="aspect-square flex flex-col items-center justify-center p-2 rounded-2xl bg-purple-100/80 dark:bg-purple-950/60 shadow-2xs">
            <ChartBar size={20} weight="bold" className="text-purple-800 dark:text-purple-300 mb-1" />
            <span className="text-[11px] font-bold text-purple-800 dark:text-purple-300">난이도</span>
            <span className="text-sm font-black text-purple-950 dark:text-purple-100 mt-0.5">{detail.level}</span>
          </div>
          <div className="aspect-square flex flex-col items-center justify-center p-2 rounded-2xl bg-sky-100/80 dark:bg-sky-950/60 shadow-2xs">
            <CalendarCheck size={20} weight="bold" className="text-sky-800 dark:text-sky-300 mb-1" />
            <span className="text-[11px] font-bold text-sky-800 dark:text-sky-300">실천 주기</span>
            <span className="text-sm font-black text-sky-950 dark:text-sky-100 mt-0.5">{detail.duration}</span>
          </div>
          <div className="aspect-square flex flex-col items-center justify-center p-2 rounded-2xl bg-rose-100/80 dark:bg-rose-950/60 shadow-2xs">
            <Trophy size={20} weight="bold" className="text-rose-800 dark:text-rose-300 mb-1" />
            <span className="text-[11px] font-bold text-rose-800 dark:text-rose-300">덤벨 보상</span>
            <span className="text-sm font-black text-rose-950 dark:text-rose-100 mt-0.5">{detail.reward} DB</span>
          </div>
        </div>

        {/* 섹션 1: 기대 효과 */}
        <div className="flex flex-col gap-2.5">
          <h3 className="text-sm font-black text-slate-900 dark:text-white px-1">
            기대 효과
          </h3>
          <div className="p-6 rounded-2xl bg-theme-card border border-theme-subtle shadow-2xs">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">
              {detail.desc}
            </p>
          </div>
        </div>

        {/* 섹션 2: 3단계 실천 가이드 */}
        {detail.steps && (
          <div className="flex flex-col gap-2.5">
            <h3 className="text-sm font-black text-slate-900 dark:text-white px-1">
              실천 가이드
            </h3>
            <div className="p-6 rounded-2xl bg-theme-card border border-theme-subtle shadow-2xs">
              <div className="flex flex-col gap-4">
                {detail.steps.map((stepText, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 text-sm">
                    <span
                      className={`w-5 h-5 rounded-full ${catTheme.badgeBg} ${catTheme.badgeText} font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs`}
                    >
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed text-slate-800 dark:text-slate-100 font-medium pt-0.5">
                      {stepText}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 섹션 3: 의학적 원리 & 신경과학 메커니즘 (가이드 표준 폰트 크기 text-sm 통일) */}
        {detail.medicalPrinciples && detail.medicalPrinciples.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-1.5 px-1">
              <Brain size={17} weight="bold" className="text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                의학적 원리 및 과학적 메커니즘
              </h3>
            </div>
            <div className="flex flex-col divide-y divide-theme-subtle/60 px-1">
              {detail.medicalPrinciples.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-1 py-3.5 first:pt-1 last:pb-1"
                >
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </span>
                  <p className="text-sm font-normal leading-relaxed text-slate-700 dark:text-slate-200">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. 하단 고정 액션 버튼 (상단 라인 제거 및 넉넉한 하단 여백) */}
      <div className="w-full px-5 pb-7 pt-2.5 max-w-lg mx-auto shrink-0 bg-theme-app">
        <MagicButton
          type="button"
          onClick={() => {
            onClose();
            if (onStart) {
              onStart();
            }
          }}
          style={{ backgroundColor: catTheme.primaryColor }}
          className="w-full text-white font-extrabold text-sm py-3.5 rounded-full shadow-md hover:brightness-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>닫기</span>
        </MagicButton>
      </div>
    </div>
  );
}
