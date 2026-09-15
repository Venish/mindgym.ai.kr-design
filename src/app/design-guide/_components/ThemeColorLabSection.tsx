"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Sparkle,
  CheckCircle,
  Eye,
  SlidersHorizontal,
  Flame,
  Star,
  ArrowsClockwise,
} from "@phosphor-icons/react";
import { useThemeStore, THEME_PRESETS, ThemeMode } from "@/store/useThemeStore";
import { getIconPath } from "@/utils/iconMap";

/**
 * ThemeColorLabSection: 디자인 가이드 최상단에서 5가지 테마를 실시간으로 전환하고
 * 리추얼 카드, 뱃지, 타이틀, 미니 대시보드가 어떻게 변하는지 직관적으로 비교 관찰하는 프리뷰 스튜디오
 */
export function ThemeColorLabSection() {
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="theme-color-lab" className="scroll-mt-24 space-y-6">
      {/* 1. 섹션 헤더 */}
      <div className="border-b border-theme-subtle pb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black rounded-full shadow-2xs">
              🎨 REALTIME COLOR LAB
            </span>
            <span className="text-xs font-mono font-bold text-gray-500">
              OKLCH & Balanced Wellness Presets
            </span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mt-2 tracking-tight flex items-center gap-2">
            다채로운 웰니스 컬러 테마 프리뷰 스튜디오
          </h2>
          <p className="text-xs font-medium text-gray-500 mt-1">
            카드를 클릭하면 <strong>전체 화면(디자인 가이드 & 대시보드)</strong>의 배경, 폰트 명도 대비, 리추얼 카드가 즉시 실시간으로 전환됩니다.
          </p>
        </div>

        {/* 현재 활성화된 테마 뱃지 */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-theme-subtle shadow-2xs">
          <span className="w-3 h-3 rounded-full bg-brand-green animate-pulse" />
          <span className="text-xs font-bold text-gray-600">현재 테마:</span>
          <span className="text-xs font-extrabold text-gray-900 font-mono">
            {THEME_PRESETS.find((p) => p.id === theme)?.name || theme}
          </span>
        </div>
      </div>

      {/* 2. 5가지 테마 선택 카드 덱 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {THEME_PRESETS.map((preset) => {
          const isActive = theme === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => setTheme(preset.id)}
              className={`p-4 rounded-2xl flex flex-col justify-between text-left transition-all duration-200 cursor-pointer active:scale-[0.97] border relative group overflow-hidden ${
                isActive
                  ? "bg-white border-brand-green ring-2 ring-brand-green/25 shadow-md scale-[1.02]"
                  : "bg-theme-card border-theme-subtle hover:border-gray-300 hover:shadow-xs"
              }`}
            >
              {/* 상단 컬러 팔레트 서클 3종 프리뷰 */}
              <div className="flex items-center justify-between w-full mb-3">
                <div className="flex items-center -space-x-1.5">
                  <div
                    className="w-6 h-6 rounded-full border border-black/10 shadow-2xs"
                    style={{ backgroundColor: preset.bgHex }}
                    title={`배경: ${preset.bgHex}`}
                  />
                  <div
                    className="w-6 h-6 rounded-full border border-black/10 shadow-2xs"
                    style={{ backgroundColor: preset.cardSubtleHex }}
                    title={`서브 카드: ${preset.cardSubtleHex}`}
                  />
                  <div
                    className="w-6 h-6 rounded-full border border-black/10 shadow-2xs"
                    style={{ backgroundColor: preset.accentHex }}
                    title={`브랜드 포인트: ${preset.accentHex}`}
                  />
                </div>

                {/* 활성화 체크 */}
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? "bg-brand-green text-white shadow-2xs"
                      : "border border-gray-300 bg-white text-transparent"
                  }`}
                >
                  <CheckCircle size={15} weight="fill" />
                </div>
              </div>

              {/* 테마 명칭 & 뱃지 */}
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-gray-900 tracking-tight">
                    {preset.name}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-gray-500 line-clamp-2 leading-relaxed min-h-[30px]">
                  {preset.desc}
                </span>
              </div>

              {/* 하단 칩 */}
              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between w-full">
                <span
                  className="text-[9.5px] font-extrabold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: preset.cardSubtleHex,
                    color: preset.accentHex,
                  }}
                >
                  {preset.badge}
                </span>
                <span className="text-[9px] font-mono text-gray-400 font-bold">
                  {preset.accentHex}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. 선택한 테마의 실시간 컴포넌트 렌더링 검증 샌드박스 (LIVE PREVIEW) */}
      <div className="bg-theme-card p-6 rounded-3xl border border-theme-subtle shadow-xs space-y-4 transition-colors duration-200">
        <div className="flex items-center justify-between border-b border-theme-subtle pb-3">
          <div className="flex items-center gap-2">
            <Eye size={18} weight="bold" className="text-brand-green" />
            <h3 className="text-sm font-black text-gray-900 tracking-tight">
              실시간 UI 컴포넌트 렌더링 프리뷰 (현재 테마 즉시 반영)
            </h3>
          </div>
          <span className="text-xs font-medium text-gray-400">
            글자 명도 대비, 리추얼 카드, 뱃지의 발색과 가독성을 확인하세요.
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* 프리뷰 카드 1: 리추얼 추천 카드 */}
          <div className="p-4 rounded-2xl bg-theme-subtle flex flex-col justify-between gap-3 border border-transparent transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-brand-green text-white shadow-2xs">
                이달의 추천
              </span>
              <span className="text-xs font-bold text-gray-500 font-mono">3분 소요</span>
            </div>

            <div className="flex items-center gap-3.5 my-1">
              <div className="relative w-12 h-12 shrink-0">
                <Image
                  src={getIconPath(1)}
                  alt="미소 명상"
                  fill
                  className="object-contain drop-shadow-xs"
                />
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm font-black text-gray-900 tracking-tight">
                  미소 명상 리추얼
                </h4>
                <p className="text-xs text-gray-500 font-medium line-clamp-1">
                  입가에 옅은 미소를 지으며 긴장을 푸는 시간
                </p>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2.5 rounded-xl bg-brand-green text-white font-bold text-xs shadow-xs hover:opacity-90 active:scale-[0.98] transition-all"
            >
              지금 시작하기 (+3 DB)
            </button>
          </div>

          {/* 프리뷰 카드 2: Bento Grid 미니 셀 */}
          <div className="p-4 rounded-2xl bg-white border border-theme-subtle flex flex-col justify-between gap-2 shadow-2xs transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-gray-900 flex items-center gap-1.5">
                <Flame size={15} weight="fill" className="text-amber-500" />
                <span>마음 덤벨 성장</span>
              </span>
              <span className="text-xs font-black text-brand-green font-mono">Lv.2 단단한 싹</span>
            </div>

            {/* 프로그레스 바 */}
            <div className="space-y-1.5 my-2">
              <div className="flex justify-between text-[11px] font-bold text-gray-500">
                <span>오늘의 단련</span>
                <span>80% 완료</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full bg-brand-green rounded-full w-[80%] transition-all" />
              </div>
            </div>

            <div className="p-2 rounded-xl bg-theme-subtle flex items-center justify-between text-xs font-bold text-gray-700">
              <span>보너스 리워드</span>
              <span className="text-brand-green font-mono">+10 DB 적립 가능</span>
            </div>
          </div>

          {/* 프리뷰 카드 3: 텍스트 가독성 및 대비율 체크 */}
          <div className="p-4 rounded-2xl bg-white border border-theme-subtle flex flex-col justify-between gap-2 shadow-2xs transition-colors">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">
              Contrast & Legibility
            </span>
            <div className="space-y-1 my-1">
              <h4 className="text-base font-black text-gray-900 tracking-tight leading-snug">
                조마조마하지 않게, 차분하게 걷는 하루
              </h4>
              <p className="text-xs font-medium text-gray-600 leading-relaxed">
                바쁜 일상 속에서도 3분의 쉼표 하나로 마음의 균형을 되찾습니다.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-50 text-brand-green">
                대비율 12:1 이상 (AAA)
              </span>
              <span className="text-[10px] font-bold text-gray-400 font-mono">
                WCAG 2.1 Compliant
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
