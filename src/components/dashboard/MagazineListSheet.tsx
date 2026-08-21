"use client";

import React, { useState } from "react";
import { SubPageHeader } from "@/components/ui/SubPageHeader";
import { useModalStore } from "@/store/useModalStore";
import { useMindGym } from "@/context/MindGymContext";
import { magazinesData, Magazine } from "@/data/magazines";
import { BookOpen, CaretRight, CheckCircle, Sparkle } from "@phosphor-icons/react";

/**
 * MagazineListSheet: 월간 마음건강 매거진 전체 호별 커버 갤러리 및 목차 Index 뷰어 모달
 * - 우측 상단 햄버거 메뉴 및 '지금 나에게 맞는 이야기' 배너 연동
 * - 모션: 오른쪽에서 왼쪽으로(slide-left)
 * - 매거진 커버 터치 ➔ 목차(Index) 노출 ➔ 목차 클릭 ➔ 아티클 더미 본문 노출 (+10 DB 적립)
 * - 이모티콘 100% 사용 금지 수칙 준수
 */
export function MagazineListSheet({
  initialMagazineId = "MG-2026-08",
}: {
  initialMagazineId?: string;
}) {
  const { closeModal } = useModalStore();
  const { addDumbbells } = useMindGym();

  const [selectedMag, setSelectedMag] = useState<Magazine>(
    magazinesData.find((m) => m.id === initialMagazineId) || magazinesData[0]
  );
  const [selectedArticleTitle, setSelectedArticleTitle] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // 더미 목차 아이템 목록
  const indexItems = [
    { id: 1, title: `${selectedMag.title} - 1부. 생각을 비우는 호흡`, readTime: selectedMag.readTime, author: "김마음 선임연구원" },
    { id: 2, title: `${selectedMag.subtitle} - 2부. 나를 지키는 경계`, readTime: "4분", author: "이건강 대표" },
    { id: 3, title: `마인드 컬럼: ${selectedMag.category} 가이드`, readTime: "3분", author: "박웰빙 피트니스 코치" },
  ];

  const handleReadArticle = (itemTitle: string) => {
    setSelectedArticleTitle(itemTitle);
  };

  const handleCompleteRead = () => {
    addDumbbells(10);
    setIsCompleted(true);
    setTimeout(() => {
      closeModal();
    }, 700);
  };

  return (
    <div className="w-full min-h-full bg-white flex flex-col select-none relative pb-12 text-gray-900 overflow-y-auto">
      {/* 1. 서브 헤더 */}
      <SubPageHeader
        title={selectedArticleTitle ? selectedArticleTitle : selectedMag ? `${selectedMag.issueNumber} ${selectedMag.title}` : "월간 마음건강 매거진"}
        leftType="back"
        onLeftClick={() => {
          if (selectedArticleTitle) {
            setSelectedArticleTitle(null);
          } else {
            closeModal();
          }
        }}
      />

      <div className="flex flex-col w-full px-5 pt-3 gap-6 text-left max-w-lg mx-auto flex-1">
        {!selectedArticleTitle ? (
          <>
            {/* 매거진 대표 타이틀 헤딩 */}
            <div className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-black text-[#00C474] uppercase tracking-wider flex items-center gap-1">
                <BookOpen size={15} weight="bold" />
                MONTHLY MIND MAGAZINE
              </span>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                월간 마음건강 매거진
              </h1>
              <p className="text-xs font-semibold text-gray-500">
                원하는 호를 선택하고 마음의 쉼표가 되는 혜안을 얻어보세요. (완독 시 +10 덤벨)
              </p>
            </div>

            {/* 월간 매거진호 커버 리스트업 갤러리 */}
            <div className="w-full grid grid-cols-2 gap-3 pt-1">
              {magazinesData.map((mag) => {
                const isSelected = selectedMag?.id === mag.id;
                return (
                  <div
                    key={mag.id}
                    onClick={() => setSelectedMag(mag)}
                    className={`rounded-2xl p-4 flex flex-col gap-2.5 transition-all cursor-pointer select-none text-left relative overflow-hidden shadow-2xs border ${
                      isSelected
                        ? "bg-emerald-50/90 border-[#00C474] ring-2 ring-[#00C474]/30"
                        : "bg-[#F8FAFC] border-transparent hover:border-gray-300"
                    }`}
                  >
                    <div className="w-full aspect-[4/3] rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-700 flex items-center justify-center text-white font-black text-base shadow-inner px-2 text-center leading-tight">
                      {mag.issueNumber}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-extrabold text-[#00C474]">{mag.issueNumber}</span>
                      <h3 className="text-sm font-black text-gray-900 truncate">{mag.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 선택한 매거진호의 목차 (Index) 리스트 */}
            {selectedMag && (
              <div className="w-full flex flex-col gap-3 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-gray-900">
                    {selectedMag.issueNumber} 목차
                  </h3>
                  <span className="text-xs font-bold text-gray-400">
                    총 {indexItems.length}개 아티클
                  </span>
                </div>

                <div className="w-full flex flex-col gap-2.5">
                  {indexItems.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => handleReadArticle(item.title)}
                      className="w-full bg-[#F8FAFC] hover:bg-emerald-50/70 p-4 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer shadow-2xs group active:scale-[0.99]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#00C474] font-black text-xs flex items-center justify-center shrink-0">
                          0{idx + 1}
                        </div>
                        <div className="flex flex-col">
                          <h4 className="text-sm font-black text-gray-900 group-hover:text-[#00C474] transition-colors">
                            {item.title}
                          </h4>
                          <span className="text-[11px] font-semibold text-gray-500">
                            {item.readTime} 소요 · {item.author}
                          </span>
                        </div>
                      </div>
                      <CaretRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          /* 매거진 아티클 더미 본문 뷰어 */
          <div className="flex flex-col justify-between flex-1 min-h-[460px] py-2">
            <div className="flex flex-col gap-4 text-left">
              <span className="text-xs font-extrabold text-[#00C474] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
                {selectedMag.issueNumber} 목차 아티클
              </span>

              <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-snug">
                {selectedArticleTitle}
              </h1>

              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 pb-2 border-b border-gray-100">
                <span>{selectedMag.category}</span>
                <span>·</span>
                <span>{selectedMag.readTime} 읽기</span>
              </div>

              {/* 더미 본문 내용 */}
              <div
                className="text-sm font-medium text-gray-700 leading-relaxed space-y-4 tracking-normal pt-1"
                dangerouslySetInnerHTML={{ __html: selectedMag.contentHtml }}
              />
            </div>

            {/* 완독하기 버튼 (+10 DB 적립) */}
            <div className="w-full pt-6">
              <button
                type="button"
                onClick={handleCompleteRead}
                className="w-full bg-[#00C474] text-white font-extrabold text-base py-4 rounded-full shadow-md hover:bg-[#00B068] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isCompleted ? (
                  <>
                    <CheckCircle size={20} weight="fill" />
                    <span>+10 덤벨 적립 및 완독 완료</span>
                  </>
                ) : (
                  <span>아티클 완독하기 (+10 DB)</span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
