"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuroraText } from "@/components/godui/AuroraText";
import { MagicButton } from "@/components/godui/MagicButton";
import { SelectChipButton } from "@/components/common/SelectChipButton";
import { Check } from "@phosphor-icons/react";
import {
  COURSES,
  DIFFICULTY_PRESETS,
  DifficultyLevel,
} from "./types";
import { SoundSynth } from "./SoundSynth";

interface EyeFocusSetupViewProps {
  setupStep: 1 | 2;
  setSetupStep: React.Dispatch<React.SetStateAction<1 | 2>>;
  isFullCourseMode: boolean;
  setIsFullCourseMode: React.Dispatch<React.SetStateAction<boolean>>;
  activeCourseIdx: number;
  setActiveCourseIdx: React.Dispatch<React.SetStateAction<number>>;
  selectedCourseType: "full" | number | null;
  setSelectedCourseType: React.Dispatch<React.SetStateAction<"full" | number | null>>;
  difficulty: DifficultyLevel;
  setDifficulty: React.Dispatch<React.SetStateAction<DifficultyLevel>>;
  soundRef: React.MutableRefObject<SoundSynth | null>;
  onStartPlay: () => void;
  addTimeout: (fn: () => void, ms: number) => NodeJS.Timeout;
}

/**
 * EyeFocusSetupView: 시선 맑음 시작 설정 화면 (STEP 1 코스 선택 & STEP 2 난이도 선택)
 */
export function EyeFocusSetupView({
  setupStep,
  setSetupStep,
  isFullCourseMode,
  setIsFullCourseMode,
  activeCourseIdx,
  setActiveCourseIdx,
  selectedCourseType,
  setSelectedCourseType,
  difficulty,
  setDifficulty,
  soundRef,
  onStartPlay,
  addTimeout,
}: EyeFocusSetupViewProps) {
  const handleSelectCourseAndNext = (isFull: boolean, idx: number) => {
    setSelectedCourseType(isFull ? "full" : idx);
    setIsFullCourseMode(isFull);
    setActiveCourseIdx(idx);
    soundRef.current?.playTick();
    addTimeout(() => {
      setSetupStep(2);
    }, 160);
  };

  const isFullSelected = selectedCourseType === "full";
  const currentCourse = COURSES[activeCourseIdx] || COURSES[0];

  return (
    <div className="w-full h-full flex flex-col justify-between flex-1 pt-1 pb-6 max-w-sm mx-auto overflow-hidden">
      {/* 1. 최상단 2분할 세그먼트 스텝 인디케이터 바 */}
      <div className="w-full flex gap-2 shrink-0 pt-1 pb-2">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-[#00C474] rounded-full"
              initial={{ width: i === 1 ? "100%" : "0%" }}
              animate={{ width: i <= setupStep ? "100%" : "0%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        ))}
      </div>

      {/* 2. 중앙 정렬 (vcenter) 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col justify-center items-center my-auto w-full py-2">
        <AnimatePresence mode="wait">
          {setupStep === 1 ? (
            /* ===================================================================
               STEP 1: 전체 or 개별 코스 선택 (선택 즉시 다음 단계 자동 전환)
               =================================================================== */
            <motion.div
              key="eye_focus_step_1"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4 w-full"
            >
              {/* 상단 체크인 뱃지 & 타이틀 */}
              <div className="flex flex-col justify-start shrink-0 text-left">
                <span className="txt-caption-main txt-brand-green uppercase font-semibold inline-flex items-center gap-1.5 mb-1">
                  <img
                    src="/images/logo_icon.svg"
                    alt="MindGym"
                    className="w-3.5 h-3.5 object-contain"
                  />
                  EYE FOCUS TRAINING STEP 01
                </span>

                <h1 className="text-[24px] sm:text-[26px] font-black text-gray-900 leading-snug">
                  지금 가장 알맞은 <br />
                  <AuroraText>훈련 코스를 선택해 주세요</AuroraText>
                </h1>
                <p className="text-xs text-gray-500 font-semibold mt-1.5 leading-relaxed">
                  통합 루틴을 완료해야 훈련 기록이 저장됩니다
                </p>
              </div>

              {/* 훈련 코스 선택 영역 */}
              <div className="flex flex-col gap-2.5 w-full pt-1">
                {/* 서브 타이틀 1: 전체 과정 */}
                <div className="flex items-center gap-3 w-full pt-2 pb-1">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-200 to-gray-200" />
                  <span className="text-base font-bold text-gray-900 shrink-0 text-center">
                    전체 과정
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gray-200 to-gray-200" />
                </div>

                {/* A. 4단계 전체 풀코스 카드 */}
                <button
                  type="button"
                  onClick={() => handleSelectCourseAndNext(true, 0)}
                  className={`w-full py-3.5 px-4 rounded-2xl text-sm font-semibold text-center transition-colors duration-150 cursor-pointer ${
                    isFullSelected
                      ? "bg-[#00C474] text-white shadow-xs border border-transparent"
                      : "bg-gray-100/90 text-gray-700 hover:bg-gray-200/80 active:scale-98 border border-transparent"
                  }`}
                >
                  <span>시선 맑음 통합 루틴</span>
                </button>

                {/* 서브 타이틀 2: 개별 과정 */}
                <div className="flex items-center gap-3 w-full pt-6 pb-1">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-200 to-gray-200" />
                  <span className="text-base font-bold text-gray-900 shrink-0 text-center">
                    개별 과정
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gray-200 to-gray-200" />
                </div>

                {/* B. 개별 코스 4개 칩 (텍스트 크기에 딱 맞춘 유기적 flex-wrap 칩) */}
                <div className="flex flex-wrap justify-center gap-2.5 w-full">
                  {COURSES.map((c, idx) => (
                    <SelectChipButton
                      key={c.mode}
                      label={c.shortTitle}
                      selected={selectedCourseType === idx}
                      onClick={() => handleSelectCourseAndNext(false, idx)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* ===================================================================
               STEP 2: 난이도 선택 & PLAY (이전 버튼 + 시작 버튼)
               =================================================================== */
            <motion.div
              key="eye_focus_step_2"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4 w-full"
            >
              {/* 상단 체크인 뱃지 & 타이틀 */}
              <div className="flex flex-col justify-start shrink-0 text-left">
                <span className="txt-caption-main txt-brand-green uppercase font-semibold inline-flex items-center gap-1.5 mb-1">
                  <img
                    src="/images/logo_icon.svg"
                    alt="MindGym"
                    className="w-3.5 h-3.5 object-contain"
                  />
                  EYE FOCUS TRAINING STEP 02
                </span>

                <h1 className="text-[24px] sm:text-[26px] font-black text-gray-900 leading-snug">
                  눈 피로도에 맞는 <br />
                  <AuroraText>훈련 난이도를 선택해 주세요</AuroraText>
                </h1>
                <p className="text-xs text-gray-500 font-semibold mt-1.5 leading-relaxed">
                  선택 코스:{" "}
                  <strong className="text-gray-900 font-bold">
                    {isFullCourseMode
                      ? "시선 맑음 통합 루틴"
                      : currentCourse.title}
                  </strong>
                </p>
              </div>

              {/* 서브 타이틀: 난이도 선택 */}
              <div className="flex items-center gap-3 w-full pt-2 pb-0.5">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-200 to-gray-200" />
                <span className="text-base font-bold text-gray-900 shrink-0 text-center">
                  난이도 선택
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gray-200 to-gray-200" />
              </div>

              {/* 난이도 3개 선택 카드 */}
              <div className="flex flex-col gap-2.5 w-full">
                {(["easy", "normal", "hard"] as DifficultyLevel[]).map(
                  (level) => {
                    const conf = DIFFICULTY_PRESETS[level];
                    const isActive = difficulty === level;
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => {
                          setDifficulty(level);
                          soundRef.current?.playTick();
                        }}
                        className={`w-full py-3.5 px-4 rounded-2xl text-[14px] font-bold text-left transition-colors duration-150 cursor-pointer flex items-center justify-between ${
                          isActive
                            ? "bg-[#00C474] text-white shadow-xs border border-transparent"
                            : "bg-gray-100/90 text-gray-700 hover:bg-gray-200/80 active:scale-98 border border-transparent"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-[15px] font-semibold">
                            {conf.label}
                          </span>
                          <span
                            className={`text-[12px] font-medium mt-0.5 ${
                              isActive
                                ? "text-emerald-50"
                                : "text-gray-500"
                            }`}
                          >
                            {level === "easy"
                              ? "안구 피로가 심할 때 부드러운 이완"
                              : level === "normal"
                              ? "임상 표준 시지각 자극"
                              : "고속 반응 및 순발력 강화"}
                          </span>
                        </div>
                        <div
                          className={`w-5 h-5 flex items-center justify-center shrink-0 transition-opacity duration-150 ${
                            isActive ? "opacity-100 text-white" : "opacity-0"
                          }`}
                        >
                          <Check size={18} weight="bold" />
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. 하단 네비게이션 액션 바 */}
      {setupStep === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2 shrink-0 pt-4 mt-auto w-full"
        >
          <div className="flex gap-2.5 w-full">
            {/* 이전 버튼 */}
            <button
              type="button"
              onClick={() => {
                soundRef.current?.playTick();
                setSelectedCourseType(null);
                setSetupStep(1);
              }}
              className="px-5 py-4 bg-gray-100/90 text-gray-700 hover:bg-gray-200/80 active:scale-95 text-base font-semibold rounded-2xl transition-all duration-200 shrink-0 cursor-pointer"
            >
              이전
            </button>

            {/* 시작하기 매직 버튼 */}
            <MagicButton
              type="button"
              onClick={onStartPlay}
              className="flex-1 py-4"
            >
              <span className="text-base font-extrabold tracking-tight flex items-center justify-center">
                시작하기
              </span>
            </MagicButton>
          </div>
        </motion.div>
      )}
    </div>
  );
}
