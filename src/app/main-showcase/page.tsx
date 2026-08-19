"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkle,
  ArrowRight,
  Heart,
  Barbell,
  BookBookmark,
  CaretRight,
  Bell,
} from "@phosphor-icons/react";

import { BrandLogo } from "@/components/ui/BrandLogo";
import { Badge } from "@/components/ui/Badge";
import { SpotlightCard } from "@/components/godui/SpotlightCard";
import { AuroraText } from "@/components/godui/AuroraText";
import { AnimatedMorningSun } from "@/components/animated-icons/AnimatedMorningSun";

/**
 * MainShowcasePage (Senior Design Engineering & Skill-Retouched Version)
 *
 * Applied Skills:
 * 1. make-interfaces-feel-better: tabular-nums, active:scale-[0.96], concentric border-radius, hairline borders
 * 2. style-soft-wellness: Healing pastel palettes, self-compassion reassurance card, warm typography
 * 3. style-minimalist: Flat editorial layout, generous negative space, refined bento micro-modules
 * 4. godui-component-creation: SpotlightCard, AuroraText, AnimatedMorningSun integration
 * 5. oklch-skill: CSS token-based color system (.txt-brand-ink, .txt-brand-forest, .txt-brand-green)
 */
export default function MainShowcasePage() {
  return (
    // 앱 스마트폰 폭(max-w-[430px]) 기준 100% 에디토리얼 모바일 뷰 (bg-white)
    <div className="w-full max-w-[430px] min-h-screen mx-auto bg-white relative flex flex-col justify-between overflow-hidden text-gray-900 select-none shadow-xs font-sans">
        
        {/* =========================================================================
            1. MOBILE APP TOP HEADER (Hairline Border & Glassmorphism)
           ========================================================================= */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/70 px-4 py-3.5 flex items-center justify-between">
          {/* Brand Logo with /images/logo_icon.svg */}
          <Link href="/main-showcase" className="flex items-center gap-1.5 transition-transform active:scale-95">
            <BrandLogo size="sm" />
          </Link>

          {/* Right Mobile Status & Profile (Tabular Numbers & Micro Interactions) */}
          <div className="flex items-center gap-2.5">
            <Badge variant="mint" size="sm" className="tabular-nums shadow-2xs">
              철 덤벨 <span className="font-extrabold txt-brand-green ml-0.5">12회</span>
            </Badge>

            <button
              aria-label="알림 수신함"
              className="p-1.5 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors relative active:scale-95"
            >
              <Bell size={18} weight="bold" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-green rounded-full ring-2 ring-white" />
            </button>

            <div className="w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center text-xs font-black shrink-0 shadow-2xs border border-emerald-400/40">
              보
            </div>
          </div>
        </header>

        {/* =========================================================================
            2. MOBILE APP MAIN SCROLL BODY (Generous Spacing & High-End Visual Polish)
           ========================================================================= */}
        <main className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-6 pb-10 text-left">
          
          {/* A. HERO AURORA SPOTLIGHT BANNER (60fps GPU Light Tracking) */}
          <SpotlightCard
            spotlightColor="rgba(0, 196, 116, 0.18)"
            className="group relative bg-white border border-gray-200/90 rounded-2xl p-6 shadow-2xs hover:border-[var(--color-brand-green)] transition-all duration-300 overflow-hidden"
          >
            {/* GPU 가속 앰비언트 백드롭 레이어 */}
            <div className="absolute top-0 right-0 w-52 h-52 bg-gradient-to-br from-emerald-200/35 via-teal-100/20 to-sky-200/25 rounded-full blur-2xl opacity-60 pointer-events-none will-change-transform" />

            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold txt-brand-green-accent bg-[var(--color-pastel-mint-bg)] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
                  <Sparkle size={13} weight="fill" />
                  <span>8월 추천 특별 케어</span>
                </span>
                <AnimatedMorningSun className="w-9 h-9 shrink-0" />
              </div>

              <div className="flex flex-col gap-2.5 mt-1">
                <h1 className="text-xl font-black txt-brand-ink tracking-tight leading-snug">
                  <span className="txt-bonobono-blue font-black">보노보노</span>님, 오늘 하루도 <br />
                  <AuroraText>나만의 마음 근육을 채워볼까요? 🧘</AuroraText>
                </h1>

                <p className="text-xs text-gray-600 font-medium leading-relaxed mt-0.5">
                  직장 스트레스 해소를 위한 3분 맞춤 리추얼로 마음의 안정감을 경험해 보세요.
                </p>
              </div>

              <button className="mt-2 w-full bg-brand-green hover:bg-[#005A34] active:bg-[#005A34] text-white font-extrabold text-xs py-3.5 rounded-xl transition-all shadow-2xs flex items-center justify-center gap-2 active:scale-[0.96]">
                <span>지금 3분 리추얼 시작하기</span>
                <ArrowRight size={14} weight="bold" />
              </button>
            </div>
          </SpotlightCard>

          {/* B. QUICK ACTION BENTO MODULES (30초 체크인 & 덤벨 성장의 길) */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* 30초 체크인 칩 */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-2xs flex flex-col justify-between hover:border-[var(--color-forest-green)] transition-all cursor-pointer group min-h-[124px] active:scale-[0.98]">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                  <Sparkle size={15} weight="fill" className="txt-brand-green shrink-0" />
                  <h2 className="text-xs font-black txt-brand-ink">30초 체크인</h2>
                </div>
                <p className="txt-caption-compact text-gray-500 font-medium leading-relaxed">
                  지금 내 마음 날씨 진단
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] font-extrabold txt-brand-forest pt-2.5 border-t border-gray-100 mt-3">
                <span>진단 시작</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 덤벨 성장의 길 위젯 */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-2xs flex flex-col justify-between min-h-[124px]">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black txt-brand-ink">마음근육 성장</span>
                  <Barbell size={15} weight="fill" className="text-gray-400 shrink-0" />
                </div>
                <p className="txt-caption-compact text-gray-500 font-medium mt-0.5 tabular-nums">
                  동 덤벨까지 <strong className="txt-brand-forest font-bold">9회</strong> 남음
                </p>
              </div>

              <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden flex p-0.5 border border-gray-200/60">
                <div className="h-full w-[60%] bg-brand-green rounded-full transition-all duration-500" />
              </div>
            </div>
          </div>

          {/* C. SOFT WELLNESS CARD (자기자비 쉼표 파스텔 모듈) */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-2xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart size={18} weight="fill" className="text-rose-500 shrink-0" />
                <h2 className="text-xs font-black txt-brand-ink">오늘 혹시 바쁘셨나요? 💖</h2>
              </div>
              <Badge variant="rose" size="sm">자기자비 쉼표</Badge>
            </div>

            <div className="bg-gray-50/80 p-3.5 rounded-xl">
              <p className="text-xs font-semibold text-gray-700 leading-relaxed italic">
                "괜찮아요, 내일 해도 돼요. 나를 질책하지 않는 것 또한 훌륭한 마음 운동입니다."
              </p>
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <span className="txt-caption-compact text-gray-400 font-medium">내일 다시 편안하게 알림이 올 예정이에요</span>
              <span className="text-[10px] font-bold txt-brand-forest bg-[var(--color-pastel-mint-bg)] px-2 py-0.5 rounded">
                휴식 허용
              </span>
            </div>
          </div>

          {/* D. RECOMMENDED ARTICLE BANNER (Editorial Styling) */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-4.5 shadow-2xs flex items-center justify-between gap-4 cursor-pointer hover:border-gray-300 transition-all active:scale-[0.98]">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-brand-green text-white flex items-center justify-center shrink-0 shadow-2xs">
                <BookBookmark size={20} weight="fill" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h2 className="text-xs font-black txt-brand-ink leading-snug">
                  번아웃 시대, 나를 다독이는 기술
                </h2>
                <span className="txt-caption-compact txt-brand-forest font-bold block tabular-nums">
                  💡 읽고 작성 시 덤벨 +15개
                </span>
              </div>
            </div>
            <CaretRight size={16} className="text-gray-400 shrink-0" />
          </div>

        </main>
      </div>
  );
}
