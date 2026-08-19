"use client";

import React, { useState } from "react";
import { BookOpen, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import { magazinesData, Magazine } from "@/data/magazines";
import { NeumorphCard } from "@/components/godui/NeumorphCard";
import { MagazineViewerModal } from "@/components/modals/MagazineViewerModal";
import { useMindGym } from "@/context/MindGymContext";

export function MagazinePage() {
  const { readMagazines } = useMindGym();
  const [selectedMag, setSelectedMag] = useState<Magazine | null>(null);

  const mainMagazine = magazinesData[0];
  const pastMagazines = magazinesData.slice(1);

  return (
    <div className="flex-1 flex flex-col gap-5 p-5 bg-white">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold text-[#00C474] bg-emerald-50 px-2.5 py-1 rounded-full">
          월간 정기 간행물
        </span>
        <h2 className="text-xl font-black text-gray-900 mt-1">
          마음건강 매거진 서재 📖
        </h2>
        <p className="text-xs font-medium text-gray-500 mt-0.5">
          매월 발행되는 심리학 전문가 아티클을 읽고 완독 보너스 +10 덤벨을 받으세요.
        </p>
      </div>

      {/* 이번 달 스페셜 메인 커버 매거진 */}
      {mainMagazine && (
        <NeumorphCard
          onClick={() => setSelectedMag(mainMagazine)}
          className={`p-6 bg-gradient-to-r ${mainMagazine.coverGradient} text-white flex flex-col gap-4 relative overflow-hidden active:scale-[0.96] transition-transform cursor-pointer`}
        >
          <div className="flex justify-between items-center z-10">
            <span className="text-[10px] font-extrabold uppercase bg-white/20 px-2.5 py-1 rounded-full">
              {mainMagazine.issueNumber} SPECIAL
            </span>
            {readMagazines.includes(mainMagazine.id) && (
              <span className="text-xs font-bold bg-white text-[var(--color-brand-green)] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <CheckCircle size={14} weight="fill" /> 완독함
              </span>
            )}
          </div>

          <div className="z-10 flex flex-col gap-1.5 mt-2">
            <h3 className="text-xl font-black leading-snug">{mainMagazine.title}</h3>
            <p className="text-xs opacity-90 font-medium leading-relaxed">
              {mainMagazine.summary}
            </p>
          </div>

          <div className="z-10 flex justify-between items-center text-xs font-bold pt-2 border-t border-white/20">
            <span>소요 시간: {mainMagazine.readTime}</span>
            <span className="flex items-center gap-1">
              아티클 읽기 <ArrowRight size={14} />
            </span>
          </div>
        </NeumorphCard>
      )}

      {/* 과월호 책장 비주얼 그리드 */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-extrabold text-gray-900">📚 과월호 아카이브 서재</h3>

        <div className="grid grid-cols-1 gap-3">
          {pastMagazines.map((mag) => {
            const isRead = readMagazines.includes(mag.id);
            return (
              <NeumorphCard
                key={mag.id}
                onClick={() => setSelectedMag(mag)}
                className="p-4 flex items-center justify-between gap-3 border border-gray-50 hover:bg-gray-50/50 active:scale-[0.96] transition-transform cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${mag.coverGradient} flex items-center justify-center text-white font-black text-xs shadow-sm`}>
                    <BookOpen size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400">{mag.issueNumber}</span>
                    <h4 className="text-xs font-extrabold text-gray-900 line-clamp-1">{mag.title}</h4>
                    <p className="text-[11px] font-medium text-gray-500">{mag.readTime} 정독 코스</p>
                  </div>
                </div>

                {isRead ? (
                  <span className="text-xs font-bold text-[var(--color-brand-green)] bg-emerald-50 px-2 py-1 rounded-full whitespace-nowrap">
                    완독
                  </span>
                ) : (
                  <ArrowRight size={18} className="text-gray-400" />
                )}
              </NeumorphCard>
            );
          })}
        </div>
      </div>

      {/* 매거진 뷰어 모달 */}
      <MagazineViewerModal magazine={selectedMag} onClose={() => setSelectedMag(null)} />
    </div>
  );
}

export default MagazinePage;
