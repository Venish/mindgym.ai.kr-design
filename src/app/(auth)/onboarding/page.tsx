"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import {
  Flower,
  Leaf,
  Barbell,
  Clock,
  Microscope,
  ShieldCheck,
  FloppyDisk,
  LockKey,
} from "@phosphor-icons/react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { kossQuestions } from "@/data/koss";

// 분리한 온보딩 서브 컴포넌트 10종 Import
import { OnboardingSlidesView } from "@/components/onboarding/OnboardingSlidesView";
import { CeoPopupModal } from "@/components/onboarding/CeoPopupModal";
import { NicknameSetupView } from "@/components/onboarding/NicknameSetupView";
import { KossIntroView } from "@/components/onboarding/KossIntroView";
import { KossQuestionsView } from "@/components/onboarding/KossQuestionsView";
import { AnalyzingBridgeView } from "@/components/onboarding/AnalyzingBridgeView";
import { KossResultView } from "@/components/onboarding/KossResultView";
import { MonthlyRitualStartView } from "@/components/onboarding/MonthlyRitualStartView";
import { CheckinTimeSetupView } from "@/components/onboarding/CheckinTimeSetupView";

type OnboardingView =
  | "SLIDES"
  | "CEO_POPUP"
  | "NICKNAME"
  | "KOSS_INTRO"
  | "KOSS"
  | "ANALYZING"
  | "RESULT"
  | "CHECKIN_TIME_SETUP"
  | "MONTHLY_START";

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isResultDirect = searchParams.get("result") !== null;
  const modeParam = searchParams.get("mode") || searchParams.get("view");
  const initialView: OnboardingView = isResultDirect
    ? "RESULT"
    : modeParam === "result"
    ? "RESULT"
    : modeParam === "monthly_start" || modeParam === "monthly_intention"
    ? "MONTHLY_START"
    : modeParam === "checkin_time"
    ? "CHECKIN_TIME_SETUP"
    : "SLIDES";

  const [view, setView] = useState<OnboardingView>(initialView);

  // URL 쿼리 파라미터 변경 시 해당 뷰로 즉시 동기화
  useEffect(() => {
    if (isResultDirect) setView("RESULT");
    else if (modeParam === "ceo") setView("CEO_POPUP");
    else if (modeParam === "nickname") setView("NICKNAME");
    else if (modeParam === "koss_intro") setView("KOSS_INTRO");
    else if (modeParam === "koss") setView("KOSS");
    else if (modeParam === "analyzing" || modeParam === "loading") setView("ANALYZING");
    else if (modeParam === "monthly_start" || modeParam === "monthly_intention") setView("MONTHLY_START");
    else if (modeParam === "checkin_time") setView("CHECKIN_TIME_SETUP");
    else if (modeParam === "slides") setView("SLIDES");
  }, [modeParam, isResultDirect]);

  const [slideIndex, setSlideIndex] = useState(0);

  // 닉네임 설정 상태
  const [nickname, setNickname] = useState("보노보노");

  // 이달의 나 & 체크인 시간 설정 상태
  const [selectedKeyword, setSelectedKeyword] = useState("차분한 8월");
  const [morningTime, setMorningTime] = useState("08:00");
  const [eveningTime, setEveningTime] = useState("21:00");

  // KOSS 설문 진행 상태
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [qId: number]: number }>({});
  const [analysisStep, setAnalysisStep] = useState(1);

  // KOSS 질문 진행 중 하단 팁 데이터
  const kossTips = [
    { text: "솔직하게 답변할수록 더 정확한 내 마음 정원이 완성돼요.", icon: Flower, bgClass: "bg-emerald-50/90 border-emerald-200/80", iconClass: "text-[#00C474]" },
    { text: "정답은 없어요. 최근 1주일간 느낀 그대로 편안히 눌러주세요.", icon: Leaf, bgClass: "bg-[#F8FAF9] border-emerald-100", iconClass: "text-[#00C474]" },
    { text: "직무 스트레스 지표는 나의 약점이 아닌 보살핌의 신호예요.", icon: Barbell, bgClass: "bg-amber-50/80 border-amber-200/80", iconClass: "text-amber-600" },
    { text: "잠시 숨을 깊게 내쉬고 현재 나의 상태에 집중해 보세요.", icon: Clock, bgClass: "bg-emerald-50/90 border-emerald-200/80", iconClass: "text-[#00C474]" },
    { text: "진단 결과는 개인 맞춤 틈새 리추얼을 추천하는 데 사용돼요.", icon: Microscope, bgClass: "bg-sky-50/80 border-sky-200/80", iconClass: "text-sky-600" },
    { text: "나만의 편안한 속도로 36문항을 차근차근 진행해 보세요.", icon: ShieldCheck, bgClass: "bg-emerald-50/90 border-emerald-200/80", iconClass: "text-[#00C474]" },
    { text: "답변하신 모든 결과는 철저히 암호화되어 안전하게 보호됩니다.", icon: LockKey, bgClass: "bg-gray-50 border-gray-200", iconClass: "text-gray-600" },
    { text: "거의 다 왔어요! 완료 후 나만을 위한 리추얼이 펼쳐집니다.", icon: FloppyDisk, bgClass: "bg-emerald-50/90 border-emerald-200/80", iconClass: "text-[#00C474]" },
  ];

  const domainsInfo = [
    { domain: "물리환경", count: 3 },
    { domain: "직무요구", count: 8 },
    { domain: "직무자율", count: 5 },
    { domain: "관계갈등", count: 4 },
    { domain: "직업불안정", count: 2 },
    { domain: "조직체계", count: 7 },
    { domain: "보상부적절", count: 3 },
    { domain: "직장문화", count: 4 },
  ];

  const currentQ = kossQuestions[qIndex];
  const currentDomain = currentQ ? currentQ.domain : "직무 스트레스";

  const currentTipIndex = Math.min(
    Math.floor((qIndex / kossQuestions.length) * kossTips.length),
    kossTips.length - 1
  );
  const currentTip = kossTips[currentTipIndex];

  const formatQuestionToTwoLines = (qStr: string) => {
    if (!qStr) return null;
    const cleanStr = qStr.trim();
    if (cleanStr.includes("\n")) {
      const parts = cleanStr.split("\n");
      return (
        <span>
          {parts[0]}
          <br />
          {parts.slice(1).join(" ")}
        </span>
      );
    }
    const mid = Math.floor(cleanStr.length / 2);
    let splitIdx = cleanStr.indexOf(" ", mid);
    if (splitIdx === -1) splitIdx = cleanStr.lastIndexOf(" ", mid);
    if (splitIdx === -1) return cleanStr;
    return (
      <span>
        {cleanStr.substring(0, splitIdx)}
        <br />
        {cleanStr.substring(splitIdx + 1)}
      </span>
    );
  };

  const handleNextSlide = () => {
    if (slideIndex < 3) {
      setSlideIndex((prev) => prev + 1);
    } else {
      setView("CEO_POPUP");
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectAnswer = (val: number) => {
    if (!currentQ || isSubmitting) return;
    setAnswers((prev) => ({ ...prev, [currentQ.id]: val }));

    if (qIndex >= kossQuestions.length - 1) {
      setIsSubmitting(true);
      setView("ANALYZING");
      setAnalysisStep(1);

      setTimeout(() => setAnalysisStep(2), 500);
      setTimeout(() => setAnalysisStep(3), 1000);
      setTimeout(() => setAnalysisStep(4), 1500);
      setTimeout(() => {
        setView("RESULT");
        setIsSubmitting(false);
      }, 2000);
    } else {
      setQIndex((prev) => Math.min(prev + 1, kossQuestions.length - 1));
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between relative px-5 py-4 min-h-[580px]">
      {/* 최상단 마인드짐 로고 헤더 */}
      {view !== "KOSS" && view !== "MONTHLY_START" && (
        <div className="w-full flex justify-center items-center py-2 shrink-0 z-20">
          <BrandLogo size="md" />
        </div>
      )}

      {/* 뷰 전환 렌더링 오케스트레이터 (AnimatePresence 체인 분리) */}
      <AnimatePresence mode="wait">
        {view === "SLIDES" && (
          <OnboardingSlidesView
            slideIndex={slideIndex}
            onNextSlide={handleNextSlide}
            onSelectDot={(idx) => setSlideIndex(idx)}
          />
        )}

        {(view === "NICKNAME" || view === "CEO_POPUP") && (
          <NicknameSetupView
            nickname={nickname}
            onChangeNickname={(val) => setNickname(val)}
            onSubmit={() => setView("KOSS_INTRO")}
          />
        )}

        {view === "KOSS_INTRO" && (
          <KossIntroView
            nickname={nickname}
            onStart={() => {
              setQIndex(0);
              setView("KOSS");
            }}
            onSkip={() => setView("RESULT")}
          />
        )}

        {view === "KOSS" && (
          <KossQuestionsView
            nickname={nickname}
            qIndex={qIndex}
            totalQuestionsCount={kossQuestions.length}
            currentQ={currentQ}
            currentDomain={currentDomain}
            domainsInfo={domainsInfo}
            currentTip={currentTip}
            formatQuestionToTwoLines={formatQuestionToTwoLines}
            onSelectAnswer={handleSelectAnswer}
          />
        )}

        {view === "ANALYZING" && (
          <AnalyzingBridgeView analysisStep={analysisStep} />
        )}

        {view === "RESULT" && (
          <KossResultView onNext={() => setView("MONTHLY_START")} />
        )}

        {view === "CHECKIN_TIME_SETUP" && (
          <CheckinTimeSetupView
            morningTime={morningTime}
            eveningTime={eveningTime}
            onSelectMorningTime={(t) => setMorningTime(t)}
            onSelectEveningTime={(t) => setEveningTime(t)}
            onComplete={() => setView("MONTHLY_START")}
          />
        )}

        {view === "MONTHLY_START" && (
          <MonthlyRitualStartView
            nickname={nickname}
            selectedKeyword={selectedKeyword}
            morningTime={morningTime}
            eveningTime={eveningTime}
            onSelectMorningTime={(t) => setMorningTime(t)}
            onSelectEveningTime={(t) => setEveningTime(t)}
            onSelectKeyword={(kw) => setSelectedKeyword(kw)}
            onNext={() => router.push("/dashboard?execute_ritual=true")}
          />
        )}
      </AnimatePresence>

      {/* CEO 팝업 모달 (AnimatePresence 외부 독립 렌더링으로 딜레이 0ms 보장) */}
      <CeoPopupModal
        isOpen={view === "CEO_POPUP"}
        onClose={() => setView("NICKNAME")}
      />
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
      <OnboardingContent />
    </Suspense>
  );
}
