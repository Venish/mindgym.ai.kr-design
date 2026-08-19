"use client";

import React from "react";
import Link from "next/link";
import { Bell } from "@phosphor-icons/react";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function GlobalHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 w-full bg-transparent px-5 py-4 flex items-center justify-between border-0 shadow-none outline-none">
      <Link href="/dashboard">
        <BrandLogo size="md" />
      </Link>

      {/* 우측 단일 알림 아이콘 (배경 원 없이 투명한 순수 아이콘 형태) */}
      <button
        type="button"
        aria-label="알림"
        className="p-1.5 text-gray-700 hover:text-gray-900 bg-transparent transition-all flex items-center justify-center relative active:scale-95"
      >
        <Bell size={24} weight="regular" />
        {/* 미읽은 알림 뱃지 닷 (#00C473 그린) */}
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00C473] rounded-full ring-2 ring-white" />
      </button>
    </header>
  );
}
