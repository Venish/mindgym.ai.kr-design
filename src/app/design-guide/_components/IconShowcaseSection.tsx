"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, CaretRight } from "@phosphor-icons/react";
import { LockedOverlay } from "@/components/ui/LockedOverlay";
import { getIconPath } from "@/utils/iconMap";

interface IconItem {
  id: string;
  name: string;
  iconNum: number;
  category: string;
  tag: string;
  level: string;
  duration: string;
  reward: string;
  desc: string;
  isLocked?: boolean;
}

const RITUAL_ICONS: IconItem[] = [
  { id: "1", name: "미소 명상", iconNum: 1, category: "휴식과 충전", tag: "3분", level: "중급", duration: "한달", reward: "+30", desc: "입가에 옅은 미소를 지으며 얼굴 근육의 긴장을 푸는 수면 이완 명상" },
  { id: "2", name: "30초 아침 호흡", iconNum: 2, category: "휴식과 충전", tag: "30초", level: "초급", duration: "매일", reward: "+10", desc: "아침 일찍 맑은 공기를 들이마시며 명확한 하루 방향을 세우는 아침 세션" },
  { id: "3", name: "1분 시선 고정 명상", iconNum: 3, category: "몰입과 집중", tag: "1분", level: "초급", duration: "매일", reward: "+10", desc: "단 하나의 사물에 시선을 고정해 흩어진 마음의 주의를 묶어주는 몰입 명상" },
  { id: "4", name: "횡경막 이완 호흡", iconNum: 4, category: "스트레스 비우기", tag: "1분", level: "초급", duration: "매일", reward: "+10", desc: "아랫배 깊숙이 들이마시고 내쉬는 호흡 감각에 집중해 심박수를 낮추는 호흡법" },
  { id: "5", name: "신체 스캔 명상", iconNum: 5, category: "휴식과 충전", tag: "5분", level: "중급", duration: "한달", reward: "+30", desc: "정수리부터 발가락 끝까지 순차적으로 감각을 관찰하며 이완하는 세션" },
  { id: "6", name: "공개 예정 신규 세션", iconNum: 6, category: "스트레스 비우기", tag: "오픈 예정", level: "미정", duration: "미정", reward: "+0", desc: "다음 주 공개 예정인 신규 마음건강 리추얼 세션입니다.", isLocked: true },
];

/**
 * TYPE 2 전용: 3D 리추얼 카드 (4가지 보더/배경 옵션 1, 2, 3, 4 완벽 시각화 복구 컴포넌트)
 */
function RitualIcon3DCard({
  title,
  badgeText,
  iconSrc,
  borderOption = "1",
  showOptionBadge = true,
  isLocked,
  item,
}: {
  title: string;
  badgeText: string;
  categoryName?: string;
  iconSrc: string;
  borderOption?: "1" | "2" | "3" | "4";
  showOptionBadge?: boolean;
  isLocked?: boolean;
  item?: IconItem;
}) {
  const getContainerStyle = () => {
    switch (borderOption) {
      case "1":
        return "bg-[#F9FAFB] border-0 shadow-2xs"; // Option 1: 무경계
      case "2":
        return "bg-white border border-gray-100/90 shadow-2xs"; // Option 2: 1px 헤어라인 테두리
      case "3":
        return "bg-[var(--color-pastel-mint-bg)] border-0 shadow-2xs"; // Option 3: 파스텔 틴트 무경계
      case "4":
        return "bg-white border border-gray-100 shadow-2xs"; // Option 4: 카테고리 뱃지 포함
    }
  };

  const getOptionBadgeLabel = () => {
    switch (borderOption) {
      case "1":
        return "Option 1 (무경계)";
      case "2":
        return "Option 2 (헤어라인)";
      case "3":
        return "Option 3 (파스텔 틴트)";
      case "4":
        return "Option 4 (카테고리 뱃지)";
    }
  };

  return (
    <div
      className={`relative p-4 rounded-2xl flex flex-col items-center text-center justify-between gap-3 transition-all group overflow-hidden ${getContainerStyle()}`}
    >
      {isLocked && <LockedOverlay iconSize={20} roundedClass="rounded-2xl" />}

      {showOptionBadge && (
        <span className="text-[10px] font-extrabold text-gray-500 bg-gray-100/90 px-2 py-0.5 rounded-md">
          {getOptionBadgeLabel()}
        </span>
      )}

      {/* 3D PNG 아이콘 */}
      <div className="relative w-13 h-13 shrink-0 transition-transform group-hover:scale-105 my-0.5">
        <Image src={iconSrc} alt={title} fill className="object-contain" />
      </div>

      {/* 타이틀 및 4개 파스텔 정사각형 칩 */}
      <div className="flex flex-col items-center gap-1.5 w-full">
        <h4 className="text-[14px] font-bold text-slate-900 truncate w-full tracking-tight">
          {title}
        </h4>

        {/* 화이트 테마 4개 파스텔 정사각형 칩 */}
        <div className="flex items-center justify-center gap-1.5 pt-0.5">
          <div className="w-7 h-7 rounded-lg bg-amber-100/90 flex items-center justify-center shrink-0">
            <span className="text-[11px] font-bold text-gray-900">{item?.tag || badgeText}</span>
          </div>
          {!isLocked && (
            <>
              <div className="w-7 h-7 rounded-lg bg-purple-100/90 flex items-center justify-center shrink-0">
                <span className="text-[11px] font-bold text-gray-900">{item?.level || "초급"}</span>
              </div>
              <div className="w-7 h-7 rounded-lg bg-sky-100/90 flex items-center justify-center shrink-0">
                <span className="text-[11px] font-bold text-gray-900">{item?.duration || "매일"}</span>
              </div>
              <div className="w-7 h-7 rounded-lg bg-rose-200/90 flex items-center justify-center shrink-0">
                <span className="text-[11px] font-bold text-gray-900">{item?.reward || "+10"}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import { ALL_72_RITUALS } from "@/data/all72Rituals";
import {
  RitualGlassIconCard,
  RitualSoftMintIconCard,
  RitualSlateIconCard,
  RitualIceFrostIconCard,
  RitualRainbowIconCard,
} from "@/components/ui/RitualGlassIconCard";

export function IconShowcaseSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = [
    "ALL",
    "스트레스 비우기",
    "자기자비 명상",
    "감정 정돈",
    "몰입과 집중",
    "휴식과 충전",
    "관계와 경계",
  ];

  // 72개 리추얼 기준 필터링
  const filtered72 =
    selectedCategory === "ALL"
      ? ALL_72_RITUALS
      : ALL_72_RITUALS.filter((item) => item.category === selectedCategory);

  const filteredRituals: IconItem[] = filtered72.map((item) => ({
    id: item.id,
    name: item.title,
    iconNum: item.iconNum,
    category: item.category,
    tag: item.time,
    level: item.level,
    duration: item.duration,
    reward: item.reward,
    desc: item.desc,
    isLocked: item.isLocked,
  }));

  return (
    <section id="icons-showcase" className="space-y-8 select-none text-left scroll-mt-24">
      {/* 섹션 타이틀 */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          마인드짐 아이콘 & 카테고리별 디자인 시스템 (ICON SHOWCASE)
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          단일 아이콘 컴포넌트(RitualGlassIconCard)부터 72개 전체 리추얼 카탈로그까지 한눈에 확인하는 시스템 가이드입니다.
        </p>
      </div>

      {/* 필터 탭 */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
              selectedCategory === cat
                ? "bg-[#00C474] text-white shadow-xs font-bold"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat === "ALL" ? `전체 보기 (${ALL_72_RITUALS.length})` : cat}
          </button>
        ))}
      </div>

      {/* ================================================================================= */}
      {/* ★ SECTION 0: 단일 아이콘 컴포넌트 (RitualGlassIconCard) 쇼케이스 ★ */}
      {/* ================================================================================= */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-2xs space-y-5">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              SINGLE ICONS (`RitualGlassIconCard`)
            </span>
            <h3 className="text-base font-bold text-gray-900 mt-1.5">
              단일 리추얼 아이콘 컴포넌트 (4가지 림 테두리 옵션 & 사이즈)
            </h3>
          </div>
          <span className="text-xs text-gray-400 font-medium hidden sm:inline">
            Soft Mint / Refined Slate / Ice Frost / Rainbow Aurora
          </span>
        </div>

        {/* 4가지 보더 림 스타일 샘플 */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            1) 4가지 림 스타일 (Border Rim Options)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50/70 rounded-2xl">
            <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-2xs">
              <span className="text-[11px] font-bold text-emerald-600">Option 1: Soft Mint</span>
              <RitualSoftMintIconCard
                name="미소 명상"
                icon={1}
                tag="1분 · 명상"
                size="md"
              />
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-2xs">
              <span className="text-[11px] font-bold text-slate-600">Option 2: Refined Slate</span>
              <RitualSlateIconCard
                name="마음챙김 벨"
                icon={2}
                tag="1분 · 소리"
                size="md"
              />
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-2xs">
              <span className="text-[11px] font-bold text-cyan-600">Option 3: Ice Frost</span>
              <RitualIceFrostIconCard
                name="스트레스 분쇄"
                icon={8}
                tag="2분 · 글쓰기"
                size="md"
              />
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-2xs">
              <span className="text-[11px] font-bold text-purple-600">Option 4: Rainbow Aurora</span>
              <RitualRainbowIconCard
                name="바디스캔"
                icon={46}
                tag="5분 · 이완"
                size="md"
              />
            </div>
          </div>
        </div>

        {/* 규격 사이즈 (sm: 3.6rem / md: 5rem / lg: 6rem) 및 다크 테마 샘플 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* 사이즈별 */}
          <div className="p-4 bg-gray-50/70 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              2) 사이즈 규격 (sm / md / lg)
            </h4>
            <div className="flex items-end justify-around gap-2 pt-2">
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold text-gray-400">sm (3.6rem)</span>
                <RitualGlassIconCard name="미소명상" icon={1} size="sm" borderOption="1" />
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold text-gray-400">md (5.0rem 기본)</span>
                <RitualGlassIconCard name="미소명상" icon={1} size="md" borderOption="1" />
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold text-gray-400">lg (6.0rem 대형)</span>
                <RitualGlassIconCard name="미소명상" icon={1} size="lg" borderOption="1" />
              </div>
            </div>
          </div>

          {/* 다크 테마 단일 아이콘 */}
          <div className="p-4 bg-slate-900 rounded-2xl space-y-3 text-white">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              3) 다크 테마 단일 아이콘 (Dark Glass)
            </h4>
            <div className="flex items-center justify-around gap-2 pt-2">
              <RitualGlassIconCard
                name="미소 명상"
                icon={1}
                tag="1분"
                theme="dark"
                borderOption="1"
              />
              <RitualGlassIconCard
                name="스트레스 분쇄"
                icon={8}
                tag="2분"
                theme="dark"
                borderOption="3"
              />
              <RitualGlassIconCard
                name="오픈 예정"
                icon={11}
                isLocked={true}
                theme="dark"
              />
            </div>
          </div>
        </div>

        {/* 72개 리추얼 단일 아이콘 전체 그리드 (현재 카테고리 기준 필터) */}
        <div className="space-y-3 pt-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
              <span>4) 72개 단일 아이콘 그리드 컬렉션</span>
              <span className="text-xs font-black text-[#00C474] bg-emerald-50 px-2 py-0.5 rounded-full">
                {filtered72.length}개
              </span>
            </h4>
            <span className="text-[11px] text-gray-400">아이콘에 마우스를 올리면 회전 광택 모션이 동작합니다</span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9 gap-3 p-4 bg-gray-50/60 rounded-2xl max-h-[480px] overflow-y-auto">
            {filtered72.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center p-2 bg-white rounded-xl shadow-2xs hover:shadow-xs transition-all hover:scale-105"
              >
                <RitualGlassIconCard
                  name={item.title}
                  icon={item.iconNum}
                  size="sm"
                  borderOption="1"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================================= */}
      {/* ★ TYPE 1: Glassmorphic Floating Cards (Dark Theme - 화이트 테마와 100% 동일 스펙!) ★ */}
      {/* ================================================================================= */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 p-6 rounded-3xl text-white shadow-xl space-y-4 border border-slate-700/60">
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
          <div>
            <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
              TYPE 1 (Dark Theme)
            </span>
            <h3 className="text-base font-bold text-white mt-1.5">
              1. 글래스모피즘 플로팅 카탈로그 (Dark Theme)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            다크 글래스모피즘 3D 카드 + 화이트 테마 100% 동일 4개 파스텔 칩
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-2">
          {filteredRituals.map((icon) => (
            <div
              key={icon.id}
              className="relative p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:border-white/30 transition-all flex flex-col items-center text-center justify-between gap-3 group shadow-lg overflow-hidden"
            >
              {icon.isLocked && <LockedOverlay iconSize={20} roundedClass="rounded-2xl" />}
              
              {/* 다크 전용 구분 라벨 뱃지 */}
              <span className="text-[10px] font-extrabold text-emerald-300 bg-emerald-900/60 border border-emerald-400/30 px-2 py-0.5 rounded-md">
                Dark Glass
              </span>

              {/* 3D PNG 이미지 아이콘 */}
              <div className="relative w-13 h-13 shrink-0 transition-transform group-hover:scale-105 my-0.5">
                <Image
                  src={getIconPath(icon.iconNum)}
                  alt={icon.name}
                  fill
                  className={`object-contain ${icon.isLocked ? "opacity-40 grayscale-[30%]" : ""}`}
                />
              </div>

              {/* 타이틀 및 화이트 테마와 100% 동일한 4개 파스텔 정사각형 칩! */}
              <div className="flex flex-col items-center gap-1.5 w-full">
                <h4 className="text-[14px] font-bold text-white truncate w-full tracking-tight">
                  {icon.name}
                </h4>

                {/* 4개 파스텔 정사각형 칩 (다크 뷰포트에서도 명확히 정돈) */}
                <div className="flex items-center justify-center gap-1.5 pt-0.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-200/90 flex items-center justify-center shrink-0">
                    <span className="text-[11px] font-extrabold text-amber-950">{icon.tag}</span>
                  </div>
                  {!icon.isLocked && (
                    <>
                      <div className="w-7 h-7 rounded-lg bg-purple-200/90 flex items-center justify-center shrink-0">
                        <span className="text-[11px] font-extrabold text-purple-950">{icon.level}</span>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-sky-200/90 flex items-center justify-center shrink-0">
                        <span className="text-[11px] font-extrabold text-sky-950">{icon.duration}</span>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-rose-250/90 flex items-center justify-center shrink-0 bg-rose-300">
                        <span className="text-[11px] font-extrabold text-rose-950">{icon.reward}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================================= */}
      {/* ★ TYPE 2: 3D 리추얼 카드 4가지 보더 옵션 (Light Theme - Option 1, 2, 3, 4) ★ */}
      {/* ================================================================================= */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
              TYPE 2 (Light Theme)
            </span>
            <h3 className="text-base font-bold text-gray-900 mt-1.5">
              2. 파스텔 웰니스 소프트 그리드 (Light Theme - Option 1, 2, 3, 4 보더 시스템)
            </h3>
          </div>
          <span className="text-xs text-gray-400 font-medium hidden sm:inline">
            무경계 / 헤어라인 / 파스텔 틴트 / 뱃지 포함 4가지 보더 옵션 시각화
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-2">
          {filteredRituals.map((icon, idx) => {
            const borderOption = (idx % 4 === 0 ? "1" : idx % 4 === 1 ? "2" : idx % 4 === 2 ? "3" : "4") as "1" | "2" | "3" | "4";
            return (
              <RitualIcon3DCard
                key={icon.id}
                title={icon.name}
                badgeText={icon.isLocked ? "오픈" : icon.tag}
                categoryName={icon.category}
                iconSrc={getIconPath(icon.iconNum)}
                borderOption={borderOption}
                showOptionBadge={true}
                isLocked={icon.isLocked}
                item={icon}
              />
            );
          })}
        </div>
      </div>

      {/* ================================================================================= */}
      {/* TYPE 3: Banners & Quick Check-in Cards */}
      {/* ================================================================================= */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
              TYPE 3
            </span>
            <h3 className="text-base font-bold text-gray-900 mt-1.5">
              3. 배너 & 퀵 체크인 카드 (프로덕션 가로 리추얼 카드 스펙)
            </h3>
          </div>
          <span className="text-xs text-gray-400 font-medium hidden sm:inline">
            가로 배너 뷰 + 3D 아이콘 + 4개 미니 칩
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {filteredRituals.map((icon) => (
            <div
              key={icon.id}
              className={`relative p-3.5 rounded-2xl border border-gray-100 flex items-center justify-between gap-3 transition-all group overflow-hidden ${
                icon.isLocked
                  ? "bg-[#F9FAFB]/90 opacity-90 cursor-not-allowed"
                  : "bg-[#F9FAFB] hover:bg-emerald-50/30 hover:border-emerald-200 cursor-pointer"
              }`}
            >
              {icon.isLocked && <LockedOverlay iconSize={20} roundedClass="rounded-2xl" />}

              <div className="flex items-center gap-3 min-w-0 flex-1">
                <button
                  type="button"
                  className="p-1 text-gray-300 hover:text-amber-400 cursor-pointer shrink-0 transition-colors z-10"
                >
                  <Star size={18} weight="regular" />
                </button>

                <div className="relative w-12 h-12 shrink-0">
                  <Image
                    src={getIconPath(icon.iconNum)}
                    alt={icon.name}
                    fill
                    className={`object-contain ${icon.isLocked ? "opacity-60 grayscale-[20%]" : ""}`}
                  />
                </div>

                <div className="flex flex-col text-left gap-1 min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-[10px] font-extrabold text-[#00C474] bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">
                      {icon.category}
                    </span>
                    <h4 className="text-[14px] font-bold text-gray-900 truncate">
                      {icon.name}
                    </h4>
                  </div>

                  <div className="flex items-center justify-start gap-1">
                    <div className="w-6 h-6 rounded-md bg-amber-100/90 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-gray-900">{icon.tag}</span>
                    </div>
                    {!icon.isLocked && (
                      <>
                        <div className="w-6 h-6 rounded-md bg-purple-100/90 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-gray-900">{icon.level}</span>
                        </div>
                        <div className="w-6 h-6 rounded-md bg-sky-100/90 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-gray-900">{icon.duration}</span>
                        </div>
                        <div className="w-6 h-6 rounded-md bg-rose-200/90 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-gray-900">{icon.reward}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {!icon.isLocked && (
                <button
                  type="button"
                  title={`${icon.name} 리추얼 시작하기`}
                  className="p-2 rounded-xl text-gray-400 hover:text-[#00C474] hover:bg-emerald-100/60 active:scale-95 transition-all cursor-pointer shrink-0 outline-none"
                >
                  <CaretRight size={18} weight="bold" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
