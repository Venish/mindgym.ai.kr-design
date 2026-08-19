"use client";

import React, { useState } from "react";
import { MagnifyingGlass, FlowerLotus, Heart, Play, Clock, Sparkle } from "@phosphor-icons/react";
import { ritualsData, Ritual } from "@/data/rituals";
import { NeumorphCard } from "@/components/godui/NeumorphCard";
import { SegmentedControl } from "@/components/godui/SegmentedControl";
import { RitualDetailDrawer } from "@/components/modals/RitualDetailDrawer";
import { useMindGym } from "@/context/MindGymContext";

export function RitualPage() {
  const { favorites } = useMindGym();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedRitual, setSelectedRitual] = useState<Ritual | null>(null);

  const categories = ["전체", "불안", "자책", "감정", "즐겨찾기"];

  const filteredRituals = ritualsData.filter((item) => {
    const matchesSearch = item.title.includes(search) || item.id.includes(search);
    if (selectedCategory === "전체") return matchesSearch;
    if (selectedCategory === "즐겨찾기") return matchesSearch && favorites.includes(item.id);
    return matchesSearch && item.category === selectedCategory;
  });

  return (
    <div className="flex-1 flex flex-col gap-5 p-5 bg-white">
      {/* Header Banner */}
      <div>
        <span className="text-[10px] font-bold text-[#00C474] bg-emerald-50 px-2.5 py-1 rounded-full">
          자율 틈새 훈련
        </span>
        <h2 className="text-xl font-black text-gray-900 mt-1">
          72종 리추얼 보관소 🧘
        </h2>
        <p className="text-xs font-medium text-gray-500 mt-0.5">
          상황에 맞는 리추얼을 자유롭게 선택해 내 마음을 케어해보세요.
        </p>
      </div>

      {/* 검색 바 */}
      <div className="relative">
        <MagnifyingGlass size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="리추얼 타이틀 또는 코드 검색 (예: 미소)"
          className="w-full pl-10 pr-4 py-3 bg-gray-50 text-xs font-semibold rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-[#00C474] transition-all"
        />
      </div>

      {/* 카테고리 필터 & 정렬 드롭다운 */}
      <div className="flex flex-col gap-3">
        <div className="overflow-x-auto pb-1 no-scrollbar">
          <SegmentedControl
            items={categories.map((cat) => ({
              id: cat,
              label: cat === "즐겨찾기" ? "❤️ 즐겨찾기" : cat,
              count: cat === "즐겨찾기" ? favorites.length : undefined,
            }))}
            activeId={selectedCategory}
            onChange={(id) => setSelectedCategory(id)}
          />
        </div>
      </div>

      {/* 3열 그리드 아이콘 시스템 */}
      <div className="grid grid-cols-3 gap-3">
        {filteredRituals.map((ritual) => {
          const isFav = favorites.includes(ritual.id);
          return (
            <NeumorphCard
              key={ritual.id}
              onClick={() => setSelectedRitual(ritual)}
              className="p-3.5 flex flex-col items-center justify-between text-center min-h-[7.8125rem] border border-gray-50 relative group cursor-pointer active:scale-[0.96] transition-transform"
            >
              {isFav && (
                <Heart size={14} weight="fill" className="text-rose-400 absolute top-2 right-2" />
              )}
              
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[var(--color-brand-green)] flex items-center justify-center my-1 group-hover:scale-110 transition-transform">
                <FlowerLotus size={22} weight="fill" />
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[0.5625rem] font-bold text-gray-400 uppercase">{ritual.id}</span>
                <h4 className="text-xs font-extrabold text-gray-900 leading-snug line-clamp-1 mt-0.5">
                  {ritual.title}
                </h4>
                <span className="text-[0.625rem] font-bold text-[var(--color-brand-green)] mt-1 tabular-nums">
                  +{ritual.dumbbell} 덤벨
                </span>
              </div>
            </NeumorphCard>
          );
        })}
      </div>

      {filteredRituals.length === 0 && (
        <div className="py-12 text-center text-xs font-bold text-gray-400">
          검색 결과에 맞는 리추얼이 없습니다.
        </div>
      )}

      {/* 상세 바텀시트 */}
      <RitualDetailDrawer ritual={selectedRitual} onClose={() => setSelectedRitual(null)} />
    </div>
  );
}

export default RitualPage;
