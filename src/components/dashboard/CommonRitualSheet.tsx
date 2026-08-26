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
  // intro 단계이거나 execution의 첫 작성(TYPING) 단계일 때는 '✕' 닫기 버튼 노출 및 모달 전체 닫기
  const isExecutionMode = step === "execution";
  const isTypingState = shredderState === "TYPING";
  const leftType = isExecutionMode && !isTypingState ? "back" : "close";

  const handleLeftClick = () => {
    if (isExecutionMode && !isTypingState && resetHandlerRef.current) {
      resetHandlerRef.current(); // 파쇄 결과 화면에서 뒤로가기 클릭 시 -> 이전 "스트레스 분쇄 작성 화면"으로 되돌아가기!
    } else {
      closeModal(); // 작성 화면 및 인트로 화면에서는 모달 닫기!
    }
  };

  // 시작하기 화면 여부 (공통 시작하기 커버이거나 개별 시작하기 폼 화면인 경우)
  const isStartScreen =
    step === "intro" || (step === "execution" && shredderState === "TYPING");

  return (
    <div className="w-full h-full bg-white flex flex-col select-none relative text-gray-900 overflow-hidden">
      {/* 1. 상단 헤더 제어 (시작하기 Header [✕ + ⭐📋ℹ️] vs 실제 파쇄/완수 실행 Header [< 만 노출]) */}
      <div className="shrink-0">
        {isStartScreen ? (
          /* A. [공통 시작하기 & 개별 시작하기] 헤더: ✕ 닫기 버튼 + 3개 우측 메뉴 (⭐ 즐겨찾기, 📋 리스트, ℹ️ 상세설명) */
          <SubPageHeader
            title=""
            leftType="close"
            onLeftClick={closeModal}
            rightContent={
              <div className="flex items-center gap-1">
                {/* 즐겨찾기 (별 아이콘) */}
                <button
                  type="button"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2 rounded-full transition-all cursor-pointer ${
                    isBookmarked
                      ? "text-amber-400 bg-amber-50"
                      : "text-gray-500 hover:text-amber-500 hover:bg-gray-100"
                  }`}
                  title="리추얼 즐겨찾기"
                >
                  <Star
                    size={20}
                    weight={isBookmarked ? "fill" : "bold"}
                  />
                </button>

                {/* 리추얼 목록 / 스트레스 분쇄 전용 기록 보관함 */}
                <button
                  type="button"
                  onClick={() => {
                    if (displayTitle === "스트레스 분쇄") {
                      openModal({
                        type: "slide-up",
                        content: <StressShredHistorySheet onClose={closeModal} />,
                      });
                    } else {
                      closeModal();
                    }
                  }}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all cursor-pointer"
                  title={
                    displayTitle === "스트레스 분쇄"
                      ? "나의 스트레스 목록"
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
                        <div className="w-full bg-white p-6 rounded-t-3xl flex flex-col gap-4 max-w-lg mx-auto">
                          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900">
                              {displayTitle} 가이드
                            </h3>
                            <button
                              type="button"
                              onClick={closeModal}
                              className="text-gray-400 hover:text-gray-600 font-bold text-sm"
                            >
                              ✕ 닫기
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                            {displayTitle === "스트레스 분쇄"
                              ? "답답하고 억울했던 스트레스를 파쇄기에 넣고 비워내는 실천 리추얼입니다.\n속도 조절 노브를 사용해 자신에게 편안한 비움의 템포를 조절할 수 있습니다."
                              : `${displayTitle} 실천을 통해 마음의 평온과 긍정 에너지를 채워보세요.`}
                          </p>
                        </div>
                      ),
                    });
                  }}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all cursor-pointer"
                  title="리추얼 상세 가이드"
                >
                  <Info size={20} weight="bold" />
                </button>
              </div>
            }
          />
        ) : (
          /* B. [실제 파쇄 연출 및 결과 완수] 실행 헤더: 오직 < 뒤로가기 버튼만 표출 (우측 메뉴 100% 제거) */
          <SubPageHeader
            title=""
            leftType="back"
            onLeftClick={() => {
              if (shredderState !== "TYPING" && resetHandlerRef.current) {
                // 개별 리추얼 파쇄 연출/결과 화면에서 뒤로가기 클릭 시 -> 개별 시작하기(작성 폼) 화면으로 되돌아가기!
                resetHandlerRef.current();
              } else if (showIntro) {
                // 공통 시작하기 커버가 존재하던 경우 -> 공통 시작하기(Intro) 페이지로 되돌아가기
                setStep("intro");
              } else {
                closeModal();
              }
            }}
            rightContent={null}
          />
        )}
      </div>

      <div className={`flex flex-col w-full max-w-lg mx-auto flex-1 overflow-hidden justify-between ${step === "intro" ? "px-5 pt-3" : "px-0 pt-0"}`}>
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
                  className="w-full h-full object-contain drop-shadow-sm select-none"
                />
              </div>

              {/* 5. 실천 방법 팁 카드 Box */}
              {detail?.steps && (
                <div className="w-full bg-[#F8FAFC] rounded-2xl p-4 text-left border border-gray-100/60 my-1">
                  <span className="text-xs font-bold text-gray-800 block mb-2">
                    💡 실천 팁
                  </span>
                  <div className="flex flex-col gap-1.5 text-xs font-semibold text-gray-700">
                    {detail.steps.map((st, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-emerald-100 text-[#00C474] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-snug">{st}</span>
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
                className="w-full bg-[#00C474] text-white font-extrabold text-base py-4 rounded-full shadow-md hover:bg-[#00B068] transition-all cursor-pointer"
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
              <div className="flex flex-col justify-between flex-1 min-h-[460px] py-4 text-center items-center">
                <div className="flex flex-col items-center gap-4 my-auto w-full">
                  <span className="text-xs font-extrabold text-[#00C474] bg-emerald-50 px-3.5 py-1 rounded-full">
                    실행 진행 중 · {displayTime}
                  </span>

                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                    {displayTitle}
                  </h2>

                  {/* 3분/5분 타이머 포커스 원형 비주얼 */}
                  <div className="w-40 h-40 rounded-full border-4 border-[#00C474] bg-emerald-50/50 flex flex-col items-center justify-center my-4 shadow-sm relative overflow-hidden">
                    <span className="text-3xl font-black text-[#00C474] font-mono tracking-tight">
                      03:00
                    </span>
                    <span className="text-xs font-bold text-emerald-800 mt-1">
                      마음 집중 시간
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-gray-600 leading-relaxed max-w-xs">
                    숨을 천천히 들이마시고 내쉬며 눈앞의 동작 하나에 몰입해 보세요.
                  </p>
                </div>

                {/* 완수 버튼 */}
                <div className="w-full pt-6">
                  <MagicButton
                    type="button"
                    onClick={handleCompleteRitual}
                    className="w-full bg-[#00C474] text-white font-extrabold text-base py-4 rounded-full shadow-md hover:bg-[#00B068] transition-all flex items-center justify-center gap-2 cursor-pointer"
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
