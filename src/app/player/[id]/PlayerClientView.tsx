"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X, Trophy, FlowerLotus } from "@phosphor-icons/react";
import { getRitualDetail, RitualDetail } from "@/data/ritualsDetailData";
import { useMindGym } from "@/context/MindGymContext";
import { MagicButton } from "@/components/godui/MagicButton";
import { AnimatedArrowRightIcon } from "@/components/animated-icons/AnimatedArrowRightIcon";

interface PlayerClientViewProps {
  id: string;
}

export function PlayerClientView({ id }: PlayerClientViewProps) {
  const router = useRouter();
  const { addDumbbells, markTodayCompleted } = useMindGym();

  const ritualId = id;
  const ritual: RitualDetail = getRitualDetail(ritualId);

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
    addDumbbells(15);
    setIsCompleted(true);
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-gradient-to-b from-emerald-900 via-slate-900 to-black text-white relative overflow-hidden select-none min-h-screen">
      {/* 배경 은은한 무드 블러 오버레이 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#00C474]/20 rounded-full blur-3xl pointer-events-none" />

      {/* 1. 상단 미니멀 네비게이션 헤더 */}
      <div className="flex items-center justify-between z-10 pt-2">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer border border-white/10"
        >
          <X size={20} weight="bold" />
        </button>
        <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-bold text-emerald-300">
          <FlowerLotus size={16} weight="fill" />
          <span>{ritual.category}</span>
        </div>
      </div>

      {/* 2. 메인 플레이어 타이머 컨테이너 */}
      <div className="flex-1 flex flex-col items-center justify-center text-center z-10 my-auto py-8">
        {/* 리추얼 아이콘 애니메이션 박스 */}
        <motion.div
          animate={{ scale: isPlaying ? [1, 1.05, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative w-36 h-36 rounded-full bg-gradient-to-tr from-[#00C474]/30 to-emerald-400/10 p-1 flex items-center justify-center mb-8 border border-emerald-500/30 shadow-2xl"
        >
          <div className="w-full h-full rounded-full bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4">
            <img
              src={ritual.iconPath}
              alt={ritual.title}
              className="w-20 h-20 object-contain"
            />
          </div>
        </motion.div>

        {/* 리추얼 제목 & 앰비언트 설명 */}
        <h1 className="text-2xl font-black text-white tracking-tight leading-snug max-w-xs mb-2">
          {ritual.title}
        </h1>
        <p className="text-xs text-white/60 max-w-xs leading-relaxed font-medium">
          {ritual.desc}
        </p>

        {/* 타이머 디스플레이 */}
        <div className="mt-8 mb-4">
          <span className="text-5xl font-black font-mono tracking-wider text-emerald-400 drop-shadow-md">
            {formatTime(seconds)}
          </span>
          <p className="text-[11px] font-semibold text-white/40 mt-1 uppercase tracking-widest">
            Goal: {ritual.time} ({ritual.reward} 덤벨)
          </p>
        </div>
      </div>

      {/* 3. 하단 컨트롤 버튼 */}
      <div className="z-10 flex flex-col gap-3 pb-4">
        {!isPlaying && seconds === 0 ? (
          <MagicButton
            onClick={() => setIsPlaying(true)}
            className="w-full bg-[#00C474] hover:bg-[#00B068] text-white py-4 rounded-2xl font-extrabold text-base shadow-lg shadow-[#00C474]/20 cursor-pointer"
            rightIcon={<Play size={20} weight="fill" />}
          >
            <span>리추얼 시작하기</span>
          </MagicButton>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex-1 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl font-extrabold text-sm text-white transition-all flex items-center justify-center gap-2 border border-white/10 cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause size={18} weight="fill" />
                  <span>일시정지</span>
                </>
              ) : (
                <>
                  <Play size={18} weight="fill" />
                  <span>다시 재개</span>
                </>
              )}
            </button>
            <MagicButton
              onClick={handleFinish}
              className="flex-1 bg-[#00C474] hover:bg-[#00B068] text-white py-4 rounded-2xl font-extrabold text-sm shadow-md cursor-pointer"
            >
              <span>완료하기 ({ritual.reward})</span>
            </MagicButton>
          </div>
        )}
      </div>

      {/* 4. 리추얼 완료 축하 모달 팝업 */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl z-50 flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-xs bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 flex flex-col items-center gap-4 shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl border border-emerald-500/40">
                <Trophy size={36} weight="fill" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
                  RITUAL COMPLETED
                </span>
                <h2 className="text-xl font-black text-white mt-3">
                  오늘의 마음근력 충전 완료!
                </h2>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  [{ritual.title}] 수련을 성공적으로 마쳐{" "}
                  <strong className="text-emerald-400">
                    {ritual.reward} 덤벨
                  </strong>
                  을 획득하셨습니다!
                </p>
              </div>

              <MagicButton
                onClick={() => router.push("/dashboard")}
                className="w-full bg-[#00C474] hover:bg-[#00B068] text-white py-3.5 rounded-2xl font-extrabold text-sm shadow-md cursor-pointer mt-2"
                rightIcon={<AnimatedArrowRightIcon size={16} />}
              >
                <span>대시보드로 돌아가기</span>
              </MagicButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
