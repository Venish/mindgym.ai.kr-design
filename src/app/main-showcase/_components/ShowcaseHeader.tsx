"use client";

import React from "react";
import Link from "next/link";
import { Bell } from "@phosphor-icons/react";
import { BrandLogo } from "@/components/ui/BrandLogo";

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
  return (
    <div className="w-full flex items-center justify-between py-1 px-0.5">
      {/* Left Brand Logo */}
      <Link
        href="/main-showcase"
        className="flex items-center gap-1.5 transition-transform active:scale-95"
      >
        <BrandLogo size="sm" />
      </Link>

      {/* Right Mobile Status (우측 알림 종 버튼) */}
      <div className="flex items-center">
        <button
          type="button"
          aria-label="알림 수신함"
          className="p-1.5 txt-brand-ink hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors relative active:scale-95 flex items-center justify-center"
        >
          <Bell size={24} weight="bold" className="txt-brand-ink" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-brand-green rounded-full ring-2 ring-white" />
        </button>
      </div>
    </div>
  );
}
