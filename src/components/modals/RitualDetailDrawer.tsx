"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Play, Clock, Barbell } from "@phosphor-icons/react";
import { Ritual } from "@/data/rituals";
import { MagicButton } from "../godui/MagicButton";
import { AnimatedArrowRightIcon } from "../animated-icons/AnimatedArrowRightIcon";
import { useMindGym } from "@/context/MindGymContext";
import { useRouter } from "next/navigation";

export function RitualDetailDrawer({
  ritual,
  onClose,
}: {
  ritual: Ritual | null;
  onClose: () => void;
}) {
  const { favorites, toggleFavorite } = useMindGym();
  const router = useRouter();

  if (!ritual) return null;

  const isFav = favorites.includes(ritual.id);

  const handleStart = () => {
    onClose();
    router.push(`/player/${ritual.id}`);
  };

  return (
    <AnimatePresence>
      <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-[1.5px]">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full max-w-md bg-white rounded-t-[32px] p-6 shadow-2xl flex flex-col gap-5 max-h-[85vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold bg-emerald-50 text-[#00C474] px-3 py-1 rounded-full">
              {ritual.category} 테마
            </span>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400">
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-black text-gray-900">{ritual.title}</h3>
            <p className="text-xs font-semibold text-gray-400">고유 코드: {ritual.id}</p>
            <p className="text-sm font-medium text-gray-600 leading-relaxed mt-1">
              {ritual.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 my-1">
            <div className="bg-gray-50 p-3.5 rounded-2xl flex items-center gap-2.5">
              <Clock size={22} className="text-[#00C474]" />
              <div>
                <p className="text-[10px] font-bold text-gray-400">소요 시간</p>
                <p className="text-xs font-extrabold text-gray-800">{ritual.time}</p>
              </div>
            </div>
            <div className="bg-gray-50 p-3.5 rounded-2xl flex items-center gap-2.5">
              <Barbell size={22} className="text-[#00C474]" />
              <div>
                <p className="text-[10px] font-bold text-gray-400">획득 덤벨</p>
                <p className="text-xs font-extrabold text-[#00C474]">+{ritual.dumbbell} 덤벨</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => toggleFavorite(ritual.id)}
              className={`p-3.5 rounded-full border transition-all ${
                isFav
                  ? "bg-rose-50 border-rose-200 text-rose-500"
                  : "bg-white border-gray-200 text-gray-400 hover:text-rose-400"
              }`}
            >
              <Heart size={22} weight={isFav ? "fill" : "regular"} />
            </button>

            <MagicButton onClick={handleStart} className="flex-1" rightIcon={<AnimatedArrowRightIcon size={18} />}>
              <Play size={18} weight="fill" />
              <span>지금 시작하기 (+{ritual.dumbbell} 덤벨)</span>
            </MagicButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
