"use client";

import React, { useState, useEffect } from "react";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { useModalStore } from "@/store/useModalStore";
import { useMindGym } from "@/context/MindGymContext";
import { kossQuestions, KOSS_DOMAINS_INFO, KOSS_TIPS } from "@/data/koss";
import { KossIntroView } from "@/components/onboarding/KossIntroView";
import { KossQuestionsView } from "@/components/onboarding/KossQuestionsView";
import { AnalyzingBridgeView } from "@/components/onboarding/AnalyzingBridgeView";
import { KossResultView } from "@/components/onboarding/KossResultView";

/**
 * CommonKossDiagnosisSheet: 온보딩 KOSS 마음진단과 100% 동일한 프로세스 & 디자인 모달
 * - Step 1: INTRO (KossIntroView)
 * - Step 2: QUESTIONS (KossQuestionsView: 8대 영역 세그먼트 프로그레스 + 팁 배너 + 4점 척도 선택)
 * - Step 3: ANALYZING (AnalyzingBridgeView: 실시간 KOSS AI 심리학 분석 1.8초 브릿지 모션)
 * - Step 4: RESULT (KossResultView: 5단계 파스텔 레벨 링 스파이더 레이더 차트 결과)
 * - 완료 시: +5 DB 지급 토스트 및 전역 마음건강 수치 동기화
 */
export function CommonKossDiagnosisSheet() {
  const { closeModal } = useModalStore();
  const { userName, addDumbbells, triggerDashboardRefresh } = useMindGym();

  // 뷰 단계: "INTRO" | "QUESTIONS" | "ANALYZING" | "RESULT"
  const [step, setStep] = useState<"INTRO" | "QUESTIONS" | "ANALYZING" | "RESULT">("INTRO");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [analysisStep, setAnalysisStep] = useState(1);

  const currentQ = kossQuestions[qIndex];
  const currentDomain = currentQ?.domain || "직무자율";

  // 팁 아이콘 선택
  const tipIndex = qIndex % KOSS_TIPS.length;
  const currentTip = KOSS_TIPS[tipIndex];

  // 질문을 2줄로 미학적 포맷팅
  const formatQuestionToTwoLines = (qStr: string) => {
    if (!qStr) return null;
    const splitArr = qStr.split("\n");
    if (splitArr.length > 1) {
      return (
        <>
          <span className="block">{splitArr[0]}</span>
          <span className="block text-gray-700 text-lg font-normal mt-1">{splitArr[1]}</span>
        </>
      );
    }
    return qStr;
  };

  // 문항 선택 완료 시 처리
  const handleSelectAnswer = (val: number) => {
    if (!currentQ) return;
    const updated = { ...answers, [currentQ.id]: val };
    setAnswers(updated);

    if (qIndex < kossQuestions.length - 1) {
      setQIndex((prev) => prev + 1);
    } else {
      // 모든 문항 완료 시 즉시 ANALYZING 샌드위치 처리 브릿지 뷰로 이동
      setStep("ANALYZING");
    }
  };

  // ANALYZING 단계 시 1.8초 동안 체크리스트 애니메이션 후 RESULT 단계로 전이
  useEffect(() => {
    if (step === "ANALYZING") {
      const timer1 = setTimeout(() => setAnalysisStep(2), 400);
      const timer2 = setTimeout(() => setAnalysisStep(3), 800);
      const timer3 = setTimeout(() => setAnalysisStep(4), 1200);
      const timerDone = setTimeout(() => {
        addDumbbells(5);
        triggerDashboardRefresh();
        setStep("RESULT");
      }, 1800);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timerDone);
      };
    }
  }, [step, addDumbbells, triggerDashboardRefresh]);

  return (
    <div className="w-full min-h-full bg-white flex flex-col select-none relative text-gray-900 overflow-y-auto">
      {/* 1. 서브 헤더 (고정 56px 규격, 좌측 X 닫기 버튼 표출) */}
      <SubPageHeader
        title="30초 마음진단"
        leftType="close"
        onLeftClick={closeModal}
      />

      {/* 2. 온보딩 100% 동일 이식 뷰 레이아웃 */}
      <div className="flex-1 flex flex-col w-full px-5 pt-2 pb-6 max-w-lg mx-auto min-h-[560px]">
        {step === "INTRO" && (
          <KossIntroView
            nickname={userName}
            onStart={() => setStep("QUESTIONS")}
            onSkip={closeModal}
          />
        )}

        {step === "QUESTIONS" && (
          <KossQuestionsView
            nickname={userName}
            qIndex={qIndex}
            totalQuestionsCount={kossQuestions.length}
            currentQ={currentQ}
            currentDomain={currentDomain}
            domainsInfo={KOSS_DOMAINS_INFO}
            currentTip={currentTip}
            formatQuestionToTwoLines={formatQuestionToTwoLines}
            onSelectAnswer={handleSelectAnswer}
          />
        )}

        {step === "ANALYZING" && (
          <AnalyzingBridgeView
            analysisStep={analysisStep}
          />
        )}

        {step === "RESULT" && (
          <KossResultView
            onNext={closeModal}
            buttonText="닫기"
            showArrowIcon={false}
          />
        )}
      </div>
    </div>
  );
}
