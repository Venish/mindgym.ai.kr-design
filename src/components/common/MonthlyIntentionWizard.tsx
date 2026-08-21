"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuroraText } from "@/components/godui/AuroraText";
import { MagicButton } from "@/components/godui/MagicButton";
import { SelectChipButton } from "@/components/common/SelectChipButton";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { useMindGym } from "@/context/MindGymContext";
import { useModalStore } from "@/store/useModalStore";

interface MonthlyIntentionWizardProps {
  onComplete?: (mindWord: string, relationWord: string, growthWord: string) => void;
  showSubHeader?: boolean;
}

/**
 * MonthlyIntentionWizard: 온보딩과 마이페이지 전체에서 공동 사용하는 3단계 [이달의 나] 지향점 설정 공통 컴포넌트
 * - 온보딩 MonthlyRitualStartView.tsx의 1~3단계 레이아웃, 폰트, 오로라 텍스트, 칩버튼 배치를 100% 동일하게 공유
 */
export function MonthlyIntentionWizard({
  onComplete,
  showSubHeader = true,
}: MonthlyIntentionWizardProps) {
  const { currentIntention, setCurrentIntention } = useMindGym();
  const { closeModal } = useModalStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // 현재 설정된 키워드 정돈
  const initialClean =
    currentIntention.replace(/\s*\d+월\s*/g, "").trim() || "안정되게";

  const [mindWord, setMindWord] = useState(
    initialClean.endsWith("게") ? initialClean : "안정되게"
  );
  const [relationWord, setRelationWord] = useState("따뜻하게");
  const [growthWord, setGrowthWord] = useState("성장하며");

  // 단어 목록 (Step 1: 6개, Step 2: 4개, Step 3: 6개)
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
  };

  const handleFinish = () => {
    // 3가지 질문에서 각각 선택한 키워드를 수려한 3단 조합으로 결합
    const combinedIntention = `${mindWord} · ${relationWord} · ${growthWord}`;
    setCurrentIntention(combinedIntention);

    if (onComplete) {
      onComplete(mindWord, relationWord, growthWord);
    } else {
      closeModal();
    }
  };

  const handleHeaderBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3);
    } else {
      closeModal();
    }
  };

  const handlePrevStep = () => {
    handleHeaderBack();
  };

  return (
    <div className="w-full min-h-full bg-white flex flex-col select-none relative pb-8 text-gray-900">
      {/* 서브 헤더: 스텝 1 이상일 때 이전 스텝으로, 스텝 1일 때 모달만 닫아 MyPageSheet 유지 */}
      {showSubHeader && (
        <SubPageHeader
          title="이달의 나 설정"
          leftType="back"
          onLeftClick={handleHeaderBack}
        />
      )}

      <div className="flex-1 flex flex-col justify-between w-full px-5 pt-2 pb-2 text-left h-full min-h-[500px]">
        {/* 1. 온보딩 100% 동일: 최상단 고정 3분할 세그먼트 스텝 라인 바 */}
        <div className="w-full flex gap-2 shrink-0 pt-1 pb-2">
          {[1, 2, 3].map((i) => (
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

        {/* 2. 온보딩 100% 동일: 중앙 수직 정렬 내용 영역 (타이틀 & 콘텐츠 영역 높이 고정) */}
        <div className="flex-1 flex flex-col justify-center my-auto gap-4 py-2">
          {/* 타이틀 뷰 좌측 정렬 레이아웃 (높이 고정: h-[105px]) */}
          <div className="h-[105px] flex flex-col justify-start shrink-0">
            <span className="txt-caption-main txt-brand-green uppercase font-semibold inline-flex items-center gap-1.5">
              <img src="/images/logo_icon.svg" alt="Icon" className="w-3.5 h-3.5 object-contain" />
              MONTHLY RITUAL SETTING STEP 0{step}
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
            </AnimatePresence>
          </div>

          {/* 3. 온보딩 100% 동일: 단계별 선택 콘텐츠 (높이 고정: h-[270px]) */}
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
            </AnimatePresence>
          </div>
        </div>

        {/* 4. 공통 로그인/CTA 규격 적용 하단 탐색 버튼 그룹 */}
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
                if (step < 3) {
                  setStep((prev) => (prev + 1) as 1 | 2 | 3);
                } else {
                  handleFinish();
                }
              }}
              className="flex-1 py-4"
            >
              <span className="text-base font-extrabold tracking-tight">
                {step === 3 ? "이달의 나 설정 완료" : "다음 단계로"}
              </span>
            </MagicButton>
          </div>
        </div>
      </div>
    </div>
  );
}
