"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  COURSES,
  DIFFICULTY_PRESETS,
  DifficultyLevel,
  TargetEntity,
  RoutineSummary,
} from "./types";
import { SoundSynth } from "./SoundSynth";
import { saveEyeFocusRecord } from "./EyeFocusHistorySheet";

interface UseEyeFocusEngineProps {
  playState: "SETUP" | "PLAYING" | "REST" | "SUMMARY";
  setPlayState: React.Dispatch<React.SetStateAction<"SETUP" | "PLAYING" | "REST" | "SUMMARY">>;
  isFullCourseMode: boolean;
  activeCourseIdx: number;
  setActiveCourseIdx: React.Dispatch<React.SetStateAction<number>>;
  difficulty: DifficultyLevel;
  soundRef: React.MutableRefObject<SoundSynth | null>;
  addTimeout: (fn: () => void, ms: number) => NodeJS.Timeout;
  clearAllTimeouts: () => void;
  onStateChange?: (state: string) => void;
}

export function useEyeFocusEngine({
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
}: UseEyeFocusEngineProps) {
  const maxRoundsPerCourse = 10;
  const [round, setRound] = useState<number>(0);
  const roundRef = useRef<number>(0);
  roundRef.current = round;

  const [hits, setHits] = useState<number>(0);
  const hitsRef = useRef<number>(0);
  hitsRef.current = hits;

  const [misses, setMisses] = useState<number>(0);
  const missesRef = useRef<number>(0);
  missesRef.current = misses;

  const [lastReactionTime, setLastReactionTime] = useState<number>(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const reactionTimesRef = useRef<number[]>([]);
  reactionTimesRef.current = reactionTimes;

  const [score, setScore] = useState<number>(0);
  const scoreRef = useRef<number>(0);
  scoreRef.current = score;

  const [routineSummary, setRoutineSummary] = useState<RoutineSummary>({
    totalHits: 0,
    totalMisses: 0,
    totalScore: 0,
    allReactionTimes: [],
  });
  const routineSummaryRef = useRef<RoutineSummary>({
    totalHits: 0,
    totalMisses: 0,
    totalScore: 0,
    allReactionTimes: [],
  });
  routineSummaryRef.current = routineSummary;

  const [restSeconds, setRestSeconds] = useState<number>(15);
  const restTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [countdown, setCountdown] = useState<number | null>(null);
  const [showAnswerPad, setShowAnswerPad] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; isCorrect: boolean } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasWrapperRef = useRef<HTMLDivElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const targetRef = useRef<TargetEntity | null>(null);
  const isRoundResolvingRef = useRef<boolean>(false);
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; life: number; color: string; size: number }[]>([]);
  const centerFocusPulseRef = useRef<number>(0);
  const flashTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeCourseIdxRef = useRef<number>(activeCourseIdx);
  activeCourseIdxRef.current = activeCourseIdx;

  const isFullCourseModeRef = useRef<boolean>(isFullCourseMode);
  isFullCourseModeRef.current = isFullCourseMode;

  const difficultyRef = useRef<DifficultyLevel>(difficulty);
  difficultyRef.current = difficulty;

  const playStateRef = useRef<"SETUP" | "PLAYING" | "REST" | "SUMMARY">(playState);
  playStateRef.current = playState;

  const currentCourse = COURSES[activeCourseIdx] || COURSES[0];
  const diffConfig = DIFFICULTY_PRESETS[difficulty];

  // 1. 파티클 이펙트
  const emitParticles = useCallback((x: number, y: number, color: string, count = 16) => {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = 2 + Math.random() * 4.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        color,
        size: 3 + Math.random() * 3,
      });
    }
  }, []);

  // 2. 토스트 피드백 표시
  const showToast = useCallback((text: string, isCorrect: boolean) => {
    setToastMessage({ text, isCorrect });
    setTimeout(() => {
      setToastMessage(null);
    }, 900);
  }, []);

  const spawnTargetRef = useRef<(courseIdx?: number) => void>(() => {});
  const startNextRoundRef = useRef<() => void>(() => {});

  // 3. 타깃 스폰 (원본 HTML 로직 100% 동일)
  const spawnTarget = useCallback((courseIdx: number = activeCourseIdxRef.current) => {
    const canvas = canvasRef.current;
    const wrapper = canvasWrapperRef.current;
    if (!canvas || !wrapper) return;

    const w = canvas.width || wrapper.clientWidth || 360;
    const h = canvas.height || wrapper.clientHeight || 420;

    const course = COURSES[courseIdx] || COURSES[0];
    const diff = difficultyRef.current;
    const preset = DIFFICULTY_PRESETS[diff] || DIFFICULTY_PRESETS.normal;
    const now = performance.now();
    isRoundResolvingRef.current = false;

    const targetRadius = preset.targetRadius;
    const val = Math.floor(Math.random() * 9) + 1;

    if (course.mode === "transit") {
      const fromLeft = Math.random() > 0.5;
      const startY = Math.random() * (h - 140) + 70;
      const endY = Math.random() * (h - 140) + 70;
      const durationMs = preset.transitDurationSec * 1000;

      const startX = fromLeft ? -45 : w + 45;
      const targetEndX = fromLeft ? w + 45 : -45;

      targetRef.current = {
        x: startX,
        y: startY,
        startX,
        startY,
        targetEndX,
        targetEndY: endY,
        durationMs,
        vx: 0,
        vy: 0,
        radius: targetRadius,
        value: val,
        label: `${val}`,
        visible: true,
        birthTime: now,
        color: "#38bdf8",
      };
      setShowAnswerPad(false);
    } else if (course.mode === "flash") {
      const margin = 80;
      const x = Math.random() * (w - margin * 2) + margin;
      const y = Math.random() * (h - margin * 2) + margin;
      const exposureMs = preset.flashExposureMs;

      targetRef.current = {
        x,
        y,
        vx: 0,
        vy: 0,
        radius: targetRadius,
        value: val,
        label: `${val}`,
        visible: true,
        birthTime: now,
        color: "#a855f7",
      };
      setShowAnswerPad(false);

      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
      flashTimerRef.current = setTimeout(() => {
        if (targetRef.current) targetRef.current.visible = false;
        setShowAnswerPad(true);
      }, exposureMs);
    } else if (course.mode === "saccade") {
      const margin = 60;
      const x = Math.random() * (w - margin * 2) + margin;
      const y = Math.random() * (h - margin * 2) + margin;

      targetRef.current = {
        x,
        y,
        vx: 0,
        vy: 0,
        radius: targetRadius,
        value: val,
        label: `${val}`,
        visible: true,
        birthTime: now,
        color: "#10b981",
      };
      setShowAnswerPad(false);

      // 도약 터치 제한 시간 타이머 (시간 초과 시 오답 처리)
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
      flashTimerRef.current = setTimeout(() => {
        if (targetRef.current && targetRef.current.visible && playStateRef.current === "PLAYING" && !isRoundResolvingRef.current) {
          targetRef.current.visible = false;
          setMisses((prev) => prev + 1);
          missesRef.current += 1;
          soundRef.current?.playMiss();
          showToast("시간 초과! 더 빠르게 터치하세요", false);
          addTimeout(() => {
            if (playStateRef.current === "PLAYING") {
              startNextRoundRef.current();
            }
          }, 350);
        }
      }, preset.saccadeDurationMs);
    } else if (course.mode === "peripheral") {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.min(w, h) * (0.28 + Math.random() * 0.16);
      const periphX = w / 2 + Math.cos(angle) * dist;
      const periphY = h / 2 + Math.sin(angle) * dist;
      const flashMs = preset.peripheralFlashMs;

      targetRef.current = {
        x: w / 2,
        y: h / 2,
        vx: periphX,
        vy: periphY,
        radius: targetRadius,
        value: val,
        label: `${val}`,
        visible: true,
        birthTime: now,
        color: "#f59e0b",
        isPeripheralFlashed: false,
      };
      setShowAnswerPad(false);

      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
      flashTimerRef.current = setTimeout(() => {
        if (targetRef.current) {
          targetRef.current.isPeripheralFlashed = true;
        }

        flashTimerRef.current = setTimeout(() => {
          if (targetRef.current) {
            targetRef.current.isPeripheralFlashed = false;
            targetRef.current.visible = false;
          }
          setShowAnswerPad(true);
        }, flashMs);
      }, 250);
    }
  }, [addTimeout, showToast, soundRef]);

  spawnTargetRef.current = spawnTarget;

  // 4. 다음 라운드 시작 (startNextRound)
  const startNextRound = useCallback(() => {
    if (roundRef.current >= maxRoundsPerCourse) {
      // 10회 완료 시
      if (isFullCourseModeRef.current && activeCourseIdxRef.current < COURSES.length - 1) {
        // 루틴 다음 세트 휴식 화면으로 이동
        setPlayState("REST");
        onStateChange?.("REST");
        soundRef.current?.playCorrect();
        setRestSeconds(15);

        if (restTimerRef.current) clearInterval(restTimerRef.current);
        let sec = 15;
        restTimerRef.current = setInterval(() => {
          sec--;
          setRestSeconds(sec);
          if (sec <= 0) {
            if (restTimerRef.current) clearInterval(restTimerRef.current);
            // 다음 코스로 자동 진행
            const nextIdx = activeCourseIdxRef.current + 1;
            setActiveCourseIdx(nextIdx);
            activeCourseIdxRef.current = nextIdx;
            setRound(1);
            roundRef.current = 1;
            setPlayState("PLAYING");
            onStateChange?.("PLAYING");
            soundRef.current?.playStart();
            spawnTargetRef.current(nextIdx);
          }
        }, 1000);
      } else {
        // 전체 완수 (SUMMARY)
        setPlayState("SUMMARY");
        onStateChange?.("SUMMARY");
        soundRef.current?.playCorrect();

        const isFull = isFullCourseModeRef.current;
        const finalHits = isFull ? routineSummaryRef.current.totalHits + hitsRef.current : hitsRef.current;
        const finalMisses = isFull ? routineSummaryRef.current.totalMisses + missesRef.current : missesRef.current;
        const finalTimes = isFull ? [...routineSummaryRef.current.allReactionTimes, ...reactionTimesRef.current] : reactionTimesRef.current;
        const finalScore = isFull ? routineSummaryRef.current.totalScore + scoreRef.current : scoreRef.current;

        const totalTrials = finalHits + finalMisses || 1;
        const accuracy = Math.round((finalHits / totalTrials) * 100);
        const avgReactionTime = finalTimes.length > 0 ? Math.round(finalTimes.reduce((a, b) => a + b, 0) / finalTimes.length) : 280;

        saveEyeFocusRecord(
          finalScore,
          finalHits,
          finalMisses,
          avgReactionTime,
          isFull ? "routine" : "individual",
          isFull ? "시선 맑음 통합 루틴" : COURSES[activeCourseIdxRef.current].title,
          difficultyRef.current
        );
      }
      return;
    }

    const nextRoundNum = roundRef.current + 1;
    setRound(nextRoundNum);
    roundRef.current = nextRoundNum;
    setShowAnswerPad(false);

    addTimeout(() => {
      if (playStateRef.current === "PLAYING") {
        spawnTargetRef.current(activeCourseIdxRef.current);
      }
    }, 200);
  }, [addTimeout, onStateChange, setPlayState, setActiveCourseIdx, soundRef]);

  startNextRoundRef.current = startNextRound;

  // 5. 정답 판정 (handleUserAnswer - 원본 HTML 100% 동일)
  const handleUserAnswer = useCallback((userValue: number | string) => {
    if (isRoundResolvingRef.current || !targetRef.current) return;
    isRoundResolvingRef.current = true;

    const reactionTime = Math.round(performance.now() - targetRef.current.birthTime);
    setLastReactionTime(reactionTime);
    setReactionTimes((prev) => [...prev, reactionTime]);

    const isCorrect = userValue.toString().toUpperCase() === targetRef.current.value.toString().toUpperCase();

    if (isCorrect) {
      setHits((prev) => prev + 1);
      hitsRef.current += 1;
      const pts = Math.max(10, Math.round(10000 / (reactionTime + 100)));
      setScore((prev) => prev + pts);
      scoreRef.current += pts;
      soundRef.current?.playCorrect();
      showToast("정확한 식별!", true);
      emitParticles(targetRef.current.x, targetRef.current.y, "#00C474", 20);
    } else {
      setMisses((prev) => prev + 1);
      missesRef.current += 1;
      soundRef.current?.playMiss();
      showToast(`오답 (정답: ${targetRef.current.label})`, false);
    }

    setShowAnswerPad(false);

    const isSaccade = COURSES[activeCourseIdxRef.current]?.mode === "saccade";
    const nextRoundDelay = isSaccade ? 220 : 350;

    addTimeout(() => {
      if (playStateRef.current === "PLAYING") {
        startNextRoundRef.current();
      }
    }, nextRoundDelay);
  }, [addTimeout, emitParticles, showToast, soundRef]);

  // 6. 안구 도약(saccade) 캔버스 직접 터치 판정
  const handleCanvasPointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const target = targetRef.current;
    const course = COURSES[activeCourseIdxRef.current];
    if (playStateRef.current !== "PLAYING" || course.mode !== "saccade" || !target || !target.visible || isRoundResolvingRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    const dist = Math.hypot(clickX - target.x, clickY - target.y);
    if (dist <= target.radius + 18) {
      target.visible = false;
      handleUserAnswer(target.value);
    } else {
      soundRef.current?.playMiss();
      showToast("빗나감! 타깃을 직접 터치하세요", false);
    }
  }, [handleUserAnswer, showToast, soundRef]);

  // 7. 휴식 스킵 후 다음 코스로 즉시 이동
  const handleStartNextCourse = useCallback(() => {
    if (restTimerRef.current) clearInterval(restTimerRef.current);
    const nextIdx = activeCourseIdxRef.current + 1;
    setActiveCourseIdx(nextIdx);
    activeCourseIdxRef.current = nextIdx;

    setRound(1);
    roundRef.current = 1;
    setPlayState("PLAYING");
    onStateChange?.("PLAYING");
    soundRef.current?.playStart();
    spawnTarget(nextIdx);
  }, [onStateChange, setActiveCourseIdx, setPlayState, soundRef, spawnTarget]);

  // 8. 캔버스 리사이즈 (물리 픽셀과 CSS 픽셀 1:1 완벽 일치 보정)
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const wrapper = canvasWrapperRef.current;
    if (!canvas || !wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const w = Math.floor(rect.width);
    const h = Math.floor(rect.height);

    if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
      canvas.width = w;
      canvas.height = h;
    }
  }, []);

  // 9. ResizeObserver를 통한 캔버스 크기 변경 실시간 추적 (찌그러짐 원천 차단)
  useEffect(() => {
    const wrapper = canvasWrapperRef.current;
    if (!wrapper) return;

    resizeCanvas();

    const ro = new ResizeObserver(() => {
      resizeCanvas();
    });
    ro.observe(wrapper);

    window.addEventListener("resize", resizeCanvas);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [resizeCanvas]);

  // 10. 캔버스 60FPS 렌더링 루프 (원본 HTML과 100% 동일한 렌더러)
  useEffect(() => {
    let isRunning = true;

    const render = () => {
      if (!isRunning) return;
      const canvas = canvasRef.current;
      const wrapper = canvasWrapperRef.current;
      if (!canvas) {
        animFrameIdRef.current = requestAnimationFrame(render);
        return;
      }

      // 화면 리사이즈/키패드 팝업 시 캔버스 종횡비 왜곡 즉각 보정
      if (wrapper) {
        const clientW = Math.floor(wrapper.clientWidth);
        const clientH = Math.floor(wrapper.clientHeight);
        if (clientW > 0 && clientH > 0 && (canvas.width !== clientW || canvas.height !== clientH)) {
          canvas.width = clientW;
          canvas.height = clientH;
        }
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        animFrameIdRef.current = requestAnimationFrame(render);
        return;
      }

      const w = canvas.width;
      const h = canvas.height;

      // 1. Static Background Grid (원본 HTML 스타일)
      ctx.fillStyle = "#060a12";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const course = COURSES[activeCourseIdxRef.current];
      const target = targetRef.current;

      // Helper: Target Bubble Drawer (원본 HTML drawTargetBubble 함수 100% 동일)
      const drawTargetBubble = (x: number, y: number, radius: number, text: string, color: string) => {
        ctx.save();
        ctx.shadowColor = color;
        ctx.shadowBlur = 16;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();

        ctx.fillStyle = "#0f172a";
        ctx.font = `bold ${radius * 1.05}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, x, y + 1);

        ctx.restore();
      };

      // Mode 4: Peripheral gaze anchor (원본 HTML 866~900행 100% 동일)
      if (course?.mode === "peripheral") {
        const cx = w / 2;
        const cy = h / 2;
        centerFocusPulseRef.current += 0.05;
        const pulseRadius = 5 + Math.sin(centerFocusPulseRef.current) * 2;

        // A. 외곽 원형 점선 가이드
        ctx.beginPath();
        ctx.arc(cx, cy, 30, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(99, 102, 241, 0.35)";
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // B. 중앙 십자선 (+)
        ctx.strokeStyle = "#6366f1";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx - 14, cy); ctx.lineTo(cx + 14, cy);
        ctx.moveTo(cx, cy - 14); ctx.lineTo(cx, cy + 14);
        ctx.stroke();

        // C. 중앙 시선 고정 펄스 블루 도트
        ctx.fillStyle = "#38bdf8";
        ctx.beginPath();
        ctx.arc(cx, cy, Math.max(3, pulseRadius), 0, Math.PI * 2);
        ctx.fill();

        // D. 하단 안내 캡션 텍스트
        ctx.fillStyle = "#94a3b8";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("중앙 십자선에 시선을 고정하세요", cx, cy + 50);

        if (target && target.isPeripheralFlashed) {
          drawTargetBubble(target.vx, target.vy, target.radius, target.label, "#f59e0b");
        }
      }

      // Mode 1: Transit motion (시간 기반 절대 보간 - 60Hz/120Hz/144Hz 디바이스 주사율 무관 완벽한 정속 이동)
      if (course?.mode === "transit" && target && target.visible && countdown === null) {
        const elapsed = performance.now() - target.birthTime;
        const duration = target.durationMs || 1000;
        const progress = Math.min(1.0, elapsed / duration);

        const startX = target.startX ?? target.x;
        const startY = target.startY ?? target.y;
        const targetEndX = target.targetEndX ?? (w + 45);
        const targetEndY = target.targetEndY ?? target.y;

        target.x = startX + (targetEndX - startX) * progress;
        target.y = startY + (targetEndY - startY) * progress;

        drawTargetBubble(target.x, target.y, target.radius, target.label, target.color);

        if (progress >= 1.0) {
          target.visible = false;
          setShowAnswerPad(true);
        }
      }

      // Mode 2 & Mode 3: Flash / Saccade Target
      if ((course?.mode === "flash" || course?.mode === "saccade") && target && target.visible && countdown === null) {
        drawTargetBubble(target.x, target.y, target.radius, target.label, target.color);

        if (course.mode === "saccade") {
          ctx.beginPath();
          ctx.arc(target.x, target.y, target.radius + 10, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // 5. Update & Draw Particles (터치/클릭 피드백)
      particlesRef.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.035;

        if (p.life > 0) {
          ctx.save();
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          particlesRef.current.splice(idx, 1);
        }
      });

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [countdown, playState]);

  // 리사이즈 옵저버 (ResizeObserver로 뷰포트/래퍼 높이 변화 즉시 감지)
  useEffect(() => {
    resizeCanvas();
    const wrapper = canvasWrapperRef.current;
    if (!wrapper) return;

    const ro = new ResizeObserver(() => {
      resizeCanvas();
    });
    ro.observe(wrapper);

    window.addEventListener("resize", resizeCanvas);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [resizeCanvas]);

  // 키보드 숫자 키 리스너 (1~9)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (playState !== "PLAYING" || !showAnswerPad) return;
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= 9) {
        handleUserAnswer(num);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUserAnswer, playState, showAnswerPad]);

  // 9. 엔진 상태 전체 초기화 (resetEngine)
  const resetEngine = useCallback(() => {
    if (restTimerRef.current) {
      clearInterval(restTimerRef.current);
      restTimerRef.current = null;
    }
    if (flashTimerRef.current) {
      clearTimeout(flashTimerRef.current);
      flashTimerRef.current = null;
    }
    clearAllTimeouts();

    setRound(0);
    roundRef.current = 0;
    setHits(0);
    hitsRef.current = 0;
    setMisses(0);
    missesRef.current = 0;
    setLastReactionTime(0);
    setReactionTimes([]);
    reactionTimesRef.current = [];
    setScore(0);
    scoreRef.current = 0;

    setRoutineSummary({
      totalHits: 0,
      totalMisses: 0,
      totalScore: 0,
      allReactionTimes: [],
    });
    routineSummaryRef.current = {
      totalHits: 0,
      totalMisses: 0,
      totalScore: 0,
      allReactionTimes: [],
    };

    setRestSeconds(15);
    setCountdown(null);
    setShowAnswerPad(false);
    setToastMessage(null);
    targetRef.current = null;
    particlesRef.current = [];
    isRoundResolvingRef.current = false;
  }, [clearAllTimeouts]);

  // playState가 SETUP으로 변경될 때 자동 완전 초기화
  useEffect(() => {
    if (playState === "SETUP") {
      resetEngine();
    }
  }, [playState, resetEngine]);

  return {
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
    setCountdown,
    showAnswerPad,
    toastMessage,
    canvasRef,
    canvasWrapperRef,
    currentCourse,
    diffConfig,
    handleUserAnswer,
    handleCanvasPointerDown,
    resizeCanvas,
    spawnTarget,
    startNextRound,
    handleStartNextCourse,
    resetEngine,
  };
}

export type EyeFocusEngineReturn = ReturnType<typeof useEyeFocusEngine>;
