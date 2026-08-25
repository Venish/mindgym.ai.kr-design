"use client";

import React, { useState } from "react";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { useModalStore } from "@/store/useModalStore";
import { MagicButton } from "@/components/godui/MagicButton";
import { useMindGym } from "@/context/MindGymContext";
import { getIconPath } from "@/utils/iconMap";
import { getRitualDetail } from "@/data/ritualsDetailData";
import { getRitualExecutionComponent } from "@/components/rituals/ritualsRegistry";
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
  ritualId = "RT-001",
  ritualTitle,
  ritualCategory,
  ritualTime,
  ritualLevel,
  ritualPeriod,
  ritualReward,
  ritualIcon,
  description,
}: CommonRitualSheetProps) {
  const detail = getRitualDetail(ritualId || ritualTitle);
  const displayTitle = ritualTitle || detail.title;
  const displayCategory = ritualCategory || detail.category;
  const displayTime = ritualTime || detail.time;
  const displayLevel = ritualLevel || detail.level;
  const displayPeriod = ritualPeriod || detail.duration;
  const displayReward = ritualReward || detail.reward;
  const displayDesc = description || detail.desc;
  const actualIcon = ritualIcon || detail.iconPath;

  const { closeModal, clearModals } = useModalStore();
  const { addDumbbells } = useMindGym();

  const [step, setStep] = useState<"intro" | "execution">("intro");
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

  return (
    <div className="w-full min-h-full bg-white flex flex-col select-none relative pb-12 text-gray-900 overflow-y-auto">
      {/* 1. 상단 헤더 제어: 0단계 인트로에는 서브헤더, 1단계 이후 실천 뷰에는 우측 상단 공통 X (닫기) 버튼만 표출 */}
      {step === "intro" ? (
        <SubPageHeader
          title=""
          leftType="back"
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

              {/* 리스트 보기 */}
              <button
                type="button"
                onClick={() => {}}
                className="p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all cursor-pointer"
                title="리추얼 리스트 보기"
              >
                <ListDashes size={20} weight="bold" />
              </button>

              {/* 설명하기 */}
              <button
                type="button"
                onClick={() => {}}
                className="p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all cursor-pointer"
                title="리추얼 상세 설명하기"
              >
                <Info size={20} weight="bold" />
              </button>
            </div>
          }
        />
      ) : (
        <div className="w-full flex items-center justify-end px-5 py-4 shrink-0 border-b border-gray-100/60">
          <button
            type="button"
            onClick={closeModal}
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer"
            title="닫기"
          >
            <X size={22} weight="bold" />
          </button>
        </div>
      )}

      <div className="flex flex-col w-full px-5 pt-3 gap-6 text-left max-w-lg mx-auto flex-1 justify-between">
        {step === "intro" ? (
          /* =========================================================================
             Step 1. 시작하기 페이지 (Intro View)
             ========================================================================= */
          <div className="flex flex-col justify-between items-center my-auto flex-1 min-h-[460px] py-4 text-center">
            <div className="flex flex-col items-center gap-4 text-center max-w-sm w-full my-auto">
              {/* 1. 카테고리 뱃지 단독 표출 */}
              <div className="flex items-center justify-center">
                <span className="text-xs font-extrabold text-[#00C474] bg-emerald-50 px-3.5 py-1 rounded-full">
                  {displayCategory}
                </span>
              </div>

              {/* 2. 대형 리추얼 타이틀 */}
              <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-tight text-center pt-1">
                {displayTitle}
              </h1>

              {/* 4개 멀티컬러 정사각형 칩 */}
              <div className="flex items-center justify-center gap-2 pt-1 pb-1">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-amber-100/90 text-center shadow-2xs shrink-0">
                  <span className="text-xs font-bold text-gray-900">{displayTime}</span>
                </div>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-purple-100/90 text-center shrink-0">
                  <span className="text-xs font-bold text-gray-900">{displayLevel}</span>
                </div>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-sky-100/90 text-center shrink-0">
                  <span className="text-xs font-bold text-gray-900">{displayPeriod}</span>
                </div>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-rose-200/90 text-center shadow-xs shrink-0">
                  <span className="text-xs font-bold text-gray-900">{displayReward}</span>
                </div>
              </div>

              {/* 3. 기본 본문 설명 문구 */}
              <p className="text-base font-medium text-gray-600 leading-relaxed tracking-normal text-center pt-1">
                {displayDesc}
              </p>

              {/* 4. 본문 설명 바로 아래 3D 그래픽 이미지 단독 표출 */}
              <div className="w-28 h-28 flex items-center justify-center shrink-0 my-1">
                <img
                  src={actualIcon}
                  alt={displayTitle}
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>

              {/* 5. 3단계 실천 요약 가이드 */}
              {detail.steps && (
                <div className="w-full bg-gray-50 rounded-xl p-3.5 flex flex-col gap-2 text-left border border-gray-100/80 mt-1">
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider">
                    실천 가이드 3-STEPS
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

            {/* 5. 하단 시작하기 버튼 영역 (바로 위에 완수 보상 안내 박스 배치) */}
            <div className="w-full pt-4 flex flex-col gap-3 max-w-sm">
              {/* 완수 보상 안내 박스 (타이틀 제거, 폰트 볼드 제거 & 폰트 크기 업) */}
              <div className="w-full bg-[#F8FAFC] rounded-2xl py-3 px-4 flex items-center justify-center text-center border border-gray-100/60">
                <p className="text-sm font-medium text-gray-600 text-center">
                  실천을 완수하면 <span className="text-[#00C474] font-semibold">+3 덤벨</span> 및 출석 도장이 즉시 부여됩니다
                </p>
              </div>

              {/* 시작하기 CTA 버튼 */}
              <MagicButton
                type="button"
                onClick={() => setStep("execution")}
                className="w-full bg-[#00C474] text-white font-extrabold text-base py-4 rounded-full shadow-md hover:bg-[#00B068] transition-all flex items-center justify-center cursor-pointer"
              >
                <span>시작하기</span>
              </MagicButton>
            </div>
          </div>
        ) : (
          /* =========================================================================
             Step 2. 실행 페이지 (Execution View)
             ========================================================================= */
          (() => {
            const DedicatedExecution = getRitualExecutionComponent(ritualId || ritualTitle);
            if (DedicatedExecution) {
              return <DedicatedExecution onComplete={handleCompleteRitual} />;
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
