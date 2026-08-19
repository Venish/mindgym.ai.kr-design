"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bell,
  Check,
  CaretRight,
  Sparkle,
  Barbell,
  House,
  BookOpen,
  User,
  Heart,
  BookBookmark,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Badge } from "@/components/ui/Badge";
import { MorningCheckinDrawer } from "@/components/modals/MorningCheckinDrawer";
import { EveningCheckinDrawer } from "@/components/modals/EveningCheckinDrawer";
import { MagazineViewerModal } from "@/components/modals/MagazineViewerModal";
import { magazinesData } from "@/data/magazines";

export default function DashboardFlatPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"home" | "ritual" | "magazine" | "my">("home");
  const [isMorningOpen, setIsMorningOpen] = useState(false);
  const [isEveningOpen, setIsEveningOpen] = useState(false);
  const [isMagazineOpen, setIsMagazineOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white text-[#191F28] font-sans flex flex-col items-center justify-start relative pb-24">
      {/* 430px 모바일 화면 프레임 레이아웃 (순백색 배경) */}
      <div className="w-full max-w-[430px] min-h-screen bg-white flex flex-col relative border-x border-gray-200/60 shadow-xs">
        
        {/* 1. 상단 고정 헤더 (* mindgym + Bell Icon) */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-5 py-4 flex items-center justify-between">
          {/* 브랜드 시그니처 로고 (* mindgym) */}
          <div className="flex items-center cursor-pointer" onClick={() => router.push("/dashboard")}>
            <BrandLogo className="h-6 w-auto" />
          </div>

          {/* 알림 종 아이콘 */}
          <button className="p-2 text-gray-500 hover:text-gray-900 transition-colors relative">
            <Bell size={22} weight="regular" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#00C473] rounded-full" />
          </button>
        </header>

        {/* 대시보드 본문 영역 */}
        <div className="flex-1 flex flex-col gap-6 px-5 pt-2 pb-6">

          {/* 2. Hero Dumbbell Growth Section (옅은 회색 #F9FAFB 박스) */}
          <section className="bg-[#F9FAFB] rounded-3xl p-6 border border-gray-100/90 shadow-2xs flex flex-col items-center text-center relative overflow-hidden">
            {/* 상단 캡슐 뱃지: [ 철 덤벨 · 12회차 ] (공통 Badge 컴포넌트) */}
            <div className="flex items-center gap-1.5 mb-4">
              <Badge variant="mint" size="md">
                철 덤벨 · <span className="font-extrabold text-[#00C473]">12회차</span>
              </Badge>
            </div>

            {/* 중앙 덤벨 엠블럼 (순백색 원형 뱃지: aspect-square 1:1 정방형 고정) */}
            <div className="relative mb-3 flex items-center justify-center p-2">
              <div className="w-[6rem] h-[6rem] aspect-square shrink-0 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-2xs">
                <Barbell size={56} weight="fill" className="text-gray-400 filter drop-shadow-2xs" />
              </div>
            </div>

            {/* 타이틀 및 서브 타이틀 */}
            <h2 className="txt-title-section text-gray-900 tracking-tight leading-snug">
              마음근육이 조금씩 자라고 있어요
            </h2>
            <p className="txt-caption-main text-gray-400 mt-0.5 mb-4">
              동 덤벨까지 리추얼 9회 남았어요
            </p>

            {/* 6분할 캡슐 프로그레스 바 */}
            <div className="w-full max-w-[240px] flex items-center gap-1.5 justify-center">
              {[true, true, true, false, false, false].map((active, idx) => (
                <div
                  key={idx}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    active ? "bg-[#00C473]" : "bg-gray-200/80"
                  }`}
                />
              ))}
            </div>
          </section>

          {/* 3. "오늘의 마음운동" 섹션 (3열 플랫 카드) */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-0.5">
              <h3 className="txt-title-card text-gray-900 tracking-tight">
                오늘의 마음운동
              </h3>
              <span className="text-xs font-bold text-gray-400">1 / 3</span>
            </div>

            {/* 3열 플랫 카드 그리드 */}
            <div className="grid grid-cols-3 gap-2.5">
              {/* 카드 1: 오프먼트 (완료됨 - 옅은 회색 #F9FAFB 박스) */}
              <div
                onClick={() => router.push("/player/RT-001")}
                className="cursor-pointer bg-[#F9FAFB] border border-gray-100/90 rounded-2xl p-3.5 flex flex-col justify-between h-[120px] transition-all hover:border-[#00C473] shadow-2xs active:scale-97"
              >
                <div className="w-5 h-5 rounded-full bg-white text-[#00C473] border border-gray-200/60 flex items-center justify-center shadow-2xs">
                  <Check size={12} weight="bold" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-gray-400 tracking-tight line-through">
                    오프먼트
                  </h4>
                  <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                    5분 · 완료
                  </p>
                </div>
              </div>

              {/* 카드 2: 한 칸 완벽주의 (진행 중 - Mint Tint 배경 #E9F8F0) */}
              <div
                onClick={() => router.push("/player/RT-012")}
                className="cursor-pointer bg-[#E9F8F0] border border-[#00C473]/30 rounded-2xl p-3.5 flex flex-col justify-between h-[120px] transition-all hover:shadow-xs active:scale-97"
              >
                <span className="self-start px-2 py-0.5 bg-white text-[#00C473] text-[10px] font-black rounded-full border border-[#00C473]/20 shadow-2xs">
                  3분
                </span>
                <div>
                  <h4 className="text-xs font-black text-[#005A34] tracking-tight leading-tight">
                    한 칸 완벽주의
                  </h4>
                  <p className="text-[10px] text-[#005A34]/80 font-medium mt-0.5 truncate">
                    서랍 한 칸 정리
                  </p>
                </div>
              </div>

              {/* 카드 3: 빈손산책 (미완료 - 옅은 회색 #F9FAFB 박스) */}
              <div
                onClick={() => router.push("/player/RT-004")}
                className="cursor-pointer bg-[#F9FAFB] border border-gray-100/90 rounded-2xl p-3.5 flex flex-col justify-between h-[120px] transition-all hover:border-gray-300 shadow-2xs active:scale-97"
              >
                <span className="self-start px-2 py-0.5 bg-white text-amber-600 text-[10px] font-black rounded-full border border-amber-200/80 shadow-2xs">
                  10분
                </span>
                <div>
                  <h4 className="text-xs font-extrabold text-gray-800 tracking-tight leading-tight">
                    빈손산책
                  </h4>
                  <p className="text-[10px] text-gray-400 font-medium mt-0.5 truncate">
                    폰 없이 걷기
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. 매거진 아티클 배너 (정시명증 - 옅은 회색 #F9FAFB 박스) */}
          <section
            onClick={() => setIsMagazineOpen(true)}
            className="cursor-pointer bg-[#F9FAFB] border border-gray-100/90 rounded-2xl p-4 shadow-2xs flex items-center justify-between transition-all hover:border-[#00C473] active:scale-98"
          >
            <div className="flex items-center gap-3.5">
              {/* 초록 매거진 썸네일 커버 */}
              <div className="w-11 h-11 bg-[#00C473] rounded-xl flex flex-col items-center justify-center text-white shrink-0 shadow-2xs">
                <span className="text-[9px] font-mono opacity-80 uppercase">VOL.01</span>
                <BookBookmark size={16} weight="fill" />
              </div>
              <div className="flex flex-col text-left">
                <h4 className="text-xs font-black text-gray-900 tracking-tight">
                  정시명증
                </h4>
                <p className="text-[11px] font-medium text-gray-400">
                  이번 달, 혜진님께 맞는 이야기예요
                </p>
              </div>
            </div>
            <CaretRight size={18} weight="bold" className="text-gray-300" />
          </section>

          {/* 5. 마음 컨디션 체크인 배너 (옅은 회색 #F9FAFB 박스) */}
          <section
            onClick={() => setIsMorningOpen(true)}
            className="cursor-pointer bg-[#F9FAFB] border border-gray-100/90 rounded-2xl p-4 shadow-2xs flex items-center justify-between transition-all hover:border-[#00C473] active:scale-98"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
              <Sparkle size={16} weight="fill" className="text-[#00C474]" />
              <span>지금 마음 컨디션은 어때요?</span>
            </div>
            <span className="text-[11px] font-black text-[#00C474] bg-white px-2.5 py-0.5 rounded-full border border-[#00C473]/30 shadow-2xs">
              30초
            </span>
          </section>

        </div>

        {/* 6. 하단 글로벌 탭 바 네비게이션 (홈, 마음운동, 매거진, 마이) */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 py-2.5 flex items-center justify-between z-50">
          {[
            { id: "home", label: "홈", icon: House, path: "/dashboard-flat" },
            { id: "ritual", label: "마음운동", icon: Barbell, path: "/ritual" },
            { id: "magazine", label: "매거진", icon: BookOpen, path: "/magazine" },
            { id: "my", label: "마이", icon: User, path: "/report" },
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  router.push(tab.path);
                }}
                className="flex flex-col items-center gap-1 flex-1 py-1 transition-colors"
              >
                <IconComp
                  size={22}
                  weight={isActive ? "fill" : "regular"}
                  className={isActive ? "text-[#191F28]" : "text-gray-400"}
                />
                <span
                  className={`text-[10px] font-bold ${
                    isActive ? "text-[#191F28]" : "text-gray-400"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* 오버레이 모달 연동 */}
      <MorningCheckinDrawer isOpen={isMorningOpen} onClose={() => setIsMorningOpen(false)} />
      <EveningCheckinDrawer isOpen={isEveningOpen} onClose={() => setIsEveningOpen(false)} />
      <MagazineViewerModal
        magazine={isMagazineOpen ? magazinesData[0] || null : null}
        onClose={() => setIsMagazineOpen(false)}
      />
    </main>
  );
}
