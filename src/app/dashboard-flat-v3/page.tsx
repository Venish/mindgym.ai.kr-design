"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CaretRight,
  Sparkle,
  Barbell,
  House,
  BookOpen,
  User,
} from "@phosphor-icons/react";
import { MorningCheckinDrawer } from "@/components/modals/MorningCheckinDrawer";
import { EveningCheckinDrawer } from "@/components/modals/EveningCheckinDrawer";
import { MagazineViewerModal } from "@/components/modals/MagazineViewerModal";
import { magazinesData } from "@/data/magazines";

export default function DashboardFlatV3Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"home" | "ritual" | "magazine" | "my">("home");
  const [isMorningOpen, setIsMorningOpen] = useState(false);
  const [isEveningOpen, setIsEveningOpen] = useState(false);
  const [isMagazineOpen, setIsMagazineOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white text-[#191F28] font-sans flex flex-col items-center justify-start relative pb-24">
      {/* 430px 모바일 화면 프레임 레이아웃 (순백색 배경) */}
      <div className="w-full max-w-[430px] min-h-screen bg-white flex flex-col relative border-x border-gray-200/60 shadow-xs">
        
        {/* 1. 상단 고정 헤더 (* mindgym + [🏋️ 철 · 12회] 캡슐 뱃지) */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-5 py-4 flex items-center justify-between">
          {/* 브랜드 시그니처 로고 (* mindgym) */}
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => router.push("/dashboard")}>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4V28" stroke="#00C473" strokeWidth="4" strokeLinecap="round" />
              <path d="M6 10L26 22" stroke="#00C473" strokeWidth="4" strokeLinecap="round" />
              <path d="M6 22L26 10" stroke="#00C473" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <span className="text-xl font-black tracking-tight text-[#191F28] lowercase font-sans">
              mindgym
            </span>
          </div>

          {/* 우측 덤벨 캡슐 뱃지 [🏋️ 철 · 12회] */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F9FAFB] border border-gray-200/80 rounded-full shadow-2xs">
            <Barbell size={16} weight="fill" className="text-gray-500" />
            <span className="text-xs font-black text-gray-700">철 · 12회</span>
          </div>
        </header>

        {/* 대시보드 본문 영역 */}
        <div className="flex-1 flex flex-col gap-6 px-5 pt-1 pb-6">

          {/* 2. 상단 타이틀 인사말 헤더 */}
          <div className="flex flex-col gap-0.5 text-left pt-1">
            <span className="text-xs font-semibold text-gray-400">
              7월 28일 화요일 · 혜지님
            </span>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-snug mt-0.5">
              오늘의 추천 마음운동이에요
            </h1>
          </div>

          {/* 3. 메인 대형 추천 리추얼 히어로 카드 (Mint Tint 배경 #E9F8F0) */}
          <section className="bg-[#E9F8F0] border border-[#00C473]/30 rounded-3xl p-6 flex flex-col items-center text-center shadow-2xs relative overflow-hidden">
            
            {/* 중앙 원형 타이머 스탯 (5:00 오늘의 운동) */}
            <div className="w-32 h-32 rounded-full bg-white border-4 border-emerald-100 flex flex-col items-center justify-center mb-5 shadow-2xs">
              <span className="text-3xl font-black text-[#00C473] tracking-tight leading-none">
                5:00
              </span>
              <span className="text-[11px] font-bold text-[#005A34]/80 mt-1">
                오늘의 운동
              </span>
            </div>

            {/* 타이틀 및 상세 정보 */}
            <h2 className="text-xl font-black text-gray-900 tracking-tight">
              오프먼트
            </h2>
            <p className="text-xs font-semibold text-[#005A34] mt-1 mb-6 leading-relaxed max-w-[240px]">
              화면 밖에서 보내는 5분, <br />
              생각이 천천히 가라앉아요
            </p>

            {/* 5분 시작하기 CTA 그린 버튼 */}
            <button
              type="button"
              onClick={() => router.push("/player/RT-001")}
              className="w-full py-3.5 bg-[#00C473] hover:bg-[#009859] text-white font-black text-sm rounded-2xl transition-all shadow-xs active:scale-98"
            >
              5분 시작하기
            </button>

            {/* 하단 자기자비 따뜻한 서브 문구 */}
            <p className="text-[11px] font-medium text-gray-400 mt-2.5">
              괜찮아요, 내일 해도 돼요
            </p>
          </section>

          {/* 4. 서브 섹션 "이런 운동도 어때요" (2열 그리드 카드) */}
          <section className="flex flex-col gap-3">
            <h3 className="text-base font-black text-gray-900 tracking-tight text-left">
              이런 운동도 어때요
            </h3>

            {/* 2열 그리드 카드리스트 */}
            <div className="grid grid-cols-2 gap-3">
              {/* 리추얼 1: 한칸 완벽주의 (3분) */}
              <div
                onClick={() => router.push("/player/RT-012")}
                className="cursor-pointer bg-[#F9FAFB] border border-gray-100/90 rounded-2xl p-4 flex flex-col justify-between h-[105px] transition-all hover:border-[#00C473] shadow-2xs active:scale-97 text-left"
              >
                <span className="self-start text-[11px] font-extrabold text-sky-600">
                  3분
                </span>
                <div>
                  <h4 className="text-xs font-black text-gray-900 tracking-tight">
                    한칸 완벽주의
                  </h4>
                  <p className="text-[10px] font-medium text-gray-400 mt-0.5 truncate">
                    서랍 한 칸 정리
                  </p>
                </div>
              </div>

              {/* 리추얼 2: 빈손산책 (10분) */}
              <div
                onClick={() => router.push("/player/RT-004")}
                className="cursor-pointer bg-[#F9FAFB] border border-gray-100/90 rounded-2xl p-4 flex flex-col justify-between h-[105px] transition-all hover:border-[#00C473] shadow-2xs active:scale-97 text-left"
              >
                <span className="self-start text-[11px] font-extrabold text-amber-600">
                  10분
                </span>
                <div>
                  <h4 className="text-xs font-black text-gray-900 tracking-tight">
                    빈손산책
                  </h4>
                  <p className="text-[10px] font-medium text-gray-400 mt-0.5 truncate">
                    폰 없이 걷기
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. 마음 컨디션 체크인 배너 */}
          <section
            onClick={() => setIsMorningOpen(true)}
            className="cursor-pointer bg-[#F9FAFB] border border-gray-100/90 rounded-2xl p-4 shadow-2xs flex items-center justify-between transition-all hover:border-[#00C473] active:scale-98"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
              <Sparkle size={16} weight="fill" className="text-[#00C474]" />
              <span><strong className="text-gray-900 font-black">마음 컨디션</strong> 어때요? 30초 체크인</span>
            </div>
            <CaretRight size={18} weight="bold" className="text-gray-300" />
          </section>

        </div>

        {/* 6. 하단 글로벌 탭 바 네비게이션 (홈, 마음운동, 매거진, 마이) */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 py-2.5 flex items-center justify-between z-50">
          {[
            { id: "home", label: "홈", icon: House, path: "/dashboard-flat-v3" },
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
