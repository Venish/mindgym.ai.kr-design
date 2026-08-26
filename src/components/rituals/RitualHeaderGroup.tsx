import React from "react";

interface RitualHeaderGroupProps {
  category: string;
  title: string;
  time?: string;
  level?: string;
  period?: string;
  reward?: string;
  description: string;
  hideMetaChips?: boolean;
  className?: string;
}

/**
 * RitualHeaderGroup: 리추얼 공통 상단 헤더 그룹 컴포넌트
 * - 1) 카테고리 뱃지
 * - 2) 대형 메인 타이틀
 * - 3) 4개 멀티컬러 메타 칩 (시간 / 난이도 / 주기 / 보상 - hideMetaChips로 지우기 가능)
 * - 4) 서브 설명 문구
 */
export function RitualHeaderGroup({
  category,
  title,
  time = "",
  level = "",
  period = "",
  reward = "",
  description,
  hideMetaChips = false,
  className = "",
}: RitualHeaderGroupProps) {
  return (
    <div className={`flex flex-col items-center gap-1.5 text-center max-w-sm w-full mx-auto pb-2.5 ${className}`}>
      {/* 1. 카테고리 뱃지 */}
      <div className="flex items-center justify-center mb-0.5">
        <span className="text-xs font-extrabold text-[#00C474] bg-emerald-50 px-3.5 py-1 rounded-full">
          {category}
        </span>
      </div>

      {/* 2. 대형 리추얼 타이틀 */}
      <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-tight text-center">
        {title}
      </h1>

      {/* 3. 4개 멀티컬러 메타 칩 (hideMetaChips가 false일 때만 노출) */}
      {!hideMetaChips && (
        <div className="flex items-center justify-center gap-2 py-0.5">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-amber-100/90 text-center shadow-2xs shrink-0">
            <span className="text-xs font-bold text-gray-900">{time}</span>
          </div>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-purple-100/90 text-center shrink-0">
            <span className="text-xs font-bold text-gray-900">{level}</span>
          </div>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-sky-100/90 text-center shrink-0">
            <span className="text-xs font-bold text-gray-900">{period}</span>
          </div>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-rose-200/90 text-center shadow-xs shrink-0">
            <span className="text-xs font-bold text-gray-900">{reward}</span>
          </div>
        </div>
      )}

      {/* 4. 본문 설명 문구 (위쪽 패딩 줄이고 아래쪽 패딩 늘림) */}
      <p className="text-sm font-medium text-gray-600 leading-relaxed tracking-normal text-center pt-0.5 pb-2.5">
        {description}
      </p>
    </div>
  );
}
