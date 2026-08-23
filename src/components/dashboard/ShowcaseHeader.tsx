"use client";

import React from "react";
import { Bell } from "@phosphor-icons/react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useModalStore } from "@/store/useModalStore";
import { NotificationSheet } from "@/components/dashboard/NotificationSheet";

import { useMindGym } from "@/context/MindGymContext";

interface ShowcaseHeaderProps {
  userName?: string;
  levelNum?: number;
}

/**
 * 1. ShowcaseHeader: 상단 앱 메인 메뉴 헤더 ([BrandLogo (좌측)] + [알림 종 버튼 (우측)])
 */
export function ShowcaseHeader({
  userName = "보노보노",
  levelNum = 1,
}: ShowcaseHeaderProps) {
  const { openModal } = useModalStore();
  const { triggerDashboardRefresh } = useMindGym();

  const handleNotificationOpen = () => {
    openModal({
      type: "slide-left",
      content: <NotificationSheet />,
      onClose: () => {
        triggerDashboardRefresh();
      },
    });
  };

  return (
    <div className="w-full flex items-center justify-between py-1 px-0.5">
      {/* Left Brand Logo (클릭 및 호버 효과 완전 차단) */}
      <div className="flex items-center gap-1.5 cursor-default select-none pointer-events-none">
        <BrandLogo size="sm" />
      </div>

      {/* Right Mobile Status (우측 알림 종 버튼) */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="알림 수신함"
          onClick={handleNotificationOpen}
          className="p-1.5 txt-brand-ink hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors relative active:scale-95 flex items-center justify-center outline-none cursor-pointer"
        >
          <Bell size={24} weight="bold" className="txt-brand-ink" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-brand-green rounded-full ring-2 ring-white" />
        </button>
      </div>
    </div>
  );
}
