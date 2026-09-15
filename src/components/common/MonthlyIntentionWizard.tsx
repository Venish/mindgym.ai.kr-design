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
  onBack?: () => void;
  showSubHeader?: boolean;
}

/**
 * MonthlyIntentionWizard: 온보딩과 마이페이지 전체에서 공동 사용하는 3단계 [이달의 나] 지향점 설정 공통 컴포넌트
 * - 온보딩과 마이페이지에서 디자인, 타이포, 인터랙션을 100% 동일하게 공유
 */
export function MonthlyIntentionWizard({
  onComplete,
  onBack,
  showSubHeader = true,
}: MonthlyIntentionWizardProps) {
  const { currentIntention, setCurrentIntention } = useMindGym();
  const { closeModal } = useModalStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // 현재 설정된 키워드 정돈
  const initialClean =
    currentIntention.replace(/\s*\d+월\s*/g, "").trim() || "안정되게";

  const [mindWord, setMindWord] = useState(
    initialClean.endsWith("게") ? initialClean : "차분하게"
  );
  const [relationWord, setRelationWord] = useState("따뜻하게");
  const [growthWord, setGrowthWord] = useState("균형 되찾기");

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

  // 스텝별 메타데이터 구성 (중복 코드 제거 및 단일 렌더링 파이프라인)
  const STEP_METAS = [
    {
      step: 1 as const,
      titleTop: "이번 달, 나는",
      titleHighlight: "이렇게 지내고 싶어요",
      subtitle: "원하는 마음의 방향을 하나 골라보세요",
      dividerTitle: "이번 달, 나는 이렇게 지내고 싶어요",
      words: ["차분하게", "평온하게", "활기차게", "단단하게", "여유있게", "용기있게"],
      selected: mindWord,
      onSelect: handleSelectMindWord,
    },
    {
      step: 2 as const,
      titleTop: "사람들과",
      titleHighlight: "이렇게 지내고 싶어요",
      subtitle: "대인관계에서 어떤 나를 원하나요",
      dividerTitle: "사람들과 이렇게 지내고 싶어요",
      words: ["따뜻하게", "솔직하게", "유연하게", "경청하며", "존중하며", "친근하게"],
      selected: relationWord,
      onSelect: handleSelectRelationWord,
    },
    {
      step: 3 as const,
      titleTop: "나에게 이런",
      titleHighlight: "변화를 선물하고 싶어요",
      subtitle: "가장 가까운 키워드를 골라보세요",
      dividerTitle: "나에게 이런 변화를 선물하고 싶어요",
      words: ["균형 되찾기", "회복력 기르기", "안정감 높이기", "여유 되찾기", "중심 세우기", "무리하지 않기"],
      selected: growthWord,
      onSelect: handleSelectGrowthWord,
    },
  ];

  const currentMeta = STEP_METAS[step - 1];

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
      if (onBack) {
        onBack();
      } else {
        closeModal();
      }
    }
  };

  const handlePrevStep = () => {
    handleHeaderBack();
  };

  return (
    <div className={`w-full flex-1 flex flex-col justify-between select-none relative txt-brand-ink min-h-full ${showSubHeader ? "px-5 pb-4" : ""}`}>
      {/* 서브 헤더: 스텝 1 이상일 때 이전 스텝으로, 스텝 1일 때 모달만 닫아 MyPageSheet 유지 */}
      {showSubHeader && (
        <SubPageHeader
          title="이달의 나 설정"
          leftType="back"
          onLeftClick={handleHeaderBack}
        />
      )}

      <div className="flex-1 flex flex-col justify-between w-full pt-1 pb-1 text-left h-full">
        {/* 1. 온보딩 100% 동일: 최상단 고정 3분할 세그먼트 스텝 라인 바 */}
        <div className="w-full flex gap-2 shrink-0 pt-1 pb-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-1 h-1.5 bg-theme-card-subtle rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#00C474] rounded-full"
                initial={{ width: i === 1 ? "100%" : "0%" }}
                animate={{ width: i <= step ? "100%" : "0%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          ))}
        </div>

        {/* 2. 온보딩 100% 동일: 상단 잘림 방지 안전 수직 중앙 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-1 flex flex-col w-full">
          <div className="my-auto w-full flex flex-col gap-4 py-2">
            {/* 타이틀 뷰 좌측 정렬 레이아웃 */}
            <div className="flex flex-col justify-start shrink-0">
              <span className="txt-caption-main txt-brand-green uppercase font-semibold inline-flex items-center gap-1.5">
                <img src="/images/logo_icon.svg" alt="Icon" className="w-3.5 h-3.5 object-contain" />
                MONTHLY RITUAL SETTING STEP 0{step}
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`step${step}_title`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1 className="text-[26px] font-black txt-brand-ink leading-snug mt-1">
                    {currentMeta.titleTop} <br />
                    <AuroraText>{currentMeta.titleHighlight}</AuroraText>
                  </h1>
                  <p className="text-xs text-theme-muted font-semibold mt-1.5 leading-relaxed">
                    {currentMeta.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 3. 단계별 선택 콘텐츠 */}
            <div className="flex flex-col justify-start shrink-0 my-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`step${step}_content`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-2 h-full justify-start items-center"
                >
                  <div className="flex items-center gap-3 w-full pt-6 pb-2.5">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-200 to-gray-300 dark:via-slate-800 dark:to-slate-700" />
                    <span className="text-base font-bold txt-brand-ink shrink-0 text-center">
                      {currentMeta.dividerTitle}
                    </span>
                    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gray-200 to-gray-300 dark:via-slate-800 dark:to-slate-700" />
                  </div>

                  <div className="flex flex-wrap justify-center gap-3">
                    {currentMeta.words.map((w) => (
                      <SelectChipButton
                        key={w}
                        label={w}
                        selected={currentMeta.selected === w}
                        onClick={() => currentMeta.onSelect(w)}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 4. 공통 로그인/CTA 규격 적용 하단 탐색 버튼 그룹 */}
        <div className="flex flex-col gap-2 shrink-0 pt-2">
          <div className="flex gap-2.5 w-full">
            {step > 1 && (
              <button
                type="button"
                onClick={handleHeaderBack}
                className="px-5 min-w-[72px] h-[52px] bg-theme-card-subtle hover:brightness-95 txt-brand-ink text-[15px] font-bold rounded-2xl transition-all active:scale-[0.96] flex items-center justify-center shrink-0 cursor-pointer"
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
              className="flex-1"
            >
              <span>
                {step === 3 ? "이달의 나 설정 완료" : "다음 단계로"}
              </span>
            </MagicButton>
          </div>
        </div>
      </div>
    </div>
  );
}
