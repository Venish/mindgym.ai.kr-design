"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Sparkle, BookOpen, Star, CaretRight, BookmarkSimple, ListBullets, CaretDown, CaretUp, Play } from "@phosphor-icons/react";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { useModalStore } from "@/store/useModalStore";
import { getMagazineCategories, getFeaturedSpotlightArticles } from "@/services/magazineService";
import { MagazineCategoryGroup, FeaturedSpotlightArticle, MagazineData } from "@/types/magazine";

import { MagazineFavoritesSheet } from "@/components/dashboard/MagazineFavoritesSheet";
import { MagazineCanvasReaderModal } from "@/components/dashboard/MagazineCanvasReaderModal";

interface MagazineMainSheetProps {
  initialVolId?: string;
}

/**
 * Neutral Scale Surface 토큰 기반 카테고리 테마 (Borderless 원칙 준수)
 */
export function getCategoryTheme(category: string) {
  switch (category) {
    case "스트레스 & 이완":
      return {
        bg: "bg-sky-50",
        text: "text-sky-700",
        badgeBg: "bg-sky-500",
        badgeText: "text-white",
        activeTab: "bg-sky-600 text-white",
        chipBg: "bg-[#F9FAFB] text-sky-700 font-bold",
        border: "border-sky-300",
      };
    case "자기자비 & 정체성":
      return {
        bg: "bg-purple-50",
        text: "text-purple-700",
        badgeBg: "bg-purple-500",
        badgeText: "text-white",
        activeTab: "bg-purple-600 text-white",
        chipBg: "bg-[#F9FAFB] text-purple-700 font-bold",
        border: "border-purple-300",
      };
    case "관계 & 소통":
      return {
        bg: "bg-rose-50",
        text: "text-rose-700",
        badgeBg: "bg-rose-500",
        badgeText: "text-white",
        activeTab: "bg-rose-600 text-white",
        chipBg: "bg-[#F9FAFB] text-rose-700 font-bold",
        border: "border-rose-300",
      };
    case "감정 정돈 & 마음관리":
      return {
        bg: "bg-amber-50",
        text: "text-amber-800",
        badgeBg: "bg-amber-500",
        badgeText: "text-white",
        activeTab: "bg-amber-600 text-white",
        chipBg: "bg-[#F9FAFB] text-amber-800 font-bold",
        border: "border-amber-300",
      };
    case "일상의 발견 & 쉼":
      return {
        bg: "bg-emerald-50",
        text: "text-emerald-800",
        badgeBg: "bg-[#00C474]",
        badgeText: "text-white",
        activeTab: "bg-[#00C474] text-white",
        chipBg: "bg-[#F9FAFB] text-[#047857] font-bold",
        border: "border-emerald-300",
      };
    case "동기부여 & 몰입":
      return {
        bg: "bg-indigo-50",
        text: "text-indigo-700",
        badgeBg: "bg-indigo-500",
        badgeText: "text-white",
        activeTab: "bg-indigo-600 text-white",
        chipBg: "bg-[#F9FAFB] text-indigo-700 font-bold",
        border: "border-indigo-300",
      };
    default:
      return {
        bg: "bg-emerald-50",
        text: "text-emerald-800",
        badgeBg: "bg-[#00C474]",
        badgeText: "text-white",
        activeTab: "bg-[#00C474] text-white",
        chipBg: "bg-[#F9FAFB] text-[#047857] font-bold",
        border: "border-emerald-300",
      };
  }
}

export function MagazineMainSheet({ initialVolId }: MagazineMainSheetProps) {
  const { clearModals, openModal } = useModalStore();

  const [categories, setCategories] = useState<MagazineCategoryGroup[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [spotlightArticles, setSpotlightArticles] = useState<FeaturedSpotlightArticle[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hasInitialized, setHasInitialized] = useState<boolean>(false);
  const [isTocOpen, setIsTocOpen] = useState<boolean>(true);
  const [isFavSheetOpen, setIsFavSheetOpen] = useState<boolean>(false);

  // Canvas E-Book Reader Modal States
  const [isReaderOpen, setIsReaderOpen] = useState<boolean>(false);
  const [readerMagazine, setReaderMagazine] = useState<MagazineData | null>(null);
  const [readerArticleTitle, setReaderArticleTitle] = useState<string>("");

  const handleOpenEbookReader = (mag: MagazineData, articleTitle: string) => {
    setReaderMagazine(mag);
    setReaderArticleTitle(articleTitle);
    setIsReaderOpen(true);
  };

  // 실제 전체 매거진 DB에 존재하는 20개 아티클 제목 100% 매핑 등록 (카운트 [20] 스크롤 검증용)
  const [favoritedTitles, setFavoritedTitles] = useState<string[]>([
    "당연하지 않은 것들 앞에서",
    "달리지 않고도 사는 사람은 많아",
    "사람 때문에, 사람 덕분에",
    "일상의 속도를 낮추는 기술",
    "마음의 미세먼지를 터는 '10분 멍때리기' 기술",
    "퇴근 후 뇌를 완전히 끄는 수면 리추얼",
    "불안을 다스리는 4-7-8 호흡 매뉴얼",
    "타인의 말에 상처받지 않는 감정 방화벽",
    "나를 사랑하는 가장 첫 번째 연습, 자기 자비",
    "마음 챙김(Mindfulness)이란 무엇인가?",
    "감정 조절의 심리학",
    "스트레스 해소를 위한 작은 습관들",
    "회복탄력성을 높이는 방법",
    "타인과의 건강한 경계 세우기",
    "나만의 힐링 루틴 만들기",
    "슬럼프를 극복하는 마음의 힘",
    "완벽주의에서 벗어나는 연습",
    "마음의 번아웃 신호 읽기",
    "행복을 만드는 데일리 리추얼",
    "나를 온전히 받아들이는 자비 명상",
  ]);

  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [catDragStartX, setCatDragStartX] = useState<number | null>(null);
  const [catScrollLeft, setCatScrollLeft] = useState<number>(0);
  const [isCatDragging, setIsCatDragging] = useState<boolean>(false);

  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      const catRes = await getMagazineCategories();
      setCategories(catRes.categories || []);

      const spotRes = await getFeaturedSpotlightArticles();
      setSpotlightArticles(spotRes);
    }
    loadData();
  }, []);

  const handleCloseAll = () => {
    clearModals();
  };

  const toggleFavoriteArticle = (title: string) => {
    setFavoritedTitles((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };



  const handleCatStart = (clientX: number) => {
    if (!categoryScrollRef.current) return;
    setCatDragStartX(clientX);
    setCatScrollLeft(categoryScrollRef.current.scrollLeft);
    setIsCatDragging(false);
  };

  const handleCatMove = (clientX: number) => {
    if (catDragStartX === null || !categoryScrollRef.current) return;
    const walk = (catDragStartX - clientX) * 1.5;
    categoryScrollRef.current.scrollLeft = catScrollLeft + walk;
    if (Math.abs(walk) > 5) {
      setIsCatDragging(true);
    }
  };

  const handleCatEnd = () => {
    setCatDragStartX(null);
    setTimeout(() => setIsCatDragging(false), 50);
  };

  const handleCatWheel = (e: React.WheelEvent) => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollLeft += e.deltaY;
    }
  };

  const allMagazines: MagazineData[] = categories.flatMap((cat) => cat.magazines);
  const uniqueMagazines: MagazineData[] = Array.from(
    new Map(allMagazines.map((item) => [item.id, item])).values()
  ).sort((a, b) => a.id.localeCompare(b.id));

  const filteredMagazines = uniqueMagazines.filter((m) => {
    if (showFavoritesOnly) {
      return ["vol-11", "vol-01", "vol-03"].includes(m.id);
    }
    if (selectedCategory === "ALL") return true;
    return m.category === selectedCategory;
  });

  // 시작할 때 최신권(마지막권) 선택
  useEffect(() => {
    if (filteredMagazines.length > 0 && !hasInitialized) {
      setActiveIndex(filteredMagazines.length - 1);
      setHasInitialized(true);
    }
  }, [filteredMagazines, hasInitialized]);

  // 목차가 펼쳐진 상태에서 좌우 스와이핑 시 접히지 않고 펼침 상태 유지 (State Persistence)
  const activeMagazine = filteredMagazines[activeIndex] || filteredMagazines[filteredMagazines.length - 1] || filteredMagazines[0];
  const activeTheme = activeMagazine ? getCategoryTheme(activeMagazine.category) : getCategoryTheme("");

  // '발행년월' 및 '주제' 항목 필터링 적용된 아티클 목차
  const cleanArticles = (activeMagazine?.articles || []).filter((art) => {
    const sec = (art.section || "").trim();
    const tit = (art.title || "").trim();
    return sec !== "발행년월" && sec !== "주제" && tit !== "발행년월" && tit !== "주제";
  });

  const latestVolId = uniqueMagazines.length > 0 ? uniqueMagazines[uniqueMagazines.length - 1].id : "vol-21";

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(filteredMagazines.length - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < filteredMagazines.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    handleEnd();
  };

  const handleStart = (clientX: number) => {
    setDragStartX(clientX);
    setDragOffset(0);
    setIsDragging(false);
  };

  const handleMove = (clientX: number) => {
    if (dragStartX === null) return;
    const diff = dragStartX - clientX;
    setDragOffset(diff);
    if (Math.abs(diff) > 8) {
      setIsDragging(true);
    }
  };

  const handleEnd = () => {
    if (dragStartX === null) return;

    if (Math.abs(dragOffset) > 40) {
      if (dragOffset > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setDragStartX(null);
    setDragOffset(0);
    setTimeout(() => setIsDragging(false), 80);
  };

  const formatVolTitle = (id: string, title: string) => {
    const num = id.replace("vol-", "").padStart(2, "0");
    return `VOL.${num} ${title}`;
  };

  // 접힘 상태일 때 미리보기 항목 수 (2개)
  const previewLimit = 2;
  const visibleArticles = isTocOpen
    ? cleanArticles
    : cleanArticles.slice(0, previewLimit);
  const hasMoreArticles = cleanArticles.length > previewLimit;

  return (
    <div className="w-full min-h-full bg-white flex flex-col select-none relative pb-12 text-gray-900 overflow-y-auto overflow-x-hidden">
      {/* 상단 헤더 */}
      <SubPageHeader
        title="월간 마음건강 매거진"
        leftType="back"
        onLeftClick={handleCloseAll}
        rightAction={
          <button
            type="button"
            onClick={() => setIsFavSheetOpen(true)}
            className="p-1.5 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors active:scale-95 outline-none cursor-pointer flex items-center justify-center relative"
            title="내가 찜한 리스트 모아보기"
          >
            <ListBullets size={22} weight="bold" className={showFavoritesOnly ? "text-amber-500" : "text-gray-500"} />
            {favoritedTitles.length > 0 && (
              <span className="w-[0.4375rem] h-[0.4375rem] bg-amber-500 rounded-full absolute top-[0.1875rem] right-[0.1875rem] ring-2 ring-white" />
            )}
          </button>
        }
      />

      <div className="flex flex-col w-full max-w-full overflow-x-hidden pt-[0.5rem] gap-[1rem] text-left justify-start">
        {/* 1단: 카테고리 스크롤 탭 */}
        <div
          ref={categoryScrollRef}
          onMouseDown={(e) => handleCatStart(e.clientX)}
          onMouseMove={(e) => handleCatMove(e.clientX)}
          onMouseUp={handleCatEnd}
          onMouseLeave={handleCatEnd}
          onTouchStart={(e) => {
            e.stopPropagation();
            handleCatStart(e.touches[0].clientX);
          }}
          onTouchMove={(e) => {
            e.stopPropagation();
            handleCatMove(e.touches[0].clientX);
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
            handleCatEnd();
          }}
          onWheel={handleCatWheel}
          style={{ touchAction: "pan-x" }}
          className="px-[1.25rem] flex items-center gap-[0.375rem] overflow-x-auto no-scrollbar py-[0.25rem] shrink-0 select-none cursor-grab active:cursor-grabbing max-w-full"
        >
          <button
            type="button"
            onClick={() => {
              if (!isCatDragging) {
                setSelectedCategory("ALL");
                setShowFavoritesOnly(false);
                setActiveIndex(filteredMagazines.length - 1);
              }
            }}
            className={`px-[0.875rem] py-[0.4375rem] rounded-[0.5rem] text-[0.75rem] font-bold shrink-0 transition-all cursor-pointer ${
              selectedCategory === "ALL" && !showFavoritesOnly
                ? "bg-slate-900 text-white scale-[1.02]"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            전체보기
          </button>
          {categories.map((cat) => {
            const theme = getCategoryTheme(cat.category);
            const isSelected = selectedCategory === cat.category && !showFavoritesOnly;

            return (
              <button
                key={cat.category}
                type="button"
                onClick={() => {
                  if (!isCatDragging) {
                    setSelectedCategory(cat.category);
                    setShowFavoritesOnly(false);
                    setActiveIndex(0);
                  }
                }}
                className={`px-[0.875rem] py-[0.4375rem] rounded-[0.5rem] text-[0.75rem] font-bold shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? `${theme.activeTab} scale-[1.02] shadow-2xs`
                    : `${theme.bg} ${theme.text} hover:brightness-95`
                }`}
              >
                {cat.category}
              </button>
            );
          })}
        </div>

        {/* 2단: 🌀 3D 반원 아치 매거진 뷰어 (즐겨찾기 버튼 맨 왼쪽 배치) */}
        {filteredMagazines.length > 0 && activeMagazine && (
          <div className="flex flex-col items-center w-full max-w-full overflow-visible gap-[0.875rem] mt-[1.25rem]">
            {/* 3D 반원 아치 궤도 영역 */}
            <div
              onMouseDown={(e) => handleStart(e.clientX)}
              onMouseMove={(e) => handleMove(e.clientX)}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: "pan-y" }}
              className="relative w-full max-w-full h-[21.5rem] pt-[1.5rem] pb-[0.75rem] flex items-center justify-center overflow-visible perspective-[1200px] cursor-grab active:cursor-grabbing px-0 z-10 select-none"
            >
              {filteredMagazines.map((mag, idx) => {
                const count = filteredMagazines.length;
                let rawOffset = idx - activeIndex;

                if (rawOffset < -Math.floor(count / 2)) rawOffset += count;
                if (rawOffset > Math.floor(count / 2)) rawOffset -= count;

                const dragDelta = dragOffset / 120;
                const effectiveOffset = rawOffset - dragDelta;
                const absOffset = Math.abs(effectiveOffset);

                if (absOffset > 3.2) return null;

                const theme = getCategoryTheme(mag.category);
                const isLatestVol = mag.id === latestVolId;

                const arcAngleStep = 28;
                const angle = effectiveOffset * arcAngleStep;
                const rad = (angle * Math.PI) / 180;

                const radiusX = 10.2;
                const radiusY = 1.8;

                const translateX = Math.sin(rad) * radiusX;
                const translateY = (1 - Math.cos(rad)) * radiusY;
                const rotateZ = angle * 0.45;
                const rotateY = -angle * 0.75;
                const scale = Math.max(0.68, 1.18 - absOffset * 0.18);
                const opacity = Math.max(0.2, 1 - absOffset * 0.26);
                const zIndex = Math.round(30 - absOffset * 10);

                return (
                  <div
                    key={mag.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isDragging) {
                        if (rawOffset === 0) {
                          setIsTocOpen(!isTocOpen);
                        } else {
                          setActiveIndex(idx);
                        }
                      }
                    }}
                    style={{
                      transform: `translate3d(${translateX}rem, ${translateY}rem, ${-absOffset * 1.5}rem) rotateZ(${rotateZ}deg) rotateY(${rotateY}deg) scale(${scale})`,
                      zIndex,
                      opacity,
                      transition: isDragging ? "none" : "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease",
                    }}
                    className="absolute w-[10.5rem] h-[14.75rem] shrink-0 select-none origin-bottom overflow-visible"
                  >
                    {/* 카드 커버 이미지 래퍼 */}
                    <div className={`w-full h-full rounded-[0.375rem] overflow-hidden bg-gray-100 border ${theme.border} relative shadow-sm`}>
                      <Image
                        src={mag.thumbPath}
                        alt={mag.title}
                        fill
                        className="object-cover pointer-events-none"
                        sizes="230px"
                        priority={rawOffset === 0}
                      />
                    </div>

                    {/* N 뱃지 (흰색 테두리 소거 및 순수 Red 뱃지) */}
                    {isLatestVol && (
                      <span className="absolute -top-[0.5rem] -right-[0.5rem] w-[1.375rem] h-[1.375rem] rounded-full bg-[#FF3B30] text-white text-[0.6875rem] font-extrabold flex items-center justify-center shadow-md tracking-tighter animate-pulse z-50">
                        N
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 이미지 바로 하단: 매거진 타이틀 & 목차 리스트 (메인 대시보드 수직 간격 gap-[1.25rem] 통일) */}
            <div className="flex flex-col items-center text-center gap-[1.25rem] w-full max-w-full px-[1.25rem] relative -mt-[1.75rem] z-20">
              <div className="flex flex-col items-center gap-[0.25rem] w-full">
                {/* Neutral Surface 배경 + 카테고리 폰트 컬러 칩 */}
                <span className={`text-[0.75rem] px-[0.75rem] py-[0.25rem] rounded-[0.375rem] ${activeTheme.chipBg}`}>
                  {activeMagazine.category}
                </span>

                {/* VOL.XX 제목 표기 */}
                <h3 className="text-[1.375rem] font-bold text-gray-900 truncate max-w-full mt-[0.125rem]">
                  {formatVolTitle(activeMagazine.id, activeMagazine.title)}
                </h3>

                {/* 발행년월 (Publish Date) */}
                {activeMagazine.publishDate && (
                  <span className="text-[0.8125rem] font-medium text-gray-400 mt-[0.0625rem] tabular-nums">
                    {activeMagazine.publishDate}
                  </span>
                )}
              </div>

              {/* ★ 목차 리스트 (감싸기 박스 전면 소거 & 미니멀 무경계) ★ */}
              <div className="w-full flex flex-col transition-all gap-[0.5rem]">
                {/* ★ 목차 상단 타이틀 바 (제목 좌측, 숫자 우측 분리 배치) ★ */}
                <div className="flex items-center justify-between px-[0.25rem] py-[0.125rem] w-full">
                  <span className="text-[0.9375rem] font-bold text-gray-900">
                    수록 코너 및 칼럼 목차
                  </span>
                  <span className="text-[0.8125rem] font-medium text-gray-400 tabular-nums">
                    {cleanArticles.length}
                  </span>
                </div>

                {/* 수록 목차 카드 목록 */}
                <div className="flex flex-col gap-[0.375rem]">
                    {visibleArticles.map((art, aIdx) => {
                      const isFav = favoritedTitles.includes(art.title);

                      return (
                        <div
                          key={aIdx}
                          className="p-[0.75rem] bg-[#F9FAFB] rounded-[0.875rem] border border-gray-100/80 flex items-center justify-between gap-[0.5rem] transition-all shadow-2xs hover:border-[#00C474]/40"
                        >
                          {/* ★ 좌측: [즐겨찾기 맨 왼쪽 원형 핀] + [코너 뱃지 & 제목 소제목 배치] ★ */}
                          <div className="flex items-center gap-[0.5rem] min-w-0 flex-1 pr-[0.25rem]">
                            {/* 1. 맨 왼쪽 즐겨찾기 (리추얼 모아보기와 100% 동일한 Star 20px 원형 핀) */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavoriteArticle(art.title);
                              }}
                              className={`p-[0.25rem] transition-all active:scale-90 cursor-pointer shrink-0 ${
                                isFav
                                  ? "text-amber-400"
                                  : "text-gray-200 hover:text-amber-300"
                              }`}
                              title={isFav ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                            >
                              <BookmarkSimple size={20} weight="fill" />
                            </button>

                            {/* 2. 코너 뱃지 및 제목 소제목 배치 (min-w-0 flex-1 truncate 엄격 방어) */}
                            <div className="flex flex-col items-start min-w-0 flex-1 text-left">
                              <div className="flex items-center gap-[0.375rem]">
                                {art.section && art.section !== "편집장의 말" && art.section !== art.title && (
                                  <span
                                    style={{ display: "inline-flex", letterSpacing: "0.025rem" }}
                                    className={`badge-ls text-[0.625rem] font-semibold px-[0.5rem] py-[0.1875rem] rounded-full items-center justify-center leading-none ${activeTheme.bg} ${activeTheme.text}`}
                                  >
                                    {art.section}
                                  </span>
                                )}
                              </div>
                              <h4 className="text-[0.8125rem] font-bold text-gray-900 truncate mt-[0.125rem] tracking-normal w-full">
                                {art.title}
                              </h4>
                            </div>
                          </div>

                          {/* ★ 우측 아이콘 위치: 메인 대시보드와 100% 동일한 CaretRight 화살표 ★ */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEbookReader(activeMagazine, art.title);
                            }}
                            className="p-[0.25rem] text-gray-400 hover:text-gray-900 transition-colors cursor-pointer active:scale-90 shrink-0 ml-[0.25rem]"
                            title="E-Book 읽기"
                          >
                            <CaretRight size={16} weight="bold" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
      {/* ★ 내가 찜한 마음건강 칼럼 서브 시트 (왼쪽 ➔ 오른쪽 슬라이드 인/아웃) ★ */}
      <MagazineFavoritesSheet
        isOpen={isFavSheetOpen}
        onClose={() => setIsFavSheetOpen(false)}
        favoritedTitles={favoritedTitles}
        magazines={allMagazines}
        onToggleFavorite={toggleFavoriteArticle}
        onOpenEbookReader={handleOpenEbookReader}
      />

      {/* ★ HTML5 Canvas E-Book 매거진 뷰어 모달 (밑에서 위로 슬라이드 업) ★ */}
      <MagazineCanvasReaderModal
        isOpen={isReaderOpen}
        onClose={() => setIsReaderOpen(false)}
        magazine={readerMagazine}
        articleTitle={readerArticleTitle}
      />
    </div>
  );
}
