"use client";

import React from "react";
import Link from "next/link";
import { CaretLeft } from "@phosphor-icons/react";
import { BrandLogo } from "@/components/ui/BrandLogo";

interface DesignGuideHeaderProps {
  onScrollToSection: (id: string) => void;
}

export function DesignGuideHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-6 py-4 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* 좌측 로고 및 돌아가기 */}
        <div className="flex items-center gap-4">
          <Link
            href="/preview"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200/80 px-3 py-1.5 rounded-xl active:scale-[0.96] transition-all"
          >
            <CaretLeft size={16} weight="bold" />
            <span>프리뷰 대시보드</span>
          </Link>
          <div className="h-4 w-px bg-gray-200" />
          <div className="flex items-center gap-2">
            <BrandLogo className="h-6 w-auto" />
            <span className="text-sm font-black txt-brand-ink tracking-tight">
              Design System Guide
            </span>
          </div>
        </div>

        <span className="txt-caption-sub font-mono font-black txt-brand-green bg-[var(--color-pastel-mint-bg)] border border-[#00C473]/30 px-3 py-1 rounded-full shadow-2xs">
          v1.1.0 Spec (70:20:10)
        </span>
      </div>
    </header>
  );
}
