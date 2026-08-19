"use client";

import React, { useState } from "react";
import {
  Barbell,
  Check,
  BookBookmark,
  CaretRight,
  Sparkle,
  Clock,
  Play,
  Heart,
  Calendar,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/Badge";
import { EmotionChip } from "@/components/ui/EmotionChip";

export function FlatComponentsSection() {
  const [activeTab, setActiveTab] = useState<string>("v1");

  return (
    <section id="flat-components" className="scroll-mt-24">
      <div className="border-b border-gray-200 pb-3 mb-6">
        <h2 className="text-xl font-black text-[#191F28] flex items-center gap-2">
          <span className="w-2.5 h-6 bg-[#00C473] rounded-full inline-block" />
          7. Dashboard Flat Real UI Components (대시보드 실전 UI 요소 모음)
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          <code className="font-mono text-[#005A34] font-bold">/dashboard-flat</code>(V1 메인 기준) 및 V2, V3 전용 실전 대시보드 카드/위젯 컴포넌트 모음
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs flex flex-col gap-8">
        
        {/* =========================================================================
            PART 1. V1 (Flat 메인 기준) 공통 디자인 요소
           ========================================================================= */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-4 bg-[#005A34] rounded-full" />
            <h3 className="text-sm font-black text-[#191F28] uppercase tracking-wider">
              [V1 기준] Main Flat Dashboard Cards & Hero Progress
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 1. Hero Dumbbell Growth Section (철 덤벨 메인 진행도 위젯) */}
            <div className="bg-[#F9FAFB] rounded-2xl p-5 border border-gray-200 flex flex-col items-center text-center relative">
              <span className="text-[10px] font-mono text-gray-400 font-bold block mb-2">#01. Dumbbell Growth Hero</span>
              
              <div className="mb-3">
                <Badge variant="mint">
                  철 덤벨 · <span className="font-extrabold text-[#00C473]">12회차</span>
                </Badge>
              </div>

              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border border-gray-200/80 mb-3 shadow-2xs">
                <Barbell size={44} weight="fill" className="text-gray-400" />
              </div>

              <h4 className="text-sm font-black text-[#191F28] tracking-tight">
                마음근육이 자라고 있어요
              </h4>
              <p className="text-[11px] font-medium text-gray-400 mt-0.5 mb-3">
                동 덤벨까지 9회 남았어요
              </p>

              <div className="w-full max-w-[200px] flex items-center gap-1.5 justify-center">
                {[true, true, true, false, false, false].map((active, idx) => (
                  <div
                    key={idx}
                    className={`h-2 flex-1 rounded-full transition-all ${
                      active ? "bg-[#00C473]" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* 2. 3-Column Ritual Grid Cards (V1 기준 3열 리추얼 카드 모음) */}
            <div className="bg-[#F9FAFB] rounded-2xl p-5 border border-gray-200 flex flex-col gap-3">
              <span className="text-[10px] font-mono text-gray-400 font-bold block">#02. 3-Column Flat Ritual Cards (완료/진행중/미완료)</span>
              
              <div className="grid grid-cols-3 gap-2">
                {/* 완료 카드 */}
                <div className="bg-white border border-gray-200 rounded-xl p-2.5 flex flex-col justify-between h-[100px]">
                  <div className="w-4 h-4 rounded-full bg-[#E9F8F0] border border-[#00C473]/30 text-[#00C473] flex items-center justify-center">
                    <Check size={10} weight="bold" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-extrabold text-gray-400 line-through">오프먼트</h5>
                    <span className="text-[9px] text-gray-400">완료</span>
                  </div>
                </div>

                {/* 진행중 카드 (Mint Tint) */}
                <div className="bg-[#E9F8F0] border border-[#005A34] rounded-xl p-2.5 flex flex-col justify-between h-[100px]">
                  <Badge variant="forest" size="sm" className="self-start text-[8px] px-1.5 py-0">
                    3분
                  </Badge>
                  <div>
                    <h5 className="text-[11px] font-black text-[#005A34] leading-tight">한 칸 완벽주의</h5>
                    <span className="text-[9px] text-[#005A34]/80">서랍 정리</span>
                  </div>
                </div>

                {/* 미완료 카드 */}
                <div className="bg-white border border-gray-200 hover:border-[#005A34] rounded-xl p-2.5 flex flex-col justify-between h-[100px] cursor-pointer">
                  <Badge variant="amber" size="sm" className="self-start text-[8px] px-1.5 py-0">
                    10분
                  </Badge>
                  <div>
                    <h5 className="text-[11px] font-black text-gray-800 leading-tight">빈손산책</h5>
                    <span className="text-[9px] text-gray-400">폰 없이</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Magazine Banner & Condition Check-in (V1 매거진/체크인 배너) */}
            <div className="bg-[#F9FAFB] rounded-2xl p-5 border border-gray-200 flex flex-col gap-3">
              <span className="text-[10px] font-mono text-gray-400 font-bold block">#03. Banners & Quick Check-in Cards</span>
              
              {/* 매거진 배너 */}
              <div className="bg-white border border-gray-200 hover:border-[#005A34] rounded-xl p-3 flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#00C473] rounded-lg flex items-center justify-center text-white shrink-0">
                    <BookBookmark size={16} weight="fill" />
                  </div>
                  <div className="text-left">
                    <h5 className="text-xs font-black text-[#191F28]">정시명증 아티클</h5>
                    <span className="text-[10px] text-gray-400 font-medium">이달의 추천 마인드 스토어</span>
                  </div>
                </div>
                <CaretRight size={16} className="text-gray-400" />
              </div>

              {/* 30초 마음 컨디션 배너 */}
              <div className="bg-white border border-gray-200 hover:border-[#005A34] rounded-xl p-3 flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#191F28]">
                  <Sparkle size={14} weight="fill" className="text-[#00C473]" />
                  <span>마음 컨디션 체크인</span>
                </div>
                <Badge variant="mint" size="sm">
                  30초
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PART 2. V2 전용 독자적 디자인 요소 (Compact 1-Column List UI)
           ========================================================================= */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-4 bg-[#00C473] rounded-full" />
            <h3 className="text-sm font-black text-[#191F28] uppercase tracking-wider">
              [V2 Unique Components] Compact 1-Column Vertical List Elements
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 인사말 대형 헤더 */}
            <div className="bg-[#F9FAFB] rounded-2xl p-5 border border-gray-200 text-left">
              <span className="text-[10px] font-mono text-gray-400 font-bold block mb-2">#04. V2 Headline Greeting Header</span>
              <h4 className="text-lg font-black text-[#191F28] tracking-tight leading-snug">
                혜지님, 오늘의 마음운동<br />
                <span className="text-[#005A34]">시작해볼까요?</span>
              </h4>
              <div className="mt-3 flex items-center gap-2">
                <Badge variant="forest" size="sm">
                  철 덤벨 12회차
                </Badge>
                <span className="text-xs text-gray-400 font-bold">다음 등급까지 9회</span>
              </div>
            </div>

            {/* V2 1열 세로형 리추얼 리스트 칩 3종 */}
            <div className="bg-[#F9FAFB] rounded-2xl p-5 border border-gray-200 flex flex-col gap-2.5">
              <span className="text-[10px] font-mono text-gray-400 font-bold block mb-1">#05. V2 Compact 1-Column List Chips</span>
              
              {/* 리얼 세로 리스트 1: 완료 */}
              <div className="bg-white border border-gray-200 p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#E9F8F0] border border-[#00C473]/30 text-[#00C473] flex items-center justify-center">
                    <Check size={14} weight="bold" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 line-through">오프먼트 완료</span>
                </div>
                <Badge variant="mint" size="sm">완료 ✓</Badge>
              </div>

              {/* 리얼 세로 리스트 2: 진행 중 */}
              <div className="bg-[#E9F8F0] border border-[#005A34] p-3 rounded-xl flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <Play size={16} weight="fill" className="text-[#005A34]" />
                  <span className="text-xs font-black text-[#005A34]">한 칸 완벽주의</span>
                </div>
                <Badge variant="forest" size="sm">3분 실행</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PART 3. V3 전용 독자적 디자인 요소 (Large Hero Focus Timer UI)
           ========================================================================= */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-4 bg-amber-500 rounded-full" />
            <h3 className="text-sm font-black text-[#191F28] uppercase tracking-wider">
              [V3 Unique Components] Large Hero Recommended Focus & Self-Compassion Cards
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 5분 타이머 원형 링 대형 히어로 카드 */}
            <div className="bg-[#E9F8F0] border border-[#005A34] rounded-2xl p-5 flex flex-col items-center text-center relative">
              <span className="text-[10px] font-mono text-[#005A34] font-bold block mb-2">#06. V3 5:00 Focus Timer Hero Recommended Card</span>
              
              <div className="w-16 h-16 rounded-full border-4 border-[#00C473] bg-white flex items-center justify-center mb-3 shadow-2xs">
                <span className="text-base font-black text-[#005A34] font-mono">5:00</span>
              </div>

              <h4 className="text-base font-black text-[#005A34] tracking-tight">
                오늘의 추천: 5분 마음 일기
              </h4>
              <p className="text-xs font-medium text-[#005A34]/80 mt-1 mb-4">
                생각을 정리하고 마음의 그릇을 비우는 시간
              </p>

              <button className="w-full bg-[#005A34] hover:bg-[#005A34]/90 text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-2xs">
                지금 5분 시작하기
              </button>
            </div>

            {/* 자기자비 안심 카드 */}
            <div className="bg-[#F9FAFB] border border-gray-200 rounded-2xl p-5 flex flex-col justify-between text-left">
              <div>
                <span className="text-[10px] font-mono text-gray-400 font-bold block mb-2">#07. V3 Self-Compassion Reassurance Card</span>
                
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={18} weight="fill" className="text-rose-500" />
                  <h4 className="text-sm font-black text-[#191F28]">오늘 바쁘신가요?</h4>
                </div>

                <p className="text-xs font-semibold text-gray-600 leading-relaxed bg-white p-3 rounded-xl border border-gray-200">
                  "괜찮아요, 내일 해도 돼요. 나를 질책하지 않는 것도 마음 운동입니다."
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Badge variant="rose" size="sm">자기자비 쉼표</Badge>
                <span className="text-[11px] font-bold text-gray-400">내일 다시 알림</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
