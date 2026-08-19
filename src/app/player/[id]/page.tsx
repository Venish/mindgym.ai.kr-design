"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X, Trophy, FlowerLotus, Check } from "@phosphor-icons/react";
import { ritualsData, Ritual } from "@/data/rituals";
import { useMindGym } from "@/context/MindGymContext";
import { MagicButton } from "@/components/godui/MagicButton";
import { AnimatedArrowRightIcon } from "@/components/animated-icons/AnimatedArrowRightIcon";

export default function PlayerPage() {
  const params = useParams();
  const router = useRouter();
  const { addDumbbells, markTodayCompleted } = useMindGym();

  const ritualId = params.id as string;
  const ritual: Ritual =
    ritualsData.find((r) => r.id === ritualId) || ritualsData[0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // 타이머 카운트다운
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleFinish = () => {
    setIsPlaying(false);
    markTodayCompleted();
    addDumbbells(ritual.dumbbell);
    setIsCompleted(true);
  };

  const minutes = Math.floor(seconds / 60);
  const remSeconds = seconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(remSeconds).padStart(2, "0")}`;

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-[#191F28] via-gray-900 to-[#191F28] text-white p-6 justify-between min-h-screen relative overflow-hidden">
      {/* Dynamic Wave Ring Background */}
      <motion.div
        animate={{ scale: isPlaying ? [1, 1.2, 1] : 1, opacity: isPlaying ? [0.15, 0.3, 0.15] : 0.1 }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#00C474] rounded-full blur-3xl pointer-events-none"
      />

      {/* Header */}
      <div className="flex items-center justify-between z-10 pt-2">
        <span className="text-xs font-extrabold bg-white/10 px-3 py-1 rounded-full text-[#55DFA0]">
          {ritual.category} • {ritual.time} 명상 코스
        </span>
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
        >
          <X size={20} />
        </button>
      </div>

      {/* Center Visual Player */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 z-10 my-auto">
        <motion.div
          animate={{ scale: isPlaying ? [1, 1.05, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-36 h-36 rounded-full bg-emerald-500/20 border-2 border-[#00C474]/50 flex items-center justify-center shadow-2xl text-[#00C474]"
        >
          <FlowerLotus size={64} weight="fill" />
        </motion.div>

        <div className="flex flex-col gap-2 max-w-xs">
          <span className="text-xs font-bold text-emerald-400">{ritual.id}</span>
          <h1 className="text-2xl font-black text-white">{ritual.title}</h1>
          <p className="text-xs font-medium text-gray-300 leading-relaxed">
            "{ritual.description}"
          </p>
        </div>

        {/* Timer display */}
        <div className="text-4xl font-black tracking-widest text-emerald-300 my-2 font-mono">
          {timeFormatted}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-[#00C474] text-white flex items-center justify-center shadow-lg hover:bg-[#00B068] active:scale-95 transition-all"
          >
            {isPlaying ? <Pause size={28} weight="fill" /> : <Play size={28} weight="fill" className="ml-1" />}
          </button>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="z-10 pb-4">
        <MagicButton onClick={handleFinish} className="w-full bg-white text-gray-900 hover:bg-gray-100" rightIcon={<AnimatedArrowRightIcon size={18} />}>
          <Check size={20} weight="bold" />
          <span>리추얼 완료 및 {ritual.dumbbell} 덤벨 수령</span>
        </MagicButton>
      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {isCompleted && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full max-w-sm bg-white text-gray-900 rounded-[32px] p-6 shadow-2xl text-center flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 bg-emerald-100 text-[#00C474] rounded-full flex items-center justify-center">
                <Trophy size={36} weight="fill" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#00C474] bg-emerald-50 px-3 py-1 rounded-full">
                  리추얼 완료!
                </span>
                <h3 className="text-xl font-black text-gray-900 mt-2">
                  +{ritual.dumbbell} 덤벨 획득 완료! 🎉
                </h3>
                <p className="text-xs font-semibold text-gray-500 mt-1">
                  오늘 마음 정원에 푸른 새싹 도장이 성공적으로 찍혔습니다.
                </p>
              </div>

              <MagicButton
                onClick={() => router.push("/dashboard")}
                className="w-full mt-2"
                rightIcon={<AnimatedArrowRightIcon size={18} />}
              >
                <span>대시보드로 돌아가기</span>
              </MagicButton>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
