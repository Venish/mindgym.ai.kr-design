"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, ListBullets } from "@phosphor-icons/react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useModalStore } from "@/store/useModalStore";
import { MagazineFavoritesSheet } from "@/components/dashboard/MagazineFavoritesSheet";
import { MagazineCanvasReaderModal } from "@/components/dashboard/MagazineCanvasReaderModal";
import { getMagazineCategories } from "@/services/magazineService";
import { MagazineData } from "@/types/magazine";

export function GlobalHeader() {
  const { openModal, closeModal } = useModalStore();
  const [magazines, setMagazines] = useState<MagazineData[]>([]);

  // Canvas E-Book Reader State for direct launch
  const [isReaderOpen, setIsReaderOpen] = useState<boolean>(false);
  const [readerMagazine, setReaderMagazine] = useState<MagazineData | null>(null);
  const [readerArticleTitle, setReaderArticleTitle] = useState<string>("");

  const defaultFavoritedTitles = [
    "당연하지 않은 것들 앞에서",
    "달리지 않고도 사는 사람은 많아",
    "사람 때문에, 사람 덕분에",
    "일상의 속도를 낮추는 기술",
    "마음의 미세먼지를 터는 '10분 멍때리기' 기술",
  ];

  useEffect(() => {
    async function loadData() {
      const res = await getMagazineCategories();
      const allMags = (res.categories || []).flatMap((cat) => cat.magazines);
      setMagazines(allMags);
    }
    loadData();
  }, []);

  // 우측 종 좌측 [내 서재 아이콘] 클릭 ➔ 마음건강 서재 시트 오픈
  const handleOpenFavoritesSheet = () => {
    openModal({
      type: "slide-left",
      content: (
        <MagazineFavoritesSheet
          isOpen={true}
          onClose={closeModal}
          favoritedTitles={defaultFavoritedTitles}
          magazines={magazines}
          onToggleFavorite={() => {}}
          onOpenEbookReader={(mag, title) => {
            setReaderMagazine(mag);
            setReaderArticleTitle(title);
            setIsReaderOpen(true);
          }}
        />
      ),
    });
  };

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-30 w-full bg-transparent px-5 py-4 flex items-center justify-between border-0 shadow-none outline-none select-none">
        <Link href="/dashboard">
          <BrandLogo size="md" />
        </Link>

        {/* 우측 상단 아이콘 그룹 ([내 서재 (종 24px 원본 기준에 맞춤)] + [알림 종]) */}
        <div className="flex items-center gap-1">
          {/* ★ [내 서재 아이콘]: 종(24px) 원본 스펙에 100% 동일하게 조율! ★ */}
          <button
            type="button"
            aria-label="마음건강 서재 모아보기"
            onClick={handleOpenFavoritesSheet}
            className="p-1.5 text-gray-700 hover:text-gray-900 bg-transparent transition-all flex items-center justify-center relative active:scale-95 outline-none cursor-pointer"
            title="마음건강 서재 (내가 찜한 목록)"
          >
            <ListBullets size={24} weight="bold" className="text-gray-700 hover:text-gray-900 transition-colors" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white" />
          </button>

          {/* 우측 단일 알림 아이콘 (원래 기준 24px regular/bold) */}
          <button
            type="button"
            aria-label="알림 센터"
            className="p-1.5 text-gray-700 hover:text-gray-900 bg-transparent transition-all flex items-center justify-center relative active:scale-95 outline-none cursor-pointer"
            title="알림 센터"
          >
            <Bell size={24} weight="regular" className="text-gray-700 hover:text-gray-900 transition-colors" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00C473] rounded-full ring-2 ring-white" />
          </button>
        </div>
      </header>

      {/* HTML5 Canvas Reader Direct Modal */}
      <MagazineCanvasReaderModal
        isOpen={isReaderOpen}
        onClose={() => setIsReaderOpen(false)}
        magazine={readerMagazine}
        articleTitle={readerArticleTitle}
      />
    </>
  );
}
