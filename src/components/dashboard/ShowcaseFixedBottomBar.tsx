"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "@phosphor-icons/react";
import { useModalStore } from "@/store/useModalStore";
import { CommonRitualSheet } from "@/components/dashboard/CommonRitualSheet";
import { FooterMoreSheet } from "@/components/dashboard/FooterMoreSheet";
import { RitualRainbowIconCard, RitualSlateIconCard } from "@/components/ui/RitualGlassIconCard";

// 테스트용 등록 아이콘 12개 데이터셋
const RITUAL_LIST = [
  { id: "RT-001", title: "미소 명상", iconNum: 1, cat: "휴식과 충전", time: "3분", desc: "입가에 옅은 미소를 지으며 얼굴 근육의 긴장을 푸는 미소 명상입니다." },
  { id: "RT-012", title: "마음일기", iconNum: 12, cat: "자책", time: "5분", desc: "세상의 비난 속에서도 나만의 다정한 변호인이 되어 일기를 씁니다." },
  { id: "RT-004", title: "횡경막 호흡", iconNum: 4, cat: "불안", time: "1분", desc: "아랫배 깊숙이 들이마시고 내쉬는 호흡 감각에 집중해 심박수를 낮춥니다." },
  { id: "RT-010", title: "333 나비포옹", iconNum: 10, cat: "불안", time: "1분", desc: "양팔을 교차해 스스로 양어깨를 번갈아 다독이며 불안 요소를 잠재웁니다." },
  { id: "RT-003", title: "시선고정 명상", iconNum: 3, cat: "휴식", time: "1분", desc: "사물 하나에 1분간 시선을 고정하는 명상입니다." },
  { id: "RT-024", title: "마음선물", iconNum: 24, cat: "감정", time: "1분", desc: "오늘 내 마음의 온도를 시각화해서 기록합니다." },
  { id: "RT-028", title: "분노일기", iconNum: 28, cat: "수용", time: "3분", desc: "솔직한 분노 후 감정을 수용하는 일기를 씁니다." },
  { id: "RT-037", title: "셀프 QnA", iconNum: 37, cat: "질문", time: "3분", desc: "나에게 번갈아 묻고 답하는 인터뷰를 진행합니다." },
  { id: "RT-046", title: "바디스캔", iconNum: 46, cat: "이완", time: "5분", desc: "머리부터 발끝까지 감각을 관찰하는 이완 세션입니다." },
  { id: "RT-050", title: "맨발산책", iconNum: 50, cat: "산책", time: "5분", desc: "아무것도 들지 않고 발바닥을 느끼며 걷습니다." },
  { id: "RT-061", title: "친절수집함", iconNum: 61, cat: "연결", time: "2분", desc: "오늘 타인에게 받은 온기를 수집하는 함입니다." },
  { id: "RT-071", title: "3-2-1 그라운딩", iconNum: 71, cat: "기록", time: "2분", desc: "보이는 것 3개, 들리는 것 2개, 맛 1개를 기록합니다." },
];

/**
 * ShowcaseFixedBottomBar: 12개 아이콘 다행(Multi-row) 가변 동적 높이 푸터 바
 * - 1행: [더보기 로고 버튼 1개] + [아이콘 4개] (총 5슬롯)
 * - 2행~3행: 1행당 5개 아이콘씩 5열 그리드로 자동 배치
 * - 펼침 시 상단 "내가 저장한 리추얼 목록" 헤더 + X (닫기 버튼) 노출
 */
export function ShowcaseFixedBottomBar() {
  const router = useRouter();
  const { openModal } = useModalStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const totalCount = RITUAL_LIST.length; // 12개
  const rowCount = totalCount <= 4 ? 1 : 1 + Math.ceil((totalCount - 4) / 5);
  // 펼침 시 아이콘 행 높이(rowCount * 5.8rem) + 하단 전체보기 버튼 공간(4.2rem)
  const expandedHeightRem = rowCount * 5.8 + 4.2;
  const currentHeightStyle = isExpanded ? `${expandedHeightRem}rem` : "5.8rem";

  // 첫 번째 행용 아이콘 (최대 4개)
  const firstRowRituals = RITUAL_LIST.slice(0, 4);
  const firstRowEmptyCount = Math.max(0, 4 - firstRowRituals.length);
  const firstRowEmptySlots = Array.from({ length: firstRowEmptyCount });

  // 2번째 행 이상용 아이콘 (4개 초과분)
  const subsequentRituals = RITUAL_LIST.slice(4);

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
              onClick={() => router.push("/ritual")}
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
