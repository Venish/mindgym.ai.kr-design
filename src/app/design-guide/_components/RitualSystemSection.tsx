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
          <code className="font-mono bg-gray-100 px-1 py-0.5 rounded text-emerald-600">RitualCard</code> 공통 컴포넌트 4가지 변형 스펙 샘플 (<code className="font-mono text-gray-700">detailed</code>, <code className="font-mono text-gray-700">compact</code>, <code className="font-mono text-gray-700">icon-only</code>, <code className="font-mono text-emerald-600 font-bold">pure-icon</code>)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 1. Detailed Variant */}
        <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-xs flex flex-col gap-3">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-xs font-black text-gray-900 font-mono">1. variant="detailed"</span>
            <span className="text-[10px] text-gray-400 font-bold">메인 추천 카드</span>
          </div>
          <RitualCard
            variant="detailed"
            title="마음일기 (하루 5분)"
            level="중급"
            duration="한달 지속"
            reward="+30 덤벨/월"
            description="매일 5분, 오늘의 감정과 생각을 3줄로 적는 루틴이에요. 자기 인식이 크게 높아집니다."
            icon="notebook"
            badge="인기 1위"
            categoryTag="차분한 의도 추천 리추얼"
            selected={selectedRitual === "diary"}
            onClick={() => setSelectedRitual("diary")}
          />
        </div>

        {/* 2. Compact Variant */}
        <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-xs flex flex-col gap-3">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-xs font-black text-gray-900 font-mono">2. variant="compact"</span>
            <span className="text-[10px] text-gray-400 font-bold">목록/선택형 리스트</span>
          </div>
          <div className="flex flex-col gap-2">
            <RitualCard
              variant="compact"
              title="아침 마인드풀니스 명상"
              level="초급"
              duration="2주 지속"
              reward="+15 덤벨"
              icon="sun"
              selected={selectedRitual === "meditation"}
              onClick={() => setSelectedRitual("meditation")}
            />
            <RitualCard
              variant="compact"
              title="감정 그라운딩 3분"
              level="초급"
              duration="매일 진행"
              reward="+10 덤벨"
              icon="brain"
              selected={selectedRitual === "grounding"}
              onClick={() => setSelectedRitual("grounding")}
            />
          </div>
        </div>

        {/* 3. Icon-Only Variant (박스 포함) */}
        <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-xs flex flex-col gap-3">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-xs font-black text-gray-900 font-mono">3. variant="icon-only"</span>
            <span className="text-[10px] text-gray-400 font-bold">박스 포함 아이콘 칩</span>
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

        {/* 4. Pure-Icon Variant (박스 없음 순수 아이콘) */}
        <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-xs flex flex-col gap-3">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-xs font-black text-[#00C474] font-mono">4. variant="pure-icon" ✨</span>
            <span className="text-[10px] text-emerald-600 font-bold">박스 없는 순수 아이콘</span>
          </div>
          <div className="flex flex-wrap gap-3 items-center justify-start">
            <RitualCard variant="pure-icon" title="미소명상" icon="smiley" badge="신규" />
            <RitualCard variant="pure-icon" title="마음일기" icon="notebook" />
            <RitualCard variant="pure-icon" title="햇살산책" icon="sun" />
            <RitualCard variant="pure-icon" title="자기자비" icon="heart" />
            <RitualCard variant="pure-icon" title="불안계산" icon="brain" />
            <RitualCard variant="pure-icon" title="열정루틴" icon="flame" />
          </div>
        </div>
      </div>
    </section>
  );
}
