"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkle } from "@phosphor-icons/react";
import { AnimatedArrowRightIcon } from "@/components/animated-icons/AnimatedArrowRightIcon";
import { KOSSQuestion } from "@/data/koss";

interface KossTip {
  text: string;
  icon: React.ElementType;
  bgClass: string;
  iconClass: string;
}

interface DomainInfo {
  domain: string;
  count: number;
}

interface KossQuestionsViewProps {
  nickname: string;
  qIndex: number;
  totalQuestionsCount: number;
  currentQ: KOSSQuestion | undefined;
  currentDomain: string;
  domainsInfo: DomainInfo[];
  currentTip: KossTip;
  formatQuestionToTwoLines: (qStr: string) => React.ReactNode;
  onSelectAnswer: (val: number) => void;
}

export function KossQuestionsView({
  nickname,
  qIndex,
  totalQuestionsCount,
  currentQ,
  currentDomain,
  domainsInfo,
  currentTip,
  formatQuestionToTwoLines,
  onSelectAnswer,
}: KossQuestionsViewProps) {
  const displayIndex = Math.min(qIndex + 1, totalQuestionsCount);
  const TipIcon = currentTip.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.2 }}
      className="flex-1 flex flex-col justify-between my-auto z-10 pt-2 pb-4 h-full min-h-[520px]"
    >
      {/* 8대 영역 세그먼트 프로그레스 헤더 */}
      <div className="w-full flex flex-col pt-2 mb-2">
        <div className="flex justify-between items-center mb-2.5">
          <div className="flex items-center gap-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDomain}
                initial={{ opacity: 0, scale: 0.9, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -5 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold bg-emerald-50 text-[#00C474]"
              >
                <Sparkle size={16} weight="fill" />
                <span className="txt-body-main font-bold">{currentDomain}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <span className="txt-koss-progress font-semibold text-gray-500">
            {displayIndex} / {totalQuestionsCount}
          </span>
        </div>

        {/* 8대 영역 세그먼트 프로그레스 바 */}
        <div className="flex gap-1.5 w-full h-2.5">
          {domainsInfo.map((info, idx) => {
            const prevSum = domainsInfo.slice(0, idx).reduce((acc, cur) => acc + cur.count, 0);
            const domainEnd = prevSum + info.count;

            let fillPercent = 0;
            if (qIndex + 1 >= domainEnd) {
              fillPercent = 100;
            } else if (qIndex + 1 > prevSum) {
              fillPercent = ((qIndex + 1 - prevSum) / info.count) * 100;
            } else {
              fillPercent = 0;
            }

            return (
              <div key={info.domain} style={{ flex: info.count }} className="h-full bg-gray-100 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-[#00C474] transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${fillPercent}%` }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* 고정 상단 닉네임 라벨 배지 */}
      <div className="flex justify-center my-1">
        <span className="text-sm font-medium text-gray-800 bg-gray-100/90 px-4 py-1.5 rounded-full">
          <span className="text-[#00C474] font-black">{nickname}</span> 님께 물어볼게요
        </span>
      </div>

      {/* 질문 & 선택지 영역 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`q-${qIndex}`}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.2 }}
          className="flex-1 flex flex-col justify-center gap-6"
        >
          <h2 className="txt-title-main txt-brand-ink leading-snug font-bold text-center justify-center min-h-[4.5rem] flex items-center px-2">
            {formatQuestionToTwoLines(currentQ?.question || "")}
          </h2>

          <div className="flex flex-col gap-2.5 my-2">
            {[
              { label: "전혀 그렇지 않다", value: 1 },
              { label: "그렇지 않다", value: 2 },
              { label: "그렇다", value: 3 },
              { label: "매우 그렇다", value: 4 },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => onSelectAnswer(opt.value)}
                className="group w-full py-3.5 px-4 bg-gray-50 hover:bg-brand-mint-light hover:txt-brand-green rounded-2xl text-left txt-body-main txt-brand-clay transition-all flex items-center justify-between active:scale-[0.98]"
              >
                <span>{opt.label}</span>
                <AnimatedArrowRightIcon size={16} />
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 최하단 고정 가이드 팁 배너 */}
      <div className="mt-auto pt-3 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`tip-${currentTip.text}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`p-3.5 border rounded-2xl text-left txt-caption-main leading-snug flex items-center gap-2.5 shadow-soft ${currentTip.bgClass}`}
          >
            <TipIcon size={18} className={`shrink-0 ${currentTip.iconClass}`} weight="fill" />
            <span className="font-semibold text-gray-900">{currentTip.text}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
