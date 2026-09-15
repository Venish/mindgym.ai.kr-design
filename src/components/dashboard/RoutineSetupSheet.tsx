"use client";

import React, { useState } from "react";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { useModalStore } from "@/store/useModalStore";
import { Sun, Moon, Check, Sparkle, Heart, Trophy, CaretRight, ListDashes } from "@phosphor-icons/react";
import { GodTimePicker } from "@/components/godui/GodTimePicker";
import { MagicButton } from "@/components/godui/MagicButton";
import { useMindGym } from "@/context/MindGymContext";
import { CommonRitualSheet } from "@/components/dashboard/CommonRitualSheet";
import { CalendarSheet } from "@/components/dashboard/CalendarSheet";
import { SegmentedTab } from "@/components/ui/SegmentedTab";
import { TodayMindSelectionWizard } from "@/components/common/TodayMindSelectionWizard";
import { EveningReflectionWizard } from "@/components/common/EveningReflectionWizard";
import { getIconPath } from "@/utils/iconMap";

// 아침용 추천 리추얼 목록
const MORNING_RITUAL_OPTIONS = [
  { title: "미소 명상", category: "휴식과 충전", time: "3분", icon: getIconPath(1), desc: "얼굴 근육의 긴장을 풀고 평온한 활력을 채우는 아침 리추얼" },
  { title: "오프먼트", category: "몰입과 비움", time: "5분", icon: getIconPath(51), desc: "스마트폰을 끄고 조용히 아침 오프라인 감각에 온전히 몰입하는 리추얼" },
  { title: "아침 햇살 산책", category: "신체 활력", time: "10분", icon: getIconPath(50), desc: "아침 햇살을 받으며 천천히 발걸음에 집중하는 가벼운 산책" },
];

// 저녁용 추천 리추얼 목록
const EVENING_RITUAL_OPTIONS = [
  { title: "마음일기", category: "감정 정돈", time: "5분", icon: getIconPath(12), desc: "오늘 하루 소중했던 순간과 감정을 솔직하게 적어보는 저녁 회고" },
  { title: "자기자비 쉼표", category: "자책 비우기", time: "3분", icon: getIconPath(10), desc: "오늘의 나를 다정하게 다독이며 편안한 수면을 준비하는 명상" },
  { title: "수면 다독임 호흡", category: "숙면 가이드", time: "7분", icon: getIconPath(4), desc: "몸의 긴장을 이완하고 수면의 질을 높이는 저녁 호흡법" },
];

/**
 * RoutineSetupSheet: Hero 상단 ⚙️ 클릭 시 밑에서 위로(slide-up) 올라오는 아침 · 저녁 루틴 모달
 * - 아침과 저녁 탭의 상단 헤더, 섹션 텍스트 및 서브텍스트 스타일 100% 대칭 일치
 */
export interface RoutineSetupSheetProps {
  initialTab?: "MORNING" | "EVENING";
}

export function RoutineSetupSheet({ initialTab = "MORNING" }: RoutineSetupSheetProps) {
  const { closeModal, openModal } = useModalStore();
  const { userName, morningEmotion, todayQuote, triggerDashboardRefresh } = useMindGym();

  // 탭 상태 ("MORNING" | "EVENING")
  const [activeTab, setActiveTab] = useState<"MORNING" | "EVENING">(initialTab);

  // 아침/저녁 매핑 자동/고정 스위치 상태
  const [isAutoMapping, setIsAutoMapping] = useState(true);
  const [isEveningAutoMapping, setIsEveningAutoMapping] = useState(true);

  // 아침 & 저녁 체크인 연동 상태
  const [isMorningCheckedIn, setIsMorningCheckedIn] = useState(true);
  const [isEveningCheckedIn, setIsEveningCheckedIn] = useState(false);
  const [selectedEveningState, setSelectedEveningState] = useState<"YES" | "NO">("YES");

  const tabItems = [
    { id: "MORNING", label: "아침 루틴" },
    { id: "EVENING", label: "저녁 루틴" },
  ];

  // 시간 및 활성화 상태값
  const [morningTime, setMorningTime] = useState("07:00");
  const [eveningTime, setEveningTime] = useState("23:00");
  const [isMorningEnabled, setIsMorningEnabled] = useState(true);
  const [isEveningEnabled, setIsEveningEnabled] = useState(true);

  // 현재 선택된 아침 / 저녁 리추얼
  const [currentMorningRitual, setCurrentMorningRitual] = useState(MORNING_RITUAL_OPTIONS[0]);
  const [currentEveningRitual, setCurrentEveningRitual] = useState(EVENING_RITUAL_OPTIONS[0]);

  // 리추얼 선택 팝업 상태
  const [selectingTarget, setSelectingTarget] = useState<"MORNING" | "EVENING" | null>(null);

  const [isSaved, setIsSaved] = useState(false);

  // 지나간 루틴/체크인 기록 캘린더 뷰어 오픈
  const handleOpenHistoryCalendar = () => {
    openModal({
      type: "slide-left",
      content: <CalendarSheet />,
    });
  };

  // 아침 체크인 클릭 시: 메인 [차분함] 클릭 시 뜨는 TodayMindSelectionWizard 모달 구동
  const handleOpenMorningCheckinWizard = () => {
    openModal({
      type: "slide-left",
      content: (
        <TodayMindSelectionWizard
          onComplete={() => {
            setIsMorningCheckedIn(true);
          }}
        />
      ),
    });
  };

  // 저녁 체크인 클릭 시: 저녁 2가지 회고 선택 전용 EveningReflectionWizard 모달 구동
  const handleOpenEveningCheckinWizard = () => {
    openModal({
      type: "slide-left",
      content: (
        <EveningReflectionWizard
          initialState={selectedEveningState}
          onComplete={(st) => {
            setSelectedEveningState(st);
            setIsEveningCheckedIn(true);
          }}
        />
      ),
    });
  };

  // 아침 리추얼 실행 모달
  const handleOpenMorningRitual = () => {
    openModal({
      type: "slide-left",
      content: (
        <CommonRitualSheet
          ritualTitle={currentMorningRitual.title}
          ritualCategory={currentMorningRitual.category}
          ritualTime={currentMorningRitual.time}
          ritualIcon={currentMorningRitual.icon}
          description={currentMorningRitual.desc}
        />
      ),
    });
  };

  // 저녁 리추얼 실행 모달
  const handleOpenEveningRitual = () => {
    openModal({
      type: "slide-left",
      content: (
        <CommonRitualSheet
          ritualTitle={currentEveningRitual.title}
          ritualCategory={currentEveningRitual.category}
          ritualTime={currentEveningRitual.time}
          ritualIcon={currentEveningRitual.icon}
          description={currentEveningRitual.desc}
        />
      ),
    });
  };

  const handleSave = () => {
    setIsSaved(true);
    triggerDashboardRefresh();
    setTimeout(() => {
      closeModal();
    }, 500);
  };

  return (
    <div className="w-full min-h-full bg-theme-app flex flex-col justify-between select-none relative txt-brand-ink overflow-y-auto transition-colors duration-300">
      {/* 서브 헤더 (우측 지나간 루틴 기록 목록 아이콘 단독 버튼) */}
      <SubPageHeader
        title="아침 · 저녁 루틴"
        leftType="close"
        onLeftClick={closeModal}
        rightContent={
          <button
            type="button"
            onClick={handleOpenHistoryCalendar}
            className="p-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors active:scale-95 outline-none cursor-pointer"
            title="지난 기록 보기"
          >
            <ListDashes size={22} weight="bold" />
          </button>
        }
      />

      {/* 탭 내용 스크롤 본문 영역 */}
      <div className="flex-1 flex flex-col w-full px-5 pt-3 gap-6 text-left max-w-lg mx-auto pb-4">
        {/* 1. 최상단 헤딩 */}
        <div className="flex flex-col items-center gap-1.5 shrink-0 pt-1 text-center">
          <h1 className="text-2xl font-black txt-brand-ink tracking-tight text-center">
            {userName}님의 하루 루틴
          </h1>
          <p className="text-xs font-semibold text-theme-muted">
            아침·저녁 체크인과 리추얼을 내 일정에 맞게 조정해보세요
          </p>
        </div>

        {/* 2. 전역 공통 SegmentedTab 스위칭 탭 연동 */}
        <SegmentedTab
          items={tabItems}
          activeId={activeTab}
          onChange={(id) => setActiveTab(id as "MORNING" | "EVENING")}
        />

        {/* =========================================================================
           3-A. [아침 루틴] 탭 내용
           ========================================================================= */}
        {activeTab === "MORNING" && (
          <div className="flex flex-col gap-6 w-full animate-fadeIn">
            {/* 3-A1. 일어나는 시간 */}
            <div className="w-full flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-theme-subtle">
                <span className="text-[0.9375rem] font-bold txt-brand-ink tracking-tight">일어나는 시간</span>

                <button
                  type="button"
                  onClick={() => setIsMorningEnabled(!isMorningEnabled)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isMorningEnabled ? "bg-[#00C474]" : "bg-gray-300 dark:bg-gray-700"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isMorningEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className={isMorningEnabled ? "opacity-100 transition-opacity" : "opacity-40 pointer-events-none transition-opacity"}>
                <GodTimePicker
                  value={morningTime}
                  onChange={(t) => setMorningTime(t)}
                  disabled={!isMorningEnabled}
                  theme="emerald"
                />
              </div>
            </div>

            {/* 3-A2. 아침 체크인 항목 */}
            <div className="w-full flex flex-col gap-3 pt-2">
              <div className="flex items-center justify-between pb-1 border-b border-theme-subtle">
                <h3 className="text-[0.9375rem] font-bold txt-brand-ink tracking-tight">아침 체크인</h3>
              </div>

              {/* 아침 체크인 카드 (다크모드 완벽 대응: dark:bg-emerald-950/40) */}
              <div
                onClick={handleOpenMorningCheckinWizard}
                className={`w-full p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] shadow-2xs ${
                  isMorningCheckedIn
                    ? "bg-emerald-50/80 dark:bg-emerald-950/40 hover:bg-emerald-100/80 dark:hover:bg-emerald-950/60"
                    : "bg-theme-card-subtle hover:bg-emerald-50/40 dark:hover:bg-emerald-950/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isMorningCheckedIn ? "bg-[#00C474] text-white" : "bg-theme-card text-theme-muted"}`}>
                    <Check size={20} weight="bold" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold txt-brand-green">오늘의 마음상태</span>
                    <span className="text-sm font-black txt-brand-ink">
                      {morningEmotion || "차분함"} · "{todayQuote || "오늘도 남 비교하지 말고 내 페이스대로 걷기"}"
                    </span>
                  </div>
                </div>
                <CaretRight size={16} className="text-theme-muted" />
              </div>
            </div>

            {/* 3-A3. 추천 리추얼 */}
            <div className="w-full flex flex-col gap-3 pt-2">
              <div className="flex items-center justify-between pb-1 border-b border-theme-subtle">
                <h3 className="text-base font-extrabold txt-brand-ink">추천 리추얼</h3>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-theme-muted">
                    {isAutoMapping ? "추천" : "고정"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsAutoMapping(!isAutoMapping)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isAutoMapping ? "bg-[#00C474]" : "bg-gray-300 dark:bg-gray-700"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        isAutoMapping ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* 매핑된 아침 리추얼 카드 & 아래 다른 리추얼 선택 텍스트 고스트 버튼 */}
              <div className="flex flex-col gap-2.5 pt-1">
                <div
                  onClick={handleOpenMorningRitual}
                  className="w-full bg-theme-card-subtle hover:bg-emerald-50/60 dark:hover:bg-emerald-950/40 p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-theme-card text-[#00C474] flex items-center justify-center shrink-0 shadow-2xs">
                      <img src={currentMorningRitual.icon} alt={currentMorningRitual.title} className="w-6.5 h-6.5 object-contain" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold txt-brand-green">{currentMorningRitual.category}</span>
                      <span className="text-sm font-black txt-brand-ink">{currentMorningRitual.title} · {currentMorningRitual.time}</span>
                    </div>
                  </div>
                  <CaretRight size={16} className="text-theme-muted" />
                </div>

                {/* 다른 리추얼 선택 텍스트 고스트 버튼 (은은한 회색) */}
                <MagicButton
                  type="button"
                  variant="ghost"
                  onClick={() => setSelectingTarget("MORNING")}
                  className="w-full py-2.5 text-theme-muted hover:txt-brand-ink font-bold text-sm border-0 flex items-center justify-center cursor-pointer"
                >
                  <span>다른 리추얼 선택하기</span>
                </MagicButton>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
           3-B. [저녁 루틴] 탭 내용 (아침 탭과 100% 동일한 텍스트 & 헤더 구조)
           ========================================================================= */}
        {activeTab === "EVENING" && (
          <div className="flex flex-col gap-6 w-full animate-fadeIn">
            {/* 3-B1. 자는 시간 (아침 일어나는 시간과 100% 동일 구조) */}
            <div className="w-full flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-theme-subtle">
                <span className="text-[0.9375rem] font-bold txt-brand-ink tracking-tight">자는 시간</span>

                <button
                  type="button"
                  onClick={() => setIsEveningEnabled(!isEveningEnabled)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isEveningEnabled ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-700"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isEveningEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className={isEveningEnabled ? "opacity-100 transition-opacity" : "opacity-40 pointer-events-none transition-opacity"}>
                <GodTimePicker
                  value={eveningTime}
                  onChange={(t) => setEveningTime(t)}
                  disabled={!isEveningEnabled}
                  theme="indigo"
                />
              </div>
            </div>

            {/* 3-B2. 저녁 체크인 (아침 체크인과 100% 동일 구조) */}
            <div className="w-full flex flex-col gap-3 pt-2">
              <div className="flex items-center justify-between pb-1 border-b border-theme-subtle">
                <h3 className="text-[0.9375rem] font-bold txt-brand-ink tracking-tight">저녁 체크인</h3>
              </div>

              {/* 저녁 체크인 카드 (다크모드 완벽 대응: dark:bg-indigo-950/40) */}
              <div
                onClick={handleOpenEveningCheckinWizard}
                className={`w-full p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] shadow-2xs ${
                  isEveningCheckedIn
                    ? "bg-indigo-50/80 dark:bg-indigo-950/40 hover:bg-indigo-100/80 dark:hover:bg-indigo-950/60"
                    : "bg-theme-card-subtle hover:bg-indigo-50/40 dark:hover:bg-indigo-950/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isEveningCheckedIn ? "bg-indigo-600 text-white" : "bg-theme-card text-theme-muted"}`}>
                    <Check size={20} weight="bold" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">오늘 하루 회고</span>
                    <span className="text-sm font-black txt-brand-ink">
                      {selectedEveningState === "YES" ? "잘 다독여냈어요" : "조금 힘들었어요"}
                    </span>
                  </div>
                </div>
                <CaretRight size={16} className="text-theme-muted" />
              </div>
            </div>

            {/* 3-B3. 저녁 매핑 리추얼 (추천 리추얼) */}
            <div className="w-full flex flex-col gap-3 pt-2">
              <div className="flex items-center justify-between pb-1 border-b border-theme-subtle">
                <h3 className="text-base font-extrabold txt-brand-ink">추천 리추얼</h3>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-theme-muted">
                    {isEveningAutoMapping ? "추천" : "고정"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEveningAutoMapping(!isEveningAutoMapping)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isEveningAutoMapping ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-700"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        isEveningAutoMapping ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div
                onClick={handleOpenEveningRitual}
                className="w-full bg-theme-card-subtle hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-theme-card text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs">
                    <img src={currentEveningRitual.icon} alt={currentEveningRitual.title} className="w-6.5 h-6.5 object-contain" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-indigo-600">{currentEveningRitual.category}</span>
                    <span className="text-sm font-black txt-brand-ink">{currentEveningRitual.title} · {currentEveningRitual.time}</span>
                  </div>
                </div>
                <CaretRight size={16} className="text-theme-muted" />
              </div>

              {/* 다른 리추얼 선택 텍스트 고스트 버튼 (은은한 회색) */}
              <MagicButton
                type="button"
                variant="ghost"
                onClick={() => setSelectingTarget("EVENING")}
                className="w-full py-2.5 text-theme-muted hover:txt-brand-ink font-bold text-sm border-0 flex items-center justify-center cursor-pointer"
              >
                <span>다른 리추얼 선택하기</span>
              </MagicButton>
            </div>
          </div>
        )}
      </div>

      {/* 4. 탭에 상관없이 항상 모달 하단에 고정된 루틴 완료 CTA 버튼 (테마 연동 플로팅 바) */}
      <div className="w-full px-5 pt-3 pb-6 bg-theme-app/95 backdrop-blur-md shrink-0 max-w-lg mx-auto sticky bottom-0 z-20 border-t-0">
        <MagicButton
          type="button"
          onClick={handleSave}
          className="w-full py-4 rounded-2xl shadow-md cursor-pointer"
        >
          {isSaved ? (
            <div className="flex items-center justify-center gap-2">
              <Check size={20} weight="bold" />
              <span>루틴이 저장되었습니다</span>
            </div>
          ) : (
            <span>이 시간으로 루틴 저장하기</span>
          )}
        </MagicButton>
      </div>

      {/* 다른 리추얼 선택 팝업 */}
      {selectingTarget && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-theme-card rounded-3xl p-5 flex flex-col gap-4 shadow-xl text-left border border-theme-subtle">
            <div className="flex items-center justify-between border-b border-theme-subtle pb-3">
              <h3 className="text-base font-black txt-brand-ink">
                {selectingTarget === "MORNING" ? "아침 추천 리추얼 선택" : "저녁 추천 리추얼 선택"}
              </h3>
              <button
                type="button"
                onClick={() => setSelectingTarget(null)}
                className="text-xs font-bold text-theme-muted hover:txt-brand-ink cursor-pointer transition-colors"
              >
                닫기
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {(selectingTarget === "MORNING" ? MORNING_RITUAL_OPTIONS : EVENING_RITUAL_OPTIONS).map((r) => (
                <div
                  key={r.title}
                  onClick={() => {
                    if (selectingTarget === "MORNING") {
                      setCurrentMorningRitual(r);
                    } else {
                      setCurrentEveningRitual(r);
                    }
                    setSelectingTarget(null);
                  }}
                  className="p-3 bg-theme-card-subtle hover:bg-emerald-50/80 dark:hover:bg-emerald-950/60 rounded-2xl flex items-center justify-between cursor-pointer border border-transparent hover:border-[#00C474] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-theme-card flex items-center justify-center shrink-0 shadow-2xs">
                      <img src={r.icon} alt={r.title} className="w-6 h-6 object-contain" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold txt-brand-green">{r.category}</span>
                      <span className="text-sm font-black txt-brand-ink">{r.title} · {r.time}</span>
                    </div>
                  </div>
                  <Check size={18} className="txt-brand-green" weight="bold" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
