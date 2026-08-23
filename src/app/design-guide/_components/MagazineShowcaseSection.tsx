"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Sparkle, BookOpen, Star, CaretRight, BookmarkSimple, ListBullets, CaretDown, CaretUp, Play } from "@phosphor-icons/react";
import { getMagazineCategories, getFeaturedSpotlightArticles } from "@/services/magazineService";
import { MagazineCategoryGroup, FeaturedSpotlightArticle, MagazineData } from "@/types/magazine";
import { getCategoryTheme } from "@/components/dashboard/MagazineMainSheet";

import { MagazineFavoritesSheet } from "@/components/dashboard/MagazineFavoritesSheet";

export function MagazineShowcaseSection() {
  const [categories, setCategories] = useState<MagazineCategoryGroup[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [spotlightArticles, setSpotlightArticles] = useState<FeaturedSpotlightArticle[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hasInitialized, setHasInitialized] = useState<boolean>(false);
  const [isTocOpen, setIsTocOpen] = useState<boolean>(true);
  const [isFavSheetOpen, setIsFavSheetOpen] = useState<boolean>(false);

  const [favoritedTitles, setFavoritedTitles] = useState<string[]>([
    "당연하지 않은 것들 앞에서",
    "달리지 않고도 사는 사람은 많아",
    "사람 때문에, 사람 덕분에",
    "일상의 속도를 낮추는 기술",
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

  const toggleFavoriteArticle = (title: string) => {
    setFavoritedTitles((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const handleOpenEbookReader = (mag: MagazineData, articleTitle?: string) => {
    alert(`[Canvas E-Book Reader] "${articleTitle || mag.title}" 텍스트 읽어주기(TTS) 리더를 시작합니다.`);
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

  const filteredMagazines =
    selectedCategory === "ALL"
      ? uniqueMagazines
      : uniqueMagazines.filter((m) => m.category === selectedCategory);

  useEffect(() => {
    if (filteredMagazines.length > 0 && !hasInitialized) {
      setActiveIndex(filteredMagazines.length - 1);
      setHasInitialized(true);
    }
  }, [filteredMagazines, hasInitialized]);

  // 목차가 펼쳐진 상태에서 좌우 스와이핑 시 접히지 않고 펼침 상태 유지 (State Persistence)
  const activeMagazine = filteredMagazines[activeIndex] || filteredMagazines[filteredMagazines.length - 1] || filteredMagazines[0];
  const activeTheme = activeMagazine ? getCategoryTheme(activeMagazine.category) : getCategoryTheme("");

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

  const previewLimit = 2;
  const visibleArticles = isTocOpen
    ? cleanArticles
    : cleanArticles.slice(0, previewLimit);
  const hasMoreArticles = cleanArticles.length > previewLimit;

  return (
    <section id="magazine-system" className="space-y-[2rem] select-none text-left w-full max-w-full overflow-x-hidden">
      {/* 1. 섹션 헤더 */}
      <div className="border-b border-gray-200 pb-[1rem]">
        <div className="flex items-center gap-[0.5rem]">
          <span className="w-[0.75rem] h-[0.75rem] rounded-full bg-[#00C474] inline-block" />
          <h2 className="text-[1.25rem] font-bold text-gray-900">
            6. Magazine & E-Book Reader Component System (Left Favorite Button Spec)
          </h2>
        </div>
        <p className="text-[0.75rem] text-gray-500 mt-[0.25rem]">
          즐겨찾기 버튼이 맨 왼쪽 뱃지 및 제목 앞으로 이동된 가독성 강화 스펙
        </p>
      </div>

      {/* 2. 쇼케이스 1: 맨 왼쪽 즐겨찾기 가상 뷰어 */}
      <div className="bg-[#F9FAFB] p-[1.5rem] rounded-[2rem] space-y-[1.5rem] w-full max-w-full overflow-x-hidden">
        <div className="flex items-center justify-between border-b border-gray-200/80 pb-[0.75rem]">
          <div>
            <span className="text-[0.75rem] font-bold text-[#00874E] bg-[#EBFBF3] px-[0.625rem] py-[0.25rem] rounded-[0.375rem]">
              LEFT FAVORITE POSITION
            </span>
            <h3 className="text-[1rem] font-bold text-gray-900 mt-[0.25rem]">
              Bookmark Button Placed at the Far Left
            </h3>
          </div>
          <span className="text-[0.75rem] text-gray-500 font-semibold">100% REM & GodUI Spec</span>
        </div>

        {/* 모바일 화면 프레임 가상 뷰어 */}
        <div className="max-w-[26.875rem] mx-auto bg-white rounded-[2rem] border border-gray-200 overflow-hidden flex flex-col pt-[1.25rem] pb-[5rem] gap-[0.75rem] relative">
          {/* 1단: 서브페이지 헤더 & 카테고리 스크롤 탭 */}
          <div className="flex flex-col gap-[0.75rem] shrink-0 border-b border-gray-100 pb-[0.75rem] w-full max-w-full overflow-x-hidden">
            <div className="flex items-center justify-between px-[1.25rem]">
              <div className="flex items-center gap-[0.5rem]">
                <div className="w-[1.5rem] h-[1.5rem] rounded-[0.5rem] bg-[#00C474] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Star size={13} weight="fill" />
                </div>
                <h3 className="text-[1rem] font-bold text-gray-900">
                  월간 마음건강 매거진
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsFavSheetOpen(true)}
                className="p-1.5 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors active:scale-95 outline-none cursor-pointer flex items-center justify-center relative"
              >
                <ListBullets size={22} weight="bold" className="text-gray-500 hover:text-gray-900 transition-colors" />
                {favoritedTitles.length > 0 && (
                  <span className="w-[0.4375rem] h-[0.4375rem] bg-amber-500 rounded-full absolute top-[0.1875rem] right-[0.1875rem] ring-2 ring-white" />
                )}
              </button>
            </div>

            {/* 카테고리 탭 스와이퍼 */}
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
                    setActiveIndex(filteredMagazines.length - 1);
                  }
                }}
                className={`px-[0.875rem] py-[0.4375rem] rounded-[0.5rem] text-[0.75rem] font-bold shrink-0 transition-all cursor-pointer ${
                  selectedCategory === "ALL"
                    ? "bg-slate-900 text-white scale-[1.02]"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                전체보기
              </button>
              {categories.map((cat) => {
                const theme = getCategoryTheme(cat.category);
                const isSelected = selectedCategory === cat.category;

                return (
                  <button
                    key={cat.category}
                    type="button"
                    onClick={() => {
                      if (!isCatDragging) {
                        setSelectedCategory(cat.category);
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
          </div>

          {/* 2단: 🌀 3D Semi-Circle Orbit Container */}
          {filteredMagazines.length > 0 && activeMagazine && (
            <div className="flex flex-col items-center w-full max-w-full overflow-x-hidden gap-[0.875rem] mt-[1.875rem]">
              <div
                onMouseDown={(e) => handleStart(e.clientX)}
                onMouseMove={(e) => handleMove(e.clientX)}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ touchAction: "pan-y" }}
                className="relative w-full max-w-full h-[20.75rem] pt-[1.25rem] pb-[0.75rem] flex items-center justify-center overflow-x-hidden overflow-y-visible perspective-[1200px] cursor-grab active:cursor-grabbing px-0 z-10 select-none"
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
                          if (rawOffset === 0) setIsTocOpen(!isTocOpen);
                          else setActiveIndex(idx);
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
                      {/* 커버 이미지 래퍼 */}
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
                <div className="flex flex-col items-center gap-[0.125rem] w-full">
                  <span className={`text-[0.75rem] px-[0.75rem] py-[0.25rem] rounded-[0.375rem] ${activeTheme.chipBg}`}>
                    {activeMagazine.category}
                  </span>
                  <h3 className="text-[1.25rem] font-bold text-gray-900 truncate max-w-full mt-[0.125rem]">
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

                  {/* 수록 목차 목록 */}
                  <div className="flex flex-col gap-[0.375rem]">
                      {visibleArticles.map((art, aIdx) => {
                        const isFav = favoritedTitles.includes(art.title);

                        return (
                          <div
                            key={aIdx}
                            className="p-[0.75rem] bg-[#F9FAFB] rounded-[0.875rem] border border-gray-100/80 flex items-center justify-between gap-[0.5rem] transition-all shadow-2xs hover:border-[#00C474]/40"
                          >
                            {/* ★ 좌측: [즐겨찾기 맨 왼쪽 원형 핀] + [코너 뱃지 & 제목 소제목 배치] ★ */}
                            <div className="flex items-center gap-[0.5rem] min-w-0 pr-[0.25rem]">
                              {/* 1. 맨 왼쪽 즐겨찾기 (북마크) 독립 원형 버튼 */}
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

                              {/* 2. 코너 뱃지 및 제목 소제목 배치 */}
                              <div className="flex flex-col items-start min-w-0 text-left">
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
                                <h4 className="text-[0.8125rem] font-bold text-gray-900 truncate mt-[0.125rem] tracking-normal">
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
      </div>

      {/* ★ 내가 찜한 마음건강 칼럼 서브 시트 (왼쪽 ➔ 오른쪽 슬라이드 인/아웃) ★ */}
      <MagazineFavoritesSheet
        isOpen={isFavSheetOpen}
        onClose={() => setIsFavSheetOpen(false)}
        favoritedTitles={favoritedTitles}
        magazines={allMagazines}
        onToggleFavorite={toggleFavoriteArticle}
        onOpenEbookReader={(mag, title) => console.log('Ebook reader', mag.id, title)}
      />
    </section>
  );
}
