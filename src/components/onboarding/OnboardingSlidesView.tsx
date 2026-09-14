"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Barbell, Pulse, CalendarCheck } from "@phosphor-icons/react";
import { AuroraText } from "@/components/godui/AuroraText";
import { MagicButton } from "@/components/godui/MagicButton";
import { AnimatedArrowRightIcon } from "@/components/animated-icons/AnimatedArrowRightIcon";

interface SlideData {
  title: React.ReactNode;
  sub: React.ReactNode;
  badge: string;
  icon: React.ReactNode;
}

interface OnboardingSlidesViewProps {
  slideIndex: number;
  onNextSlide: () => void;
  onSelectDot: (index: number) => void;
}

export function OnboardingSlidesView({
  slideIndex,
  onNextSlide,
  onSelectDot,
}: OnboardingSlidesViewProps) {
  const router = useRouter();
  const slides: SlideData[] = [
    {
      badge: "WELCOME · MINDGYM",
      title: (
        <>
          바쁜 하루 속에서도 <br />
          <AuroraText>나를 잃지 않도록</AuroraText>
        </>
      ),
      sub: (
        <>
          운동을 하고 책을 읽듯이 <br />
          마음도 스스로 돌볼 수 있는 <br />
          루틴이 필요합니다.
        </>
      ),
      icon: (
        <img
          src="/images/logo_icon.svg"
          alt="MindGym Logo"
          className="w-12 h-12 object-contain"
        />
      ),
    },
    {
      badge: "WHY MINDGYM · 01",
      title: (
        <>
          지금의 나를 <br />
          <AuroraText>먼저 확인해요.</AuroraText>
        </>
      ),
      sub: (
        <>
          KOSS 기반 마음상태 체크로 <br />
          최근의 스트레스 경향을 살펴보이고 <br />
          지금의 나를 객관적으로 확인합니다.
        </>
      ),
      icon: <Pulse size={52} weight="bold" className="text-[#00C474]" />,
    },
    {
      badge: "WHY MINDGYM · 02",
      title: (
        <>
          부담없이, <br />
          <AuroraText>내 페이스대로 이어가요</AuroraText>
        </>
      ),
      sub: (
        <>
          매일의 체크인과 리추얼로 <br />
          내 하루에 자연스럽게 스며드는 <br />
          마음건강 루틴을 만듭니다.
        </>
      ),
      icon: <CalendarCheck size={52} weight="fill" className="text-[#00C474]" />,
    },
    {
      badge: "WHY MINDGYM · 03",
      title: (
        <>
          쌓이는 마음의 기록, <br />
          <AuroraText>보이는 나의 변화</AuroraText>
        </>
      ),
      sub: (
        <>
          하루하루의 체크인과 <br />
          리추얼이 기록으로 쌓일수록 <br />
          내 마음의 흐름과 변화를 <br />
          직접 확인할 수 있어요.
        </>
      ),
      icon: <Barbell size={52} weight="fill" className="text-[#00C474]" />,
    },
  ];

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      // 왼쪽으로 스와이프 (다음)
      if (slideIndex < slides.length - 1) {
        onNextSlide();
      }
    } else if (info.offset.x > swipeThreshold) {
      // 오른쪽으로 스와이프 (이전)
      if (slideIndex > 0) {
        onSelectDot(slideIndex - 1);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between my-auto z-10 pt-4 pb-4 select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={`slide-${slideIndex}`}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="flex-1 flex flex-col items-center justify-center text-center px-4 my-auto gap-6 cursor-grab active:cursor-grabbing touch-pan-y"
        >
          {/* 아이콘 심볼 */}
          <div className="w-24 h-24 bg-emerald-50/80 text-[#00C474] rounded-3xl flex items-center justify-center border border-emerald-100/90 shadow-soft mb-2 pointer-events-none">
            {slides[slideIndex].icon}
          </div>

          <div className="pointer-events-none">
            <span className="txt-caption-main txt-brand-green uppercase tracking-wider font-semibold">
              {slides[slideIndex].badge}
            </span>
            <h1 className="text-[28px] font-black txt-brand-ink leading-snug tracking-tight max-w-sm mt-1">
              {slides[slideIndex].title}
            </h1>
            <p className="txt-body-main txt-brand-clay mt-3 leading-relaxed max-w-xs mx-auto text-xs font-medium">
              {slides[slideIndex].sub}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 인디케이터 도트 */}
      <div className="flex justify-center items-center gap-2 my-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => onSelectDot(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              slideIndex === i ? "w-6 bg-[#00C474]" : "w-2 bg-gray-200"
            }`}
          />
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <MagicButton
          onClick={() => {
            if (slideIndex === slides.length - 1) {
              router.push("/login");
            } else {
              onNextSlide();
            }
          }}
          className="w-full"
          rightIcon={<AnimatedArrowRightIcon size={18} />}
        >
          <span>{slideIndex === slides.length - 1 ? "시작하기" : "다음"}</span>
        </MagicButton>

        <div
          className={`text-center transition-opacity duration-200 ${
            slideIndex === slides.length - 1 ? "invisible opacity-0" : "visible opacity-100"
          }`}
        >
          <p className="text-xs text-gray-400">
            이미 계정이 있으신가요?{" "}
            <a href="/login" className="font-bold text-[#00C474] hover:underline ml-1">
              로그인
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
