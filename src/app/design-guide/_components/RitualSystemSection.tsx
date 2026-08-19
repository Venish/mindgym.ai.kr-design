"use client";

import React, { useState } from "react";
import { RitualCard, RitualIconType } from "@/components/common/RitualCard";

export function RitualSystemSection() {
  const [selectedRitual, setSelectedRitual] = useState<string>("diary");

  return (
    <section id="rituals" className="scroll-mt-24">
      <div className="border-b border-gray-200 pb-3 mb-6">
        <h2 className="text-xl font-black text-[#191F28] flex items-center gap-2">
          <span className="w-2.5 h-6 bg-[#00C474] rounded-full inline-block" />
          5. Ritual Component System (`RitualCard`)
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          <code className="font-mono bg-gray-100 px-1 py-0.5 rounded text-emerald-600">RitualCard</code> 공통 컴포넌트 5가지 변형 스펙 샘플 (<code className="font-mono text-gray-700">detailed</code>, <code className="font-mono text-gray-700">compact</code>, <code className="font-mono text-gray-700">icon-only</code>, <code className="font-mono text-gray-700">pure-icon</code>, <code className="font-mono text-emerald-600 font-bold">raw-icon</code>)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* 1. Detailed Variant */}
        <div className="bg-white border border-gray-200 rounded-3xl p-4 shadow-xs flex flex-col gap-3">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-xs font-black text-gray-900 font-mono">1. detailed</span>
            <span className="text-[10px] text-gray-400 font-bold">메인 카드</span>
          </div>
          <RitualCard
            variant="detailed"
            title="마음일기 (5분)"
            level="중급"
            duration="한달"
            reward="+30"
            description="오늘의 감정을 3줄로 적는 루틴"
            icon="notebook"
            badge="1위"
            categoryTag="추천 리추얼"
            selected={selectedRitual === "diary"}
            onClick={() => setSelectedRitual("diary")}
          />
        </div>

        {/* 2. Compact Variant */}
        <div className="bg-white border border-gray-200 rounded-3xl p-4 shadow-xs flex flex-col gap-3">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-xs font-black text-gray-900 font-mono">2. compact</span>
            <span className="text-[10px] text-gray-400 font-bold">리스트</span>
          </div>
          <div className="flex flex-col gap-2">
            <RitualCard
              variant="compact"
              title="아침 명상"
              level="초급"
              duration="2주"
              reward="+15"
              icon="sun"
              selected={selectedRitual === "meditation"}
              onClick={() => setSelectedRitual("meditation")}
            />
            <RitualCard
              variant="compact"
              title="그라운딩 3분"
              level="초급"
              duration="매일"
              reward="+10"
              icon="brain"
              selected={selectedRitual === "grounding"}
              onClick={() => setSelectedRitual("grounding")}
            />
          </div>
        </div>

        {/* 3. Icon-Only Variant (박스 포함) */}
        <div className="bg-white border border-gray-200 rounded-3xl p-4 shadow-xs flex flex-col gap-3">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-xs font-black text-gray-900 font-mono">3. icon-only</span>
            <span className="text-[10px] text-gray-400 font-bold">박스 아이콘</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["notebook", "sun", "brain", "book", "sparkle", "feather"] as RitualIconType[]).map(
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
        </div>

        {/* 4. Pure-Icon Variant (버튼형 호버) */}
        <div className="bg-white border border-gray-200 rounded-3xl p-4 shadow-xs flex flex-col gap-3">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-xs font-black text-gray-900 font-mono">4. pure-icon</span>
            <span className="text-[10px] text-gray-400 font-bold">라벨 아이콘</span>
          </div>
          <div className="flex flex-wrap gap-2 items-center justify-start">
            <RitualCard variant="pure-icon" title="미소" icon="smiley" badge="N" />
            <RitualCard variant="pure-icon" title="일기" icon="notebook" />
            <RitualCard variant="pure-icon" title="산책" icon="sun" />
            <RitualCard variant="pure-icon" title="자비" icon="heart" />
          </div>
        </div>

        {/* 5. Raw-Icon Variant (카드 대입용 순수 그래픽) */}
        <div className="bg-white border border-gray-200 rounded-3xl p-4 shadow-xs flex flex-col gap-3">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-xs font-black text-[#00C474] font-mono">5. raw-icon ✨</span>
            <span className="text-[10px] text-emerald-600 font-bold">카드 대입용 순수 그래픽</span>
          </div>
          <p className="text-[11px] text-gray-500 font-medium">hover/박스/텍스트 없는 커스텀 카드 내 삽입용 그래픽</p>
          <div className="flex flex-wrap gap-3 items-center justify-center p-3 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <RitualCard variant="raw-icon" icon="smiley" size={36} />
            <RitualCard variant="raw-icon" icon="notebook" size={36} />
            <RitualCard variant="raw-icon" icon="sun" size={36} />
            <RitualCard variant="raw-icon" icon="heart" size={36} />
            <RitualCard variant="raw-icon" icon="brain" size={36} />
            <RitualCard variant="raw-icon" icon="flame" size={36} />
          </div>
        </div>
      </div>
    </section>
  );
}
