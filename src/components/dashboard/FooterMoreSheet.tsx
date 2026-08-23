"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Reorder } from "framer-motion";
import { DotsSixVertical, CaretRight, Star } from "@phosphor-icons/react";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { useModalStore } from "@/store/useModalStore";
import { CommonRitualSheet } from "@/components/dashboard/CommonRitualSheet";
import { LockedOverlay } from "@/components/ui/LockedOverlay";
import { getIconPath } from "@/utils/iconMap";

export interface RitualData {
  id: string;
  title: string;
  category: string;
  time: string;
  level: string;
  duration: string;
  reward: string;
  iconNum: number;
  desc: string;
  isLocked?: boolean;
  isPinned?: boolean;
}

// 6개 카테고리 정의 (디자인 가이드 스펙과 100% 동일)
const RITUAL_FILTER_CATEGORIES = [
  { id: "ALL", name: "전체", bg: "#0F172A", text: "#FFFFFF" },
  { id: "스트레스 비우기", name: "스트레스 비우기", bg: "#ECFDF5", text: "#047857", activeBg: "#10B981", activeText: "#FFFFFF" },
  { id: "휴식과 충전", name: "휴식과 충전", bg: "#FFF1F2", text: "#BE123C", activeBg: "#F43F5E", activeText: "#FFFFFF" },
  { id: "자기자비 명상", name: "자기자비 명상", bg: "#EEF2FF", text: "#4338CA", activeBg: "#6366F1", activeText: "#FFFFFF" },
  { id: "감정 정돈", name: "감정 정돈", bg: "#F3E8FF", text: "#6B21A8", activeBg: "#A855F7", activeText: "#FFFFFF" },
  { id: "몰입과 집중", name: "몰입과 집중", bg: "#FFFBEB", text: "#B45309", activeBg: "#F59E0B", activeText: "#FFFFFF" },
  { id: "관계와 경계", name: "관계와 경계", bg: "#F0FDFA", text: "#0F766E", activeBg: "#14B8A6", activeText: "#FFFFFF" },
];

const RITUAL_CATEGORIES = [
  "스트레스 비우기",
  "휴식과 충전",
  "자기자비 명상",
  "감정 정돈",
  "몰입과 집중",
  "관계와 경계",
];

// 카테고리별 고유한 리추얼 타이틀 명칭 샘플 데이터베이스
const SAMPLE_RITUAL_NAMES_BY_CAT: Record<string, string[]> = {
  "스트레스 비우기": [
    "횡경막 이완 호흡",
    "긴장 이완 스트레칭",
    "맨발 소리 산책",
    "어깨 다독임 호흡",
    "마음 소용돌이 비우기",
    "버리는 일기 쓰기",
  ],
  "휴식과 충전": [
    "미소 수면 명상",
    "전신 바디스캔",
    "따뜻한 온기 감싸기",
    "자연 빗소리 이완",
    "눈동자 휴식 세션",
    "달빛 수면 가이드",
  ],
  "자기자비 명상": [
    "333 나비포옹",
    "나에게 전하는 다정한 문장",
    "스스로 어깨 다독이기",
    "실수 용서하기",
    "내 안의 아이 안아주기",
    "자기자비 호흡법",
  ],
  "감정 정돈": [
    "마음온도 시각화 일기",
    "솔직한 분노 수용 노트",
    "감정 단어 이름 붙이기",
    "생각 구름 흘려보내기",
    "오늘의 마음 쉼표 기록",
    "감정 정리 3분 체크",
  ],
  "몰입과 집중": [
    "1분 시선 고정 명상",
    "3-2-1 그라운딩 센스",
    "몰입을 부르는 파도소리",
    "숨 고르기 뽀모도로",
    "하나에 집중하는 촛불 관찰",
    "생각의 잡음 끄기",
  ],
  "관계와 경계": [
    "셀프 QnA 인터뷰",
    "타인과의 건강한 거리두기",
    "친절 온기 수집함",
    "거절의 용기 연습",
    "따뜻한 시선 되돌려주기",
    "소중한 사람과의 마음 경계",
  ],
};

const GENERATED_72_RITUALS: RitualData[] = Array.from({ length: 72 }, (_, i) => {
  const num = i + 1;
  const cat = RITUAL_CATEGORIES[i % RITUAL_CATEGORIES.length];
  const namesList = SAMPLE_RITUAL_NAMES_BY_CAT[cat] || ["마음 쉼표 명상"];
  const ritualName = namesList[Math.floor(i / RITUAL_CATEGORIES.length) % namesList.length];
  const isLocked = num % 6 === 0;

  return {
    id: `RT-${String(num).padStart(3, "0")}`,
    title: ritualName,
    category: cat,
    time: `${(i % 5) + 3}분`,
    level: i % 2 === 0 ? "초급" : "중급",
    duration: i % 3 === 0 ? "매일" : "한달",
    reward: `+${((i % 4) + 1) * 10}`,
    iconNum: num,
    isLocked,
    desc: isLocked
      ? "다음 주 공개 예정인 신규 마음건강 리추얼 세션입니다."
      : `일상의 분주함을 멈추고 ${cat}의 감각을 깊이 있게 깨워주는 ${ritualName} 세션입니다.`,
  };
});

// 12개 찜한 리추얼 샘플 목록 (1번 인덱스는 고정된 이달의 월간 리추얼)
const INITIAL_12_SAVED_RITUALS: RitualData[] = [
  { id: "RT-001", title: "미소 명상", category: "휴식과 충전", time: "3분", level: "중급", duration: "한달", reward: "+30", iconNum: 1, desc: "입가에 옅은 미소를 지으며 얼굴 근육의 긴장을 푸는 미소 명상입니다.", isPinned: true },
  { id: "RT-012", title: "마음일기", category: "감정 정돈", time: "5분", level: "중급", duration: "한달", reward: "+30", iconNum: 12, desc: "세상의 비난 속에서도 나만의 다정한 변호인이 되어 일기를 씁니다.", isPinned: false },
  { id: "RT-004", title: "횡경막 호흡", category: "스트레스 비우기", time: "1분", level: "초급", duration: "매일", reward: "+10", iconNum: 4, desc: "아랫배 깊숙이 들이마시고 내쉬는 호흡 감각에 집중해 심박수를 낮춥니다.", isPinned: false },
  { id: "RT-010", title: "333 나비포옹", category: "자기자비 명상", time: "1분", level: "초급", duration: "매일", reward: "+15", iconNum: 10, desc: "양팔을 교차해 스스로 양어깨를 번갈아 다독이며 불안 요소를 잠재웁니다.", isPinned: false },
  { id: "RT-003", title: "시선고정 명상", category: "몰입과 집중", time: "1분", level: "초급", duration: "매일", reward: "+10", iconNum: 3, desc: "사물 하나에 1분간 시선을 고정하는 명상입니다.", isPinned: false },
  { id: "RT-024", title: "마음선물", category: "감정 정돈", time: "1분", level: "초급", duration: "매일", reward: "+10", iconNum: 24, desc: "오늘 내 마음의 온도를 시각화해서 기록합니다.", isPinned: false },
  { id: "RT-028", title: "분노일기", category: "감정 정돈", time: "3분", level: "중급", duration: "한달", reward: "+20", iconNum: 28, desc: "솔직한 분노 후 감정을 수용하는 일기를 씁니다.", isPinned: false },
  { id: "RT-037", title: "셀프 QnA", category: "관계와 경계", time: "3분", level: "중급", duration: "한달", reward: "+20", iconNum: 37, desc: "나에게 번갈아 묻고 답하는 인터뷰를 진행합니다.", isPinned: false },
  { id: "RT-046", title: "바디스캔", category: "휴식과 충전", time: "5분", level: "중급", duration: "한달", reward: "+30", iconNum: 46, desc: "머리부터 발끝까지 감각을 관찰하는 이완 세션입니다.", isPinned: false },
  { id: "RT-050", title: "맨발산책", category: "스트레스 비우기", time: "5분", level: "중급", duration: "한달", reward: "+30", iconNum: 50, desc: "아무것도 들지 않고 발바닥을 느끼며 걷습니다.", isPinned: false },
  { id: "RT-061", title: "친절수집함", category: "관계와 경계", time: "2분", level: "초급", duration: "매일", reward: "+15", iconNum: 61, desc: "오늘 타인에게 받은 온기를 수집하는 함입니다.", isPinned: false },
  { id: "RT-071", title: "3-2-1 그라운딩", category: "몰입과 집중", time: "2분", level: "초급", duration: "매일", reward: "+15", iconNum: 71, desc: "보이는 것 3개, 들리는 것 2개, 맛 1개를 기록합니다.", isPinned: false },
];

/**
 * FooterMoreSheet: "내가 찜한 리추얼" 소제목 좌측에 Icon Buttons & Small Action Chips 2번째 아이콘 버튼 적용
 */
export function FooterMoreSheet() {
  const { clearModals, openModal } = useModalStore();

  const handleCloseAll = () => {
    clearModals();
  };

  // 12개 찜한 리추얼 목록 상태
  const [savedRituals, setSavedRituals] = useState<RitualData[]>(INITIAL_12_SAVED_RITUALS);

  // 하단 전체 리추얼 카테고리 필터 상태
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  // 카테고리 바 PC 마우스 드래그 스크롤 (Drag to Scroll) 상태 및 핸들러
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleCategoryMouseDown = (e: React.MouseEvent) => {
    isMouseDownRef.current = true;
    if (categoryScrollRef.current) {
      startXRef.current = e.pageX - categoryScrollRef.current.offsetLeft;
      scrollLeftRef.current = categoryScrollRef.current.scrollLeft;
    }
  };

  const handleCategoryMouseLeaveOrUp = () => {
    isMouseDownRef.current = false;
  };

  const handleCategoryMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current || !categoryScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - categoryScrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    categoryScrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  // 필터링된 전체 리추얼 목록
  const filtered72Rituals = activeCategory === "ALL"
    ? GENERATED_72_RITUALS
    : GENERATED_72_RITUALS.filter((r) => r.category === activeCategory);

  // 1번 항목 (월간 고정) 과 2~12번 항목 분리
  const pinnedRitual = savedRituals[0];
  const reorderableRituals = savedRituals.slice(1);

  const handleReorder = (newOrder: RitualData[]) => {
    if (pinnedRitual) {
      setSavedRituals([pinnedRitual, ...newOrder]);
    } else {
      setSavedRituals(newOrder);
    }
  };

  const toggleBookmark = (r: RitualData) => {
    const isAlreadySaved = savedRituals.some((item) => item.id === r.id);
    if (isAlreadySaved) {
      if (r.id === "RT-001") return; // 1번 이달의 대표 리추얼은 찜 취소 불가
      setSavedRituals(savedRituals.filter((item) => item.id !== r.id));
    } else {
      setSavedRituals([...savedRituals, { ...r, isPinned: false }]);
    }
  };

  const handleOpenRitual = (r: { id: string; title: string; category: string; time: string; desc: string }) => {
    openModal({
      type: "slide-left",
      content: (
        <CommonRitualSheet
          ritualId={r.id}
          ritualTitle={r.title}
          ritualCategory={r.category}
          ritualTime={r.time}
          description={r.desc}
        />
      ),
    });
  };

  return (
    <div className="w-full bg-white flex flex-col select-none relative text-gray-900 min-h-full pb-16 overflow-y-auto">
      {/* 상단 헤더 (X 닫기 버튼 누르면 이전 더보기 포함 전체 접힘) */}
      <SubPageHeader
        title="리추얼 모아보기"
        leftType="close"
        onLeftClick={handleCloseAll}
      />

      <div className="flex flex-col w-full px-5 pt-3 gap-6 text-left max-w-lg mx-auto flex-1">
        {/* ================= SECTION 1: 상단 - 내가 찜한 리추얼 (Icon Buttons & Small Action Chips 2번째 아이콘 버튼 적용) ================= */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              {/* DESIGN GUIDE 3. Icon Buttons & Small Action Chips 의 2번째 아이콘 버튼 (그린 배경 + 흰색 별) 적용 */}
              <div className="w-6 h-6 rounded-lg bg-[#00C474] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Star size={13} weight="fill" />
              </div>
              <h2 className="text-[0.9375rem] font-bold text-gray-900 tracking-tight">
                내가 찜한 리추얼
              </h2>
            </div>
            <span className="text-xs font-bold text-gray-400 font-mono">
              {savedRituals.length}
            </span>
          </div>

          {/* 1차원 TYPE 3 리스트 구조 */}
          <div className="flex flex-col gap-2 w-full">
            {/* 1. 상단 1번 핀 고정 항목 */}
            {pinnedRitual && (
              <div className="relative py-2.5 px-3.5 rounded-2xl bg-[#F9FAFB] flex items-center gap-3 border border-amber-200/80 shadow-2xs">
                {/* 최좌측 수정 불가 회색 별 아이콘 */}
                <div
                  title="이달의 대표 월간 고정 리추얼 (해제 불가)"
                  className="p-0.5 rounded-lg text-gray-300 cursor-not-allowed shrink-0"
                >
                  <Star size={17} weight="fill" className="text-gray-300" />
                </div>

                {/* PNG 아이콘 */}
                <div className="relative w-9 h-9 shrink-0 pointer-events-none">
                  <Image
                    src={getIconPath(pinnedRitual.iconNum)}
                    alt={pinnedRitual.title}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* 중앙 정보 */}
                <div className="flex-1 min-w-0 text-left flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900 truncate tracking-tight">
                    {pinnedRitual.title}
                  </h3>
                  <span className="inline-flex items-center justify-center text-[9.5px] font-bold px-2 py-1 rounded-full shrink-0 text-emerald-700 bg-emerald-100/70 leading-none">
                    {pinnedRitual.time}
                  </span>
                  <span className="inline-flex items-center justify-center px-1.5 py-1 rounded-md bg-[#00C474] text-white text-[10px] font-bold shrink-0 shadow-2xs leading-none">
                    월간추천
                  </span>
                </div>
              </div>
            )}

            {/* 2. Framer Motion Reorder.Group 기반 2~12번 1차원 Reorder List */}
            <Reorder.Group
              axis="y"
              values={reorderableRituals}
              onReorder={handleReorder}
              className="flex flex-col gap-2 w-full"
            >
              {reorderableRituals.map((r) => (
                <Reorder.Item
                  key={r.id}
                  value={r}
                  whileDrag={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.08)", zIndex: 30 }}
                  className="relative py-2.5 px-3.5 rounded-2xl bg-[#F9FAFB] flex items-center gap-3 transition-colors group select-none cursor-default"
                >
                  {/* 노란색 찜 취소 버튼 */}
                  <button
                    type="button"
                    onClick={() => toggleBookmark(r)}
                    title="찜 취소"
                    className="p-0.5 rounded-lg text-amber-400 hover:text-gray-400 active:scale-90 transition-all cursor-pointer shrink-0 outline-none"
                  >
                    <Star size={17} weight="fill" className="text-amber-400 drop-shadow-2xs" />
                  </button>

                  {/* PNG 아이콘 */}
                  <div className="relative w-9 h-9 shrink-0 pointer-events-none">
                    <Image
                      src={getIconPath(r.iconNum)}
                      alt={r.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* 중앙 정보 */}
                  <div className="flex-1 min-w-0 text-left flex items-center gap-2 pointer-events-none">
                    <h3 className="text-sm font-bold text-slate-900 truncate tracking-tight">
                      {r.title}
                    </h3>
                    <span className="inline-flex items-center justify-center text-[9.5px] font-bold px-2 py-1 rounded-full shrink-0 text-emerald-700 bg-emerald-100/70 leading-none">
                      {r.time}
                    </span>
                  </div>

                  {/* 오른쪽 드래그 핸들 아이콘 */}
                  <div className="p-0.5 text-gray-300 hover:text-gray-600 cursor-grab active:cursor-grabbing shrink-0 touch-none">
                    <DotsSixVertical size={18} weight="bold" />
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        </div>

        {/* 2단 구역 경계 구분을 위한 공간 여백 */}
        <div className="w-full my-1" />

        {/* ================= SECTION 2: 하단 - 전체 72가지 리추얼 (5. RitualCard 4개 정사각형 칩) ================= */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 text-left">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <h2 className="text-[0.9375rem] font-bold text-gray-900 tracking-tight">
                  전체 마음건강 리추얼
                </h2>
              </div>
              <span className="text-xs font-bold text-gray-400 font-mono">
                {filtered72Rituals.length} / 72
              </span>
            </div>
            <p className="text-xs font-semibold text-gray-500 pt-0.5">
              작은 쉼표 하나로 시작하는 나만을 위한 마음건강 루틴입니다.
            </p>
          </div>

          {/* 가로 스크롤 카테고리 필터 버튼 목록 (PC 마우스 드래그 스크롤 + 모바일 터치 스와이프 지원) */}
          <div
            ref={categoryScrollRef}
            onMouseDown={handleCategoryMouseDown}
            onMouseLeave={handleCategoryMouseLeaveOrUp}
            onMouseUp={handleCategoryMouseLeaveOrUp}
            onMouseMove={handleCategoryMouseMove}
            className="-mx-5 px-5 flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs select-none cursor-grab active:cursor-grabbing"
          >
            {RITUAL_FILTER_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: isActive ? (cat.activeText || "#FFFFFF") : cat.text,
                    backgroundColor: isActive ? (cat.activeBg || cat.bg) : cat.bg,
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.15s ease-in-out",
                    transform: isActive ? "scale(1.02)" : "scale(1)",
                  }}
                  className="shrink-0 hover:opacity-90 active:scale-95 shadow-2xs"
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* TYPE 3 배너 리스트 카드 목록 */}
          <div className="flex flex-col gap-3 pt-1 pb-8">
            {filtered72Rituals.map((r) => {
              const isLocked = r.isLocked;
              const isBookmarked = savedRituals.some((item) => item.id === r.id);

              return (
                <div
                  key={r.id}
                  className={`relative p-3 rounded-2xl flex items-center gap-3 transition-all group overflow-hidden ${
                    isLocked
                      ? "bg-[#F9FAFB]/90 opacity-90 cursor-not-allowed"
                      : "bg-[#F9FAFB]"
                  }`}
                >
                  {/* 정중앙 공통 잠금 오버레이 */}
                  {isLocked && <LockedOverlay iconSize={20} roundedClass="rounded-2xl" />}

                  {/* 가장 왼쪽 즐겨찾기(찜하기) 버튼 */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(r);
                    }}
                    title={isBookmarked ? "찜 취소" : "내가 찜한 리추얼에 추가"}
                    className="p-1 rounded-lg text-gray-300 hover:text-amber-400 active:scale-90 transition-all cursor-pointer shrink-0 outline-none z-10"
                  >
                    <Star
                      size={18}
                      weight={isBookmarked ? "fill" : "regular"}
                      className={isBookmarked ? "text-amber-400 drop-shadow-2xs" : "text-gray-300 hover:text-amber-400"}
                    />
                  </button>

                  {/* 왼쪽 순수 PNG 아이콘 */}
                  <div className="relative w-12 h-12 shrink-0">
                    <Image
                      src={getIconPath(r.iconNum)}
                      alt={r.title}
                      fill
                      className={`object-contain ${isLocked ? "opacity-60 grayscale-[20%]" : ""}`}
                    />
                  </div>

                  {/* 중앙 정보 */}
                  <div className="flex-1 min-w-0 text-left flex flex-col gap-1.5">
                    <h3 className="text-sm font-bold text-slate-900 truncate tracking-tight">
                      {r.title}
                    </h3>
                    <div className="flex items-center justify-start gap-1.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-amber-100/90 text-center shadow-2xs shrink-0">
                        <span className="text-xs font-bold text-gray-900">{r.time}</span>
                      </div>
                      {!isLocked && (
                        <>
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-purple-100/90 text-center shrink-0">
                            <span className="text-xs font-bold text-gray-900">{r.level}</span>
                          </div>
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-sky-100/90 text-center shrink-0">
                            <span className="text-xs font-bold text-gray-900">{r.duration}</span>
                          </div>
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-rose-200/90 text-center shadow-xs shrink-0">
                            <span className="text-xs font-bold text-gray-900">{r.reward}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* 오른쪽 잠시 멈춤 화살표 실행 버튼 (화살표 영역만 독립 클릭 트리거) */}
                  {!isLocked && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenRitual(r);
                      }}
                      title={`${r.title} 리추얼 시작하기`}
                      className="p-2 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-100/60 active:scale-95 transition-all cursor-pointer shrink-0 outline-none"
                    >
                      <CaretRight size={20} weight="bold" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
