"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplitFlapDigitProps {
  char: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

function SplitFlapDigit({ char, size = "lg" }: SplitFlapDigitProps) {
  const [displayChar, setDisplayChar] = useState(char);
  const [prevChar, setPrevChar] = useState(char);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (char !== displayChar) {
      setPrevChar(displayChar);
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setDisplayChar(char);
        setIsFlipping(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [char, displayChar]);

  // Size styles (lg: 비율 유지하며 미세 축소된 28px 높이 h-7)
  const sizeStyles = {
    xs: "w-3.5 h-4.5 text-[11px]",
    sm: "w-4 h-5.5 text-[13px]",
    md: "w-4.5 h-6 text-[15px]",
    lg: "w-[21px] h-7 text-[18.5px]",
    xl: "w-7 h-8 text-[20px]",
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-sm bg-[#18181b] text-zinc-100 font-mono font-black select-none overflow-hidden ${sizeStyles[size]}`}
      style={{ perspective: "300px" }}
    >
      {/* 중앙 분리선 (어두운 회색 줄 bg-zinc-600, 그림자 제거) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-zinc-600 z-30 pointer-events-none" />

      {/* 메인 폰트 서체 (text-zinc-100, 그림자 제거) */}
      <span className="leading-none tracking-tighter text-zinc-100 font-mono font-black z-0">
        {displayChar}
      </span>

      {/* GodUI 정통 3D Flap 회전 카드 애니메이션 */}
      <AnimatePresence>
        {isFlipping && (
          <motion.div
            key={`${prevChar}-${displayChar}`}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -180 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            style={{ transformOrigin: "bottom", backfaceVisibility: "hidden" }}
            className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden flex items-end justify-center z-20 bg-[#18181b] text-zinc-100"
          >
            <span className="translate-y-1/2 leading-none font-mono font-black text-zinc-100">{prevChar}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export interface SplitFlapDisplayProps {
  value: number | string;
  minLength?: number;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  animateOnMount?: boolean;
}

/**
 * SplitFlapDisplay: GodUI 샘플 공식 정통 스펙 Solari Split-Flap Display
 */
export function SplitFlapDisplay({
  value,
  minLength = 3,
  className = "",
  size = "lg",
  animateOnMount = true,
}: SplitFlapDisplayProps) {
  const targetNum = typeof value === "number" ? value : parseInt(String(value), 10) || 0;
  const [currentNum, setCurrentNum] = useState<number>(animateOnMount ? 0 : targetNum);

  useEffect(() => {
    if (!animateOnMount) {
      setCurrentNum(targetNum);
      return;
    }

    if (targetNum === 0) {
      setCurrentNum(0);
      return;
    }

    let start = 0;
    const interval = setInterval(() => {
      start += 1;
      setCurrentNum(start);
      if (start >= targetNum) {
        clearInterval(interval);
      }
    }, 180);

    return () => clearInterval(interval);
  }, [targetNum, animateOnMount]);

  const strValue = String(currentNum).padStart(minLength, "0");
  const chars = strValue.split("");

  return (
    <div className={`inline-flex items-center gap-[1.5px] ${className}`}>
      {chars.map((ch, idx) => (
        <SplitFlapDigit key={idx} char={ch} size={size} />
      ))}
    </div>
  );
}
