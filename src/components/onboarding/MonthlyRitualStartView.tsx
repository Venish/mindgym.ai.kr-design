"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "@phosphor-icons/react";
import { AuroraText } from "@/components/godui/AuroraText";
import { MagicButton } from "@/components/godui/MagicButton";
import { SpotlightCard } from "@/components/godui/SpotlightCard";
import { GodTimePicker } from "@/components/godui/GodTimePicker";
import { AnimatedSparkleIcon } from "@/components/animated-icons/AnimatedSparkleIcon";
import { RitualCard } from "@/components/common/RitualCard";
import { SelectChipButton } from "@/components/common/SelectChipButton";

interface MonthlyRitualStartViewProps {
  nickname?: string;
  selectedKeyword?: string;
  initialStep?: 1 | 2 | 3 | 4 | 5;
  morningTime?: string;
  eveningTime?: string;
  onSelectMorningTime?: (t: string) => void;
  onSelectEveningTime?: (t: string) => void;
  onSelectKeyword?: (kw: string) => void;
  onNext: () => void;
}

export function MonthlyRitualStartView({
  initialStep = 1,
  morningTime = "오전 08:00",
  eveningTime = "오후 09:00",
  onSelectMorningTime,
  onSelectEveningTime,
  onNext,
}: MonthlyRitualStartViewProps) {
  // 5단계 여정 스텝 (1, 2, 3, 4, 5 단계)
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(initialStep);

  // 로컬 알림 시간 상태 및 토글 상태
  const [localMorningTime, setLocalMorningTime] = useState(
    morningTime.includes("오") ? morningTime : `오전 ${morningTime}`
  );
  const [localEveningTime, setLocalEveningTime] = useState(
    eveningTime.includes("오") ? eveningTime : `오후 ${eveningTime}`
  );
  const [isMorningEnabled, setIsMorningEnabled] = useState(true);
  const [isEveningEnabled, setIsEveningEnabled] = useState(true);

  // 일어나는 시간 (05:00 ~ 12:00) 및 자는 시간 (20:00 ~ 04:00) 30분 단위 옵션
  const wakeUpOptions = [
    "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"
  ];
  const sleepOptions = [
    "20:00", "20:30", "21:00", "21:30", "22:00", "22:30",
    "23:00", "23:30", "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00"
  ];

  const handleMorningSelect = (t: string) => {
    setLocalMorningTime(t);
    if (onSelectMorningTime) onSelectMorningTime(t);
  };

  const handleEveningSelect = (t: string) => {
    setLocalEveningTime(t);
    if (onSelectEveningTime) onSelectEveningTime(t);
  };

  // 선택된 단어
  const [mindWord, setMindWord] = useState("안정되게");
  const [relationWord, setRelationWord] = useState("따뜻하게");
  const [growthWord, setGrowthWord] = useState("성장하며");

  // 원본 단어 목록 (Step 1: 6개, Step 2: 4개, Step 3: 6개)
  const mindWords = ["차분하게", "안정되게", "활기차게", "가볍게", "단단하게", "용기있게"];
  const relationWords = ["따뜻하게", "연결되어", "즐겁게", "평화롭게"];
  const growthWords = ["의미있게", "새롭게", "성장하며", "뿌듯하게", "균형있게", "여유롭게"];

  const handleSelectMindWord = (w: string) => {
    setMindWord(w);
    setTimeout(() => {
      setStep(2);
    }, 150);
  };

  const handleSelectRelationWord = (w: string) => {
    setRelationWord(w);
    setTimeout(() => {
      setStep(3);
    }, 150);
  };

  const handleSelectGrowthWord = (w: string) => {
    setGrowthWord(w);
    setTimeout(() => {
      setStep(4);
    }, 150);
  };

  const handleNextStep = () => {
    if (step < 5) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4 | 5);
    } else {
      onNext();
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4 | 5);
    }
  };

  return (
    <motion.div
      key="monthly_ritual_start"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col justify-between my-auto z-10 pt-1 pb-4 text-left h-full min-h-[500px]"
    >
      {/* 1. 최상단 고정 5분할 세그먼트 스텝 라인 바 (Segmented Step Lines) */}
      <div className="w-full flex gap-2 shrink-0 pt-1 pb-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#00C474] rounded-full"
              initial={{ width: i === 1 ? "100%" : "0%" }}
              animate={{ width: i <= step ? "100%" : "0%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        ))}
      </div>

      {/* 2. 중앙 수직 정렬 내용 영역 (타이틀 & 콘텐츠 영역 높이 고정) */}
      <div className="flex-1 flex flex-col justify-center my-auto gap-4 py-2">
        {/* 타이틀 뷰 좌측 정렬 레이아웃 (높이 고정: h-[105px]) */}
        <div className="h-[105px] flex flex-col justify-start shrink-0">
          <span className="txt-caption-main txt-brand-green uppercase font-semibold inline-flex items-center gap-1.5">
            <img src="/images/logo_icon.svg" alt="Icon" className="w-3.5 h-3.5 object-contain" />
            {step === 5 ? "CHECK-IN TIME SETTING" : "MONTHLY RITUAL SETTING"}
          </span>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1_title"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-[26px] font-black txt-brand-ink leading-snug mt-1">
                  이달에 이런 <br />
                  <AuroraText>마음으로 지내고 싶어요</AuroraText>
                </h1>
                <p className="text-xs text-gray-500 font-semibold mt-1.5 leading-relaxed">
                  원하는 마음 상태 단어를 하나 선택해 보세요
                </p>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2_title"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-[26px] font-black txt-brand-ink leading-snug mt-1">
                  사람들과 <br />
                  <AuroraText>이렇게 지내고 싶어요</AuroraText>
                </h1>
                <p className="text-xs text-gray-500 font-semibold mt-1.5 leading-relaxed">
                  주변 사람들과 태도 의도를 하나 골라주세요
                </p>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3_title"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-[26px] font-black txt-brand-ink leading-snug mt-1">
                  이런 성장과 <br />
                  <AuroraText>의미를 느끼고 싶어요</AuroraText>
                </h1>
                <p className="text-xs text-gray-500 font-semibold mt-1.5 leading-relaxed">
                  이번 달 스스로에게 선물할 성장의 키워드예요
                </p>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4_title"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-[26px] font-black txt-brand-ink leading-snug mt-1">
                  <span className="text-[#00C474]">"{mindWord}"</span> 의도 → <br />
                  <AuroraText>이달을 함께할 리추얼</AuroraText>
                </h1>
                <p className="text-xs text-gray-500 font-semibold mt-1.5 leading-relaxed">
                  선택하신 마음 방향에 꼭 맞는 맞춤 추천 리추얼이에요
                </p>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5_title"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-[26px] font-black txt-brand-ink leading-snug mt-1">
                  언제 체크인 <br />
                  <AuroraText>알림을 받을까요?</AuroraText>
                </h1>
                <p className="text-xs text-gray-500 font-semibold mt-1.5 leading-relaxed">
                  정해진 시간에 알림을 드려요 · 언제든 환경설정에서 변경 가능
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. 단계별 선택 콘텐츠 (높이 고정: h-[270px]) */}
        <div className="h-[270px] flex flex-col justify-start shrink-0 my-1">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1_content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-2 h-full justify-start items-center"
              >
                <div className="flex items-center gap-3 w-full pt-6 pb-2.5">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-200 to-gray-300" />
                  <span className="text-base font-bold text-gray-700 shrink-0 text-center">
                    이달에 이런 마음으로 지내고 싶어요
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gray-200 to-gray-300" />
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  {mindWords.map((w) => (
                    <SelectChipButton
                      key={w}
                      label={w}
                      selected={mindWord === w}
                      onClick={() => handleSelectMindWord(w)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2_content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-2 h-full justify-start items-center"
              >
                <div className="flex items-center gap-3 w-full pt-6 pb-2.5">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-200 to-gray-300" />
                  <span className="text-base font-bold text-gray-700 shrink-0 text-center">
                    사람들과 이렇게 지내고 싶어요
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gray-200 to-gray-300" />
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  {relationWords.map((w) => (
                    <SelectChipButton
                      key={w}
                      label={w}
                      selected={relationWord === w}
                      onClick={() => handleSelectRelationWord(w)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3_content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-2 h-full justify-start items-center"
              >
                <div className="flex items-center gap-3 w-full pt-6 pb-2.5">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-200 to-gray-300" />
                  <span className="text-base font-bold text-gray-700 shrink-0 text-center">
                    이런 성장과 의미를 느끼고 싶어요
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gray-200 to-gray-300" />
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  {growthWords.map((w) => (
                    <SelectChipButton
                      key={w}
                      label={w}
                      selected={growthWord === w}
                      onClick={() => handleSelectGrowthWord(w)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4_content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-2 h-full justify-start items-center pt-4 pb-2 w-full"
              >
                <RitualCard
                  variant="detailed"
                  title="마음일기"
                  dailyTime="하루 5분"
                  level="중급"
                  duration="한달 지속"
                  reward="+30"
                  description="매일 5분, 오늘의 감정과 생각을 3줄로 적는 루틴이에요. 꾸준히 하면 자기 인식이 크게 높아져요."
                  icon="notebook"
                  selected={true}
                  className="w-full"
                />
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5_content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4 h-full justify-center w-full pt-6"
              >
                {/* 일어나는 시간 설정 카드 */}
                <div className="p-4 bg-[#F8FAF9] rounded-2xl flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Sun size={24} weight="fill" className="text-amber-500 shrink-0" />
                      <span className="text-base font-bold text-gray-900">일어나는 시간</span>
                    </div>

                    {/* 우측 알림 ON/OFF 스위치 토글 버튼 */}
                    <button
                      type="button"
                      onClick={() => setIsMorningEnabled(!isMorningEnabled)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isMorningEnabled ? "bg-[#00C474]" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isMorningEnabled ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className={isMorningEnabled ? "opacity-100 transition-opacity" : "opacity-40 pointer-events-none transition-opacity"}>
                    <GodTimePicker
                      value={localMorningTime}
                      onChange={(t) => handleMorningSelect(t)}
                      disabled={!isMorningEnabled}
                    />
                  </div>
                </div>

                {/* 자는 시간 설정 카드 */}
                <div className="p-4 bg-[#F8FAF9] rounded-2xl flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Moon size={24} weight="fill" className="text-indigo-500 shrink-0" />
                      <span className="text-base font-bold text-gray-900">자는 시간</span>
                    </div>

                    {/* 우측 알림 ON/OFF 스위치 토글 버튼 */}
                    <button
                      type="button"
                      onClick={() => setIsEveningEnabled(!isEveningEnabled)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isEveningEnabled ? "bg-[#00C474]" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isEveningEnabled ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className={isEveningEnabled ? "opacity-100 transition-opacity" : "opacity-40 pointer-events-none transition-opacity"}>
                    <GodTimePicker
                      value={localEveningTime}
                      onChange={(t) => handleEveningSelect(t)}
                      disabled={!isEveningEnabled}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 4. 하단 탐색 버튼 그룹 & 다음에 하기 고스트 버튼 */}
      <div className="flex flex-col gap-2 shrink-0 pt-2">
        <div className="flex gap-2.5">
          {step > 1 && (
            <button
              onClick={handlePrevStep}
              className="px-5 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-2xl transition-colors shrink-0"
            >
              이전
            </button>
          )}

          <MagicButton onClick={handleNextStep} className="flex-1 py-4">
            <span className="text-sm font-bold">
              {step === 5
                ? "마인드짐 시작하기"
                : step === 4
                ? "이달의 나와 함께할게요"
                : "다음 단계로"}
            </span>
          </MagicButton>
        </div>

        {/* 메인 CTA 버튼(다음 단계로) 아래 1:1 완벽 수평 정렬된 [다음에 하기] 고스트 버튼 */}
        <div className="flex gap-2.5">
          {step > 1 && (
            <div className="px-5 py-3.5 opacity-0 pointer-events-none shrink-0 text-sm font-bold">
              이전
            </div>
          )}

          <MagicButton
            onClick={onNext}
            variant="ghost"
            className="flex-1 text-gray-400 hover:text-gray-600 font-medium py-2.5 text-sm"
          >
            <span>다음에 하기</span>
          </MagicButton>
        </div>
      </div>
    </motion.div>
  );
}

