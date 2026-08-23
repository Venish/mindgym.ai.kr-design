"use client";

import React, { useEffect, useState } from "react";
import { CaretRight, List } from "@phosphor-icons/react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useModalStore } from "@/store/useModalStore";
import { MagazineMainSheet } from "@/components/dashboard/MagazineMainSheet";
import { MagazineCanvasReaderModal } from "@/components/dashboard/MagazineCanvasReaderModal";
import { getMagazineCategories } from "@/services/magazineService";
import { MagazineData } from "@/types/magazine";

/**
 * 5. ShowcasePauseBanner: 잠시멈춤 VOL.11 매거진 추천 배너 모듈
 * - 카드 클릭 시: 전역 오버레이 스토어를 통해 E-Book Reader 뷰어를 최상위로 오프닝하여 하단 footer 메뉴 겹침 100% 방지!
 * - 우측 List 버튼 클릭 시: 매거진 라이브러리 전체보기 시트 실행
 */
export function ShowcasePauseBanner() {
  const { openModal } = useModalStore();
  const [vol11Mag, setVol11Mag] = useState<MagazineData | null>(null);
  const [articleTitle, setArticleTitle] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      const res = await getMagazineCategories();
      const allMags = (res.categories || []).flatMap((cat) => cat.magazines);
      const found = allMags.find((m) => m.id === "vol-11") || allMags[0];
      if (found) {
        setVol11Mag(found);
        if (found.articles.length > 0) {
          setArticleTitle(found.articles[0].title);
        }
      }
    }
    loadData();
  }, []);

  // 전체 매거진 라이브러리 오픈 (우측 List 버튼 클릭)
  const handleOpenLibrary = () => {
    openModal({
      type: "slide-left",
      content: <MagazineMainSheet initialVolId="vol-11" />,
    });
  };

  // ★ "잠시 멈춤" 배너 카드 클릭 ➔ 전역 최상위 모달 오픈으로 footer 하단 메뉴 겹침 100% 차단! ★
  const handleDirectReadArticle = () => {
    if (vol11Mag) {
      openModal({
        type: "slide-up",
        content: (
          <MagazineCanvasReaderModal
            isOpen={true}
            onClose={() => useModalStore.getState().closeModal()}
            magazine={vol11Mag}
            articleTitle={articleTitle}
          />
        ),
      });
    } else {
      handleOpenLibrary();
    }
  };

  return (
    <div className="flex flex-col gap-2.5 w-full select-none">
      {/* 공통 섹션 중제목 컴포넌트 사용 */}
      <SectionTitle
        title="지금 나에게 맞는 이야기"
        action={
          <button
            type="button"
            aria-label="메뉴"
            onClick={handleOpenLibrary}
            className="p-1 text-gray-400 hover:text-gray-900 transition-colors rounded-lg active:scale-95 outline-none cursor-pointer"
            title="매거진 라이브러리 전체보기"
          >
            <List size={18} weight="bold" />
          </button>
        }
      />

      {/* 잠시멈춤 매거진 배너 카드 -> 아티클 바로 보는 E-Book Reader 전역 오버레이 연동 */}
      <div
        onClick={handleDirectReadArticle}
        className="bg-[#F9FAFB] hover:bg-[#F2F4F7] rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all active:scale-[0.98] shadow-2xs group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-[48px] h-[64px] bg-gradient-to-b from-[#7CE0B0] to-[#4ECB93] rounded-xl flex flex-col justify-end items-center pb-2 text-white shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <span className="text-xs font-bold font-mono tracking-tighter text-white uppercase">
              VOL.11
            </span>
          </div>
          <div className="flex flex-col text-left">
            <h3 className="text-[1.0625rem] font-black text-gray-900 tracking-tight leading-tight group-hover:text-[#00C474] transition-colors">
              잠시멈춤
            </h3>
            <span className="text-xs font-semibold text-gray-400 mt-1">
              이달의 추천 마인드 스토어 바로 읽기
            </span>
          </div>
        </div>
        <CaretRight size={18} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
      </div>
    </div>
  );
}
