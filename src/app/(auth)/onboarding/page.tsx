"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { BrandLogo } from "@/components/ui/BrandLogo";
import {
  kossQuestions,
  KOSS_TIPS,
  KOSS_DOMAINS_INFO,
  formatQuestionToTwoLines,
} from "@/data/koss";

// 공통 컴포넌트 & 온보딩 모듈러 서브 컴포넌트
import { OnboardingSlidesView } from "@/components/onboarding/OnboardingSlidesView";
import { CeoPopupModal } from "@/components/onboarding/CeoPopupModal";
import { NicknameSetupView } from "@/components/onboarding/NicknameSetupView";
import { KossIntroView } from "@/components/onboarding/KossIntroView";
import { KossQuestionsView } from "@/components/onboarding/KossQuestionsView";
import { AnalyzingBridgeView } from "@/components/onboarding/AnalyzingBridgeView";
import { KossResultView } from "@/components/onboarding/KossResultView";
import { CheckinTimeSetupView } from "@/components/onboarding/CheckinTimeSetupView";
import { MonthlyIntentionWizard } from "@/components/common/MonthlyIntentionWizard";
import { MonthlyRitualStartView } from "@/components/onboarding/MonthlyRitualStartView";

/**
 * 상단 중앙 브랜드 로고가 노출되는 뷰 집합 (선언적 관리)
 */
const LOGO_VISIBLE_VIEWS = new Set<OnboardingView>([
  "SLIDES",
  "NICKNAME",
  "CEO_POPUP",
  "KOSS_INTRO",
  "CHECKIN_TIME_SETUP",
]);

/**
 * 사용자 직접 제어 가능 온보딩 스텝 정의 (순서 및 스텝 플로우)
 */
export type OnboardingView =
  | "SLIDES"
  | "CEO_POPUP"
  | "NICKNAME"
  | "KOSS_INTRO"
  | "KOSS"
  | "ANALYZING"
  | "RESULT"
  | "CHECKIN_TIME_SETUP"
  | "MONTHLY_INTENTION"
  | "MONTHLY_START";

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isResultDirect = searchParams ? searchParams.get("result") !== null : false;
  const modeParam = searchParams ? (searchParams.get("mode") || searchParams.get("view")) : null;
  const initialView: OnboardingView = isResultDirect
    ? "RESULT"
    : modeParam === "result"
    ? "RESULT"
    : modeParam === "monthly_start"
    ? "MONTHLY_START"
    : modeParam === "monthly_intention"
    ? "MONTHLY_INTENTION"
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
    else if (modeParam === "monthly_intention") setView("MONTHLY_INTENTION");
    else if (modeParam === "monthly_start") setView("MONTHLY_START");
    else if (modeParam === "checkin_time") setView("CHECKIN_TIME_SETUP");
    else if (modeParam === "slides") setView("SLIDES");
  }, [modeParam, isResultDirect]);

  const [slideIndex, setSlideIndex] = useState(0);

  // 닉네임 설정 상태
  const [nickname, setNickname] = useState("보노보노");

  // 이달의 나 & 체크인 시간 설정 상태
  const [selectedKeyword, setSelectedKeyword] = useState("차분하게 · 따뜻하게 · 균형 되찾기");
  const [morningTime, setMorningTime] = useState("08:00");
  const [eveningTime, setEveningTime] = useState("21:00");

  // KOSS 설문 진행 상태
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [qId: number]: number }>({});
  const [analysisStep, setAnalysisStep] = useState(1);

  const currentQ = kossQuestions[qIndex];
  const currentDomain = currentQ ? currentQ.domain : "직무 스트레스";

  // 현재 문항 기반 가이드 팁 획득
  const currentTip = (() => {
    if (qIndex === kossQuestions.length - 1) {
      return KOSS_TIPS[KOSS_TIPS.length - 1]; // 마지막 질문 팁
    }
    if (currentDomain === "직장문화") {
      return KOSS_TIPS[KOSS_TIPS.length - 2]; // 거의 다 왔어요 팁
    }
    const tipIdx = Math.min(
      Math.floor((qIndex / kossQuestions.length) * KOSS_TIPS.length),
      KOSS_TIPS.length - 1
    );
    return KOSS_TIPS[tipIdx];
  })();

  const handleNextSlide = () => {
    if (slideIndex < 3) {
      setSlideIndex((prev) => prev + 1);
    } else {
      setView("CEO_POPUP");
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isQuestionLocked, setIsQuestionLocked] = useState(false);

  const handleSelectAnswer = (val: number) => {
    if (!currentQ || isSubmitting || isQuestionLocked) return;
    setIsQuestionLocked(true);
    setAnswers((prev) => ({ ...prev, [currentQ.id]: val }));

    setTimeout(() => {
      if (qIndex >= kossQuestions.length - 1) {
        setIsSubmitting(true);
        setView("ANALYZING");
      } else {
        setQIndex((prev) => Math.min(prev + 1, kossQuestions.length - 1));
      }
      setIsQuestionLocked(false);
    }, 150);
  };

  // 온보딩 완료 시 뒤로가기 방지용 router.replace 호출
  const handleCompleteOnboarding = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("mindgym_has_onboarded", "true");
      } catch (e) {
        // ignore
      }
    }
    router.replace("/dashboard?execute_ritual=true");
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between relative px-5 py-4 min-h-[580px]">
      {/* 최상단 마인드짐 로고 헤더 (선언적 뷰 집합 관리) */}
      {LOGO_VISIBLE_VIEWS.has(view) && (
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
              setIsQuestionLocked(false);
              setView("KOSS");
            }}
            onSkip={() => setView("CHECKIN_TIME_SETUP")}
          />
        )}

        {view === "KOSS" && (
          <KossQuestionsView
            nickname={nickname}
            qIndex={qIndex}
            totalQuestionsCount={kossQuestions.length}
            currentQ={currentQ}
            currentDomain={currentDomain}
            domainsInfo={KOSS_DOMAINS_INFO}
            currentTip={currentTip}
            formatQuestionToTwoLines={formatQuestionToTwoLines}
            onSelectAnswer={handleSelectAnswer}
            isLocked={isQuestionLocked}
          />
        )}

        {view === "ANALYZING" && (
          <AnalyzingBridgeView
            onComplete={() => {
              setView("RESULT");
              setIsSubmitting(false);
              router.replace("/onboarding?mode=result");
            }}
          />
        )}

        {view === "RESULT" && (
          <KossResultView onNext={() => setView("CHECKIN_TIME_SETUP")} />
        )}

        {view === "CHECKIN_TIME_SETUP" && (
          <CheckinTimeSetupView
            morningTime={morningTime}
            eveningTime={eveningTime}
            onSelectMorningTime={(t) => setMorningTime(t)}
            onSelectEveningTime={(t) => setEveningTime(t)}
            onComplete={() => setView("MONTHLY_INTENTION")}
            onSkip={handleCompleteOnboarding}
          />
        )}

        {view === "MONTHLY_INTENTION" && (
          <MonthlyIntentionWizard
            showSubHeader={false}
            onBack={() => setView("CHECKIN_TIME_SETUP")}
            onComplete={(mind, rel, grow) => {
              const combined = `${mind} · ${rel} · ${grow}`;
              setSelectedKeyword(combined);
              setView("MONTHLY_START");
            }}
          />
        )}

        {view === "MONTHLY_START" && (
          <MonthlyRitualStartView
            nickname={nickname}
            selectedKeyword={selectedKeyword}
            morningTime={morningTime}
            eveningTime={eveningTime}
            onNext={handleCompleteOnboarding}
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
    <Suspense fallback={<div className="flex-1 min-h-screen bg-theme-app" />}>
      <OnboardingContent />
    </Suspense>
  );
}
