"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RitualCard, RitualIconType } from "@/components/common/RitualCard";
import { AuroraText } from "@/components/godui/AuroraText";
import { MagicButton } from "@/components/godui/MagicButton";
import { CaretLeft, Sparkle } from "@phosphor-icons/react";

export default function RitualComponentGuidePage() {
  const [selectedRitual, setSelectedRitual] = useState<string>("diary");

  const sampleRituals: Array<{
    id: string;
    title: string;
    level: string;
    duration: string;
    reward: string;
    description: string;
    icon: RitualIconType;
    badge: string;
  }> = [
    {
      id: "diary",
      title: "마음일기 (하루 5분)",
      level: "중급",
      duration: "한달 지속",
      reward: "+30 덤벨/월",
      description: "매일 5분, 오늘의 감정과 생각을 3줄로 적는 루틴이에요. 꾸준히 하면 자기 인식이 크게 높아져요.",
      icon: "notebook",
      badge: "인기 1위",
    },
    {
      id: "meditation",
      title: "아침 마인드풀니스 명상",
      level: "초급",
      duration: "2주 지속",
      reward: "+15 덤벨/주",
      description: "기상 직후 3분간 깊은 호흡에 집중하여 하룻동안 안정된 심리 상태를 유지해요.",
      icon: "sun",
      badge: "추천",
    },
    {
      id: "grounding",
      title: "감정 그라운딩 3분",
      level: "초급",
      duration: "매일 진행",
      reward: "+10 덤벨/일",
      description: "불안이나 스트레스가 몰려올 때 감각에 집중하여 일상으로 부드럽게 복귀합니다.",
      icon: "brain",
      badge: "쉬움",
    },
    {
      id: "reading",
      title: "마음건강 짧은 독서",
      level: "고급",
      duration: "한달 지속",
      reward: "+45 덤벨/월",
      description: "하루 한 단락의 통찰 깊은 인문서 문장을 읽고 오늘의 느낀 점을 1줄 남깁니다.",
      icon: "book",
      badge: "도전",
    },
  ];

  return (
    <div className="w-full flex-1 flex flex-col gap-6 px-5 py-6 bg-gray-50/50 min-h-screen text-left">
      {/* 상단 가이드 헤더 */}
      <div className="flex items-center justify-between border-b border-gray-200/80 pb-4">
        <Link
          href="/preview"
          className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors"
        >
          <CaretLeft size={16} />
          프리뷰 목록으로 돌아가기
        </Link>
        <span className="text-[11px] font-black text-[#00C474] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
          DESIGN SYSTEM SAMPLE
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs font-black text-[#00C474] uppercase tracking-wider flex items-center gap-1.5">
          <Sparkle size={14} weight="fill" />
          RITUAL COMPONENT SYSTEM
        </span>
        <h1 className="text-2xl font-black text-gray-900 leading-tight">
          리추얼 <AuroraText>디자인 가이드 샘플</AuroraText>
        </h1>
        <p className="text-xs text-gray-500 font-medium">
          Phosphor Icons 연동 및 detailed, compact, icon-only 3가지 컴포넌트 변형 가이드입니다.
        </p>
      </div>

      {/* 1. 상세 카드 버전 (detailed Variant) */}
      <section className="flex flex-col gap-3 bg-white p-5 rounded-3xl border border-gray-200/80 shadow-soft">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
          <span className="text-xs font-black text-gray-900">1. 상세 카드 형태 (variant="detailed")</span>
          <span className="text-[10px] text-gray-400 font-bold">대표 카드로 사용</span>
        </div>

        <div className="flex flex-col gap-3">
          {sampleRituals.slice(0, 2).map((item) => (
            <RitualCard
              key={item.id}
              variant="detailed"
              title={item.title}
              level={item.level}
              duration={item.duration}
              reward={item.reward}
              description={item.description}
              icon={item.icon}
              badge={item.badge}
              categoryTag="차분한 의도 추천 리추얼"
              selected={selectedRitual === item.id}
              onClick={() => setSelectedRitual(item.id)}
            />
          ))}
        </div>
      </section>

      {/* 2. 한 줄 콤팩트 버전 (compact Variant) */}
      <section className="flex flex-col gap-3 bg-white p-5 rounded-3xl border border-gray-200/80 shadow-soft">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
          <span className="text-xs font-black text-gray-900">2. 한 줄 리스트 형태 (variant="compact")</span>
          <span className="text-[10px] text-gray-400 font-bold">목록/선택형 리스트</span>
        </div>

        <div className="flex flex-col gap-2.5">
          {sampleRituals.map((item) => (
            <RitualCard
              key={item.id}
              variant="compact"
              title={item.title}
              level={item.level}
              duration={item.duration}
              reward={item.reward}
              icon={item.icon}
              selected={selectedRitual === item.id}
              onClick={() => setSelectedRitual(item.id)}
            />
          ))}
        </div>
      </section>

      {/* 3. 아이콘 전용 미니 버전 (icon-only Variant) */}
      <section className="flex flex-col gap-3 bg-white p-5 rounded-3xl border border-gray-200/80 shadow-soft">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
          <span className="text-xs font-black text-gray-900">3. 아이콘 칩 형태 (variant="icon-only")</span>
          <span className="text-[10px] text-gray-400 font-bold">Phosphor Icons 칩</span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {(["notebook", "sun", "brain", "book", "sparkle", "feather", "heart", "flame"] as RitualIconType[]).map(
            (iconType, idx) => (
              <RitualCard
                key={idx}
                variant="icon-only"
                title=""
                icon={iconType}
                badge={idx === 0 ? "1위" : undefined}
                selected={idx === 0}
              />
            )
          )}
        </div>
      </section>

      {/* 테스트 가이드 액션 */}
      <div className="pt-2">
        <Link href="/onboarding/monthly-start">
          <MagicButton className="w-full">
            <span>이달의 나 적용 페이지 보러가기</span>
          </MagicButton>
        </Link>
      </div>
    </div>
  );
}
