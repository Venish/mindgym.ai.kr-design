"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LockKey, CaretRight, Star } from "@phosphor-icons/react";
import {
  RitualGlassIconCard,
} from "@/components/ui/RitualGlassIconCard";
import { LockedOverlay } from "@/components/ui/LockedOverlay";

// 6개 카테고리 정의 (텍스트 + 고유 배경 컬러 사용)
const categories = [
  { id: "ALL", name: "전체", count: 72, bg: "#0F172A", text: "#FFFFFF" },
  { id: "P1", name: "불안 완화", count: 11, bg: "#ECFDF5", text: "#047857", activeBg: "#10B981", activeText: "#FFFFFF" },
  { id: "P2", name: "자기 자비", count: 12, bg: "#FFF1F2", text: "#BE123C", activeBg: "#F43F5E", activeText: "#FFFFFF" },
  { id: "P3", name: "감정 조절", count: 11, bg: "#EEF2FF", text: "#4338CA", activeBg: "#6366F1", activeText: "#FFFFFF" },
  { id: "P4", name: "자기 탐색", count: 11, bg: "#F3E8FF", text: "#6B21A8", activeBg: "#A855F7", activeText: "#FFFFFF" },
  { id: "P5", name: "신체 회복", count: 13, bg: "#FFFBEB", text: "#B45309", activeBg: "#F59E0B", activeText: "#FFFFFF" },
  { id: "P6", name: "관계 연결", count: 14, bg: "#F0FDFA", text: "#0F766E", activeBg: "#14B8A6", activeText: "#FFFFFF" },
];

// 72개 리추얼 대표 샘플 16종 (몇몇 항목은 아직 오픈 안 한 잠금 상태 샘플 설정)
const allRituals = [
  { id: "001", part: "P1", name: "미소 명상", filename: "001_미소명상.png", desc: "입가만 살짝 올려 웃어 보는 시각화 명상", tag: "1분 · 명상", isLocked: false },
  { id: "002", part: "P1", name: "마음챙김 종", filename: "002_마음챙김벨.png", desc: "청아한 종소리로 잡생각을 멈추는 사운드", tag: "1분 · 소리", isLocked: false },
  { id: "003", part: "P1", name: "시선고정 명상", filename: "003_시선고정명상.png", desc: "사물 하나에 1분간 시선을 고정하는 호흡 (다음 주 공개)", tag: "1분 · 시선", isLocked: true },
  { id: "004", part: "P1", name: "횡격막 호흡", filename: "004_횡경막호흡.png", desc: "가슴과 배의 호흡을 느끼는 깊은 호흡", tag: "1분 · 호흡", isLocked: false },
  { id: "010", part: "P1", name: "333 나비안아주기", filename: "010_333나비포옹.png", desc: "나를 꼭 안아주며 토닥이는 자기 자비", tag: "1분 · 자비", isLocked: false },
  { id: "012", part: "P2", name: "자책 일기", filename: "012_내편일기.png", desc: "솔직스러운 언어로 자책을 털어놓는 일기", tag: "3분 · 일기", isLocked: false },
  { id: "014", part: "P2", name: "자존감 카탈로그", filename: "014_자존감칠판.png", desc: "나를 향한 칭찬 메시지 수집 카드 (오픈 예정)", tag: "2분 · 자존감", isLocked: true },
  { id: "022", part: "P2", name: "나다운 확언", filename: "022_투데이확언.png", desc: "오늘 단 1스텝에 발을 붙이는 확언", tag: "2분 · 확언", isLocked: false },
  { id: "024", part: "P3", name: "마음선물 남기기", filename: "024_마음날씨기록.png", desc: "오늘 내 마음의 온도를 시각화 기록", tag: "1분 · 감정", isLocked: false },
  { id: "028", part: "P3", name: "분노 일기", filename: "028_불평일기.png", desc: "솔직한 분노 후 감정을 수용하는 일기 (오픈 예정)", tag: "3분 · 수용", isLocked: true },
  { id: "035", part: "P4", name: "나만의 집 그리며", filename: "035_나만의집그리기.png", desc: "내 마음의 평온하고 안전한 집을 그리는 세션", tag: "5분 · 그림", isLocked: false },
  { id: "037", part: "P4", name: "셀프 QnA", filename: "037_셀프QnA.png", desc: "나에게 번갈아 묻고 답하는 인터뷰", tag: "3분 · 질문", isLocked: false },
  { id: "046", part: "P5", name: "바디스캔", filename: "046_바디스캔.png", desc: "머리부터 발끝까지 감각을 관찰하는 이완", tag: "5분 · 이완", isLocked: false },
  { id: "050", part: "P5", name: "맨발 산책", filename: "050_빈손산책.png", desc: "아무것도 들지 않고 발바닥을 느끼는 걷기", tag: "5분 · 산책", isLocked: false },
  { id: "061", part: "P6", name: "친절 수집함", filename: "061_친절수집장.png", desc: "오늘 타인에게 받은 온기를 수집하는 함", tag: "2분 · 연결", isLocked: false },
  { id: "071", part: "P6", name: "3-2-1 그라운딩", filename: "071_3-2-1그라운딩.png", desc: "보이는 것 3개, 들리는 것 2개, 맛 1개 기록", tag: "2분 · 기록", isLocked: false },
];

export function IconShowcaseSection() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  // Selected category filtered list
  const filteredRituals = activeCategory === "ALL"
    ? allRituals
    : allRituals.filter((r) => r.part === activeCategory);

  return (
    <section id="icons-showcase" className="scroll-mt-24 space-y-10">
      {/* SVG Liquid Refraction Filters Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="liquidRefractionFilterStudio" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves={1} result="liquidNoise" />
            <feDisplacementMap in="SourceGraphic" in2="liquidNoise" scale={2} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md">
            NEW ASSETS
          </span>
          <span className="text-xs text-gray-400 font-mono">public/images/icons (72 PNGs)</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mt-2">
          마음건강 리추얼 아이콘 4가지 UI 디자인 스타일 쇼케이스
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          `public/images/icons/` 폴더의 72개 리추얼 아이콘과 미오픈 자물쇠(Lock) 샘플을 포함한 가이드입니다.
        </p>
      </div>

      {/* RITUAL CATEGORY FILTER */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
            RITUAL CATEGORY FILTER
          </span>
          <span className="text-xs text-slate-400 font-medium">카테고리를 클릭하면 해당 아이콘들이 실시간 필터링됩니다</span>
        </div>

        {/* Pure Text & Background Color Buttons */}
        <div className="flex flex-wrap gap-3 pt-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: "11px 32px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: isActive ? (cat.activeText || "#FFFFFF") : cat.text,
                  backgroundColor: isActive ? (cat.activeBg || cat.bg) : cat.bg,
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: isActive ? "0 4px 14px rgba(0,0,0,0.12)" : "none",
                  transform: isActive ? "translateY(-1px)" : "translateY(0)",
                }}
                className="hover:opacity-90 active:scale-95"
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* TYPE 1: Pure Icon Only */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">TYPE 1</span>
            <h3 className="text-base font-bold text-gray-900 mt-1">1. 순수 독립 아이콘 (Icon Only)</h3>
          </div>
          <span className="text-xs text-gray-400 font-medium">배경 박스 없이 독립적으로 노출되는 기본 아이콘</span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 pt-2">
          {filteredRituals.map((icon) => (
            <div
              key={icon.id}
              className={`relative flex flex-col items-center justify-center p-3 rounded-2xl overflow-hidden ${
                icon.isLocked ? "opacity-80" : ""
              }`}
            >
              {icon.isLocked && <LockedOverlay iconSize={16} roundedClass="rounded-2xl" />}
              <div className="relative w-14 h-14">
                <Image
                  src={`/images/icons/${icon.filename}`}
                  alt={icon.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-semibold text-gray-700 mt-2 text-center truncate w-full">
                {icon.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* TYPE 2: Glassmorphic Glass Card (Light Theme - with Lock Sample) */}
      <div className="bg-slate-50/70 p-6 rounded-3xl border border-gray-200/80 shadow-2xs space-y-4 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-200/60 pb-3">
          <div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-100/80 px-2.5 py-1 rounded-md">TYPE 2</span>
            <h3 className="text-base font-bold text-gray-900 mt-1">
              2. 글래스모피즘 박스 카드 (`RitualGlassIconCard` - 미오픈 잠금 자물쇠 샘플 포함)
            </h3>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" />1. Soft Mint</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400" />2. Refined Slate</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-200" />3. Ice Frost</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" />🔒 미오픈 (Lock)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2">
          {filteredRituals.map((icon, idx) => {
            const borderOption = (idx % 4 === 0 ? "1" : idx % 4 === 1 ? "2" : idx % 4 === 2 ? "3" : "4") as "1" | "2" | "3" | "4";
            return (
              <RitualGlassIconCard
                key={icon.id}
                name={icon.name}
                icon={icon.filename}
                tag={icon.tag}
                borderOption={borderOption}
                showOptionBadge={true}
                isLocked={icon.isLocked}
              />
            );
          })}
        </div>
      </div>

      {/* TYPE 3: Banners & Quick Check-in Cards (전체 마음건강 리추얼 모달과 100% 동일한 공통 컴포넌트 스펙) */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">TYPE 3</span>
            <h3 className="text-base font-bold text-gray-900 mt-1">
              3. 배너 & 퀵 체크인 카드 (전체 마음건강 리추얼 공통 스펙)
            </h3>
          </div>
          <span className="text-xs text-gray-400 font-medium">
            무경계 슬레이트 카드 + 순수 아이콘 + 우측 CaretRight 화살표
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
                  src={`/images/icons/${icon.filename}`}
                  alt={icon.name}
                  fill
                  className={`object-contain ${icon.isLocked ? "opacity-60 grayscale-[20%]" : ""}`}
                />
              </div>

              {/* 중앙 정보 */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{icon.name}</h4>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      icon.isLocked
                        ? "text-gray-500 bg-gray-200/80"
                        : "text-emerald-700 bg-emerald-100/70"
                    }`}
                  >
                    {icon.isLocked ? "오픈 예정" : icon.tag}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1 leading-snug">
                  {icon.desc}
                </p>
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
              <RitualGlassIconCard
                key={icon.id}
                name={icon.name}
                icon={icon.filename}
                tag={icon.tag}
                borderOption={borderOption}
                theme="dark"
                isLocked={icon.isLocked}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
