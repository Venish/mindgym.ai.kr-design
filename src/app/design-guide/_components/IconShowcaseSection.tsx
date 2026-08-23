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

function RitualIcon3DCard({
  title,
  badgeText,
  iconSrc,
  isLocked,
}: {
  title: string;
  badgeText: string;
  categoryName?: string;
  iconSrc: string;
  borderOption?: string;
  showOptionBadge?: boolean;
  isLocked?: boolean;
}) {
  return (
    <div className="relative p-4 rounded-2xl bg-[#F9FAFB] flex flex-col items-center text-center gap-3 border border-gray-100 shadow-2xs">
      {isLocked && <LockedOverlay iconSize={20} roundedClass="rounded-2xl" />}
      <div className="relative w-12 h-12 shrink-0">
        <Image src={iconSrc} alt={title} fill className="object-contain" />
      </div>
      <div className="flex flex-col items-center gap-1 min-w-0 w-full">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-amber-100/90 text-center shadow-2xs">
          <span className="text-xs font-bold text-gray-900">{badgeText}</span>
        </div>
        <h4 className="text-sm font-bold text-slate-900 truncate w-full">{title}</h4>
      </div>
    </div>
  );
}

export function IconShowcaseSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = ["ALL", "휴식과 충전", "몰입과 집중", "스트레스 비우기"];

  const filteredRituals =
    selectedCategory === "ALL"
      ? RITUAL_ICONS
      : RITUAL_ICONS.filter((item) => item.category === selectedCategory);

  return (
    <section className="space-y-8 select-none">
      {/* 섹션 타이틀 */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          마인드짐 아이콘 & 카테고리별 디자인 시스템 (ICON SHOWCASE)
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          실제 프로덕션에 적용되는 Type 1~4 시각적 카드 및 아이콘 표현 가이드입니다.
        </p>
      </div>

      {/* 필터 탭 */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-gray-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat === "ALL" ? "전체 보기" : cat}
          </button>
        ))}
      </div>

      {/* TYPE 1: Glassmorphic Floating Cards */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
          <div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-md">TYPE 1</span>
            <h3 className="text-base font-bold text-white mt-1">
              1. 글래스모피즘 플로팅 카탈로그 (Dark Theme)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">배경 블러 + 입체 3D 그림자</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
          {filteredRituals.map((icon) => (
            <div
              key={icon.id}
              className="relative p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:border-white/30 transition-all flex flex-col items-center text-center gap-3 group"
            >
              {icon.isLocked && <LockedOverlay iconSize={24} roundedClass="rounded-2xl" />}
              <div className="relative w-14 h-14 shrink-0 transition-transform group-hover:scale-105">
                <Image
                  src={getIconPath(icon.iconNum)}
                  alt={icon.name}
                  fill
                  className={`object-contain ${icon.isLocked ? "opacity-40 grayscale-[30%]" : ""}`}
                />
              </div>
              <div className="flex flex-col items-center gap-1 min-w-0 w-full">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-amber-100/90 text-center shadow-2xs">
                  <span className="text-xs font-bold text-gray-900">{icon.isLocked ? "오픈" : icon.tag}</span>
                </div>
                <h4 className="text-sm font-bold text-white truncate w-full">{icon.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TYPE 2: Pastel Clean Soft Cards */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">TYPE 2</span>
            <h3 className="text-base font-bold text-gray-900 mt-1">
              2. 파스텔 웰니스 소프트 그리드 (Light Theme)
            </h3>
          </div>
          <span className="text-xs text-gray-400 font-medium">연한 파스텔 배경 + 둥근 모서리</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
          {filteredRituals.map((icon, idx) => {
            const borderOption = (idx % 4 === 0 ? "1" : idx % 4 === 1 ? "2" : idx % 4 === 2 ? "3" : "4") as "1" | "2" | "3" | "4";
            return (
              <RitualIcon3DCard
                key={icon.id}
                title={icon.name}
                badgeText={icon.isLocked ? "오픈 예정" : icon.tag}
                categoryName={icon.category}
                iconSrc={getIconPath(icon.iconNum)}
                borderOption={borderOption}
                showOptionBadge={true}
                isLocked={icon.isLocked}
              />
            );
          })}
        </div>
      </div>

      {/* TYPE 3: Banners & Quick Check-in Cards (5. RitualCard 4개 정사각형 칩 w-8 h-8 rounded-xl 동일 적용) */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">TYPE 3</span>
            <h3 className="text-base font-bold text-gray-900 mt-1">
              3. 배너 & 퀵 체크인 카드 (전체 마음건강 리추얼 공통 스펙)
            </h3>
          </div>
          <span className="text-xs text-gray-400 font-medium">
            무경계 슬레이트 카드 + 순수 아이콘 + 4개 정사각형 칩 (5. RitualCard 동일)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {filteredRituals.map((icon) => (
            <div
              key={icon.id}
              className={`relative p-3 rounded-2xl flex items-center gap-3 transition-all group overflow-hidden ${
                icon.isLocked
                  ? "bg-[#F9FAFB]/90 opacity-90 cursor-not-allowed"
                  : "bg-[#F9FAFB]"
              }`}
            >
              {/* 정중앙 공통 잠금 오버레이 */}
              {icon.isLocked && <LockedOverlay iconSize={20} roundedClass="rounded-2xl" />}

              {/* 가장 왼쪽 즐겨찾기(찜하기) 아이콘 */}
              <div className="p-1 text-gray-300 hover:text-amber-400 cursor-pointer shrink-0 transition-colors z-10">
                <Star size={18} weight="regular" />
              </div>

              {/* 왼쪽 순수 PNG 아이콘 */}
              <div className="relative w-12 h-12 shrink-0">
                <Image
                  src={getIconPath(icon.iconNum)}
                  alt={icon.name}
                  fill
                  className={`object-contain ${icon.isLocked ? "opacity-60 grayscale-[20%]" : ""}`}
                />
              </div>

              {/* 중앙 정보 (5. RitualCard 동일 4개 정사각형 칩 flex items-center justify-start gap-1.5) */}
              <div className="flex-1 min-w-0 text-left flex flex-col gap-1.5">
                <h4 className="text-sm font-bold text-slate-900 truncate">{icon.name}</h4>
                <div className="flex items-center justify-start gap-1.5">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-amber-100/90 text-center shadow-2xs shrink-0">
                    <span className="text-xs font-bold text-gray-900">
                      {icon.isLocked ? "오픈" : icon.tag}
                    </span>
                  </div>
                  {!icon.isLocked && (
                    <>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-purple-100/90 text-center shrink-0">
                        <span className="text-xs font-bold text-gray-900">{icon.level}</span>
                      </div>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-sky-100/90 text-center shrink-0">
                        <span className="text-xs font-bold text-gray-900">{icon.duration}</span>
                      </div>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-rose-200/90 text-center shadow-xs shrink-0">
                        <span className="text-xs font-bold text-gray-900">{icon.reward}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* 오른쪽 잠시 멈춤 화살표 실행 버튼 (화살표 영역만 독립 클릭 트리거) */}
              {!icon.isLocked && (
                <button
                  type="button"
                  title={`${icon.name} 리추얼 시작하기`}
                  className="p-2 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-100/60 active:scale-95 transition-all cursor-pointer shrink-0 outline-none"
                >
                  <CaretRight size={20} weight="bold" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* TYPE 4-A: 3D Camera & Water Glass Icon Studio (Dark Theme via Shared Component) */}
      <div className="bg-[#030712] p-8 rounded-3xl border border-cyan-900/60 shadow-2xl space-y-6 text-white relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-cyan-900/50 pb-4 relative z-10">
          <div>
            <span className="text-xs font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-1 rounded-md">
              TYPE 4-A (스튜디오 3D 스튜디오)
            </span>
            <h3 className="text-lg font-bold text-cyan-100 mt-1 flex items-center gap-2">
              타입 4-A. 3D 리퀴드 글래스 아이콘 (Dark Theme)
            </h3>
          </div>
          <span className="text-xs text-cyan-400 font-mono">3D Glass + Border Conic Water Rotate</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2 relative z-10">
          {filteredRituals.map((icon, idx) => {
            const borderOption = (idx % 4 === 0 ? "1" : idx % 4 === 1 ? "2" : idx % 4 === 2 ? "3" : "4") as "1" | "2" | "3" | "4";
            return (
              <RitualIcon3DCard
                key={icon.id}
                title={icon.name}
                badgeText={icon.isLocked ? "오픈 예정" : icon.tag}
                categoryName={icon.category}
                iconSrc={getIconPath(icon.iconNum)}
                borderOption={borderOption}
                showOptionBadge={true}
                isLocked={icon.isLocked}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
