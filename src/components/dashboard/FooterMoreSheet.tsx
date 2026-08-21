"use client";

import React, { useState } from "react";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { useModalStore } from "@/store/useModalStore";
import { CommonRitualSheet } from "@/components/dashboard/CommonRitualSheet";

// 72가지 리추얼 샘플 카테고리 & 데이터 생성
const RITUAL_CATEGORIES = [
  "스트레스 비우기",
  "휴식과 충전",
  "자기자비 명상",
  "감정 정돈",
  "몰입과 집중",
  "관계와 경계",
];

const GENERATED_72_RITUALS = Array.from({ length: 72 }, (_, i) => {
  const num = i + 1;
  const cat = RITUAL_CATEGORIES[i % RITUAL_CATEGORIES.length];
  return {
    id: `RT-${String(num).padStart(3, "0")}`,
    title: `리추얼 ${num}호: ${cat} 쉼표`,
    category: cat,
    time: `${(i % 5) + 3}분`,
    iconNum: (i % 7) + 1,
    desc: `일상의 분주함을 멈추고 ${cat}의 감각을 깨워주는 72가지 대표 마음건강 리추얼입니다.`,
  };
});

// 유저가 저장해놓은 내 리추얼 샘플 목록 (State 1용)
const SAVED_RITUALS_SAMPLE = [
  { id: "RT-001", title: "미소 명상", category: "휴식과 충전", time: "3분", iconNum: 1, desc: "입가에 옅은 미소를 지으며 얼굴 근육의 긴장을 푸는 미소 명상입니다." },
  { id: "RT-012", title: "마음일기", category: "자책", time: "5분", iconNum: 2, desc: "세상의 비난 속에서도 나만의 다정한 변호인이 되어 일기를 씁니다." },
  { id: "RT-004", title: "횡경막 호흡", category: "불안", time: "1분", iconNum: 3, desc: "아랫배 깊숙이 들이마시고 내쉬는 호흡 감각에 집중해 심박수를 낮춥니다." },
  { id: "RT-010", title: "333 나비포옹", category: "불안", time: "1분", iconNum: 4, desc: "양팔을 교차해 스스로 양어깨를 번갈아 다독이며 불안 요소를 잠재웁니다." },
];

/**
 * FooterMoreSheet: 하단 Footer [더보기] 2단계 오버레이 모달
 * - State 1 (isFullLibrary = false): 저장된 리추얼 아담한 팝업 (하단에 '더보기' 텍스트 버튼 표출, 닫기 버튼 없음)
 * - State 2 (isFullLibrary = true): 72가지 전체 리추얼 풀 라이브러리 (위로 쭉 올라감, 좌측 상단 X 닫기 버튼 표출, 하단 더보기 버튼 삭제)
 * - 대시보드 하단 메뉴와 100% 동일한 규격(3.6rem rounded-2xl + 11px 텍스트)의 72개 리추얼 카드 전면 배치
 */
export function FooterMoreSheet() {
  const { closeModal, openModal } = useModalStore();
  const [isFullLibrary, setIsFullLibrary] = useState(false);

  const handleOpenRitual = (r: { id: string; title: string; category: string; time: string; desc: string }) => {
    openModal({
      type: "slide-left",
      content: (
        <CommonRitualSheet
          ritualId={r.id}
          ritualTitle={r.title}
          ritualCategory={r.category}
          ritualTime={r.time}
          description={r.desc}
        />
      ),
    });
  };

  return (
    <div
      className={`w-full bg-white flex flex-col select-none relative text-gray-900 transition-all duration-300 overflow-y-auto ${
        isFullLibrary ? "min-h-full pb-16" : "max-h-[52vh] min-h-[340px] pb-6"
      }`}
    >
      {/* 2단계일 때만 서브 헤더(왼쪽 상단 X 닫기 버튼 포함) 표출 */}
      {isFullLibrary && (
        <SubPageHeader
          title="전체 72가지 리추얼 라이브러리"
          leftType="close"
          onLeftClick={closeModal}
        />
      )}

      <div className="flex flex-col w-full px-5 pt-3 gap-4 text-left max-w-lg mx-auto flex-1 justify-between">
        {!isFullLibrary ? (
          /* ==================== State 1: 저장해 놓은 리추얼 아담한 팝업 ==================== */
          <div className="flex flex-col justify-between flex-1 h-full min-h-[300px] py-1">
            <div className="flex flex-col gap-3">
              {/* 상단 타이틀 (1단계에서는 닫기 버튼 없이 아담하게 제목만 노출) */}
              <div className="flex items-center justify-between pt-1 pb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00C474]" />
                  <h2 className="text-base font-extrabold text-gray-900 tracking-tight">
                    내가 저장한 리추얼 목록
                  </h2>
                </div>
                <span className="text-xs font-semibold text-gray-500">
                  {SAVED_RITUALS_SAMPLE.length}개 저장됨
                </span>
              </div>

              {/* 저장해 놓은 리추얼 아이콘 목록 (대시보드 하단 메뉴와 100% 동일 규격) */}
              <div className="w-full grid grid-cols-4 gap-3 pt-2">
                {SAVED_RITUALS_SAMPLE.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleOpenRitual(r)}
                    className="flex flex-col items-center justify-center shrink-0 transition-transform active:scale-95 group outline-none cursor-pointer"
                  >
                    <div className="flex flex-col items-center justify-center w-[3.6rem] h-[3.6rem] rounded-2xl bg-white group-hover:bg-emerald-50/50 group-hover:border-emerald-300 border border-gray-200 shadow-2xs p-0.5 transition-colors">
                      <img
                        src={`/images/icons/${r.iconNum}.png`}
                        alt={r.title}
                        className="w-11 h-11 object-contain drop-shadow-2xs"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-gray-700 tracking-tight mt-1 group-hover:text-[#00C474] transition-colors leading-tight text-center line-clamp-1">
                      {r.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 하단 더보기 텍스트 버튼 (클릭 시 위로 쭉 올라가며 2단계 72가지 전체 리추얼로 전환) */}
            <div className="w-full pt-4 pb-2 flex justify-center">
              <button
                type="button"
                onClick={() => setIsFullLibrary(true)}
                className="w-full py-3.5 bg-gray-50 hover:bg-emerald-50/80 text-gray-800 hover:text-[#00C474] font-extrabold text-sm rounded-2xl transition-all cursor-pointer text-center active:scale-98 border border-gray-100"
              >
                더보기
              </button>
            </div>
          </div>
        ) : (
          /* ==================== State 2: 72가지 전체 리추얼 풀 라이브러리 ==================== */
          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1 text-left pt-1">
              <span className="text-xs font-black text-[#00C474] uppercase tracking-wider">
                72 RITUAL LIBRARY
              </span>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                전체 72가지 마음건강 리추얼
              </h1>
              <p className="text-xs font-semibold text-gray-500">
                대시보드 하단 메뉴와 동일한 아이콘을 선택하여 바로 실천을 시작할 수 있습니다.
              </p>
            </div>

            {/* 72가지 전체 리추얼 아이콘 그리드 전면 배치 (대시보드 하단 메뉴와 100% 동일한 규격 적용) */}
            <div className="w-full grid grid-cols-4 gap-3.5 pt-2 pb-8">
              {GENERATED_72_RITUALS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleOpenRitual(r)}
                  className="flex flex-col items-center justify-center shrink-0 transition-transform active:scale-95 group outline-none cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center w-[3.6rem] h-[3.6rem] rounded-2xl bg-white group-hover:bg-emerald-50/50 group-hover:border-emerald-300 border border-gray-200 shadow-2xs p-0.5 transition-colors">
                    <img
                      src={`/images/icons/${r.iconNum}.png`}
                      alt={r.title}
                      className="w-11 h-11 object-contain drop-shadow-2xs"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-gray-700 tracking-tight mt-1 group-hover:text-[#00C474] transition-colors leading-tight text-center line-clamp-1">
                    {r.title.split(":")[1]?.trim() || r.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
