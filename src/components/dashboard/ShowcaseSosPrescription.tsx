"use client";

import React from "react";
import {
  Wind,
  PencilSimpleLine,
  Lightning,
  Heart,
} from "@phosphor-icons/react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useModalStore } from "@/store/useModalStore";
import { CommonRitualSheet } from "@/components/dashboard/CommonRitualSheet";

interface SosItem {
  id: string;
  ritualId: string;
  label: string;
  prescriptionTitle: string;
  prescriptionDesc: string;
  icon: React.ReactNode;
  iconBgClass: string;
  iconTextClass: string;
  hoverBorderClass: string;
  hoverTextClass: string;
}

const sosItems: SosItem[] = [
  {
    id: "sos-1",
    ritualId: "RT-007",
    label: "불안하고 초조할 때",
    prescriptionTitle: "복식호흡",
    prescriptionDesc:
      "아랫배 깊숙이 들이마시고 내쉬며 즉각 심박수를 낮추는 긴급 호흡법입니다.",
    icon: <Wind size={16} weight="bold" />,
    iconBgClass: "bg-teal-50 dark:bg-teal-950/60",
    iconTextClass: "text-teal-700 dark:text-teal-300",
    hoverBorderClass: "hover:border-teal-400",
    hoverTextClass: "group-hover:text-teal-700 dark:group-hover:text-teal-300",
  },
  {
    id: "sos-2",
    ritualId: "RT-004",
    label: "생각이 너무 많을 때",
    prescriptionTitle: "걱정 일기",
    prescriptionDesc:
      "머릿속을 맴도는 막연한 불안과 미래 공포를 글로 적어 가두어내는 리추얼입니다.",
    icon: <PencilSimpleLine size={16} weight="bold" />,
    iconBgClass: "bg-indigo-50 dark:bg-indigo-950/60",
    iconTextClass: "text-indigo-700 dark:text-indigo-300",
    hoverBorderClass: "hover:border-indigo-400",
    hoverTextClass: "group-hover:text-indigo-700 dark:group-hover:text-indigo-300",
  },
  {
    id: "sos-3",
    ritualId: "RT-018",
    label: "답답하고 예민할 때",
    prescriptionTitle: "스트레스 분쇄",
    prescriptionDesc:
      "나를 괴롭히는 감정을 종이에 솔직하게 적은 후, 파쇄기로 갈갈이 분쇄하는 리추얼입니다.",
    icon: <Lightning size={16} weight="bold" />,
    iconBgClass: "bg-amber-50 dark:bg-amber-950/60",
    iconTextClass: "text-amber-700 dark:text-amber-300",
    hoverBorderClass: "hover:border-amber-400",
    hoverTextClass: "group-hover:text-amber-700 dark:group-hover:text-amber-300",
  },
  {
    id: "sos-4",
    ritualId: "RT-001",
    label: "자꾸 나를 탓할 때",
    prescriptionTitle: "미소 명상",
    prescriptionDesc:
      "얼굴 근육의 긴장을 풀고 온화한 미소와 함께 스스로를 다정하게 다독이는 명상입니다.",
    icon: <Heart size={16} weight="bold" />,
    iconBgClass: "bg-emerald-50 dark:bg-emerald-950/60",
    iconTextClass: "text-[#009E5C] dark:text-emerald-400",
    hoverBorderClass: "hover:border-[#009E5C]",
    hoverTextClass: "group-hover:text-[#009E5C] dark:group-hover:text-emerald-300",
  },
];

export function ShowcaseSosPrescription() {
  const { openModal } = useModalStore();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const isDraggingRef = React.useRef(false);
  const startXRef = React.useRef(0);
  const scrollLeftRef = React.useRef(0);
  const hasDraggedRef = React.useRef(false);

  const handleOpenRitual = (item: SosItem) => {
    // 드래그 중이었을 경우 클릭 방지
    if (hasDraggedRef.current) return;

    openModal({
      type: "slide-left",
      content: (
        <CommonRitualSheet
          ritualId={item.ritualId}
          ritualTitle={item.prescriptionTitle}
          ritualCategory="SOS 긴급처방"
          description={item.prescriptionDesc}
        />
      ),
    });
  };

  // 마우스 드래그 스와이프 지원 (페이스북/모바일 UX)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 50);
  };

  return (
    <div className="flex flex-col gap-2.5 w-full">
      {/* 1. 섹션 헤더 (좌측 정렬 기준선) */}
      <SectionTitle title="긴급 SOS 처방" />

      {/* 2. 풀 블리드 가로 스크롤 트랙 (시작 시 왼쪽 16px 여백으로 제목과 일치, 좌우 100% 전체 화면 스와이프) */}
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1.5 -mx-4 px-4 w-[calc(100%+32px)] cursor-grab active:cursor-grabbing select-none"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {sosItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpenRitual(item)}
            className={`w-[118px] min-w-[118px] shrink-0 bg-theme-card border border-theme-card ${item.hoverBorderClass} rounded-xl p-3 flex flex-col justify-between h-[120px] cursor-pointer transition-all shadow-2xs group`}
          >
            <div
              className={`w-[28px] h-[28px] rounded-lg ${item.iconBgClass} ${item.iconTextClass} flex items-center justify-center shrink-0 shadow-2xs`}
            >
              {item.icon}
            </div>

            <div className="flex flex-col text-left">
              <h3
                className={`text-[13.5px] font-bold txt-brand-ink ${item.hoverTextClass} leading-tight tracking-tight transition-colors`}
              >
                {item.prescriptionTitle}
              </h3>
              <span className="text-[11px] font-semibold text-theme-muted mt-1 truncate">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
