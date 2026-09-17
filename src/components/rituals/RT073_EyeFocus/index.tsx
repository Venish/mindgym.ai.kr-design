"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { RT073EyeFocusProps, DifficultyLevel, COURSES } from "./types";
import { SoundSynth } from "./SoundSynth";
import { useEyeFocusEngine } from "./useEyeFocusEngine";
import { EyeFocusSetupView } from "./EyeFocusSetupView";
import { EyeFocusGameView } from "./EyeFocusGameView";
import { EyeFocusHistorySheet } from "./EyeFocusHistorySheet";

/**
 * RT073_EyeFocus (시선 맑음 - 안구 운동 및 시지각 민첩성 훈련)
 *
 * 구조:
 * 1. SETUP (STEP 1: 코스 선택, STEP 2: 난이도 선택) -> EyeFocusSetupView
 * 2. PLAYING / REST / SUMMARY (실제 훈련 및 결과) -> EyeFocusGameView
 * 3. 훈련 통계 및 기록 -> EyeFocusHistorySheet
 */
export function RT073_EyeFocus({
  onComplete,
  onStateChange,
  registerResetHandler,
}: RT073EyeFocusProps) {
  // 1. 상태 머신 관리
  const [playState, setPlayState] = useState<"SETUP" | "PLAYING" | "REST" | "SUMMARY">("SETUP");
  const [setupStep, setSetupStep] = useState<1 | 2>(1);
  const [isFullCourseMode, setIsFullCourseMode] = useState<boolean>(true);
  const [activeCourseIdx, setActiveCourseIdx] = useState<number>(0);
  const [selectedCourseType, setSelectedCourseType] = useState<"full" | number | null>(null);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("normal");
  const [soundMuted, setSoundMuted] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  // 2. 사운드 및 타이머 참조
  const soundRef = useRef<SoundSynth | null>(null);
  const timeoutIdsRef = useRef<NodeJS.Timeout[]>([]);

  const addTimeout = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timeoutIdsRef.current.push(id);
    return id;
  }, []);

  const clearAllTimeouts = useCallback(() => {
    timeoutIdsRef.current.forEach((id) => clearTimeout(id));
    timeoutIdsRef.current = [];
  }, []);

  // 사운드 인스턴스 초기화
  useEffect(() => {
    soundRef.current = new SoundSynth();
    return () => {
      clearAllTimeouts();
      soundRef.current = null;
    };
  }, [clearAllTimeouts]);

  // 부모 컴포넌트에 상태 변경 알림 (PLAYING 시 공통 헤더 숨김 제어)
  useEffect(() => {
    onStateChange?.(playState);
  }, [playState, onStateChange]);

  // 3. 훈련 엔진 훅 연결
  const engine = useEyeFocusEngine({
    playState,
    setPlayState,
    isFullCourseMode,
    activeCourseIdx,
    setActiveCourseIdx,
    difficulty,
    soundRef,
    addTimeout,
    clearAllTimeouts,
    onStateChange,
  });

  // 4. 게임 시작 핸들러 (3-2-1 카운트다운 가동 전 완전 초기화)
  const handleStartPlay = useCallback(() => {
    clearAllTimeouts();
    engine.resetEngine();
    setPlayState("PLAYING");
    onStateChange?.("PLAYING");

    engine.setCountdown(3);
    soundRef.current?.playTick();

    addTimeout(() => {
      engine.setCountdown(2);
      soundRef.current?.playTick();
    }, 800);

    addTimeout(() => {
      engine.setCountdown(1);
      soundRef.current?.playTick();
    }, 1600);

    addTimeout(() => {
      engine.setCountdown(null);
      soundRef.current?.playStart();
      engine.startNextRound();
    }, 2400);
  }, [clearAllTimeouts, engine, onStateChange, addTimeout]);

  // 5. 동일 코스 즉시 다시하기 핸들러 (코스 선택 화면으로 가지 않고 즉시 재도전)
  const handleRetryCurrentCourse = useCallback(() => {
    clearAllTimeouts();
    engine.resetEngine();
    if (isFullCourseMode) {
      setActiveCourseIdx(0);
    }
    setPlayState("PLAYING");
    onStateChange?.("PLAYING");

    engine.setCountdown(3);
    soundRef.current?.playTick();

    addTimeout(() => {
      engine.setCountdown(2);
      soundRef.current?.playTick();
    }, 800);

    addTimeout(() => {
      engine.setCountdown(1);
      soundRef.current?.playTick();
    }, 1600);

    addTimeout(() => {
      engine.setCountdown(null);
      soundRef.current?.playStart();
      engine.startNextRound();
    }, 2400);
  }, [clearAllTimeouts, engine, isFullCourseMode, onStateChange, addTimeout]);

  // 6. 초기 설정으로 복귀 핸들러 (엔진 및 UI 완전 초기화)
  const handleReturnToSetup = useCallback(() => {
    clearAllTimeouts();
    engine.resetEngine();
    setPlayState("SETUP");
    setSetupStep(1);
    setSelectedCourseType(null);
    setIsFullCourseMode(true);
    setActiveCourseIdx(0);
    onStateChange?.("SETUP");
  }, [clearAllTimeouts, engine, onStateChange]);

  // 7. 리셋 핸들러 등록
  useEffect(() => {
    if (registerResetHandler) {
      registerResetHandler(() => {
        handleReturnToSetup();
      });
    }
  }, [registerResetHandler, handleReturnToSetup]);

  // 사운드 토글
  const handleToggleSound = useCallback(() => {
    if (soundRef.current) {
      const nextMuted = soundRef.current.toggleMute();
      setSoundMuted(nextMuted);
    }
  }, []);

  return (
    <div data-ritual-sheet className={`w-full h-full flex flex-col justify-between flex-1 transition-colors duration-300 ${playState !== "SETUP" ? "bg-[#060a12]" : ""}`}>
      {/* 1) STEP 1 & 2 설정 화면 (기본 진입 화면) */}
      {playState === "SETUP" ? (
        <EyeFocusSetupView
          setupStep={setupStep}
          setSetupStep={setSetupStep}
          isFullCourseMode={isFullCourseMode}
          setIsFullCourseMode={setIsFullCourseMode}
          activeCourseIdx={activeCourseIdx}
          setActiveCourseIdx={setActiveCourseIdx}
          selectedCourseType={selectedCourseType}
          setSelectedCourseType={setSelectedCourseType}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          soundRef={soundRef}
          onStartPlay={handleStartPlay}
          addTimeout={addTimeout}
        />
      ) : (
        /* 2) 훈련 게임 화면 (PLAYING / REST / SUMMARY) */
        <EyeFocusGameView
          playState={playState}
          isFullCourseMode={isFullCourseMode}
          activeCourseIdx={activeCourseIdx}
          difficulty={difficulty}
          soundMuted={soundMuted}
          onToggleSound={handleToggleSound}
          onReturnToSetup={handleReturnToSetup}
          onRetry={handleRetryCurrentCourse}
          onComplete={onComplete}
          engine={engine}
        />
      )}

      {/* 3) 훈련 통계 및 기록 시트 */}
      {isHistoryOpen && (
        <EyeFocusHistorySheet onClose={() => setIsHistoryOpen(false)} />
      )}
    </div>
  );
}

export default RT073_EyeFocus;
