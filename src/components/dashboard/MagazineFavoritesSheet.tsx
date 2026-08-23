"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CaretRight, BookmarkSimple, Play, Clock } from "@phosphor-icons/react";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { SegmentedTab } from "@/components/ui/SegmentedTab";
import { MagazineArticleItem, MagazineData } from "@/types/magazine";

interface MagazineFavoritesSheetProps {
  isOpen: boolean;
  onClose: () => void;
  favoritedTitles: string[];
  magazines: MagazineData[];
  onToggleFavorite: (title: string) => void;
  onOpenEbookReader: (magazine: MagazineData, articleTitle: string) => void;
}

export type FavoritesTab = "history" | "bookmarks";

export interface ReadingHistoryItem {
  magazineId: string;
  articleTitle: string;
  progressPercent: number; // 0 ~ 100
  timeAgoLabel: string; // "2시간 전", "1day", "3days", "1month", "1year"
}

/**
 * MagazineFavoritesSheet: 마음건강 서재 (최근 읽은 아티클 20개 & 내가 찜한 아티클 20개 검증용 데이터셋 탑재)
 */
export function MagazineFavoritesSheet({
  isOpen,
  onClose,
  favoritedTitles,
  magazines,
  onToggleFavorite,
  onOpenEbookReader,
}: MagazineFavoritesSheetProps) {
  const [activeTab, setActiveTab] = useState<FavoritesTab>("history");

  // A. 내가 찜한 아티클 목록 (Bookmarks)
  const favoritedArticles: { magazine: MagazineData; article: MagazineArticleItem }[] = [];

  magazines.forEach((mag) => {
    mag.articles.forEach((art) => {
      if (favoritedTitles.includes(art.title)) {
        if (!favoritedArticles.some((item) => item.article.title === art.title)) {
          favoritedArticles.push({ magazine: mag, article: art });
        }
      }
    });
  });

  // B. 최근 읽었던 아티클 샘플 더미 20개 데이터셋 (상대 시간 & 읽었던 위치 프로그레스 바%)
  const sampleHistoryData: ReadingHistoryItem[] = [
    { magazineId: "vol-11", articleTitle: "당연하지 않은 것들 앞에서", progressPercent: 75, timeAgoLabel: "10분 전" },
    { magazineId: "vol-11", articleTitle: "달리지 않고도 사는 사람은 많아", progressPercent: 100, timeAgoLabel: "2시간 전" },
    { magazineId: "vol-11", articleTitle: "사람 때문에, 사람 덕분에", progressPercent: 40, timeAgoLabel: "5시간 전" },
    { magazineId: "vol-11", articleTitle: "일상의 속도를 낮추는 기술", progressPercent: 85, timeAgoLabel: "1day" },
    { magazineId: "vol-05", articleTitle: "마음의 미세먼지를 터는 '10분 멍때리기' 기술", progressPercent: 60, timeAgoLabel: "2days" },
    { magazineId: "vol-05", articleTitle: "퇴근 후 뇌를 완전히 끄는 수면 리추얼", progressPercent: 100, timeAgoLabel: "3days" },
    { magazineId: "vol-04", articleTitle: "불안을 다스리는 4-7-8 호흡 매뉴얼", progressPercent: 30, timeAgoLabel: "5days" },
    { magazineId: "vol-03", articleTitle: "타인의 말에 상처받지 않는 감정 방화벽", progressPercent: 90, timeAgoLabel: "1month" },
    { magazineId: "vol-02", articleTitle: "나를 사랑하는 가장 첫 번째 연습, 자기 자비", progressPercent: 45, timeAgoLabel: "2months" },
    { magazineId: "vol-01", articleTitle: "마음 챙김(Mindfulness)이란 무엇인가?", progressPercent: 100, timeAgoLabel: "3months" },
    { magazineId: "vol-01", articleTitle: "감정 조절의 심리학", progressPercent: 20, timeAgoLabel: "4months" },
    { magazineId: "vol-01", articleTitle: "스트레스 해소를 위한 작은 습관들", progressPercent: 80, timeAgoLabel: "6months" },
    { magazineId: "vol-01", articleTitle: "회복탄력성을 높이는 방법", progressPercent: 55, timeAgoLabel: "8months" },
    { magazineId: "vol-01", articleTitle: "타인과의 건강한 경계 세우기", progressPercent: 100, timeAgoLabel: "10months" },
    { magazineId: "vol-01", articleTitle: "나만의 힐링 루틴 만들기", progressPercent: 35, timeAgoLabel: "1year" },
    { magazineId: "vol-01", articleTitle: "슬럼프를 극복하는 마음의 힘", progressPercent: 70, timeAgoLabel: "1year" },
    { magazineId: "vol-01", articleTitle: "완벽주의에서 벗어나는 연습", progressPercent: 95, timeAgoLabel: "1year" },
    { magazineId: "vol-01", articleTitle: "마음의 번아웃 신호 읽기", progressPercent: 15, timeAgoLabel: "1year" },
    { magazineId: "vol-01", articleTitle: "행복을 만드는 데일리 리추얼", progressPercent: 100, timeAgoLabel: "1year" },
    { magazineId: "vol-01", articleTitle: "나를 온전히 받아들이는 자비 명상", progressPercent: 50, timeAgoLabel: "1year" },
  ];

  // 샘플 매거진 매핑 헬퍼
  const getMagazineAndArticle = (historyItem: ReadingHistoryItem) => {
    const foundMag = magazines.find((m) => m.id === historyItem.magazineId) || magazines[0];
    const foundArt = foundMag?.articles.find((a) => a.title === historyItem.articleTitle) || foundMag?.articles[0];
    return { magazine: foundMag, article: foundArt };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-50 bg-white flex flex-col overflow-y-auto no-scrollbar select-none text-gray-900 pb-12"
        >
          {/* 1. 상단 공통 서브 헤더 (sticky top-0 완벽 상단 고정!) */}
          <SubPageHeader
            title="마음건강 서재"
            leftType="close"
            onLeftClick={onClose}
          />

          {/* 2. 탭 스위처 (헤더 바로 아래 sticky top-[56px] 완벽 고정!) */}
          <div className="sticky top-[56px] z-20 bg-white/95 backdrop-blur-md px-5 pt-2 pb-3">
            <SegmentedTab
              items={[
                {
                  id: "history",
                  label: "최근 읽은 아티클",
                  count: sampleHistoryData.length,
                  badgeActiveColor: "bg-emerald-100 text-[#00C474]",
                },
                {
                  id: "bookmarks",
                  label: "내가 찜한 아티클",
                  count: favoritedArticles.length,
                  badgeActiveColor: "bg-amber-100 text-amber-600",
                },
              ]}
              activeId={activeTab}
              onChange={(id) => setActiveTab(id as FavoritesTab)}
            />
          </div>

          {/* 3. 메인 콘텐츠 리스트 영역 (20개 더미 스크롤 검증) */}
          <div className="flex flex-col w-full px-5 pt-1 gap-3">
            {/* A. [탭 1: 최근 읽은 아티클 20개 (History Tab)] */}
            {activeTab === "history" && (
              <div className="flex flex-col gap-3">
                {sampleHistoryData.map((item, idx) => {
                  const { magazine, article } = getMagazineAndArticle(item);
                  if (!magazine || !article) return null;

                  const volNum = magazine.id.replace(/^vol-/i, "").padStart(2, "0");
                  const volLabel = `VOL.${volNum}`;

                  return (
                    <div
                      key={`history-${idx}`}
                      onClick={() => {
                        onOpenEbookReader(magazine, article.title);
                      }}
                      className="group relative p-3.5 bg-[#F9FAFB] hover:bg-emerald-50/40 rounded-2xl border border-gray-100/90 flex flex-col gap-2.5 transition-all shadow-2xs cursor-pointer hover:border-[#00C474]/50 overflow-hidden"
                    >
                      {/* 상단: [VOL.XX 매거진 칩 & 카테고리] + [상대 시간 표시] */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-xs font-extrabold text-gray-900 tracking-tight shrink-0">
                            {volLabel}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded truncate">
                            {article.section || "에세이"}
                          </span>
                        </div>

                        {/* 상대 시간 뱃지 */}
                        <div className="flex items-center gap-1 text-[11px] font-bold text-gray-400 shrink-0">
                          <Clock size={12} weight="bold" />
                          <span>{item.timeAgoLabel}</span>
                        </div>
                      </div>

                      {/* 중간: 아티클 제목 + Play 버튼 */}
                      <div className="flex items-center justify-between gap-2.5">
                        <h4 className="text-[14px] font-bold text-gray-900 group-hover:text-[#00C474] transition-colors truncate flex-1 leading-snug">
                          {article.title}
                        </h4>

                        {/* 메인 Play ▶ 바로 독서 버튼 (회색 톤) */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenEbookReader(magazine, article.title);
                          }}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-all shrink-0 active:scale-90 cursor-pointer"
                          title="이어서 읽기 (Play)"
                        >
                          <Play size={14} weight="fill" className="ml-0.5" />
                        </button>
                      </div>

                      {/* 하단: 읽었던 위치 프로그레스 바 트랙 선 */}
                      <div className="w-full h-1 bg-gray-200/80 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 to-[#00C474] rounded-full transition-all duration-300"
                          style={{ width: `${item.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* B. [탭 2: 내가 찜한 아티클 20개 (Bookmarks Tab)] */}
            {activeTab === "bookmarks" && (
              <div className="flex flex-col gap-3">
                {favoritedArticles.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center gap-3 text-gray-400">
                    <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                      <Star size={28} weight="fill" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-[15px] font-bold text-gray-800">
                        아직 찜한 칼럼이 없습니다
                      </p>
                      <p className="text-xs text-gray-400 font-medium">
                        마음에 드는 매거진 아티클의 책갈피 버튼을 눌러보세요.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {favoritedArticles.map(({ magazine, article }, idx) => {
                      const volNum = magazine.id.replace(/^vol-/i, "").padStart(2, "0");
                      const volLabel = `VOL.${volNum}`;

                      return (
                        <div
                          key={`fav-${idx}`}
                          className="p-3.5 bg-[#F9FAFB] hover:bg-amber-50/30 rounded-2xl border border-gray-100/90 flex items-center justify-between gap-2 transition-all shadow-2xs hover:border-amber-400/50 cursor-pointer"
                          onClick={() => {
                            onOpenEbookReader(magazine, article.title);
                          }}
                        >
                          {/* 좌측: [책갈피 해제 버튼] + [VOL.XX 매거진 칩 & 제목] */}
                          <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleFavorite(article.title);
                              }}
                              className="p-1 text-amber-500 hover:text-gray-300 transition-all active:scale-90 cursor-pointer shrink-0"
                              title="즐겨찾기 해제"
                            >
                              <BookmarkSimple size={20} weight="fill" />
                            </button>

                            <div className="flex flex-col items-start min-w-0 flex-1 text-left gap-0.5">
                              <div className="flex items-center gap-1.5 max-w-full">
                                <span className="text-xs font-extrabold text-gray-900 tracking-tight shrink-0">
                                  {volLabel}
                                </span>
                                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded truncate">
                                  {article.section || "에세이"}
                                </span>
                              </div>
                              <h4 className="text-[14px] font-bold text-gray-900 truncate w-full">
                                {article.title}
                              </h4>
                            </div>
                          </div>

                          {/* 우측: E-Book 읽기 화살표 버튼 */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenEbookReader(magazine, article.title);
                            }}
                            className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer active:scale-90 shrink-0"
                            title="E-Book 바로 읽기"
                          >
                            <CaretRight size={18} weight="bold" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
