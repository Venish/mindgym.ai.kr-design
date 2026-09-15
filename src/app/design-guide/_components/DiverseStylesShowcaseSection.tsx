"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Lightning,
  Sparkle,
  TrendUp,
  Cpu,
  Feather,
  Flame,
  ArrowRight,
  DotsThree,
  SquaresFour,
} from "@phosphor-icons/react";
import { getIconPath } from "@/utils/iconMap";

export type SampleStyleType = "fintech" | "editorial" | "brutalism" | "brutalism-brand" | "darktech";

interface StyleDefinition {
  id: SampleStyleType;
  title: string;
  subTitle: string;
  badge: string;
  accentColor: string;
  desc: string;
  tags: string[];
}

const STYLES_LIST: StyleDefinition[] = [
  {
    id: "fintech",
    title: "1. Modern Tech Fintech",
    subTitle: "토스 · Linear · Stripe 스타일",
    badge: "하이테크 신뢰감",
    accentColor: "#2563EB",
    desc: "슬레이트 쿨그레이와 일렉트릭 블루, 초정밀 1px 헤어라인과 절제된 12px 곡률로 구현한 엔지니어링 핀테크 룩",
    tags: ["0.5px/1px Hairline", "Electric Blue", "Slate Surface", "Tabular Nums"],
  },
  {
    id: "editorial",
    title: "2. Editorial Warm Minimal",
    subTitle: "노션 · 킨포크 · 브라운 매거진",
    badge: "지적 에디토리얼",
    accentColor: "#B45309",
    desc: "차분한 린넨 베이지, 딥 차콜 활판 인쇄 타이포그래피, 절취선(Dashed) 보더와 8px 각진 박스의 지적인 감성",
    tags: ["Dashed Dividers", "Linen Beige", "High Contrast Serif/Sans", "Muted Amber"],
  },
  {
    id: "brutalism",
    title: "3. Bold Neo-Brutalism (오렌지)",
    subTitle: "Figma · Gumroad 힙스터",
    badge: "인더스트리얼 힙",
    accentColor: "#FF5722",
    desc: "2px 볼드 블랙 솔리드 라인, 3px 하드 드롭 섀도우, 비비드 탠저린 오렌지와 바이올렛의 캐주얼 스트리트 무드",
    tags: ["2px Solid Black", "3px Hard Shadow", "Vivid Tangerine", "High Energy"],
  },
  {
    id: "brutalism-brand",
    title: "4. Neo-Brutalism + 브랜드 그린 (★요청)",
    subTitle: "다양한 색감 베이스 + 그린 포인트",
    badge: "★ 브랜드 브루탈",
    accentColor: "#00C474",
    desc: "옐로우·페리윙클 등 상황별 멀티 컬러 베이스는 그대로 유지하고, 뱃지와 메인 액션 버튼에만 마인드짐 그린(#00C474)을 포인트로 적용한 균형 잡힌 브루탈리즘",
    tags: ["2px Solid Black", "3.5px Hard Shadow", "Multi-Color Palette", "Green Point Accent"],
  },
  {
    id: "darktech",
    title: "5. Deep Studio Midnight",
    subTitle: "애플 프로 · GitHub Dark · 스튜디오 랩",
    badge: "압도적 몰입감",
    accentColor: "#10B981",
    desc: "딥 스페이스 블랙/네이비 캔버스, 미세 글래스모피즘 아웃라인(8% White), 네온 백라이트의 전문가용 다크 테크",
    tags: ["Specular Rim", "Space Midnight #0B0F19", "Neon Glow", "Glass Backdrop"],
  },
];

export function DiverseStylesShowcaseSection() {
  const [activeTab, setActiveTab] = useState<SampleStyleType>("fintech");

  return (
    <section id="diverse-styles" className="scroll-mt-24 space-y-8">
      {/* 1. 섹션 헤더 */}
      <div className="border-b border-theme-subtle pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-black rounded-full shadow-2xs">
              ⚡ BEYOND WELLNESS
            </span>
            <span className="text-xs font-mono font-bold text-gray-400">
              Tech / Editorial / Brutalism / Dark Studio
            </span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mt-2 tracking-tight">
            스타일 다변화 샘플 쇼케이스 (보더 & 컬러 혁신)
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            마음건강 힐링풍 일변도를 벗어나, <strong>핀테크 블루, 에디토리얼, 네오 브루탈리즘, 미드나잇 다크</strong> 등 4대 장르의 보더 및 컬러 시스템을 한눈에 비교 검토할 수 있습니다.
          </p>
        </div>

        {/* 4대 스타일 인터랙티브 탭 셀렉터 */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-gray-100/90 border border-gray-200 shadow-2xs self-start shrink-0">
          {STYLES_LIST.map((style) => (
            <button
              key={style.id}
              type="button"
              onClick={() => setActiveTab(style.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === style.id
                  ? "bg-white text-gray-900 shadow-xs scale-[1.02]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {style.badge}
            </button>
          ))}
        </div>
      </div>

      {/* 2. 5가지 스타일 장르 요약 카드 덱 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {STYLES_LIST.map((st) => {
          const isSelected = activeTab === st.id;
          return (
            <div
              key={st.id}
              onClick={() => setActiveTab(st.id)}
              className={`p-4 rounded-2xl flex flex-col justify-between text-left transition-all cursor-pointer border ${
                isSelected
                  ? "bg-white border-blue-600 ring-2 ring-blue-600/20 shadow-md"
                  : "bg-theme-card border-theme-subtle hover:border-gray-300"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[10px] font-extrabold px-2 py-0.5 rounded-md text-white"
                    style={{ backgroundColor: st.accentColor }}
                  >
                    {st.badge}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 font-bold">
                    {st.accentColor}
                  </span>
                </div>
                <h3 className="text-sm font-black text-gray-900 tracking-tight">
                  {st.title}
                </h3>
                <span className="text-[11px] font-semibold text-gray-400 block mb-2">
                  {st.subTitle}
                </span>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-3">
                  {st.desc}
                </p>
              </div>

              {/* 태그 목록 */}
              <div className="flex flex-wrap gap-1 pt-2 border-t border-gray-100">
                {st.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. 동일 위젯의 5대 스타일 수평 실시간 대조기 (Multi-Genre Live Comparison) */}
      <div className="bg-theme-card p-6 rounded-3xl border border-theme-subtle shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-theme-subtle pb-3">
          <div className="flex items-center gap-2">
            <SquaresFour size={18} weight="bold" className="text-blue-600" />
            <h3 className="text-base font-black text-gray-900 tracking-tight">
              동일 컴포넌트의 5대 스타일 변신 비교 (Horizontal Side-by-Side)
            </h3>
          </div>
          <span className="text-xs font-medium text-gray-400">
            카드, 보더, 폰트, 버튼이 장르별로 완전히 다른 톤으로 재해석된 모습입니다.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          {/* ================= TYPE 1. Modern Tech Fintech ================= */}
          <div className="flex flex-col gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-fintech-glow">
            {/* 상단 라벨 */}
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <span className="text-xs font-mono font-black text-[#2563EB] flex items-center gap-1">
                <Cpu size={14} weight="bold" />
                <span>TECH FINTECH</span>
              </span>
              <span className="text-[10px] font-mono text-[#64748B] font-bold">1px Hairline</span>
            </div>

            {/* 카드 컴포넌트 */}
            <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#2563EB]">
                  SYSTEM ACTIVE
                </span>
                <span className="text-xs font-mono text-slate-500 font-bold tabular-nums">
                  03:00 SEC
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#2563EB] shrink-0 font-mono font-bold text-sm">
                  ⚡ 01
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                    집중 몰입 세션
                  </h4>
                  <p className="text-[11px] text-slate-500">흐트러진 주의력을 재정렬합니다</p>
                </div>
              </div>

              {/* 지표 수치 */}
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between font-mono text-xs">
                <span className="text-slate-500">EFFICIENCY</span>
                <span className="font-bold text-blue-600 tabular-nums">+94.2%</span>
              </div>

              <button
                type="button"
                className="w-full py-2.5 rounded-lg bg-[#2563EB] text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-xs"
              >
                실행 파이프라인 시작
              </button>
            </div>
          </div>

          {/* ================= TYPE 2. Editorial Warm Minimal ================= */}
          <div className="flex flex-col gap-3 p-4 rounded-lg bg-[#F5F2EB] border border-[#E7E5E4]">
            {/* 상단 라벨 */}
            <div className="flex items-center justify-between pb-2 border-b border-dashed border-[#D6D3D1]">
              <span className="text-xs font-mono font-black text-[#78350F] flex items-center gap-1">
                <Feather size={14} weight="bold" />
                <span>WARM EDITORIAL</span>
              </span>
              <span className="text-[10px] font-mono text-[#78716C]">Dashed Line</span>
            </div>

            {/* 카드 컴포넌트 */}
            <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#E7E5E4] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-serif font-bold italic text-[#78350F]">
                  Vol. 12 — 마음의 기록
                </span>
                <span className="text-xs font-mono text-[#78716C]">3분 읽기</span>
              </div>

              <div className="border-b border-dashed border-[#E7E5E4] pb-2">
                <h4 className="text-sm font-black text-[#1C1917] tracking-tight leading-snug">
                  단정한 하루를 여는 아침의 숨
                </h4>
                <p className="text-[11px] text-[#57534E] mt-1 leading-relaxed">
                  속도를 늦추고 차분하게 오늘의 기준점을 세웁니다.
                </p>
              </div>

              <div className="flex justify-between items-center text-xs text-[#78716C] font-serif">
                <span>실천 여정</span>
                <span className="text-[#B45309] font-bold">14일차 기록 중</span>
              </div>

              <button
                type="button"
                className="w-full py-2.5 rounded-md bg-[#1C1917] text-[#FAF8F5] font-bold text-xs hover:bg-stone-800 transition-colors"
              >
                기록 페이지 열기 →
              </button>
            </div>
          </div>

          {/* ================= TYPE 3. Bold Neo-Brutalism (오리지널 오렌지) ================= */}
          <div className="flex flex-col gap-3 p-4 rounded-xl bg-[#FFFBEB] border-2 border-black shadow-hard-drop">
            {/* 상단 라벨 */}
            <div className="flex items-center justify-between pb-2 border-b-2 border-black">
              <span className="text-xs font-black text-black flex items-center gap-1">
                <Flame size={15} weight="fill" className="text-[#FF5722]" />
                <span>BRUTAL (ORANGE)</span>
              </span>
              <span className="text-[10px] font-black bg-black text-white px-1.5 py-0.5 rounded">
                2px Solid
              </span>
            </div>

            {/* 카드 컴포넌트 */}
            <div className="p-4 rounded-xl bg-white border-2 border-black shadow-hard-drop-sm flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#FF5722] text-white border border-black">
                  LEVEL UP!
                </span>
                <span className="text-xs font-black text-black font-mono">+100 EXP</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#FEF08A] border-2 border-black flex items-center justify-center font-black text-base shadow-hard-drop-sm shrink-0">
                  🔥
                </div>
                <div>
                  <h4 className="text-sm font-black text-black uppercase tracking-tight">
                    스트레스 분쇄기
                  </h4>
                  <p className="text-[11px] font-bold text-gray-700">고민을 파쇄하고 비우기</p>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-[#E0E7FF] border-2 border-black font-black text-xs text-black flex justify-between">
                <span>STREAK</span>
                <span>7 DAYS 🔥</span>
              </div>

              <button
                type="button"
                className="w-full py-2.5 rounded-lg bg-[#FF5722] text-white font-black text-xs border-2 border-black shadow-hard-drop-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              >
                파쇄 모드 가동하기!
              </button>
            </div>
          </div>

          {/* ================= TYPE 4. Neo-Brutalism + 브랜드 그린 (#00C474) (★요청) ================= */}
          <div className="flex flex-col gap-3 p-4 rounded-xl bg-[#FFFBEB] border-2 border-black shadow-hard-drop">
            {/* 상단 라벨 */}
            <div className="flex items-center justify-between pb-2 border-b-2 border-black">
              <span className="text-xs font-black text-black flex items-center gap-1">
                <Lightning size={15} weight="fill" className="text-[#00C474]" />
                <span className="tracking-tight">BRUTAL (BRAND)</span>
              </span>
              <span className="text-[10px] font-black bg-[#00C474] text-black border border-black px-1.5 py-0.5 rounded">
                Point Only
              </span>
            </div>

            {/* 카드 컴포넌트 */}
            <div className="p-4 rounded-xl bg-white border-2 border-black shadow-hard-drop-sm flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#00C474] text-black border border-black font-mono tracking-tight">
                  LEVEL UP!
                </span>
                <span className="text-xs font-black text-black font-mono tracking-tight">+100 EXP</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#FEF08A] border-2 border-black flex items-center justify-center font-black text-base shadow-hard-drop-sm shrink-0">
                  🔥
                </div>
                <div>
                  <h4 className="text-sm font-black text-black uppercase tracking-tight">
                    스트레스 분쇄기
                  </h4>
                  <p className="text-[11px] font-bold text-gray-700">고민을 파쇄하고 비우기</p>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-[#E0E7FF] border-2 border-black font-black text-xs text-black flex justify-between">
                <span>STREAK</span>
                <span>7 DAYS 🔥</span>
              </div>

              <button
                type="button"
                className="w-full py-2.5 rounded-lg bg-[#00C474] text-black font-black text-xs border-2 border-black shadow-hard-drop-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-[#00d880] transition-all cursor-pointer"
              >
                파쇄 모드 가동하기!
              </button>
            </div>
          </div>

          {/* ================= TYPE 5. Deep Studio Midnight ================= */}
          <div className="flex flex-col gap-3 p-4 rounded-xl bg-[#0B0F19] text-white border border-white/15 shadow-neon-glow">
            {/* 상단 라벨 */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-mono font-bold text-[#38BDF8] flex items-center gap-1">
                <Sparkle size={14} weight="fill" />
                <span>STUDIO MIDNIGHT</span>
              </span>
              <span className="text-[10px] font-mono text-gray-400">Glass Rim</span>
            </div>

            {/* 카드 컴포넌트 */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 backdrop-blur-md flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  LIVE SESSION
                </span>
                <span className="text-xs font-mono text-gray-400">432Hz Audio</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-sm font-bold text-sm">
                  🎧
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    알파파 딥 이완
                  </h4>
                  <p className="text-[11px] text-gray-400">수면 뇌파 동기화 세션</p>
                </div>
              </div>

              {/* 스펙트럼 인디케이터 */}
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between font-mono text-xs">
                <span className="text-gray-400">AUDIO ENGINE</span>
                <span className="font-bold text-emerald-400">SPATIAL 3D</span>
              </div>

              <button
                type="button"
                className="w-full py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs hover:bg-emerald-400 transition-colors shadow-sm"
              >
                음원 재생하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. 보더(Border) & 스트로크 두께 규격 스튜디오 */}
      <div className="bg-theme-card p-6 rounded-3xl border border-theme-subtle shadow-xs space-y-4">
        <div className="border-b border-theme-subtle pb-3">
          <h3 className="text-base font-black text-gray-900 tracking-tight">
            보더(Border) 두께 및 스트로크 패턴 명세
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            무경계(Borderless) 일변도를 탈피하여 제품 목적에 따라 선택 가능한 5단계 스트로크 시스템입니다.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-1">
          <div className="p-4 rounded-xl bg-white border-[0.5px] border-slate-300 text-center flex flex-col items-center justify-center gap-1">
            <span className="text-xs font-bold text-gray-900">0.5px Hairline</span>
            <span className="text-[10px] text-gray-400 font-mono">핀테크 정밀 라인</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 text-center flex flex-col items-center justify-center gap-1">
            <span className="text-xs font-bold text-gray-900">1px Standard</span>
            <span className="text-[10px] text-gray-400 font-mono">표준 카드 경계</span>
          </div>

          <div className="p-4 rounded-xl bg-white border-2 border-slate-800 text-center flex flex-col items-center justify-center gap-1">
            <span className="text-xs font-bold text-gray-900">2px Bold</span>
            <span className="text-[10px] text-gray-400 font-mono">강조 포커스 라인</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-dashed border-stone-400 text-center flex flex-col items-center justify-center gap-1">
            <span className="text-xs font-bold text-gray-900">1px Dashed</span>
            <span className="text-[10px] text-gray-400 font-mono">에디토리얼 절취선</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-white/20 text-center flex flex-col items-center justify-center gap-1 shadow-sm">
            <span className="text-xs font-bold text-white">Glass Specular</span>
            <span className="text-[10px] text-emerald-400 font-mono">다크 글래스 림</span>
          </div>
        </div>
      </div>
    </section>
  );
}
