"use client";

import React from "react";

export function RadiusSystemSection() {
  const radiusList = [
    {
      name: "Extra Large (24px / 1.5rem)",
      token: "var(--radius-xl)",
      class: "rounded-3xl",
      desc: "메인 카드 패널 (Card.tsx), 모달 컨테이너, 대형 섹션 래퍼",
      concentric: "Outer Container (Padding 16~20px 적용 시 Inner와 동심원 조화)",
      example: "rounded-3xl (p-5)",
    },
    {
      name: "Large (16px / 1.0rem)",
      token: "var(--radius-lg)",
      class: "rounded-2xl",
      desc: "Form Input, Select (GodSelect), 중형 버튼, 소형 모듈 카드",
      concentric: "Inner Element (Outer 24px - Padding 8px = 16px 곡률 매칭)",
      example: "rounded-2xl (py-3.5)",
    },
    {
      name: "Medium (12px / 0.75rem)",
      token: "var(--radius-md)",
      class: "rounded-xl",
      desc: "소형 아이콘 박스, 팝오버 드롭다운 옵션, 서브 버튼",
      concentric: "Inner Control (Outer 16px - Padding 4px = 12px 곡률 매칭)",
      example: "rounded-xl (p-2.5)",
    },
    {
      name: "Small (8px / 0.5rem)",
      token: "var(--radius-sm)",
      class: "rounded-lg",
      desc: "체크박스, 소형 태그, 태스크 칩, 마이크로 이모지 박스",
      concentric: "Micro Control (Outer 12px - Padding 4px = 8px 곡률 매칭)",
      example: "rounded-lg (p-1.5)",
    },
    {
      name: "Full / Pill (9999px)",
      token: "var(--radius-full)",
      class: "rounded-full",
      desc: "뱃지 (Badge.tsx), 프로필 아바타, 캡슐 칩, 둥근 아이콘 링",
      concentric: "Pill Shape (항상 완벽한 원형/알약 형태 유해)",
      example: "rounded-full (px-3 py-1.5)",
    },
  ];

  return (
    <section id="radius" className="scroll-mt-24">
      <div className="border-b border-gray-200 pb-3 mb-6 text-left">
        <h2 className="text-xl font-black text-[#191F28] flex items-center gap-2">
          <span className="w-2.5 h-6 bg-[#00C474] rounded-full inline-block" />
          📐 Concentric Border-Radius System Scale
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          컴포넌트 크기 및 중첩(Nesting) 관계에 따른 동심원 곡률(<code className="font-mono text-[var(--color-brand-green)] font-bold">innerRadius = outerRadius - padding</code>) 표준 명세
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {radiusList.map((item) => (
          <div
            key={item.name}
            className="bg-white border border-gray-200 p-5 rounded-2xl shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-left"
          >
            {/* 곡률 체감용 예시 박스 */}
            <div className="flex items-center gap-4 shrink-0">
              <div
                className={`w-16 h-16 bg-gradient-to-br from-emerald-50 to-teal-100/60 border-2 border-[var(--color-brand-green)] flex items-center justify-center font-mono font-black text-xs text-[var(--color-forest-green)] shadow-2xs ${item.class}`}
              >
                {item.class}
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-900">{item.name}</h3>
                <span className="text-xs font-mono text-[var(--color-brand-green)] font-extrabold block mt-0.5">
                  {item.token} · {item.example}
                </span>
              </div>
            </div>

            {/* 설명 및 Concentric 지침 */}
            <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0 md:pl-6 max-w-lg">
              <span className="text-xs font-bold text-gray-800">{item.desc}</span>
              <span className="text-[11px] text-gray-500 mt-1 font-medium leading-relaxed">
                💡 <strong className="text-emerald-700 font-extrabold">동심원 지침:</strong> {item.concentric}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
