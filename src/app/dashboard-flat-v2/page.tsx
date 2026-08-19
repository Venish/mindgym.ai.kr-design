"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Check,
  CaretRight,
  Sparkle,
  Barbell,
  House,
  BookOpen,
  User,
  BookBookmark,
} from "@phosphor-icons/react";
import { MorningCheckinDrawer } from "@/components/modals/MorningCheckinDrawer";
import { EveningCheckinDrawer } from "@/components/modals/EveningCheckinDrawer";
import { MagazineViewerModal } from "@/components/modals/MagazineViewerModal";
import { magazinesData } from "@/data/magazines";

export default function DashboardFlatV2Page() {
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

          {/* 알림 종 아이콘 */}
          <button className="p-2 text-gray-500 hover:text-gray-900 transition-colors relative">
            <Bell size={22} weight="regular" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#00C473] rounded-full" />
          </button>
        </header>

        {/* 대시보드 본문 영역 */}
        <div className="flex-1 flex flex-col gap-5 px-5 pt-1 pb-6">

          {/* 2. 상단 타이틀 웰컴 영역 (시안 2번 텍스트 레이아웃 100% 반영) */}
          <div className="flex flex-col gap-0.5 text-left pt-1">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-snug">
              혜지님, <br />
              오늘의 마음운동 시작해볼까요
            </h1>
            <p className="text-xs font-semibold text-gray-400 mt-1">
              7월 28일 화요일
            </p>
          </div>

          {/* 3. 첫번째 마음 컨디션 체크인 배너 (옅은 회색 #F9FAFB 박스) */}
          <section
            onClick={() => setIsMorningOpen(true)}
            className="cursor-pointer bg-[#F9FAFB] border border-gray-100/90 rounded-2xl p-4 shadow-2xs flex items-center justify-between transition-all hover:border-[#00C473] active:scale-98"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#00C473] flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                  <path d="M16 4V28" stroke="#00C473" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M6 10L26 22" stroke="#00C473" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M6 22L26 10" stroke="#00C473" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <h3 className="txt-title-card text-gray-900 tracking-tight">
                  지금 마음 컨디션은 어때요?
                </h3>
                <p className="text-[11px] font-medium text-gray-400 mt-0.5">
                  점심 체크인 · 30초면 충분해요
                </p>
              </div>
            </div>
            <CaretRight size={18} weight="bold" className="text-gray-300" />
          </section>

          {/* 4. "오늘의 마음운동 3가지" 섹션 (세로 1열 리스트 형태) */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-0.5">
              <h3 className="text-base font-black text-gray-900 tracking-tight">
                오늘의 마음운동 3가지
              </h3>
              <span className="text-xs font-bold text-gray-400">1 / 3 완료</span>
            </div>

            {/* 세로 1열 리스트 카드리스트 */}
            <div className="flex flex-col gap-2.5">
              {/* 리추얼 1: 오프먼트 (완료됨) */}
              <div
                onClick={() => router.push("/player/RT-001")}
                className="cursor-pointer bg-[#F9FAFB] border border-gray-100/90 rounded-2xl p-4 flex items-center justify-between transition-all hover:border-[#00C473] active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-[#00C473] flex items-center justify-center shrink-0">
                    <Check size={18} weight="bold" />
                  </div>
                  <div className="flex flex-col text-left">
                    <h4 className="text-xs font-black text-gray-300 tracking-tight line-through">
                      오프먼트
                    </h4>
                    <p className="text-[11px] font-medium text-gray-300 mt-0.5">
                      화면 밖에서 보낸 5분
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-300">완료</span>
              </div>

              {/* 리추얼 2: 한 칸 완벽주의 (진행 중 - 3분 뱃지) */}
              <div
                onClick={() => router.push("/player/RT-012")}
                className="cursor-pointer bg-[#F9FAFB] border border-gray-100/90 rounded-2xl p-4 flex items-center justify-between transition-all hover:border-[#00C473] active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <div className="px-2.5 py-1.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-200/60 text-xs font-black shrink-0">
                    3분
                  </div>
                  <div className="flex flex-col text-left">
                    <h4 className="text-xs font-black text-gray-900 tracking-tight">
                      한칸 완벽주의
                    </h4>
                    <p className="text-[11px] font-medium text-gray-400 mt-0.5">
                      서랍 한 칸만, 가볍게 정리해요
                    </p>
                  </div>
                </div>
                <CaretRight size={18} weight="bold" className="text-gray-300" />
              </div>

              {/* 리추얼 3: 빈손산책 (미완료 - 10분 뱃지) */}
              <div
                onClick={() => router.push("/player/RT-004")}
                className="cursor-pointer bg-[#F9FAFB] border border-gray-100/90 rounded-2xl p-4 flex items-center justify-between transition-all hover:border-[#00C473] active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <div className="px-2.5 py-1.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60 text-xs font-black shrink-0">
                    10분
                  </div>
                  <div className="flex flex-col text-left">
                    <h4 className="text-xs font-black text-gray-900 tracking-tight">
                      빈손산책
                    </h4>
                    <p className="text-[11px] font-medium text-gray-400 mt-0.5">
                      폰 없이, 천천히 걸어볼까요
                    </p>
                  </div>
                </div>
                <CaretRight size={18} weight="bold" className="text-gray-300" />
              </div>
            </div>
          </section>

          {/* 5. 덤벨 성장 프로그레스 카드 (철 덤벨 · 12회째) */}
          <section className="bg-[#F9FAFB] border border-gray-100/90 rounded-2xl p-4 flex flex-col gap-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/60 flex items-center justify-center text-gray-500 shrink-0 shadow-2xs">
                  <Barbell size={24} weight="fill" />
                </div>
                <div className="flex flex-col text-left">
                  <h4 className="text-xs font-black text-gray-900 tracking-tight">
                    철 덤벨 · 12회째
                  </h4>
                  <p className="text-[11px] font-medium text-gray-400 mt-0.5">
                    꾸준함이 마음근육을 만들어요
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#00C473]">
                동까지 9회
              </span>
            </div>

            {/* 그린 프로그레스 바 */}
            <div className="w-full bg-gray-200/60 h-2 rounded-full overflow-hidden">
              <div className="bg-[#00C473] h-full w-[52%] rounded-full transition-all duration-500" />
            </div>
          </section>

          {/* 6. 매거진 아티클 카드 (VOL.11 잠시멈춤) */}
          <section
            onClick={() => setIsMagazineOpen(true)}
            className="cursor-pointer bg-[#F9FAFB] border border-gray-100/90 rounded-2xl p-4 shadow-2xs flex items-center justify-between transition-all hover:border-[#00C473] active:scale-98"
          >
            <div className="flex items-center gap-3.5">
              {/* 초록 매거진 썸네일 커버 (VOL.11) */}
              <div className="w-11 h-14 bg-[#00C473] rounded-xl flex flex-col items-center justify-center text-white shrink-0 shadow-2xs">
                <span className="text-[8px] font-mono opacity-80 uppercase">VOL.11</span>
                <BookBookmark size={16} weight="fill" className="mt-1" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold text-[#00C473]">
                  지금 나에게 맞는 이야기
                </span>
                <h2 className="txt-title-section text-gray-900 tracking-tight leading-snug">
                  마음근육이 조금씩 자라고 있어요
                </h2>
                <p className="txt-caption-main text-gray-400 mt-0.5 mb-4">
                  동 덤벨까지 리추얼 9회 남았어요
                </p>
              </div>
            </div>
            <CaretRight size={18} weight="bold" className="text-gray-300" />
          </section>

        </div>

        {/* 7. 하단 글로벌 탭 바 네비게이션 (홈, 마음운동, 매거진, 마이) */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 py-2.5 flex items-center justify-between z-50">
          {[
            { id: "home", label: "홈", icon: House, path: "/dashboard-flat-v2" },
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
