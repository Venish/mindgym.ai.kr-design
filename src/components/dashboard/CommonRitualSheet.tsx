"use client";

import React, { useState, useRef } from "react";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { useModalStore } from "@/store/useModalStore";
import { MagicButton } from "@/components/godui/MagicButton";
import { useMindGym } from "@/context/MindGymContext";
import { getIconPath } from "@/utils/iconMap";
import { getRitualDetail } from "@/data/ritualsDetailData";
import { RitualHeaderGroup } from "@/components/rituals/RitualHeaderGroup";
import {
  getRitualExecutionComponent,
  shouldShowRitualIntroCover,
} from "@/components/rituals/ritualsRegistry";
import { StressShredHistorySheet } from "@/components/rituals/RT018_StressShredder/StressShredHistorySheet";
import { EyeFocusHistorySheet } from "@/components/rituals/RT073_EyeFocus/EyeFocusHistorySheet";
import { RitualGuideSheet } from "@/components/rituals/RitualGuideSheet";
import { getRitualCategoryTheme } from "@/utils/ritualCategoryTheme";
import {
  Star,
  ListDashes,
  Info,
  Play,
  CheckCircle,
  Clock,
  Sparkle,
  X,
} from "@phosphor-icons/react";

interface CommonRitualSheetProps {
  ritualId?: string;
  ritualTitle?: string;
  ritualCategory?: string;
  ritualTime?: string;
  ritualLevel?: string;
  ritualPeriod?: string;
  ritualReward?: string;
  ritualIcon?: string;
  description?: string;
}

/**
 * CommonRitualSheet: 리추얼 클릭 시 오픈되는 공통 프레임 모달
 * - getRitualDetail 유틸을 통해 72개 리추얼의 아이콘, 소개글, 3단계 가이드를 100% 자동 매핑
 */
export function CommonRitualSheet({
  ritualId,
  ritualTitle,
  ritualCategory,
  ritualTime,
  ritualLevel,
  ritualPeriod,
  ritualReward,
  ritualIcon,
  description,
}: CommonRitualSheetProps) {
  const effectiveId = ritualId || (ritualTitle ? getRitualDetail(ritualTitle).id : "RT-001");
  const detail = getRitualDetail(effectiveId);
  const displayTitle = ritualTitle || detail.title;
  const displayCategory = ritualCategory || detail.category;
  const displayTime = ritualTime || detail.time;
  const displayLevel = ritualLevel || detail.level;
  const displayPeriod = ritualPeriod || detail.duration;
  const displayReward = ritualReward || detail.reward;
  const displayDesc = description || detail.desc;
  const actualIcon = ritualIcon || detail.iconPath;

  const { openModal, closeModal, clearModals } = useModalStore();
  const { addDumbbells } = useMindGym();

  const showIntro =
    shouldShowRitualIntroCover(effectiveId) &&
    shouldShowRitualIntroCover(displayTitle);

  const [step, setStep] = useState<"intro" | "execution">(
    showIntro ? "intro" : "execution"
  );
  const [shredderState, setShredderState] = useState<string>("TYPING");
  const resetHandlerRef = useRef<(() => void) | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // 완수 처리 (+3 DB 지급 및 쌓여 있던 모달 스택 전체를 한번에 클리어하여 메인 대시보드로 바로 직통 이동)
  const handleCompleteRitual = () => {
    addDumbbells(3);
    setIsCompleted(true);
    setTimeout(() => {
      clearModals();
    }, 600);
  };

  // 파쇄 진행/결과 상태(not TYPING)일 때만 '<' 화살표 노출 및 이전 "스트레스 분쇄 (작성 화면)"으로 리셋 되돌아가기
  // intro 단계이거나 시선맑음 등 직행 리추얼 / TYPING 단계일 때는 '✕' 닫기 버튼 노출 및 모달 전체 닫기
  // 파쇄 진행/결과 상태(not TYPING) 및 시선 맑음 게임 진행 상태(PLAYING/REST/SUMMARY) 체크
  const isStressShredding = displayTitle === "스트레스 분쇄" && step === "execution" && shredderState !== "TYPING";
  const isEyeFocusRitual = 
    displayTitle === "시선 맑음" || 
    displayTitle === "시선맑음" || 
    ritualTitle === "시선 맑음" || 
    ritualTitle === "시선맑음" || 
    effectiveId === "RT-073" || 
    effectiveId === "RT073";
  const isEyeFocusPlaying = isEyeFocusRitual && step === "execution" && shredderState !== "SETUP" && Boolean(shredderState);
  const leftType = isStressShredding ? "back" : "close";

  const handleLeftClick = () => {
    if (isStressShredding && resetHandlerRef.current) {
      resetHandlerRef.current(); // 파쇄 결과 화면에서 뒤로가기 클릭 시 -> 이전 "스트레스 분쇄 작성 화면"으로 되돌아가기!
    } else {
      closeModal(); // 작성 화면 및 인트로 화면에서는 모달 닫기!
    }
  };

  // 상단 3개 메뉴(⭐, 📋, ℹ️) 노출 여부 (파쇄 애니메이션 및 시선 맑음 게임 플레이 중에는 숨김)
  const showHeaderRightMenu = !isStressShredding && !isEyeFocusPlaying;

  // 카테고리별 고유 테마 (대표 메인 컬러 + 무지개 뉘앙스 수채화 그라디언트)
  const catTheme = getRitualCategoryTheme(displayCategory);

  return (
    <div
      data-ritual-sheet
      className={`w-full h-full flex flex-col select-none relative txt-brand-ink overflow-hidden border-none shadow-none ${
        step === "intro" ? catTheme.bgGradient : "bg-white"
      }`}
    >
      {/* 몽환적인 수채화/오로라 블러 번짐 배경 레이어 (4중 다채색 Watercolor Mesh Orbs - 인트로 화면에서만 렌더) */}
      <div
        className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${
          step === "intro" ? "block" : "hidden"
        }`}
      >
        {/* Orb 1: 우측 상단 메인 리추얼 컬러 */}
        <div
          className={`absolute -top-16 -right-12 w-84 h-84 rounded-full ${catTheme.orb1} blur-[65px] transform-gpu`}
        />
        {/* Orb 2: 좌측 중앙 조화 보조 컬러 */}
        <div
          className={`absolute top-1/4 -left-16 w-80 h-80 rounded-full ${catTheme.orb2} blur-[70px] transform-gpu`}
        />
        {/* Orb 3: 우측 하단 산뜻한 하이라이트 번짐 */}
        <div
          className={`absolute -bottom-12 -right-8 w-76 h-76 rounded-full ${catTheme.orb3} blur-[65px] transform-gpu`}
        />
        {/* Orb 4: 좌측 상단 은은한 앰비언트 번짐 */}
        <div
          className={`absolute -top-8 -left-8 w-64 h-64 rounded-full ${catTheme.orb4} blur-[60px] transform-gpu`}
        />
      </div>

      {/* 1. 상단 헤더 제어 (게임 플레이 중에는 완전 숨김) */}
      {!isEyeFocusPlaying && (
        <div className="shrink-0 z-20">
        {showHeaderRightMenu ? (
          /* A. 상단 풀 메뉴 헤더: ✕ 닫기 버튼 + 3개 우측 메뉴 (⭐ 즐겨찾기, 📋 리스트, ℹ️ 상세설명) */
          <SubPageHeader
            title=""
            leftType="close"
            onLeftClick={closeModal}
            className="bg-transparent"
            rightContent={
              <div className="flex items-center gap-1">
                {/* 즐겨찾기 (별 아이콘) */}
                <button
                  type="button"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2 rounded-full transition-all cursor-pointer ${
                    isBookmarked
                      ? "text-amber-400 bg-amber-50 dark:bg-amber-950/60"
                      : "text-theme-muted hover:text-amber-500 hover:bg-theme-card/40"
                  }`}
                  title="리추얼 즐겨찾기"
                >
                  <Star
                    size={20}
                    weight={isBookmarked ? "fill" : "bold"}
                  />
                </button>

                {/* 리추얼 전용 기록 보관함 (스트레스 분쇄 -> 나의 스트레스 목록, 시선 맑음 -> 시선 맑음 기록) */}
                <button
                  type="button"
                  onClick={() => {
                    if (displayTitle === "스트레스 분쇄") {
                      openModal({
                        type: "slide-up",
                        content: <StressShredHistorySheet onClose={closeModal} />,
                      });
                    } else if (
                      displayTitle === "시선맑음" ||
                      displayTitle === "시선 맑음" ||
                      effectiveId === "RT-073"
                    ) {
                      openModal({
                        type: "slide-up",
                        content: <EyeFocusHistorySheet onClose={closeModal} />,
                      });
                    } else {
                      closeModal();
                    }
                  }}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-white/40 transition-all cursor-pointer"
                  title={
                    displayTitle === "스트레스 분쇄"
                      ? "나의 스트레스 목록"
                      : displayTitle === "시선맑음" || displayTitle === "시선 맑음" || effectiveId === "RT-073"
                      ? "나의 시선 맑음"
                      : "전체 리추얼 목록 보기"
                  }
                >
                  <ListDashes size={20} weight="bold" />
                </button>

                {/* 리추얼 상세 가이드 설명 */}
                <button
                  type="button"
                  onClick={() => {
                    openModal({
                      type: "slide-up",
                      content: (
                        <RitualGuideSheet
                          ritualId={effectiveId}
                          ritualTitle={displayTitle}
                          onClose={closeModal}
                          onStart={() => {
                            setStep("execution");
                          }}
                        />
                      ),
                    });
                  }}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-white/40 transition-all cursor-pointer"
                  title="리추얼 가이드"
                >
                  <Info size={20} weight="bold" />
                </button>
              </div>
            }
          />
        ) : (
          /* B. 스트레스 분쇄 파쇄 연출 실행 헤더: 오직 < 뒤로가기 버튼만 표출 */
          <SubPageHeader
            title=""
            leftType="back"
            className="bg-transparent"
            onLeftClick={() => {
              if (resetHandlerRef.current) {
                resetHandlerRef.current();
              } else {
                closeModal();
              }
            }}
            rightContent={null}
          />
        )}
      </div>
      )}

      <div className={`flex flex-col w-full max-w-lg mx-auto flex-1 overflow-hidden justify-between z-10 ${step === "intro" ? "px-5 pt-3" : "px-0 pt-0"}`}>
        {step === "intro" ? (
          /* =========================================================================
             Step 1. 시작하기 페이지 (Intro View - 콘텐츠 동적 가변 스크롤)
             ========================================================================= */
          <div className="flex flex-col justify-between items-center flex-1 h-full pt-2 pb-6 text-center overflow-hidden">
            {/* 중간 콘텐츠 스크롤 영역 */}
            <div className="flex flex-col items-center gap-4 text-center max-w-sm w-full my-auto overflow-y-auto pr-0.5">
              {/* 리추얼 공통 상단 헤더 그룹 (뱃지 + 대형타이틀 + 4개 칩 + 설명문구) */}
              <RitualHeaderGroup
                category={displayCategory}
                title={displayTitle}
                time={displayTime}
                level={displayLevel}
                period={displayPeriod}
                reward={displayReward}
                description={displayDesc}
              />

              {/* 4. 본문 설명 바로 아래 3D 그래픽 이미지 단독 표출 */}
              <div className="w-28 h-28 flex items-center justify-center shrink-0 my-1">
                <img
                  src={actualIcon}
                  alt={displayTitle}
                  className="w-full h-full object-contain drop-shadow-md select-none"
                />
              </div>

              {/* 5. 실천 방법 팁 (박스 없이 수채화 캔버스 위에 플랫하게 배치) */}
              {detail?.steps && (
                <div className="w-full text-left my-1 px-1 text-slate-900">
                  <span className="text-xs font-black tracking-wider text-slate-900 block mb-2 font-mono">
                    TIP
                  </span>
                  <div className="flex flex-col gap-2 text-xs font-semibold text-slate-800">
                    {detail.steps.map((st, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-slate-800">
                        <span
                          className={`w-4 h-4 rounded-full ${catTheme.badgeBg} ${catTheme.badgeText} font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5`}
                        >
                          {idx + 1}
                        </span>
                        <span className="leading-snug text-slate-800">{st}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 시작하기 버튼 */}
            <div className="w-full pt-4 max-w-sm mx-auto shrink-0">
              <MagicButton
                type="button"
                onClick={() => setStep("execution")}
                style={{ backgroundColor: catTheme.primaryColor }}
                className="w-full text-white font-extrabold text-base py-4 rounded-full shadow-md hover:brightness-95 transition-all cursor-pointer"
              >
                리추얼 시작하기
              </MagicButton>
            </div>
          </div>
        ) : (
          /* =========================================================================
             Step 2. 실행 페이지 (Execution View)
             ========================================================================= */
          (() => {
            const DedicatedExecution = getRitualExecutionComponent(effectiveId || ritualTitle);
            if (DedicatedExecution) {
              return (
                <DedicatedExecution
                  onComplete={handleCompleteRitual}
                  onStateChange={(st: string) => setShredderState(st)}
                  registerResetHandler={(fn: () => void) => {
                    resetHandlerRef.current = fn;
                  }}
                />
              );
            }

            return (
              <div data-ritual-sheet className="flex flex-col justify-between flex-1 min-h-[460px] py-4 text-center items-center border-none shadow-none">
                <div className="flex flex-col items-center gap-4 my-auto w-full">
                  <span className={`text-xs font-extrabold px-3.5 py-1 rounded-full ${catTheme.badgeBg} ${catTheme.badgeText}`}>
                    실행 진행 중 · {displayTime}
                  </span>

                  <h2 className="text-2xl font-black txt-brand-ink tracking-tight">
                    {displayTitle}
                  </h2>

                  {/* 3분/5분 타이머 포커스 원형 비주얼 */}
                  <div
                    style={{ borderColor: catTheme.primaryColor }}
                    className="w-40 h-40 rounded-full border-4 bg-white/70 backdrop-blur-md flex flex-col items-center justify-center my-4 shadow-sm relative overflow-hidden"
                  >
                    <span
                      style={{ color: catTheme.primaryColor }}
                      className="text-3xl font-black font-mono tracking-tight"
                    >
                      03:00
                    </span>
                    <span className="text-xs font-bold txt-brand-ink mt-1">
                      마음 집중 시간
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-theme-muted leading-relaxed max-w-xs">
                    숨을 천천히 들이마시고 내쉬며 눈앞의 동작 하나에 몰입해 보세요.
                  </p>
                </div>

                {/* 완수 버튼 */}
                <div className="w-full pt-6">
                  <MagicButton
                    type="button"
                    onClick={handleCompleteRitual}
                    style={{ backgroundColor: catTheme.primaryColor }}
                    className="w-full text-white font-extrabold text-base py-4 rounded-full shadow-md hover:brightness-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle size={20} weight="fill" />
                        <span>+3 덤벨 적립 및 완수 완료</span>
                      </>
                    ) : (
                      <span>실천 완수하기 (+3 DB)</span>
                    )}
                  </MagicButton>
                </div>
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
}
