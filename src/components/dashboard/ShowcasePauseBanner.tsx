"use client";

import React, { useEffect, useState } from "react";
import { CaretRight, List } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useModalStore } from "@/store/useModalStore";
import { MagazineMainSheet } from "@/components/dashboard/MagazineMainSheet";
import { MagazineCanvasReaderModal } from "@/components/dashboard/MagazineCanvasReaderModal";
import { getMagazineCategories } from "@/services/magazineService";
import { MagazineData } from "@/types/magazine";
import { useAutoRolling } from "@/hooks/useAutoRolling";

interface RecommendedStory {
  volId: string;
  volNumText: string;
  title: string;
  subTitle: string;
  gradient: string;
}

const RECOMMENDED_STORIES: RecommendedStory[] = [
  {
    volId: "vol-11",
    volNumText: "VOL.11",
    title: "잠시멈춤",
    subTitle: "이달의 추천 마인드 스토리 바로 읽기",
    gradient: "from-[#7CE0B0] to-[#4ECB93]",
  },
  {
    volId: "vol-01",
    volNumText: "VOL.01",
    title: "변화의 시작점",
    subTitle: "내가 상처가 된 말에서 자유로워지는 법",
    gradient: "from-amber-400 to-amber-600",
  },
  {
    volId: "vol-05",
    volNumText: "VOL.05",
    title: "나를 돌보는 시간",
    subTitle: "지친 하루 끝 나만을 위한 따뜻한 위로",
    gradient: "from-sky-400 to-indigo-500",
  },
  {
    volId: "vol-08",
    volNumText: "VOL.08",
    title: "관계의 지혜",
    subTitle: "적당한 거리가 만들어내는 편안한 관계",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    volId: "vol-10",
    volNumText: "VOL.10",
    title: "회복탄력성",
    subTitle: "스트레스 속에서 다시 일어서는 마음의 힘",
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    volId: "vol-03",
    volNumText: "VOL.03",
    title: "마음의 균형",
    subTitle: "감정의 파도 속에서 중심을 잡는 연습",
    gradient: "from-purple-400 to-indigo-600",
  },
];

/**
 * 5. ShowcasePauseBanner: 지금 읽기 좋은 이야기 추천 배너 모듈
 * - '100% 활용하기' 롤링(4초) 대비 2배(8초, 8000ms) 주기로 부드럽게 롤링
 * - 마우스 호버 시 롤링 일시 정지
 * - 카드 클릭 시 해당 볼륨 E-Book Reader 최상위 모달 오픈
 */
export function ShowcasePauseBanner() {
  const { openModal } = useModalStore();
  const { currentIndex, setIsHovered } = useAutoRolling(RECOMMENDED_STORIES.length, 8000);
  const [magazinesMap, setMagazinesMap] = useState<{ [volId: string]: MagazineData }>({});

  useEffect(() => {
    async function loadData() {
      const res = await getMagazineCategories();
      const allMags = (res.categories || []).flatMap((cat) => cat.magazines);
      const map: { [volId: string]: MagazineData } = {};
      allMags.forEach((m) => {
        map[m.id] = m;
      });
      setMagazinesMap(map);
    }
    loadData();
  }, []);

  const currentStory = RECOMMENDED_STORIES[currentIndex];
  const targetMagazine = magazinesMap[currentStory.volId] || magazinesMap["vol-11"];

  // 전체 매거진 라이브러리 오픈
  const handleOpenLibrary = () => {
    openModal({
      type: "slide-left",
      content: <MagazineMainSheet initialVolId={currentStory.volId} />,
    });
  };

  // 카드 클릭 시 해당 매거진 아티클 리더 오픈
  const handleDirectReadArticle = () => {
    if (targetMagazine) {
      openModal({
        type: "slide-up",
        content: (
          <MagazineCanvasReaderModal
            isOpen={true}
            onClose={() => useModalStore.getState().closeModal()}
            magazine={targetMagazine}
            articleTitle={targetMagazine.articles[0]?.title || currentStory.title}
          />
        ),
      });
    } else {
      handleOpenLibrary();
    }
  };

  return (
    <div className="flex flex-col gap-2.5 w-full select-none">
      {/* 공통 섹션 중제목 컴포넌트 */}
      <SectionTitle
        title="지금 읽기 좋은 이야기"
        action={
          <button
            type="button"
            aria-label="메뉴"
            onClick={handleOpenLibrary}
            className="p-1 text-theme-muted hover:txt-brand-ink transition-colors rounded-lg outline-none cursor-pointer"
            title="매거진 라이브러리 전체보기"
          >
            <List size={18} weight="bold" />
          </button>
        }
      />

      {/* 지금 읽기 좋은 이야기 추천 카드 (14초 롤링) */}
      <div
        onClick={handleDirectReadArticle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-theme-card border border-theme-card hover:border-[#009E5C]/60 rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all shadow-2xs group relative overflow-hidden min-h-[96px]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStory.volId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="flex items-center gap-3.5 min-w-0 flex-1"
          >
            {/* 볼륨 뱃지 북 커버 썸네일 */}
            <div
              className={`w-[48px] h-[64px] bg-gradient-to-b ${currentStory.gradient} rounded-xl flex flex-col justify-end items-center pb-2 text-white shrink-0 shadow-2xs transition-all`}
            >
              <span className="text-xs font-bold font-mono tracking-tighter text-white uppercase">
                {currentStory.volNumText}
              </span>
            </div>

            {/* 타이틀 및 서브카피 */}
            <div className="flex flex-col text-left min-w-0 flex-1">
              <h3 className="text-[1.0625rem] font-black txt-brand-ink tracking-tight leading-tight group-hover:text-[#00C474] transition-colors truncate">
                {currentStory.title}
              </h3>
              <span className="text-xs font-semibold text-theme-muted mt-1 truncate">
                {currentStory.subTitle}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        <CaretRight size={18} className="text-theme-muted group-hover:txt-brand-ink transition-colors shrink-0 ml-2" />
      </div>
    </div>
  );
}
