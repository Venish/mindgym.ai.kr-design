"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "@phosphor-icons/react";
import { useModalStore } from "@/store/useModalStore";
import { CommonRitualSheet } from "@/components/dashboard/CommonRitualSheet";
import { FooterMoreSheet } from "@/components/dashboard/FooterMoreSheet";
import { RitualRainbowIconCard, RitualSlateIconCard } from "@/components/ui/RitualGlassIconCard";

// 등록 아이콘 2개 데이터셋 (미소 명상, 스트레스 분쇄)
const RITUAL_LIST = [
  { id: "RT-001", title: "미소 명상", iconNum: 1, cat: "휴식과 충전", time: "3분", desc: "얼굴 근육의 긴장을 풀고 평온한 활력을 채우는 아침 미소 명상입니다." },
  { id: "RT-018", title: "스트레스 분쇄", iconNum: 8, cat: "스트레스 비우기", time: "2분", desc: "나를 괴롭히는 감정을 종이에 적어 물리적으로 파쇄하고 가볍게 비워내는 리추얼입니다." },
];

/**
 * ShowcaseFixedBottomBar: 12개 아이콘 다행(Multi-row) 가변 동적 높이 푸터 바
 * - 1행: [더보기 로고 버튼 1개] + [아이콘 4개] (총 5슬롯)
 * - 2행~3행: 1행당 5개 아이콘씩 5열 그리드로 자동 배치
 * - 펼침 시 상단 "내가 저장한 리추얼 목록" 헤더 + X (닫기 버튼) 노출
 */
export function ShowcaseFixedBottomBar() {
  const router = useRouter();
  const { openModal, clearModals } = useModalStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const totalCount = RITUAL_LIST.length; // 12개
  const rowCount = totalCount <= 4 ? 1 : 1 + Math.ceil((totalCount - 4) / 5);
  // 펼침 시 아이콘 행 높이(rowCount * 5.8rem) + 하단 전체보기 버튼 공간(4.2rem)
  const expandedHeightRem = rowCount * 5.8 + 4.2;
  const currentHeightStyle = isExpanded ? `${expandedHeightRem}rem` : "5.8rem";

  // 첫 번째 행용 아이콘 (메인 메뉴 2개 노출)
  const firstRowRituals = RITUAL_LIST.slice(0, 2);
  const firstRowEmptyCount = Math.max(0, 4 - firstRowRituals.length); // 2개 빈 슬롯
  const firstRowEmptySlots = Array.from({ length: firstRowEmptyCount });

  // 2번째 행 이상용 아이콘 (2개 초과분)
  const subsequentRituals = RITUAL_LIST.slice(2);

  const handleOpenRitual = (r: (typeof RITUAL_LIST)[0]) => {
    openModal({
      type: "slide-left",
      content: (
        <CommonRitualSheet
          ritualId={r.id}
          ritualTitle={r.title}
          ritualCategory={r.cat}
          ritualTime={r.time}
          description={r.desc}
        />
      ),
    });
  };

  const handleOpenFullLibrary = () => {
    setIsExpanded(false);
    openModal({
      type: "slide-up",
      content: <FooterMoreSheet />,
      onClose: () => {
        setIsExpanded(false);
      },
    });
  };

  return (
    <div
      style={{ height: currentHeightStyle }}
      className="fixed bottom-0 left-0 right-0 max-w-[430px] w-full mx-auto z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/80 shadow-2xl rounded-t-3xl transition-all duration-300 ease-out select-none flex flex-col justify-between px-3 py-2.5 overflow-hidden gap-2"
    >
      <div className="flex flex-col gap-3 w-full shrink-0">
        {/* ================= 1st Row (항상 5개 슬롯 충진: 1버튼 + 4아이콘) ================= */}
        <div className="w-full grid grid-cols-5 gap-2 items-center justify-items-center shrink-0">
          {/* 1열: 더보기/접기 로고 버튼 */}
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="flex flex-col items-center justify-center shrink-0 group outline-none cursor-pointer"
            title={isExpanded ? "푸터 접기" : "푸터 12개 아이콘 전체 펼치기"}
          >
            <div className="flex flex-col items-center justify-center w-[3.6rem] h-[3.6rem] rounded-2xl bg-white group-hover:bg-emerald-50/50 group-hover:border-emerald-300 border border-gray-200 shadow-2xs transition-colors">
              <img
                src="/images/logo_icon.svg"
                alt="MindGym Logo"
                className="w-6 h-6 object-contain"
              />
            </div>
            <span className="text-[10px] font-bold text-gray-700 tracking-tight mt-1 group-hover:text-[#00C474] transition-colors leading-tight">
              {isExpanded ? "접기" : "더보기"}
            </span>
          </button>

          {/* 2~5열: 첫 번째 행의 리추얼 아이콘 4개 (1번째는 월간 리추얼: 색상 테두리 적용) */}
          {firstRowRituals.map((r, idx) => (
            <div
              key={r.id}
              onClick={() => handleOpenRitual(r)}
              className="shrink-0 cursor-pointer"
              title={idx === 0 ? `[월간 대표 리추얼] ${r.title}` : r.title}
            >
              {idx === 0 ? (
                <RitualRainbowIconCard
                  name={r.title}
                  icon={r.iconNum}
                  size="sm"
                />
              ) : (
                <RitualSlateIconCard
                  name={r.title}
                  icon={r.iconNum}
                  size="sm"
                />
              )}
            </div>
          ))}

          {/* 4개 미만일 때 부족한 칸을 채우는 빈 점선 박스 */}
          {firstRowEmptySlots.map((_, idx) => (
            <button
              key={`empty-1st-${idx}`}
              type="button"
              onClick={() => {
                clearModals();
                router.push("/ritual");
              }}
              className="flex flex-col items-center justify-center shrink-0 group outline-none cursor-pointer"
              title="리추얼 추가하기 (빈 슬롯)"
            >
              <div className="flex items-center justify-center w-[3.6rem] h-[3.6rem] rounded-2xl border-2 border-dashed border-gray-300 group-hover:border-emerald-300 bg-gray-50/50 group-hover:bg-emerald-50/50 text-gray-400 group-hover:text-[#00C474] transition-all">
                <Plus size={22} weight="bold" className="text-gray-400 group-hover:text-[#00C474] transition-colors" />
              </div>
              <span className="h-[14px] mt-1 block" aria-hidden="true" />
            </button>
          ))}
        </div>

        {/* ================= 2nd Row & Beyond (isExpanded일 때만 5열 그리드로 노출) ================= */}
        {isExpanded && subsequentRituals.length > 0 && (
          <div className="w-full grid grid-cols-5 gap-y-3 gap-x-2 items-center justify-items-center shrink-0 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {subsequentRituals.map((r) => (
              <div
                key={r.id}
                onClick={() => handleOpenRitual(r)}
                className="shrink-0 cursor-pointer"
                title={r.title}
              >
                <RitualSlateIconCard
                  name={r.title}
                  icon={r.iconNum}
                  size="sm"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= isExpanded 일 때 최하단에 항상 표출되는 [전체 리추얼 보기] 버튼 ================= */}
      {isExpanded && (
        <div className="w-full my-3 pt-2 pb-3 flex justify-center shrink-0 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <button
            type="button"
            onClick={handleOpenFullLibrary}
            className="px-6 py-2.5 bg-emerald-50 hover:bg-emerald-100/90 text-emerald-800 font-extrabold text-xs rounded-full transition-all cursor-pointer text-center active:scale-95 border-none shadow-none"
          >
            전체 리추얼 보기
          </button>
        </div>
      )}
    </div>
  );
}
