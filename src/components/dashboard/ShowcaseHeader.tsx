"use client";

import React, { useEffect, useState } from "react";
import { Bell, ListBullets } from "@phosphor-icons/react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useModalStore } from "@/store/useModalStore";
import { NotificationSheet } from "@/components/dashboard/NotificationSheet";
import { MagazineFavoritesSheet } from "@/components/dashboard/MagazineFavoritesSheet";
import { MagazineCanvasReaderModal } from "@/components/dashboard/MagazineCanvasReaderModal";
import { getMagazineCategories } from "@/services/magazineService";
import { MagazineData } from "@/types/magazine";
import { useMindGym } from "@/context/MindGymContext";

interface ShowcaseHeaderProps {
  userName?: string;
  levelNum?: number;
}

/**
 * 1. ShowcaseHeader: 상단 앱 메인 메뉴 헤더 ([BrandLogo (좌측)] + [내 서재 아이콘 (종 왼쪽)] + [알림 종 버튼 (우측)])
 */
export function ShowcaseHeader({
  userName = "보노보노",
  levelNum = 1,
}: ShowcaseHeaderProps) {
  const { openModal, closeModal } = useModalStore();
  const { triggerDashboardRefresh } = useMindGym();
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

  const handleNotificationOpen = () => {
    openModal({
      type: "slide-left",
      content: <NotificationSheet />,
      onClose: () => {
        triggerDashboardRefresh();
      },
    });
  };

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
      <div className="w-full flex items-center justify-between py-1 px-0.5 select-none">
        {/* Left Brand Logo */}
        <div className="flex items-center gap-1.5 cursor-default pointer-events-none">
          <BrandLogo size="sm" />
        </div>

        {/* Right Mobile Status (우측 내 서재 아이콘 & 알림 종 버튼 -> 종의 24px 원본 스펙에 100% 맞춤) */}
        <div className="flex items-center gap-1">
          {/* ★ [내 서재 아이콘]: 종(24px) 스펙에 정확히 100% 맞춤! ★ */}
          <button
            type="button"
            aria-label="마음건강 서재 모아보기"
            onClick={handleOpenFavoritesSheet}
            className="p-1.5 txt-brand-ink hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors relative active:scale-95 flex items-center justify-center outline-none cursor-pointer"
            title="마음건강 서재 (내가 찜한 목록)"
          >
            <ListBullets size={24} weight="bold" className="txt-brand-ink hover:text-gray-900 transition-colors" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white" />
          </button>

          {/* 알림 종 버튼 (원래 기준 24px bold) */}
          <button
            type="button"
            aria-label="알림 수신함"
            onClick={handleNotificationOpen}
            className="p-1.5 txt-brand-ink hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors relative active:scale-95 flex items-center justify-center outline-none cursor-pointer"
            title="알림 센터"
          >
            <Bell size={24} weight="bold" className="txt-brand-ink" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-brand-green rounded-full ring-2 ring-white" />
          </button>
        </div>
      </div>

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
