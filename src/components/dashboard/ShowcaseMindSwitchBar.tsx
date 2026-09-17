"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Power,
  HandPalm,
  DeviceMobileSlash,
  Sparkle,
  CheckCircle,
  Moon,
  Sun,
} from "@phosphor-icons/react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useThemeStore } from "@/store/useThemeStore";
import { useModalStore } from "@/store/useModalStore";
import { soundEffects } from "@/utils/soundEffects";
import { CommonRitualSheet } from "@/components/dashboard/CommonRitualSheet";

export function ShowcaseMindSwitchBar() {
  const { theme, setTheme } = useThemeStore();
  const { openModal } = useModalStore();
  const [activeSwitches, setActiveSwitches] = useState<Record<string, boolean>>({});
  const [rewardToast, setRewardToast] = useState<{ show: boolean; title: string } | null>(null);

  // 키보드 키를 누르고 있는 중인지 여부 (물리적 프레스 상태)
  const [isKeyPressed, setIsKeyPressed] = useState<boolean>(false);

  // 스크린 OFF 전용 전체 화면 카운트다운 타이머 상태 (초)
  const [screenOffSeconds, setScreenOffSeconds] = useState<number | null>(null);

  // 로컬 스토리지에서 오늘 켠 스위치 상태 불러오기
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mindgym_daily_switches_state");
      if (saved) {
        const parsed = JSON.parse(saved);
        setActiveSwitches(parsed);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // 스크린 OFF 타이머 카운트다운 인터벌
  useEffect(() => {
    if (screenOffSeconds === null || screenOffSeconds <= 0) return;

    const timer = setInterval(() => {
      setScreenOffSeconds((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [screenOffSeconds]);

  // 키를 누를 때: "딸" 사운드 + 누름 상태 활성화
  const handleKeyDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsKeyPressed(true);
    soundEffects.keyPressDown();
  };

  // 손을 뗄 때: "깍" 사운드 + 테마 모드 전환 실행
  const handleKeyUp = (e: React.PointerEvent) => {
    e.preventDefault();
    if (!isKeyPressed) return;
    setIsKeyPressed(false);
    soundEffects.keyReleaseUp();

    const isCurrentlyDark = theme === "dark";
    const nextDarkState = !isCurrentlyDark;
    const updated = { ...activeSwitches, ["switch-mode"]: nextDarkState };
    setActiveSwitches(updated);

    try {
      localStorage.setItem("mindgym_daily_switches_state", JSON.stringify(updated));
    } catch (err) {}

    if (nextDarkState) {
      setTheme("dark");
      setRewardToast({ show: true, title: "🌙 야간 다크 모드" });
    } else {
      setTheme("warm-ivory");
      setRewardToast({ show: true, title: "☀️ 데이 모드 복귀" });
    }

    setTimeout(() => {
      setRewardToast(null);
    }, 2000);
  };

  // 마우스/터치가 키 밖으로 나갔을 때
  const handleKeyLeave = () => {
    if (isKeyPressed) {
      setIsKeyPressed(false);
    }
  };

  // 스크린 OFF 토글 (ON 시 차분한 딤 사운드 / OFF 시 맑은 웨이크업 챠임 사운드)
  const handleToggleDetox = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextState = !activeSwitches["switch-detox"];
    const updated = { ...activeSwitches, ["switch-detox"]: nextState };
    setActiveSwitches(updated);
    try {
      localStorage.setItem("mindgym_daily_switches_state", JSON.stringify(updated));
    } catch (err) {}

    if (nextState) {
      soundEffects.screenOff();
      setScreenOffSeconds(60);
    } else {
      soundEffects.screenOn();
      setScreenOffSeconds(null);
    }
  };

  const handleCloseScreenOff = () => {
    soundEffects.screenOn();
    setScreenOffSeconds(null);
    const updated = { ...activeSwitches, ["switch-detox"]: false };
    setActiveSwitches(updated);
    try {
      localStorage.setItem("mindgym_daily_switches_state", JSON.stringify(updated));
    } catch (err) {}
  };

  // 시선 맑음 (RT-073) 실행 핸들러
  const handleOpenEyeFocus = () => {
    openModal({
      type: "slide-left",
      content: (
        <CommonRitualSheet
          ritualId="RT-073"
          ritualTitle="시선맑음"
          ritualCategory="몸 챙김"
          ritualTime="4분"
          description="장시간 화면 응시로 경직된 안구 근육을 이완하고, 신경안과학 기반 DVA 4단계 시지각 트레이닝으로 맑은 시야를 되찾는 회복 리추얼입니다."
        />
      ),
    });
  };

  const isDarkModeOn = theme === "dark" || activeSwitches["switch-mode"];
  // 스크린 OFF 팝업이 열려있거나 activeSwitches가 켜져 있을 때 ON, 팝업 닫히면 무조건 OFF
  const isDetoxOn = screenOffSeconds !== null && !!activeSwitches["switch-detox"];

  return (
    <div className="flex flex-col gap-2.5 w-full relative select-none">
      {/* 1. 중제 (Section Title: '스위치') */}
      <SectionTitle title="스위치" />

      {/* 2. 한 라인 3열 그리드 (모드 전환 / 스크린 OFF / 시선 맑음) */}
      <div className="grid grid-cols-3 gap-2.5 w-full items-stretch">
        
        {/* [1열] 모드 전환: 배경 박스 없이 순수 3D 키보드 키캡 노출 */}
        <div
          className="relative flex flex-col justify-between p-2 select-none min-h-[128px]"
          style={{ perspective: "800px" }}
        >
          {/* 상단 텍스트 라벨 */}
          <div className="flex flex-col text-left">
            <span className="text-xs font-black tracking-tight txt-brand-ink truncate">
              모드 전환
            </span>
            <span
              className={`text-[9px] font-bold mt-1 px-1.5 py-0.5 rounded-md inline-block w-fit transition-colors ${
                isDarkModeOn
                  ? "bg-indigo-500/20 text-indigo-300 font-extrabold"
                  : "bg-theme-card-subtle text-theme-muted font-bold"
              }`}
            >
              {isDarkModeOn ? "DARK" : "LIGHT"}
            </span>
          </div>

          {/* 중앙~하단: 3D 아이소메트릭 키캡 */}
          <div className="my-auto flex items-center justify-center pt-1">
            <motion.div
              onPointerDown={handleKeyDown}
              onPointerUp={handleKeyUp}
              onPointerLeave={handleKeyLeave}
              animate={{
                y: isKeyPressed ? 3 : isDarkModeOn ? 2 : 0,
                boxShadow: isKeyPressed
                  ? isDarkModeOn
                    ? "0 1px 0 #1E1B4B, 0 2px 4px rgba(30,27,75,0.4)"
                    : "0 1px 0 #CBD5E1, 0 2px 4px rgba(148,163,184,0.2)"
                  : isDarkModeOn
                  ? "0 3px 0 #1E1B4B, 0 6px 12px rgba(30,27,75,0.6)"
                  : "0 4px 0 #CBD5E1, 0 6px 12px rgba(100,116,139,0.25)",
              }}
              transition={{
                type: "spring",
                stiffness: 800,
                damping: 26,
                mass: 0.6,
              }}
              style={{
                transform: "rotateX(14deg) rotateY(-8deg) rotateZ(1deg)",
                transformStyle: "preserve-3d",
              }}
              className={`w-full h-10 rounded-xl flex items-center justify-between px-2.5 cursor-pointer border select-none transition-colors duration-200 ${
                isDarkModeOn
                  ? "bg-gradient-to-b from-[#4338CA] via-[#3730A3] to-[#312E81] border-indigo-400/40 text-white"
                  : "bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9] border-slate-300 text-slate-800"
              }`}
            >
              <span
                className={`text-[9px] font-black font-mono tracking-tight ${
                  isDarkModeOn ? "text-amber-300" : "text-slate-800"
                }`}
              >
                {isDarkModeOn ? "NIGHT" : "DAY"}
              </span>

              <div className="flex items-center justify-center">
                {isDarkModeOn ? (
                  <Moon size={16} weight="fill" className="text-amber-300 drop-shadow-sm" />
                ) : (
                  <Sun size={16} weight="fill" className="text-amber-500 drop-shadow-sm" />
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* [2열] 스크린 OFF: 오프먼트 1분 디톡스 */}
        <div
          onClick={handleToggleDetox}
          className={`flex flex-col justify-between p-2.5 rounded-2xl transition-all cursor-pointer group border min-h-[128px] ${
            isDetoxOn
              ? "bg-sky-50/80 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800 shadow-2xs"
              : "bg-theme-card border-theme-subtle hover:border-sky-300 dark:hover:border-sky-700 shadow-2xs"
          }`}
        >
          {/* 상단 텍스트 라벨 */}
          <div className="flex flex-col text-left">
            <span className="text-xs font-black tracking-tight txt-brand-ink truncate">
              스크린 OFF
            </span>
            <span
              className={`text-[9px] font-bold mt-1 px-1.5 py-0.5 rounded-md inline-block w-fit transition-colors ${
                isDetoxOn ? "bg-sky-500 text-white font-extrabold" : "bg-theme-card-subtle text-theme-muted font-bold"
              }`}
            >
              {isDetoxOn ? "ON" : "1분 쉼"}
            </span>
          </div>

          {/* 중앙~하단: 3D 오프먼트 아이콘 */}
          <div className="my-auto flex items-center justify-center pt-0.5">
            <motion.div
              whileTap={{ scale: 0.92 }}
              animate={{
                scale: isDetoxOn ? 1.08 : 1,
                rotate: isDetoxOn ? [0, -4, 4, 0] : 0,
              }}
              transition={{ duration: 0.3 }}
              className="relative w-12 h-12 flex items-center justify-center"
            >
              <Image
                src="/images/icons/051_오프먼트.png"
                alt="오프먼트 리추얼"
                width={48}
                height={48}
                className="w-12 h-12 object-contain drop-shadow-md select-none pointer-events-none"
                priority
              />
            </motion.div>
          </div>
        </div>

        {/* [3열] 시선 맑음: RT-073 시지각 회복 리추얼 */}
        <div
          onClick={handleOpenEyeFocus}
          className="flex flex-col justify-between p-2.5 rounded-2xl bg-theme-card border border-theme-subtle hover:border-[#0284C7] dark:hover:border-sky-500 shadow-2xs transition-all cursor-pointer group active:scale-[0.98] min-h-[128px]"
        >
          {/* 상단 텍스트 라벨 */}
          <div className="flex flex-col text-left">
            <span className="text-xs font-black tracking-tight txt-brand-ink truncate">
              시선 맑음
            </span>
            <span className="text-[9px] font-bold text-sky-800 dark:text-sky-300 bg-sky-100/80 dark:bg-sky-950/60 mt-1 px-1.5 py-0.5 rounded-md inline-block w-fit">
              눈 피로
            </span>
          </div>

          {/* 중앙~하단: 3D 시선맑음 아이콘 */}
          <div className="my-auto flex items-center justify-center pt-0.5">
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              className="relative w-12 h-12 flex items-center justify-center"
            >
              <Image
                src="/images/icons/073_시선맑음.png"
                alt="시선맑음 리추얼"
                width={48}
                height={48}
                className="w-12 h-12 object-contain drop-shadow-md select-none pointer-events-none"
                priority
              />
            </motion.div>
          </div>
        </div>

      </div>


      {/* 3. 스위치 On 완료 시 상단 미니 축하 토스트 */}
      <AnimatePresence>
        {rewardToast && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className="absolute -top-3 right-0 z-30 bg-gray-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-xs font-bold"
          >
            <CheckCircle size={14} weight="fill" className="text-emerald-400" />
            <span>{rewardToast.title} 스위치 ON (+5 덤벨)</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ★ 4. 스크린 OFF 전체 화면 카운트다운 팝업 (부드러운 페이드 딤 모션) ★ */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {screenOffSeconds !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "#080B10",
                  color: "#FFFFFF",
                  zIndex: 9999999,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "4rem 1.5rem",
                  userSelect: "none",
                }}
              >
                {/* 상단 텍스트 안내 */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.08 } }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "0.75rem", paddingTop: "2rem" }}
                >
                  <span
                    style={{
                      padding: "0.35rem 0.85rem",
                      borderRadius: "9999px",
                      backgroundColor: "rgba(56, 189, 248, 0.15)",
                      color: "#38BDF8",
                      border: "1px solid rgba(56, 189, 248, 0.3)",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      fontFamily: "monospace",
                      letterSpacing: "0.05em",
                    }}
                  >
                    DIGITAL DETOX MODE
                  </span>
                  <h2 style={{ fontSize: "1.65rem", fontWeight: 900, letterSpacing: "-0.025em", color: "#F8FAFC", marginTop: "0.5rem" }}>
                    잠시 화면을 엎어두세요
                  </h2>
                  <p style={{ fontSize: "0.875rem", color: "#94A3B8", maxWidth: "20rem", lineHeight: 1.6 }}>
                    스마트폰의 빛과 알림을 끄고,<br />
                    눈을 감은 채 깊은 숨에 온전히 집중해 봅니다.
                  </p>
                </motion.div>

                {/* 중앙 원형 카운트다운 타이머 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1, transition: { duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] } }}
                  style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", margin: "auto" }}
                >
                  {/* 은은한 배경 오라 */}
                  <div
                    style={{
                      position: "absolute",
                      width: "16rem",
                      height: "16rem",
                      borderRadius: "9999px",
                      backgroundColor: "rgba(56, 189, 248, 0.25)",
                      filter: "blur(2.5rem)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* 중앙 원형 박스 */}
                  <div
                    style={{
                      position: "relative",
                      width: "12rem",
                      height: "12rem",
                      borderRadius: "9999px",
                      border: "1px solid rgba(56, 189, 248, 0.35)",
                      backgroundColor: "rgba(12, 74, 110, 0.3)",
                      backdropFilter: "blur(12px)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    {screenOffSeconds > 0 ? (
                      <>
                        <span
                          style={{
                            fontSize: "3rem",
                            fontWeight: 900,
                            fontFamily: "monospace",
                            letterSpacing: "-0.05em",
                            color: "#BAE6FD",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {String(Math.floor(screenOffSeconds / 60)).padStart(2, "0")}:
                          {String(screenOffSeconds % 60).padStart(2, "0")}
                        </span>
                        <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#38BDF8", marginTop: "0.25rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                          Remaining
                        </span>
                      </>
                    ) : (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
                      >
                        <CheckCircle size={48} weight="fill" color="#34D399" />
                        <span style={{ fontSize: "1rem", fontWeight: 900, color: "#6EE7B7" }}>
                          디톡스 완료!
                        </span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* 하단 닫기/스킵 버튼 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.16 } }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", width: "100%", maxWidth: "20rem" }}
                >
                  <button
                    type="button"
                    onClick={handleCloseScreenOff}
                    style={{
                      width: "100%",
                      padding: "0.95rem 1.5rem",
                      borderRadius: "1rem",
                      backgroundColor: "rgba(255, 255, 255, 0.12)",
                      color: "#FFFFFF",
                      fontSize: "0.875rem",
                      fontWeight: 800,
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      backdropFilter: "blur(12px)",
                      cursor: "pointer",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.4)",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {screenOffSeconds === 0 ? "디톡스 마치기 (+5 덤벨)" : "스크린 켜기"}
                  </button>
                  <span style={{ fontSize: "0.75rem", color: "#64748B" }}>
                    언제든 버튼을 눌러 화면으로 돌아올 수 있습니다.
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
