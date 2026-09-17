"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SpeakerHigh,
  SpeakerSlash,
  CaretLeft,
  Trophy,
  Target,
  Clock,
  CheckCircle,
} from "@phosphor-icons/react";
import { DifficultyLevel } from "./types";
import { EyeFocusEngineReturn } from "./useEyeFocusEngine";

interface EyeFocusGameViewProps {
  playState: "PLAYING" | "REST" | "SUMMARY";
  isFullCourseMode: boolean;
  activeCourseIdx: number;
  difficulty: DifficultyLevel;
  soundMuted: boolean;
  onToggleSound: () => void;
  onReturnToSetup: () => void;
  onRetry: () => void;
  onComplete?: () => void;
  engine: EyeFocusEngineReturn;
}

export function EyeFocusGameView({
  playState,
  isFullCourseMode,
  activeCourseIdx,
  soundMuted,
  onToggleSound,
  onReturnToSetup,
  onRetry,
  onComplete,
  engine,
}: EyeFocusGameViewProps) {
  const {
    round,
    maxRoundsPerCourse,
    hits,
    misses,
    lastReactionTime,
    reactionTimes,
    score,
    routineSummary,
    restSeconds,
    countdown,
    showAnswerPad,
    toastMessage,
    canvasRef,
    canvasWrapperRef,
    currentCourse,
    handleUserAnswer,
    handleCanvasPointerDown,
    handleStartNextCourse,
  } = engine;

  // 실시간 계산
  const totalRounds = hits + misses || 1;
  const accuracy = Math.round((hits / totalRounds) * 100);

  // 최종 요약 계산 (통합 vs 개별)
  const finalHits = isFullCourseMode ? routineSummary.totalHits + hits : hits;
  const finalMisses = isFullCourseMode ? routineSummary.totalMisses + misses : misses;
  const finalScore = isFullCourseMode ? routineSummary.totalScore + score : score;
  const finalTimes = isFullCourseMode
    ? [...routineSummary.allReactionTimes, ...reactionTimes]
    : reactionTimes;
  const finalTotal = finalHits + finalMisses || 1;
  const finalAccuracy = Math.round((finalHits / finalTotal) * 100);
  const finalAvgReactionTime =
    finalTimes.length > 0
      ? Math.round(finalTimes.reduce((a, b) => a + b, 0) / finalTimes.length)
      : 280;

  return (
    <div className="w-full h-full flex flex-col justify-between flex-1 px-4 pt-1 pb-4 max-w-lg mx-auto select-none overflow-hidden bg-[#060a12] text-white">
      {/* ========================================================================= */}
      {/* 1. 상단 전용 헤더 (기존 서브페이지 헤더와 100% 동일한 높이 56px, 폰트 규격 및 < 버튼) */}
      {/* ========================================================================= */}
      <div className="w-full h-[56px] min-h-[56px] flex items-center justify-between px-0 relative shrink-0 mb-1">
        {/* 좌측: < 뒤로가기 아이콘 버튼 */}
        <div className="flex items-center justify-start z-10 min-w-[40px] h-full">
          <button
            type="button"
            onClick={onReturnToSetup}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors outline-none cursor-pointer"
            title="코스 선택으로 돌아가기"
            aria-label="코스 선택으로 돌아가기"
          >
            <CaretLeft size={24} weight="bold" />
          </button>
        </div>

        {/* 중앙: 스텝 뱃지 + 코스명 + 라운드 번호 (줄바꿈/말줄임 없이 항상 완벽한 1줄 정렬) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-1.5 text-center pointer-events-none z-0 whitespace-nowrap">
          {isFullCourseMode && (
            <span className="text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-[#00C474]/20 text-[#00C474] shrink-0">
              STEP {activeCourseIdx + 1}/4
            </span>
          )}
          <h1 className="text-base sm:text-lg font-bold text-white tracking-tight shrink-0">
            {currentCourse.title}
          </h1>
          <span className="text-xs font-semibold text-slate-400 tabular-nums shrink-0">
            ({Math.max(1, round)}/{maxRoundsPerCourse})
          </span>
        </div>

        {/* 우측: 사운드 토글 버튼 */}
        <div className="flex items-center justify-end z-10 min-w-[40px] h-full">
          <button
            type="button"
            onClick={onToggleSound}
            className={`p-1.5 rounded-full transition-all cursor-pointer ${
              soundMuted
                ? "text-slate-600 hover:text-slate-400"
                : "text-slate-400 hover:text-white hover:bg-white/10"
            }`}
            aria-label={soundMuted ? "소리 켜기" : "소리 끄기"}
            title={soundMuted ? "소리 켜기" : "소리 끄기"}
          >
            {soundMuted ? (
              <SpeakerSlash size={22} weight="bold" />
            ) : (
              <SpeakerHigh size={22} weight="bold" />
            )}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. 대형 60FPS 캔버스 뷰포트 (화면 높이에 맞춰 100% 꽉 채우는 가변 뷰포트) */}
      {/* ========================================================================= */}
      <div
        ref={canvasWrapperRef}
        className="relative w-full flex-1 min-h-[320px] h-full bg-[#060a12] rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-center border border-slate-800 mx-auto"
      >
        <canvas
          ref={canvasRef}
          onPointerDown={handleCanvasPointerDown}
          className="w-full h-full block cursor-crosshair touch-none"
        />

        {/* 3-2-1 카운트다운 오버레이 */}
        <AnimatePresence>
          {countdown !== null && (
            <motion.div
              key={`ef_countdown_${countdown}`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.25, opacity: 1 }}
              exit={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/65 backdrop-blur-xs pointer-events-none"
            >
              <span className="text-7xl font-black text-[#00C474] drop-shadow-[0_0_24px_rgba(0,196,116,0.65)] tabular-nums">
                {countdown}
              </span>
              <span className="mt-2 text-xs font-semibold text-white/90">
                화면 중앙을 주시하세요
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 피드백 토스트 (원본 HTML 100% 동일) */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`absolute top-4 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg z-30 pointer-events-none ${
                toastMessage.isCorrect
                  ? "bg-emerald-500 text-white shadow-emerald-500/40"
                  : "bg-rose-500 text-white shadow-rose-500/40"
              }`}
            >
              {toastMessage.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 원본 HTML과 100% 동일한 1~9 숫자 키패드 오버레이 (answerPadOverlay) */}
        <AnimatePresence>
          {showAnswerPad && playState === "PLAYING" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
            >
              <h3 className="text-base sm:text-lg font-bold text-slate-200 mb-1">
                포착한 번호를 누르세요
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                가장 먼저 떠오른 잔상을 선택하세요
              </p>
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5 w-60 max-w-full mb-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleUserAnswer(num)}
                    className="py-3 rounded-xl font-bold text-lg bg-slate-800/90 hover:bg-indigo-600 text-white active:scale-95 transition-all shadow-sm flex items-center justify-center border border-slate-700 cursor-pointer"
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="text-[11px] text-slate-500">
                PC 사용자는 키보드 숫자키(1~9)를 누르셔도 됩니다.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 단계 간 휴식(REST) 오버레이 (원본 HTML 100% 동일) */}
        <AnimatePresence>
          {playState === "REST" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 z-25 flex flex-col items-center justify-center p-6 bg-slate-950/95 backdrop-blur-md text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-3xl mb-3">
                🍵
              </div>
              <h3 className="text-xl font-black text-white mb-1">
                한 세트 완료, 맑은 쉼의 시간
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-sm mb-4 leading-relaxed">
                화면에서 시선을 떼고 <b>먼 곳(창밖 6m 이상)을 바라보며 깊게 숨을 들이마시고 내쉬어보세요.</b>
              </p>
              <div className="text-4xl font-black text-emerald-400 mb-4 tracking-wider tabular-nums">
                {restSeconds}
              </div>
              <button
                type="button"
                onClick={handleStartNextCourse}
                className="w-full max-w-xs py-4 rounded-2xl bg-[#00C474] hover:bg-[#00B067] text-white text-base sm:text-lg font-extrabold shadow-md active:scale-95 transition-all cursor-pointer"
              >
                바로 이어서 하기
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 최종 결과 요약(SUMMARY) 모달 오버레이 (원본 HTML 100% 동일) */}
        <AnimatePresence>
          {playState === "SUMMARY" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center p-5 bg-slate-950/95 backdrop-blur-md text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-3xl mb-3 shadow-lg shadow-indigo-500/20">
                🌿
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
                {isFullCourseMode ? "오늘의 맑은 시선 리추얼 완료!" : "선택 세션 완료!"}
              </h3>
              <p className="text-xs text-slate-300 mb-4">
                {isFullCourseMode
                  ? "잡념이 걷히고 시선과 머릿속이 한결 맑아졌습니다."
                  : `${currentCourse.title} 훈련이 완료되었습니다.`}
              </p>

              {/* 3대 핵심 요약 스탯 */}
              <div className="w-full max-w-sm grid grid-cols-3 gap-2 p-3 bg-slate-900/90 rounded-xl border border-slate-800 mb-5">
                <div className="flex flex-col items-center">
                  <span className="text-[11px] text-gray-400 font-medium">정답률</span>
                  <span className="text-base font-black text-[#00C474] tabular-nums">
                    {finalAccuracy}%
                  </span>
                </div>
                <div className="flex flex-col items-center border-x border-slate-800">
                  <span className="text-[11px] text-gray-400 font-medium">평균 반응</span>
                  <span className="text-base font-black text-cyan-400 tabular-nums">
                    {finalAvgReactionTime}ms
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[11px] text-gray-400 font-medium">집중 점수</span>
                  <span className="text-base font-black text-amber-400 tabular-nums">
                    {finalScore}점
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full max-w-sm">
                <button
                  type="button"
                  onClick={onRetry}
                  className="flex-1 py-4 rounded-2xl font-extrabold bg-slate-800 text-gray-200 hover:bg-slate-700 active:scale-95 transition-all text-base sm:text-lg cursor-pointer"
                >
                  다시하기
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onComplete) onComplete();
                    else onReturnToSetup();
                  }}
                  className="flex-1 py-4 rounded-2xl font-extrabold bg-[#00C474] text-white hover:bg-[#00B067] active:scale-95 transition-all text-base sm:text-lg shadow-md cursor-pointer flex items-center justify-center"
                >
                  오늘 그만하기
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* 3. 하단 실시간 스탯 바 (기본 다크모드 전용 톤) */}
      {/* ========================================================================= */}
      <div className="w-full mt-2.5 grid grid-cols-3 gap-2 shrink-0">
        <div className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800/80">
          <div className="flex items-center gap-1 text-xs text-slate-400 mb-0.5">
            <Target size={14} weight="bold" className="text-[#00C474]" />
            <span className="text-xs">정답률</span>
          </div>
          <span className="text-base font-bold text-white tabular-nums">
            {accuracy}%
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800/80">
          <div className="flex items-center gap-1 text-xs text-slate-400 mb-0.5">
            <Clock size={14} weight="bold" className="text-amber-400" />
            <span className="text-xs">반응속도</span>
          </div>
          <span className="text-base font-bold text-white tabular-nums">
            {lastReactionTime > 0 ? `${lastReactionTime}ms` : "0ms"}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800/80">
          <div className="flex items-center gap-1 text-xs text-slate-400 mb-0.5">
            <Trophy size={14} weight="bold" className="text-sky-400" />
            <span className="text-xs">누적 점수</span>
          </div>
          <span className="text-base font-bold text-white tabular-nums">
            {score}점
          </span>
        </div>
      </div>
    </div>
  );
}
