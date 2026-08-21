"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { Badge } from "@/components/ui/Badge";
import { useMindGym } from "@/context/MindGymContext";
import { usePopupStore } from "@/store/usePopupStore";
import { useModalStore } from "@/store/useModalStore";
import { MonthlyIntentionWizard } from "@/components/common/MonthlyIntentionWizard";
import { BklitRadarChart } from "@/components/ui/BklitRadarChart";
import { BklitBarChart } from "@/components/ui/BklitBarChart";
import { SegmentedTab } from "@/components/ui/SegmentedTab";
import { CalendarSheet } from "@/components/dashboard/CalendarSheet";
import {
  PencilSimple,
  Barbell,
  CalendarCheck,
  Heart,
  CheckCircle,
  Gear,
  CaretRight,
  Flame,
  Warning,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";

// 스파이더 종합 지도 전용 월별 레이더 수치 데이터셋
const RADAR_MONTHLY_VALUES: Record<
  string,
  { label: string; color: string; values: Record<string, number> }
> = {
  "7월": {
    label: "7월 진단",
    color: "#6366F1",
    values: { demand: 9, autonomy: 4, culture: 8, reward: 7, relation: 5, wlb: 7, environment: 4, stability: 6 },
  },
  "8월": {
    label: "8월 진단",
    color: "#00C474",
    values: { demand: 8, autonomy: 5, culture: 7, reward: 6, relation: 4, wlb: 6, environment: 3, stability: 5 },
  },
  "9월": {
    label: "9월 목표",
    color: "#3B82F6",
    values: { demand: 6, autonomy: 7, culture: 5, reward: 5, relation: 3, wlb: 4, environment: 3, stability: 4 },
  },
};

// 7월, 8월, 9월 KOSS 8대 영역별 파스텔 톤 더미 데이터셋
const MONTHLY_KOSS_DATA: Record<
  string,
  { name: string; sub: string; score: number; status: string; barColor: string; textColor: string }[]
> = {
  "7월": [
    { name: "직무 요구", sub: "업무량·속도", score: 9, status: "위험", barColor: "bg-[#FF9A9E]", textColor: "text-[#E57373]" },
    { name: "직무 자율성", sub: "의사결정권", score: 4, status: "부족", barColor: "bg-[#FFD166]", textColor: "text-[#D97706]" },
    { name: "조직 문화", sub: "지지·소통", score: 8, status: "높음", barColor: "bg-[#FF9A9E]", textColor: "text-[#E57373]" },
    { name: "보상 체계", sub: "급여·인정", score: 7, status: "주의", barColor: "bg-[#FFB7B2]", textColor: "text-[#E57373]" },
    { name: "관계 갈등", sub: "대인관계", score: 5, status: "보통", barColor: "bg-[#FFD166]", textColor: "text-[#D97706]" },
    { name: "일-생활 균형", sub: "워라밸", score: 7, status: "주의", barColor: "bg-[#FFB7B2]", textColor: "text-[#E57373]" },
    { name: "물리 환경", sub: "작업환경", score: 4, status: "양호", barColor: "bg-[#6EE7B7]", textColor: "text-[#059669]" },
    { name: "직업 안정성", sub: "고용안정", score: 6, status: "보통", barColor: "bg-[#FFD166]", textColor: "text-[#D97706]" },
  ],
  "8월": [
    { name: "직무 요구", sub: "업무량·속도", score: 8, status: "높음", barColor: "bg-[#FF9A9E]", textColor: "text-[#E57373]" },
    { name: "직무 자율성", sub: "의사결정권", score: 5, status: "보통", barColor: "bg-[#FFD166]", textColor: "text-[#D97706]" },
    { name: "조직 문화", sub: "지지·소통", score: 7, status: "주의", barColor: "bg-[#FFB7B2]", textColor: "text-[#E57373]" },
    { name: "보상 체계", sub: "급여·인정", score: 6, status: "보통", barColor: "bg-[#FFD166]", textColor: "text-[#D97706]" },
    { name: "관계 갈등", sub: "대인관계", score: 4, status: "양호", barColor: "bg-[#6EE7B7]", textColor: "text-[#059669]" },
    { name: "일-생활 균형", sub: "워라밸", score: 6, status: "보통", barColor: "bg-[#FFD166]", textColor: "text-[#D97706]" },
    { name: "물리 환경", sub: "작업환경", score: 3, status: "양호", barColor: "bg-[#6EE7B7]", textColor: "text-[#059669]" },
    { name: "직업 안정성", sub: "고용안정", score: 5, status: "보통", barColor: "bg-[#FFD166]", textColor: "text-[#D97706]" },
  ],
  "9월": [
    { name: "직무 요구", sub: "업무량·속도", score: 6, status: "보통", barColor: "bg-[#FFD166]", textColor: "text-[#D97706]" },
    { name: "직무 자율성", sub: "의사결정권", score: 7, status: "양호", barColor: "bg-[#6EE7B7]", textColor: "text-[#059669]" },
    { name: "조직 문화", sub: "지지·소통", score: 5, status: "보통", barColor: "bg-[#FFD166]", textColor: "text-[#D97706]" },
    { name: "보상 체계", sub: "급여·인정", score: 5, status: "보통", barColor: "bg-[#FFD166]", textColor: "text-[#D97706]" },
    { name: "관계 갈등", sub: "대인관계", score: 3, status: "양호", barColor: "bg-[#6EE7B7]", textColor: "text-[#059669]" },
    { name: "일-생활 균형", sub: "워라밸", score: 4, status: "양호", barColor: "bg-[#6EE7B7]", textColor: "text-[#059669]" },
    { name: "물리 환경", sub: "작업환경", score: 3, status: "양호", barColor: "bg-[#6EE7B7]", textColor: "text-[#059669]" },
    { name: "직업 안정성", sub: "고용안정", score: 4, status: "양호", barColor: "bg-[#6EE7B7]", textColor: "text-[#059669]" },
  ],
};

// 가장 많이 한 리추얼 상위 10개 더미 데이터셋 (순위 1~10)
const TOP_RITUALS_DATA = [
  { rank: 1, title: "미소 명상 리추얼", count: 18, db: 54 },
  { rank: 2, title: "마음일기 적기", count: 15, db: 45 },
  { rank: 3, title: "4-7-8 호흡법", count: 12, db: 36 },
  { rank: 4, title: "감사 일기 쓰기", count: 10, db: 30 },
  { rank: 5, title: "퇴근 길 바디스캔", count: 9, db: 27 },
  { rank: 6, title: "자기 자비 스트레칭", count: 8, db: 24 },
  { rank: 7, title: "수면을 위한 딥 슬립 음원", count: 7, db: 21 },
  { rank: 8, title: "부정적 생각 환기하기", count: 6, db: 18 },
  { rank: 9, title: "직무 스트레스 비우기 노트", count: 5, db: 15 },
  { rank: 10, title: "아침 3분 확언 차 한잔", count: 4, db: 12 },
];

/**
 * MyPageSheet: 전역 0ms App-Like Overlay 모달 전용 마이페이지 컴포넌트
 */
export function MyPageSheet() {
  const router = useRouter();
  const kossSectionRef = useRef<HTMLDivElement>(null);

  const {
    userName,
    setUserName,
    totalDumbbells,
    currentIntention,
    getLevelName,
    getLevelNumber,
    getNextLevelDiff,
  } = useMindGym();

  const { openModal, closeModal } = useModalStore();
  const { openPopup } = usePopupStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const expandedContentRef = useRef<HTMLDivElement>(null);

  // KOSS 스트레스 지도 상세 펼침/접힘 상태 (기본 false: 요약 카드만 노출)
  const [isKossExpanded, setIsKossExpanded] = useState<boolean>(false);

  // 가장 많이 한 리추얼 전체 펼침 상태 (기본 false: 최고 3건만 표출 / true: 10개 전체 표출)
  const [isRitualListExpanded, setIsRitualListExpanded] = useState<boolean>(false);

  // 버튼 클릭 시 펼쳐진 높이(expandedHeight)만큼 정확히 화면을 위로 밀어올려줌
  const handleToggleKossSection = () => {
    const nextExpanded = !isKossExpanded;
    setIsKossExpanded(nextExpanded);

    if (nextExpanded) {
      setTimeout(() => {
        // 펼쳐진 뷰 차트 영역의 실제 렌더링 높이 측정 (약 420px ~ 480px)
        const expandedHeight = expandedContentRef.current?.offsetHeight || 440;

        // 마이페이지 모달 스크롤 엘리먼트를 수색하여 펼쳐진 높이만큼 위로 상승 스크롤!
        const scrollParent =
          kossSectionRef.current?.closest(".overflow-y-auto") ||
          containerRef.current;

        if (scrollParent) {
          scrollParent.scrollBy({
            top: expandedHeight,
            behavior: "smooth",
          });
        }
      }, 180);
    }
  };

  // KOSS 진단 결과 시각화 방식 탭 상태 ("radar": 스파이더 지도 vs "bars": 막대 그래프 상세)
  const [kossChartTab, setKossChartTab] = useState<"radar" | "bars">("radar");

  // 월 선택 칩 상태 (기본 8월, 최대 2개 선택 비교)
  const [selectedMonths, setSelectedMonths] = useState<string[]>(["8월"]);

  const handleToggleMonth = (month: string) => {
    if (selectedMonths.includes(month)) {
      if (selectedMonths.length > 1) {
        setSelectedMonths(selectedMonths.filter((m) => m !== month));
      }
    } else {
      if (selectedMonths.length >= 2) {
        setSelectedMonths([selectedMonths[1], month]);
      } else {
        setSelectedMonths([...selectedMonths, month]);
      }
    }
  };

  // 내정보 X 닫기 터치 시 100% 대시보드(/dashboard)로 명확히 이동
  const handleCloseToDashboard = () => {
    closeModal();
    router.push("/dashboard");
  };

  // 3개 키워드 조합 문구가 아닐 경우 100% 3개 조합 더미 텍스트로 보정
  const displayIntention =
    currentIntention && currentIntention.includes("·")
      ? currentIntention
      : "활기차게 · 따뜻하게 · 성장하며";

  const levelNum = getLevelNumber();
  const levelName = getLevelName();
  const nextDiff = getNextLevelDiff();
  const nextTargetDumbbells = totalDumbbells + nextDiff;
  const progressPercent = Math.min(
    100,
    Math.round((totalDumbbells / nextTargetDumbbells) * 100)
  );

  // 닉네임 수정 공통 팝업 발동 (z-60)
  const handleEditNickname = () => {
    openPopup({
      title: "닉네임 수정",
      subtitle: "마인드짐에서 사용할 내 닉네임을 변경합니다.",
      initialValue: userName,
      placeholder: "닉네임 입력",
      onConfirm: (newVal: string) => {
        setUserName(newVal);
      },
    });
  };

  // 온보딩 3개 질문 공통 위저드 발동 (slide-left)
  const handleOpenIntentionSheet = () => {
    openModal({
      type: "slide-left",
      content: <MonthlyIntentionWizard />,
    });
  };

  return (
    <div ref={containerRef} className="w-full min-h-full bg-white flex flex-col select-none relative pb-12 text-gray-900 overflow-y-auto">
      {/* 1. 상단 공통 서브 헤더 (X 닫기 클릭 시 /dashboard로 이동 / 우측 상단 톱니바퀴 버튼 클릭 시 /settings 이동) */}
      <SubPageHeader
        title="내 정보 & 여정"
        leftType="close"
        onLeftClick={handleCloseToDashboard}
        rightAction={
          <button
            type="button"
            onClick={() => router.push("/settings")}
            className="p-1.5 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors active:scale-95 cursor-pointer"
            title="여정 알림 & 환경설정"
          >
            <Gear size={22} weight="bold" />
          </button>
        }
      />

      <div className="flex flex-col w-full px-5 pt-3 gap-6 text-left">
        {/* 2. 상단 프로필 & 지향점 카드 (Borderless Non-White 원칙 적용) */}
        <div className="w-full bg-[#F8FAFC] rounded-3xl p-5 flex flex-col gap-4 relative">
          <div className="flex items-center gap-4">
            {/* 이니셜 아바타 */}
            <div className="w-14 h-14 rounded-2xl bg-[#00C474] text-white font-extrabold text-2xl flex items-center justify-center shadow-sm shrink-0">
              {userName.slice(0, 1)}
            </div>

            <div className="flex flex-col flex-1">
              {/* 닉네임 + 연필 버튼 (공통 팝업 z-60 발동) */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleEditNickname}
                  className="flex items-center gap-1.5 group text-left cursor-pointer active:scale-95 transition-transform"
                  title="닉네임 수정하기"
                >
                  <span className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-[#00C474] transition-colors">
                    {userName}
                  </span>
                  <PencilSimple
                    size={16}
                    weight="bold"
                    className="text-gray-400 group-hover:text-[#00C474] transition-colors"
                  />
                </button>
              </div>

              {/* 3단계 키워드 선택 문구 + 연필 버튼 (이달의 나 라벨 삭제로 줄바꿈 방지) */}
              <div className="mt-1 flex items-center gap-1.5 text-gray-600">
                <button
                  type="button"
                  onClick={handleOpenIntentionSheet}
                  className="flex items-center gap-1 txt-caption-main text-gray-600 hover:text-gray-900 group cursor-pointer active:scale-95 transition-transform text-left flex-wrap"
                  title="이달의 나 3단계 지향점 선택하기"
                >
                  <span className="font-bold text-[#00C474] underline decoration-emerald-300 underline-offset-4 group-hover:text-[#00C474] transition-colors">
                    "{displayIntention}"
                  </span>
                  <span className="font-bold text-gray-900 ml-0.5 shrink-0">8월</span>
                  <PencilSimple
                    size={15}
                    weight="bold"
                    className="text-gray-400 group-hover:text-[#00C474] transition-colors ml-0.5 shrink-0"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>



        {/* 4. 이번 달 마음 단련 3대 출석 스탯 (클릭 시 오른쪽에서 왼쪽으로 slide-left 모달 열림) */}
        <div
          onClick={() => {
            openModal({
              type: "slide-left",
              content: <CalendarSheet />,
            });
          }}
          className="w-full flex flex-col gap-3 cursor-pointer group"
          title="전체 월간 출석 달력 보기 (오른쪽에서 왼쪽으로 스르륵)"
        >
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[0.9375rem] font-bold text-gray-900 tracking-tight group-hover:text-[#00C474] transition-colors">
              월간 마음 단련 출석
            </h2>
            <span className="txt-micro-main font-medium text-gray-400 group-hover:text-[#00C474] transition-colors">
              8월 달력 보기 ❯
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {/* 1. 연속 출석 (1:1 정사각형 aspect-square) */}
            <div className="bg-[#F0FDF4] rounded-2xl aspect-square p-2.5 flex flex-col items-center justify-center text-center shadow-2xs">
              <span className="text-[12px] font-extrabold text-emerald-800 mb-0.5">
                연속 출석
              </span>
              <span className="text-xl font-black text-[#00C474] tabular-nums mt-0.5">
                7일째
              </span>
            </div>

            {/* 2. 이번 달 실천 (1:1 정사각형 aspect-square) */}
            <div className="bg-[#F8FAFC] rounded-2xl aspect-square p-2.5 flex flex-col items-center justify-center text-center shadow-2xs">
              <span className="text-[12px] font-extrabold text-gray-600 mb-0.5">
                이번 달 실천
              </span>
              <span className="text-xl font-black text-gray-900 tabular-nums mt-0.5">
                14일
              </span>
            </div>

            {/* 3. 누적 출석 (1:1 정사각형 aspect-square) */}
            <div className="bg-[#F8FAFC] rounded-2xl aspect-square p-2.5 flex flex-col items-center justify-center text-center shadow-2xs">
              <span className="text-[12px] font-extrabold text-gray-600 mb-0.5">
                누적 출석
              </span>
              <span className="text-xl font-black text-gray-900 tabular-nums mt-0.5">
                28일
              </span>
            </div>
          </div>
        </div>

        {/* 4-2. 온보딩 KOSS 직무 스트레스 진단 (기본: 집중케어 카드만 표출 / 펼침 시: 종합지도 & 영역별 분석) */}
        <div ref={kossSectionRef} className="w-full flex flex-col gap-3 pt-1 scroll-mt-36">
          <div className="flex items-center justify-between px-1">
            <div className="flex flex-col">
              <h2 className="text-[0.9375rem] font-bold text-gray-900 tracking-tight">
                KOSS 마음 건강 스트레스 지도
              </h2>
              <span className="text-[11px] font-medium text-gray-400 mt-0.5">
                2026.08.12 진단 완료 (KOSS 36문항)
              </span>
            </div>
            <Badge variant="mint" size="md">
              진단 완료
            </Badge>
          </div>

          {/* 1. 기본 뷰: 직무 요구도 · 집중 케어 필요 영역 요약 카드 */}
          <div className="w-full relative overflow-hidden bg-amber-50/90 rounded-2xl p-4 text-left flex flex-col gap-1.5 shadow-2xs">
            <div className="absolute -right-3 -bottom-3 text-amber-500/20 pointer-events-none select-none z-0">
              <Warning size={110} weight="bold" />
            </div>

            <div className="relative z-10 flex justify-between items-center">
              <span className="text-[11px] font-extrabold text-amber-800 bg-amber-100/90 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                집중 케어 필요 영역
              </span>
            </div>

            <div className="relative z-10">
              <h3 className="text-base font-extrabold text-gray-900 tracking-tight mt-0.5">
                직무 요구도 · 8점
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mt-1 font-medium">
                업무량과 속도 관련 스트레스가 높아요. 맞춤 리추얼로 케어받으실 수 있습니다.
              </p>
            </div>
          </div>

          {/* 2. 상세 스트레스 지도 블록 버튼 (클릭 시 화면 위로 올려주기 스무스 스크롤) */}
          <button
            type="button"
            onClick={handleToggleKossSection}
            className="w-full block py-3 px-4 bg-[#F1F5F9] hover:bg-gray-200/90 rounded-2xl text-[14px] font-bold text-gray-800 transition-all text-center cursor-pointer active:scale-98 shadow-2xs"
          >
            <div className="flex items-center justify-center gap-1.5 w-full">
              <span>상세 스트레스 지도</span>
              {isKossExpanded ? <CaretUp size={16} weight="bold" /> : <CaretDown size={16} weight="bold" />}
            </div>
          </button>

          {/* 3. 펼침 뷰: 종합 지도 & 영역별 분석 차트 (AnimatePresence 슬라이딩 모션) */}
          <AnimatePresence>
            {isKossExpanded && (
              <motion.div
                ref={expandedContentRef}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full flex flex-col gap-3 overflow-hidden pt-1"
              >
                {/* 전역 공통 SegmentedTab 슬라이딩 모션 스위처 연동 */}
                <SegmentedTab
                  activeId={kossChartTab}
                  onChange={(id) => setKossChartTab(id as "radar" | "bars")}
                  items={[
                    { id: "radar", label: "종합 지도" },
                    { id: "bars", label: "영역별 분석" },
                  ]}
                  layoutId="koss-mypage-tab-active"
                />

                {/* 직무 분석 월 선택 칩 필터 ('선택' 라벨 14px + 칩 폰트 14.5px 크게 표출) */}
                <div className="w-full bg-[#F8FAFC] rounded-2xl p-2.5 flex items-center justify-between gap-2.5 shadow-2xs">
                  <span className="text-[14px] font-bold text-gray-900 pl-1 shrink-0">
                    선택
                  </span>
                  <div className="flex items-center gap-1.5 flex-1">
                    {["7월", "8월", "9월"].map((m) => {
                      const isSelected = selectedMonths.includes(m);
                      return (
                        <button
                          key={m}
                          type="button"
                          onClick={() => handleToggleMonth(m)}
                          className={`flex-1 py-1.5 px-2.5 rounded-xl text-[14.5px] font-[300] transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1 ${
                            isSelected
                              ? "bg-[#00C474] text-white shadow-xs font-medium"
                              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-100"
                          }`}
                        >
                          <span>{m}</span>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 탭 1: 스파이더 종합 지도 (하나의 차트에 겹쳐서 오버레이 표출!) */}
                {kossChartTab === "radar" && (
                  <div className="w-full flex flex-col gap-2.5 items-center text-left relative">
                    {/* 2개 선택 시 오버레이 범례 (Legend) */}
                    {selectedMonths.length === 2 && (
                      <div className="w-full flex items-center justify-center gap-4 text-xs font-bold pt-1">
                        <span className="flex items-center gap-1.5 text-gray-800">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#00C474]" />
                          {selectedMonths[0]} ({RADAR_MONTHLY_VALUES[selectedMonths[0]]?.label})
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-700">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1]" />
                          {selectedMonths[1]} ({RADAR_MONTHLY_VALUES[selectedMonths[1]]?.label})
                        </span>
                      </div>
                    )}

                    <div className="w-full flex justify-center items-center py-1 overflow-visible">
                      <BklitRadarChart
                        metrics={[
                          { key: "demand", label: "직무요구" },
                          { key: "autonomy", label: "자율성" },
                          { key: "culture", label: "조직문화" },
                          { key: "reward", label: "보상부적절" },
                          { key: "relation", label: "관계갈등" },
                          { key: "wlb", label: "직업불안정" },
                          { key: "environment", label: "물리환경" },
                          { key: "stability", label: "조직체계" },
                        ]}
                        data={selectedMonths.map((m, idx) => ({
                          label: m,
                          color: idx === 0 ? "#00C474" : "#6366F1",
                          values: RADAR_MONTHLY_VALUES[m]?.values || RADAR_MONTHLY_VALUES["8월"].values,
                        }))}
                        size={330}
                        levels={5}
                      />
                    </div>
                  </div>
                )}

                {/* 탭 2: KOSS 8대 영역별 진단 결과 막대 그래프 */}
                {kossChartTab === "bars" && (
                  <div className="w-full flex flex-col gap-3">
                    {/* 막대 차트 표출 (1개 선택 시 단일 막대 바 / 2개 선택 시 듀얼 멀티 비교 바) */}
                    {selectedMonths.length === 2 ? (
                      <BklitBarChart
                        compareMode={true}
                        comparisonItems={MONTHLY_KOSS_DATA[selectedMonths[0]].map((d1, i) => {
                          const d2 = MONTHLY_KOSS_DATA[selectedMonths[1]][i];
                          const diff = d1.score - d2.score;
                          const isImproved = diff <= 0;
                          const diffText = diff === 0 ? "동일" : diff < 0 ? `${Math.abs(diff)}점 감소 (개선)` : `${diff}점 증가`;

                          return {
                            name: d1.name,
                            sub: d1.sub,
                            month1Label: selectedMonths[0],
                            month1Score: d1.score,
                            month1Color: d1.barColor,
                            month1Status: d1.status,
                            month2Label: selectedMonths[1],
                            month2Score: d2.score,
                            month2Color: "bg-[#6366F1]",
                            month2Status: d2.status,
                            diffText,
                            isImproved,
                          };
                        })}
                      />
                    ) : (
                      <BklitBarChart domains={MONTHLY_KOSS_DATA[selectedMonths[0]] || MONTHLY_KOSS_DATA["8월"]} />
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 5. 가장 많이 한 리추얼 (기본: 최고 3건 / 클릭 시: 10개 전체 펼침) */}
        <div className="w-full flex flex-col gap-3 pt-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[0.9375rem] font-bold text-gray-900 tracking-tight">
              가장 많이 한 리추얼
            </h2>
            <button
              type="button"
              onClick={() => setIsRitualListExpanded(!isRitualListExpanded)}
              className="flex items-center gap-1 text-[12.5px] font-bold text-[#00C474] hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-full cursor-pointer active:scale-95 transition-all shadow-2xs"
              title={isRitualListExpanded ? "접기" : "전체 10개 리추얼 보기"}
            >
              <span>{isRitualListExpanded ? "접기 ▴" : "최고 3건 ▾"}</span>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {(isRitualListExpanded ? TOP_RITUALS_DATA : TOP_RITUALS_DATA.slice(0, 3)).map((r) => (
              <div
                key={r.rank}
                className="w-full bg-[#F8FAFC] rounded-2xl p-3.5 flex items-center justify-between shadow-2xs hover:bg-slate-100/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0 ${
                      r.rank <= 3
                        ? "bg-[#00C474] text-white shadow-xs"
                        : "bg-gray-200 text-gray-700 font-bold"
                    }`}
                  >
                    {r.rank}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-gray-900">
                      {r.title}
                    </span>
                    <span className="text-[11.5px] font-medium text-gray-500 mt-0.5">
                      총 {r.count}회 완료 · +{r.db} DB 적립
                    </span>
                  </div>
                </div>
                <CheckCircle size={20} weight="fill" className="text-[#00C474] shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
