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
    todayQuote || "오늘도 남 비교하지 말고 내 페이스대로 걷기"
  );
  const [customInputQuote, setCustomInputQuote] = useState<string>("");

  // Step 1: 감정 8대 파스텔 칩
  const emotionWords = [
    "차분함",
    "상쾌함",
    "설렘",
    "평온함",
    "긴장됨",
    "피곤함",
    "답답함",
    "기쁨",
  ];

  // Step 2: 다짐 메모 예시 문구 칩
  const presetQuotes = [
    "오늘도 남 비교하지 말고 내 페이스대로 걷기",
    "내 안의 소리에 집중하고 편안해지기",
    "천천히 가더라도 바르게 걸어가기",
    "나 자신을 따뜻하고 다정하게 아껴주기",
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
    <div className="w-full min-h-full bg-white flex flex-col select-none relative pb-8 text-gray-900">
      {/* 서브 헤더: 스텝 2일 때 1단계로, 스텝 1일 때 모달 닫기 */}
      {showSubHeader && (
        <SubPageHeader
          title="오늘의 마음가짐 설정"
          leftType="back"
          onLeftClick={handleHeaderBack}
        />
      )}

      <div className="flex-1 flex flex-col justify-between w-full px-5 pt-2 pb-2 text-left h-full min-h-[500px]">
        {/* 1. 최상단 고정 2분할 세그먼트 스텝 라인 바 */}
        <div className="w-full flex gap-2 shrink-0 pt-1 pb-2">
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

        {/* 2. 중앙 수직 정렬 내용 영역 (타이틀 & 콘텐츠 영역 높이 고정) */}
        <div className="flex-1 flex flex-col justify-center my-auto gap-4 py-2">
          {/* 타이틀 뷰 좌측 정렬 레이아웃 (높이 고정: h-[105px]) */}
          <div className="h-[105px] flex flex-col justify-start shrink-0">
            <span className="txt-caption-main txt-brand-green uppercase font-semibold inline-flex items-center gap-1.5">
              <img src="/images/logo_icon.svg" alt="Icon" className="w-3.5 h-3.5 object-contain" />
              TODAY MIND SETTING STEP 0{step}
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
                    지금 느껴지는 <br />
                    <AuroraText>오늘의 마음 상태예요</AuroraText>
                  </h1>
                  <p className="text-xs text-gray-500 font-semibold mt-1.5 leading-relaxed">
                    현재 가장 가깝게 느껴지는 마음 단어를 하나 선택해 보세요
                  </p>
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
                    <AuroraText>오늘의 한 줄 다짐 메모</AuroraText>
                  </h1>
                  <p className="text-xs text-gray-500 font-semibold mt-1.5 leading-relaxed">
                    오늘 하루 나를 단단하게 잡아줄 다짐 한 줄을 선택해 주세요
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
                      오늘 마음 감정 선택
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
                  className="flex flex-col gap-3 h-full justify-start items-center w-full"
                >
                  <div className="flex items-center gap-3 w-full pt-3 pb-1">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-200 to-gray-300" />
                    <span className="text-base font-bold text-gray-700 shrink-0 text-center">
                      다짐 문구 선택 또는 작성
                    </span>
                    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gray-200 to-gray-300" />
                  </div>

                  <div className="flex flex-col gap-2.5 w-full">
                    {presetQuotes.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => handleSelectQuote(q)}
                        className={`w-full py-3.5 px-4 rounded-2xl text-[14.5px] font-bold text-left transition-all cursor-pointer active:scale-98 shadow-2xs ${
                          selectedQuote === q && !customInputQuote
                            ? "bg-[#00C474] text-white shadow-xs"
                            : "bg-[#F8FAFC] text-gray-800 hover:bg-gray-100 border border-gray-100"
                        }`}
                      >
                        "{q}"
                      </button>
                    ))}

                    <input
                      type="text"
                      value={customInputQuote}
                      onChange={(e) => setCustomInputQuote(e.target.value)}
                      placeholder="나만의 다짐 메모 직접 입력하기..."
                      className="w-full py-3.5 px-4 rounded-2xl text-[14.5px] font-bold bg-[#F8FAFC] border border-gray-200 focus:border-[#00C474] focus:bg-white text-gray-900 placeholder:text-gray-400 outline-none transition-all mt-1"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 4. 하단 탐색 버튼 그룹 */}
        <div className="flex flex-col gap-2 shrink-0 pt-2">
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
