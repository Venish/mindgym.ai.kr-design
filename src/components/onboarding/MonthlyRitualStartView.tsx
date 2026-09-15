"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "@phosphor-icons/react";
import { AuroraText } from "@/components/godui/AuroraText";
import { MagicButton } from "@/components/godui/MagicButton";
import { RitualCard } from "@/components/common/RitualCard";
import { SelectChipButton } from "@/components/common/SelectChipButton";
import { AnimatedArrowRightIcon } from "@/components/animated-icons/AnimatedArrowRightIcon";

interface MonthlyRitualStartViewProps {
  nickname?: string;
  selectedKeyword?: string;
  morningTime?: string;
  eveningTime?: string;
  onNext: () => void;
}

/**
 * MonthlyRitualStartView: '이달의 나 설정' (MonthlyIntentionWizard)과 100% 동일한 비주얼 & 레이아웃 구조를 공유하는 온보딩 완결 화면
 */
export function MonthlyRitualStartView({
  selectedKeyword = "차분하게 · 따뜻하게 · 균형 되찾기",
  morningTime = "08:00",
  eveningTime = "21:00",
  onNext,
}: MonthlyRitualStartViewProps) {
  // 3개 키워드 분리 (마음, 관계, 성장)
  const keywords = selectedKeyword.includes("·")
    ? selectedKeyword.split("·").map((s) => s.trim())
    : [selectedKeyword, "따뜻하게", "균형 되찾기"];

  return (
    <div className="w-full flex-1 flex flex-col justify-between select-none relative txt-brand-ink min-h-full">
      {/* 1. MonthlyIntentionWizard와 100% 동일한 중앙 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto no-scrollbar py-1 flex flex-col w-full">
        <div className="my-auto w-full flex flex-col gap-4 py-2">
            {/* 타이틀 뷰: MonthlyIntentionWizard와 100% 동일한 규격 및 타이포 */}
            <div className="flex flex-col justify-start shrink-0">
              <span className="txt-caption-main txt-brand-green uppercase font-semibold inline-flex items-center gap-1.5">
                <img src="/images/logo_icon.svg" alt="Icon" className="w-3.5 h-3.5 object-contain" />
                MONTHLY RITUAL SETTING
              </span>

              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-[26px] font-black txt-brand-ink leading-snug mt-1">
                  이달의 마음 다짐이 <br />
                  <AuroraText>정해졌어요</AuroraText>
                </h1>
                <p className="text-xs text-theme-muted font-semibold mt-1.5 leading-relaxed">
                  선택한 방향을 바탕으로 이번 달 함께할 리추얼을 추천해 드려요
                </p>
              </motion.div>
            </div>

            {/* 콘텐츠 영역: MonthlyIntentionWizard와 100% 동일한 구분선 & 칩 카드 구성 */}
            <div className="flex flex-col justify-start shrink-0 gap-3.5 my-1">
              {/* 구분선 + 이달의 나 지향점 3단 칩 */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-3 w-full pt-1 pb-1">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-200 to-gray-300 dark:via-slate-800 dark:to-slate-700" />
                  <span className="text-sm font-bold txt-brand-ink shrink-0 text-center">
                    이번 달 나의 지향점
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gray-200 to-gray-300 dark:via-slate-800 dark:to-slate-700" />
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {keywords.map((kw, idx) => (
                    <SelectChipButton
                      key={idx}
                      label={kw}
                      selected={true}
                      onClick={() => {}}
                    />
                  ))}
                </div>
              </div>

              {/* 이번 달 추천 메인 리추얼 카드 */}
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-center gap-3 w-full pb-1">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-200 to-gray-300 dark:via-slate-800 dark:to-slate-700" />
                  <span className="text-sm font-bold txt-brand-ink shrink-0 text-center">
                    추천 틈새 리추얼
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gray-200 to-gray-300 dark:via-slate-800 dark:to-slate-700" />
                </div>

                <RitualCard
                  variant="detailed"
                  title="마음일기"
                  dailyTime="하루 5분"
                  level="중급"
                  duration="한달 지속"
                  reward="+30"
                  description="매일 5분, 오늘의 감정과 생각을 3줄로 적는 루틴이에요. 꾸준히 하면 자기 인식이 크게 높아져요."
                  imageSrc="/images/icons/012_내편일기.png"
                  selected={true}
                  className="w-full"
                />
              </div>

              {/* 설정된 체크인 알림 시간 요약 바 */}
              <div className="flex items-center justify-between p-3.5 bg-theme-card-subtle border border-theme-subtle rounded-2xl text-xs font-semibold txt-brand-ink">
                <div className="flex items-center gap-2">
                  <Sun size={18} weight="fill" className="text-amber-500" />
                  <span className="text-theme-muted">아침 알림:</span>
                  <span className="font-bold">{morningTime}</span>
                </div>
                <div className="h-3 w-[1px] bg-theme-subtle" />
                <div className="flex items-center gap-2">
                  <Moon size={18} weight="fill" className="text-indigo-500" />
                  <span className="text-theme-muted">저녁 알림:</span>
                  <span className="font-bold">{eveningTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. 하단 탐색 버튼: 이전 버튼 없이 단독 100% 전체 너비 메인 CTA */}
        <div className="w-full shrink-0 pt-2">
          <MagicButton
            onClick={onNext}
            className="w-full"
            rightIcon={<AnimatedArrowRightIcon size={18} />}
          >
            <span>마인드짐 시작하기</span>
          </MagicButton>
        </div>
    </div>
  );
}
