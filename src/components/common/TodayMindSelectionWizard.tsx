"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuroraText } from "@/components/godui/AuroraText";
import { MagicButton } from "@/components/godui/MagicButton";
import { SelectChipButton } from "@/components/common/SelectChipButton";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { useMindGym } from "@/context/MindGymContext";
import { useModalStore } from "@/store/useModalStore";

interface TodayMindSelectionWizardProps {
  onComplete?: (emotion: string, quote: string) => void;
  showSubHeader?: boolean;
}

/**
 * TodayMindSelectionWizard: '이달의 나 선택' (MonthlyIntentionWizard)과 100% 동일한 디자인 스펙의 오늘의 마음가짐 선택 공통 컴포넌트
 */
export function TodayMindSelectionWizard({
  onComplete,
  showSubHeader = true,
}: TodayMindSelectionWizardProps) {
  const { morningEmotion, setMorningEmotion, todayQuote, setTodayQuote } = useMindGym();
  const { closeModal } = useModalStore();

  const [step, setStep] = useState<1 | 2>(1);

  const [selectedEmotion, setSelectedEmotion] = useState<string>(
    morningEmotion || "차분함"
  );
  const [selectedQuote, setSelectedQuote] = useState<string>(
    todayQuote || "남과 비교하지 않고 내 페이스대로 가기"
  );
  const [customInputQuote, setCustomInputQuote] = useState<string>("");

  // Step 1: 감정 8대 파스텔 칩
  const emotionWords = [
    "차분함",
    "상쾌함",
    "설렘",
    "무난함",
    "멍함",
    "긴장됨",
    "피곤함",
    "답답함",
  ];

  // Step 2: 다짐 메모 예시 문구 칩 (6종)
  const presetQuotes = [
    "남과 비교하지 않고 내 페이스대로 가기",
    "급할수록 천천히, 내 호흡으로 움직이기",
    "오늘 할 수 있는 만큼만 하기",
    "완벽보다 안정감 있게 하루 보내기",
    "흔들려도 다시 돌아오기",
    "바쁜 와중에도 나를 놓치지 않기",
  ];

  const handleSelectEmotion = (w: string) => {
    setSelectedEmotion(w);
    setTimeout(() => {
      setStep(2);
    }, 150);
  };

  const handleSelectQuote = (q: string) => {
    setSelectedQuote(q);
    setCustomInputQuote("");
  };

  const handleFinish = () => {
    const finalQuote = customInputQuote.trim() || selectedQuote;
    setMorningEmotion(selectedEmotion);
    setTodayQuote(finalQuote);

    if (onComplete) {
      onComplete(selectedEmotion, finalQuote);
    } else {
      closeModal();
    }
  };

  const handleHeaderBack = () => {
    if (step > 1) {
      setStep(1);
    } else {
      closeModal();
    }
  };

  return (
    <div className="w-full h-full min-h-screen sm:min-h-0 bg-white flex flex-col select-none relative text-gray-900 overflow-hidden">
      {/* 서브 헤더: 상단 완전 고정 */}
      {showSubHeader && (
        <SubPageHeader
          title="아침 체크인"
          leftType="back"
          onLeftClick={handleHeaderBack}
        />
      )}

      {/* 전체 본문 수직 오버플로우 스크롤 컨테이너 */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-5 pt-3 pb-8 flex flex-col justify-between">
        {/* 1. 최상단 고정 2분할 세그먼트 스텝 라인 바 */}
        <div className="w-full flex gap-2 shrink-0 pt-1 pb-3">
          {[1, 2].map((i) => (
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

        {/* 2. 중앙 타이틀 & 다짐 선택 본문 영역 */}
        <div className="flex-1 flex flex-col justify-start py-2 gap-4">
          {/* 타이틀 뷰 좌측 정렬 레이아웃 */}
          <div className="flex flex-col justify-start shrink-0">
            <span className="txt-caption-main txt-brand-green uppercase font-semibold inline-flex items-center gap-1.5">
              <img src="/images/logo_icon.svg" alt="Icon" className="w-3.5 h-3.5 object-contain" />
              MORNING CHECK-IN STEP 0{step}
            </span>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="today_step1_title"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1 className="text-[26px] font-black txt-brand-ink leading-snug mt-1">
                    지금 가장 가까운 <br />
                    <AuroraText>마음상태를 골라보세요</AuroraText>
                  </h1>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="today_step2_title"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1 className="text-[26px] font-black txt-brand-ink leading-snug mt-1">
                    나에게 보내는 <br />
                    <AuroraText>오늘의 한 문장</AuroraText>
                  </h1>
                  <p className="text-xs text-gray-500 font-semibold mt-1.5 leading-relaxed">
                    오늘 하루를 지탱해 줄 문장을 하나 골라보세요
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. 단계별 선택 콘텐츠 */}
          <div className="flex flex-col justify-start shrink-0 my-1">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="today_step1_content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-2 h-full justify-start items-center"
                >
                  <div className="flex items-center gap-3 w-full pt-4 pb-2">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-200 to-gray-300" />
                    <span className="text-base font-bold text-gray-700 shrink-0 text-center">
                      지금의 마음 한 단어
                    </span>
                    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gray-200 to-gray-300" />
                  </div>

                  <div className="flex flex-wrap justify-center gap-2.5 max-w-sm">
                    {emotionWords.map((w) => (
                      <SelectChipButton
                        key={w}
                        label={w}
                        selected={selectedEmotion === w}
                        onClick={() => handleSelectEmotion(w)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="today_step2_content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-2.5 h-full justify-start items-center w-full pb-2"
                >
                  <div className="flex items-center gap-3 w-full pt-2 pb-1">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-200 to-gray-300" />
                    <span className="text-base font-bold text-gray-700 shrink-0 text-center">
                      다짐 문구 선택 또는 작성
                    </span>
                    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gray-200 to-gray-300" />
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    {presetQuotes.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => handleSelectQuote(q)}
                        className={`w-full py-3 px-3.5 rounded-2xl text-[14px] font-bold text-left transition-all cursor-pointer active:scale-98 shadow-2xs ${
                          selectedQuote === q && !customInputQuote
                            ? "bg-[#00C474] text-white shadow-xs"
                            : "bg-[#F8FAFC] text-gray-800 hover:bg-gray-100 border border-gray-100"
                        }`}
                      >
                        "{q}"
                      </button>
                    ))}

                    {/* 직접 입력 전용 카드 */}
                    <div
                      className={`w-full rounded-2xl border transition-all mt-1 ${
                        customInputQuote
                          ? "border-[#00C474] bg-emerald-50/50 ring-2 ring-[#00C474]/20 shadow-xs"
                          : "border-gray-200 bg-[#F8FAFC] focus-within:border-[#00C474] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#00C474]/20"
                      }`}
                    >
                      <div className="flex items-center px-3.5 py-1 gap-2.5">
                        <span className="text-[11px] font-extrabold text-[#00C474] bg-emerald-100/90 px-2.5 py-0.5 rounded-full shrink-0">
                          직접 입력
                        </span>
                        <input
                          type="text"
                          value={customInputQuote}
                          onChange={(e) => setCustomInputQuote(e.target.value)}
                          placeholder="나만의 다짐 문장을 직접 작성해 보세요..."
                          className="w-full bg-transparent py-2.5 text-[14px] font-bold text-gray-900 placeholder:text-gray-400 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 4. 하단 탐색 버튼 그룹 */}
        <div className="flex flex-col gap-2 shrink-0 pt-4 mt-auto">
          <div className="flex gap-2.5">
            {step > 1 && (
              <button
                type="button"
                onClick={handleHeaderBack}
                className="px-5 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-base font-extrabold rounded-2xl transition-colors shrink-0 cursor-pointer active:scale-95"
              >
                이전
              </button>
            )}

            <MagicButton
              onClick={() => {
                if (step < 2) {
                  setStep(2);
                } else {
                  handleFinish();
                }
              }}
              className="flex-1 py-4"
            >
              <span className="text-base font-extrabold tracking-tight">
                {step === 2 ? "이 마음으로 하루 시작하기" : "다음 단계로"}
              </span>
            </MagicButton>
          </div>
        </div>
      </div>
    </div>
  );
}
