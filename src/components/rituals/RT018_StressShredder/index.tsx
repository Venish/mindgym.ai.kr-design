"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useMindGym } from "@/context/MindGymContext";
import { useModalStore } from "@/store/useModalStore";
import { motion, AnimatePresence } from "framer-motion";
import { SoundSynth } from "./SoundSynth";
import { PaperCanvas, StripParticle } from "./PaperCanvas";
import { ShredderView } from "./ShredderView";
import { saveShredItem } from "./StressShredHistorySheet";
import { ShredderState, SpeedFactor, HealingPhrase, RT018StressShredderProps } from "./types";
import { RitualHeaderGroup } from "@/components/rituals/RitualHeaderGroup";
import { MagicButton } from "@/components/godui/MagicButton";
import { GodMemoPaper } from "@/components/godui/GodMemoPaper";
import { GodSlider } from "@/components/godui/GodSlider";
import { Scissors, CheckCircle, Sparkle } from "@phosphor-icons/react";

const SCREEN_W = 450;
const SCREEN_H = 800;

const COLOR_SURFACE = "#FFFFFF";
const COLOR_INK = "#1A1F29";
const COLOR_GREEN = "#00C473";
const COLOR_FOREST = "#005933";
const COLOR_BAR_BG = "#E2EFE9";

const HEALING_PHRASES: HealingPhrase[] = [
  { text: "무거웠던 생각들이 깨끗이 흩어집니다.", triggerProgress: 0.05 },
  { text: "나를 괴롭히던 마음의 짐을 내려놓습니다.", triggerProgress: 0.35 },
  { text: "오늘 하루 지친 나를 온전히 다독여 줍니다.", triggerProgress: 0.65 },
];

const DEFAULT_FONT_FAMILY =
  '"NanumSquareRound", "Pretendard", -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif';

export function RT018_StressShredder({
  onComplete,
  onStateChange,
  registerResetHandler,
}: RT018StressShredderProps) {
  const { addDumbbells } = useMindGym();
  const { clearModals } = useModalStore();

  const [currentState, setCurrentState] = useState<ShredderState>("TYPING");
  const [worryText, setWorryText] = useState("");
  const [selectedSpeed, setSelectedSpeed] = useState<SpeedFactor>(1.0);
  const [selectedPresetLabel, setSelectedPresetLabel] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // 상위 헤더에 현재 상태 전달
  useEffect(() => {
    if (onStateChange) {
      onStateChange(currentState);
    }
  }, [currentState, onStateChange]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Engine References
  const soundSynthRef = useRef<SoundSynth | null>(null);
  const paperCanvasRef = useRef<PaperCanvas | null>(null);
  const shredderViewRef = useRef<ShredderView | null>(null);
  const particlesRef = useRef<StripParticle[]>([]);

  // Simulation State Refs
  const stateTimerRef = useRef(0);
  const feedProgressRef = useRef(0);
  const shredProgressRef = useRef(0);
  const paperYRef = useRef(0);
  const paperTargetYRef = useRef(0);
  const paperXRef = useRef((SCREEN_W - 290) / 2);
  const currentStateRef = useRef<ShredderState>("TYPING");
  const selectedSpeedRef = useRef<SpeedFactor>(1.7);

  // Loaded Assets
  const imagesRef = useRef<{ [key: string]: HTMLImageElement }>({});

  useEffect(() => {
    currentStateRef.current = currentState;
  }, [currentState]);

  useEffect(() => {
    selectedSpeedRef.current = selectedSpeed;
  }, [selectedSpeed]);

  // Load assets on mount
  useEffect(() => {
    soundSynthRef.current = new SoundSynth();
    paperCanvasRef.current = new PaperCanvas(290, 380);
    shredderViewRef.current = new ShredderView(undefined, undefined, 370, 150);

    const assetPaths: { [key: string]: string } = {
      loading: "/rituals/RT018_StressShredder/images/loading.png",
      complete_badge: "/rituals/RT018_StressShredder/images/complete_badge.png",
      meditation: "/rituals/RT018_StressShredder/images/meditation.png",
    };

    Object.keys(assetPaths).forEach((key) => {
      const img = new Image();
      img.src = assetPaths[key];
      imagesRef.current[key] = img;
    });

    return () => {
      if (soundSynthRef.current) {
        soundSynthRef.current.stopShreddingSound();
      }
    };
  }, []);

  const drawCrispText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    align: CanvasTextAlign = "center",
    font = `16px ${DEFAULT_FONT_FAMILY}`,
    color = COLOR_INK
  ) => {
    ctx.save();
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = "middle";
    ctx.fillText(text, Math.floor(x), Math.floor(y));
    ctx.restore();
  };

  const drawRoundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  // Render & Update Functions
  const enterPrinting = useCallback(() => {
    setCurrentState("PRINTING");
    stateTimerRef.current = 0;
    feedProgressRef.current = 0;

    const paperW = 290;
    const paperH = 380;
    const paperX = (SCREEN_W - paperW) / 2;
    paperXRef.current = paperX;

    const text =
      worryText.trim() ||
      "오늘 마음속 깊은 곳을 답답하게 만들었던 불안이나 스트레스를 이곳에 적어보세요.";

    if (paperCanvasRef.current) {
      paperCanvasRef.current.rasterizeText(text);
    }
    if (shredderViewRef.current) {
      shredderViewRef.current.isOperating = true;
      const slitY = shredderViewRef.current.getSlitY();
      paperYRef.current = slitY - paperH - 40;
      paperTargetYRef.current = slitY - paperH + 45;
    }

    if (soundSynthRef.current) {
      soundSynthRef.current.playPrintFeedSound();
    }
  }, [worryText]);

  const enterShredding = useCallback(() => {
    setCurrentState("SHREDDING");
    stateTimerRef.current = 0;
    shredProgressRef.current = 0;
    particlesRef.current = [];

    if (shredderViewRef.current) {
      shredderViewRef.current.isOperating = true;
    }
    if (soundSynthRef.current) {
      soundSynthRef.current.startShreddingSound();
    }

    if (
      shredderViewRef.current &&
      paperCanvasRef.current &&
      paperCanvasRef.current.offCanvas
    ) {
      const startY = shredderViewRef.current.getSlitY() + 18;
      const quads = paperCanvasRef.current.quads;
      const offCanvas = paperCanvasRef.current.offCanvas;
      for (let i = 0; i < 16; i++) {
        if (quads.length > 0) {
          const q = quads[Math.floor(Math.random() * quads.length)];
          particlesRef.current.push(
            new StripParticle(q, offCanvas, paperXRef.current, startY)
          );
        }
      }
    }
  }, []);

  const updatePrinting = useCallback((dt: number) => {
    stateTimerRef.current += dt;

    if (shredderViewRef.current) {
      shredderViewRef.current.update(dt * 1.0);
    }

    feedProgressRef.current = Math.min(1.0, feedProgressRef.current + dt * 0.85);
    const t = Math.sin(feedProgressRef.current * Math.PI * 0.5);

    const paperY = paperYRef.current;
    const paperTargetY = paperTargetYRef.current;
    paperYRef.current = paperY * (1.0 - t) + paperTargetY * t;

    if (feedProgressRef.current >= 1.0) {
      enterShredding();
    }
  }, [enterShredding]);

  const renderPrinting = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const topY = 35;
      const spinnerY = topY + 16;

      const loadingImg = imagesRef.current.loading;
      if (loadingImg && loadingImg.complete && loadingImg.naturalWidth > 0) {
        ctx.save();
        ctx.translate(SCREEN_W / 2, spinnerY);
        ctx.rotate(stateTimerRef.current * 5.5);
        ctx.drawImage(loadingImg, -12, -12, 24, 24);
        ctx.restore();
      }

      drawCrispText(
        ctx,
        "작성한 마음을 파쇄기로 보내는 중...",
        SCREEN_W / 2,
        spinnerY + 36,
        "center",
        `600 17px ${DEFAULT_FONT_FAMILY}`,
        COLOR_INK
      );

      const shredderView = shredderViewRef.current;
      const paperCanvas = paperCanvasRef.current;

      if (shredderView) {
        shredderView.drawBackSlot(ctx);

        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, SCREEN_W, shredderView.getSlitY() + 4);
        ctx.clip();

        if (paperCanvas) {
          paperCanvas.draw(ctx, paperXRef.current, paperYRef.current);
        }
        ctx.restore();

        shredderView.drawFrontHousing(ctx);
      }
    },
    []
  );

  const updateShredding = useCallback(
    (dt: number) => {
      stateTimerRef.current += dt;
      const speed = selectedSpeedRef.current;
      const shredderView = shredderViewRef.current;
      const paperCanvas = paperCanvasRef.current;
      const soundSynth = soundSynthRef.current;

      if (shredderView) {
        shredderView.update(dt * 0.85 * speed);
      }

      if (shredProgressRef.current < 1.0) {
        paperYRef.current += dt * (65 * speed);
        const slitY = shredderView ? shredderView.getSlitY() : 450;
        const totalTravel = 400;
        const currentDist = Math.max(0, paperYRef.current - (slitY - 380));
        shredProgressRef.current = Math.min(1.0, currentDist / totalTravel);

        if (
          Math.random() < 0.45 * speed &&
          paperCanvas &&
          paperCanvas.quads.length > 0 &&
          paperCanvas.offCanvas
        ) {
          const startY = slitY + 18;
          for (let b = 0; b < 2; b++) {
            const q =
              paperCanvas.quads[
                Math.floor(Math.random() * paperCanvas.quads.length)
              ];
            particlesRef.current.push(
              new StripParticle(
                q,
                paperCanvas.offCanvas,
                paperXRef.current,
                startY
              )
            );
          }
        }

        if (paperYRef.current >= slitY + 20) {
          shredProgressRef.current = 1.0;
          if (shredderView) shredderView.isOperating = false;
          if (soundSynth) {
            soundSynth.stopShreddingSound();
            soundSynth.playCompleteSound();
          }
          setCurrentState("CLEARED");
          stateTimerRef.current = 0;
        }
      }

      particlesRef.current.forEach((p) => p.update(dt));
    },
    []
  );

  const renderClearedState = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      drawCrispText(
        ctx,
        "마음의 짐을 깨끗이 비워냈습니다!",
        SCREEN_W / 2,
        50,
        "center",
        `bold 25px ${DEFAULT_FONT_FAMILY}`,
        COLOR_INK
      );
      drawCrispText(
        ctx,
        "새로운 마음으로 가볍게 시작할 준비가 되었습니다.",
        SCREEN_W / 2,
        88,
        "center",
        `300 15px ${DEFAULT_FONT_FAMILY}`,
        "#64748B"
      );

      const stampY = Math.floor(SCREEN_H * 0.34);
      const rawProgress = Math.min(1.0, stateTimerRef.current * 3.5);
      let scale = 1.0;
      if (rawProgress < 1.0) {
        scale = Math.sin(rawProgress * Math.PI * 0.5);
      } else {
        scale = 1.0 + Math.sin((stateTimerRef.current - 0.28) * 2.2) * 0.025;
      }

      const badgeImg =
        imagesRef.current.complete_badge || imagesRef.current.meditation;
      if (badgeImg && badgeImg.complete && badgeImg.naturalWidth > 0) {
        ctx.save();
        ctx.translate(SCREEN_W / 2, stampY);
        ctx.scale(scale, scale);

        const targetSize = 220;
        ctx.beginPath();
        ctx.arc(0, 0, targetSize / 2, 0, Math.PI * 2);
        ctx.clip();

        const bw = badgeImg.naturalWidth;
        const bh = badgeImg.naturalHeight;
        const imgScale = targetSize / bh;

        ctx.drawImage(
          badgeImg,
          -(bw * imgScale) / 2,
          -(bh * imgScale) / 2,
          bw * imgScale,
          bh * imgScale
        );
        ctx.restore();
      }

      const scoreTime = stateTimerRef.current - 0.2;
      if (scoreTime > 0) {
        const scoreProgress = Math.min(1.0, scoreTime * 0.65);
        let popScale = 1.0;
        if (scoreProgress < 0.25) {
          popScale = (scoreProgress / 0.25) * 1.35;
        } else if (scoreProgress < 0.45) {
          popScale = 1.35 - ((scoreProgress - 0.25) / 0.2) * 0.35;
        }

        const floatUpY = stampY - 55 - scoreProgress * 45;
        let alpha = 1.0;
        if (scoreProgress > 0.6) {
          alpha = Math.max(0, 1.0 - (scoreProgress - 0.6) / 0.4);
        }

        if (alpha > 0) {
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.translate(SCREEN_W / 2 + 70, floatUpY);
          ctx.scale(popScale, popScale);
          drawCrispText(
            ctx,
            "💚",
            0,
            0,
            "center",
            "28px -apple-system, sans-serif",
            COLOR_FOREST
          );
          ctx.restore();
        }
      }

      const shredderView = shredderViewRef.current;
      if (shredderView) {
        shredderView.drawBackSlot(ctx);
        shredderView.drawTopSlotHood(ctx);

        ctx.save();
        ctx.beginPath();
        ctx.rect(0, shredderView.getSlitY() + 14, SCREEN_W, SCREEN_H);
        ctx.clip();

        particlesRef.current.forEach((p) => p.draw(ctx));
        ctx.restore();

        shredderView.drawLowerFrontShell(ctx);
      }
    },
    []
  );

  const renderShredding = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const shredderView = shredderViewRef.current;
      const paperCanvas = paperCanvasRef.current;
      const slitY = shredderView ? shredderView.getSlitY() : 450;
      const state = currentStateRef.current;

      if (state === "SHREDDING") {
        const dotY = 32;
        for (let i = 1; i <= 5; i++) {
          const dotX = SCREEN_W / 2 + (i - 3) * 18;
          const waveOffset = Math.sin(stateTimerRef.current * 6.5 + i * 0.85) * 4.5;
          ctx.fillStyle = COLOR_GREEN;
          ctx.beginPath();
          ctx.arc(dotX, dotY + waveOffset, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        const barW = 240;
        const barH = 8;
        const barX = (SCREEN_W - barW) / 2;
        const barY = dotY + 16;

        ctx.fillStyle = COLOR_BAR_BG;
        drawRoundRect(ctx, barX, barY, barW, barH, 4);
        ctx.fill();

        const fillW = Math.max(barH, barW * shredProgressRef.current);
        ctx.fillStyle = COLOR_GREEN;
        drawRoundRect(ctx, barX, barY, fillW, barH, 4);
        ctx.fill();

        const pct = Math.floor(shredProgressRef.current * 100);
        drawCrispText(
          ctx,
          `마음 정화 진행률: ${pct}%`,
          SCREEN_W / 2,
          barY + 22,
          "center",
          `500 13px ${DEFAULT_FONT_FAMILY}`,
          COLOR_FOREST
        );

        const basePhraseY = barY + 70;
        let currentLine = 0;

        HEALING_PHRASES.forEach((item) => {
          if (shredProgressRef.current >= item.triggerProgress) {
            currentLine++;
            const targetY = basePhraseY + (currentLine - 1) * 44;
            const elapsedProgress = shredProgressRef.current - item.triggerProgress;
            const animTime = Math.min(1.0, elapsedProgress / 0.12);

            const slideOffset = (1.0 - Math.sin(animTime * Math.PI * 0.5)) * 14;
            const lineY = targetY + slideOffset;
            const alpha = animTime;
            const breathScale =
              1.0 + Math.sin(stateTimerRef.current * 2.2 + currentLine) * 0.012;

            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.translate(SCREEN_W / 2, lineY);
            ctx.scale(breathScale, breathScale);
            drawCrispText(
              ctx,
              item.text,
              0,
              0,
              "center",
              `400 20px ${DEFAULT_FONT_FAMILY}`,
              COLOR_INK
            );
            ctx.restore();
          }
        });

        if (shredderView) {
          shredderView.drawBackSlot(ctx);

          if (paperCanvas && shredProgressRef.current < 1.0) {
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, SCREEN_W, slitY + 4);
            ctx.clip();

            paperCanvas.draw(ctx, paperXRef.current, paperYRef.current);
            ctx.restore();
          }

          shredderView.drawTopSlotHood(ctx);

          ctx.save();
          ctx.beginPath();
          ctx.rect(0, slitY + 14, SCREEN_W, SCREEN_H - (slitY + 14));
          ctx.clip();

          particlesRef.current.forEach((p) => p.draw(ctx));
          ctx.restore();

          shredderView.drawLowerFrontShell(ctx);
        }
      } else if (state === "CLEARED") {
        renderClearedState(ctx);
      }
    },
    [renderClearedState]
  );

  // Main Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000.0);
      lastTime = now;

      // 아래에서 위로 퍼지는 소프트 세이지 민트 파스텔 그라데이션 배경
      const bgGrad = ctx.createLinearGradient(0, SCREEN_H, 0, 0);
      bgGrad.addColorStop(0.0, "#E2F1EB");
      bgGrad.addColorStop(0.4, "#F0F7F4");
      bgGrad.addColorStop(1.0, "#FFFFFF");

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);

      const state = currentStateRef.current;
      if (state === "PRINTING") {
        updatePrinting(dt);
        renderPrinting(ctx);
      } else if (state === "SHREDDING" || state === "CLEARED") {
        updateShredding(dt);
        renderShredding(ctx);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [updatePrinting, renderPrinting, updateShredding, renderShredding]);

  // Event Handlers
  const handlePresetSelect = (label: string, text: string) => {
    if (soundSynthRef.current) soundSynthRef.current.playPaperFeedSound();
    setSelectedPresetLabel(label);
    setWorryText(text);
  };

  const handleSpeedSelect = (speed: SpeedFactor) => {
    if (soundSynthRef.current) soundSynthRef.current.playPaperFeedSound();
    setSelectedSpeed(speed);
  };

  const handleStartShredClick = () => {
    if (soundSynthRef.current) soundSynthRef.current.initCtx();

    // 작성한 스트레스 내역을 파쇄 기록 보관함에 자동 보관
    const levels = [0.2, 0.38, 0.55, 0.75, 1.0, 1.35, 1.7, 2.05, 2.4, 2.8];
    const idx = levels.indexOf(selectedSpeed);
    const levelStr = `Lv.${idx !== -1 ? idx + 1 : 5}`;
    saveShredItem(worryText, selectedPresetLabel, levelStr);

    enterPrinting();
  };

  const handleFinalFinish = () => {
    addDumbbells(3);
    setIsCompleted(true);
    if (onComplete) onComplete();
    setTimeout(() => {
      clearModals();
    }, 400);
  };

  const handleResetClick = useCallback(() => {
    if (soundSynthRef.current) {
      soundSynthRef.current.stopAll(); // 파쇄 진행 중 뒤로가기 시 진행 중인 사운드 즉시 완전 정지!
      soundSynthRef.current.playPaperFeedSound();
    }
    setCurrentState("TYPING");
    setSelectedPresetLabel(null);
    setWorryText("");
    stateTimerRef.current = 0;
    particlesRef.current = [];
  }, []);

  // 컴포넌트 이탈 및 언마운트 시 사운드 100% 멈춤 보장
  useEffect(() => {
    return () => {
      if (soundSynthRef.current) {
        soundSynthRef.current.stopAll();
      }
    };
  }, []);

  useEffect(() => {
    if (registerResetHandler) {
      registerResetHandler(handleResetClick);
    }
  }, [registerResetHandler, handleResetClick]);

  return (
    <div
      className={`relative w-full h-full flex-1 flex flex-col justify-between transition-colors duration-300 ${
        currentState === "TYPING"
          ? "bg-white"
          : "bg-gradient-to-t from-[#E2F1EB] via-[#F0F7F4] to-[#FFFFFF]"
      }`}
    >
      {/* 2D Canvas Layer (Hidden when TYPING) */}
      <canvas
        ref={canvasRef}
        width={SCREEN_W}
        height={SCREEN_H}
        className={`absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-300 ${
          currentState === "TYPING" ? "opacity-0" : "opacity-100 z-10"
        }`}
      />

      {/* HTML UI Layer: TYPING State (Intro 가이드 모달과 100% 동일한 DOM 래퍼 계층 및 콘텐츠 기반 동적 가변 스크롤) */}
      {currentState === "TYPING" && (
        <div className="flex flex-col justify-between items-center flex-1 h-full pt-2 pb-6 text-center w-full z-20 overflow-hidden px-5">
          {/* 상단 스크롤 가능 콘텐츠 영역 (최대 폭 max-w-sm & 중앙 정렬) */}
          <div className="flex flex-col items-center gap-3.5 py-1 text-center max-w-sm w-full my-auto overflow-y-auto pr-0.5">
            {/* 리추얼 공통 상단 헤더 그룹 (실행 단계: 메타 칩 숨김 적용) */}
            <RitualHeaderGroup
              category="스트레스 비우기"
              title="스트레스 분쇄"
              description="오늘 나를 힘들게 했던 상황을 선택하거나 솔직하게 적어보세요."
              hideMetaChips={true}
            />

            {/* Preset Chips (상황별 감성 워딩 4색 매칭 칩) */}
            <div className="flex flex-wrap justify-center items-center gap-2 w-full mt-1">
              {[
                {
                  label: "직장 상사 스트레스",
                  text: "오늘 직장에서 받았던 답답하고 억울했던 스트레스를 파쇄기에 모두 넣어 날려버립니다.",
                  normalStyle: "bg-rose-50 hover:bg-rose-100/80 text-rose-800 border-rose-200/60",
                  activeStyle: "bg-rose-500 text-white font-extrabold border-rose-600 shadow-sm shadow-rose-500/30",
                },
                {
                  label: "끝없는 과제 & 야근",
                  text: "끝없이 쏟아지는 과제와 쌓여가는 업무 스트레스를 깨끗하게 비워냅니다.",
                  normalStyle: "bg-amber-50 hover:bg-amber-100/80 text-amber-900 border-amber-200/60",
                  activeStyle: "bg-amber-500 text-white font-extrabold border-amber-600 shadow-sm shadow-amber-500/30",
                },
                {
                  label: "불안한 미래 걱정",
                  text: "다가오지 않은 미래에 대한 막연한 불안과 걱정을 내려놓습니다.",
                  normalStyle: "bg-indigo-50 hover:bg-indigo-100/80 text-indigo-900 border-indigo-200/60",
                  activeStyle: "bg-indigo-600 text-white font-extrabold border-indigo-700 shadow-sm shadow-indigo-500/30",
                },
                {
                  label: "인간관계의 상처",
                  text: "타인의 말 한마디에 상처받았던 서운한 마음을 가볍게 비워냅니다.",
                  normalStyle: "bg-sky-50 hover:bg-sky-100/80 text-sky-900 border-sky-200/60",
                  activeStyle: "bg-sky-500 text-white font-extrabold border-sky-600 shadow-sm shadow-sky-500/30",
                },
              ].map((chip, idx) => {
                const isSelected = selectedPresetLabel === chip.label;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePresetSelect(chip.label, chip.text)}
                    className={`py-2.5 px-4 rounded-full transition-colors duration-150 text-center cursor-pointer active:scale-95 flex items-center justify-center shrink-0 border-1.5 ${
                      isSelected ? chip.activeStyle : chip.normalStyle
                    }`}
                  >
                    <span className="text-sm font-bold whitespace-nowrap">
                      {chip.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Paper Textarea Box (공통 GodMemoPaper 컴포넌트) */}
            <GodMemoPaper
              value={worryText}
              onChange={(e) => setWorryText(e.target.value)}
              placeholder="오늘 마음속 깊은 곳을 답답하게 만들었던 불안이나 스트레스를 이곳에 적어보세요."
            />

            {/* Speed Selector (현재 스트레스 지수 슬라이더) */}
            <GodSlider
              value={selectedSpeed}
              onChange={(spd) => handleSpeedSelect(spd as SpeedFactor)}
              title="현재 스트레스 지수"
              options={[
                { label: "Lv.1", value: 0.2 },
                { label: "Lv.2", value: 0.38 },
                { label: "Lv.3", value: 0.55 },
                { label: "Lv.4", value: 0.75 },
                { label: "Lv.5", value: 1.0 },
                { label: "Lv.6", value: 1.35 },
                { label: "Lv.7", value: 1.7 },
                { label: "Lv.8", value: 2.05 },
                { label: "Lv.9", value: 2.4 },
                { label: "Lv.10", value: 2.8 },
              ]}
            />
          </div>

          {/* 하단 시작하기/파쇄하기 버튼 영역 (Intro 가이드 모달과 100% 구조 일치) */}
          <div className="w-full pt-3 flex flex-col gap-3 max-w-sm mx-auto shrink-0 z-30">
            {/* 메인 CTA 파쇄하기 버튼 */}
            <MagicButton
              type="button"
              onClick={handleStartShredClick}
              className="w-full bg-[#00C474] text-white font-extrabold text-base py-4 rounded-full shadow-md hover:bg-[#00B068] transition-all flex items-center justify-center cursor-pointer"
            >
              <span>파쇄하기</span>
            </MagicButton>
          </div>
        </div>
      )}

      {/* HTML Overlay for CLEARED state finish button (TYPING 상태 하단 버튼 위치와 100% 동일 최하단 고정, 좌우 패딩 중복 제거) */}
      {currentState === "CLEARED" && (
        <div className="absolute bottom-6 left-0 right-0 z-30 flex flex-col items-center justify-end pointer-events-auto">
          <div className="w-full flex flex-col gap-2 max-w-sm mx-auto">
            {/* 메인 CTA: 다시 작성하기 */}
            <MagicButton
              type="button"
              onClick={handleResetClick}
              className="w-full bg-[#00C474] text-white font-extrabold text-base py-4 rounded-full shadow-md hover:bg-[#00B068] transition-all flex items-center justify-center cursor-pointer"
            >
              <span>다시 작성하기</span>
            </MagicButton>

            {/* 고스트 버튼: 오늘은 그만 할래요 */}
            <button
              type="button"
              onClick={handleFinalFinish}
              className="w-full py-2.5 text-gray-500 hover:text-gray-800 font-bold text-sm transition-colors cursor-pointer text-center bg-transparent active:scale-95"
            >
              오늘은 그만 할래요
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
