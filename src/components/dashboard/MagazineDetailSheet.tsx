"use client";

import React from "react";
import Image from "next/image";
import { BookOpen, BookmarkSimple, CaretRight } from "@phosphor-icons/react";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { useModalStore } from "@/store/useModalStore";
import { MagazineData } from "@/types/magazine";

interface MagazineDetailSheetProps {
  magazine: MagazineData;
  onOpenReader?: (articleTitle?: string) => void;
}

/**
 * MagazineDetailSheet: 선택한 매거진(vol-XX)의 대형 3D 커버, 정보 & 전체 수록 코너 목차 상세 오버레이 (공통 타이포그래피 표준)
 */
export function MagazineDetailSheet({ magazine, onOpenReader }: MagazineDetailSheetProps) {
  const { closeModal } = useModalStore();

  const handleBack = () => {
    closeModal();
  };

  const handleStartRead = (articleTitle?: string) => {
    if (onOpenReader) {
      onOpenReader(articleTitle);
    } else {
      alert(`[E-Book Reader] "${articleTitle || magazine.title}" 읽기를 시작합니다.`);
    }
  };

  return (
    <div className="w-full bg-[#F9FAFB] flex flex-col select-none relative text-gray-900 min-h-full pb-[4rem] overflow-y-auto">
      {/* 상단 헤더 */}
      <SubPageHeader
        title={`${magazine.id.toUpperCase()} 상세 목차`}
        leftType="back"
        onLeftClick={handleBack}
      />

      <div className="flex flex-col w-full px-[1.25rem] pt-[1rem] gap-[1.5rem] text-left max-w-[32rem] mx-auto flex-1">
        {/* 1. 상단 대형 3D 입체 커버 히어로 엠블럼 */}
        <div className="relative p-[1.5rem] rounded-[2rem] bg-white border border-gray-100 shadow-sm flex flex-col items-center text-center gap-[1.25rem] overflow-hidden">
          {/* 파스텔 백그라운드 후광 틴트 */}
          <div className="absolute top-0 left-0 right-0 h-[6rem] bg-gradient-to-b from-[#EBFBF3] to-transparent opacity-80" />

          <div className="relative z-10 flex flex-col items-center gap-[1rem]">
            {/* 3D 커버 썸네일 */}
            <div className="relative w-[7.5rem] h-[10rem] rounded-[1rem] overflow-hidden shadow-xl bg-gray-200 border border-white">
              <Image
                src={magazine.thumbPath}
                alt={magazine.title}
                fill
                className="object-cover"
                sizes="120px"
              />
              <span className="absolute top-[0.5rem] left-[0.5rem] px-[0.5rem] py-[0.25rem] rounded-[0.375rem] bg-[#00C474] text-white text-[0.6875rem] font-bold uppercase shadow-2xs">
                {magazine.id.toUpperCase()}
              </span>
            </div>

            <div className="flex flex-col items-center gap-[0.375rem]">
              <span className="text-[0.75rem] font-bold text-[#00874E] bg-[#EBFBF3] px-[0.75rem] py-[0.25rem] rounded-[0.5rem]">
                {magazine.category}
              </span>
              <h2 className="text-[1.375rem] font-bold text-gray-900 mt-[0.25rem]">
                {magazine.title}
              </h2>
              <span className="text-[0.75rem] font-semibold text-gray-400">
                {magazine.publishDate} 발행 · 총 {magazine.articles.length}개 수록 코너
              </span>
            </div>
          </div>

          {/* 전체 읽기 CTA 버튼 */}
          <button
            type="button"
            onClick={() => handleStartRead()}
            className="w-full py-[0.875rem] rounded-[1.125rem] bg-[#00C474] hover:bg-[#00B068] active:scale-[0.98] text-white text-[0.9375rem] font-bold transition-all shadow-md flex items-center justify-center gap-[0.5rem] cursor-pointer"
          >
            <BookOpen size={18} weight="bold" />
            <span>첫 페이지부터 E-Book 읽기</span>
          </button>
        </div>

        {/* 2. 수록 코너 & 아티클 리스트 타임라인 */}
        <div className="flex flex-col gap-[0.875rem]">
          <div className="flex items-center justify-between px-[0.25rem]">
            <h3 className="text-[1rem] font-bold text-gray-900 flex items-center gap-[0.375rem]">
              <BookmarkSimple size={18} weight="fill" className="text-[#00C474]" />
              수록 코너 & 목차 아티클 ({magazine.articles.length})
            </h3>
            <span className="text-[0.75rem] font-semibold text-gray-400">터치 시 해당 코너 이동</span>
          </div>

          <div className="flex flex-col gap-[0.625rem]">
            {magazine.articles.map((art, idx) => (
              <div
                key={idx}
                onClick={() => handleStartRead(art.title)}
                className="p-[1.125rem] rounded-[1.25rem] bg-white border border-gray-100/80 flex items-center justify-between transition-all hover:bg-emerald-50/40 hover:border-emerald-200 cursor-pointer active:scale-[0.98] shadow-2xs group"
              >
                <div className="flex items-start gap-[0.875rem] min-w-0 flex-1 pr-[0.5rem]">
                  <span className="w-[1.75rem] h-[1.75rem] rounded-[0.5rem] bg-gray-100 group-hover:bg-[#EBFBF3] text-gray-500 group-hover:text-[#00874E] text-[0.75rem] font-bold flex items-center justify-center shrink-0 transition-colors">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div className="flex flex-col text-left min-w-0">
                    <span className="text-[0.6875rem] font-bold text-[#00874E]">
                      [{art.section}]
                    </span>
                    <h4 className="text-[0.875rem] font-bold text-gray-900 truncate mt-[0.125rem] group-hover:text-[#00874E] transition-colors">
                      {art.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-[0.375rem] text-gray-400 group-hover:text-[#00C474] transition-colors shrink-0">
                  <span className="text-[0.6875rem] font-semibold hidden sm:inline">읽기</span>
                  <CaretRight size={16} weight="bold" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
