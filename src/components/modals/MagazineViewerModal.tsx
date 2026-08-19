"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, BookOpen } from "@phosphor-icons/react";
import { Magazine } from "@/data/magazines";
import { useMindGym } from "@/context/MindGymContext";
import { MagicButton } from "../godui/MagicButton";

export function MagazineViewerModal({
  magazine,
  onClose,
}: {
  magazine: Magazine | null;
  onClose: () => void;
}) {
  const { readMagazines, readMagazine } = useMindGym();
  const [hasCompletedRead, setHasCompletedRead] = useState(false);

  if (!magazine) return null;

  const isAlreadyRead = readMagazines.includes(magazine.id);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 40) {
      if (!hasCompletedRead && !isAlreadyRead) {
        setHasCompletedRead(true);
        readMagazine(magazine.id);
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full max-w-md bg-white rounded-[28px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        >
          {/* Cover Header */}
          <div className={`p-6 bg-gradient-to-r ${magazine.coverGradient} text-white relative`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/30"
            >
              <X size={20} />
            </button>
            <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">
              {magazine.issueNumber} • {magazine.category}
            </span>
            <h2 className="text-xl font-black mt-1 leading-snug">{magazine.title}</h2>
            <p className="text-xs opacity-90 font-medium mt-1">{magazine.subtitle}</p>
          </div>

          {/* Body Content */}
          <div
            onScroll={handleScroll}
            className="p-6 overflow-y-auto flex-1 text-gray-700 text-sm leading-relaxed flex flex-col gap-4"
          >
            <div
              className="prose text-xs sm:text-sm"
              dangerouslySetInnerHTML={{ __html: magazine.contentHtml }}
            />

            {(hasCompletedRead || isAlreadyRead) && (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3 text-emerald-800 my-4">
                <CheckCircle size={28} weight="fill" className="text-[#00C474]" />
                <div>
                  <h4 className="text-sm font-extrabold">완독 달성 완료! 🏆</h4>
                  <p className="text-xs font-medium">최초 완독 보너스로 +10 덤벨이 적립되었습니다.</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
              <BookOpen size={18} className="text-[#00C474]" />
              <span>소요 시간: {magazine.readTime}</span>
            </div>
            <MagicButton onClick={onClose} variant="outline" className="py-2.5 px-5 text-xs">
              닫기
            </MagicButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
