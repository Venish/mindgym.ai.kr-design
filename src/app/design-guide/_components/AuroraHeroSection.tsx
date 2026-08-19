"use client";

import React from "react";
import { Sparkle, ArrowRight } from "@phosphor-icons/react";
import { SpotlightCard } from "@/components/godui/SpotlightCard";
import { AuroraText } from "@/components/godui/AuroraText";
import { AnimatedMorningSun } from "@/components/animated-icons/AnimatedMorningSun";

export function AuroraHeroSection() {
  return (
    <section id="aurora-hero" className="scroll-mt-24">
      <div className="border-b border-gray-200 pb-3 mb-6">
        <h2 className="text-xl font-black txt-brand-ink flex items-center gap-2">
          <span className="w-2.5 h-6 bg-brand-green rounded-full inline-block" />
          7. Hero Box with Aurora Mouse Hover Effect (오로라 호버 히어로 박스)
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          마우스 커서 이동에 따라 다채로운 에메랄드/시안/인디고 오로라 오라 및 스포트라이트 글로우가 60fps로 실시간 반응하는 Hero Card 스펙
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 1. Mouse Spotlight Aurora Hero Card */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black text-gray-900 font-mono">
              Variant A. Spotlight Aurora Cursor Tracker (Zero-Rerender GPU)
            </span>
            <span className="txt-caption-compact text-gray-400 font-bold">마우스 움직임 동적 추적</span>
          </div>

          <SpotlightCard
            spotlightColor="rgba(0, 196, 116, 0.25)"
            className="group relative bg-white border border-gray-200/90 rounded-3xl p-7 shadow-xs hover:shadow-2xl hover:border-[var(--color-brand-green)] transition-all duration-500 overflow-hidden cursor-pointer"
          >
            {/* 배경 오로라 이펙트 레이어 (GPU 가속 최적화) */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-200/40 via-teal-100/20 to-sky-200/40 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none will-change-transform transform-gpu" />
            <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-gradient-to-tr from-indigo-200/30 via-emerald-100/30 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none will-change-transform transform-gpu" />

            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black txt-brand-green-accent bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
                  <Sparkle size={14} weight="fill" />
                  <span>HOVER AURORA EFFECT</span>
                </span>
                <span className="text-xs font-mono font-bold text-gray-400">SPOTLIGHT_HERO</span>
              </div>

              <div>
                <h3 className="text-2xl font-black txt-brand-ink tracking-tight leading-snug">
                  마우스를 올려 오로라 이펙트를 <br />
                  <AuroraText>실시간으로 체감해 보세요</AuroraText>
                </h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  커서 위치를 좌표로 추적하여 600px 반경의 에메랄드 앰비언트 글로우와 배경 틴트 오로라 레이어가 동시에 발산되는 프리미엄 메인 배너 카드입니다.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AnimatedMorningSun className="w-9 h-9" />
                  <span className="text-xs font-extrabold text-gray-700">8월 마음 근력 리포트</span>
                </div>

                <button className="bg-brand-green group-hover:bg-[#00B068] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm group-hover:shadow-md">
                  <span>자세히 보기</span>
                  <ArrowRight size={14} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* 2. Ambient Aurora Border Glow Hero Banner */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black text-gray-900 font-mono">
              Variant B. Ambient Aurora Border Glow Banner
            </span>
            <span className="txt-caption-compact text-gray-400 font-bold">오로라 그라데이션 글로우</span>
          </div>

          <div className="group relative rounded-3xl p-[1.5px] bg-gradient-to-r from-gray-200 via-gray-200 to-gray-200 hover:from-[#00C474] hover:via-teal-400 hover:to-indigo-500 transition-all duration-700 shadow-xs hover:shadow-[0_10px_35px_rgba(0,196,116,0.22)] cursor-pointer">
            {/* 호버 시 은은한 배경 오로라 조명 (GPU 가속) */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00C474]/20 via-teal-300/20 to-indigo-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none will-change-transform transform-gpu" />

            <div className="relative z-10 bg-white group-hover:bg-gradient-to-br group-hover:from-white group-hover:via-emerald-50/30 group-hover:to-teal-50/20 rounded-[23px] p-7 transition-all duration-500 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Sparkle size={14} weight="fill" className="text-indigo-500" />
                  <span>AURORA BORDER GLOW</span>
                </span>
                <span className="text-xs font-mono font-bold text-gray-400">AMB_HERO</span>
              </div>

              <div>
                <h3 className="text-2xl font-black txt-brand-ink tracking-tight leading-snug">
                  오늘의 마음을 챙기는 <br />
                  <AuroraText>특별한 온보딩 리추얼</AuroraText>
                </h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  카드 테테두리 전체가 그라데이션 빔으로 둘러싸이며, 내부 패널이 오로라 틴트로 부드럽게 전환되는 메인 대시보드형 히어로 컴포넌트입니다.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl">
                  ✨ 상위 5% 마음 근력 도달
                </span>

                <button className="bg-gray-900 group-hover:bg-[#00C474] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm">
                  <span>시작하기</span>
                  <ArrowRight size={14} weight="bold" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
