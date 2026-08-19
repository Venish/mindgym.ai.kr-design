import React from "react";
import { GlobalHeader } from "@/components/navigation/GlobalHeader";
import { GlobalBottomTab } from "@/components/navigation/GlobalBottomTab";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col bg-white pb-20 relative overflow-hidden">
      {/* 최상단 메뉴부터 연결되는 스무스 Ambient Gradient 이펙트 (배경 원 레이어 제거) */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-emerald-100/45 via-teal-50/22 to-transparent pointer-events-none z-0" />

      <GlobalHeader />
      <main className="flex-1 flex flex-col z-10 relative">{children}</main>
      <GlobalBottomTab />
    </div>
  );
}
